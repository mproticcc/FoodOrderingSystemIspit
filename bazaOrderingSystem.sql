Drop DATABASE user_management;
CREATE DATABASE user_management;
USE user_management;


CREATE TABLE User (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL 
);


CREATE TABLE Permission (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);


CREATE TABLE user_permission (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    permission_id BIGINT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE CASCADE,
    FOREIGN KEY (permission_id) REFERENCES Permission(id) ON DELETE CASCADE
);

CREATE TABLE orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    status ENUM('ORDERED', 'PREPARING', 'IN_DELIVERY', 'DELIVERED', 'CANCELED') NOT NULL,
    created_by BIGINT NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    FOREIGN KEY (created_by) REFERENCES User(id) ON DELETE CASCADE
);

CREATE TABLE dish (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE order_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT NOT NULL,
    dish_id BIGINT NOT NULL,
    date DATETIME NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (dish_id) REFERENCES Dish(id) ON DELETE CASCADE
);
CREATE TABLE error_message (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    date DATETIME NOT NULL,
    user_id BIGINT NOT NULL,
    operation VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE CASCADE
);
INSERT INTO User (name, surname, email, password) VALUES
('test', 'test', 'test@gmail.com', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3'),
('test1', 'test1', 'test12@gmail.com', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3'),
('test12', 'test12', 'test123@gmail.com', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3'),
('Alice', 'Smith', 'alice.smith@gmail.com', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3'),
('Bob', 'Johnson', 'bob.johnson@gmail.com', 'd3c4571fa216116472f24dca88d58213cf57264e39f28cf82f53a6d0c6e057e7'),
('Charlie', 'Brown', 'charlie.brown@gmail.com', 'f7e2d0a56c97196f1a462b9ff469ff7d9b17f43ab836589b0fd0f88e8ab8e245'),
('David', 'Miller', 'david.miller@gmail.com', '63db9e78f4d6ff43e41d82835d2d442d7db45f9b3a0bcd6a699f4452d1181df2'),
('Eva', 'Davis', 'eva.davis@gmail.com', 'a2b34bdf9c3f3e2c1b332b72a5c33d31e9b0d0d378519d12475f19e6b836b707'),
('Frank', 'Martinez', 'frank.martinez@gmail.com', '02b788a6eb96c5b74a71704db8493b5080b2e581d9f5c79588b9d548decb4938'),
('Grace', 'Garcia', 'grace.garcia@gmail.com', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3');



INSERT INTO Permission (name) VALUES
('can_create_users'),
('can_read_users'),
('can_update_users'),
('can_delete_users'),
('can_search_order'),
('can_place_order'),
('can_cancel_order'),
('can_track_order'),
('can_schedule_order');


INSERT INTO user_permission (user_id, permission_id) VALUES
(1, 1), 
(1, 2), 
(1, 3), 
(1, 4),
(1, 5), 
(1, 6),
(1, 7),
(1, 8),
(1, 9),
(2, 2), 
(2, 5),
(2, 6),
(3, 3),
(3, 7),
(4, 1),
(4, 2),
(4, 5),
(5, 1),
(5, 8),
(6, 4),
(7, 3),
(8, 7),
(9, 8);


INSERT INTO Dish (name, price) VALUES
('Pizza Margherita', 8.99),
('Burger', 5.49),
('Pasta Carbonara', 7.99),
('Caesar Salad', 4.99),
('Lasagna', 9.49),
('Grilled Chicken', 6.99),
('Spaghetti Bolognese', 7.49),
('Steak', 14.99),
('Fish Tacos', 11.99),
('Vegetable Stir-fry', 8.49),
('Shrimp Scampi', 12.99),
('Chicken Alfredo', 10.49),
('Veggie Burger', 6.99),
('Beef Tacos', 9.99),
('Chicken Tikka Masala', 13.49),
('Ramen Noodles', 8.49),
('BBQ Ribs', 15.99),
('Greek Salad', 5.99),
('Sushi Platter', 18.99),
('Clam Chowder', 7.99),
('Pulled Pork Sandwich', 9.49),
('Lobster Roll', 19.99),
('Eggplant Parmesan', 8.99),
('Fried Rice', 7.49),
('Grilled Salmon', 13.99),
('Chili Con Carne', 10.99),
('Paneer Butter Masala', 11.49),
('Chicken Quesadilla', 8.99),
('Stuffed Bell Peppers', 9.99),
('Tuna Salad', 6.49);

INSERT INTO orders(name, type, description, status, created_by, active) VALUES
('Test Order 1', 'Delivery', 'Pizza and Burger', 'ORDERED', 1, TRUE),
('Test Order 12', 'Delivery2', 'Pizza and Burge2r', 'ORDERED', 1, TRUE),
('Test Order 2', 'Pickup', 'Pasta and Salad', 'PREPARING', 2, TRUE),
('Test Order 3', 'Delivery', 'Burger', 'DELIVERED', 3, FALSE),
('Order 4', 'Delivery', 'Pizza, Salad', 'ORDERED', 4, TRUE),
('Order 5', 'Pickup', 'Pasta', 'PREPARING', 5, TRUE),
('Order 6', 'Delivery', 'Lasagna', 'IN_DELIVERY', 6, TRUE),
('Order 7', 'Delivery', 'Burger, Fries', 'CANCELED', 7, FALSE),
('Order 8', 'Pickup', 'Spaghetti', 'ORDERED', 8, TRUE),
('Order 9', 'Delivery', 'Fish Tacos', 'DELIVERED', 9, FALSE),
('Order 10', 'Pickup', 'Grilled Chicken', 'PREPARING', 1, TRUE);


INSERT INTO order_items (order_id, dish_id, date) VALUES
(1, 1, '2025-01-14 10:00:00'),
(1, 2, '2025-01-14 10:10:00'),
(2, 3, '2025-01-14 10:20:00'),
(2, 4, '2025-01-14 10:30:00'),
(3, 5, '2025-01-14 10:40:00'),
(4, 6, '2025-01-14 10:50:00'),
(5, 7, '2025-01-14 11:00:00'),
(6, 8, '2025-01-14 11:10:00'),
(7, 9, '2025-01-14 11:20:00'),
(8, 10, '2025-01-14 11:30:00'),
(9, 1, '2025-01-14 11:40:00'),
(9, 4, '2025-01-14 11:50:00'),
(10, 3, '2025-01-14 12:00:00');


INSERT INTO error_message (date, user_id, operation, message) VALUES
('2025-01-13 10:15:00',  2, 'CREATE_ORDER', 'Maksimalan broj istovremenih porudžbina je dostignut.'),
('2025-01-13 11:30:00',  1, 'CREATE_ORDER', 'Maksimalan broj istovremenih porudžbina je dostignut.'),
('2025-01-13 11:30:00',  1, 'CREATE_ORDER', 'Maksimalan broj istovremenih porudžbina je dostignut.'); 




SELECT
    u.id AS user_id, 
    u.name AS user_name, 
    u.surname AS user_surname, 
    u.password AS sifra, 
    u.email AS user_email, 
    p.name AS permission_name
FROM User u
JOIN user_permission up ON u.id = up.user_id
JOIN Permission p ON up.permission_id = p.id
ORDER BY u.id, p.name ;



SELECT 
    u.id AS user_id,
    u.name AS user_name,
    u.surname AS user_surname,
    u.email AS user_email,
    o.id AS order_id,
    o.name AS order_name,
    o.type AS order_type,
    o.status AS order_status,
    d.name AS dish_name,
    d.price AS dish_price
FROM 
    User u
JOIN 
    orders o ON u.id = o.created_by
JOIN 
    order_items oi ON o.id = oi.order_id
JOIN 
    dish d ON oi.dish_id = d.id
ORDER BY 
    u.id, o.id;

SELECT COUNT(*) FROM Orders o WHERE o.status ;

select * from orders;

select count(*) from permission