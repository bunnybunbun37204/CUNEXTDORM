import {
	c as createComponent,
	m as maybeRenderHead,
	r as renderComponent,
	b as renderTemplate,
} from "../chunks/astro/server_sfyfDN_r.mjs";
import "kleur/colors";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { ChevronDownIcon, CircleCheck, CircleX, LoaderCircle, Printer } from "lucide-react";
import { Component } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { $ as $$Layout, c as cn } from "../chunks/Layout_Cz-nAoIb.mjs";
/* empty css                                 */
export { renderers } from "../renderers.mjs";

function Accordion({ ...props }) {
	return /* @__PURE__ */ jsx(AccordionPrimitive.Root, { "data-slot": "accordion", ...props });
}
function AccordionItem({ className, ...props }) {
	return /* @__PURE__ */ jsx(AccordionPrimitive.Item, {
		"data-slot": "accordion-item",
		className: cn("border-b last:border-b-0", className),
		...props,
	});
}
function AccordionTrigger({ className, children, ...props }) {
	return /* @__PURE__ */ jsx(AccordionPrimitive.Header, {
		className: "flex",
		children: /* @__PURE__ */ jsxs(AccordionPrimitive.Trigger, {
			"data-slot": "accordion-trigger",
			className: cn(
				"focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
				className,
			),
			...props,
			children: [
				children,
				/* @__PURE__ */ jsx(ChevronDownIcon, {
					className:
						"text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200",
				}),
			],
		}),
	});
}
function AccordionContent({ className, children, ...props }) {
	return /* @__PURE__ */ jsx(AccordionPrimitive.Content, {
		"data-slot": "accordion-content",
		className:
			"data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm",
		...props,
		children: /* @__PURE__ */ jsx("div", { className: cn("pt-0 pb-4", className), children }),
	});
}

const statusMap = {
	paid: { color: "text-green-600", text: "ชำระแล้ว" },
	pending: { color: "text-orange-500", text: "รอดำเนินการ" },
	unpaid: { color: "text-red-500", text: "ค้างชำระ" },
};

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
	{
		variants: {
			variant: {
				default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
				destructive:
					"bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
				outline:
					"border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
				secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
				ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
				link: "text-primary underline-offset-4 hover:underline",
			},
			size: {
				default: "h-9 px-4 py-2 has-[>svg]:px-3",
				sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
				lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
				icon: "size-9",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);
function Button({ className, variant, size, asChild = false, ...props }) {
	const Comp = asChild ? Slot : "button";
	return /* @__PURE__ */ jsx(Comp, {
		"data-slot": "button",
		className: cn(buttonVariants({ variant, size, className })),
		...props,
	});
}

class BillContent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			items: [
				{ name: "ค่าเช่าห้อง", amount: 1e4 },
				{ name: "ค่าน้ำ", amount: 1e4 },
				{ name: "ค่าไฟฟ้า", amount: 1e4 },
				{ name: "ค่าปรับ", amount: 1e4 },
				{ name: "ค่าประกัน", amount: 1e4 },
			],
			total: 5e4,
		};
	}
	renderBillItem(item, index) {
		return /* @__PURE__ */ jsxs(
			"li",
			{
				className: "flex justify-between items-center py-2 border-b border-gray-100",
				children: [
					/* @__PURE__ */ jsx("span", { className: "text-gray-600", children: item.name }),
					/* @__PURE__ */ jsxs("span", {
						className: "text-gray-800 font-medium",
						children: [item.amount.toLocaleString(), " ฿"],
					}),
				],
			},
			index,
		);
	}
	render() {
		return /* @__PURE__ */ jsxs("div", {
			className: "bg-white rounded-lg shadow-sm px-6 pb-6 max-w-2xl mx-auto",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "mb-6",
					children: [
						/* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-700 mb-3", children: "รายการ" }),
						/* @__PURE__ */ jsx("ul", {
							className: "space-y-2",
							children: this.state.items.map((item, index) => this.renderBillItem(item, index)),
						}),
					],
				}),
				/* @__PURE__ */ jsx("div", {
					className: "pt-4 border-t border-gray-200 mb-6",
					children: /* @__PURE__ */ jsxs("div", {
						className: "flex justify-between items-center",
						children: [
							/* @__PURE__ */ jsx("span", { className: "text-lg font-semibold text-gray-700", children: "รวม" }),
							/* @__PURE__ */ jsxs("span", {
								className: "text-xl font-bold text-blue-600",
								children: [this.state.total.toLocaleString(), " ฿"],
							}),
						],
					}),
				}),
				/* @__PURE__ */ jsx("div", {
					className: "flex justify-end",
					children: /* @__PURE__ */ jsxs(Button, {
						className: "hover:cursor-pointer",
						children: [/* @__PURE__ */ jsx(Printer, {}), "พิมพ์"],
					}),
				}),
			],
		});
	}
}

