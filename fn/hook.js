const { TOKEN, headersLine } = require("./auth");
const https = require("https");
function handleEvent(event) {
  const dataString = JSON.stringify({
    replyToken: event.replyToken,
    messages: [
      {
        type: "text",
        text: "Hello, user",
      },
      {
        type: "text",
        text: "May I help you?",
      },
    ],
  });
  console.log("__________________________");
  console.log(event);
  console.log("__________________________");
  if (event.type !== "message" || event.message.type !== "text") {
    return Promise.resolve(null);
  }
  const webhookOptions = {
    hostname: "api.line.me",
    path: "/v2/bot/message/reply",
    method: "POST",
    headers: headersLine,
    body: dataString,
  };
  const request = https.request(webhookOptions, (res) => {
    res.on("data", (d) => {
      process.stdout.write(d);
    });
  });
  request.on("error", (err) => {
    console.error(err);
  });
  request.write(dataString);
  request.end();
}

module.exports.handleEvent = handleEvent;
