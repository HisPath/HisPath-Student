import * as React from "react";
import Typography from "@mui/material/Typography";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import Box from "@mui/material/Box";
import MileageTables from "./mileageActivity";
// import Button from "@mui/material/Button";
import ActivityTables from "./Activity";
import { Fab } from "@mui/material";
import { Link } from "react-router-dom";

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
        <Box sx={{ p: 3 }}>
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="마일리지 활동조회" {...a11yProps(0)} />
            <Tab label="마일리지 활동신청" {...a11yProps(1)} />

            <span className="mileageStatus">
              {value ? "" : "장학금 신청 완료"}
            </span>
            {/* <Tab label="Item Three" {...a11yProps(2)} /> */}
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <MileageTables></MileageTables>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ActivityTables></ActivityTables>
        </TabPanel>
        {/* <TabPanel value={value} index={2}>
        Item Three
      </TabPanel> */}
      </Box>
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
