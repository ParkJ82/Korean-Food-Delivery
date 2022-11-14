CREATE DATABASE FoodsManagement;

CREATE TABLE foods(
    food_id SERIAL PRIMARY KEY,
    food_name VARCHAR(255),
    category VARCHAR(255),
    price FLOAT,
    delivered_by VARCHAR(255),
    is_set_menu BOOLEAN
)

CREATE TABLE accounts(
    account_id SERIAL PRIMARY KEY,
    login_id VARCHAR(255),
    login_password VARCHAR(255),
    phone_number INTEGER,
    kakao_id VARCHAR(255)
);

CREATE TABLE accounts(
    account_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    login_id VARCHAR(255) NOT NULL,
    login_password VARCHAR(255) NOT NULL,
    phone_number INTEGER,
    kakao_id VARCHAR(255)
);

CREATE TABLE addresses(
    address_id SERIAL PRIMARY KEY,
    address_user VARCHAR(255),
    line_one VARCHAR(255),
    line_two VARCHAR(255),
    city VARCHAR(255),
    us_state VARCHAR(255),
    zipcode VARCHAR(255)
);

CREATE TABLE cardinfo(
    card_id SERIAL PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    card_number INTEGER,
    card_password INTEGER,
    valid_thru VARCHAR(255)
);