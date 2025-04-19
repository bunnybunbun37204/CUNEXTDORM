import { c as createComponent, b as renderTemplate } from "../chunks/astro/server_sfyfDN_r.mjs";
import "kleur/colors";
import "clsx";
export { renderers } from "../renderers.mjs";

const $$Index = createComponent(
	($$result, $$props, $$slots) => {
		return renderTemplate``;
	},
	"/Users/nathawatwai/Documents/CUNEXTDORM/src/pages/settings/index.astro",
	void 0,
);

const $$file = "/Users/nathawatwai/Documents/CUNEXTDORM/src/pages/settings/index.astro";
const $$url = "/settings";

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
