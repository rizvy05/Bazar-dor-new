
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

// MongoDB client
declare global {
  var _mongoClient: MongoClient | undefined;
}

const client =
  global._mongoClient ??
  new MongoClient(process.env.MONGODB_URL!);

if (process.env.NODE_ENV !== "production") {
  global._mongoClient = client;
}

const db = client.db("bazar_dor_website");

// Better Auth configuration
export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL!,
  secret: process.env.BETTER_AUTH_SECRET!,

  // Database
  database: mongodbAdapter(db, { client }),

  // Trusted application origins
  trustedOrigins: [
    "http://localhost:3000",
    "http://localhost:3001",
  ],

  // Email and password authentication
  emailAndPassword: {
    enabled: true,
  },

  // Social authentication
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },

  // Account linking
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "github"],
    },
  },
});
