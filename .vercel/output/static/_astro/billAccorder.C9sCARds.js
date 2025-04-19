import { c as w } from "./createLucideIcon.LW8We0kz.js";
import { R as f, r as x } from "./index.CDlOlYQx.js";
import { j as o } from "./jsx-runtime.D_zvdyIk.js";
import {
	P as A,
	u as F,
	i as I,
	f as T,
	b as U,
	d as W,
	j as fe,
	S as he,
	h as me,
	k as pe,
	c as q,
	e as ve,
	a as xe,
} from "./utils.B-hw8VEN.js";
import "./index.CclUD5iE.js";
var V = "Collapsible",
	[ge, X] = q(V),
	[be, D] = ge(V),
	Y = x.forwardRef((n, t) => {
		const { __scopeCollapsible: e, open: a, defaultOpen: s, disabled: r, onOpenChange: c, ...l } = n,
			[p = !1, i] = T({ prop: a, defaultProp: s, onChange: c });
		return o.jsx(be, {
			scope: e,
			disabled: r,
			contentId: F(),
			open: p,
			onOpenToggle: x.useCallback(() => i((u) => !u), [i]),
			children: o.jsx(A.div, { "data-state": z(p), "data-disabled": r ? "" : void 0, ...l, ref: t }),
		});
	});
Y.displayName = V;
var J = "CollapsibleTrigger",
	Q = x.forwardRef((n, t) => {
		const { __scopeCollapsible: e, ...a } = n,
			s = D(J, e);
		return o.jsx(A.button, {
			type: "button",
			"aria-controls": s.contentId,
			"aria-expanded": s.open || !1,
			"data-state": z(s.open),
			"data-disabled": s.disabled ? "" : void 0,
			disabled: s.disabled,
			...a,
			ref: t,
			onClick: U(n.onClick, s.onOpenToggle),
		});
	});
Q.displayName = J;
var M = "CollapsibleContent",
	Z = x.forwardRef((n, t) => {
		const { forceMount: e, ...a } = n,
			s = D(M, n.__scopeCollapsible);
		return o.jsx(me, { present: e || s.open, children: ({ present: r }) => o.jsx(Ce, { ...a, ref: t, present: r }) });
	});
Z.displayName = M;
var Ce = x.forwardRef((n, t) => {
	const { __scopeCollapsible: e, present: a, children: s, ...r } = n,
		c = D(M, e),
		[l, p] = x.useState(a),
		i = x.useRef(null),
		u = W(t, i),
		m = x.useRef(0),
		v = m.current,
		b = x.useRef(0),
		j = b.current,
		g = c.open || l,
		h = x.useRef(g),
		y = x.useRef(void 0);
	return (
		x.useEffect(() => {
			const d = requestAnimationFrame(() => (h.current = !1));
			return () => cancelAnimationFrame(d);
		}, []),
		pe(() => {
			const d = i.current;
			if (d) {
				(y.current = y.current || {
					transitionDuration: d.style.transitionDuration,
					animationName: d.style.animationName,
				}),
					(d.style.transitionDuration = "0s"),
					(d.style.animationName = "none");
				const N = d.getBoundingClientRect();
				(m.current = N.height),
					(b.current = N.width),
					h.current ||
						((d.style.transitionDuration = y.current.transitionDuration),
						(d.style.animationName = y.current.animationName)),
					p(a);
			}
		}, [c.open, a]),
		o.jsx(A.div, {
			"data-state": z(c.open),
			"data-disabled": c.disabled ? "" : void 0,
			id: c.contentId,
			hidden: !g,
			...r,
			ref: u,
			style: {
				"--radix-collapsible-content-height": v ? `${v}px` : void 0,
				"--radix-collapsible-content-width": j ? `${j}px` : void 0,
				...n.style,
			},
			children: g && s,
		})
	);
});
function z(n) {
	return n ? "open" : "closed";
}
var ye = Y,
	je = Q,
	Ne = Z,
	C = "Accordion",
	Ae = ["Home", "End", "ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"],
	[L, we, _e] = xe(C),
	[k, ct] = q(C, [_e, X]),
	B = X(),
	ee = f.forwardRef((n, t) => {
		const { type: e, ...a } = n,
			s = a,
			r = a;
		return o.jsx(L.Provider, {
			scope: n.__scopeAccordion,
			children: e === "multiple" ? o.jsx(Pe, { ...r, ref: t }) : o.jsx(Re, { ...s, ref: t }),
		});
	});
