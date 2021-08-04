exports.up = function (knex) {
    return knex.schema.createTable("users-skills", (table) => {
        table.increments("id").primary();
        table.integer("user");
        table
            .foreign("user")
            .references("id")
            .inTable("users")
            .onDelete("cascade");
        table.integer("skill");
        table
            .foreign("skill")
            .references("id")
            .inTable("skills")
            .onDelete("cascade");
        table.string("proficiency");
        table.integer("streak");
        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("users-skills");
};
