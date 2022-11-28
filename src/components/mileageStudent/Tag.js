import * as React from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { autocompleteClasses } from "@mui/material";
import { Box } from "@mui/material";
import { Link } from "react-scroll";
import { useEffect } from "react";
import { getCategories } from "../../api/mileage";

export default function Tags() {
  const [categories, setCategories] = React.useState([]);
  const [isSelected, setIsSelected] = React.useState("");

  const onSelectTag = (e, id) => {
    e.preventDefault();

    setIsSelected(id);
  };
  useEffect(() => {
    const fetch = async () => {
      const cate = await getCategories();
      setCategories(cate);
    };
    fetch();
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
