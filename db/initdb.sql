--  Drops artists table
DROP TABLE IF EXISTS artists;
DROP TABLE IF EXISTS tracks;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS public.session;

CREATE TABLE public.session (
    sid character varying PRIMARY KEY NOT NULL,
    sess json NOT NULL,
    expire timestamp(6) without time zone NOT NULL
);

-- Creates users table
CREATE TABLE IF NOT EXISTS users (
    user_id INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY
    , access_token varchar(166) NULL
    , refresh_token varchar(131) NULL
    , user_name varchar(50) NOT NULL UNIQUE
);

-- Creates artists table
CREATE TABLE IF NOT EXISTS artists (
    artist_id INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY
    , artist_name varchar(50) NOT NULL
    , rank smallint NOT NULL
    , image_url varchar(100) NULL 
    , link varchar(100) NULL
    , user_id INT
    , CONSTRAINT fk_user 
        FOREIGN KEY(user_id) 
            REFERENCES users(user_id)
            ON DELETE CASCADE
    -- , week smallint NULL
    
);

-- Creates tracks table
CREATE TABLE IF NOT EXISTS tracks (
    track_id INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY
    , artist_name varchar(50) NOT NULL
    , track_name varchar(50) NOT NULL
    , rank smallint NOT NULL
    , image_url varchar(100) NULL 
    , link varchar(100) NULL
    , user_id INT
    , CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(user_id)
    -- , week smallint NULL
);

