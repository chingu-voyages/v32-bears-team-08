require("dotenv").config();
const path = require("path");

function environmentSwitch(NODE_ENV) {
    switch (NODE_ENV) {
        case "development":
            return DATABASE_URL_DEVELOPMENT;
        case "staging":
            return DATABASE_URL_STAGING;
        case "production":
            return DATABASE_URL;
    }
}

const {
    NODE_ENV = "development",
    DATABASE_URL,
    DATABASE_URL_DEVELOPMENT,
    DATABASE_URL_STAGING,
    DEBUG,
} = process.env;

const URL = environmentSwitch(NODE_ENV);

module.exports = {
    development: {
        client: "postgresql",
        pool: { min: 1, max: 5 },
        connection: URL,
        migrations: {
            directory: path.join(__dirname, "src", "database", "migrations"),
        },
        seeds: {
            directory: path.join(__dirname, "src", "database", "seeds"),
        },
        debug: !!DEBUG,
    },
    staging: {
        client: "postgresql",
        pool: { min: 1, max: 5 },
        connection: URL,
        migrations: {
            directory: path.join(__dirname, "src", "database", "migrations"),
        },
        seeds: {
            directory: path.join(__dirname, "src", "database", "seeds"),
        },
        debug: !!DEBUG,
    },
    production: {
        client: "postgresql",
        pool: { min: 1, max: 5 },
        connection: URL,
        migrations: {
            directory: path.join(__dirname, "src", "database", "migrations"),
        },
        seeds: {
            directory: path.join(__dirname, "src", "database", "seeds"),
        },
        debug: !!DEBUG,
    },
};
