import { R as V, a as Ve, r as f } from "./index.CDlOlYQx.js";
import { r as $e } from "./index.CclUD5iE.js";
import { j as U } from "./jsx-runtime.D_zvdyIk.js";
function Ut(e, t, { checkForDefaultPrevented: r = !0 } = {}) {
	return (n) => {
		if ((e?.(n), r === !1 || !n.defaultPrevented)) return t?.(n);
	};
}
function Ue(e, t = []) {
	let r = [];
	function o(s, a) {
		const d = f.createContext(a),
			c = r.length;
		r = [...r, a];
		const m = (h) => {
			const { scope: S, children: k, ...y } = h,
				x = S?.[e]?.[c] || d,
				w = f.useMemo(() => y, Object.values(y));
			return U.jsx(x.Provider, { value: w, children: k });
		};
		m.displayName = s + "Provider";
		function b(h, S) {
			const k = S?.[e]?.[c] || d,
				y = f.useContext(k);
			if (y) return y;
			if (a !== void 0) return a;
			throw new Error(`\`${h}\` must be used within \`${s}\``);
		}
		return [m, b];
	}
	const n = () => {
		const s = r.map((a) => f.createContext(a));
		return (d) => {
			const c = d?.[e] || s;
			return f.useMemo(() => ({ [`__scope${e}`]: { ...d, [e]: c } }), [d, c]);
		};
	};
	return (n.scopeName = e), [o, We(n, ...t)];
}
function We(...e) {
	const t = e[0];
	if (e.length === 1) return t;
	const r = () => {
		const o = e.map((n) => ({ useScope: n(), scopeName: n.scopeName }));
		return (s) => {
			const a = o.reduce((d, { useScope: c, scopeName: m }) => {
				const h = c(s)[`__scope${m}`];
				return { ...d, ...h };
			}, {});
			return f.useMemo(() => ({ [`__scope${t.scopeName}`]: a }), [a]);
		};
	};
	return (r.scopeName = t.scopeName), r;
}
function ke(e, t) {
	if (typeof e == "function") return e(t);
	e != null && (e.current = t);
}
function Me(...e) {
	return (t) => {
		let r = !1;
		const o = e.map((n) => {
			const s = ke(n, t);
			return !r && typeof s == "function" && (r = !0), s;
		});
		if (r)
			return () => {
				for (let n = 0; n < o.length; n++) {
					const s = o[n];
					typeof s == "function" ? s() : ke(e[n], null);
				}
			};
	};
}
function ie(...e) {
	return f.useCallback(Me(...e), e);
}
function te(e) {
	const t = Fe(e),
		r = f.forwardRef((o, n) => {
			const { children: s, ...a } = o,
				d = f.Children.toArray(s),
				c = d.find(Be);
			if (c) {
				const m = c.props.children,
					b = d.map((h) =>
						h === c
							? f.Children.count(m) > 1
								? f.Children.only(null)
								: f.isValidElement(m)
									? m.props.children
									: null
							: h,
					);
				return U.jsx(t, { ...a, ref: n, children: f.isValidElement(m) ? f.cloneElement(m, void 0, b) : null });
			}
			return U.jsx(t, { ...a, ref: n, children: s });
		});
	return (r.displayName = `${e}.Slot`), r;
}
var Wt = te("Slot");
function Fe(e) {
	const t = f.forwardRef((r, o) => {
		const { children: n, ...s } = r;
		if (f.isValidElement(n)) {
			const a = qe(n),
				d = He(s, n.props);
			return n.type !== f.Fragment && (d.ref = o ? Me(o, a) : a), f.cloneElement(n, d);
		}
		return f.Children.count(n) > 1 ? f.Children.only(null) : null;
	});
	return (t.displayName = `${e}.SlotClone`), t;
}
var De = Symbol("radix.slottable");
function Be(e) {
	return f.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === De;
}
function He(e, t) {
	const r = { ...t };
	for (const o in t) {
		const n = e[o],
			s = t[o];
		/^on[A-Z]/.test(o)
			? n && s
				? (r[o] = (...d) => {
						s(...d), n(...d);
					})
				: n && (r[o] = n)
			: o === "style"
				? (r[o] = { ...n, ...s })
				: o === "className" && (r[o] = [n, s].filter(Boolean).join(" "));
	}
	return { ...e, ...r };
}
function qe(e) {
	let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get,
		r = t && "isReactWarning" in t && t.isReactWarning;
	return r
		? e.ref
		: ((t = Object.getOwnPropertyDescriptor(e, "ref")?.get),
			(r = t && "isReactWarning" in t && t.isReactWarning),
			r ? e.props.ref : e.props.ref || e.ref);
}
function Ft(e) {
	const t = e + "CollectionProvider",
		[r, o] = Ue(t),
		[n, s] = r(t, { collectionRef: { current: null }, itemMap: new Map() }),
		a = (x) => {
			const { scope: w, children: M } = x,
				I = V.useRef(null),
				A = V.useRef(new Map()).current;
			return U.jsx(n, { scope: w, itemMap: A, collectionRef: I, children: M });
		};
	a.displayName = t;
	const d = e + "CollectionSlot",
		c = te(d),
		m = V.forwardRef((x, w) => {
			const { scope: M, children: I } = x,
				A = s(d, M),
				P = ie(w, A.collectionRef);
			return U.jsx(c, { ref: P, children: I });
		});
	m.displayName = d;
	const b = e + "CollectionItemSlot",
		h = "data-radix-collection-item",
		S = te(b),
		k = V.forwardRef((x, w) => {
			const { scope: M, children: I, ...A } = x,
				P = V.useRef(null),
				z = ie(w, P),
				E = s(b, M);
			return (
				V.useEffect(() => (E.itemMap.set(P, { ref: P, ...A }), () => void E.itemMap.delete(P))),
				U.jsx(S, { [h]: "", ref: z, children: I })
			);
		});
	k.displayName = b;
	function y(x) {
		const w = s(e + "CollectionConsumer", x);
		return V.useCallback(() => {
			const I = w.collectionRef.current;
			if (!I) return [];
			const A = Array.from(I.querySelectorAll(`[${h}]`));
			return Array.from(w.itemMap.values()).sort((E, j) => A.indexOf(E.ref.current) - A.indexOf(j.ref.current));
		}, [w.collectionRef, w.itemMap]);
	}
	return [{ Provider: a, Slot: m, ItemSlot: k }, y, o];
}
var le = globalThis?.document ? f.useLayoutEffect : () => {},
	Je = Ve[" useId ".trim().toString()] || (() => {}),
	Xe = 0;
