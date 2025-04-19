import {
	e as addAttribute,
	a as createAstro,
	c as createComponent,
	m as maybeRenderHead,
	r as renderComponent,
	b as renderTemplate,
} from "../chunks/astro/server_sfyfDN_r.mjs";
import "kleur/colors";
import { Bed, Building, ChartLine, Megaphone, Newspaper, Receipt, Settings, User } from "lucide-react";
import { $ as $$Layout } from "../chunks/Layout_Cz-nAoIb.mjs";
/* empty css                                 */
export { renderers } from "../renderers.mjs";

const $$Astro = createAstro();
const $$Index = createComponent(
	($$result, $$props, $$slots) => {
		const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
		Astro2.self = $$Index;
		const menulists = [
			{
				id: 1,
				name: "\u0E1A\u0E34\u0E25\u0E04\u0E48\u0E32\u0E40\u0E0A\u0E48\u0E32",
				icon: "Receipt",
				path: "/bill",
			},
			{
				id: 2,
				name: "\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C",
				icon: "ChartLine",
				path: "/analysis",
			},
			{
				id: 3,
				name: "\u0E22\u0E37\u0E48\u0E19\u0E2D\u0E22\u0E39\u0E48\u0E2B\u0E2D\u0E15\u0E48\u0E2D",
				icon: "Building",
				path: "/extend",
			},
			{
				id: 4,
				name: "\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E40\u0E15\u0E35\u0E22\u0E07\u0E43\u0E2B\u0E21\u0E48",
				icon: "Bed",
				path: "/selectbed",
			},
			{
				id: 5,
				name: "\u0E2A\u0E16\u0E32\u0E19\u0E30\u0E40\u0E15\u0E35\u0E22\u0E07",
				icon: "Bed",
				path: "/bedstatus",
			},
			{
				id: 6,
				name: "\u0E41\u0E08\u0E49\u0E07\u0E40\u0E23\u0E37\u0E48\u0E2D\u0E07",
				icon: "Megaphone",
				path: "/report",
			},
			{
				id: 7,
				name: "\u0E02\u0E48\u0E32\u0E27\u0E2A\u0E32\u0E23",
				icon: "Newspaper",
				path: "/news",
			},
			{
				id: 8,
				name: "\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E2A\u0E48\u0E27\u0E19\u0E15\u0E31\u0E27",
				icon: "User",
				path: "/profile",
			},
			{
				id: 9,
				name: "\u0E15\u0E31\u0E49\u0E07\u0E04\u0E48\u0E32",
				icon: "Settings",
				path: "/settings",
			},
		];
		return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "data-astro-cid-j7pv25f6": true }, { default: ($$result2) => renderTemplate`${maybeRenderHead()}<div class="grid-cols-3 grid gap-x-8 gap-y-4 w-fit mx-auto pb-40" data-astro-cid-j7pv25f6>${menulists.map((menu) => renderTemplate`<a${addAttribute(menu.path, "href")} class="w-20 h-20 bg-neutral-800 rounded-xl flex flex-col justify-center items-center gap-2" data-astro-cid-j7pv25f6>${menu.icon === "Receipt" && renderTemplate`${renderComponent($$result2, "Receipt", Receipt, { className: "icon", "data-astro-cid-j7pv25f6": true })}`}${menu.icon === "ChartLine" && renderTemplate`${renderComponent($$result2, "ChartLine", ChartLine, { className: "icon", "data-astro-cid-j7pv25f6": true })}`}${menu.icon === "Building" && renderTemplate`${renderComponent($$result2, "Building", Building, { className: "icon", "data-astro-cid-j7pv25f6": true })}`}${menu.icon === "Bed" && renderTemplate`${renderComponent($$result2, "Bed", Bed, { className: "icon", "data-astro-cid-j7pv25f6": true })}`}${menu.icon === "Megaphone" && renderTemplate`${renderComponent($$result2, "Megaphone", Megaphone, { className: "icon", "data-astro-cid-j7pv25f6": true })}`}${menu.icon === "Newspaper" && renderTemplate`${renderComponent($$result2, "Newspaper", Newspaper, { className: "icon", "data-astro-cid-j7pv25f6": true })}`}${menu.icon === "User" && renderTemplate`${renderComponent($$result2, "User", User, { className: "icon", "data-astro-cid-j7pv25f6": true })}`}${menu.icon === "Settings" && renderTemplate`${renderComponent($$result2, "Settings", Settings, { className: "icon", "data-astro-cid-j7pv25f6": true })}`}<span class="text-white text-xs font-Anuphan" data-astro-cid-j7pv25f6>${menu.name}</span></a>`)}</div>` })}`;
	},
	"/Users/nathawatwai/Documents/CUNEXTDORM/src/pages/index.astro",
	void 0,
);

const $$file = "/Users/nathawatwai/Documents/CUNEXTDORM/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/ Object.freeze(
	/*#__PURE__*/ Object.defineProperty(
		{
			__proto__: null,
			default: $$Index,
			file: $$file,
			url: $$url,
		},
		Symbol.toStringTag,
		{ value: "Module" },
	),
);

const page = () => _page;

export { page };
