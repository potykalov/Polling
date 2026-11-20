import startPolling from "./polling.js";
import "./styles.css";

const messagesBody = document.querySelector("#messages");

function formatDate(timestamp) {
  const date = new Date(timestamp * 1000);

  const options = {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };

  return new Intl.DateTimeFormat("ru-RU", options).format(date);
}

function truncateSubject(subject) {
  return subject.length > 15 ? `${subject.slice(0, 15)}...` : subject;
}

function renderMessages(messages) {
  messages.forEach((message) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${message.from}</td>
      <td>${truncateSubject(message.subject)}</td>
      <td>${formatDate(message.received)}</td>
    `;

    messagesBody.prepend(row);
  });
}

startPolling((messages) => {
  renderMessages(messages);
});
