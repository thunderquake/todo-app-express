exports.up = (pgm) => {
  pgm.createTable("todo_types", {
    name: {
      type: "varchar(80)",
      notNull: true,
      primaryKey: true,
      onDelete: "cascade",
    },
  });

  pgm.createTable("todos", {
    id: {
      type: "uuid",
      notNull: true,
      default: pgm.func("gen_random_uuid()"),
      primaryKey: true,
    },
    name: {
      type: "varchar(80)",
      notNull: true,
    },
    created_at: {
      type: "timestamp with time zone",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
    updated_at: {
      type: "timestamp with time zone",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
    description: {
      type: "varchar(255)",
    },
    is_archived: {
      type: "boolean",
      notNull: true,
      default: false,
    },
    is_completed: {
      type: "boolean",
      notNull: true,
      default: false,
    },
    type: {
      type: "varchar(80)",
      references: "todo_types(name)",
    },
  });

  pgm.createIndex("todos", "type");
};

exports.down = (pgm) => {
  pgm.dropTable("todos");
  pgm.dropTable("todo_types");
};
