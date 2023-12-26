const https = require("https");

const TOKEN = "";

function sendToUserId(req, UserId, HeadMsg, Bodymsg2) {
  const headersLine = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + TOKEN,
  };
  const dataString = JSON.stringify({
    to: UserId,
    messages: [
      {
        type: "text",
        text: HeadMsg,
      },
      {
        type: "text",
        text: Bodymsg2,
      },
    ],
  });
  const webhookOptions = {
    hostname: "api.line.me",
    path: "/v2/bot/message/push",
    method: "POST",
    headers: headersLine,
    body: dataString,
  };
  const request = https.request(webhookOptions, (res) => {
    res.on("data", (d) => {
      process.stdout.write(d);
    });
  });
  request.write(dataString);
  request.end();
}
function sendBroadcast(req, HeadMsg, Bodymsg2) {
  const headersLine = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + TOKEN,
  };
  const dataString = JSON.stringify({
    messages: [
      {
        type: "text",
        text: HeadMsg,
      },
      {
        type: "text",
        text: Bodymsg2,
      },
    ],
  });
  const webhookOptions = {
    hostname: "api.line.me",
    path: "/v2/bot/message/broadcast",
    method: "POST",
    headers: headersLine,
    body: dataString,
  };
  const request = https.request(webhookOptions, (res) => {
    res.on("data", (d) => {
      process.stdout.write(d);
    });
  });
  request.write(dataString);
  request.end();
}
function sendToAdminGroup(req, AdminId, HeadMsg, Bodymsg2) {
  const headersLine = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + TOKEN,
  };
  const dataString = JSON.stringify({
    to: AdminId,
    messages: [
      {
        type: "text",
        text: HeadMsg,
      },
      {
        type: "text",
        text: Bodymsg2,
      },
    ],
  });
  const webhookOptions = {
    hostname: "api.line.me",
    path: "/v2/bot/message/multicast",
    method: "POST",
    headers: headersLine,
    body: dataString,
  };
  const request = https.request(webhookOptions, (res) => {
    res.on("data", (d) => {
      process.stdout.write(d);
    });
  });
  request.write(dataString);
  request.end();
}

module.exports.sendToUserId = sendToUserId;
module.exports.sendBroadcast = sendBroadcast;
module.exports.sendToAdminGroup = sendToAdminGroup;
