import {
	c as createComponent,
	m as maybeRenderHead,
	r as renderComponent,
	b as renderTemplate,
} from "../chunks/astro/server_sfyfDN_r.mjs";
import "kleur/colors";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as React from "react";
import { Component } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import * as RechartsPrimitive from "recharts";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import { $ as $$Layout, c as cn } from "../chunks/Layout_Cz-nAoIb.mjs";
export { renderers } from "../renderers.mjs";

function Tabs({ className, ...props }) {
	return /* @__PURE__ */ jsx(TabsPrimitive.Root, {
		"data-slot": "tabs",
		className: cn("flex flex-col gap-2", className),
		...props,
	});
}
function TabsList({ className, ...props }) {
	return /* @__PURE__ */ jsx(TabsPrimitive.List, {
		"data-slot": "tabs-list",
		className: cn(
			"bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
			className,
		),
		...props,
	});
}
function TabsTrigger({ className, ...props }) {
	return /* @__PURE__ */ jsx(TabsPrimitive.Trigger, {
		"data-slot": "tabs-trigger",
		className: cn(
			"data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
			className,
		),
		...props,
	});
}
function TabsContent({ className, ...props }) {
	return /* @__PURE__ */ jsx(TabsPrimitive.Content, {
		"data-slot": "tabs-content",
		className: cn("flex-1 outline-none", className),
		...props,
	});
}

