package cl.dimade.Dimade_Back.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "proveedores")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Proveedor {
    @Id
    private String id;

    private String rut;
    private String nombre;
    private String direccion;
    private String telefono;
    private String correo;
    private String giro;
}
