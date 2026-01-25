import 'dotenv/config';
import AWS from 'aws-sdk';

AWS.config.update({ region: process.env.AWS_REGION });

const s3 = new AWS.S3();
const S3_BUCKET = "amzn-s3-bucket-git-clone";

export { s3, S3_BUCKET };