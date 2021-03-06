exports.up = function (knex) {
    return knex.schema.createTable("rejected", (table) => {
        table.increments("id").primary();
        table.integer("anchor");
        table
            .foreign("anchor")
            .references("id")
            .inTable("users")
            .onDelete("cascade");
        table.integer("target");
        table
            .foreign("target")
            .references("id")
            .inTable("users")
            .onDelete("cascade");
        table.integer("skill");
        table
            .foreign("skill")
            .references("id")
            .inTable("skills")
            .onDelete("cascade");
        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("rejected");
};
