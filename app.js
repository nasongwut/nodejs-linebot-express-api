const express = require("express");

const { sendToUserId, sendBroadcast, sendToAdminGroup } = require("./fn/line");
const { handleEvent } = require("./fn/hook");

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.post("/webhook", (req, res) => {
  Promise.all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error("error at app.post", err);
    });
});

app.post("/sendToUserId", (req, res) => {
  const body = req.body;
  sendToUserId(req, body.UserId, body.HeadMsg, body.Msg);
  res.json({ msg: "OK" });
});

app.post("/sendToAdminId", (req, res) => {
  const body = req.body;
  sendToAdminGroup(req, body.AdminId, body.HeadMsg, body.Msg);
  res.json({ msg: "OK" });
});

app.get("/sendBroadcast", (req, res) => {
  const body = req.body;
  sendBroadcast(req, body.HeadMsg, body.Msg);
  res.json({ msg: "OK" });
});

app.listen(PORT, () => {
  console.log(`app listening at port ${PORT}`);
});
