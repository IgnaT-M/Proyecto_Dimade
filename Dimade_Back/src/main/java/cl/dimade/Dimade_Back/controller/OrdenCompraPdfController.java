package cl.dimade.Dimade_Back.controller;

import java.io.IOException;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.data.mongodb.gridfs.GridFsResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.mongodb.client.gridfs.model.GridFSFile;

import cl.dimade.Dimade_Back.model.OrdenCompra;
import cl.dimade.Dimade_Back.repository.OrdenCompraRepository;
import cl.dimade.Dimade_Back.service.PdfService;

// Controlador para gestionar la subida y descarga de archivos PDF relacionados con órdenes de compra
// Permite subir un PDF, descargarlo por ID y actualizar el ID del PDF en una orden de compra
@RestController
@RequestMapping("/api/ordenes-compra")
public class OrdenCompraPdfController {

    @Autowired
    private PdfService pdfService;

    @Autowired
    private OrdenCompraRepository ordenCompraRepository;

    @PostMapping("/upload")
    public ResponseEntity<String> subirArchivo(@RequestParam("file") MultipartFile archivo,
            @RequestParam("nombreOrden") String nombreOrden) throws IOException {
        String id = pdfService.guardarPdf(archivo, nombreOrden);
        return ResponseEntity.ok(id);
    }

    @GetMapping("/download/{id}")
    public ResponseEntity<InputStreamResource> descargarArchivo(@PathVariable String id) throws IOException {
        GridFSFile archivo = pdfService.obtenerArchivoPorId(id);
        if (archivo == null) {
            return ResponseEntity.notFound().build();
        }

        GridFsResource recurso = pdfService.obtenerRecursoDesdeArchivo(archivo);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + recurso.getFilename())
                .contentType(MediaType.APPLICATION_PDF).body(new InputStreamResource(recurso.getInputStream()));
    }

    @PutMapping("/{id}/pdf")
    public ResponseEntity<?> actualizarPdfId(@PathVariable String id, @RequestBody Map<String, String> body) {
        String pdfId = body.get("pdfId");
        Optional<OrdenCompra> optional = ordenCompraRepository.findById(id);

        if (optional.isPresent()) {
            OrdenCompra orden = optional.get();
            orden.setPdfId(pdfId);
            ordenCompraRepository.save(orden);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
