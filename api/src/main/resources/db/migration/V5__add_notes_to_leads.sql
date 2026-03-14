-- filepath: api/src/main/resources/db/migration/V5__add_notes_to_leads.sql
ALTER TABLE leads ADD COLUMN notes TEXT;
