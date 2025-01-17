import AWS from "aws-sdk";

AWS.config.update({
  // @ts-ignore
  region: process.env.REACT_APP_REGION,
  credentials: new AWS.Credentials({
    // @ts-ignore
    accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID, // @ts-ignore
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
  }),
});

export const comprehend = new AWS.Comprehend();
