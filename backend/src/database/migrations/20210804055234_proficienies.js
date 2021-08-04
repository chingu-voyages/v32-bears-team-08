exports.up = function (knex) {
    return knex.schema.createTable("proficiencies", (table) => {
        table.increments("id").primary();
        table.integer("subskill");
        table
            .foreign("subskill")
            .references("id")
            .inTable("subskills")
            .onDelete("cascade");
        table.integer("user-skill");
        table
            .foreign("user-skill")
            .references("id")
            .inTable("users-skills")
            .onDelete("cascade");
        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("proficiencies");
};
