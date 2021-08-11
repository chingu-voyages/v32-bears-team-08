exports.up = function (knex) {
    return knex.schema.createTable("users-timeslots", (table) => {
        table.increments("id").primary();
        table.integer("user");
        table
            .foreign("user")
            .references("id")
            .inTable("users")
            .onDelete("cascade");
        table.integer("timeslot");
        table
            .foreign("timeslot")
            .references("id")
            .inTable("timeslots")
            .onDelete("cascade");
        table.boolean("available").default(false);
        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("users-timeslots");
};
