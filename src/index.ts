import express from "express";
import indexRouter from "@app/routes";

const PORT = 3000;

const app = express();

app.use(indexRouter);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
