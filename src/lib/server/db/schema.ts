import { relations } from 'drizzle-orm';
import { pgTable, boolean, integer, text, timestamp, primaryKey } from 'drizzle-orm/pg-core';
import type { AdapterAccountType } from "@auth/core/adapters"

export const users = pgTable("user", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text("name"),
	email: text("email").unique(),
	emailVerified: timestamp("emailVerified", { mode: "date" }),
	image: text("image"),
})

export const accounts = pgTable(
	"account",
	{
		userId: text("userId")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		type: text("type").$type<AdapterAccountType>().notNull(),
		provider: text("provider").notNull(),
		providerAccountId: text("providerAccountId").notNull(),
		refresh_token: text("refresh_token"),
		access_token: text("access_token"),
		expires_at: integer("expires_at"),
		token_type: text("token_type"),
		scope: text("scope"),
		id_token: text("id_token"),
		session_state: text("session_state"),
	},
	(account) => [
		{
			compoundKey: primaryKey({
				columns: [account.provider, account.providerAccountId],
			}),
		},
	]
)

export const sessions = pgTable("session", {
	sessionToken: text("sessionToken").primaryKey(),
	userId: text("userId")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	expires: timestamp("expires", { mode: "date" }).notNull(),
})

export const verificationTokens = pgTable(
	"verificationToken",
	{
		identifier: text("identifier").notNull(),
		token: text("token").notNull(),
		expires: timestamp("expires", { mode: "date" }).notNull(),
	},
	(verificationToken) => [
		{
			compositePk: primaryKey({
				columns: [verificationToken.identifier, verificationToken.token],
			}),
		},
	]
)

export const authenticators = pgTable(
	"authenticator",
	{
		credentialID: text("credentialID").notNull().unique(),
		userId: text("userId")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		providerAccountId: text("providerAccountId").notNull(),
		credentialPublicKey: text("credentialPublicKey").notNull(),
		counter: integer("counter").notNull(),
		credentialDeviceType: text("credentialDeviceType").notNull(),
		credentialBackedUp: boolean("credentialBackedUp").notNull(),
		transports: text("transports"),
	},
	(authenticator) => [
		{
			compositePK: primaryKey({
				columns: [authenticator.userId, authenticator.credentialID],
			}),
		},
	]
)

export const profiles = pgTable('profile', {
	id: text('id').primaryKey().$default(() => crypto.randomUUID()),
	userId: text('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' })
		.unique(),
	displayName: text('display_name').notNull(),
	bio: text('bio'),
	createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' })
		.notNull()
		.defaultNow(),
});

export const bands = pgTable('band', {
	id: text('id').primaryKey().$default(() => crypto.randomUUID()),
	name: text('name').notNull(),
	createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' })
		.notNull()
		.defaultNow(),
	ownerId: text('owner_id')
		.notNull()
		.references(() => profiles.id, { onDelete: 'cascade' }),
	slug: text('slug').notNull().unique(),
	lookingForMembers: boolean('looking_for_members').notNull().default(false),
});

export const profilesToBands = pgTable('profiles_to_bands', {
	profileId: text('profile_id')
		.notNull()
		.references(() => profiles.id, { onDelete: 'cascade' }),
	bandId: text('band_id')
		.notNull()
		.references(() => bands.id, { onDelete: 'cascade' }),
},
	(table) => [primaryKey({ columns: [table.profileId, table.bandId] })]
);

export const influences = pgTable('influence', {
	id: text('id').primaryKey().$default(() => crypto.randomUUID()),
	label: text('label').notNull().unique(),
});

export const profileInfluences = pgTable('profiles_to_influences', {
	profileId: text('profile_id')
		.notNull()
		.references(() => profiles.id, { onDelete: 'cascade' }),
	influenceId: text('influence_id')
		.notNull()
		.references(() => influences.id, { onDelete: 'cascade' }),

},
	(table) => [primaryKey({ columns: [table.profileId, table.influenceId] })]
);

export const bandInfluences = pgTable('bands_to_influences', {
	bandId: text('band_id')
		.notNull()
		.references(() => bands.id, { onDelete: 'cascade' }),
	influenceId: text('influence_id')
		.notNull()
		.references(() => influences.id, { onDelete: 'cascade' }),
},
	(table) => [primaryKey({ columns: [table.bandId, table.influenceId] })]
);

export const profilesRelations = relations(profiles, ({ many }) => ({
	bands: many(profilesToBands),
	influences: many(profileInfluences)
}));

export const bandsRelations = relations(bands, ({ many }) => ({
	profiles: many(profilesToBands),
	influences: many(bandInfluences)
}));

export const profilesToBandsRelations = relations(profilesToBands, ({ one }) => ({
	profile: one(profiles, { fields: [profilesToBands.profileId], references: [profiles.id] }),
	band: one(bands, { fields: [profilesToBands.bandId], references: [bands.id] })
}));

export const profileInfluencesRelations = relations(profileInfluences, ({ one }) => ({
	profile: one(profiles, { fields: [profileInfluences.profileId], references: [profiles.id] }),
	influence: one(influences, { fields: [profileInfluences.influenceId], references: [influences.id] }),
}));

export const bandInfluencesRelations = relations(bandInfluences, ({ one }) => ({
	band: one(bands, { fields: [bandInfluences.bandId], references: [bands.id] }),
	influence: one(influences, { fields: [bandInfluences.influenceId], references: [influences.id] }),
}));

export type Session = typeof sessions.$inferSelect;
export type User = typeof users.$inferSelect;
export type Profile = typeof profiles.$inferSelect;
export type Band = typeof bands.$inferSelect;
export type Influence = typeof influences.$inferSelect;