const THEMES = { light: "", dark: ".dark" };
const ChartContext = React.createContext(null);
function useChart() {
	const context = React.useContext(ChartContext);
	if (!context) {
		throw new Error("useChart must be used within a <ChartContainer />");
	}
	return context;
}
function ChartContainer({ id, className, children, config, ...props }) {
	const uniqueId = React.useId();
	const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;
	return /* @__PURE__ */ jsx(ChartContext.Provider, {
		value: { config },
		children: /* @__PURE__ */ jsxs("div", {
			"data-slot": "chart",
			"data-chart": chartId,
			className: cn(
				"[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border flex aspect-video justify-center text-xs [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden",
				className,
			),
			...props,
			children: [
				/* @__PURE__ */ jsx(ChartStyle, { id: chartId, config }),
				/* @__PURE__ */ jsx(RechartsPrimitive.ResponsiveContainer, { children }),
			],
		}),
	});
}
const ChartStyle = ({ id, config }) => {
	const colorConfig = Object.entries(config).filter(([, itemConfig]) => itemConfig.theme || itemConfig.color);
	if (!colorConfig.length) {
		return null;
	}
	const cssContent = Object.entries(THEMES)
		.map(([theme, prefix]) => {
			const variables = colorConfig
				.map(([key, itemConfig]) => {
					const color = itemConfig.theme?.[theme] || itemConfig.color;
					return color ? `  --color-${key}: ${color};` : null;
				})
				.filter(Boolean)
				.join("\n");
			return `${prefix} [data-chart="${id}"] {
${variables}
}`;
		})
		.join("\n");
	return /* @__PURE__ */ jsx("style", { children: cssContent });
};
const ChartTooltip = RechartsPrimitive.Tooltip;
function ChartTooltipContent({
	active,
	payload,
	className,
	indicator = "dot",
	hideLabel = false,
	hideIndicator = false,
	label,
	labelFormatter,
	labelClassName,
	formatter,
	color,
	nameKey,
	labelKey,
}) {
	const { config } = useChart();
	const tooltipLabel = React.useMemo(() => {
		if (hideLabel || !payload?.length) {
			return null;
		}
		const [item] = payload;
		const key = `${labelKey || item?.dataKey || item?.name || "value"}`;
		const itemConfig = getPayloadConfigFromPayload(config, item, key);
		const value = !labelKey && typeof label === "string" ? config[label]?.label || label : itemConfig?.label;
		if (labelFormatter) {
			return /* @__PURE__ */ jsx("div", {
				className: cn("font-medium", labelClassName),
				children: labelFormatter(value, payload),
			});
		}
		if (!value) {
			return null;
		}
		return /* @__PURE__ */ jsx("div", { className: cn("font-medium", labelClassName), children: value });
	}, [label, labelFormatter, payload, hideLabel, labelClassName, config, labelKey]);
	if (!active || !payload?.length) {
		return null;
	}
	const nestLabel = payload.length === 1 && indicator !== "dot";
	return /* @__PURE__ */ jsxs("div", {
		className: cn(
			"border-border/50 bg-background grid min-w-[8rem] items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl",
			className,
		),
		children: [
			!nestLabel ? tooltipLabel : null,
			/* @__PURE__ */ jsx("div", {
				className: "grid gap-1.5",
				children: payload.map((item, index) => {
					const key = `${nameKey || item.name || item.dataKey || "value"}`;
					const itemConfig = getPayloadConfigFromPayload(config, item, key);
					const indicatorColor = color || item.payload.fill || item.color;
					return /* @__PURE__ */ jsx(
						"div",
						{
							className: cn(
								"[&>svg]:text-muted-foreground flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5",
								indicator === "dot" && "items-center",
							),
							children:
								formatter && item?.value !== void 0 && item.name
									? formatter(item.value, item.name, item, index, item.payload)
									: /* @__PURE__ */ jsxs(Fragment, {
											children: [
												itemConfig?.icon
													? /* @__PURE__ */ jsx(itemConfig.icon, {})
													: !hideIndicator &&
														/* @__PURE__ */ jsx("div", {
															className: cn("shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)", {
																"h-2.5 w-2.5": indicator === "dot",
																"w-1": indicator === "line",
																"w-0 border-[1.5px] border-dashed bg-transparent": indicator === "dashed",
																"my-0.5": nestLabel && indicator === "dashed",
															}),
															style: {
																"--color-bg": indicatorColor,
																"--color-border": indicatorColor,
															},
														}),
												/* @__PURE__ */ jsxs("div", {
													className: cn(
														"flex flex-1 justify-between leading-none",
														nestLabel ? "items-end" : "items-center",
													),
													children: [
														/* @__PURE__ */ jsxs("div", {
															className: "grid gap-1.5",
															children: [
																nestLabel ? tooltipLabel : null,
																/* @__PURE__ */ jsx("span", {
																	className: "text-muted-foreground",
																	children: itemConfig?.label || item.name,
																}),
															],
														}),
														item.value &&
															/* @__PURE__ */ jsx("span", {
																className: "text-foreground font-mono font-medium tabular-nums",
																children: item.value.toLocaleString(),
															}),
													],
												}),
											],
										}),
						},
						item.dataKey,
					);
				}),
			}),
		],
	});
}
function getPayloadConfigFromPayload(config, payload, key) {
	if (typeof payload !== "object" || payload === null) {
		return void 0;
	}
	const payloadPayload =
		"payload" in payload && typeof payload.payload === "object" && payload.payload !== null ? payload.payload : void 0;
	let configLabelKey = key;
	if (key in payload && typeof payload[key] === "string") {
		configLabelKey = payload[key];
	} else if (payloadPayload && key in payloadPayload && typeof payloadPayload[key] === "string") {
		configLabelKey = payloadPayload[key];
	}
	return configLabelKey in config ? config[configLabelKey] : config[key];
}

