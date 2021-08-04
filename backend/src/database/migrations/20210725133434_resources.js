exports.up = function (knex) {
    return knex.schema.createTable("resources", (table) => {
        table.increments("id").primary();
        table.string("title");
        table.string("type");
        table.text("url");
        table.integer("skill");
        table
            .foreign("skill")
            .references("id")
            .inTable("skills")
            .onDelete("cascade")
        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("resources");
};
