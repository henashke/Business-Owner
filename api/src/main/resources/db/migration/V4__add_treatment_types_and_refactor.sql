-- filepath: api/src/main/resources/db/migration/V4__add_treatment_types_and_refactor.sql

CREATE TABLE IF NOT EXISTS treatment_types (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    price NUMERIC(19, 2) NOT NULL,
    duration_minutes INTEGER NOT NULL
);

CREATE SEQUENCE treatment_types_seq START WITH 1 INCREMENT BY 50;

-- Refactor appointments table
ALTER TABLE appointments DROP COLUMN title;
ALTER TABLE appointments ADD COLUMN treatment_type_id BIGINT REFERENCES treatment_types(id);

-- Refactor leads table
ALTER TABLE leads DROP COLUMN treatment_type;
ALTER TABLE leads ADD COLUMN treatment_type_id BIGINT REFERENCES treatment_types(id);
