package cl.dimade.Dimade_Back.model;

import java.util.Date;

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

    private String rutProveedor;
    private String rutCliente;
    private String telefono;
    private String mail;
    private Date fechaOrden;
    private String productos; // Lista de IDs o nombres de productos
    private Double total;
    private String estado; // Ej: Pendiente, Aprobada, Rechazada
    private String tipo; // Ej: Cliente, Proveedor, Interna, etc...
    private String detalle;
    private String pdfId;
}
