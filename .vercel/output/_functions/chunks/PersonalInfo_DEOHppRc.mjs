import {
	a as createAstro,
	c as createComponent,
	m as maybeRenderHead,
	r as renderComponent,
	b as renderTemplate,
} from "./astro/server_sfyfDN_r.mjs";
import "kleur/colors";
import { $ as $$InfoCard } from "./InfoCard_BFl7B9e8.mjs";
import { $ as $$InfoItem } from "./InfoItem_C69rQFgC.mjs";

const $$Astro = createAstro();
const $$PersonalInfo = createComponent(
	($$result, $$props, $$slots) => {
		const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
		Astro2.self = $$PersonalInfo;
		const { data } = Astro2.props;
		return renderTemplate`${maybeRenderHead()}<header class="mb-4"> <h1 class="text-3xl font-bold text-gray-800 mb-2">ข้อมูลส่วนตัว</h1> <p class="text-lg text-gray-600">ปีการศึกษา ${data.educationYear}</p> </header> <!-- Tabs (placeholder if interactive in future) --> <div class="flex mb-4 tab"> <button class="flex-1 py-2 font-semibold bg-black text-white rounded-l-lg">ข้อมูลทั่วไป</button> <button class="flex-1 py-2 font-semibold bg-gray-200 text-gray-600 rounded-r-lg">ข้อมูลการเข้าร่วมกิจกรรม</button> </div> <section class="space-y-6"> <!-- InfoCard: General Info --> ${renderComponent($$result, "InfoCard", $$InfoCard, { title: "\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E17\u0E31\u0E48\u0E27\u0E44\u0E1B" }, { default: ($$result2) => renderTemplate` ${renderComponent($$result2, "InfoItem", $$InfoItem, { label: "\u0E23\u0E2B\u0E31\u0E2A\u0E19\u0E34\u0E2A\u0E34\u0E15", value: data.studentId })} ${renderComponent($$result2, "InfoItem", $$InfoItem, { label: "\u0E0A\u0E37\u0E48\u0E2D", value: data.fullName })} ${renderComponent($$result2, "InfoItem", $$InfoItem, { label: "\u0E0A\u0E37\u0E48\u0E2D\u0E40\u0E25\u0E48\u0E19", value: data.nickname })} ${renderComponent($$result2, "InfoItem", $$InfoItem, { label: "\u0E08\u0E31\u0E07\u0E2B\u0E27\u0E31\u0E14", value: data.province })} ${renderComponent($$result2, "InfoItem", $$InfoItem, { label: "E-mail", value: data.email })} ${renderComponent($$result2, "InfoItem", $$InfoItem, { label: "\u0E40\u0E1A\u0E2D\u0E23\u0E4C\u0E42\u0E17\u0E23", value: data.phone })} ` })} <!-- InfoCard: Dorm Info --> ${renderComponent($$result, "InfoCard", $$InfoCard, { title: "\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E2B\u0E2D\u0E1E\u0E31\u0E01" }, { default: ($$result2) => renderTemplate` ${renderComponent($$result2, "InfoItem", $$InfoItem, { label: "\u0E15\u0E36\u0E01", value: data.building })} ${renderComponent($$result2, "InfoItem", $$InfoItem, { label: "\u0E2B\u0E49\u0E2D\u0E07", value: data.room })} ${renderComponent($$result2, "InfoItem", $$InfoItem, { label: "\u0E40\u0E15\u0E35\u0E22\u0E07", value: data.bed })} ${renderComponent($$result2, "InfoItem", $$InfoItem, { label: "A/C No.", value: data.acNumber })} ${renderComponent($$result2, "InfoItem", $$InfoItem, { label: "\u0E0A\u0E31\u0E49\u0E19", value: data.floor })} ` })} <!-- InfoCard: Academic Info --> ${renderComponent($$result, "InfoCard", $$InfoCard, { title: "\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E01\u0E32\u0E23\u0E28\u0E36\u0E01\u0E29\u0E32" }, { default: ($$result2) => renderTemplate` ${renderComponent($$result2, "InfoItem", $$InfoItem, { label: "\u0E40\u0E1B\u0E47\u0E19\u0E19\u0E34\u0E2A\u0E34\u0E15", value: data.status })} ${renderComponent($$result2, "InfoItem", $$InfoItem, { label: "\u0E0A\u0E31\u0E49\u0E19\u0E1B\u0E35\u0E17\u0E35\u0E48", value: data.academicYear })} ${renderComponent($$result2, "InfoItem", $$InfoItem, { label: "\u0E20\u0E32\u0E04\u0E27\u0E34\u0E0A\u0E32", value: data.department })} ${renderComponent($$result2, "InfoItem", $$InfoItem, { label: "\u0E1C\u0E25\u0E01\u0E32\u0E23\u0E40\u0E23\u0E35\u0E22\u0E19 (GPAX)", value: data.gpa })} ` })} </section>`;
	},
	"/Users/nathawatwai/Documents/CUNEXTDORM/src/pages/profile/components/PersonalInfo.astro",
	void 0,
);

const $$file = "/Users/nathawatwai/Documents/CUNEXTDORM/src/pages/profile/components/PersonalInfo.astro";
const $$url = "/profile/components/PersonalInfo";

const _page = /*#__PURE__*/ Object.freeze(
	/*#__PURE__*/ Object.defineProperty(
		{
			__proto__: null,
			default: $$PersonalInfo,
			file: $$file,
			url: $$url,
		},
		Symbol.toStringTag,
		{ value: "Module" },
	),
);

export { $$PersonalInfo as $, _page as _ };
