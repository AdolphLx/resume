const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { init: initDB, Counter } = require("./db");

const logger = morgan("tiny");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(logger);

const { resolve } = require('path');
const publucPath = resolve('./www');
app.use(express.static(publucPath)); //托管静态文件，能通过http方式访问

// 首页
app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// 获取计数
app.get("/api/count", async (req, res) => {
  const result = await Counter.count();
  res.send({
    code: 0,
    data: [],
  });
});

const port = process.env.PORT || 8080;

async function bootstrap () {
  // await initDB();
  app.listen(port, () => {
    console.log("启动成功", port);
  });
}

bootstrap();
