import {
	a as createAstro,
	c as createComponent,
	m as maybeRenderHead,
	d as renderSlot,
	b as renderTemplate,
} from "./astro/server_sfyfDN_r.mjs";
import "kleur/colors";
import "clsx";

const $$Astro = createAstro();
const $$InfoCard = createComponent(
	($$result, $$props, $$slots) => {
		const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
		Astro2.self = $$InfoCard;
		const { title } = Astro2.props;
		return renderTemplate`${maybeRenderHead()}<div class="bg-white p-4 rounded-lg border border-gray-200"> <h3 class="text-lg font-medium text-gray-700 mb-3">${title}</h3> <div class="space-y-2"> ${renderSlot($$result, $$slots["default"])} </div> </div>`;
	},
	"/Users/nathawatwai/Documents/CUNEXTDORM/src/pages/profile/components/InfoCard.astro",
	void 0,
);

const $$file = "/Users/nathawatwai/Documents/CUNEXTDORM/src/pages/profile/components/InfoCard.astro";
const $$url = "/profile/components/InfoCard";

const _page = /*#__PURE__*/ Object.freeze(
	/*#__PURE__*/ Object.defineProperty(
		{
			__proto__: null,
			default: $$InfoCard,
			file: $$file,
			url: $$url,
		},
		Symbol.toStringTag,
		{ value: "Module" },
	),
);

export { $$InfoCard as $, _page as _ };
