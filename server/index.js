import express from "express";
import cors from "cors";
import { faker } from "@faker-js/faker";

const app = express();
const PORT = 3000;

app.use(cors());

const messages = [];

function generateMessage() {
  return {
    id: faker.string.uuid(),
    from: faker.internet.email(),
    subject: faker.lorem.sentence(),
    body: faker.lorem.paragraph(),
    received: Math.floor(Date.now() / 1000),
  };
}

// Генерируем начальные сообщения
for (let i = 0; i < 10; i += 1) {
  messages.push(generateMessage());
}

app.get("/messages/unread", (req, res) => {
  const unreadMessages = messages.splice(0, messages.length);

  res.json({
    status: "ok",
    timestamp: Math.floor(Date.now() / 1000),
    messages: unreadMessages,
  });
});

// Каждые 15 секунд добавляем новое сообщение
setInterval(() => {
  messages.push(generateMessage());
}, 15000);

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
