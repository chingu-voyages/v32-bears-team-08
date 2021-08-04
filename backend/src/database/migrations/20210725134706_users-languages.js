exports.up = function (knex) {
    return knex.schema.createTable("users-languages", (table) => {
        table.increments("id").primary();
        table.integer("user");
        table
            .foreign("user")
            .references("id")
            .inTable("users")
            .onDelete("cascade");
        table.integer("language");
        table
            .foreign("language")
            .references("id")
            .inTable("languages")
            .onDelete("cascade");
        table.string("fluency");
        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("users_languages");
};
