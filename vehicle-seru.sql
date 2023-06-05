CREATE TABLE "users" (
  "id" bigserial PRIMARY KEY,
  "name" varchar NOT NULL,
  "email" varchar NOT NULL,
  "password" varchar NOT NULL,
  "refresh_token" text,
  "is_admin" bool,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "updated_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "vehicle_brands" (
  "id" bigserial PRIMARY KEY,
  "name" varchar NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "updated_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "vehicle_types" (
  "id" bigserial PRIMARY KEY,
  "name" varchar NOT NULL,
  "brand_id" bigint,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "updated_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "vehicle_models" (
  "id" bigserial PRIMARY KEY,
  "name" varchar NOT NULL,
  "type_id" bigint,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "updated_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "vehicle_years" (
  "id" bigserial PRIMARY KEY,
  "year" varchar NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "updated_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "pricelist" (
  "id" bigserial PRIMARY KEY,
  "year_id" bigint,
  "model_id" bigint
);

CREATE INDEX ON "vehicle_brands" ("name");

CREATE INDEX ON "vehicle_types" ("brand_id");

CREATE INDEX ON "vehicle_models" ("type_id");

CREATE INDEX ON "vehicle_years" ("year");

CREATE INDEX ON "pricelist" ("year_id");

CREATE INDEX ON "pricelist" ("model_id");

ALTER TABLE "vehicle_types" ADD FOREIGN KEY ("brand_id") REFERENCES "vehicle_brands" ("id");

ALTER TABLE "vehicle_models" ADD FOREIGN KEY ("type_id") REFERENCES "vehicle_types" ("id");

ALTER TABLE "pricelist" ADD FOREIGN KEY ("year_id") REFERENCES "vehicle_years" ("id");

ALTER TABLE "pricelist" ADD FOREIGN KEY ("model_id") REFERENCES "vehicle_models" ("id");
