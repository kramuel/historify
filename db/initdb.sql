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
    , artist_name varchar(100) NOT NULL
    , rank smallint NOT NULL
    , image_url varchar(100) NULL 
    , link varchar(100) NULL
    , user_id INT
    , CONSTRAINT fk_user 
        FOREIGN KEY(user_id) 
            REFERENCES users(user_id)
    --, UNIQUE(user_id, rank)
    -- , week smallint NULL
    
);

-- Creates tracks table
CREATE TABLE IF NOT EXISTS tracks (
    track_id INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY
    , artist_name varchar(100) NOT NULL
    , track_name varchar(100) NOT NULL
    , rank smallint NOT NULL
    , image_url varchar(100) NULL 
    , link varchar(100) NULL
    , user_id INT
    , CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(user_id)
    -- , UNIQUE(user_id, rank)
    -- , week smallint NULL
);



-- if rank and user id same == replace ( users only have 25 records each )
-- if we would have had weeks -> also check time and if next week add 
-- (but then the whole this comes with access_tokens, keep refreshing? ...no)

-- INSERT INTO artists (artist_name, rank, image_url, link, user_id) 
--     VALUES ($1, $2, $3, $4, $5)
--     ON CONFLICT (artist_name, rank, image_url, link, user_id) DO NOTHING
--     ON CONFLICT (rank, user_id) DO UPDATE
--     SET artist_name = $1, image_url = $3, link = $4
-- 
-- !!! maybe needs artist_name = EXCLUDED.artist_name

-- psql -h 0.0.0.0 -p 5435 -d historify_postgres -U mrbean < db/initdb.sql