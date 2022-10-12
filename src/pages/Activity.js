import { Container } from "@mui/material";
import ActivityTab from "../components/Activity/ActivityTab";
import TagMenu from "../components/Activity/TagMenu";

export default function Activity() {
  return (
    <>
      <Container maxWidth="xl" sx={{ display: "flex" }}>
        <TagMenu />
        <ActivityTab />
      </Container>
    </>
  );
}
