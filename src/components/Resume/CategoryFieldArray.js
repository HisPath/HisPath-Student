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
  IconButton,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { useFieldArray } from "react-hook-form";
import { v4 as uuid } from "uuid";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 8,
  overflow: "hidden",
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => {
  const { children, className } = props;
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "rgba(0, 0, 0, .03)",
      }}
    >
      <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
        {...{ children, className }}
        sx={{ width: 1 }}
      />
      <Box sx={{ display: "flex", alignItems: "center", mx: 2 }}>
        <IconButton onClick={props.handleDelete}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
})(({ theme }) => ({
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
  const [expanded, setExpanded] = useState(false);
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: `content[${categoryIndex}].data`,
  });
  const onDragEnd = ({ destination, source }) => {
    if (!destination) return;
    setExpanded(false);
    move(source.index, destination.index);
  };
  return (
    <Box p={2}>
      <Typography variant="h6" gutterBottom>
        {category}
      </Typography>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={category}>
          {(provided) => (
            <Box ref={provided.innerRef} {...provided.droppableProps}>
              {fields.map((item, index) => {
                const data = watch(`content[${categoryIndex}].data[${index}]`);
                if (errors?.["content"]?.[categoryIndex]?.["data"]?.[index]) {
                  setExpanded(index);
                }
                return (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <Box
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        sx={{ mb: 2 }}
                      >
                        <Accordion
                          expanded={expanded === index}
                          onChange={handleChange(index)}
                        >
                          <AccordionSummary
                            handleDelete={() => {
                              if (
                                window.confirm(
                                  `${data.title} 항목을 삭제하시겠습니까?`
                                )
                              ) {
                                remove(index);
                              }
                            }}
                          >
                            <Typography>
                              {data.title || "(제목 없음)"}
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 2,
                              }}
                            >
                              <Box sx={{ display: "flex", height: 40 }}>
                                <FormControlLabel
                                  control={
                                    <Switch
                                      {...register(
                                        `content[${categoryIndex}].data[${index}].hasDate`
                                      )}
                                      checked={data.hasDate}
                                    />
                                  }
                                  label="날짜 입력"
                                  sx={{ width: 1 }}
                                />
                                <Box
                                  sx={{
                                    display: data.hasDate ? "flex" : "none",
                                    alignItems: "center",
                                    gap: 1.5,
                                  }}
                                >
                                  <TextField
                                    variant="filled"
                                    fullWidth
                                    size="small"
                                    type="month"
                                    {...register(
                                      `content[${categoryIndex}].data[${index}].startDate`
                                    )}
                                    hiddenLabel
                                  />
                                  ~
                                  <TextField
                                    variant="filled"
                                    fullWidth
                                    size="small"
                                    type="month"
                                    {...register(
                                      `content[${categoryIndex}].data[${index}].endDate`
                                    )}
                                    hiddenLabel
                                  />
                                </Box>
                              </Box>
                              <Box>
                                <TextField
                                  variant="filled"
                                  fullWidth
                                  label="제목"
                                  size="small"
                                  {...register(
                                    `content[${categoryIndex}].data[${index}].title`,
                                    {
                                      required: "제목을 입력해 주세요.",
                                    }
                                  )}
                                  helperText={
                                    errors?.["content"]?.[categoryIndex]?.[
                                      "data"
                                    ]?.[index]?.["title"]?.["message"]
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
                                    `content[${categoryIndex}].data[${index}].description`,
                                    {
                                      required: "내용을 입력해 주세요.",
                                    }
                                  )}
                                  helperText={
                                    errors?.["content"]?.[categoryIndex]?.[
                                      "data"
                                    ]?.[index]?.["description"]?.["message"]
                                  }
                                />
                              </Box>
                            </Box>
                          </AccordionDetails>
                        </Accordion>
                      </Box>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>
      <Button
        color="secondary"
        onClick={() => {
          const id = uuid();
          setExpanded(fields.length);
          append({ id, title: "", description: "", category, hasDate: false });
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
