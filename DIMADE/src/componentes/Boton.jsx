import { Button } from "@mui/material";
import { styled } from "@mui/system";
import SendIcon from "@mui/icons-material/Send";

const PulentoButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(0deg, ${theme.palette.primary.main} 40%, ${theme.palette.terciary.main} 90%)`,
  color: theme.palette.primary.contrastText,
  fontWeight: "bold",
  padding: "12px 24px",
  textTransform: "uppercase",
  fontSize: "1rem",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.28)",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "scale(0.95)",
    boxShadow: "0 6px 15px rgba(0,0,0,0.3)",
    background: `linear-gradient(0deg, ${theme.palette.secondary.main} 10%, ${theme.palette.secondary.dark} 100%)`,
  },
}));

const CoolButton = ({ text = "Enviar", icon = <SendIcon />, onClick }) => {
  return (
    <PulentoButton endIcon={icon} onClick={onClick}>
      {text}
    </PulentoButton>
  );
};

export default CoolButton;