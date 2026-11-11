
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

// MongoDB client
declare global {
  var _mongoClient: MongoClient | undefined;
}

// Fail fast with a readable message instead of an obscure stack trace when an
// environment variable is missing (e.g. during `next build` on Vercel).
function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing required environment variable ${name}. ` +
        `Set it in .env locally and in Vercel -> Settings -> Environment Variables, then redeploy.`
    );
  }
  return value;
}

const client =
  global._mongoClient ??
  new MongoClient(requireEnv("MONGODB_URL"));

if (process.env.NODE_ENV !== "production") {
  global._mongoClient = client;
}

const db = client.db("bazar_dor_website");

// Auth base URL. Set BETTER_AUTH_URL in Vercel -> Settings -> Environment
// Variables (you can change it any time and just redeploy - no code change).
// If it is not set, fall back to the deployment URL Vercel provides
// automatically, so a fresh deploy still works.
const baseURL =
  process.env.BETTER_AUTH_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined);

if (!baseURL) {
  throw new Error(
    "Missing BETTER_AUTH_URL. Set it in Vercel -> Settings -> Environment Variables " +
      "(or deploy on Vercel, where VERCEL_URL is provided automatically)."
  );
}

// Origins allowed to talk to the auth API.
// - localhost for local development
// - baseURL: whatever BETTER_AUTH_URL points at (prod domain, custom domain...)
// - NEXT_PUBLIC_APP_URL: optional canonical site URL
// - VERCEL_URL: every deployment, including preview/branch deploys
const extraOrigins = [
  baseURL,
  process.env.NEXT_PUBLIC_APP_URL,
  process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined,
].filter((origin): origin is string => Boolean(origin));

// Better Auth configuration
export const auth = betterAuth({
  baseURL,
  secret: requireEnv("BETTER_AUTH_SECRET"),

  // Database
  database: mongodbAdapter(db, { client }),

  // Trusted application origins
  trustedOrigins: [
    "http://localhost:3000",
    "http://localhost:3001",
    ...new Set(extraOrigins),
  ],

  // Email and password authentication
  emailAndPassword: {
    enabled: true,
  },

  // Social authentication
  socialProviders: {
    google: {
      clientId: requireEnv("GOOGLE_CLIENT_ID"),
      clientSecret: requireEnv("GOOGLE_CLIENT_SECRET"),
    },
    github: {
      clientId: requireEnv("GITHUB_CLIENT_ID"),
      clientSecret: requireEnv("GITHUB_CLIENT_SECRET"),
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