ee.displayName = C;
var [te, Ie] = k(C),
	[ne, ke] = k(C, { collapsible: !1 }),
	Re = f.forwardRef((n, t) => {
		const { value: e, defaultValue: a, onValueChange: s = () => {}, collapsible: r = !1, ...c } = n,
			[l, p] = T({ prop: e, defaultProp: a, onChange: s });
		return o.jsx(te, {
			scope: n.__scopeAccordion,
			value: l ? [l] : [],
			onItemOpen: p,
			onItemClose: f.useCallback(() => r && p(""), [r, p]),
			children: o.jsx(ne, { scope: n.__scopeAccordion, collapsible: r, children: o.jsx(oe, { ...c, ref: t }) }),
		});
	}),
	Pe = f.forwardRef((n, t) => {
		const { value: e, defaultValue: a, onValueChange: s = () => {}, ...r } = n,
			[c = [], l] = T({ prop: e, defaultProp: a, onChange: s }),
			p = f.useCallback((u) => l((m = []) => [...m, u]), [l]),
			i = f.useCallback((u) => l((m = []) => m.filter((v) => v !== u)), [l]);
		return o.jsx(te, {
			scope: n.__scopeAccordion,
			value: c,
			onItemOpen: p,
			onItemClose: i,
			children: o.jsx(ne, { scope: n.__scopeAccordion, collapsible: !0, children: o.jsx(oe, { ...r, ref: t }) }),
		});
	}),
	[Se, R] = k(C),
	oe = f.forwardRef((n, t) => {
		const { __scopeAccordion: e, disabled: a, dir: s, orientation: r = "vertical", ...c } = n,
			l = f.useRef(null),
			p = W(l, t),
			i = we(e),
			m = ve(s) === "ltr",
			v = U(n.onKeyDown, (b) => {
				if (!Ae.includes(b.key)) return;
				const j = b.target,
					g = i().filter((O) => !O.ref.current?.disabled),
					h = g.findIndex((O) => O.ref.current === j),
					y = g.length;
				if (h === -1) return;
				b.preventDefault();
				let d = h;
				const N = 0,
					P = y - 1,
					S = () => {
						(d = h + 1), d > P && (d = N);
					},
					E = () => {
						(d = h - 1), d < N && (d = P);
					};
				switch (b.key) {
					case "Home":
						d = N;
						break;
					case "End":
						d = P;
						break;
					case "ArrowRight":
						r === "horizontal" && (m ? S() : E());
						break;
					case "ArrowDown":
						r === "vertical" && S();
						break;
					case "ArrowLeft":
						r === "horizontal" && (m ? E() : S());
						break;
					case "ArrowUp":
						r === "vertical" && E();
						break;
				}
				const ue = d % y;
				g[ue].ref.current?.focus();
			});
		return o.jsx(Se, {
			scope: e,
			disabled: a,
			direction: s,
			orientation: r,
			children: o.jsx(L.Slot, {
				scope: e,
				children: o.jsx(A.div, { ...c, "data-orientation": r, ref: p, onKeyDown: a ? void 0 : v }),
			}),
		});
	}),
	_ = "AccordionItem",
	[Ee, H] = k(_),
	re = f.forwardRef((n, t) => {
		const { __scopeAccordion: e, value: a, ...s } = n,
			r = R(_, e),
			c = Ie(_, e),
			l = B(e),
			p = F(),
			i = (a && c.value.includes(a)) || !1,
			u = r.disabled || n.disabled;
		return o.jsx(Ee, {
			scope: e,
			open: i,
			disabled: u,
			triggerId: p,
			children: o.jsx(ye, {
				"data-orientation": r.orientation,
				"data-state": de(i),
				...l,
				...s,
				ref: t,
				disabled: u,
				open: i,
				onOpenChange: (m) => {
					m ? c.onItemOpen(a) : c.onItemClose(a);
				},
			}),
		});
	});
