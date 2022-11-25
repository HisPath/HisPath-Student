import * as React from "react";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import MileageTables from "./mileageActivity";
import ActivityTables from "./Activity";
import SemesterSelect from "./semesterSelect";
import ListAltIcon from "@mui/icons-material/ListAlt";
import BarChartIcon from "@mui/icons-material/BarChart";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import TagMenu from "./TagMenu";
import ATagMenu from "./ATagMenu";
import MileageChart from "./MileageChart";
import { Container } from "@mui/material";
import { useRecoilValue } from "recoil";
import { scholarshipApplyState } from "../../store/atom";

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
        <Box>
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
  const applied = useRecoilValue(scholarshipApplyState);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container>
      <Box>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
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
                <Tab
                  sx={{ minHeight: 3, pt: 1.5, fontWeight: 600 }}
                  icon={<PersonOutlineOutlinedIcon />}
                  iconPosition="start"
                  label="내 활동"
                  {...a11yProps(1)}
                />
                <Tab
                  sx={{ minHeight: 3, pt: 1.5, fontWeight: 600 }}
                  icon={<BarChartIcon />}
                  iconPosition="start"
                  label="차트"
                  {...a11yProps(2)}
                />
              </Tabs>
              {applied ? "장학금 신청 완료" : ""}
              <SemesterSelect
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
          <Box sx={{ display: "flex" }}>
            <TagMenu />
            <MileageTables></MileageTables>
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Box sx={{ display: "flex" }}>
            <ATagMenu />
            <ActivityTables></ActivityTables>
          </Box>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <MileageChart></MileageChart>
        </TabPanel>
      </Box>
    </Container>
  );
}
