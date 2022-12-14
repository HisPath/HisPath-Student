import {
  Avatar,
  Box,
  Card as MuiCard,
  Container,
  Grid,
  styled,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import LibraryAddRoundedIcon from "@mui/icons-material/LibraryAddRounded";
import { getDisplayTime } from "../../utils/functions";

const colors = ["#fff3aa", "#ffd0a8", "#ffb1b1", "#d9d1ff", "#b7efff"];

const Card = styled(MuiCard)(({ theme }) => ({
  height: 200,
  transition: "all 0.15s ease-in 0s",
  "&:hover": {
    transform: "translateY(-4px);",
  },
  display: "flex",
  flexDirection: "column",
}));

function List({ resumes }) {
  return (
    <Container sx={{ backgroundColor: "background.default" }}>
      <Typography variant="h5" fontWeight={600} sx={{ my: 8, mb: 5 }}>
        나의 이력서
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={3} component={Link} to="post">
          <Card sx={{ alignItems: "center", justifyContent: "center" }}>
            <Avatar
              sx={{
                color: "white",
                backgroundColor: "primary.main",
                width: 64,
                height: 64,
              }}
            >
              <LibraryAddRoundedIcon fontSize="large" />
            </Avatar>
            <Typography variant="h6" mt={2}>
              새 이력서 작성
            </Typography>
          </Card>
        </Grid>
        {resumes.map((resume) => {
          const date = new Date(resume.updateAt);
          return (
            <Grid
              key={resume.resumeId}
              item
              xs={3}
              component={Link}
              to={`edit/${resume.resumeId}`}
            >
              <Card>
                <Box
                  sx={{
                    height: 56,
                    backgroundColor: colors[resume.resumeId % 5],
                  }}
                />
                <Box m={3} mt="auto">
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    {resume.title}
                  </Typography>
                  <Typography
                    color="text.secondary"
                    fontWeight={600}
                    gutterBottom
                  >
                    {date.getFullYear()}년 {date.getMonth() - 1}월{" "}
                    {date.getDate() - 1}일
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {getDisplayTime(date)} 저장
                  </Typography>
                </Box>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}

export default List;
