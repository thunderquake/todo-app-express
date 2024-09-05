exports.up = (pgm) => {
  // Insert initial todo types into the existing todo_types table
  pgm.sql(`
    INSERT INTO todo_types (name) 
    VALUES 
      ('Task'),
      ('Quote'),
      ('Idea'),
      ('Thoughts')
  `);
};
