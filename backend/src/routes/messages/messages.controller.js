const service = require("./messages.service");
const Userservice = require("../users/users.service");
const asyncErrorBoundary = require("../../errors/asyncErrorBoundary");

async function list(req, res, next) {
  const response = await service.list();
  return res.json({
    data: response,
  });
}

async function find(req, res, next) {
  const response = await service.find(req.params.message_id);
  if (response[0]) {
    return res.json({
      data: response[0],
    });
  }
  next({
    status: 404,
    message: `message ${req.params.message_id} not found`,
  });
}

async function create(req, res, next) {
  // get info from request body
  const { text, sender, recipient } = req.body.data;

  // ----- updating database -----
  const response = await service.create(req.body.data);

  // ----- sending email -----
  // get sender first_name and email
  const senderInfo = await Userservice.find(sender);

  // get recipient email
  const recipientInfo = await Userservice.find(recipient);

  // built email object
  let newEmail = {
    recipient: recipientInfo[0].email,
    first_name: senderInfo[0].name,
    senderEmail: senderInfo[0].email,
    userMessage: text,
  };

  // send email
  service.sendEmail(newEmail);

  // response
  return res.status(201).json({
    data: response[0],
  });
}

async function remove(req, res, next) {
  const response = await service.remove(req.params.message_id);
  return res.json({
    data: response[0],
  });
}

function hasData(req, res, next) {
  if (req.body.data) {
    return next();
  }
  next({
    status: 400,
    message: "request body must have data property",
  });
}

function hasText(req, res, next) {
  if (req.body.data.text) {
    return next();
  }
  next({
    status: 400,
    message: "request body data must have text property",
  });
}

function hasSender(req, res, next) {
  if (req.body.data.sender) {
    return next();
  }
  next({
    status: 400,
    message: "request body data must have sender property",
  });
}

function hasRecipient(req, res, next) {
  if (req.body.data.recipient) {
    return next();
  }
  next({
    status: 400,
    message: "request body data must have recipient property",
  });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  find: [asyncErrorBoundary(find)],
  create: [
    hasData,
    hasText,
    hasSender,
    hasRecipient,
    asyncErrorBoundary(create),
  ],
  remove: [asyncErrorBoundary(remove)],
};
