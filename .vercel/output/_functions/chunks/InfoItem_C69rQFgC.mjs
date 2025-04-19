import {
	a as createAstro,
	c as createComponent,
	m as maybeRenderHead,
	b as renderTemplate,
} from "./astro/server_sfyfDN_r.mjs";
import "kleur/colors";
import "clsx";

const $$Astro = createAstro();
const $$InfoItem = createComponent(
	($$result, $$props, $$slots) => {
		const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
		Astro2.self = $$InfoItem;
		const { label, value } = Astro2.props;
		return renderTemplate`${maybeRenderHead()}<div class="flex justify-between items-center"> <span class="text-gray-600">${label}</span> <span class="text-gray-800">${value}</span> </div>`;
	},
	"/Users/nathawatwai/Documents/CUNEXTDORM/src/pages/profile/components/InfoItem.astro",
	void 0,
);

const $$file = "/Users/nathawatwai/Documents/CUNEXTDORM/src/pages/profile/components/InfoItem.astro";
const $$url = "/profile/components/InfoItem";

const _page = /*#__PURE__*/ Object.freeze(
	/*#__PURE__*/ Object.defineProperty(
		{
			__proto__: null,
			default: $$InfoItem,
			file: $$file,
			url: $$url,
		},
		Symbol.toStringTag,
		{ value: "Module" },
	),
);

export { $$InfoItem as $, _page as _ };
