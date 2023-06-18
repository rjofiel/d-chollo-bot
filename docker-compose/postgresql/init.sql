CREATE DATABASE connectors;
\c connectors;

CREATE TABLE connectors.public.chollometro (
  guid varchar(200) NOT NULL,
  CONSTRAINT guid_pkey PRIMARY KEY (guid),
  base_url varchar(150),
  title varchar(150),
  url_chollo varchar(200),
  publish_date varchar(100),
  image varchar(250),
  merchant varchar(150),
  price varchar(50),
  content_snippet text,
  content text,
  categories jsonb,
  date_created timestamp NOT NULL DEFAULT current_timestamp
);