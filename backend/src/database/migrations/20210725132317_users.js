exports.up = function (knex) {
    return knex.schema.createTable("users", (table) => {
        table.increments("id").primary();
        table.string("name").unique();
        table.string("email").unique();
        table.string("password");
        table.text("bio");
        table.text("goal");
        table.boolean("active").default(true);
        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("users");
};
