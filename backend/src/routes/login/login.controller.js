const path = require("path");
const service = require("./login.service");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncErrorBoundary = require("../../errors/asyncErrorBoundary");
require("dotenv").config({
    path: path.join(__dirname, "..", "..", "..", ".env"),
});

async function findUser(req, res, next) {
    const response = await service.find(req.body.data.email);
    let authorized = false;
    if (response) {
        authorized = await bcrypt.compare(
            req.body.data.password,
            response.password
        );
    }
    console.log(response);
    if (!response || !authorized) {
        next({
            status: 400,
            message: "Incorrect email address or password",
        });
    }
    const token = await createJWT(response.email, { id: response.id });
    return res.send({
        authToken: token,
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

async function requireAuth(req, res, next) {
    console.log(req.headers.authorization);
    const authToken = req.headers.authorization || "";
    let bearerToken;
    if (!authToken.toLowerCase().startsWith("bearer ")) {
        return next({
            status: 401,
            message: "Missing bearer token",
        });
    }
    bearerToken = authToken.slice(7, authToken.length);
    try {
        const payload = jwt.verify(bearerToken, process.env.JWT_SECRET, {
            algorithms: ["HS256"],
        });
        const response = await service.find(payload.sub);
        if (!response) {
            return next({
                status: 401,
                message: "Unauthorized Request",
            });
        }
        req.user = response;
        next();
    } catch (error) {
        next({
            status: 401,
            message: "Unauthorized Request",
        });
    }
}

async function refresh(req, res, next) {
    const token = await createJWT(req.user.email, { id: req.user.id });
    return res.send({
        authToken: token,
    });
}

module.exports = {
    login: [hasData, hasEmail, hasPassword, asyncErrorBoundary(findUser)],
    refresh: [asyncErrorBoundary(requireAuth), asyncErrorBoundary(refresh)],
};
