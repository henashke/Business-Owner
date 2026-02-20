-- filepath: api/src/main/resources/db/migration/V2__create_appointments.sql
-- Create appointments table

CREATE TABLE IF NOT EXISTS appointments (
    id BIGSERIAL PRIMARY KEY,
    customer_id BIGINT REFERENCES customers(id) ON DELETE CASCADE,
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ NOT NULL,
    title VARCHAR(255),
    notes TEXT
);

create sequence appointments_seq start with 1 increment by 50;