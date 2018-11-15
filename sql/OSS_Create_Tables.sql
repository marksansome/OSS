CREATE TABLE USERS (
    user_id         VARCHAR NOT NULL,
    display_name    VARCHAR,
    username        VARCHAR,
    password        VARCHAR,
    PRIMARY KEY (user_id)
);

CREATE TABLE LOCATIONS (
    location_id     VARCHAR NOT NULL,
    user_id         VARCHAR NOT NULL,
    location_name   VARCHAR,
    description     VARCHAR,
    PRIMARY KEY (location_id),
    FOREIGN KEY (user_id) REFERENCES USERS (user_id)
);

CREATE TABLE DISPLAYS (
    display_id      VARCHAR NOT NULL,
    display_name    VARCHAR,
    description     VARCHAR,
    PRIMARY KEY (display_id)
);

ALTER SEQUENCE displays_display_id_seq RESTART WITH 1000;

CREATE TABLE MAPPED_LD (
    location_id     VARCHAR NOT NULL,
    display_id      VARCHAR NOT NULL,
    PRIMARY KEY (location_id, display_id),
    FOREIGN KEY (location_id) REFERENCES LOCATIONS (location_id),
    FOREIGN KEY (display_id) REFERENCES DISPLAYS (display_id)
);

CREATE TABLE CONTENT (
    content_id  VARCHAR NOT NULL,
    content_name    VARCHAR,
    description     VARCHAR,
    html_code       VARCHAR,
    PRIMARY KEY (content_id)
);

CREATE TABLE MAPPED_DC (
    display_id  VARCHAR NOT NULL,
    content_id  VARCHAR NOT NULL,
    PRIMARY KEY (display_id, content_id),
    FOREIGN KEY (display_id) REFERENCES DISPLAYS (display_id),
    FOREIGN KEY (content_id) REFERENCES CONTENT (content_id)
);

-- Test inserts
--INSERT INTO USERS VALUES ('12', 'Kevin', 'kevin', 'password');
--INSERT INTO LOCATIONS VALUES ('1', '12', 'park', NULL);
--INSERT INTO DISPLAYS VALUES (nextval('displays_display_id_seq'), '1', 'display1', NULL);
