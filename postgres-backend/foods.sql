CREATE DATABASE FoodsManagement;

CREATE TABLE foods(
    food_id SERIAL PRIMARY KEY,
    food_name VARCHAR(255),
    category VARCHAR(255),
    price FLOAT,
    delivered_by VARCHAR(255),
    is_set_menu BOOLEAN
)

