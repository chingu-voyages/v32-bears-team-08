exports.up = function (knex) {
    return knex.schema.createTable("opportunities", (table) => {
        table.increments("id").primary();
        table.integer("subskill");
        table
            .foreign("subskill")
            .references("id")
            .inTable("subskills")
            .onDelete("cascade");
        table.integer("user_skill");
        table
            .foreign("user_skill")
            .references("id")
            .inTable("users-skills")
            .onDelete("cascade");
        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("opportunities");
};
