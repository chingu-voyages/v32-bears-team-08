exports.up = function (knex) {
    return knex.schema.createTable("timeslots", (table) => {
        table.increments("id").primary();
        table.string("day");
        table.time("time");
        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("timeslots");
};
