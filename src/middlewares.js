import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";

const s3 = new S3Client({
    region: "ap-northeast-2",
    credentials: {
        accessKeyId: process.env.AWS_ID,
        secretAccessKey: process.env.AWS_SECRET,
    },
});

const uploadStorage = multerS3({
    s3: s3,
    bucket: "choiceweb",
    acl: "public-read", // 아직 이게 작동 안함
});

export const uploadFiles = multer({
    dest: "uploads/",
    limits: { fileSize: 1 * 1024 * 1024 }, // 파일 사이즈 1MB
    storage: uploadStorage,
});
