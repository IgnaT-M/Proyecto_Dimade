package cl.dimade.Dimade_Back.model;

import java.util.Date;
import java.util.List; 

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "ordenes_compra")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrdenCompra {
    @Id
    private String id;
    private String nombre;
    private String rutProveedor;
    private String rutCliente;
    private String telefono;
    private String email; // ✅ Campo renombrado de 'mail' a 'email'
    private Date fechaOrden;
    private List<Object> productos; // ✅ Tipo cambiado a Lista para coincidir con el frontend
    private String direccion;
    
    // ✅ Se reemplaza 'total' por los nuevos campos
    private Double totalSinIva;
    private Double totalConIva;
    private Double descuento;
    private Double totalAPagar;
    
    private String estado;
    private String tipo;
    private String detalle;
}