import { Avatar, Box, Button, Divider, InputLabel, TextField, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import CategoryFieldArray from "./CategoryFieldArray";
import CategoryModal from "./CategoryModal";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { grey } from "@mui/material/colors";
import { getInfo, postResume } from "../../api/resume";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import userImg from "../../assets/sungjin.png";

function Post({ refresh }) {
    const [info, setInfo] = useState([]);
    useEffect(() => {
        getInfo().then((data) => setInfo(data));
    }, []);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [categories, setCategories] = useState(["경력", "학력", "기술", "자격증", "수상", "외국어", "링크", "기타"]);
    const {
        register,
        watch,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({ defaultValues: { title: "이력서" } });
    const { move, remove } = useFieldArray({
        control,
        name: `content`,
    });
    const onValid = async (data) => {
        await postResume({
            title: data.title,
            content: JSON.stringify({
                dataList: data.content,
                categories: categories,
            }),
        });
        refresh();
        navigate("..");
        enqueueSnackbar("저장되었습니다.", { variant: "success" });
    };
    const onInvalid = () => {
        enqueueSnackbar("모든 칸을 채워 주세요.", { variant: "error" });
    };
    const printRef = useRef();
    const handleDownloadPdf = async () => {
        const element = printRef.current;
        const canvas = await html2canvas(element, { scale: 4 });
        const data = canvas.toDataURL("image/png");

        const pdf = new jsPDF();
        const imgProperties = pdf.getImageProperties(data);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

        pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${watch("title")}.pdf`);
    };
    return (
        <Box sx={{ position: "fixed", width: 1, height: 1, top: 0 }}>
            <Box sx={{ display: "flex", height: 1 }}>
                <Box
                    maxWidth="sm"
                    sx={{
                        px: 2,
                        width: 1,
                        backgroundColor: "background.default",
                        overflow: "auto",
                    }}
                >
                    <Box
                        sx={{
                            position: "sticky",
                            top: 0,
                            backgroundColor: "background.default",
                            zIndex: "appBar",
                            mb: 2,
                        }}
                    >
                        <Box
                            component="form"
                            onSubmit={handleSubmit(onValid, onInvalid)}
                            sx={{
                                py: 2,
                                display: "flex",
                                justifyContent: "space-between",
                                gap: 1,
                            }}
                        >
                            <Button onClick={() => navigate("..")} startIcon={<ArrowBackIcon />}>
                                이전
                            </Button>
                            <Box sx={{ display: "flex", gap: 1 }}>
                                <CategoryModal {...{ categories, setCategories, move, remove }} />
                                <Button variant="contained" type="submit">
                                    저장
                                </Button>
                                <Button onClick={handleDownloadPdf}>PDF 다운로드</Button>
                            </Box>
                        </Box>
                        <Divider />
                    </Box>
                    <Box>
                        <Box sx={{ p: 2 }}>
                            <InputLabel>이력서 제목</InputLabel>
                            <TextField variant="standard" {...register("title")} />
                        </Box>
                        {categories.map((category, categoryIndex) => (
                            <CategoryFieldArray key={category} category={category} categoryIndex={categoryIndex} {...{ register, watch, control, errors }} />
                        ))}
                    </Box>
                </Box>
                <Box
                    sx={{
                        width: 1,
                        display: "flex",
                        justifyContent: "center",
                        backgroundColor: grey[200],
                        p: 4,
                    }}
                >
                    <Box
                        ref={printRef}
                        sx={{
                            width: 720,
                            backgroundColor: "background.paper",
                            boxShadow: 2,
                            height: 1,
                            borderRadius: 1,
                            overflow: "auto",
                            display: "flex",
                            gap: 1,
                        }}
                    >
                        <Box
                            sx={{
                                position: "sticky",
                                top: 0,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                borderRight: 1,
                                borderColor: "divider",
                                p: 5,
                                width: 220,
                            }}
                        >
                            <Avatar alt={info.name} src={userImg} sx={{ width: 150, height: 150, mb: 3 }} />
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "flex-end",
                                    m: 1,
                                }}
                            >
                                <Typography variant="h4">{info.studentName}</Typography>
                                <Typography fontWeight={600}>{info.departmentName}</Typography>
                                <Typography fontWeight={600}>{info.email}</Typography>
                            </Box>
                        </Box>
                        <Box sx={{ p: 5, width: 1 }}>
                            <Typography variant="h4" component="h1" mb={3}>
                                {watch("title")}
                            </Typography>
                            {watch("content")?.map((item, index) => (
                                <Box key={index} mb={4}>
                                    {item.data.length !== 0 && (
                                        <>
                                            <Typography variant="h5" component="h2" gutterBottom>
                                                {categories[index]}
                                            </Typography>
                                            <Box mb={2}>
                                                {watch(`content[${index}].data`).map((data, dataIndex) => (
                                                    <Box key={dataIndex} p={1} py={0.5}>
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                alignItems: "center",
                                                                gap: 1.5,
                                                                mb: 0.5,
                                                            }}
                                                        >
                                                            <Typography variant="h6" component="h3">
                                                                {data.title}
                                                            </Typography>
                                                            {data.hasDate && (
                                                                <Typography variant="caption">
                                                                    {data.startDate === data.endDate ? data.startDate : `${data.startDate} ~ ${data.endDate || "현재"}`}
                                                                </Typography>
                                                            )}
                                                        </Box>
                                                        <Typography p={1} pt={0}>
                                                            {data.description.split("\n").map((line, index) => {
                                                                return (
                                                                    <span key={index}>
                                                                        {line}
                                                                        <br />
                                                                    </span>
                                                                );
                                                            })}
                                                        </Typography>
                                                    </Box>
                                                ))}
                                                <Divider />
                                            </Box>
                                        </>
                                    )}
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default Post;
