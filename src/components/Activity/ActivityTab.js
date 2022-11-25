import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import SelectAndSearch from "./SelectAndSearch";
import ActivityList from "./ActivityList";
import ListAltIcon from "@mui/icons-material/ListAlt";
import BarChartIcon from "@mui/icons-material/BarChart";
import { Paper } from "@mui/material";
import ChartTab from "./ChartTab";
import { useState } from "react";

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
      {value === index && <Box>{children}</Box>}
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

export default function ActivityTab() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [semester, setSemester] = useState("2022-2");

  const semChange = (data) => {
    setSemester(data);
  };

  return (
    <>
      <Paper sx={{ width: "100%", mb: 2, mt: 2, ml: 2 }}>
        <Box sx={{ width: "100%" }}>
          {/* <Box sx={{ borderBottom: 1, borderColor: "divider" }}> */}
          <Box display={"flex"} justifyContent="space-between">
            <Tabs
              value={value}
              onChange={handleChange}
              textColor={"secondary"}
              indicatorColor={"secondary"}
              aria-label="icon position tabs example"
            >
              <Tab
                sx={{
                  pt: 1.5,
                  pl: 1,
                  pr: 1,
                  fontWeight: 600,
                  fontSize: "1.3rem",
                }}
                icon={<ListAltIcon />}
                iconPosition="start"
                label="내 활동"
                {...a11yProps(0)}
              />
              <Tab
                sx={{
                  pt: 1.5,
                  pl: 1,
                  pr: 1,
                  fontWeight: 600,
                  fontSize: "1.3rem",
                }}
                icon={<BarChartIcon />}
                iconPosition="start"
                label="차트"
                {...a11yProps(1)}
              />
            </Tabs>
            {value === 0 ? (
              <SelectAndSearch semChange={semChange} />
            ) : (
              <SelectAndSearch semChange={semChange} />
            )}
          </Box>
          <TabPanel value={value} index={0}>
            <ActivityList />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ChartTab semester={semester} />
          </TabPanel>
        </Box>
      </Paper>
    </>
  );
}