class BillAccorder extends Component {
	renderBillItem(bill) {
		const { color, text } = statusMap[bill.status];
		return /* @__PURE__ */ jsxs(
			AccordionItem,
			{
				value: `${bill.month}-${bill.year}`,
				children: [
					/* @__PURE__ */ jsx(AccordionTrigger, {
						className: "hover:no-underline",
						children: /* @__PURE__ */ jsxs("div", {
							className: "flex w-full justify-between items-center -mr-2",
							children: [
								/* @__PURE__ */ jsxs("span", { children: ["บิลค่าเช่าเดือน ", bill.month, " / ", bill.year] }),
								/* @__PURE__ */ jsxs("span", {
									className: `flex items-center space-x-1 ${color}`,
									children: [
										this.renderStatusIcon(bill.status),
										/* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: text }),
									],
								}),
							],
						}),
					}),
					/* @__PURE__ */ jsx(AccordionContent, { children: /* @__PURE__ */ jsx(BillContent, {}) }),
				],
			},
			`${bill.month}-${bill.year}`,
		);
	}
	renderStatusIcon(status) {
		switch (status) {
			case "paid":
				return /* @__PURE__ */ jsx(CircleCheck, { className: "icon" });
			case "pending":
				return /* @__PURE__ */ jsx(LoaderCircle, { className: "icon" });
			case "unpaid":
				return /* @__PURE__ */ jsx(CircleX, { className: "icon" });
			default:
				return null;
		}
	}
	render() {
		return /* @__PURE__ */ jsx(Accordion, {
			type: "single",
			collapsible: true,
			className: "w-full",
			children: this.props.bills.map((bill) => this.renderBillItem(bill)),
		});
	}
}

const $$Index = createComponent(
	($$result, $$props, $$slots) => {
		const bills = [
			{ id: "1", month: "January", year: 2523, status: "paid" },
			{ id: "2", month: "February", year: 2523, status: "pending" },
			{ id: "3", month: "March", year: 2523, status: "unpaid" },
			{ id: "4", month: "January", year: 2524, status: "paid" },
			{ id: "5", month: "February", year: 2524, status: "pending" },
			{ id: "6", month: "March", year: 2524, status: "unpaid" },
			{ id: "7", month: "January", year: 2525, status: "paid" },
			{ id: "8", month: "February", year: 2525, status: "pending" },
			{ id: "9", month: "March", year: 2525, status: "unpaid" },
			{ id: "10", month: "January", year: 2526, status: "paid" },
			{ id: "11", month: "February", year: 2526, status: "pending" },
		];
		return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "data-astro-cid-saki7ppe": true }, { default: ($$result2) => renderTemplate`${maybeRenderHead()}<header class="mb-4" data-astro-cid-saki7ppe><h1 class="text-3xl font-bold text-gray-800 mb-2" data-astro-cid-saki7ppe>บิลค่าเช่า</h1></header>${renderComponent($$result2, "BillAccorder", BillAccorder, { bills: bills, "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/nathawatwai/Documents/CUNEXTDORM/src/pages/bill/components/billAccorder", "client:component-export": "BillAccorder", "data-astro-cid-saki7ppe": true })}` })}`;
	},
	"/Users/nathawatwai/Documents/CUNEXTDORM/src/pages/bill/index.astro",
	void 0,
);

const $$file = "/Users/nathawatwai/Documents/CUNEXTDORM/src/pages/bill/index.astro";
const $$url = "/bill";

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
