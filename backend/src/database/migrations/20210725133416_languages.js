exports.up = function (knex) {
    return knex.schema.createTable("languages", (table) => {
        table.increments("id").primary();
        table.string("name").unique();
        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("languages");
};
