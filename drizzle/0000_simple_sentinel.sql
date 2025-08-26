CREATE TABLE "account" (
	"userId" text NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text
);
--> statement-breakpoint
CREATE TABLE "authenticator" (
	"credentialID" text NOT NULL,
	"userId" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"credentialPublicKey" text NOT NULL,
	"counter" integer NOT NULL,
	"credentialDeviceType" text NOT NULL,
	"credentialBackedUp" boolean NOT NULL,
	"transports" text,
	CONSTRAINT "authenticator_credentialID_unique" UNIQUE("credentialID")
);
--> statement-breakpoint
CREATE TABLE "bands_to_influences" (
	"band_id" text NOT NULL,
	"influence_id" text NOT NULL,
	CONSTRAINT "bands_to_influences_band_id_influence_id_pk" PRIMARY KEY("band_id","influence_id")
);
--> statement-breakpoint
CREATE TABLE "band" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"owner_id" text NOT NULL,
	"slug" text NOT NULL,
	"looking_for_members" boolean DEFAULT false NOT NULL,
	CONSTRAINT "band_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "influence" (
	"id" text PRIMARY KEY NOT NULL,
	"label" text NOT NULL,
	CONSTRAINT "influence_label_unique" UNIQUE("label")
);
--> statement-breakpoint
CREATE TABLE "profiles_to_influences" (
	"profile_id" text NOT NULL,
	"influence_id" text NOT NULL,
	CONSTRAINT "profiles_to_influences_profile_id_influence_id_pk" PRIMARY KEY("profile_id","influence_id")
);
--> statement-breakpoint
CREATE TABLE "profile" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"display_name" text NOT NULL,
	"bio" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "profile_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "profiles_to_bands" (
	"profile_id" text NOT NULL,
	"band_id" text NOT NULL,
	CONSTRAINT "profiles_to_bands_profile_id_band_id_pk" PRIMARY KEY("profile_id","band_id")
);
--> statement-breakpoint
CREATE TABLE "session" (
	"sessionToken" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text,
	"emailVerified" timestamp,
	"image" text,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verificationToken" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "authenticator" ADD CONSTRAINT "authenticator_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bands_to_influences" ADD CONSTRAINT "bands_to_influences_band_id_band_id_fk" FOREIGN KEY ("band_id") REFERENCES "public"."band"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bands_to_influences" ADD CONSTRAINT "bands_to_influences_influence_id_influence_id_fk" FOREIGN KEY ("influence_id") REFERENCES "public"."influence"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "band" ADD CONSTRAINT "band_owner_id_profile_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."profile"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profiles_to_influences" ADD CONSTRAINT "profiles_to_influences_profile_id_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profile"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profiles_to_influences" ADD CONSTRAINT "profiles_to_influences_influence_id_influence_id_fk" FOREIGN KEY ("influence_id") REFERENCES "public"."influence"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profile" ADD CONSTRAINT "profile_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profiles_to_bands" ADD CONSTRAINT "profiles_to_bands_profile_id_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profile"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profiles_to_bands" ADD CONSTRAINT "profiles_to_bands_band_id_band_id_fk" FOREIGN KEY ("band_id") REFERENCES "public"."band"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;

create index if not exists idx_ptb_profile on profiles_to_bands(profile_id);
create index if not exists idx_ptb_band on profiles_to_bands(band_id);
create index if not exists idx_pinf_profile on profiles_to_influences(profile_id);
create index if not exists idx_pinf_infl on profiles_to_influences(influence_id);
create index if not exists idx_binf_band on bands_to_influences(band_id);
create index if not exists idx_binf_infl on bands_to_influences(influence_id);
create index if not exists idx_influence_label_ci on "influence"(lower(label));
create index if not exists idx_band_name_ci on "band"(lower(name));
