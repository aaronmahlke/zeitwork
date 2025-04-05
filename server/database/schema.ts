import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  uuid,
  text,
  pgEnum,
  timestamp,
  primaryKey,
  jsonb,
  unique,
} from "drizzle-orm/pg-core";
import { uuidv7 } from "uuidv7";

const timestamps = {
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  deletedAt: timestamp("deleted_at", { withTimezone: true }),
};

const organisationId = {
  organisationId: uuid("organisation_id")
    .notNull()
    .references(() => organisations.id),
};

// --- Enums ---
export const todoStatusEnum = pgEnum("todo_status", [
  "backlog",
  "todo",
  "in_progress",
  "done",
  "canceled",
]);

export const customFieldTypeEnum = pgEnum("custom_field_type", [
  "text",
  "number",
  "date",
  "select",
  "user",
]);

// --- Tables ---

export const organisations = pgTable("organisations", {
  id: uuid("id").primaryKey().$defaultFn(uuidv7),
  name: text("name").notNull(),
  ...timestamps,
});

export const users = pgTable("users", {
  id: uuid("id").primaryKey().$defaultFn(uuidv7),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password"),
  resetPasswordToken: text("reset_password_token"),
  resetPasswordExpiresAt: timestamp("reset_password_expires_at", {
    withTimezone: true,
  }),
  ...organisationId,
  ...timestamps,
});

export const sessions = pgTable(
  "sessions",
  {
    token: text().notNull().unique(),
    userId: uuid()
      .notNull()
      .references(() => users.id),
    ...timestamps,
  },
  (t) => [primaryKey({ columns: [t.token, t.userId] })],
);

export const lists = pgTable("lists", {
  id: uuid().primaryKey().$defaultFn(uuidv7),
  title: text().notNull(),
  icon: text(""),
  color: text("color"),
  organisationId: uuid("organisation_id").references(() => organisations.id, {
    onDelete: "cascade",
  }),
  creatorId: uuid("creator_id").references(() => users.id, {
    onDelete: "set null",
  }),
  ...timestamps,
});

export const todos = pgTable("todos", {
  id: uuid("id").primaryKey().$defaultFn(uuidv7),
  title: text("title").notNull(),
  description: text("description"),
  status: todoStatusEnum("status").notNull().default("todo"),
  dueDate: timestamp("due_date", { withTimezone: true }),
  parentId: uuid("parent_id").references((): AnyPgColumn => todos.id, {
    onDelete: "set null",
  }),
  creatorId: uuid("creator_id")
    .notNull()
    .references(() => users.id, { onDelete: "restrict" }),
  ...organisationId,
  ...timestamps,
});

export const todosToLists = pgTable(
  "todos_to_lists",
  {
    todoId: uuid("todo_id")
      .notNull()
      .references(() => todos.id, { onDelete: "cascade" }),
    listId: uuid("list_id")
      .notNull()
      .references(() => lists.id, { onDelete: "cascade" }),
  },
  (t) => [primaryKey({ columns: [t.todoId, t.listId] })],
);

export const todoAssignees = pgTable(
  "todo_assignees",
  {
    todoId: uuid("todo_id")
      .notNull()
      .references(() => todos.id, { onDelete: "cascade" }),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
  },
  (t) => [primaryKey({ columns: [t.todoId, t.userId] })],
);

export const customFields = pgTable(
  "custom_fields",
  {
    id: uuid("id").primaryKey().$defaultFn(uuidv7),
    name: text("name").notNull(),
    type: customFieldTypeEnum("type").notNull(),
    options: jsonb("options"),
    ...organisationId,
    ...timestamps,
  },
  (t) => [unique().on(t.organisationId, t.name)],
);

export const todoCustomFieldValues = pgTable(
  "todo_custom_field_values",
  {
    id: uuid("id").primaryKey().$defaultFn(uuidv7),
    todoId: uuid("todo_id")
      .notNull()
      .references(() => todos.id, { onDelete: "cascade" }),
    customFieldId: uuid("custom_field_id")
      .notNull()
      .references(() => customFields.id, { onDelete: "cascade" }),
    valueText: text("value_text"),
    valueNumber: integer("value_number"),
    valueDate: timestamp("value_date", { withTimezone: true }),
    valueUserId: uuid("value_user_id").references(() => users.id, {
      onDelete: "set null",
    }),
    valueJson: jsonb("value_json"),
    ...timestamps,
  },
  (t) => [unique().on(t.todoId, t.customFieldId)], // Updated syntax
);

// --- Relations ---

export const organisationsRelations = relations(organisations, ({ many }) => ({
  users: many(users),
  lists: many(lists),
  todos: many(todos),
  customFields: many(customFields),
}));

export const usersRelations = relations(users, ({ one, many }) => ({
  organisation: one(organisations, {
    fields: [users.organisationId],
    references: [organisations.id],
  }),
  createdLists: many(lists, { relationName: "creator" }),
  assignedTodos: many(todoAssignees),
  createdTodos: many(todos, { relationName: "creator" }),
  customFieldValues: many(todoCustomFieldValues, {
    relationName: "userValue",
  }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export const listsRelations = relations(lists, ({ one, many }) => ({
  organisation: one(organisations, {
    fields: [lists.organisationId],
    references: [organisations.id],
  }),
  creator: one(users, {
    fields: [lists.creatorId],
    references: [users.id],
    relationName: "creator",
  }),
  todos: many(todosToLists),
}));

export const todosRelations = relations(todos, ({ one, many }) => ({
  organisation: one(organisations, {
    fields: [todos.organisationId],
    references: [organisations.id],
  }),
  creator: one(users, {
    fields: [todos.creatorId],
    references: [users.id],
    relationName: "creator",
  }),
  parent: one(todos, {
    fields: [todos.parentId],
    references: [todos.id],
    relationName: "parent",
  }),
  children: many(todos, {
    relationName: "parent",
  }),
  lists: many(todosToLists),
  assignees: many(todoAssignees),
  customFieldValues: many(todoCustomFieldValues),
}));

export const todosToListsRelations = relations(todosToLists, ({ one }) => ({
  todo: one(todos, {
    fields: [todosToLists.todoId],
    references: [todos.id],
  }),
  list: one(lists, {
    fields: [todosToLists.listId],
    references: [lists.id],
  }),
}));

export const todoAssigneesRelations = relations(todoAssignees, ({ one }) => ({
  todo: one(todos, {
    fields: [todoAssignees.todoId],
    references: [todos.id],
  }),
  user: one(users, {
    fields: [todoAssignees.userId],
    references: [users.id],
  }),
}));

export const customFieldsRelations = relations(
  customFields,
  ({ one, many }) => ({
    organisation: one(organisations, {
      fields: [customFields.organisationId],
      references: [organisations.id],
    }),
    values: many(todoCustomFieldValues),
  }),
);

export const todoCustomFieldValuesRelations = relations(
  todoCustomFieldValues,
  ({ one }) => ({
    todo: one(todos, {
      fields: [todoCustomFieldValues.todoId],
      references: [todos.id],
    }),
    customField: one(customFields, {
      fields: [todoCustomFieldValues.customFieldId],
      references: [customFields.id],
    }),
    userValue: one(users, {
      fields: [todoCustomFieldValues.valueUserId],
      references: [users.id],
      relationName: "userValue",
    }),
  }),
);
