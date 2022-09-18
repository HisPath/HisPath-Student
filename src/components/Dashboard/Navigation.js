import { Box } from "@mui/material";
import Activity from "./Activity.js";
import Notice from "./Notice.js";

function Navigation() {
  return (
    <Box sx={{ display: "flex", mt: 3, ml: "9rem" }}>
      <Notice />
      <Activity />
    </Box>
  );
}

export default Navigation;
