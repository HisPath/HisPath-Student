import { Container } from "@mui/material";
import EditForm from "../components/EditProfile/EditForm";
import MdEditor from "../components/EditProfile/MdEditor";
import Title from "../components/EditProfile/Title";

export default function EditProfile() {
  return (
    <Container maxWidth="lg" sx={{ display: "flex", mt: 10 }}>
      <Title />
      <EditForm />
      <MdEditor />
    </Container>
  );
}