re.displayName = _;
var ae = "AccordionHeader",
	se = f.forwardRef((n, t) => {
		const { __scopeAccordion: e, ...a } = n,
			s = R(C, e),
			r = H(ae, e);
		return o.jsx(A.h3, {
			"data-orientation": s.orientation,
			"data-state": de(r.open),
			"data-disabled": r.disabled ? "" : void 0,
			...a,
			ref: t,
		});
	});
se.displayName = ae;
var $ = "AccordionTrigger",
	ie = f.forwardRef((n, t) => {
		const { __scopeAccordion: e, ...a } = n,
			s = R(C, e),
			r = H($, e),
			c = ke($, e),
			l = B(e);
		return o.jsx(L.ItemSlot, {
			scope: e,
			children: o.jsx(je, {
				"aria-disabled": (r.open && !c.collapsible) || void 0,
				"data-orientation": s.orientation,
				id: r.triggerId,
				...l,
				...a,
				ref: t,
			}),
		});
	});
ie.displayName = $;
var ce = "AccordionContent",
	le = f.forwardRef((n, t) => {
		const { __scopeAccordion: e, ...a } = n,
			s = R(C, e),
			r = H(ce, e),
			c = B(e);
		return o.jsx(Ne, {
			role: "region",
			"aria-labelledby": r.triggerId,
			"data-orientation": s.orientation,
			...c,
			...a,
			ref: t,
			style: {
				"--radix-accordion-content-height": "var(--radix-collapsible-content-height)",
				"--radix-accordion-content-width": "var(--radix-collapsible-content-width)",
				...n.style,
			},
		});
	});
