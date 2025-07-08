package cl.dimade.Dimade_Back.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
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

import cl.dimade.Dimade_Back.model.Usuario;
import cl.dimade.Dimade_Back.repository.UsuarioRepository;
import cl.dimade.Dimade_Back.service.CustomUserDetailsService;
import cl.dimade.Dimade_Back.service.JwtUtil;


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

    @PostMapping("/login")
public ResponseEntity<?> login(@RequestBody Map<String, String> loginData) {
    String email = loginData.get("email");
    String password = loginData.get("password");

   try {
    authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(email, password)
    );
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
    nuevoUsuario.setPassword(passwordEncoder.encode(password)); 
    nuevoUsuario.setNombre(nombre);
    nuevoUsuario.setRol(rol);
    nuevoUsuario.setActivo(true);

    usuarioRepository.save(nuevoUsuario);
    System.out.println("Usuario guardado en MongoDB: " + nuevoUsuario.getEmail());

    return ResponseEntity.status(HttpStatus.CREATED).body("Usuario registrado exitosamente");
}


}
