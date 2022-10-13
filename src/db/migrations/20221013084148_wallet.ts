import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('wallet', (table) => {
        table.increments('wallet_id');
        table.decimal('funds')        
        table.integer('sent_by_id')
        table.integer('user_id').notNullable().unsigned();
        table.foreign('user_id').references('id').inTable('users').onDelete('cascade').onUpdate('cascade');
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('wallet');
}

