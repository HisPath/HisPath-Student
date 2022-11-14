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

const labels = {
  경력: { title: "회사명", description: "직책 및 주요 성과" },
  학력: { title: "학교명", description: "전공 및 학위" },
  기술: { title: "기술명", description: "활용 능력" },
  자격증: { title: "자격증명", description: "발급일" },
  수상: { title: "수상명", description: "수상 내역" },
  외국어: { title: "언어", description: "활용 수준" },
  링크: { title: "링크 제목", description: "링크 주소" },
};

const placeholders = {
  경력: {
    title: "예시) 엑슨투",
    description:
      "예시) 직책 - 책임 연구원\n업무 내용과 주요 성과를 입력해주세요.",
  },
  학력: {
    title: "예시) 한동대학교",
    description: "예시) 전공 - 컴퓨터공학\n예시) 학위 - 학사",
  },
  기술: {
    title: "기술 스택을 입력해 주세요.",
    description:
      "상 - 환경에 따라 최적화를 할 수 있음.\n중 - 기술 내부 구조에 대해 이해할 수 있음.\n하 - 기본적인 기능을 구현할 수 있음.",
  },
  자격증: {
    title: "자격증명을 입력하세요.",
    description: "발급일을 입력하세요.",
  },
  수상: {
    title: "예시) 대경권 프로그래밍 경진 대회",
    description: "예시) 우수상\n수상 내역과 세부사항을 입력해 주세요.",
  },
  외국어: {
    title: "예시) 영어",
    description:
      "어학 연수 경험이나 공인 영어 성적 등,\n활용 수준을 보여주는 내용을 입력하세요.",
  },
  링크: { title: "링크 제목을 입력해주세요.", description: "https://" },
};

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
  const label = labels[category] ?? {
    title: "제목",
    description: "내용",
  };
  const placeholder = placeholders[category] ?? {
    title: "제목을 입력하세요.",
    description: "내용을 입력하세요.",
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
                                    InputProps={{
                                      sx: { borderRadius: 1 },
                                      disableUnderline: true,
                                    }}
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
                                    InputProps={{
                                      sx: { borderRadius: 1 },
                                      disableUnderline: true,
                                    }}
                                  />
                                </Box>
                              </Box>
                              <Box>
                                <TextField
                                  variant="filled"
                                  fullWidth
                                  label={label.title}
                                  placeholder={placeholder.title}
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
                                  InputProps={{
                                    sx: { borderRadius: 1 },
                                    disableUnderline: true,
                                  }}
                                />
                              </Box>
                              <Box>
                                <TextField
                                  variant="filled"
                                  fullWidth
                                  label={label.description}
                                  placeholder={placeholder.description}
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
                                  InputProps={{
                                    sx: { borderRadius: 1 },
                                    disableUnderline: true,
                                  }}
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
