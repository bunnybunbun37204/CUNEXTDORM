// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

import tailwindcss from "@tailwindcss/vite";

import vercelServerless from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
	output: "server",
	integrations: [react()],
	adapter: vercelServerless({}),

	vite: {
		plugins: [tailwindcss()],
	},
});
