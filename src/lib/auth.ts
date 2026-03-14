import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import prisma from "@/lib/prisma";

const ADMIN_GITHUB_USERNAME = "abdulazizkhatamov";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  plugins: [nextCookies()],
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          // Only allow the specific GitHub account
          const githubUsername = (user as { username?: string }).username;
          if (githubUsername && githubUsername !== ADMIN_GITHUB_USERNAME) {
            throw new Error("Access denied.");
          }
          return { data: user };
        },
      },
    },
  },
});