function Dt(e) {
	const [t, r] = f.useState(Je());
	return (
		le(() => {
			r((o) => o ?? String(Xe++));
		}, [e]),
		e || (t ? `radix-${t}` : "")
	);
}
$e();
var Ze = [
		"a",
		"button",
		"div",
		"form",
		"h2",
		"h3",
		"img",
		"input",
		"label",
		"li",
		"nav",
		"ol",
		"p",
		"span",
		"svg",
		"ul",
	],
	Bt = Ze.reduce((e, t) => {
		const r = te(`Primitive.${t}`),
			o = f.forwardRef((n, s) => {
				const { asChild: a, ...d } = n,
					c = a ? r : t;
				return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), U.jsx(c, { ...d, ref: s });
			});
		return (o.displayName = `Primitive.${t}`), { ...e, [t]: o };
	}, {});
function Ae(e) {
	const t = f.useRef(e);
	return (
		f.useEffect(() => {
			t.current = e;
		}),
		f.useMemo(
			() =>
				(...r) =>
					t.current?.(...r),
			[],
		)
	);
}
function Ht({ prop: e, defaultProp: t, onChange: r = () => {} }) {
	const [o, n] = Ke({ defaultProp: t, onChange: r }),
		s = e !== void 0,
		a = s ? e : o,
		d = Ae(r),
		c = f.useCallback(
			(m) => {
				if (s) {
					const h = typeof m == "function" ? m(e) : m;
					h !== e && d(h);
				} else n(m);
			},
			[s, e, n, d],
		);
	return [a, c];
}
function Ke({ defaultProp: e, onChange: t }) {
	const r = f.useState(e),
		[o] = r,
		n = f.useRef(o),
		s = Ae(t);
	return (
		f.useEffect(() => {
			n.current !== o && (s(o), (n.current = o));
		}, [o, n, s]),
		r
	);
}
var Qe = f.createContext(void 0);
function qt(e) {
	const t = f.useContext(Qe);
	return e || t || "ltr";
}
function Ye(e, t) {
	return f.useReducer((r, o) => t[r][o] ?? r, e);
}
var et = (e) => {
	const { present: t, children: r } = e,
		o = tt(t),
		n = typeof r == "function" ? r({ present: o.isPresent }) : f.Children.only(r),
		s = ie(o.ref, ot(n));
	return typeof r == "function" || o.isPresent ? f.cloneElement(n, { ref: s }) : null;
};
et.displayName = "Presence";
function tt(e) {
	const [t, r] = f.useState(),
		o = f.useRef({}),
		n = f.useRef(e),
		s = f.useRef("none"),
		a = e ? "mounted" : "unmounted",
		[d, c] = Ye(a, {
			mounted: { UNMOUNT: "unmounted", ANIMATION_OUT: "unmountSuspended" },
			unmountSuspended: { MOUNT: "mounted", ANIMATION_END: "unmounted" },
			unmounted: { MOUNT: "mounted" },
		});
	return (
		f.useEffect(() => {
			const m = Q(o.current);
			s.current = d === "mounted" ? m : "none";
		}, [d]),
		le(() => {
			const m = o.current,
				b = n.current;
			if (b !== e) {
				const S = s.current,
					k = Q(m);
				e
					? c("MOUNT")
					: k === "none" || m?.display === "none"
						? c("UNMOUNT")
						: c(b && S !== k ? "ANIMATION_OUT" : "UNMOUNT"),
					(n.current = e);
			}
		}, [e, c]),
		le(() => {
			if (t) {
				let m;
				const b = t.ownerDocument.defaultView ?? window,
					h = (k) => {
						const x = Q(o.current).includes(k.animationName);
						if (k.target === t && x && (c("ANIMATION_END"), !n.current)) {
							const w = t.style.animationFillMode;
							(t.style.animationFillMode = "forwards"),
								(m = b.setTimeout(() => {
									t.style.animationFillMode === "forwards" && (t.style.animationFillMode = w);
								}));
						}
					},
					S = (k) => {
						k.target === t && (s.current = Q(o.current));
					};
				return (
					t.addEventListener("animationstart", S),
					t.addEventListener("animationcancel", h),
					t.addEventListener("animationend", h),
					() => {
						b.clearTimeout(m),
							t.removeEventListener("animationstart", S),
							t.removeEventListener("animationcancel", h),
							t.removeEventListener("animationend", h);
					}
				);
			} else c("ANIMATION_END");
		}, [t, c]),
		{
			isPresent: ["mounted", "unmountSuspended"].includes(d),
			ref: f.useCallback((m) => {
				m && (o.current = getComputedStyle(m)), r(m);
			}, []),
		}
	);
}
function Q(e) {
	return e?.animationName || "none";
}
function ot(e) {
	let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get,
		r = t && "isReactWarning" in t && t.isReactWarning;
	return r
		? e.ref
		: ((t = Object.getOwnPropertyDescriptor(e, "ref")?.get),
			(r = t && "isReactWarning" in t && t.isReactWarning),
			r ? e.props.ref : e.props.ref || e.ref);
}
function Pe(e) {
	var t,
		r,
		o = "";
	if (typeof e == "string" || typeof e == "number") o += e;
	else if (typeof e == "object")
		if (Array.isArray(e)) {
			var n = e.length;
			for (t = 0; t < n; t++) e[t] && (r = Pe(e[t])) && (o && (o += " "), (o += r));
		} else for (r in e) e[r] && (o && (o += " "), (o += r));
	return o;
}
function rt() {
	for (var e, t, r = 0, o = "", n = arguments.length; r < n; r++)
		(e = arguments[r]) && (t = Pe(e)) && (o && (o += " "), (o += t));
	return o;
}
const me = "-",
	nt = (e) => {
		const t = at(e),
			{ conflictingClassGroups: r, conflictingClassGroupModifiers: o } = e;
		return {
			getClassGroupId: (a) => {
				const d = a.split(me);
				return d[0] === "" && d.length !== 1 && d.shift(), Ie(d, t) || st(a);
			},
			getConflictingClassGroupIds: (a, d) => {
				const c = r[a] || [];
				return d && o[a] ? [...c, ...o[a]] : c;
			},
		};
	},
	Ie = (e, t) => {
		if (e.length === 0) return t.classGroupId;
		const r = e[0],
			o = t.nextPart.get(r),
			n = o ? Ie(e.slice(1), o) : void 0;
		if (n) return n;
		if (t.validators.length === 0) return;
		const s = e.join(me);
		return t.validators.find(({ validator: a }) => a(s))?.classGroupId;
	},
	ve = /^\[(.+)\]$/,
	st = (e) => {
		if (ve.test(e)) {
			const t = ve.exec(e)[1],
				r = t?.substring(0, t.indexOf(":"));
			if (r) return "arbitrary.." + r;
		}
	},
	at = (e) => {
		const { theme: t, classGroups: r } = e,
			o = { nextPart: new Map(), validators: [] };
		for (const n in r) ce(r[n], o, n, t);
		return o;
	},
	ce = (e, t, r, o) => {
		e.forEach((n) => {
			if (typeof n == "string") {
				const s = n === "" ? t : Ce(t, n);
				s.classGroupId = r;
				return;
			}
			if (typeof n == "function") {
				if (it(n)) {
					ce(n(o), t, r, o);
					return;
				}
				t.validators.push({ validator: n, classGroupId: r });
				return;
			}
			Object.entries(n).forEach(([s, a]) => {
				ce(a, Ce(t, s), r, o);
			});
		});
	},
	Ce = (e, t) => {
		let r = e;
		return (
			t.split(me).forEach((o) => {
				r.nextPart.has(o) || r.nextPart.set(o, { nextPart: new Map(), validators: [] }), (r = r.nextPart.get(o));
			}),
			r
		);
	},
	it = (e) => e.isThemeGetter,
	lt = (e) => {
		if (e < 1) return { get: () => {}, set: () => {} };
		let t = 0,
			r = new Map(),
			o = new Map();
		const n = (s, a) => {
			r.set(s, a), t++, t > e && ((t = 0), (o = r), (r = new Map()));
		};
		return {
			get(s) {
				let a = r.get(s);
				if (a !== void 0) return a;
				if ((a = o.get(s)) !== void 0) return n(s, a), a;
			},
			set(s, a) {
				r.has(s) ? r.set(s, a) : n(s, a);
			},
		};
	},
	de = "!",
	ue = ":",
	ct = ue.length,
	dt = (e) => {
		const { prefix: t, experimentalParseClassName: r } = e;
		let o = (n) => {
			const s = [];
			let a = 0,
				d = 0,
				c = 0,
				m;
			for (let y = 0; y < n.length; y++) {
				const x = n[y];
				if (a === 0 && d === 0) {
					if (x === ue) {
						s.push(n.slice(c, y)), (c = y + ct);
						continue;
					}
					if (x === "/") {
						m = y;
						continue;
					}
				}
				x === "[" ? a++ : x === "]" ? a-- : x === "(" ? d++ : x === ")" && d--;
			}
			const b = s.length === 0 ? n : n.substring(c),
				h = ut(b),
				S = h !== b,
				k = m && m > c ? m - c : void 0;
			return { modifiers: s, hasImportantModifier: S, baseClassName: h, maybePostfixModifierPosition: k };
		};
		if (t) {
			const n = t + ue,
				s = o;
			o = (a) =>
				a.startsWith(n)
					? s(a.substring(n.length))
					: {
							isExternal: !0,
							modifiers: [],
							hasImportantModifier: !1,
							baseClassName: a,
							maybePostfixModifierPosition: void 0,
						};
		}
		if (r) {
			const n = o;
			o = (s) => r({ className: s, parseClassName: n });
		}
		return o;
	},
	ut = (e) => (e.endsWith(de) ? e.substring(0, e.length - 1) : e.startsWith(de) ? e.substring(1) : e),
	mt = (e) => {
		const t = Object.fromEntries(e.orderSensitiveModifiers.map((o) => [o, !0]));
		return (o) => {
			if (o.length <= 1) return o;
			const n = [];
			let s = [];
			return (
				o.forEach((a) => {
					a[0] === "[" || t[a] ? (n.push(...s.sort(), a), (s = [])) : s.push(a);
				}),
				n.push(...s.sort()),
				n
			);
		};
	},
	pt = (e) => ({ cache: lt(e.cacheSize), parseClassName: dt(e), sortModifiers: mt(e), ...nt(e) }),
	ft = /\s+/,
	gt = (e, t) => {
		const { parseClassName: r, getClassGroupId: o, getConflictingClassGroupIds: n, sortModifiers: s } = t,
			a = [],
			d = e.trim().split(ft);
		let c = "";
		for (let m = d.length - 1; m >= 0; m -= 1) {
			const b = d[m],
				{
					isExternal: h,
					modifiers: S,
					hasImportantModifier: k,
					baseClassName: y,
					maybePostfixModifierPosition: x,
				} = r(b);
			if (h) {
				c = b + (c.length > 0 ? " " + c : c);
				continue;
			}
			let w = !!x,
				M = o(w ? y.substring(0, x) : y);
			if (!M) {
				if (!w) {
					c = b + (c.length > 0 ? " " + c : c);
					continue;
				}
				if (((M = o(y)), !M)) {
					c = b + (c.length > 0 ? " " + c : c);
					continue;
				}
				w = !1;
			}
			const I = s(S).join(":"),
				A = k ? I + de : I,
				P = A + M;
			if (a.includes(P)) continue;
			a.push(P);
			const z = n(M, w);
			for (let E = 0; E < z.length; ++E) {
				const j = z[E];
				a.push(A + j);
			}
			c = b + (c.length > 0 ? " " + c : c);
		}
		return c;
	};
