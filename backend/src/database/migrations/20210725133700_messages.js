exports.up = function (knex) {
    return knex.schema.createTable("messages", (table) => {
        table.increments("id").primary();
        table.text("text");
        table.integer("sender");
        table
            .foreign("sender")
            .references("id")
            .inTable("users")
            .onDelete("cascade");
        table.integer("recipient");
        table
            .foreign("recipient")
            .references("id")
            .inTable("users")
            .onDelete("cascade");
        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("messages");
};
