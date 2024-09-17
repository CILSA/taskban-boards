// boards.js
import express from "express";
import cors from "cors";
import serverless from "serverless-http";
import routes from "./routes/routes.js";

const app = express();
app.use(cors());

app.use('/.netlify/functions/server', routes);

export const handler = serverless(app);