function bt() {
	let e = 0,
		t,
		r,
		o = "";
	while (e < arguments.length) (t = arguments[e++]) && (r = Ne(t)) && (o && (o += " "), (o += r));
	return o;
}
const Ne = (e) => {
	if (typeof e == "string") return e;
	let t,
		r = "";
	for (let o = 0; o < e.length; o++) e[o] && (t = Ne(e[o])) && (r && (r += " "), (r += t));
	return r;
};
function ht(e, ...t) {
	let r,
		o,
		n,
		s = a;
	function a(c) {
		const m = t.reduce((b, h) => h(b), e());
		return (r = pt(m)), (o = r.cache.get), (n = r.cache.set), (s = d), d(c);
	}
	function d(c) {
		const m = o(c);
		if (m) return m;
		const b = gt(c, r);
		return n(c, b), b;
	}
	return () => s(bt.apply(null, arguments));
}
const v = (e) => {
		const t = (r) => r[e] || [];
		return (t.isThemeGetter = !0), t;
	},
	Ee = /^\[(?:(\w[\w-]*):)?(.+)\]$/i,
	ze = /^\((?:(\w[\w-]*):)?(.+)\)$/i,
	xt = /^\d+\/\d+$/,
	yt = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
	wt =
		/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
	kt = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/,
	vt = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
	Ct = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,
	F = (e) => xt.test(e),
	g = (e) => !!e && !Number.isNaN(Number(e)),
	L = (e) => !!e && Number.isInteger(Number(e)),
	se = (e) => e.endsWith("%") && g(e.slice(0, -1)),
	_ = (e) => yt.test(e),
	St = () => !0,
	Rt = (e) => wt.test(e) && !kt.test(e),
	Te = () => !1,
	Mt = (e) => vt.test(e),
	At = (e) => Ct.test(e),
	Pt = (e) => !i(e) && !l(e),
	It = (e) => D(e, Le, Te),
	i = (e) => Ee.test(e),
	$ = (e) => D(e, je, Rt),
	ae = (e) => D(e, Ot, g),
	Se = (e) => D(e, Oe, Te),
	Nt = (e) => D(e, _e, At),
	Y = (e) => D(e, Ge, Mt),
	l = (e) => ze.test(e),
	H = (e) => B(e, je),
	Et = (e) => B(e, _t),
	Re = (e) => B(e, Oe),
	zt = (e) => B(e, Le),
	Tt = (e) => B(e, _e),
	ee = (e) => B(e, Ge, !0),
	D = (e, t, r) => {
		const o = Ee.exec(e);
		return o ? (o[1] ? t(o[1]) : r(o[2])) : !1;
	},
	B = (e, t, r = !1) => {
		const o = ze.exec(e);
		return o ? (o[1] ? t(o[1]) : r) : !1;
	},
	Oe = (e) => e === "position" || e === "percentage",
	_e = (e) => e === "image" || e === "url",
	Le = (e) => e === "length" || e === "size" || e === "bg-size",
	je = (e) => e === "length",
	Ot = (e) => e === "number",
	_t = (e) => e === "family-name",
	Ge = (e) => e === "shadow",
	Lt = () => {
		const e = v("color"),
			t = v("font"),
			r = v("text"),
			o = v("font-weight"),
			n = v("tracking"),
			s = v("leading"),
			a = v("breakpoint"),
			d = v("container"),
			c = v("spacing"),
			m = v("radius"),
			b = v("shadow"),
			h = v("inset-shadow"),
			S = v("text-shadow"),
			k = v("drop-shadow"),
			y = v("blur"),
			x = v("perspective"),
			w = v("aspect"),
			M = v("ease"),
			I = v("animate"),
			A = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"],
			P = () => [
				"center",
				"top",
				"bottom",
				"left",
				"right",
				"top-left",
				"left-top",
				"top-right",
				"right-top",
				"bottom-right",
				"right-bottom",
				"bottom-left",
				"left-bottom",
			],
			z = () => [...P(), l, i],
			E = () => ["auto", "hidden", "clip", "visible", "scroll"],
			j = () => ["auto", "contain", "none"],
			p = () => [l, i, c],
			T = () => [F, "full", "auto", ...p()],
			pe = () => [L, "none", "subgrid", l, i],
			fe = () => ["auto", { span: ["full", L, l, i] }, L, l, i],
			q = () => [L, "auto", l, i],
			ge = () => ["auto", "min", "max", "fr", l, i],
			oe = () => [
				"start",
				"end",
				"center",
				"between",
				"around",
				"evenly",
				"stretch",
				"baseline",
				"center-safe",
				"end-safe",
			],
			W = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"],
			O = () => ["auto", ...p()],
			G = () => [F, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...p()],
			u = () => [e, l, i],
			be = () => [...P(), Re, Se, { position: [l, i] }],
			he = () => ["no-repeat", { repeat: ["", "x", "y", "space", "round"] }],
			xe = () => ["auto", "cover", "contain", zt, It, { size: [l, i] }],
			re = () => [se, H, $],
			R = () => ["", "none", "full", m, l, i],
			N = () => ["", g, H, $],
			J = () => ["solid", "dashed", "dotted", "double"],
			ye = () => [
				"normal",
				"multiply",
				"screen",
				"overlay",
				"darken",
				"lighten",
				"color-dodge",
				"color-burn",
				"hard-light",
				"soft-light",
				"difference",
				"exclusion",
				"hue",
				"saturation",
				"color",
				"luminosity",
			],
			C = () => [g, se, Re, Se],
			we = () => ["", "none", y, l, i],
			X = () => ["none", g, l, i],
			Z = () => ["none", g, l, i],
			ne = () => [g, l, i],
			K = () => [F, "full", ...p()];
		return {
			cacheSize: 500,
			theme: {
				animate: ["spin", "ping", "pulse", "bounce"],
				aspect: ["video"],
				blur: [_],
				breakpoint: [_],
				color: [St],
				container: [_],
				"drop-shadow": [_],
				ease: ["in", "out", "in-out"],
				font: [Pt],
				"font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
				"inset-shadow": [_],
				leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
				perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
				radius: [_],
				shadow: [_],
				spacing: ["px", g],
				text: [_],
				"text-shadow": [_],
				tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"],
			},
			classGroups: {
				aspect: [{ aspect: ["auto", "square", F, i, l, w] }],
				container: ["container"],
				columns: [{ columns: [g, i, l, d] }],
				"break-after": [{ "break-after": A() }],
				"break-before": [{ "break-before": A() }],
				"break-inside": [{ "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"] }],
				"box-decoration": [{ "box-decoration": ["slice", "clone"] }],
				box: [{ box: ["border", "content"] }],
				display: [
					"block",
					"inline-block",
					"inline",
					"flex",
					"inline-flex",
					"table",
					"inline-table",
					"table-caption",
					"table-cell",
					"table-column",
					"table-column-group",
					"table-footer-group",
					"table-header-group",
					"table-row-group",
					"table-row",
					"flow-root",
					"grid",
					"inline-grid",
					"contents",
					"list-item",
					"hidden",
				],
				sr: ["sr-only", "not-sr-only"],
				float: [{ float: ["right", "left", "none", "start", "end"] }],
				clear: [{ clear: ["left", "right", "both", "none", "start", "end"] }],
				isolation: ["isolate", "isolation-auto"],
				"object-fit": [{ object: ["contain", "cover", "fill", "none", "scale-down"] }],
				"object-position": [{ object: z() }],
				overflow: [{ overflow: E() }],
				"overflow-x": [{ "overflow-x": E() }],
				"overflow-y": [{ "overflow-y": E() }],
				overscroll: [{ overscroll: j() }],
				"overscroll-x": [{ "overscroll-x": j() }],
				"overscroll-y": [{ "overscroll-y": j() }],
				position: ["static", "fixed", "absolute", "relative", "sticky"],
				inset: [{ inset: T() }],
				"inset-x": [{ "inset-x": T() }],
				"inset-y": [{ "inset-y": T() }],
				start: [{ start: T() }],
				end: [{ end: T() }],
				top: [{ top: T() }],
				right: [{ right: T() }],
				bottom: [{ bottom: T() }],
				left: [{ left: T() }],
				visibility: ["visible", "invisible", "collapse"],
				z: [{ z: [L, "auto", l, i] }],
				basis: [{ basis: [F, "full", "auto", d, ...p()] }],
				"flex-direction": [{ flex: ["row", "row-reverse", "col", "col-reverse"] }],
				"flex-wrap": [{ flex: ["nowrap", "wrap", "wrap-reverse"] }],
				flex: [{ flex: [g, F, "auto", "initial", "none", i] }],
				grow: [{ grow: ["", g, l, i] }],
				shrink: [{ shrink: ["", g, l, i] }],
				order: [{ order: [L, "first", "last", "none", l, i] }],
				"grid-cols": [{ "grid-cols": pe() }],
				"col-start-end": [{ col: fe() }],
				"col-start": [{ "col-start": q() }],
				"col-end": [{ "col-end": q() }],
				"grid-rows": [{ "grid-rows": pe() }],
				"row-start-end": [{ row: fe() }],
				"row-start": [{ "row-start": q() }],
				"row-end": [{ "row-end": q() }],
				"grid-flow": [{ "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"] }],
				"auto-cols": [{ "auto-cols": ge() }],
				"auto-rows": [{ "auto-rows": ge() }],
				gap: [{ gap: p() }],
				"gap-x": [{ "gap-x": p() }],
				"gap-y": [{ "gap-y": p() }],
				"justify-content": [{ justify: [...oe(), "normal"] }],
				"justify-items": [{ "justify-items": [...W(), "normal"] }],
				"justify-self": [{ "justify-self": ["auto", ...W()] }],
				"align-content": [{ content: ["normal", ...oe()] }],
				"align-items": [{ items: [...W(), { baseline: ["", "last"] }] }],
				"align-self": [{ self: ["auto", ...W(), { baseline: ["", "last"] }] }],
				"place-content": [{ "place-content": oe() }],
				"place-items": [{ "place-items": [...W(), "baseline"] }],
				"place-self": [{ "place-self": ["auto", ...W()] }],
				p: [{ p: p() }],
				px: [{ px: p() }],
				py: [{ py: p() }],
				ps: [{ ps: p() }],
				pe: [{ pe: p() }],
				pt: [{ pt: p() }],
				pr: [{ pr: p() }],
				pb: [{ pb: p() }],
				pl: [{ pl: p() }],
				m: [{ m: O() }],
				mx: [{ mx: O() }],
				my: [{ my: O() }],
				ms: [{ ms: O() }],
				me: [{ me: O() }],
				mt: [{ mt: O() }],
				mr: [{ mr: O() }],
				mb: [{ mb: O() }],
				ml: [{ ml: O() }],
				"space-x": [{ "space-x": p() }],
				"space-x-reverse": ["space-x-reverse"],
				"space-y": [{ "space-y": p() }],
				"space-y-reverse": ["space-y-reverse"],
				size: [{ size: G() }],
				w: [{ w: [d, "screen", ...G()] }],
				"min-w": [{ "min-w": [d, "screen", "none", ...G()] }],
				"max-w": [{ "max-w": [d, "screen", "none", "prose", { screen: [a] }, ...G()] }],
				h: [{ h: ["screen", ...G()] }],
				"min-h": [{ "min-h": ["screen", "none", ...G()] }],
				"max-h": [{ "max-h": ["screen", ...G()] }],
				"font-size": [{ text: ["base", r, H, $] }],
				"font-smoothing": ["antialiased", "subpixel-antialiased"],
				"font-style": ["italic", "not-italic"],
				"font-weight": [{ font: [o, l, ae] }],
				"font-stretch": [
					{
						"font-stretch": [
							"ultra-condensed",
							"extra-condensed",
							"condensed",
							"semi-condensed",
							"normal",
							"semi-expanded",
							"expanded",
							"extra-expanded",
							"ultra-expanded",
							se,
							i,
						],
					},
				],
				"font-family": [{ font: [Et, i, t] }],
				"fvn-normal": ["normal-nums"],
				"fvn-ordinal": ["ordinal"],
				"fvn-slashed-zero": ["slashed-zero"],
				"fvn-figure": ["lining-nums", "oldstyle-nums"],
				"fvn-spacing": ["proportional-nums", "tabular-nums"],
				"fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
				tracking: [{ tracking: [n, l, i] }],
				"line-clamp": [{ "line-clamp": [g, "none", l, ae] }],
				leading: [{ leading: [s, ...p()] }],
				"list-image": [{ "list-image": ["none", l, i] }],
				"list-style-position": [{ list: ["inside", "outside"] }],
				"list-style-type": [{ list: ["disc", "decimal", "none", l, i] }],
				"text-alignment": [{ text: ["left", "center", "right", "justify", "start", "end"] }],
				"placeholder-color": [{ placeholder: u() }],
				"text-color": [{ text: u() }],
				"text-decoration": ["underline", "overline", "line-through", "no-underline"],
				"text-decoration-style": [{ decoration: [...J(), "wavy"] }],
				"text-decoration-thickness": [{ decoration: [g, "from-font", "auto", l, $] }],
				"text-decoration-color": [{ decoration: u() }],
				"underline-offset": [{ "underline-offset": [g, "auto", l, i] }],
				"text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
				"text-overflow": ["truncate", "text-ellipsis", "text-clip"],
				"text-wrap": [{ text: ["wrap", "nowrap", "balance", "pretty"] }],
				indent: [{ indent: p() }],
				"vertical-align": [
					{ align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", l, i] },
				],
				whitespace: [{ whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"] }],
				break: [{ break: ["normal", "words", "all", "keep"] }],
				wrap: [{ wrap: ["break-word", "anywhere", "normal"] }],
				hyphens: [{ hyphens: ["none", "manual", "auto"] }],
				content: [{ content: ["none", l, i] }],
				"bg-attachment": [{ bg: ["fixed", "local", "scroll"] }],
				"bg-clip": [{ "bg-clip": ["border", "padding", "content", "text"] }],
				"bg-origin": [{ "bg-origin": ["border", "padding", "content"] }],
				"bg-position": [{ bg: be() }],
				"bg-repeat": [{ bg: he() }],
				"bg-size": [{ bg: xe() }],
				"bg-image": [
					{
						bg: [
							"none",
							{
								linear: [{ to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"] }, L, l, i],
								radial: ["", l, i],
								conic: [L, l, i],
							},
							Tt,
							Nt,
						],
					},
				],
				"bg-color": [{ bg: u() }],
				"gradient-from-pos": [{ from: re() }],
				"gradient-via-pos": [{ via: re() }],
				"gradient-to-pos": [{ to: re() }],
				"gradient-from": [{ from: u() }],
				"gradient-via": [{ via: u() }],
				"gradient-to": [{ to: u() }],
				rounded: [{ rounded: R() }],
				"rounded-s": [{ "rounded-s": R() }],
				"rounded-e": [{ "rounded-e": R() }],
				"rounded-t": [{ "rounded-t": R() }],
				"rounded-r": [{ "rounded-r": R() }],
				"rounded-b": [{ "rounded-b": R() }],
				"rounded-l": [{ "rounded-l": R() }],
				"rounded-ss": [{ "rounded-ss": R() }],
				"rounded-se": [{ "rounded-se": R() }],
				"rounded-ee": [{ "rounded-ee": R() }],
				"rounded-es": [{ "rounded-es": R() }],
				"rounded-tl": [{ "rounded-tl": R() }],
				"rounded-tr": [{ "rounded-tr": R() }],
				"rounded-br": [{ "rounded-br": R() }],
				"rounded-bl": [{ "rounded-bl": R() }],
				"border-w": [{ border: N() }],
				"border-w-x": [{ "border-x": N() }],
				"border-w-y": [{ "border-y": N() }],
				"border-w-s": [{ "border-s": N() }],
				"border-w-e": [{ "border-e": N() }],
				"border-w-t": [{ "border-t": N() }],
				"border-w-r": [{ "border-r": N() }],
				"border-w-b": [{ "border-b": N() }],
				"border-w-l": [{ "border-l": N() }],
				"divide-x": [{ "divide-x": N() }],
				"divide-x-reverse": ["divide-x-reverse"],
				"divide-y": [{ "divide-y": N() }],
				"divide-y-reverse": ["divide-y-reverse"],
				"border-style": [{ border: [...J(), "hidden", "none"] }],
				"divide-style": [{ divide: [...J(), "hidden", "none"] }],
				"border-color": [{ border: u() }],
				"border-color-x": [{ "border-x": u() }],
				"border-color-y": [{ "border-y": u() }],
				"border-color-s": [{ "border-s": u() }],
				"border-color-e": [{ "border-e": u() }],
				"border-color-t": [{ "border-t": u() }],
				"border-color-r": [{ "border-r": u() }],
				"border-color-b": [{ "border-b": u() }],
				"border-color-l": [{ "border-l": u() }],
				"divide-color": [{ divide: u() }],
				"outline-style": [{ outline: [...J(), "none", "hidden"] }],
				"outline-offset": [{ "outline-offset": [g, l, i] }],
				"outline-w": [{ outline: ["", g, H, $] }],
				"outline-color": [{ outline: u() }],
				shadow: [{ shadow: ["", "none", b, ee, Y] }],
				"shadow-color": [{ shadow: u() }],
				"inset-shadow": [{ "inset-shadow": ["none", h, ee, Y] }],
				"inset-shadow-color": [{ "inset-shadow": u() }],
				"ring-w": [{ ring: N() }],
				"ring-w-inset": ["ring-inset"],
				"ring-color": [{ ring: u() }],
				"ring-offset-w": [{ "ring-offset": [g, $] }],
				"ring-offset-color": [{ "ring-offset": u() }],
				"inset-ring-w": [{ "inset-ring": N() }],
				"inset-ring-color": [{ "inset-ring": u() }],
				"text-shadow": [{ "text-shadow": ["none", S, ee, Y] }],
				"text-shadow-color": [{ "text-shadow": u() }],
				opacity: [{ opacity: [g, l, i] }],
				"mix-blend": [{ "mix-blend": [...ye(), "plus-darker", "plus-lighter"] }],
				"bg-blend": [{ "bg-blend": ye() }],
				"mask-clip": [{ "mask-clip": ["border", "padding", "content", "fill", "stroke", "view"] }, "mask-no-clip"],
				"mask-composite": [{ mask: ["add", "subtract", "intersect", "exclude"] }],
				"mask-image-linear-pos": [{ "mask-linear": [g] }],
				"mask-image-linear-from-pos": [{ "mask-linear-from": C() }],
				"mask-image-linear-to-pos": [{ "mask-linear-to": C() }],
				"mask-image-linear-from-color": [{ "mask-linear-from": u() }],
				"mask-image-linear-to-color": [{ "mask-linear-to": u() }],
				"mask-image-t-from-pos": [{ "mask-t-from": C() }],
				"mask-image-t-to-pos": [{ "mask-t-to": C() }],
				"mask-image-t-from-color": [{ "mask-t-from": u() }],
				"mask-image-t-to-color": [{ "mask-t-to": u() }],
				"mask-image-r-from-pos": [{ "mask-r-from": C() }],
				"mask-image-r-to-pos": [{ "mask-r-to": C() }],
				"mask-image-r-from-color": [{ "mask-r-from": u() }],
				"mask-image-r-to-color": [{ "mask-r-to": u() }],
				"mask-image-b-from-pos": [{ "mask-b-from": C() }],
				"mask-image-b-to-pos": [{ "mask-b-to": C() }],
				"mask-image-b-from-color": [{ "mask-b-from": u() }],
				"mask-image-b-to-color": [{ "mask-b-to": u() }],
				"mask-image-l-from-pos": [{ "mask-l-from": C() }],
				"mask-image-l-to-pos": [{ "mask-l-to": C() }],
				"mask-image-l-from-color": [{ "mask-l-from": u() }],
				"mask-image-l-to-color": [{ "mask-l-to": u() }],
				"mask-image-x-from-pos": [{ "mask-x-from": C() }],
				"mask-image-x-to-pos": [{ "mask-x-to": C() }],
				"mask-image-x-from-color": [{ "mask-x-from": u() }],
				"mask-image-x-to-color": [{ "mask-x-to": u() }],
				"mask-image-y-from-pos": [{ "mask-y-from": C() }],
				"mask-image-y-to-pos": [{ "mask-y-to": C() }],
				"mask-image-y-from-color": [{ "mask-y-from": u() }],
				"mask-image-y-to-color": [{ "mask-y-to": u() }],
				"mask-image-radial": [{ "mask-radial": [l, i] }],
				"mask-image-radial-from-pos": [{ "mask-radial-from": C() }],
				"mask-image-radial-to-pos": [{ "mask-radial-to": C() }],
				"mask-image-radial-from-color": [{ "mask-radial-from": u() }],
				"mask-image-radial-to-color": [{ "mask-radial-to": u() }],
				"mask-image-radial-shape": [{ "mask-radial": ["circle", "ellipse"] }],
				"mask-image-radial-size": [{ "mask-radial": [{ closest: ["side", "corner"], farthest: ["side", "corner"] }] }],
				"mask-image-radial-pos": [{ "mask-radial-at": P() }],
				"mask-image-conic-pos": [{ "mask-conic": [g] }],
				"mask-image-conic-from-pos": [{ "mask-conic-from": C() }],
				"mask-image-conic-to-pos": [{ "mask-conic-to": C() }],
				"mask-image-conic-from-color": [{ "mask-conic-from": u() }],
				"mask-image-conic-to-color": [{ "mask-conic-to": u() }],
				"mask-mode": [{ mask: ["alpha", "luminance", "match"] }],
				"mask-origin": [{ "mask-origin": ["border", "padding", "content", "fill", "stroke", "view"] }],
				"mask-position": [{ mask: be() }],
				"mask-repeat": [{ mask: he() }],
				"mask-size": [{ mask: xe() }],
				"mask-type": [{ "mask-type": ["alpha", "luminance"] }],
				"mask-image": [{ mask: ["none", l, i] }],
				filter: [{ filter: ["", "none", l, i] }],
				blur: [{ blur: we() }],
				brightness: [{ brightness: [g, l, i] }],
				contrast: [{ contrast: [g, l, i] }],
				"drop-shadow": [{ "drop-shadow": ["", "none", k, ee, Y] }],
				"drop-shadow-color": [{ "drop-shadow": u() }],
				grayscale: [{ grayscale: ["", g, l, i] }],
				"hue-rotate": [{ "hue-rotate": [g, l, i] }],
				invert: [{ invert: ["", g, l, i] }],
				saturate: [{ saturate: [g, l, i] }],
				sepia: [{ sepia: ["", g, l, i] }],
				"backdrop-filter": [{ "backdrop-filter": ["", "none", l, i] }],
				"backdrop-blur": [{ "backdrop-blur": we() }],
				"backdrop-brightness": [{ "backdrop-brightness": [g, l, i] }],
				"backdrop-contrast": [{ "backdrop-contrast": [g, l, i] }],
				"backdrop-grayscale": [{ "backdrop-grayscale": ["", g, l, i] }],
				"backdrop-hue-rotate": [{ "backdrop-hue-rotate": [g, l, i] }],
				"backdrop-invert": [{ "backdrop-invert": ["", g, l, i] }],
				"backdrop-opacity": [{ "backdrop-opacity": [g, l, i] }],
				"backdrop-saturate": [{ "backdrop-saturate": [g, l, i] }],
				"backdrop-sepia": [{ "backdrop-sepia": ["", g, l, i] }],
				"border-collapse": [{ border: ["collapse", "separate"] }],
				"border-spacing": [{ "border-spacing": p() }],
				"border-spacing-x": [{ "border-spacing-x": p() }],
				"border-spacing-y": [{ "border-spacing-y": p() }],
				"table-layout": [{ table: ["auto", "fixed"] }],
				caption: [{ caption: ["top", "bottom"] }],
				transition: [{ transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", l, i] }],
				"transition-behavior": [{ transition: ["normal", "discrete"] }],
				duration: [{ duration: [g, "initial", l, i] }],
				ease: [{ ease: ["linear", "initial", M, l, i] }],
				delay: [{ delay: [g, l, i] }],
				animate: [{ animate: ["none", I, l, i] }],
				backface: [{ backface: ["hidden", "visible"] }],
				perspective: [{ perspective: [x, l, i] }],
				"perspective-origin": [{ "perspective-origin": z() }],
				rotate: [{ rotate: X() }],
				"rotate-x": [{ "rotate-x": X() }],
				"rotate-y": [{ "rotate-y": X() }],
				"rotate-z": [{ "rotate-z": X() }],
				scale: [{ scale: Z() }],
				"scale-x": [{ "scale-x": Z() }],
				"scale-y": [{ "scale-y": Z() }],
				"scale-z": [{ "scale-z": Z() }],
				"scale-3d": ["scale-3d"],
				skew: [{ skew: ne() }],
				"skew-x": [{ "skew-x": ne() }],
				"skew-y": [{ "skew-y": ne() }],
				transform: [{ transform: [l, i, "", "none", "gpu", "cpu"] }],
				"transform-origin": [{ origin: z() }],
				"transform-style": [{ transform: ["3d", "flat"] }],
				translate: [{ translate: K() }],
				"translate-x": [{ "translate-x": K() }],
				"translate-y": [{ "translate-y": K() }],
				"translate-z": [{ "translate-z": K() }],
				"translate-none": ["translate-none"],
				accent: [{ accent: u() }],
				appearance: [{ appearance: ["none", "auto"] }],
				"caret-color": [{ caret: u() }],
				"color-scheme": [{ scheme: ["normal", "dark", "light", "light-dark", "only-dark", "only-light"] }],
				cursor: [
					{
						cursor: [
							"auto",
							"default",
							"pointer",
							"wait",
							"text",
							"move",
							"help",
							"not-allowed",
							"none",
							"context-menu",
							"progress",
							"cell",
							"crosshair",
							"vertical-text",
							"alias",
							"copy",
							"no-drop",
							"grab",
							"grabbing",
							"all-scroll",
							"col-resize",
							"row-resize",
							"n-resize",
							"e-resize",
							"s-resize",
							"w-resize",
							"ne-resize",
							"nw-resize",
							"se-resize",
							"sw-resize",
							"ew-resize",
							"ns-resize",
							"nesw-resize",
							"nwse-resize",
							"zoom-in",
							"zoom-out",
							l,
							i,
						],
					},
				],
				"field-sizing": [{ "field-sizing": ["fixed", "content"] }],
				"pointer-events": [{ "pointer-events": ["auto", "none"] }],
				resize: [{ resize: ["none", "", "y", "x"] }],
				"scroll-behavior": [{ scroll: ["auto", "smooth"] }],
				"scroll-m": [{ "scroll-m": p() }],
				"scroll-mx": [{ "scroll-mx": p() }],
				"scroll-my": [{ "scroll-my": p() }],
				"scroll-ms": [{ "scroll-ms": p() }],
				"scroll-me": [{ "scroll-me": p() }],
				"scroll-mt": [{ "scroll-mt": p() }],
				"scroll-mr": [{ "scroll-mr": p() }],
				"scroll-mb": [{ "scroll-mb": p() }],
				"scroll-ml": [{ "scroll-ml": p() }],
				"scroll-p": [{ "scroll-p": p() }],
				"scroll-px": [{ "scroll-px": p() }],
				"scroll-py": [{ "scroll-py": p() }],
				"scroll-ps": [{ "scroll-ps": p() }],
				"scroll-pe": [{ "scroll-pe": p() }],
				"scroll-pt": [{ "scroll-pt": p() }],
				"scroll-pr": [{ "scroll-pr": p() }],
				"scroll-pb": [{ "scroll-pb": p() }],
				"scroll-pl": [{ "scroll-pl": p() }],
				"snap-align": [{ snap: ["start", "end", "center", "align-none"] }],
				"snap-stop": [{ snap: ["normal", "always"] }],
				"snap-type": [{ snap: ["none", "x", "y", "both"] }],
				"snap-strictness": [{ snap: ["mandatory", "proximity"] }],
				touch: [{ touch: ["auto", "none", "manipulation"] }],
				"touch-x": [{ "touch-pan": ["x", "left", "right"] }],
				"touch-y": [{ "touch-pan": ["y", "up", "down"] }],
				"touch-pz": ["touch-pinch-zoom"],
				select: [{ select: ["none", "text", "all", "auto"] }],
				"will-change": [{ "will-change": ["auto", "scroll", "contents", "transform", l, i] }],
				fill: [{ fill: ["none", ...u()] }],
				"stroke-w": [{ stroke: [g, H, $, ae] }],
				stroke: [{ stroke: ["none", ...u()] }],
				"forced-color-adjust": [{ "forced-color-adjust": ["auto", "none"] }],
			},
			conflictingClassGroups: {
				overflow: ["overflow-x", "overflow-y"],
				overscroll: ["overscroll-x", "overscroll-y"],
				inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
				"inset-x": ["right", "left"],
				"inset-y": ["top", "bottom"],
				flex: ["basis", "grow", "shrink"],
				gap: ["gap-x", "gap-y"],
				p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
				px: ["pr", "pl"],
				py: ["pt", "pb"],
				m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
				mx: ["mr", "ml"],
				my: ["mt", "mb"],
				size: ["w", "h"],
				"font-size": ["leading"],
				"fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
				"fvn-ordinal": ["fvn-normal"],
				"fvn-slashed-zero": ["fvn-normal"],
				"fvn-figure": ["fvn-normal"],
				"fvn-spacing": ["fvn-normal"],
				"fvn-fraction": ["fvn-normal"],
				"line-clamp": ["display", "overflow"],
				rounded: [
					"rounded-s",
					"rounded-e",
					"rounded-t",
					"rounded-r",
					"rounded-b",
					"rounded-l",
					"rounded-ss",
					"rounded-se",
					"rounded-ee",
					"rounded-es",
					"rounded-tl",
					"rounded-tr",
					"rounded-br",
					"rounded-bl",
				],
				"rounded-s": ["rounded-ss", "rounded-es"],
				"rounded-e": ["rounded-se", "rounded-ee"],
				"rounded-t": ["rounded-tl", "rounded-tr"],
				"rounded-r": ["rounded-tr", "rounded-br"],
				"rounded-b": ["rounded-br", "rounded-bl"],
				"rounded-l": ["rounded-tl", "rounded-bl"],
				"border-spacing": ["border-spacing-x", "border-spacing-y"],
				"border-w": [
					"border-w-x",
					"border-w-y",
					"border-w-s",
					"border-w-e",
					"border-w-t",
					"border-w-r",
					"border-w-b",
					"border-w-l",
				],
				"border-w-x": ["border-w-r", "border-w-l"],
				"border-w-y": ["border-w-t", "border-w-b"],
				"border-color": [
					"border-color-x",
					"border-color-y",
					"border-color-s",
					"border-color-e",
					"border-color-t",
					"border-color-r",
					"border-color-b",
					"border-color-l",
				],
				"border-color-x": ["border-color-r", "border-color-l"],
				"border-color-y": ["border-color-t", "border-color-b"],
				translate: ["translate-x", "translate-y", "translate-none"],
				"translate-none": ["translate", "translate-x", "translate-y", "translate-z"],
				"scroll-m": [
					"scroll-mx",
					"scroll-my",
					"scroll-ms",
					"scroll-me",
					"scroll-mt",
					"scroll-mr",
					"scroll-mb",
					"scroll-ml",
				],
				"scroll-mx": ["scroll-mr", "scroll-ml"],
				"scroll-my": ["scroll-mt", "scroll-mb"],
				"scroll-p": [
					"scroll-px",
					"scroll-py",
					"scroll-ps",
					"scroll-pe",
					"scroll-pt",
					"scroll-pr",
					"scroll-pb",
					"scroll-pl",
				],
				"scroll-px": ["scroll-pr", "scroll-pl"],
				"scroll-py": ["scroll-pt", "scroll-pb"],
				touch: ["touch-x", "touch-y", "touch-pz"],
				"touch-x": ["touch"],
				"touch-y": ["touch"],
				"touch-pz": ["touch"],
			},
			conflictingClassGroupModifiers: { "font-size": ["leading"] },
			orderSensitiveModifiers: [
				"*",
				"**",
				"after",
				"backdrop",
				"before",
				"details-content",
				"file",
				"first-letter",
				"first-line",
				"marker",
				"placeholder",
				"selection",
			],
		};
	},
	jt = ht(Lt);
function Jt(...e) {
	return jt(rt(e));
}
export {
	Bt as P,
	Wt as S,
	Ft as a,
	Ut as b,
	Ue as c,
	ie as d,
	qt as e,
	Ht as f,
	Ae as g,
	et as h,
	Jt as i,
	rt as j,
	le as k,
	Dt as u,
};