const chartConfig$2 = {
	amount: {
		label: "Electricity bill",
	},
};
const ElectricityBillList = ({ data }) => {
	return /* @__PURE__ */ jsxs("div", {
		children: [
			/* @__PURE__ */ jsx(ChartContainer, {
				config: chartConfig$2,
				className: "pb-6",
				children: /* @__PURE__ */ jsxs(BarChart, {
					accessibilityLayer: true,
					data,
					margin: {
						top: 20,
					},
					children: [
						/* @__PURE__ */ jsx(CartesianGrid, { vertical: false }),
						/* @__PURE__ */ jsx(XAxis, { dataKey: "date", tickLine: false, tickMargin: 10, axisLine: false }),
						/* @__PURE__ */ jsx(ChartTooltip, {
							cursor: false,
							content: /* @__PURE__ */ jsx(ChartTooltipContent, { hideLabel: true }),
						}),
						/* @__PURE__ */ jsx(Bar, {
							dataKey: "amount",
							fill: "var(--color-desktop)",
							radius: 8,
							children: /* @__PURE__ */ jsx(LabelList, {
								position: "top",
								offset: 12,
								className: "fill-foreground",
								fontSize: 12,
							}),
						}),
					],
				}),
			}),
			/* @__PURE__ */ jsx(StatsSummary$2, { data }),
		],
	});
};
const StatsSummary$2 = ({ data }) => {
	const max = Math.max(...data.map((item) => item.amount));
	const min = Math.min(...data.map((item) => item.amount));
	const total = data.reduce((acc, item) => acc + item.amount, 0);
	const average = total / data.length;
	return /* @__PURE__ */ jsx("div", {
		className: "w-full max-w-md bg-white rounded-lg shadow-sm border border-gray-200",
		children: /* @__PURE__ */ jsxs("table", {
			className: "w-full",
			children: [
				/* @__PURE__ */ jsx("thead", {
					children: /* @__PURE__ */ jsxs("tr", {
						className: "border-b border-gray-200",
						children: [
							/* @__PURE__ */ jsx("th", {
								className: "text-left py-3 px-4 font-medium text-gray-900",
								children: "สถิติ",
							}),
							/* @__PURE__ */ jsx("th", {
								className: "text-right py-3 px-4 font-medium text-gray-900",
								children: "จำนวนเงิน (฿)",
							}),
						],
					}),
				}),
				/* @__PURE__ */ jsxs("tbody", {
					children: [
						/* @__PURE__ */ jsxs("tr", {
							className: "border-b border-gray-100",
							children: [
								/* @__PURE__ */ jsx("td", { className: "py-3 px-4 text-gray-700", children: "สูงสุด" }),
								/* @__PURE__ */ jsx("td", {
									className: "py-3 px-4 text-gray-900 text-right font-medium",
									children: max.toLocaleString(),
								}),
							],
						}),
						/* @__PURE__ */ jsxs("tr", {
							className: "border-b border-gray-100",
							children: [
								/* @__PURE__ */ jsx("td", { className: "py-3 px-4 text-gray-700", children: "ต่ำสุด" }),
								/* @__PURE__ */ jsx("td", {
									className: "py-3 px-4 text-gray-900 text-right font-medium",
									children: min.toLocaleString(),
								}),
							],
						}),
						/* @__PURE__ */ jsxs("tr", {
							children: [
								/* @__PURE__ */ jsx("td", { className: "py-3 px-4 text-gray-700", children: "เฉลี่ย" }),
								/* @__PURE__ */ jsx("td", {
									className: "py-3 px-4 text-gray-900 text-right font-medium",
									children: average.toLocaleString(),
								}),
							],
						}),
					],
				}),
			],
		}),
	});
};

const chartConfig$1 = {
	amount: {
		label: "Rent bill",
	},
};
const RentBillList = ({ data }) => {
	return /* @__PURE__ */ jsxs("div", {
		children: [
			/* @__PURE__ */ jsx(ChartContainer, {
				config: chartConfig$1,
				className: "pb-6",
				children: /* @__PURE__ */ jsxs(BarChart, {
					accessibilityLayer: true,
					data,
					margin: {
						top: 20,
					},
					children: [
						/* @__PURE__ */ jsx(CartesianGrid, { vertical: false }),
						/* @__PURE__ */ jsx(XAxis, { dataKey: "date", tickLine: false, tickMargin: 10, axisLine: false }),
						/* @__PURE__ */ jsx(ChartTooltip, {
							cursor: false,
							content: /* @__PURE__ */ jsx(ChartTooltipContent, { hideLabel: true }),
						}),
						/* @__PURE__ */ jsx(Bar, {
							dataKey: "amount",
							fill: "var(--color-desktop)",
							radius: 8,
							children: /* @__PURE__ */ jsx(LabelList, {
								position: "top",
								offset: 12,
								className: "fill-foreground",
								fontSize: 12,
							}),
						}),
					],
				}),
			}),
			/* @__PURE__ */ jsx(StatsSummary$1, { data }),
		],
	});
};
const StatsSummary$1 = ({ data }) => {
	const max = Math.max(...data.map((item) => item.amount));
	const min = Math.min(...data.map((item) => item.amount));
	const total = data.reduce((acc, item) => acc + item.amount, 0);
	const average = total / data.length;
	return /* @__PURE__ */ jsx("div", {
		className: "w-full max-w-md bg-white rounded-lg shadow-sm border border-gray-200",
		children: /* @__PURE__ */ jsxs("table", {
			className: "w-full",
			children: [
				/* @__PURE__ */ jsx("thead", {
					children: /* @__PURE__ */ jsxs("tr", {
						className: "border-b border-gray-200",
						children: [
							/* @__PURE__ */ jsx("th", {
								className: "text-left py-3 px-4 font-medium text-gray-900",
								children: "สถิติ",
							}),
							/* @__PURE__ */ jsx("th", {
								className: "text-right py-3 px-4 font-medium text-gray-900",
								children: "จำนวนเงิน (฿)",
							}),
						],
					}),
				}),
				/* @__PURE__ */ jsxs("tbody", {
					children: [
						/* @__PURE__ */ jsxs("tr", {
							className: "border-b border-gray-100",
							children: [
								/* @__PURE__ */ jsx("td", { className: "py-3 px-4 text-gray-700", children: "สูงสุด" }),
								/* @__PURE__ */ jsx("td", {
									className: "py-3 px-4 text-gray-900 text-right font-medium",
									children: max.toLocaleString(),
								}),
							],
						}),
						/* @__PURE__ */ jsxs("tr", {
							className: "border-b border-gray-100",
							children: [
								/* @__PURE__ */ jsx("td", { className: "py-3 px-4 text-gray-700", children: "ต่ำสุด" }),
								/* @__PURE__ */ jsx("td", {
									className: "py-3 px-4 text-gray-900 text-right font-medium",
									children: min.toLocaleString(),
								}),
							],
						}),
						/* @__PURE__ */ jsxs("tr", {
							children: [
								/* @__PURE__ */ jsx("td", { className: "py-3 px-4 text-gray-700", children: "เฉลี่ย" }),
								/* @__PURE__ */ jsx("td", {
									className: "py-3 px-4 text-gray-900 text-right font-medium",
									children: average.toLocaleString(),
								}),
							],
						}),
					],
				}),
			],
		}),
	});
};

