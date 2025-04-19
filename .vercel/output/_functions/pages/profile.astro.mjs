import { c as createComponent, r as renderComponent, b as renderTemplate } from "../chunks/astro/server_sfyfDN_r.mjs";
import "kleur/colors";
import { $ as $$Layout } from "../chunks/Layout_Cz-nAoIb.mjs";
import { $ as $$PersonalInfo } from "../chunks/PersonalInfo_DEOHppRc.mjs";
export { renderers } from "../renderers.mjs";

const $$Index = createComponent(
	($$result, $$props, $$slots) => {
		const personalData = {
			fullName: "\u0E40\u0E17\u0E22\u0E01\u0E34\u0E08\u0E14\u0E25 \u0E23\u0E31\u0E07\u0E19\u0E32\u0E16\u0E22\u0E4C",
			nickname: "\u0E14\u0E25",
			province: "\u0E2A\u0E23\u0E31\u0E07",
			studentId: "6534465023",
			faculty: "\u0E04\u0E13\u0E30\u0E27\u0E34\u0E17\u0E22\u0E32\u0E28\u0E32\u0E2A\u0E15\u0E23\u0E4C",
			department:
				"\u0E04\u0E13\u0E34\u0E15\u0E28\u0E32\u0E2A\u0E15\u0E23\u0E4C\u0E41\u0E25\u0E30\u0E27\u0E34\u0E17\u0E22\u0E32\u0E01\u0E32\u0E23\u0E04\u0E2D\u0E21\u0E1E\u0E34\u0E27\u0E40\u0E15\u0E2D\u0E23\u0E4C",
			email: "Siwadolrungmart@gmail.com",
			phone: "0630214568",
			building: "\u0E08\u0E4D\u0E32\u0E1B\u0E35",
			room: "1009",
			educationYear: "2565",
			gpa: "4.00",
			status:
				"\u0E42\u0E04\u0E23\u0E07\u0E01\u0E32\u0E23\u0E2D\u0E37\u0E48\u0E19 \u0E04\u0E13\u0E30\u0E27\u0E34\u0E17\u0E22\u0E32\u0E28\u0E32\u0E2A\u0E15\u0E23\u0E4C",
			academicYear: "\u0E1B\u0E35\u0E17\u0E35\u0E48 1",
			bed: "1",
			acNumber: "AC-123456",
			floor: "10",
		};
		return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { default: ($$result2) => renderTemplate` ${renderComponent($$result2, "PersonalInfo", $$PersonalInfo, { data: personalData })} ` })}`;
	},
	"/Users/nathawatwai/Documents/CUNEXTDORM/src/pages/profile/index.astro",
	void 0,
);

const $$file = "/Users/nathawatwai/Documents/CUNEXTDORM/src/pages/profile/index.astro";
const $$url = "/profile";

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
