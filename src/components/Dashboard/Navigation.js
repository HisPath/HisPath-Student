import { Box } from "@mui/material";
import Buttons from "./Buttons.js";
import Notice from "./Notice.js";

function Navigation() {
  return (
    <Box sx={{ mt: 3 }}>
      <Notice />
      {/* <Buttons /> */}
    </Box>
  );
}

export default Navigation;
