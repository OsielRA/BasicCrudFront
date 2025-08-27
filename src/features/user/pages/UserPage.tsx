import { Typography, Button } from "@mui/material";

export default function UsersPage() {
  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Lista de usuarios
      </Typography>
      <Button variant="contained" color="primary">
        Crear Usuario
      </Button>
    </div>
  );
}