le.displayName = ce;
function de(n) {
	return n ? "open" : "closed";
}
var Oe = ee,
	$e = re,
	Te = se,
	Ve = ie,
	De = le; /**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Me = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]],
	ze = w("chevron-down", Me); /**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Le = [
		["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
		["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }],
	],
	Be = w("circle-check", Le); /**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const He = [
		["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
		["path", { d: "m15 9-6 6", key: "1uzhvr" }],
		["path", { d: "m9 9 6 6", key: "z0biqf" }],
	],
	Ke = w("circle-x", He); /**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ge = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]],
	qe = w("loader-circle", Ge); /**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Fe = [
		["path", { d: "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2", key: "143wyd" }],
		["path", { d: "M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6", key: "1itne7" }],
		["rect", { x: "6", y: "14", width: "12", height: "8", rx: "1", key: "1ue0tg" }],
	],
	Ue = w("printer", Fe);
function We({ ...n }) {
	return o.jsx(Oe, { "data-slot": "accordion", ...n });
}
function Xe({ className: n, ...t }) {
	return o.jsx($e, { "data-slot": "accordion-item", className: I("border-b last:border-b-0", n), ...t });
}
function Ye({ className: n, children: t, ...e }) {
	return o.jsx(Te, {
		className: "flex",
		children: o.jsxs(Ve, {
			"data-slot": "accordion-trigger",
			className: I(
				"focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
				n,
			),
			...e,
			children: [
				t,
				o.jsx(ze, {
					className:
						"text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200",
				}),
			],
		}),
	});
}
function Je({ className: n, children: t, ...e }) {
	return o.jsx(De, {
		"data-slot": "accordion-content",
		className:
			"data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm",
		...e,
		children: o.jsx("div", { className: I("pt-0 pb-4", n), children: t }),
	});
}
const Qe = {
		paid: { color: "text-green-600", text: "ชำระแล้ว" },
		pending: { color: "text-orange-500", text: "รอดำเนินการ" },
		unpaid: { color: "text-red-500", text: "ค้างชำระ" },
	},
	K = (n) => (typeof n == "boolean" ? `${n}` : n === 0 ? "0" : n),
	G = fe,
	Ze = (n, t) => (e) => {
		var a;
		if (t?.variants == null) return G(n, e?.class, e?.className);
		const { variants: s, defaultVariants: r } = t,
			c = Object.keys(s).map((i) => {
				const u = e?.[i],
					m = r?.[i];
				if (u === null) return null;
				const v = K(u) || K(m);
				return s[i][v];
			}),
			l =
				e &&
				Object.entries(e).reduce((i, u) => {
					const [m, v] = u;
					return v === void 0 || (i[m] = v), i;
				}, {}),
			p =
				t == null || (a = t.compoundVariants) === null || a === void 0
					? void 0
					: a.reduce((i, u) => {
							const { class: m, className: v, ...b } = u;
							return Object.entries(b).every((j) => {
								const [g, h] = j;
								return Array.isArray(h) ? h.includes({ ...r, ...l }[g]) : { ...r, ...l }[g] === h;
							})
								? [...i, m, v]
								: i;
						}, []);
		return G(n, c, p, e?.class, e?.className);
	},
	et = Ze(
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
			defaultVariants: { variant: "default", size: "default" },
		},
	);
function tt({ className: n, variant: t, size: e, asChild: a = !1, ...s }) {
	const r = a ? he : "button";
	return o.jsx(r, { "data-slot": "button", className: I(et({ variant: t, size: e, className: n })), ...s });
}
class nt extends x.Component {
	constructor(t) {
		super(t),
			(this.state = {
				items: [
					{ name: "ค่าเช่าห้อง", amount: 1e4 },
					{ name: "ค่าน้ำ", amount: 1e4 },
					{ name: "ค่าไฟฟ้า", amount: 1e4 },
					{ name: "ค่าปรับ", amount: 1e4 },
					{ name: "ค่าประกัน", amount: 1e4 },
				],
				total: 5e4,
			});
	}
	renderBillItem(t, e) {
		return o.jsxs(
			"li",
			{
				className: "flex justify-between items-center py-2 border-b border-gray-100",
				children: [
					o.jsx("span", { className: "text-gray-600", children: t.name }),
					o.jsxs("span", { className: "text-gray-800 font-medium", children: [t.amount.toLocaleString(), " ฿"] }),
				],
			},
			e,
		);
	}
	render() {
		return o.jsxs("div", {
			className: "bg-white rounded-lg shadow-sm px-6 pb-6 max-w-2xl mx-auto",
			children: [
				o.jsxs("div", {
					className: "mb-6",
					children: [
						o.jsx("h3", { className: "text-lg font-semibold text-gray-700 mb-3", children: "รายการ" }),
						o.jsx("ul", {
							className: "space-y-2",
							children: this.state.items.map((t, e) => this.renderBillItem(t, e)),
						}),
					],
				}),
				o.jsx("div", {
					className: "pt-4 border-t border-gray-200 mb-6",
					children: o.jsxs("div", {
						className: "flex justify-between items-center",
						children: [
							o.jsx("span", { className: "text-lg font-semibold text-gray-700", children: "รวม" }),
							o.jsxs("span", {
								className: "text-xl font-bold text-blue-600",
								children: [this.state.total.toLocaleString(), " ฿"],
							}),
						],
					}),
				}),
				o.jsx("div", {
					className: "flex justify-end",
					children: o.jsxs(tt, { className: "hover:cursor-pointer", children: [o.jsx(Ue, {}), "พิมพ์"] }),
				}),
			],
		});
	}
}
class lt extends x.Component {
	renderBillItem(t) {
		const { color: e, text: a } = Qe[t.status];
		return o.jsxs(
			Xe,
			{
				value: `${t.month}-${t.year}`,
				children: [
					o.jsx(Ye, {
						className: "hover:no-underline",
						children: o.jsxs("div", {
							className: "flex w-full justify-between items-center -mr-2",
							children: [
								o.jsxs("span", { children: ["บิลค่าเช่าเดือน ", t.month, " / ", t.year] }),
								o.jsxs("span", {
									className: `flex items-center space-x-1 ${e}`,
									children: [
										this.renderStatusIcon(t.status),
										o.jsx("span", { className: "text-sm font-medium", children: a }),
									],
								}),
							],
						}),
					}),
					o.jsx(Je, { children: o.jsx(nt, {}) }),
				],
			},
			`${t.month}-${t.year}`,
		);
	}
	renderStatusIcon(t) {
		switch (t) {
			case "paid":
				return o.jsx(Be, { className: "icon" });
			case "pending":
				return o.jsx(qe, { className: "icon" });
			case "unpaid":
				return o.jsx(Ke, { className: "icon" });
			default:
				return null;
		}
	}
	render() {
		return o.jsx(We, {
			type: "single",
			collapsible: !0,
			className: "w-full",
			children: this.props.bills.map((t) => this.renderBillItem(t)),
		});
	}
}
export { lt as BillAccorder };
