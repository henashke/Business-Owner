-- filepath: api/src/main/resources/db/migration/V1__create_customers.sql
-- Create customers table to match com.eyebrow.api.entity.Customer

CREATE TABLE IF NOT EXISTS customers (
    id BIGSERIAL PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255),
    phone_number VARCHAR(255),
    notes TEXT,
    active BOOLEAN NOT NULL DEFAULT true
);

create sequence customers_seq start with 1 increment by 50;