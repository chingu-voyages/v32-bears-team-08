const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const express = require("express");
const cors = require("cors");

const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");

const registrationRouter = require("./routes/registration/registration.router")
const loginRouter = require("./routes/login/login.router")
const usersRouter = require("./routes/users/users.router")
const skillsRouter = require("./routes/skills/skills.router")
const languagesRouter = require("./routes/languages/languages.router")
const resourcesRouter = require("./routes/resources/resources.router")
const messagesRouter = require("./routes/messages/messages.router")
const invitesRouter = require("./routes/invites/invites.router")
const timeslotsRouter = require("./routes/timeslots/timeslots.router")
const usersSkillsRouter = require("./routes/users-skills/users-skills.router")
const usersLanguagesRouter = require("./routes/users-languages/users-languages.router")
const usersTimeslotsRouter = require("./routes/users-timeslots/users-timeslots.router")
const usersResourcesRouter = require("./routes/users-resources/users-resources.router");

const app = express();

app.use(cors());
app.use(express.json());

app.options("*", cors());
app.use("/registration", registrationRouter)
app.use("/login", loginRouter)
app.use("/users", usersRouter)
app.use("/skills", skillsRouter)
app.use("/languages", languagesRouter)
app.use("/resources", resourcesRouter)
app.use("/messages", messagesRouter)
app.use("/invites", invitesRouter)
app.use("/timeslots", timeslotsRouter)
app.use("/users-skills", usersSkillsRouter)
app.use("/users-languages", usersLanguagesRouter)
app.use("/users-timeslots", usersTimeslotsRouter)
app.use("/users-resources", usersResourcesRouter)

app.use(notFound);
app.use(errorHandler);


//Serve Static Assets in production
//set static folder
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    });
  }

module.exports = app;
