// src/trpc/base.ts
import { PrismaClient } from "@prisma/client";
import { initTRPC } from "@trpc/server";

const t = initTRPC.create();

export const router = t.router;
export const middleware = t.middleware;
export const publicProcedure = t.procedure;
export const prisma = new PrismaClient();
