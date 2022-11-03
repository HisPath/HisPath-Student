import * as React from "react";
import Typography from "@mui/material/Typography";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import MileageChart from "./MileageChart";

import Box from "@mui/material/Box";
import MileageTables from "./mileageActivity";
// import Button from "@mui/material/Button";
import ActivityTables from "./Activity";
import SemesterSelect from "./semesterSelect";
import ListAltIcon from "@mui/icons-material/ListAlt";
import BarChartIcon from "@mui/icons-material/BarChart";
// import { Fab } from "@mui/material";
// import { Link } from "react-router-dom";

const lightColor = "rgba(255, 255, 255, 0.7)";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ paddingTop: 0 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const [semester, setSemesters] = React.useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Tabs
              sx={{ flexGrow: 1 }}
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab
                sx={{ minHeight: 3, pt: 1.5, fontWeight: 600 }}
                icon={<ListAltIcon />}
                iconPosition="start"
                label="내 마일리지"
                {...a11yProps(0)}
              />
              <Tab label="내 활동" {...a11yProps(1)} />
              <Tab
                sx={{ minHeight: 3, pt: 1.5, fontWeight: 600 }}
                icon={<BarChartIcon />}
                iconPosition="start"
                label="차트"
                {...a11yProps(2)}
              />
              {/* <span className="mileageStatus">
              {value ? "" : "장학금 신청 완료"}
            </span> */}
            </Tabs>
            <SemesterSelect
              setSemesters={setSemesters}
              sx={{
                minWidth: 120,
                backgroundColor: "white",
                overflow: "auto",
                position: "sticky",
                top: 0,
                zIndex: "20",
                float: "right",
              }}
            />
          </Box>
        </Box>
      </Box>
      <TabPanel value={value} index={0}>
        <MileageTables semester={semester}></MileageTables>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ActivityTables semester={semester}></ActivityTables>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <MileageChart></MileageChart>
      </TabPanel>

      {/* <Link
        href="/"
        variant="body2"
        sx={{
          textDecoration: "none",
          color: lightColor,
          "&:hover": {
            color: "common.white",
          },
        }}
        rel="noopener noreferrer"
        // target="_blank"
      >
        <Fab
          className="apply_button"
          variant="extended"
          size="medium"
          color="primary"
          aria-label="add"
        >
          {value ? "마일리지 활동 신청" : "장학금 신청"}
          장학금 신청
        </Fab>
      </Link> */}
    </div>
  );
}
