-- liquibase formatted sql

-- changeset diszexuf:1
CREATE TABLE messages
(
    id         UUID PRIMARY KEY     DEFAULT gen_random_uuid(),
    content    TEXT        NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE messages IS 'Хранит сообщения, отображаемые на информационном киоске';
COMMENT ON COLUMN messages.id IS 'Уникальный идентификатор сообщения';
COMMENT ON COLUMN messages.content IS 'Текст сообщения для отображения на мониторе';
COMMENT ON COLUMN messages.created_at IS 'Дата и время создания сообщения';
-- rollback DROP TABLE messages;