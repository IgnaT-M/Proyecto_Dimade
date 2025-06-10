import React from "react";
import Cubicador from "../componentes/Cubicador.jsx";
import { Box, Button, Modal, Fade, Typography } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "80vw", md: "50vw" },
  height: { xs: "80vh", md: "65vh" },
  // bgcolor: "rgba(25, 130, 210, 0.08)",//color dimade
  borderRadius: "10px",
  p: "auto",
  display: { xs: "flex", md: "flex", lg: "flex" },
  justifyContent: { xs: "center", md: "center", lg: "center" },
  alignItems: { xs: "center", md: "center", lg: "center" },
  overflow: "auto",
};

const ModalCubitaje = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        onClick={handleOpen}
        sx={{
          bgcolor: "#10567E",
          color: "#fff",
          "&:hover": {
            bgcolor: "#D95830",
          },
          mt: 3,
          fontWeight: "bold",
          borderRadius: 1,
          boxShadow: 3,
          width: "100%",
        }}
      >
        Cubicador
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Cubicador />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default ModalCubitaje;
