import {sqliteTable, int, text} from 'drizzle-orm/sqlite-core'


export const todosTable = sqliteTable('todos', {
    id: int().primaryKey({autoIncrement: true}),
    title: text().notNull(),
    done: int({mode: 'boolean'}).notNull(),
    //Homework06 changes
    priority: text('priority', { enum: ["low", "normal", "high"] })
        .notNull()
        .default('normal'),
})
