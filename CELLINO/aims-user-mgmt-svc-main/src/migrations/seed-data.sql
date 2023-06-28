INSERT INTO public."users" (first_name, email, active, created_at, created_by, modified_at, modified_by)
VALUES ('System', 'system@cellinobio.com', TRUE, CURRENT_TIMESTAMP, '00000000-0000-0000-0000-000000000000',
        CURRENT_TIMESTAMP, '00000000-0000-0000-0000-000000000000');

INSERT INTO public."actions" (name, active, created_at, created_by, modified_at, modified_by)
VALUES ('manage', True, CURRENT_TIMESTAMP, (SELECT id FROM public."users" where "users".email = 'system@cellinobio.com'),
        CURRENT_TIMESTAMP, (SELECT id FROM public."users" where "users".email = 'system@cellinobio.com'));
INSERT INTO public."actions" (name, active, created_at, created_by, modified_at, modified_by)
VALUES ('create', True, CURRENT_TIMESTAMP, (SELECT id FROM public."users" where "users".email = 'system@cellinobio.com'),
        CURRENT_TIMESTAMP, (SELECT id FROM public."users" where "users".email = 'system@cellinobio.com'));
INSERT INTO public."actions" (name, active, created_at, created_by, modified_at, modified_by)
VALUES ('read', True, CURRENT_TIMESTAMP, (SELECT id FROM public."users" where "users".email = 'system@cellinobio.com'),
        CURRENT_TIMESTAMP, (SELECT id FROM public."users" where "users".email = 'system@cellinobio.com'));
INSERT INTO public."actions" (name, active, created_at, created_by, modified_at, modified_by)
VALUES ('update', True, CURRENT_TIMESTAMP, (SELECT id FROM public."users" where "users".email = 'system@cellinobio.com'),
        CURRENT_TIMESTAMP, (SELECT id FROM public."users" where "users".email = 'system@cellinobio.com'));
INSERT INTO public."actions" (name, active, created_at, created_by, modified_at, modified_by)
VALUES ('delete', True, CURRENT_TIMESTAMP, (SELECT id FROM public."users" where "users".email = 'system@cellinobio.com'),
        CURRENT_TIMESTAMP, (SELECT id FROM public."users" where "users".email = 'system@cellinobio.com'));

INSERT INTO public."subjects" (name, active, created_at, created_by, modified_at, modified_by)
VALUES ('all', True, CURRENT_TIMESTAMP, (SELECT id FROM public."users" where "users".email = 'system@cellinobio.com'),
        CURRENT_TIMESTAMP, (SELECT id FROM public."users" where "users".email = 'system@cellinobio.com'));
INSERT INTO public."subjects" (name, active, created_at, created_by, modified_at, modified_by)
VALUES ('user', True, CURRENT_TIMESTAMP, (SELECT id FROM public."users" where "users".email = 'system@cellinobio.com'),
        CURRENT_TIMESTAMP, (SELECT id FROM public."users" where "users".email = 'system@cellinobio.com'));
INSERT INTO public."subjects" (name, active, created_at, created_by, modified_at, modified_by)
VALUES ('run', True, CURRENT_TIMESTAMP, (SELECT id FROM public."users" where "users".email = 'system@cellinobio.com'),
        CURRENT_TIMESTAMP, (SELECT id FROM public."users" where "users".email = 'system@cellinobio.com'));
INSERT INTO public."subjects" (name, active, created_at, created_by, modified_at, modified_by)
VALUES ('plate', True, CURRENT_TIMESTAMP, (SELECT id FROM public."users" where "users".email = 'system@cellinobio.com'),
        CURRENT_TIMESTAMP, (SELECT id FROM public."users" where "users".email = 'system@cellinobio.com'));
INSERT INTO public."subjects" (name, active, created_at, created_by, modified_at, modified_by)
VALUES ('well', True, CURRENT_TIMESTAMP, (SELECT id FROM public."users" where "users".email = 'system@cellinobio.com'),
        CURRENT_TIMESTAMP, (SELECT id FROM public."users" where "users".email = 'system@cellinobio.com'));

INSERT INTO public."roles" (name, rule, active, created_at, created_by, modified_at, modified_by)
VALUES ('Admin', array['{"action": ["manage"], "subject": ["all"]}']::jsonb[], True, CURRENT_TIMESTAMP,
        (SELECT id FROM public."users" where "users".email = 'system@cellinobio.com'), CURRENT_TIMESTAMP,
        (SELECT id FROM public."users" where "users".email = 'system@cellinobio.com'));
INSERT INTO public."roles" (name, rule, active, created_at, created_by, modified_at, modified_by)
VALUES ('Run Manager', array['{"action": ["manage"], "subject": ["all"]}',
        '{"action": ["create"], "subject": ["user"], "inverted": true}']::jsonb[], True, CURRENT_TIMESTAMP,
        (SELECT id FROM public."users" where "users".email = 'system@cellinobio.com'), CURRENT_TIMESTAMP,
        (SELECT id FROM public."users" where "users".email = 'system@cellinobio.com'));
INSERT INTO public."roles" (name, rule, active, created_at, created_by, modified_at, modified_by)
VALUES ('Run Reviewer', array['{"action": ["manage"], "subject": "all"}',
        '{"action": ["update", "read"], "subject": ["run"]}', '{"action": "create", "subject": "user", "inverted": true}',
        '{"action": ["create", "delete"], "subject": ["run"], "inverted": true}']::jsonb[], True, CURRENT_TIMESTAMP,
        (SELECT id FROM public."users" where "users".email = 'system@cellinobio.com'), CURRENT_TIMESTAMP,
        (SELECT id FROM public."users" where "users".email = 'system@cellinobio.com'));
INSERT INTO public."roles" (name, rule, active, created_at, created_by, modified_at, modified_by)
VALUES ('Plate Reviewer', array['{"action": "manage", "subject": "all"}', '{"action": ["read"], "subject": "run"}',
        '{"action": ["update", "read"], "subject": ["plate"]}',
        '{"action": ["create"], "subject": ["user"], "inverted": true}',
        '{"action": ["create", "update", "delete"], "subject": ["run"], "inverted": true}',
        '{"action": ["create", "delete"], "subject": ["plate"], "inverted": true}']::jsonb[], True, CURRENT_TIMESTAMP,
        (SELECT id FROM public."users" where "users".email = 'system@cellinobio.com'), CURRENT_TIMESTAMP,
        (SELECT id FROM public."users" where "users".email = 'system@cellinobio.com'));
INSERT INTO public."roles" (name, rule, active, created_at, created_by, modified_at, modified_by)
VALUES ('Data Viewer', array['{"action": ["read"], "subject": ["all"]}']::jsonb[], True, CURRENT_TIMESTAMP,
        (SELECT id FROM public."users" where "users".email = 'system@cellinobio.com'), CURRENT_TIMESTAMP,
        (SELECT id FROM public."users" where "users".email = 'system@cellinobio.com'));
