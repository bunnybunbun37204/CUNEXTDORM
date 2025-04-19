import { c as createComponent, r as renderComponent, b as renderTemplate } from "../chunks/astro/server_sfyfDN_r.mjs";
import "kleur/colors";
import { $ as $$Layout } from "../chunks/Layout_Cz-nAoIb.mjs";
export { renderers } from "../renderers.mjs";

const $$Index = createComponent(
	($$result, $$props, $$slots) => {
		return renderTemplate`${renderComponent(
			$$result,
			"Layout",
			$$Layout,
			{},
			{
				default: ($$result2) => renderTemplate`
Hi, this is the bed selection page.
`,
			},
		)}`;
	},
	"/Users/nathawatwai/Documents/CUNEXTDORM/src/pages/selectbed/index.astro",
	void 0,
);

const $$file = "/Users/nathawatwai/Documents/CUNEXTDORM/src/pages/selectbed/index.astro";
const $$url = "/selectbed";

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
