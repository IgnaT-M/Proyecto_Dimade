package cl.dimade.Dimade_Back.service;

import java.io.IOException;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsOperations;
import org.springframework.data.mongodb.gridfs.GridFsResource;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import com.mongodb.client.gridfs.model.GridFSFile;

// Servicio para manejar la subida y descarga de archivos PDF
// Utiliza GridFS de MongoDB para almacenar los archivos y permite operaciones de búsqueda y recuperación
@Service
public class PdfService {

    @Autowired
    private GridFsTemplate gridFsTemplate;

    @Autowired
    private SequenceGeneratorService sequenceGeneratorService;

    @Autowired
    private GridFsOperations gridFsOperations;

    public String guardarPdf(MultipartFile archivo, String nombreOrden) throws IOException {

        String idSeq = sequenceGeneratorService.generateStringSequence("pdf_sequence", "PDF");

        DBObject metadata = new BasicDBObject();
        metadata.put("nombreOrden", nombreOrden);
        metadata.put("idSeq", idSeq);

        gridFsTemplate.store(archivo.getInputStream(), idSeq + ".pdf", "application/pdf", metadata);

        return idSeq;
    }

    public InputStreamResource descargarPdf(String id) throws IOException {
        GridFSFile archivo = gridFsTemplate.findOne(Query.query(Criteria.where("_id").is(new ObjectId(id))));
        GridFsResource resource = gridFsOperations.getResource(archivo);
        return new InputStreamResource(resource.getInputStream());
    }

    public GridFSFile obtenerArchivoPorId(String idAmigable) {
        return gridFsTemplate.findOne(Query.query(Criteria.where("filename").is(idAmigable + ".pdf")));
    }

    public GridFsResource obtenerRecursoDesdeArchivo(GridFSFile archivo) {
        return gridFsOperations.getResource(archivo);
    }

}
