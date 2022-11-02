import { useState } from "react";
import {
  Accordion as MuiAccordion,
  AccordionSummary as MuiAccordionSummary,
  AccordionDetails as MuiAccordionDetails,
  Box,
  Button,
  Divider,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { useFieldArray } from "react-hook-form";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import AddIcon from "@mui/icons-material/Add";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 8,
  marginBottom: 16,
  overflow: "hidden",
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

function CategoryFieldArray({
  category,
  categoryIndex,
  register,
  watch,
  control,
  errors,
}) {
  const [expanded, setExpanded] = useState(0);
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const { fields, append, remove } = useFieldArray({
    control,
    name: `contents[${categoryIndex}].data`,
  });
  return (
    <Box p={2}>
      <Typography variant="h6" gutterBottom>
        {category}
      </Typography>
      {fields.map((item, index) => {
        const title = watch(`contents[${categoryIndex}].data[${index}].title`);
        const description = watch(
          `contents[${categoryIndex}].data[${index}].description`
        );
        return (
          <Accordion
            key={item.id}
            expanded={expanded === index}
            onChange={handleChange(index)}
          >
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <Typography>{title || `(${category} ${index + 1})`}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <Box>
                  <TextField
                    variant="filled"
                    fullWidth
                    label="제목"
                    size="small"
                    {...register(
                      `contents[${categoryIndex}].data[${index}].title`,
                      {
                        required: "제목을 입력해 주세요.",
                      }
                    )}
                    helperText={
                      errors?.["contents"]?.[categoryIndex]?.["data"]?.[
                        index
                      ]?.["title"]?.["message"]
                    }
                  />
                </Box>
                <Box>
                  <TextField
                    variant="filled"
                    fullWidth
                    label="내용"
                    size="small"
                    multiline
                    minRows={3}
                    maxRows={10}
                    {...register(
                      `contents[${categoryIndex}].data[${index}].description`,
                      {
                        required: "내용을 입력해 주세요.",
                      }
                    )}
                    helperText={
                      errors?.["contents"]?.[categoryIndex]?.["data"]?.[
                        index
                      ]?.["description"]?.["message"]
                    }
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setExpanded(false);
                      remove(index);
                    }}
                  >
                    삭제
                  </Button>
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
        );
      })}
      <Button
        color="secondary"
        onClick={() => {
          const id = Date.now();
          append({ id, title: "", description: "", category });
        }}
        startIcon={<AddIcon />}
        sx={{ my: 1, display: "flex" }}
      >
        {category} 추가
      </Button>
      <Divider />
    </Box>
  );
}

export default CategoryFieldArray;