const chartConfig = {
	amount: {
		label: "Water bill",
	},
};
const WaterBillList = ({ data }) => {
	console.log(data);
	return /* @__PURE__ */ jsxs("div", {
		children: [
			/* @__PURE__ */ jsx(ChartContainer, {
				config: chartConfig,
				className: "pb-6",
				children: /* @__PURE__ */ jsxs(BarChart, {
					accessibilityLayer: true,
					data,
					margin: {
						top: 20,
					},
					children: [
						/* @__PURE__ */ jsx(CartesianGrid, { vertical: false }),
						/* @__PURE__ */ jsx(XAxis, { dataKey: "date", tickLine: false, tickMargin: 10, axisLine: false }),
						/* @__PURE__ */ jsx(ChartTooltip, {
							cursor: false,
							content: /* @__PURE__ */ jsx(ChartTooltipContent, { hideLabel: true }),
						}),
						/* @__PURE__ */ jsx(Bar, {
							dataKey: "amount",
							fill: "var(--color-desktop)",
							radius: 8,
							children: /* @__PURE__ */ jsx(LabelList, {
								position: "top",
								offset: 12,
								className: "fill-foreground",
								fontSize: 12,
							}),
						}),
					],
				}),
			}),
			/* @__PURE__ */ jsx(StatsSummary, { data }),
		],
	});
};
const StatsSummary = ({ data }) => {
	const max = Math.max(...data.map((item) => item.amount));
	const min = Math.min(...data.map((item) => item.amount));
	const total = data.reduce((acc, item) => acc + item.amount, 0);
	const average = total / data.length;
	return /* @__PURE__ */ jsx("div", {
		className: "w-full max-w-md bg-white rounded-lg shadow-sm border border-gray-200",
		children: /* @__PURE__ */ jsxs("table", {
			className: "w-full",
			children: [
				/* @__PURE__ */ jsx("thead", {
					children: /* @__PURE__ */ jsxs("tr", {
						className: "border-b border-gray-200",
						children: [
							/* @__PURE__ */ jsx("th", {
								className: "text-left py-3 px-4 font-medium text-gray-900",
								children: "สถิติ",
							}),
							/* @__PURE__ */ jsx("th", {
								className: "text-right py-3 px-4 font-medium text-gray-900",
								children: "จำนวนเงิน (฿)",
							}),
						],
					}),
				}),
				/* @__PURE__ */ jsxs("tbody", {
					children: [
						/* @__PURE__ */ jsxs("tr", {
							className: "border-b border-gray-100",
							children: [
								/* @__PURE__ */ jsx("td", { className: "py-3 px-4 text-gray-700", children: "สูงสุด" }),
								/* @__PURE__ */ jsx("td", {
									className: "py-3 px-4 text-gray-900 text-right font-medium",
									children: max.toLocaleString(),
								}),
							],
						}),
						/* @__PURE__ */ jsxs("tr", {
							className: "border-b border-gray-100",
							children: [
								/* @__PURE__ */ jsx("td", { className: "py-3 px-4 text-gray-700", children: "ต่ำสุด" }),
								/* @__PURE__ */ jsx("td", {
									className: "py-3 px-4 text-gray-900 text-right font-medium",
									children: min.toLocaleString(),
								}),
							],
						}),
						/* @__PURE__ */ jsxs("tr", {
							children: [
								/* @__PURE__ */ jsx("td", { className: "py-3 px-4 text-gray-700", children: "เฉลี่ย" }),
								/* @__PURE__ */ jsx("td", {
									className: "py-3 px-4 text-gray-900 text-right font-medium",
									children: average.toLocaleString(),
								}),
							],
						}),
					],
				}),
			],
		}),
	});
};

