-- filepath: api/src/main/resources/db/migration/V3__create_leads.sql
-- Create leads table to match com.eyebrow.api.entity.Lead

CREATE TABLE IF NOT EXISTS leads (
    id          BIGSERIAL PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    initial_interest_date DATE NOT NULL,
    contact_info  VARCHAR(255) NOT NULL,
    treatment_type VARCHAR(255) NOT NULL,
    status       VARCHAR(50) NOT NULL,
    follow_up_date DATE
);

CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_follow_up_date ON leads(follow_up_date);

CREATE SEQUENCE leads_seq START WITH 1 INCREMENT BY 50;
