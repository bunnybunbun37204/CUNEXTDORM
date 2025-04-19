import {
	a as createAstro,
	c as createComponent,
	r as renderComponent,
	f as renderHead,
	d as renderSlot,
	b as renderTemplate,
} from "./astro/server_sfyfDN_r.mjs";
import "kleur/colors";
import { clsx } from "clsx";
import { Bell, House, Receipt } from "lucide-react";
import Link from "next/link.js";
import { usePathname } from "next/navigation.js";
import * as React from "react";
/* empty css                         */
import { jsx, jsxs } from "react/jsx-runtime";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
	return twMerge(clsx(inputs));
}

const navItems = [
	{ id: "bill", label: "Bill", icon: Receipt, href: "/bill" },
	{ id: "home", label: "Home", icon: House, href: "/" },
	{ id: "notifications", label: "Alerts", icon: Bell, href: "/notifications" },
];
const Footer = React.forwardRef(({ className }, ref) => {
	const pathname = usePathname();
	return /* @__PURE__ */ jsx("footer", {
		ref,
		className: cn(
			"z-50 fixed bottom-0 left-1/2 -translate-x-1/2 w-[448px] max-w-[448px] h-20 bg-black backdrop-blur-lg rounded-t-xl shadow-2xl border-t border-gray-200/60",
			className,
		),
		"aria-label": "Footer Navigation",
		children: /* @__PURE__ */ jsx("div", {
			className: "relative h-full flex justify-between items-center px-12",
			children: navItems.map(({ id, label, icon: Icon, href }) =>
				/* @__PURE__ */ jsxs(
					Link,
					{
						href,
						className: cn(
							"flex flex-col items-center gap-1 transition-all",
							pathname === id ? "text-blue-600 scale-110" : "text-gray-500 hover:text-blue-400",
						),
						"aria-current": pathname === id ? "page" : void 0,
						children: [
							/* @__PURE__ */ jsx(Icon, { className: cn("w-6 h-6", pathname === id && "stroke-[2.5]") }),
							/* @__PURE__ */ jsx("span", { className: "text-xs font-medium", children: label }),
						],
					},
					id,
				),
			),
		}),
	});
});

const Header = React.forwardRef(({ className }) => {
	return /* @__PURE__ */ jsx("header", {
		className: cn("z-50 h-24 fixed w-[448px] top-0 flex items-center justify-center bg-black text-white", className),
		children: /* @__PURE__ */ jsx("img", { src: "/src/assets/logoChula.png", alt: "logo chulalongkorn" }),
	});
});

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$Layout = createComponent(
	($$result, $$props, $$slots) => {
		const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
		Astro2.self = $$Layout;
		return renderTemplate(
			_a ||
				(_a = __template([
					'<html lang="en" data-astro-cid-sckkx6r4> <head><!-- Google tag (gtag.js) --><script async src="https://www.googletagmanager.com/gtag/js?id=G-ZL7EN8T99Z"></script><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/webp" href="/favicon-vlvu.webp"><meta name="generator" content="Astro"><meta name="viewport" content="width = device-width, initial-scale = 1.0"><title>Astro Basics</title>',
					'</head> <body data-astro-cid-sckkx6r4> <main class="mobile" data-astro-cid-sckkx6r4> ',
					" ",
					' <div class="px-4 pt-4 pb-24" data-astro-cid-sckkx6r4> <article class="max-w-md mx-auto bg-white p-6 rounded-xl shadow-sm" data-astro-cid-sckkx6r4> ',
					" </article> </div> </main> </body></html>",
				])),
			renderHead(),
			renderComponent($$result, "Header", Header, { "data-astro-cid-sckkx6r4": true }),
			renderComponent($$result, "Footer", Footer, { "data-astro-cid-sckkx6r4": true }),
			renderSlot($$result, $$slots["default"]),
		);
	},
	"/Users/nathawatwai/Documents/CUNEXTDORM/src/layouts/Layout.astro",
	void 0,
);

export { $$Layout as $, cn as c };
