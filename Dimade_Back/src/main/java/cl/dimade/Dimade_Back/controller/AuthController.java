package cl.dimade.Dimade_Back.controller;

import java.util.Date;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cl.dimade.Dimade_Back.DTO.ResetPasswordRequest;
import cl.dimade.Dimade_Back.model.PasswordResetToken;
import cl.dimade.Dimade_Back.model.Usuario;
import cl.dimade.Dimade_Back.repository.PasswordResetTokenRepository;
import cl.dimade.Dimade_Back.repository.UsuarioRepository;
import cl.dimade.Dimade_Back.service.CustomUserDetailsService;
import cl.dimade.Dimade_Back.service.EmailService;
import cl.dimade.Dimade_Back.service.JwtUtil;
import cl.dimade.Dimade_Back.service.UsuarioService;

@RestController

// Controlador para autenticación y gestión de usuarios
// Maneja el registro, inicio de sesión y recuperación de contraseña
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private CustomUserDetailsService userDetailsService;
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordResetTokenRepository passwordResetTokenRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private UsuarioService usuarioService;

    @Value("${frontend.url}")
    private String frontendUrl;

    // Endpoint para iniciar sesión
    // Verifica las credenciales del usuario y devuelve un token JWT si son válidas
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData) {
        String email = loginData.get("email");
        String password = loginData.get("password");

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
        } catch (org.springframework.security.core.AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales incorrectas");
        }

        @SuppressWarnings("unused")
        UserDetails userDetails = userDetailsService.loadUserByUsername(email);
        Usuario usuario = usuarioRepository.findByEmail(email).orElseThrow();
        String token = jwtUtil.generateToken(usuario.getEmail(), usuario.getRol());

        return ResponseEntity.ok(Map.of("token", token));
    }

    // Endpoint para registrar un nuevo usuario
    // Verifica si el correo ya está registrado, si no, crea un nuevo usuario
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String password = request.get("password");
        String nombre = request.getOrDefault("nombre", "Anónimo");
        String rol = request.getOrDefault("rol", "USER");

        if (usuarioRepository.findByEmail(email).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("El correo ya está registrado");
        }

        Usuario nuevoUsuario = new Usuario();
        nuevoUsuario.setEmail(email);
        nuevoUsuario.setPassword(password);
        nuevoUsuario.setNombre(nombre);
        nuevoUsuario.setRol(rol);
        nuevoUsuario.setActivo(true);

        usuarioService.guardar(nuevoUsuario);

        return ResponseEntity.status(HttpStatus.CREATED).body("Usuario registrado exitosamente");
    }

    // Endpoint para solicitar restablecimiento de contraseña
    // Envía un enlace al correo del usuario con un token único de 15 minutos
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        Optional<Usuario> usuarioOpt = usuarioRepository.findByEmail(email);

        if (usuarioOpt.isEmpty()) {

            return ResponseEntity.ok("Si el correo está registrado, se enviará un enlace.");
        }

        Usuario usuario = usuarioOpt.get();
        String token = UUID.randomUUID().toString();
        Date expiry = new Date(System.currentTimeMillis() + 1000 * 60 * 15);

        PasswordResetToken resetToken = new PasswordResetToken(token, usuario, expiry);
        passwordResetTokenRepository.save(resetToken);

        String link = frontendUrl + "/reset-password?token=" + token;
        String mensaje = "Haz clic en este enlace para restablecer tu contraseña:\n" + link;

        emailService.enviarCorreo(email, "Recupera tu contraseña", mensaje);

        return ResponseEntity.ok("Si el correo está registrado, se enviará un enlace.");
    }

    // Endpoint para restablecer la contraseña usando el token enviado por correo
    // Verifica el token, si es válido y no ha expirado, actualiza la contraseña del
    // usuario
    // Elimina el token después de usarlo para que no se pueda reutilizar
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest request) {
        Optional<PasswordResetToken> tokenOpt = passwordResetTokenRepository.findByToken(request.getToken());

        if (tokenOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Token inválido o expirado");
        }

        PasswordResetToken resetToken = tokenOpt.get();

        if (resetToken.getExpiryDate().before(new Date())) {
            return ResponseEntity.badRequest().body("El token ha expirado");
        }

        Usuario usuario = resetToken.getUsuario();
        usuario.setPassword(passwordEncoder.encode(request.getNuevaPassword()));
        usuarioRepository.save(usuario);
        passwordResetTokenRepository.delete(resetToken);

        return ResponseEntity.ok("Contraseña actualizada correctamente");
    }

}
