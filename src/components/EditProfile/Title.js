import userImg from "../../assets/user.png";
import { Avatar, Box, IconButton } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import AWS from "aws-sdk";
import { updateInfo } from "../../api/editprofile";

export default function Title({ info, getInfo }) {
  console.log(info);
  const updateInformation = async (profile) => {
    await updateInfo(profile, info);
    getInfo();
  };

  AWS.config.update({
    accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY,
  });
  const uploadBucket = new AWS.S3({
    params: { Bucket: process.env.REACT_APP_S3_BUCKET },
    region: process.env.REACT_APP_S3_REGION,
  });

  const handleFileInput = (e) => {
    // 파일 type 유효성 검사
    // const file = e.target.files[0];
    // const fileExt = file.name.split(".").pop();
    // if (file.type !== "image/jpeg" || fileExt !== "jpg") {
    //   alert("jpg 파일만 Upload 가능합니다.");
    //   return;
    // }
    uploadFile(e.target.files[0]);
    updateInformation(
      `https://shine-jung-test-bucket.s3.ap-northeast-2.amazonaws.com/upload/student-${info.studentId}/${e.target.files[0].name}`
    );
  };
  const uploadFile = (file) => {
    const params = {
      ACL: "public-read",
      Body: file,
      Bucket: process.env.REACT_APP_S3_BUCKET,
      Key: `upload/student-${info.studentId}/` + file.name,
      ContentType: "image/jpeg",
    };

    uploadBucket
      .putObject(params)
      .on("httpUploadProgress", (event) => {})
      .send((err) => {
        if (err) console.log(err);
      });
  };
  return (
    <Box sx={{ width: 1 }}>
      <Avatar
        alt="K"
        src={info.profile === "profile.url" ? userImg : info.profile}
        sx={{ width: 256, height: 256, mt: 9, mb: 0, mr: 0 }}
      />
      <IconButton
        sx={{ ml: 25, mt: -6 }}
        color="primary"
        aria-label="upload picture"
        component="label"
        onChange={handleFileInput}
      >
        <input hidden accept="image/*" type="file" />
        <PhotoCamera />
      </IconButton>
    </Box>
  );
}
