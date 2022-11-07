import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/system";

const Board = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 8,
  padding: 16,
  borderRadius: 6,
  height: "calc(100% - 72px)",
  overflow: "scroll",
  backgroundColor: theme.palette.grey[200],
}));
const Card = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  borderRadius: 6,
  padding: 10,
  backgroundColor: theme.palette.grey[300],
}));

const style = {
  position: "absolute",
  top: "15%",
  left: "calc(50% - 240px)",
  width: 480,
  height: "70%",
  borderRadius: 3,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function CategoryModal({ categories, setCategories, move }) {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const onDragEnd = ({ draggableId, destination, source }) => {
    if (!destination) return;
    move(source.index, destination.index);
    setCategories((old) => {
      const copy = [...old];
      copy.splice(source.index, 1);
      copy.splice(destination.index, 0, draggableId);
      return copy;
    });
  };
  const [newCategory, setNewCategory] = useState("");
  const onAdd = () => {
    if (!newCategory) return;
    if (categories.includes(newCategory)) {
      enqueueSnackbar("이미 추가된 카테고리입니다.");
      return;
    }
    setCategories((old) => [...old, newCategory]);
    setNewCategory("");
  };
  const onDelete = (category) => {
    setCategories((old) => old.filter((item) => item !== category));
  };
  return (
    <div>
      <Button onClick={handleOpen}>카테고리 설정</Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6" component="h2">
              카테고리 설정
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <TextField
                size="small"
                name="category"
                sx={{ width: 100 }}
                value={newCategory}
                onChange={(event) => setNewCategory(event.target.value)}
                placeholder="카테고리명"
                required
              />
              <Button onClick={onAdd} variant="outlined">
                카테고리 추가
              </Button>
            </Box>
          </Box>
          <Box sx={{ mt: 3, height: 1 }}>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="category">
                {(provided) => (
                  <Board ref={provided.innerRef} {...provided.droppableProps}>
                    {categories.map((category, index) => (
                      <Draggable
                        key={category}
                        draggableId={category}
                        index={index}
                      >
                        {(provided) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                          >
                            {category}
                            <IconButton
                              size="small"
                              onClick={() => onDelete(category)}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Card>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Board>
                )}
              </Droppable>
            </DragDropContext>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default CategoryModal;