class TabSwitcher extends Component {
	tabs = [
		{ value: "rent", label: "ค่าเช่าห้อง" },
		{ value: "electricity", label: "ค่าไฟฟ้า" },
		{ value: "water", label: "ค่าน้ำ" },
	];
	render() {
		return /* @__PURE__ */ jsxs(Tabs, {
			defaultValue: "rent",
			className: "w-full",
			children: [
				/* @__PURE__ */ jsx(TabsList, {
					className: "flex w-full bg-black",
					children: this.tabs.map((tab) =>
						/* @__PURE__ */ jsx(
							TabsTrigger,
							{
								value: tab.value,
								className: "text-white data-[state=active]:bg-white data-[state=active]:text-black",
								children: tab.label,
							},
							tab.value,
						),
					),
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "p-6 bg-white",
					children: [
						/* @__PURE__ */ jsx(TabsContent, {
							value: "rent",
							children: /* @__PURE__ */ jsx(RentBillList, { data: this.props.data.rent }),
						}),
						/* @__PURE__ */ jsx(TabsContent, {
							value: "electricity",
							children: /* @__PURE__ */ jsx(ElectricityBillList, { data: this.props.data.electricity }),
						}),
						/* @__PURE__ */ jsx(TabsContent, {
							value: "water",
							children: /* @__PURE__ */ jsx(WaterBillList, { data: this.props.data.water }),
						}),
					],
				}),
			],
		});
	}
}

const $$Index = createComponent(
	($$result, $$props, $$slots) => {
		const monthlyExpenses = {
			rent: [
				{ amount: 1e3, date: "01/2568" },
				{ amount: 1e3, date: "02/2568" },
				{ amount: 1e3, date: "03/2568" },
				{ amount: 1e3, date: "04/2568" },
			],
			electricity: [
				{ amount: 534, date: "01/2568" },
				{ amount: 908, date: "02/2568" },
				{ amount: 233, date: "03/2568" },
				{ amount: 1e3, date: "04/2568" },
			],
			water: [
				{ amount: 700, date: "01/2568" },
				{ amount: 500, date: "02/2568" },
				{ amount: 400, date: "03/2568" },
				{ amount: 800, date: "04/2568" },
			],
		};
		return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { default: ($$result2) => renderTemplate` ${maybeRenderHead()}<header class="mb-4"> <h1 class="text-3xl font-bold text-gray-800 mb-2">วิเคราะห์</h1> </header> ${renderComponent($$result2, "TabSwitcher", TabSwitcher, { "client:load": true, data: monthlyExpenses, "client:component-hydration": "load", "client:component-path": "/Users/nathawatwai/Documents/CUNEXTDORM/src/pages/analysis/components/tabSwitcher.tsx", "client:component-export": "TabSwitcher" })} ` })}`;
	},
	"/Users/nathawatwai/Documents/CUNEXTDORM/src/pages/analysis/index.astro",
	void 0,
);

const $$file = "/Users/nathawatwai/Documents/CUNEXTDORM/src/pages/analysis/index.astro";
const $$url = "/analysis";

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
