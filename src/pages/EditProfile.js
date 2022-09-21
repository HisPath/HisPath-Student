import { Container } from "@mui/material";
import EditForm from "../components/EditProfile/EditForm";
import Title from "../components/EditProfile/Title";

export default function EditProfile() {
  return (
    <Container
      maxWidth="md"
      sx={{ display: "flex", justifyContent: "center", mt: 10 }}
    >
      <Title />
      <EditForm />
    </Container>
  );
}
