import * as React from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { autocompleteClasses } from "@mui/material";
import { Box } from "@mui/material";
import { Link } from "react-scroll";
import axios from "axios";
import { useEffect } from "react";

// const datas = [
//   {
//     id: 1,
//     name: "#전공 마일리지",
//   },
//   {
//     id: 2,
//     name: "#산학 마일리지",
//   },
//   {
//     id: 3,
//     name: "#비교과 전공활동",
//   },
//   {
//     id: 4,
//     name: "#비교과-연구활동",
//   },
//   {
//     id: 5,
//     name: "#비교과-특강참여",
//   },
//   {
//     id: 6,
//     name: "#비교과-행사참여",
//   },
//   {
//     id: 7,
//     name: "#비교과-학회활동",
//   },
//   {
//     id: 8,
//     name: "#기타",
//   },
// ];

export default function Tags() {
  const [categories, setCategories] = React.useState([]);
  const [isSelected, setIsSelected] = React.useState("");

  const getCategories = async () => {
    const category = await axios.get(
      `${process.env.REACT_APP_SERVER}/categories`
    );
    setCategories(category.data);
  };
  const onSelectTag = (e, id) => {
    e.preventDefault();

    setIsSelected(id);
  };
  useEffect(() => {
    getCategories();

    console.log(categories);
    // console.log(activities);
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "white",
        overflow: "auto",
        position: "sticky",
        top: 0,
        paddingTop: 3,
        paddingBottom: 3,
        zIndex: "20",
      }}
    >
      <Stack direction="row" spacing={5}>
        {categories.map((m) => (
          <Link to={m.categoryId} spy={true} smooth={true}>
            <Chip
              onClick={(e) => onSelectTag(e, m.categoryId)}
              label={"#" + m.name}
              sx={{
                backgroundColor:
                  isSelected === m.categoryId
                    ? "primary.main"
                    : "background.paper",
                color: isSelected === m.categoryId ? "#fff" : "text.primary",
                ":hover": {
                  backgroundColor:
                    isSelected === m.categoryId
                      ? "primary.main"
                      : "background.paper",
                  color: isSelected === m.categoryId ? "#fff" : "text.primary",
                },
              }}
            />
          </Link>
        ))}
      </Stack>
    </Box>
  );
}
