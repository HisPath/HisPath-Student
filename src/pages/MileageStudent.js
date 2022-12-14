import styles from "../style/mileage.module.css";

// import Content from "../components/mileageStudent/content";
import Header from "../components/mileageStudent/header";

import Tab from "../components/mileageStudent/tab";
import { Box } from "@mui/material";

// function MileageStudent() {
//   return (
//     <div className="outline">
//       <div className="header">
//         <StudentInfo></StudentInfo>
//       </div>
//       <div className="selectBar">
//         <BasicSelect />
//       </div>
//       <div className="tabs">
//         <BasicTabs></BasicTabs>
//       </div>
//     </div>
//   );
// }

function MileageStudent() {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        margin: "0 auto",
        backgroundColor: "white",
        flexDirection: "column",
      }}
    >
      <Tab />
    </Box>
  );
}
export default MileageStudent;
