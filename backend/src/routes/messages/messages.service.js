const knex = require("../../database/connection");
const nodemailer = require("nodemailer");

const table = "messages";

function list() {
  return knex(table).select("*");
}

function find(messageId) {
  return knex(table).select("*").where({
    id: messageId,
  });
}

function create(data) {
  return knex(table).insert(data, "*");
}

function remove(messageId) {
  return knex(table).where({ id: messageId }).del();
}

function sendEmail(email) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      type: "login",
      user: process.env.GMAIL_ID,
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: "learnTogetherApp32@gmail.com",
    to: email.recipient,
    subject: "Hi from Learn Together!",
    text: "That was easy!",
    html:
      "<b>Hey there! </b><br>" +
      email.userMessage +
      "<br /><br>To get in touch with " +
      email.first_name +
      ", reply to: " +
      email.senderEmail +
      "<br />",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

module.exports = {
  list,
  find,
  create,
  remove,
  sendEmail,
};
