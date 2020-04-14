/* Seeds for SQL table. We haven't discussed this type of file yet */
USE user_credentials;

/* Insert 3 Rows into your new table */
INSERT INTO users (username, email, password, createdAt, UpdatedAt)
VALUES ("wcalil","wcalil@gmail.com", "123", CURDATE(), CURDATE());

