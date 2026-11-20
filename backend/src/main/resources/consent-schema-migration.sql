-- Run once on an existing record_consents table before starting this version.
-- This preserves all consent rows while making record scope nullable and allowing
-- a new consent row after an earlier one is revoked or expires.
ALTER TABLE record_consents
    MODIFY COLUMN record_id BIGINT NULL,
    ADD COLUMN purpose VARCHAR(300) NOT NULL DEFAULT 'Medical record access',
    ADD COLUMN expires_at DATETIME NULL,
    ADD COLUMN created_at DATETIME NULL,
    ADD COLUMN updated_at DATETIME NULL,
    ADD COLUMN active_scope_key BIGINT NULL;

UPDATE record_consents
SET created_at = COALESCE(created_at, granted_at),
    updated_at = COALESCE(updated_at, granted_at),
    active_scope_key = CASE
        WHEN status = 'GRANTED' THEN COALESCE(record_id, 0)
        ELSE NULL
    END;

ALTER TABLE record_consents
    MODIFY COLUMN created_at DATETIME NOT NULL,
    MODIFY COLUMN updated_at DATETIME NOT NULL;

SET @legacy_unique_index = (
    SELECT index_name
    FROM information_schema.statistics
    WHERE table_schema = DATABASE()
      AND table_name = 'record_consents'
      AND non_unique = 0
    GROUP BY index_name
    HAVING GROUP_CONCAT(column_name ORDER BY seq_in_index) = 'record_id,grantee_user_id'
    LIMIT 1
);
SET @drop_legacy_index_sql = IF(
    @legacy_unique_index IS NULL,
    'SELECT 1',
    CONCAT('ALTER TABLE record_consents DROP INDEX `', @legacy_unique_index, '`')
);
PREPARE consent_migration_statement FROM @drop_legacy_index_sql;
EXECUTE consent_migration_statement;
DEALLOCATE PREPARE consent_migration_statement;

ALTER TABLE record_consents
    ADD CONSTRAINT uk_record_consent_active_scope
    UNIQUE (owner_user_id, grantee_user_id, active_scope_key);
