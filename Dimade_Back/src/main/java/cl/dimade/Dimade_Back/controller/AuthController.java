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
        nuevoUsuario.setPassword(password); // Se codifica dentro de UsuarioService
        nuevoUsuario.setNombre(nombre);
        nuevoUsuario.setRol(rol);
        nuevoUsuario.setActivo(true);

        usuarioService.guardar(nuevoUsuario); // Aquí aplica la secuencia y codifica si es necesario

        return ResponseEntity.status(HttpStatus.CREATED).body("Usuario registrado exitosamente");
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        Optional<Usuario> usuarioOpt = usuarioRepository.findByEmail(email);

        if (usuarioOpt.isEmpty()) {
            // Para evitar exponer si el correo existe, devolvemos OK igual
            return ResponseEntity.ok("Si el correo está registrado, se enviará un enlace.");
        }

        Usuario usuario = usuarioOpt.get();
        String token = UUID.randomUUID().toString();
        Date expiry = new Date(System.currentTimeMillis() + 1000 * 60 * 15); // 15 minutos

        PasswordResetToken resetToken = new PasswordResetToken(token, usuario, expiry);
        passwordResetTokenRepository.save(resetToken);

        String link = frontendUrl + "/reset-password?token=" + token; // Cambia por tu frontend
        String mensaje = "Haz clic en este enlace para restablecer tu contraseña:\n" + link;

        emailService.enviarCorreo(email, "Recupera tu contraseña", mensaje);

        return ResponseEntity.ok("Si el correo está registrado, se enviará un enlace.");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest request) {
        Optional<PasswordResetToken> tokenOpt = passwordResetTokenRepository.findByToken(request.getToken());

        if (tokenOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Token inválido o expirado");
        }

        PasswordResetToken resetToken = tokenOpt.get();

        // Verificar si el token está vencido
        if (resetToken.getExpiryDate().before(new Date())) {
            return ResponseEntity.badRequest().body("El token ha expirado");
        }

        Usuario usuario = resetToken.getUsuario();
        usuario.setPassword(passwordEncoder.encode(request.getNuevaPassword()));
        usuarioRepository.save(usuario);

        // Eliminar el token para que no se reutilice
        passwordResetTokenRepository.delete(resetToken);

        return ResponseEntity.ok("Contraseña actualizada correctamente");
    }

}
