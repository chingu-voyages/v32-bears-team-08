exports.up = function (knex) {
    return knex.schema.createTable("users-resources", (table) => {
        table.increments("id").primary();
        table.integer("user");
        table
            .foreign("user")
            .references("id")
            .inTable("users")
            .onDelete("cascade");
        table.integer("resource");
        table
            .foreign("resource")
            .references("id")
            .inTable("resources")
            .onDelete("cascade");
        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("users-resources");
};
