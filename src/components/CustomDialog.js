import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { useState } from "react";

const CustomDialog = ({ open,  title, children, onConfirm,onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleCancel = () => {
    setIsOpen(false);
  };
  return (
    <Dialog open={open ?? isOpen} onClose={onClose ?? handleCancel} PaperProps={{
      style: {
        borderRadius: '8px',
        padding: '8px',
        minWidth: '300px'
      }
    }}>
      <DialogTitle
        style={{
          fontSize: "18px",
          fontWeight: 600,
          color: "#333",
          padding: "16px 24px",
          textAlign: "center",
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent
        style={{
          padding: "0 24px 20px",
          color: "#666",
        }}
      >
        {children}
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="error"
          sx={{ borderRadius: "5px" }}
          onClick={onClose ?? handleCancel}
        >
          Huỷ
        </Button>
        <Button
          variant="contained"
          color="error"
          sx={{ borderRadius: "5px" }}
          onClick={onConfirm}
        >
          Xác nhận
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default CustomDialog;
