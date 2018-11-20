CREATE TABLE USERS (
    user_id         SERIAL,
    display_name    VARCHAR,
    username        VARCHAR,
    password        VARCHAR,
    PRIMARY KEY (user_id)
);

CREATE TABLE LOCATIONS (
    location_id     SERIAL,
    user_id         SERIAL,
    location_name   VARCHAR,
    description     VARCHAR,
    PRIMARY KEY (location_id),
    FOREIGN KEY (user_id) REFERENCES USERS (user_id)
);

CREATE TABLE DISPLAYS (
    display_id      SERIAL,
    display_name    VARCHAR,
    description     VARCHAR,
    PRIMARY KEY (display_id)
);

ALTER SEQUENCE displays_display_id_seq RESTART WITH 1000;

CREATE TABLE MAPPED_LD (
    location_id     SERIAL,
    display_id      SERIAL,
    PRIMARY KEY (location_id, display_id),
    FOREIGN KEY (location_id) REFERENCES LOCATIONS (location_id),
    FOREIGN KEY (display_id) REFERENCES DISPLAYS (display_id)
);

CREATE TABLE CONTENT (
    content_id      SERIAL,
    content_name    VARCHAR,
    description     VARCHAR,
    html_code       VARCHAR,
    PRIMARY KEY (content_id)
);

CREATE TABLE MAPPED_DC (
    display_id  SERIAL,
    content_id  SERIAL,
    PRIMARY KEY (display_id, content_id),
    FOREIGN KEY (display_id) REFERENCES DISPLAYS (display_id),
    FOREIGN KEY (content_id) REFERENCES CONTENT (content_id)
);


-- Test inserts
--INSERT INTO USERS VALUES (DEFAULT, 'Kevin', 'kevin', 'password');
--INSERT INTO LOCATIONS VALUES (DEFAULT, DEFAULT, 'park', NULL);
--INSERT INTO DISPLAYS VALUES (DEFAULT, 'display1', NULL);

--drop schema oss cascade;
--create schema oss;
--set search_path to oss;

--INSERT INTO USERS (display_name, username, password) VALUES ('Kevin', 'kevin', 'password');
--INSERT INTO USERS (display_name, username, password) VALUES ('Kevin2', 'kevin2', 'password');