import { c as createComponent, r as renderComponent, b as renderTemplate } from "../chunks/astro/server_sfyfDN_r.mjs";
import "kleur/colors";
import { Send } from "lucide-react";
import { Component } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { $ as $$Layout } from "../chunks/Layout_Cz-nAoIb.mjs";
export { renderers } from "../renderers.mjs";

class ReportForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			reporterName: "Mr. Kiwol Rangmas",
			building: "Building J",
			room: "1009",
			bed: "B",
			section: "10",
			contactNumber: "0630214568",
			issueTypes: [],
			appointmentTimes: [],
			problemDescription: "",
			photos: [],
		};
	}
	handleCheckboxChange = (category, value) => {
		this.setState((prevState) => {
			const items = prevState[category].includes(value)
				? prevState[category].filter((item) => item !== value)
				: [value];
			return { [category]: items };
		});
	};
	handleSubmit = (e) => {
		e.preventDefault();
		alert("Form submitted");
		console.log("Form submitted:", this.state);
	};
	render() {
		return /* @__PURE__ */ jsxs("div", {
			children: [
				/* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold mb-4", children: "แจ้งเรื่อง" }),
				/* @__PURE__ */ jsxs("section", {
					className: "mb-6",
					children: [
						/* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold mb-2", children: "ข้อมูลผู้แจ้งเรื่อง" }),
						/* @__PURE__ */ jsx("p", { className: "text-gray-600", children: this.state.reporterName }),
					],
				}),
				/* @__PURE__ */ jsxs("section", {
					className: "mb-6 grid grid-cols-2 gap-4",
					children: [
						/* @__PURE__ */ jsxs("div", {
							children: [
								/* @__PURE__ */ jsx("span", { className: "block text-sm font-medium mb-1", children: "ตึก" }),
								/* @__PURE__ */ jsx("p", { className: "text-gray-600", children: this.state.building }),
							],
						}),
						/* @__PURE__ */ jsxs("div", {
							children: [
								/* @__PURE__ */ jsx("span", { className: "block text-sm font-medium mb-1", children: "ห้อง" }),
								/* @__PURE__ */ jsx("p", { className: "text-gray-600", children: this.state.room }),
							],
						}),
						/* @__PURE__ */ jsxs("div", {
							children: [
								/* @__PURE__ */ jsx("span", { className: "block text-sm font-medium mb-1", children: "เตียง" }),
								/* @__PURE__ */ jsx("p", { className: "text-gray-600", children: this.state.bed }),
							],
						}),
						/* @__PURE__ */ jsxs("div", {
							children: [
								/* @__PURE__ */ jsx("span", { className: "block text-sm font-medium mb-1", children: "ชั้น" }),
								/* @__PURE__ */ jsx("p", { className: "text-gray-600", children: this.state.section }),
							],
						}),
					],
				}),
				/* @__PURE__ */ jsxs("section", {
					className: "mb-6",
					children: [
						/* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold mb-2", children: "เบอร์โทรติดต่อ" }),
						/* @__PURE__ */ jsx("p", { className: "text-gray-600", children: this.state.contactNumber }),
					],
				}),
				/* @__PURE__ */ jsxs("section", {
					className: "mb-6",
					children: [
						/* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold mb-2", children: "ประเภทงานซ่อม" }),
						["งานประตูและลูกบิด/ประตูกระจก", "สัญญาณอินเตอร์เน็ต(WIFI)", "งานตู้น้ำดื่ม(ตู้น้ำร้อนน้ำเย็น)", "อื่น ๆ"].map((issue) =>
							/* @__PURE__ */ jsxs(
								"span",
								{
									className: "flex items-center space-x-2 mb-2",
									children: [
										/* @__PURE__ */ jsx("input", {
											type: "checkbox",
											checked: this.state.issueTypes.includes(issue),
											onChange: () => this.handleCheckboxChange("issueTypes", issue),
											className: "form-checkbox h-4 w-4",
										}),
										/* @__PURE__ */ jsx("span", { className: "text-gray-700", children: issue }),
									],
								},
								issue,
							),
						),
					],
				}),
				/* @__PURE__ */ jsxs("section", {
					className: "mb-6",
					children: [
						/* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold mb-2", children: "การนัดหมาย" }),
						["13:00-16:00 (ทุกวันจันทร์-ศุกร์)", "09.00-16.00 (ทุกวันเสาร์-อาทิตย์)"].map((time) =>
							/* @__PURE__ */ jsxs(
								"span",
								{
									className: "flex items-center space-x-2 mb-2",
									children: [
										/* @__PURE__ */ jsx("input", {
											type: "checkbox",
											checked: this.state.appointmentTimes.includes(time),
											onChange: () => this.handleCheckboxChange("appointmentTimes", time),
											className: "form-checkbox h-4 w-4",
										}),
										/* @__PURE__ */ jsx("span", { className: "text-gray-700", children: time }),
									],
								},
								time,
							),
						),
					],
				}),
				/* @__PURE__ */ jsxs("section", {
					className: "mb-6",
					children: [
						/* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold mb-2", children: "รายละเอียด" }),
						/* @__PURE__ */ jsx("textarea", {
							value: this.state.problemDescription,
							onChange: (e) => this.setState({ problemDescription: e.target.value }),
							className: "w-full p-2 border rounded-md",
							placeholder: "ยกตัวอย่างเช่น ประตูห้องน้ำเปิดไม่ออก",
							rows: 4,
						}),
					],
				}),
				/* @__PURE__ */ jsxs("section", {
					className: "mb-6",
					children: [
						/* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold mb-2", children: "อัพโหลดรูปภาพ" }),
						/* @__PURE__ */ jsx("input", {
							type: "file",
							accept: "image/*",
							onChange: (e) => this.setState({ photos: Array.from(e.target.files || []) }),
							className:
								"block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100",
						}),
						/* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mt-1", children: "ขนาดไฟล์ไม่เกิน 10 MB" }),
					],
				}),
				/* @__PURE__ */ jsx("section", {
					className: "flex justify-end",
					children: /* @__PURE__ */ jsxs("button", {
						type: "submit",
						className: "inline-flex bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors",
						onClick: this.handleSubmit,
						children: [/* @__PURE__ */ jsx(Send, { className: "pr-2" }), "ยืนยันการแจ้งเรื่อง"],
					}),
				}),
			],
		});
	}
}

const $$Index = createComponent(
	($$result, $$props, $$slots) => {
		return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { default: ($$result2) => renderTemplate` ${renderComponent($$result2, "ReportForm", ReportForm, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/nathawatwai/Documents/CUNEXTDORM/src/pages/report/components/reportForm", "client:component-export": "ReportForm" })} ` })}`;
	},
	"/Users/nathawatwai/Documents/CUNEXTDORM/src/pages/report/index.astro",
	void 0,
);

const $$file = "/Users/nathawatwai/Documents/CUNEXTDORM/src/pages/report/index.astro";
const $$url = "/report";

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
