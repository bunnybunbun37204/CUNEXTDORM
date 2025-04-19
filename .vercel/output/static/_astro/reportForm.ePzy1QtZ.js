import { c as n } from "./createLucideIcon.LW8We0kz.js"; /**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
import { r as c } from "./index.CDlOlYQx.js";
import { j as e } from "./jsx-runtime.D_zvdyIk.js";
const m = [
		[
			"path",
			{
				d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
				key: "1ffxy3",
			},
		],
		["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }],
	],
	r = n("send", m);
class b extends c.Component {
	constructor(s) {
		super(s),
			(this.state = {
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
			});
	}
	handleCheckboxChange = (s, t) => {
		this.setState((a) => {
			const l = a[s].includes(t) ? a[s].filter((i) => i !== t) : [t];
			return { [s]: l };
		});
	};
	handleSubmit = (s) => {
		s.preventDefault(), alert("Form submitted"), console.log("Form submitted:", this.state);
	};
	render() {
		return e.jsxs("div", {
			children: [
				e.jsx("h1", { className: "text-2xl font-bold mb-4", children: "แจ้งเรื่อง" }),
				e.jsxs("section", {
					className: "mb-6",
					children: [
						e.jsx("h2", { className: "text-lg font-semibold mb-2", children: "ข้อมูลผู้แจ้งเรื่อง" }),
						e.jsx("p", { className: "text-gray-600", children: this.state.reporterName }),
					],
				}),
				e.jsxs("section", {
					className: "mb-6 grid grid-cols-2 gap-4",
					children: [
						e.jsxs("div", {
							children: [
								e.jsx("span", { className: "block text-sm font-medium mb-1", children: "ตึก" }),
								e.jsx("p", { className: "text-gray-600", children: this.state.building }),
							],
						}),
						e.jsxs("div", {
							children: [
								e.jsx("span", { className: "block text-sm font-medium mb-1", children: "ห้อง" }),
								e.jsx("p", { className: "text-gray-600", children: this.state.room }),
							],
						}),
						e.jsxs("div", {
							children: [
								e.jsx("span", { className: "block text-sm font-medium mb-1", children: "เตียง" }),
								e.jsx("p", { className: "text-gray-600", children: this.state.bed }),
							],
						}),
						e.jsxs("div", {
							children: [
								e.jsx("span", { className: "block text-sm font-medium mb-1", children: "ชั้น" }),
								e.jsx("p", { className: "text-gray-600", children: this.state.section }),
							],
						}),
					],
				}),
				e.jsxs("section", {
					className: "mb-6",
					children: [
						e.jsx("h2", { className: "text-lg font-semibold mb-2", children: "เบอร์โทรติดต่อ" }),
						e.jsx("p", { className: "text-gray-600", children: this.state.contactNumber }),
					],
				}),
				e.jsxs("section", {
					className: "mb-6",
					children: [
						e.jsx("h2", { className: "text-lg font-semibold mb-2", children: "ประเภทงานซ่อม" }),
						["งานประตูและลูกบิด/ประตูกระจก", "สัญญาณอินเตอร์เน็ต(WIFI)", "งานตู้น้ำดื่ม(ตู้น้ำร้อนน้ำเย็น)", "อื่น ๆ"].map((s) =>
							e.jsxs(
								"span",
								{
									className: "flex items-center space-x-2 mb-2",
									children: [
										e.jsx("input", {
											type: "checkbox",
											checked: this.state.issueTypes.includes(s),
											onChange: () => this.handleCheckboxChange("issueTypes", s),
											className: "form-checkbox h-4 w-4",
										}),
										e.jsx("span", { className: "text-gray-700", children: s }),
									],
								},
								s,
							),
						),
					],
				}),
				e.jsxs("section", {
					className: "mb-6",
					children: [
						e.jsx("h2", { className: "text-lg font-semibold mb-2", children: "การนัดหมาย" }),
						["13:00-16:00 (ทุกวันจันทร์-ศุกร์)", "09.00-16.00 (ทุกวันเสาร์-อาทิตย์)"].map((s) =>
							e.jsxs(
								"span",
								{
									className: "flex items-center space-x-2 mb-2",
									children: [
										e.jsx("input", {
											type: "checkbox",
											checked: this.state.appointmentTimes.includes(s),
											onChange: () => this.handleCheckboxChange("appointmentTimes", s),
											className: "form-checkbox h-4 w-4",
										}),
										e.jsx("span", { className: "text-gray-700", children: s }),
									],
								},
								s,
							),
						),
					],
				}),
				e.jsxs("section", {
					className: "mb-6",
					children: [
						e.jsx("h2", { className: "text-lg font-semibold mb-2", children: "รายละเอียด" }),
						e.jsx("textarea", {
							value: this.state.problemDescription,
							onChange: (s) => this.setState({ problemDescription: s.target.value }),
							className: "w-full p-2 border rounded-md",
							placeholder: "ยกตัวอย่างเช่น ประตูห้องน้ำเปิดไม่ออก",
							rows: 4,
						}),
					],
				}),
				e.jsxs("section", {
					className: "mb-6",
					children: [
						e.jsx("h2", { className: "text-lg font-semibold mb-2", children: "อัพโหลดรูปภาพ" }),
						e.jsx("input", {
							type: "file",
							accept: "image/*",
							onChange: (s) => this.setState({ photos: Array.from(s.target.files || []) }),
							className:
								"block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100",
						}),
						e.jsx("p", { className: "text-sm text-gray-500 mt-1", children: "ขนาดไฟล์ไม่เกิน 10 MB" }),
					],
				}),
				e.jsx("section", {
					className: "flex justify-end",
					children: e.jsxs("button", {
						type: "submit",
						className: "inline-flex bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors",
						onClick: this.handleSubmit,
						children: [e.jsx(r, { className: "pr-2" }), "ยืนยันการแจ้งเรื่อง"],
					}),
				}),
			],
		});
	}
}
export { b as ReportForm };
