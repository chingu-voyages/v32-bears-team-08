
exports.up = function(knex) {
    return knex.schema.createTable("subskills", (table) => {
        table.increments("id").primary();
        table.string("name").unique();
        table.integer("skill");
        table
            .foreign("skill")
            .references("id")
            .inTable("skills")
            .onDelete("cascade");
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable("subskills");
};
