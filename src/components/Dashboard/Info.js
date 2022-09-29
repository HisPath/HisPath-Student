import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { Box, Button, IconButton, Typography } from '@mui/material';
import userImg from '../../assets/user.png';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';
import BookIcon from '@mui/icons-material/Book';
import LinkIcon from '@mui/icons-material/Link';
import { Link } from 'react-router-dom';

const data = {
  name: '김한동',
  studentNumber: 22000000,
  department: '전산전자공학부',
  major1: '전산',
  major2: '전자',
  grade: 3,
  semester: 6,
  contact: '010-1234-5678',
  email: 'example@handong.ac.kr',
  // githubid: "https://github.com",
};

export default function ImageAvatars() {
  return (
    <Box>
      <Avatar alt="K" src={userImg} sx={{ width: 256, height: 256, mr: 7, mt: 5, mb: 0 }} />
      <Link to={`/edit`} style={{ textDecoration: 'none' }}>
        <Button variant={'outlined'} p={10} sx={{ ml: 23 }}>
          프로필 수정
        </Button>
      </Link>
      <Box sx={{ mt: 3 }}>
        <Typography
          mb={1}
          fontSize={'2.3rem'}
          fontWeight={900}
          fontFamily="Ubuntu"
          color="primary.light"
        >
          {data.name} {data.studentNumber}
        </Typography>
        <Typography mt={1} mb={1} fontSize={'1.3rem'} fontWeight={600}>
          {data.department} {data.grade}학년 {data.semester}학기{' '}
          {/* {data.state ? "재학" : "휴학"} */}
        </Typography>
        <Box display={'flex'} gap={2}>
          <Typography mt={1} mb={1} fontSize={'1.2rem'} fontWeight={400}>
            1전공 : {data.major1}
          </Typography>
          {data.major2 && (
            <Typography mt={1} mb={1} fontSize={'1.2rem'} fontWeight={400}>
              2전공 : {data.major2}
            </Typography>
          )}
        </Box>
        <Typography mt={1} mb={1} fontSize={'1.2rem'} fontWeight={400}>
          {data.contact}
        </Typography>
        <Typography mt={1} mb={2} fontSize={'1.2rem'} fontWeight={400}>
          {data.email}
        </Typography>
        <IconButton color="primary" aria-label="upload picture" component="label">
          <GitHubIcon />
        </IconButton>
        <IconButton color="primary" aria-label="upload picture" component="label">
          <LinkIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
