import * as React from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { autocompleteClasses } from "@mui/material";
import { Box } from "@mui/material";
import { Link } from "react-scroll";

const datas = [
  {
    id: 1,
    name: "#전공 마일리지",
  },
  {
    id: 2,
    name: "#산학 마일리지",
  },
  {
    id: 3,
    name: "#비교과 전공활동",
  },
  {
    id: 4,
    name: "#비교과-연구활동",
  },
  {
    id: 5,
    name: "#비교과-특강참여",
  },
  {
    id: 6,
    name: "#비교과-행사참여",
  },
  {
    id: 7,
    name: "#비교과-학회활동",
  },
  {
    id: 8,
    name: "#기타",
  },
];

export default function Tags() {
  const [isSelected, setIsSelected] = React.useState("");

  const onSelectTag = (e, id) => {
    e.preventDefault();

    setIsSelected(id);
  };

  return (
    <Box
      sx={{
        backgroundColor: "white",
        overflow: "auto",
        position: "sticky",
        top: 0,
        paddingTop: 1,
        zIndex: "20",
      }}
    >
      <Stack direction="row" spacing={1}>
        {datas.map((m) => (
          <Link to={m.id} spy={true} smooth={true}>
            <Chip
              onClick={(e) => onSelectTag(e, m.id)}
              label={m.name}
              sx={{
                backgroundColor:
                  isSelected === m.id ? "primary.main" : "background.paper",
                color: isSelected === m.id ? "#fff" : "text.primary",
                ":hover": {
                  backgroundColor:
                    isSelected === m.id ? "primary.main" : "background.paper",
                  color: isSelected === m.id ? "#fff" : "text.primary",
                },
              }}
            />
          </Link>
        ))}
      </Stack>
    </Box>
  );
}
