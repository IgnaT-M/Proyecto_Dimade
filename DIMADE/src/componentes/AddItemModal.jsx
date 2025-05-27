import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from "@mui/material";

const AddItemModal = ({ open, onClose, onSave, fields }) => {
  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field]: "" }), {})
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onSave({ ...formData, id: Date.now(), activo: true });
    onClose();
    setFormData(fields.reduce((acc, field) => ({ ...acc, [field]: "" }), {}));
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Agregar nuevo</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          {fields.map((field) => (
            <TextField
              key={field}
              name={field}
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              value={formData[field]}
              onChange={handleChange}
              fullWidth
            />
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSave} variant="contained">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddItemModal;
