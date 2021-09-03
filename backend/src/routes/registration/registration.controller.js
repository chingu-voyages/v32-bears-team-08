const path = require("path");
require("dotenv").config({
    path: path.join(__dirname, "..", "..", "..", ".env"),
});
const service = require("./registration.service");
const asyncErrorBoundary = require("../../errors/asyncErrorBoundary");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const xss = require("xss");

async function create(req, res, next) {
    const hashedPassword = await hashPassword(req.body.data.password);
    const userWithHashedPassword = {
        name: req.body.data.name,
        email: req.body.data.email,
        password: hashedPassword,
    };
    const response = await service.create(userWithHashedPassword);
    if (response) {
        return res.status(201).json({
            id: response[0].id,
            name: response[0].name,
            email: response[0].email,
            authToken: await createJWT(response[0].email, { id: response[0].id, name: response[0].name }),
        });
    }
    next({
        status: 500,
        message: "an error has occurred, unable to create user",
    });
}

async function findDuplicateEmail(req, res, next) {
    const response = await service.find(req.body.data.email);
    if (response) {
        return next({
            status: 400,
            message: "this email address is already in use by another account",
        });
    }
    next();
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

function hasName(req, res, next) {
    if (req.body.data.name) {
        return next();
    }
    next({
        status: 400,
        message: "request body data must have name property",
    });
}

function hasEmail(req, res, next) {
    if (req.body.data.email) {
        return next();
    }
    next({
        status: 400,
        message: "request body data must have email property",
    });
}

function hasPassword(req, res, next) {
    if (req.body.data.password) {
        return next();
    }
    next({
        status: 400,
        message: "request body data must have password property",
    });
}

function validatePassword(req, res, next) {
    const valregex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/;
    const password = req.body.data.password;
    console.log(password.length)
    if (password.length < 8) {
        next({
            status: 400,
            message: "password must contain at least 8 characters",
        });
    }
    if (password.startsWith(" ") || password.endsWith(" ")) {
        next({
            status: 400,
            message: "password cannot begin or end with space",
        });
    }
    if (!valregex.test(password)) {
        next({
            status: 400,
            message:
                "password must contain at least 1 upper-case character, one lower-case character, one number, and one special character",
        });
    }
    next();
}

async function hashPassword(password) {
    const hashedPassword = await bcrypt.hash(password, 12);
    console.log(hashedPassword)
    if (hashedPassword) {
        return hashedPassword;
    }
    next({
        status: 500,
        message: "an error has occurred, unable to encrypt password",
    });
}

async function createJWT(subject, payload) {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        subject,
        expiresIn: process.env.JWT_EXPIRY,
        algorithm: "HS256",
    });
    if (token) {
        console.log(token);
        return token;
    }
    next({
        status: 500,
        message: "an error has occurred, unable to create auth token",
    });
}

module.exports = {
    create: [
        hasData,
        hasName,
        hasEmail,
        hasPassword,
        validatePassword,
        asyncErrorBoundary(findDuplicateEmail),
        asyncErrorBoundary(create),
    ],
};
