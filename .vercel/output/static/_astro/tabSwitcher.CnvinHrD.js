import { R as T, c as Yn, g as ce, r as k } from "./index.CDlOlYQx.js";
import { j as $ } from "./jsx-runtime.D_zvdyIk.js";
import {
	P as $r,
	d as Ew,
	h as Mw,
	a as Tw,
	i as Xe,
	b as ht,
	f as ib,
	j as ie,
	g as jw,
	e as nb,
	u as rb,
	c as tb,
} from "./utils.B-hw8VEN.js";
import "./index.CclUD5iE.js";
var La = "rovingFocusGroup.onEntryFocus",
	Cw = { bubbles: !1, cancelable: !0 },
	ia = "RovingFocusGroup",
	[Fs, ab, Iw] = Tw(ia),
	[$w, ob] = tb(ia, [Iw]),
	[Rw, Nw] = $w(ia),
	ub = k.forwardRef((e, t) =>
		$.jsx(Fs.Provider, {
			scope: e.__scopeRovingFocusGroup,
			children: $.jsx(Fs.Slot, { scope: e.__scopeRovingFocusGroup, children: $.jsx(kw, { ...e, ref: t }) }),
		}),
	);
ub.displayName = ia;
var kw = k.forwardRef((e, t) => {
		const {
				__scopeRovingFocusGroup: r,
				orientation: n,
				loop: i = !1,
				dir: a,
				currentTabStopId: o,
				defaultCurrentTabStopId: u,
				onCurrentTabStopIdChange: c,
				onEntryFocus: s,
				preventScrollOnEntryFocus: f = !1,
				...l
			} = e,
			h = k.useRef(null),
			p = Ew(t, h),
			y = nb(a),
			[v = null, d] = ib({ prop: o, defaultProp: u, onChange: c }),
			[b, w] = k.useState(!1),
			x = jw(s),
			O = ab(r),
			g = k.useRef(!1),
			[m, _] = k.useState(0);
		return (
			k.useEffect(() => {
				const S = h.current;
				if (S) return S.addEventListener(La, x), () => S.removeEventListener(La, x);
			}, [x]),
			$.jsx(Rw, {
				scope: r,
				orientation: n,
				dir: y,
				loop: i,
				currentTabStopId: v,
				onItemFocus: k.useCallback((S) => d(S), [d]),
				onItemShiftTab: k.useCallback(() => w(!0), []),
				onFocusableItemAdd: k.useCallback(() => _((S) => S + 1), []),
				onFocusableItemRemove: k.useCallback(() => _((S) => S - 1), []),
				children: $.jsx($r.div, {
					tabIndex: b || m === 0 ? -1 : 0,
					"data-orientation": n,
					...l,
					ref: p,
					style: { outline: "none", ...e.style },
					onMouseDown: ht(e.onMouseDown, () => {
						g.current = !0;
					}),
					onFocus: ht(e.onFocus, (S) => {
						const P = !g.current;
						if (S.target === S.currentTarget && P && !b) {
							const M = new CustomEvent(La, Cw);
							if ((S.currentTarget.dispatchEvent(M), !M.defaultPrevented)) {
								const A = O().filter((N) => N.focusable),
									E = A.find((N) => N.active),
									j = A.find((N) => N.id === v),
									C = [E, j, ...A].filter(Boolean).map((N) => N.ref.current);
								lb(C, f);
							}
						}
						g.current = !1;
					}),
					onBlur: ht(e.onBlur, () => w(!1)),
				}),
			})
		);
	}),
	cb = "RovingFocusGroupItem",
	sb = k.forwardRef((e, t) => {
		const { __scopeRovingFocusGroup: r, focusable: n = !0, active: i = !1, tabStopId: a, ...o } = e,
			u = rb(),
			c = a || u,
			s = Nw(cb, r),
			f = s.currentTabStopId === c,
			l = ab(r),
			{ onFocusableItemAdd: h, onFocusableItemRemove: p } = s;
		return (
			k.useEffect(() => {
				if (n) return h(), () => p();
			}, [n, h, p]),
			$.jsx(Fs.ItemSlot, {
				scope: r,
				id: c,
				focusable: n,
				active: i,
				children: $.jsx($r.span, {
					tabIndex: f ? 0 : -1,
					"data-orientation": s.orientation,
					...o,
					ref: t,
					onMouseDown: ht(e.onMouseDown, (y) => {
						n ? s.onItemFocus(c) : y.preventDefault();
					}),
					onFocus: ht(e.onFocus, () => s.onItemFocus(c)),
					onKeyDown: ht(e.onKeyDown, (y) => {
						if (y.key === "Tab" && y.shiftKey) {
							s.onItemShiftTab();
							return;
						}
						if (y.target !== y.currentTarget) return;
						const v = Lw(y, s.orientation, s.dir);
						if (v !== void 0) {
							if (y.metaKey || y.ctrlKey || y.altKey || y.shiftKey) return;
							y.preventDefault();
							let b = l()
								.filter((w) => w.focusable)
								.map((w) => w.ref.current);
							if (v === "last") b.reverse();
							else if (v === "prev" || v === "next") {
								v === "prev" && b.reverse();
								const w = b.indexOf(y.currentTarget);
								b = s.loop ? Bw(b, w + 1) : b.slice(w + 1);
							}
							setTimeout(() => lb(b));
						}
					}),
				}),
			})
		);
	});
sb.displayName = cb;
var Dw = {
	ArrowLeft: "prev",
	ArrowUp: "prev",
	ArrowRight: "next",
	ArrowDown: "next",
	PageUp: "first",
	Home: "first",
	PageDown: "last",
	End: "last",
};
function qw(e, t) {
	return t !== "rtl" ? e : e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e;
}
function Lw(e, t, r) {
	const n = qw(e.key, r);
	if (
		!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(n)) &&
		!(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(n))
	)
		return Dw[n];
}
function lb(e, t = !1) {
	const r = document.activeElement;
	for (const n of e) if (n === r || (n.focus({ preventScroll: t }), document.activeElement !== r)) return;
}
function Bw(e, t) {
	return e.map((r, n) => e[(t + n) % e.length]);
}
var Fw = ub,
	Uw = sb,
	nf = "Tabs",
	[zw, GD] = tb(nf, [ob]),
	fb = ob(),
	[Ww, af] = zw(nf),
	hb = k.forwardRef((e, t) => {
		const {
				__scopeTabs: r,
				value: n,
				onValueChange: i,
				defaultValue: a,
				orientation: o = "horizontal",
				dir: u,
				activationMode: c = "automatic",
				...s
			} = e,
			f = nb(u),
			[l, h] = ib({ prop: n, onChange: i, defaultProp: a });
		return $.jsx(Ww, {
			scope: r,
			baseId: rb(),
			value: l,
			onValueChange: h,
			orientation: o,
			dir: f,
			activationMode: c,
			children: $.jsx($r.div, { dir: f, "data-orientation": o, ...s, ref: t }),
		});
	});
hb.displayName = nf;
var db = "TabsList",
	pb = k.forwardRef((e, t) => {
		const { __scopeTabs: r, loop: n = !0, ...i } = e,
			a = af(db, r),
			o = fb(r);
		return $.jsx(Fw, {
			asChild: !0,
			...o,
			orientation: a.orientation,
			dir: a.dir,
			loop: n,
			children: $.jsx($r.div, { role: "tablist", "aria-orientation": a.orientation, ...i, ref: t }),
		});
	});
pb.displayName = db;
var vb = "TabsTrigger",
	yb = k.forwardRef((e, t) => {
		const { __scopeTabs: r, value: n, disabled: i = !1, ...a } = e,
			o = af(vb, r),
			u = fb(r),
			c = bb(o.baseId, n),
			s = xb(o.baseId, n),
			f = n === o.value;
		return $.jsx(Uw, {
			asChild: !0,
			...u,
			focusable: !i,
			active: f,
			children: $.jsx($r.button, {
				type: "button",
				role: "tab",
				"aria-selected": f,
				"aria-controls": s,
				"data-state": f ? "active" : "inactive",
				"data-disabled": i ? "" : void 0,
				disabled: i,
				id: c,
				...a,
				ref: t,
				onMouseDown: ht(e.onMouseDown, (l) => {
					!i && l.button === 0 && l.ctrlKey === !1 ? o.onValueChange(n) : l.preventDefault();
				}),
				onKeyDown: ht(e.onKeyDown, (l) => {
					[" ", "Enter"].includes(l.key) && o.onValueChange(n);
				}),
				onFocus: ht(e.onFocus, () => {
					const l = o.activationMode !== "manual";
					!f && !i && l && o.onValueChange(n);
				}),
			}),
		});
	});
yb.displayName = vb;
var gb = "TabsContent",
	mb = k.forwardRef((e, t) => {
		const { __scopeTabs: r, value: n, forceMount: i, children: a, ...o } = e,
			u = af(gb, r),
			c = bb(u.baseId, n),
			s = xb(u.baseId, n),
			f = n === u.value,
			l = k.useRef(f);
		return (
			k.useEffect(() => {
				const h = requestAnimationFrame(() => (l.current = !1));
				return () => cancelAnimationFrame(h);
			}, []),
			$.jsx(Mw, {
				present: i || f,
				children: ({ present: h }) =>
					$.jsx($r.div, {
						"data-state": f ? "active" : "inactive",
						"data-orientation": u.orientation,
						role: "tabpanel",
						"aria-labelledby": c,
						hidden: !h,
						id: s,
						tabIndex: 0,
						...o,
						ref: t,
						style: { ...e.style, animationDuration: l.current ? "0s" : void 0 },
						children: h && a,
					}),
			})
		);
	});
mb.displayName = gb;
function bb(e, t) {
	return `${e}-trigger-${t}`;
}
function xb(e, t) {
	return `${e}-content-${t}`;
}
var Gw = hb,
	Hw = pb,
	Kw = yb,
	Vw = mb;
function Xw({ className: e, ...t }) {
	return $.jsx(Gw, { "data-slot": "tabs", className: Xe("flex flex-col gap-2", e), ...t });
}
function Yw({ className: e, ...t }) {
	return $.jsx(Hw, {
		"data-slot": "tabs-list",
		className: Xe(
			"bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
			e,
		),
		...t,
	});
}
function Zw({ className: e, ...t }) {
	return $.jsx(Kw, {
		"data-slot": "tabs-trigger",
		className: Xe(
			"data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
			e,
		),
		...t,
	});
}
function Ba({ className: e, ...t }) {
	return $.jsx(Vw, { "data-slot": "tabs-content", className: Xe("flex-1 outline-none", e), ...t });
}
var Fa, gh;
function Ne() {
	if (gh) return Fa;
	gh = 1;
	var e = Array.isArray;
	return (Fa = e), Fa;
}
var Ua, mh;
function wb() {
	if (mh) return Ua;
	mh = 1;
	var e = typeof Yn == "object" && Yn && Yn.Object === Object && Yn;
	return (Ua = e), Ua;
}
var za, bh;
function ut() {
	if (bh) return za;
	bh = 1;
	var e = wb(),
		t = typeof self == "object" && self && self.Object === Object && self,
		r = e || t || Function("return this")();
	return (za = r), za;
}
var Wa, xh;
function Bn() {
	if (xh) return Wa;
	xh = 1;
	var e = ut(),
		t = e.Symbol;
	return (Wa = t), Wa;
}
var Ga, wh;
function Jw() {
	if (wh) return Ga;
	wh = 1;
	var e = Bn(),
		t = Object.prototype,
		r = t.hasOwnProperty,
		n = t.toString,
		i = e ? e.toStringTag : void 0;
	function a(o) {
		var u = r.call(o, i),
			c = o[i];
		try {
			o[i] = void 0;
			var s = !0;
		} catch {}
		var f = n.call(o);
		return s && (u ? (o[i] = c) : delete o[i]), f;
	}
	return (Ga = a), Ga;
}
var Ha, Oh;
function Qw() {
	if (Oh) return Ha;
	Oh = 1;
	var e = Object.prototype,
		t = e.toString;
	function r(n) {
		return t.call(n);
	}
	return (Ha = r), Ha;
}
var Ka, _h;
function bt() {
	if (_h) return Ka;
	_h = 1;
	var e = Bn(),
		t = Jw(),
		r = Qw(),
		n = "[object Null]",
		i = "[object Undefined]",
		a = e ? e.toStringTag : void 0;
	function o(u) {
		return u == null ? (u === void 0 ? i : n) : a && a in Object(u) ? t(u) : r(u);
	}
	return (Ka = o), Ka;
}
var Va, Sh;
function xt() {
	if (Sh) return Va;
	Sh = 1;
	function e(t) {
		return t != null && typeof t == "object";
	}
	return (Va = e), Va;
}
var Xa, Ah;
function Rr() {
	if (Ah) return Xa;
	Ah = 1;
	var e = bt(),
		t = xt(),
		r = "[object Symbol]";
	function n(i) {
		return typeof i == "symbol" || (t(i) && e(i) == r);
	}
	return (Xa = n), Xa;
}
var Ya, Ph;
function of() {
	if (Ph) return Ya;
	Ph = 1;
	var e = Ne(),
		t = Rr(),
		r = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
		n = /^\w*$/;
	function i(a, o) {
		if (e(a)) return !1;
		var u = typeof a;
		return u == "number" || u == "symbol" || u == "boolean" || a == null || t(a)
			? !0
			: n.test(a) || !r.test(a) || (o != null && a in Object(o));
	}
	return (Ya = i), Ya;
}
var Za, Th;
function jt() {
	if (Th) return Za;
	Th = 1;
	function e(t) {
		var r = typeof t;
		return t != null && (r == "object" || r == "function");
	}
	return (Za = e), Za;
}
var Ja, Eh;
function uf() {
	if (Eh) return Ja;
	Eh = 1;
	var e = bt(),
		t = jt(),
		r = "[object AsyncFunction]",
		n = "[object Function]",
		i = "[object GeneratorFunction]",
		a = "[object Proxy]";
	function o(u) {
		if (!t(u)) return !1;
		var c = e(u);
		return c == n || c == i || c == r || c == a;
	}
	return (Ja = o), Ja;
}
var Qa, jh;
function e1() {
	if (jh) return Qa;
	jh = 1;
	var e = ut(),
		t = e["__core-js_shared__"];
	return (Qa = t), Qa;
}
var eo, Mh;
function t1() {
	if (Mh) return eo;
	Mh = 1;
	var e = e1(),
		t = (() => {
			var n = /[^.]+$/.exec((e && e.keys && e.keys.IE_PROTO) || "");
			return n ? "Symbol(src)_1." + n : "";
		})();
	function r(n) {
		return !!t && t in n;
	}
	return (eo = r), eo;
}
var to, Ch;
function Ob() {
	if (Ch) return to;
	Ch = 1;
	var e = Function.prototype,
		t = e.toString;
	function r(n) {
		if (n != null) {
			try {
				return t.call(n);
			} catch {}
			try {
				return n + "";
			} catch {}
		}
		return "";
	}
	return (to = r), to;
}
var ro, Ih;
function r1() {
	if (Ih) return ro;
	Ih = 1;
	var e = uf(),
		t = t1(),
		r = jt(),
		n = Ob(),
		i = /[\\^$.*+?()[\]{}|]/g,
		a = /^\[object .+?Constructor\]$/,
		o = Function.prototype,
		u = Object.prototype,
		c = o.toString,
		s = u.hasOwnProperty,
		f = RegExp(
			"^" +
				c
					.call(s)
					.replace(i, "\\$&")
					.replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") +
				"$",
		);
	function l(h) {
		if (!r(h) || t(h)) return !1;
		var p = e(h) ? f : a;
		return p.test(n(h));
	}
	return (ro = l), ro;
}
var no, $h;
function n1() {
	if ($h) return no;
	$h = 1;
	function e(t, r) {
		return t?.[r];
	}
	return (no = e), no;
}
var io, Rh;
function Yt() {
	if (Rh) return io;
	Rh = 1;
	var e = r1(),
		t = n1();
	function r(n, i) {
		var a = t(n, i);
		return e(a) ? a : void 0;
	}
	return (io = r), io;
}
var ao, Nh;
function aa() {
	if (Nh) return ao;
	Nh = 1;
	var e = Yt(),
		t = e(Object, "create");
	return (ao = t), ao;
}
var oo, kh;
function i1() {
	if (kh) return oo;
	kh = 1;
	var e = aa();
	function t() {
		(this.__data__ = e ? e(null) : {}), (this.size = 0);
	}
	return (oo = t), oo;
}
var uo, Dh;
function a1() {
	if (Dh) return uo;
	Dh = 1;
	function e(t) {
		var r = this.has(t) && delete this.__data__[t];
		return (this.size -= r ? 1 : 0), r;
	}
	return (uo = e), uo;
}
var co, qh;
function o1() {
	if (qh) return co;
	qh = 1;
	var e = aa(),
		t = "__lodash_hash_undefined__",
		r = Object.prototype,
		n = r.hasOwnProperty;
	function i(a) {
		var o = this.__data__;
		if (e) {
			var u = o[a];
			return u === t ? void 0 : u;
		}
		return n.call(o, a) ? o[a] : void 0;
	}
	return (co = i), co;
}
var so, Lh;
function u1() {
	if (Lh) return so;
	Lh = 1;
	var e = aa(),
		t = Object.prototype,
		r = t.hasOwnProperty;
	function n(i) {
		var a = this.__data__;
		return e ? a[i] !== void 0 : r.call(a, i);
	}
	return (so = n), so;
}
var lo, Bh;
function c1() {
	if (Bh) return lo;
	Bh = 1;
	var e = aa(),
		t = "__lodash_hash_undefined__";
	function r(n, i) {
		var a = this.__data__;
		return (this.size += this.has(n) ? 0 : 1), (a[n] = e && i === void 0 ? t : i), this;
	}
	return (lo = r), lo;
}
var fo, Fh;
function s1() {
	if (Fh) return fo;
	Fh = 1;
	var e = i1(),
		t = a1(),
		r = o1(),
		n = u1(),
		i = c1();
	function a(o) {
		var u = -1,
			c = o == null ? 0 : o.length;
		for (this.clear(); ++u < c; ) {
			var s = o[u];
			this.set(s[0], s[1]);
		}
	}
	return (
		(a.prototype.clear = e),
		(a.prototype.delete = t),
		(a.prototype.get = r),
		(a.prototype.has = n),
		(a.prototype.set = i),
		(fo = a),
		fo
	);
}
var ho, Uh;
function l1() {
	if (Uh) return ho;
	Uh = 1;
	function e() {
		(this.__data__ = []), (this.size = 0);
	}
	return (ho = e), ho;
}
var po, zh;
function cf() {
	if (zh) return po;
	zh = 1;
	function e(t, r) {
		return t === r || (t !== t && r !== r);
	}
	return (po = e), po;
}
var vo, Wh;
function oa() {
	if (Wh) return vo;
	Wh = 1;
	var e = cf();
	function t(r, n) {
		for (var i = r.length; i--; ) if (e(r[i][0], n)) return i;
		return -1;
	}
	return (vo = t), vo;
}
var yo, Gh;
function f1() {
	if (Gh) return yo;
	Gh = 1;
	var e = oa(),
		t = Array.prototype,
		r = t.splice;
	function n(i) {
		var a = this.__data__,
			o = e(a, i);
		if (o < 0) return !1;
		var u = a.length - 1;
		return o == u ? a.pop() : r.call(a, o, 1), --this.size, !0;
	}
	return (yo = n), yo;
}
var go, Hh;
function h1() {
	if (Hh) return go;
	Hh = 1;
	var e = oa();
	function t(r) {
		var n = this.__data__,
			i = e(n, r);
		return i < 0 ? void 0 : n[i][1];
	}
	return (go = t), go;
}
var mo, Kh;
function d1() {
	if (Kh) return mo;
	Kh = 1;
	var e = oa();
	function t(r) {
		return e(this.__data__, r) > -1;
	}
	return (mo = t), mo;
}
var bo, Vh;
function p1() {
	if (Vh) return bo;
	Vh = 1;
	var e = oa();
	function t(r, n) {
		var i = this.__data__,
			a = e(i, r);
		return a < 0 ? (++this.size, i.push([r, n])) : (i[a][1] = n), this;
	}
	return (bo = t), bo;
}
var xo, Xh;
function ua() {
	if (Xh) return xo;
	Xh = 1;
	var e = l1(),
		t = f1(),
		r = h1(),
		n = d1(),
		i = p1();
	function a(o) {
		var u = -1,
			c = o == null ? 0 : o.length;
		for (this.clear(); ++u < c; ) {
			var s = o[u];
			this.set(s[0], s[1]);
		}
	}
	return (
		(a.prototype.clear = e),
		(a.prototype.delete = t),
		(a.prototype.get = r),
		(a.prototype.has = n),
		(a.prototype.set = i),
		(xo = a),
		xo
	);
}
var wo, Yh;
function sf() {
	if (Yh) return wo;
	Yh = 1;
	var e = Yt(),
		t = ut(),
		r = e(t, "Map");
	return (wo = r), wo;
}
var Oo, Zh;
function v1() {
	if (Zh) return Oo;
	Zh = 1;
	var e = s1(),
		t = ua(),
		r = sf();
	function n() {
		(this.size = 0), (this.__data__ = { hash: new e(), map: new (r || t)(), string: new e() });
	}
	return (Oo = n), Oo;
}
var _o, Jh;
function y1() {
	if (Jh) return _o;
	Jh = 1;
	function e(t) {
		var r = typeof t;
		return r == "string" || r == "number" || r == "symbol" || r == "boolean" ? t !== "__proto__" : t === null;
	}
	return (_o = e), _o;
}
var So, Qh;
function ca() {
	if (Qh) return So;
	Qh = 1;
	var e = y1();
	function t(r, n) {
		var i = r.__data__;
		return e(n) ? i[typeof n == "string" ? "string" : "hash"] : i.map;
	}
	return (So = t), So;
}
var Ao, ed;
function g1() {
	if (ed) return Ao;
	ed = 1;
	var e = ca();
	function t(r) {
		var n = e(this, r).delete(r);
		return (this.size -= n ? 1 : 0), n;
	}
	return (Ao = t), Ao;
}
var Po, td;
function m1() {
	if (td) return Po;
	td = 1;
	var e = ca();
	function t(r) {
		return e(this, r).get(r);
	}
	return (Po = t), Po;
}
var To, rd;
function b1() {
	if (rd) return To;
	rd = 1;
	var e = ca();
	function t(r) {
		return e(this, r).has(r);
	}
	return (To = t), To;
}
var Eo, nd;
function x1() {
	if (nd) return Eo;
	nd = 1;
	var e = ca();
	function t(r, n) {
		var i = e(this, r),
			a = i.size;
		return i.set(r, n), (this.size += i.size == a ? 0 : 1), this;
	}
	return (Eo = t), Eo;
}
var jo, id;
function lf() {
	if (id) return jo;
	id = 1;
	var e = v1(),
		t = g1(),
		r = m1(),
		n = b1(),
		i = x1();
	function a(o) {
		var u = -1,
			c = o == null ? 0 : o.length;
		for (this.clear(); ++u < c; ) {
			var s = o[u];
			this.set(s[0], s[1]);
		}
	}
	return (
		(a.prototype.clear = e),
		(a.prototype.delete = t),
		(a.prototype.get = r),
		(a.prototype.has = n),
		(a.prototype.set = i),
		(jo = a),
		jo
	);
}
var Mo, ad;
function _b() {
	if (ad) return Mo;
	ad = 1;
	var e = lf(),
		t = "Expected a function";
	function r(n, i) {
		if (typeof n != "function" || (i != null && typeof i != "function")) throw new TypeError(t);
		var a = function () {
			var o = arguments,
				u = i ? i.apply(this, o) : o[0],
				c = a.cache;
			if (c.has(u)) return c.get(u);
			var s = n.apply(this, o);
			return (a.cache = c.set(u, s) || c), s;
		};
		return (a.cache = new (r.Cache || e)()), a;
	}
	return (r.Cache = e), (Mo = r), Mo;
}
var Co, od;
function w1() {
	if (od) return Co;
	od = 1;
	var e = _b(),
		t = 500;
	function r(n) {
		var i = e(n, (o) => (a.size === t && a.clear(), o)),
			a = i.cache;
		return i;
	}
	return (Co = r), Co;
}
var Io, ud;
function O1() {
	if (ud) return Io;
	ud = 1;
	var e = w1(),
		t = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
		r = /\\(\\)?/g,
		n = e((i) => {
			var a = [];
			return (
				i.charCodeAt(0) === 46 && a.push(""),
				i.replace(t, (o, u, c, s) => {
					a.push(c ? s.replace(r, "$1") : u || o);
				}),
				a
			);
		});
	return (Io = n), Io;
}
var $o, cd;
function ff() {
	if (cd) return $o;
	cd = 1;
	function e(t, r) {
		for (var n = -1, i = t == null ? 0 : t.length, a = Array(i); ++n < i; ) a[n] = r(t[n], n, t);
		return a;
	}
	return ($o = e), $o;
}
var Ro, sd;
function _1() {
	if (sd) return Ro;
	sd = 1;
	var e = Bn(),
		t = ff(),
		r = Ne(),
		n = Rr(),
		i = e ? e.prototype : void 0,
		a = i ? i.toString : void 0;
	function o(u) {
		if (typeof u == "string") return u;
		if (r(u)) return t(u, o) + "";
		if (n(u)) return a ? a.call(u) : "";
		var c = u + "";
		return c == "0" && 1 / u == -1 / 0 ? "-0" : c;
	}
	return (Ro = o), Ro;
}
var No, ld;
function Sb() {
	if (ld) return No;
	ld = 1;
	var e = _1();
	function t(r) {
		return r == null ? "" : e(r);
	}
	return (No = t), No;
}
var ko, fd;
function Ab() {
	if (fd) return ko;
	fd = 1;
	var e = Ne(),
		t = of(),
		r = O1(),
		n = Sb();
	function i(a, o) {
		return e(a) ? a : t(a, o) ? [a] : r(n(a));
	}
	return (ko = i), ko;
}
var Do, hd;
function sa() {
	if (hd) return Do;
	hd = 1;
	var e = Rr();
	function t(r) {
		if (typeof r == "string" || e(r)) return r;
		var n = r + "";
		return n == "0" && 1 / r == -1 / 0 ? "-0" : n;
	}
	return (Do = t), Do;
}
var qo, dd;
function hf() {
	if (dd) return qo;
	dd = 1;
	var e = Ab(),
		t = sa();
	function r(n, i) {
		i = e(i, n);
		for (var a = 0, o = i.length; n != null && a < o; ) n = n[t(i[a++])];
		return a && a == o ? n : void 0;
	}
	return (qo = r), qo;
}
var Lo, pd;
function Pb() {
	if (pd) return Lo;
	pd = 1;
	var e = hf();
	function t(r, n, i) {
		var a = r == null ? void 0 : e(r, n);
		return a === void 0 ? i : a;
	}
	return (Lo = t), Lo;
}
var S1 = Pb();
const ze = ce(S1);
var Bo, vd;
function A1() {
	if (vd) return Bo;
	vd = 1;
	function e(t) {
		return t == null;
	}
	return (Bo = e), Bo;
}
var P1 = A1();
const ne = ce(P1);
var Fo, yd;
function T1() {
	if (yd) return Fo;
	yd = 1;
	var e = bt(),
		t = Ne(),
		r = xt(),
		n = "[object String]";
	function i(a) {
		return typeof a == "string" || (!t(a) && r(a) && e(a) == n);
	}
	return (Fo = i), Fo;
}
var E1 = T1();
const Fn = ce(E1);
var j1 = uf();
const Z = ce(j1);
var M1 = jt();
const Nr = ce(M1);
var Uo = { exports: {} },
	te = {}; /**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var gd;
function C1() {
	if (gd) return te;
	gd = 1;
	var e = Symbol.for("react.element"),
		t = Symbol.for("react.portal"),
		r = Symbol.for("react.fragment"),
		n = Symbol.for("react.strict_mode"),
		i = Symbol.for("react.profiler"),
		a = Symbol.for("react.provider"),
		o = Symbol.for("react.context"),
		u = Symbol.for("react.server_context"),
		c = Symbol.for("react.forward_ref"),
		s = Symbol.for("react.suspense"),
		f = Symbol.for("react.suspense_list"),
		l = Symbol.for("react.memo"),
		h = Symbol.for("react.lazy"),
		p = Symbol.for("react.offscreen"),
		y;
	y = Symbol.for("react.module.reference");
	function v(d) {
		if (typeof d == "object" && d !== null) {
			var b = d.$$typeof;
			switch (b) {
				case e:
					switch (((d = d.type), d)) {
						case r:
						case i:
						case n:
						case s:
						case f:
							return d;
						default:
							switch (((d = d && d.$$typeof), d)) {
								case u:
								case o:
								case c:
								case h:
								case l:
								case a:
									return d;
								default:
									return b;
							}
					}
				case t:
					return b;
			}
		}
	}
	return (
		(te.ContextConsumer = o),
		(te.ContextProvider = a),
		(te.Element = e),
		(te.ForwardRef = c),
		(te.Fragment = r),
		(te.Lazy = h),
		(te.Memo = l),
		(te.Portal = t),
		(te.Profiler = i),
		(te.StrictMode = n),
		(te.Suspense = s),
		(te.SuspenseList = f),
		(te.isAsyncMode = () => !1),
		(te.isConcurrentMode = () => !1),
		(te.isContextConsumer = (d) => v(d) === o),
		(te.isContextProvider = (d) => v(d) === a),
		(te.isElement = (d) => typeof d == "object" && d !== null && d.$$typeof === e),
		(te.isForwardRef = (d) => v(d) === c),
		(te.isFragment = (d) => v(d) === r),
		(te.isLazy = (d) => v(d) === h),
		(te.isMemo = (d) => v(d) === l),
		(te.isPortal = (d) => v(d) === t),
		(te.isProfiler = (d) => v(d) === i),
		(te.isStrictMode = (d) => v(d) === n),
		(te.isSuspense = (d) => v(d) === s),
		(te.isSuspenseList = (d) => v(d) === f),
		(te.isValidElementType = (d) =>
			typeof d == "string" ||
			typeof d == "function" ||
			d === r ||
			d === i ||
			d === n ||
			d === s ||
			d === f ||
			d === p ||
			(typeof d == "object" &&
				d !== null &&
				(d.$$typeof === h ||
					d.$$typeof === l ||
					d.$$typeof === a ||
					d.$$typeof === o ||
					d.$$typeof === c ||
					d.$$typeof === y ||
					d.getModuleId !== void 0))),
		(te.typeOf = v),
		te
	);
}
var md;
function I1() {
	return md || ((md = 1), (Uo.exports = C1())), Uo.exports;
}
var $1 = I1(),
	zo,
	bd;
function Tb() {
	if (bd) return zo;
	bd = 1;
	var e = bt(),
		t = xt(),
		r = "[object Number]";
	function n(i) {
		return typeof i == "number" || (t(i) && e(i) == r);
	}
	return (zo = n), zo;
}
var Wo, xd;
function R1() {
	if (xd) return Wo;
	xd = 1;
	var e = Tb();
	function t(r) {
		return e(r) && r != +r;
	}
	return (Wo = t), Wo;
}
var N1 = R1();
const Un = ce(N1);
var k1 = Tb();
const D1 = ce(k1);
var Ze = (t) => (t === 0 ? 0 : t > 0 ? 1 : -1),
	Bt = (t) => Fn(t) && t.indexOf("%") === t.length - 1,
	B = (t) => D1(t) && !Un(t),
	xe = (t) => B(t) || Fn(t),
	q1 = 0,
	la = (t) => {
		var r = ++q1;
		return "".concat(t || "").concat(r);
	},
	Ht = (t, r) => {
		var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0,
			i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
		if (!B(t) && !Fn(t)) return n;
		var a;
		if (Bt(t)) {
			var o = t.indexOf("%");
			a = (r * Number.parseFloat(t.slice(0, o))) / 100;
		} else a = +t;
		return Un(a) && (a = n), i && a > r && (a = r), a;
	},
	At = (t) => {
		if (!t) return null;
		var r = Object.keys(t);
		return r && r.length ? t[r[0]] : null;
	},
	L1 = (t) => {
		if (!Array.isArray(t)) return !1;
		for (var r = t.length, n = {}, i = 0; i < r; i++)
			if (!n[t[i]]) n[t[i]] = !0;
			else return !0;
		return !1;
	},
	tr = (t, r) => (B(t) && B(r) ? (n) => t + n * (r - t) : () => r);
function Us(e, t, r) {
	return !e || !e.length ? null : e.find((n) => n && (typeof t == "function" ? t(n) : ze(n, t)) === r);
}
function cr(e, t) {
	for (var r in e) if ({}.hasOwnProperty.call(e, r) && (!{}.hasOwnProperty.call(t, r) || e[r] !== t[r])) return !1;
	for (var n in t) if ({}.hasOwnProperty.call(t, n) && !{}.hasOwnProperty.call(e, n)) return !1;
	return !0;
}
function zs(e) {
	"@babel/helpers - typeof";
	return (
		(zs =
			typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
				? (t) => typeof t
				: (t) =>
						t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
							? "symbol"
							: typeof t),
		zs(e)
	);
}
var B1 = ["viewBox", "children"],
	F1 = [
		"aria-activedescendant",
		"aria-atomic",
		"aria-autocomplete",
		"aria-busy",
		"aria-checked",
		"aria-colcount",
		"aria-colindex",
		"aria-colspan",
		"aria-controls",
		"aria-current",
		"aria-describedby",
		"aria-details",
		"aria-disabled",
		"aria-errormessage",
		"aria-expanded",
		"aria-flowto",
		"aria-haspopup",
		"aria-hidden",
		"aria-invalid",
		"aria-keyshortcuts",
		"aria-label",
		"aria-labelledby",
		"aria-level",
		"aria-live",
		"aria-modal",
		"aria-multiline",
		"aria-multiselectable",
		"aria-orientation",
		"aria-owns",
		"aria-placeholder",
		"aria-posinset",
		"aria-pressed",
		"aria-readonly",
		"aria-relevant",
		"aria-required",
		"aria-roledescription",
		"aria-rowcount",
		"aria-rowindex",
		"aria-rowspan",
		"aria-selected",
		"aria-setsize",
		"aria-sort",
		"aria-valuemax",
		"aria-valuemin",
		"aria-valuenow",
		"aria-valuetext",
		"className",
		"color",
		"height",
		"id",
		"lang",
		"max",
		"media",
		"method",
		"min",
		"name",
		"style",
		"target",
		"width",
		"role",
		"tabIndex",
		"accentHeight",
		"accumulate",
		"additive",
		"alignmentBaseline",
		"allowReorder",
		"alphabetic",
		"amplitude",
		"arabicForm",
		"ascent",
		"attributeName",
		"attributeType",
		"autoReverse",
		"azimuth",
		"baseFrequency",
		"baselineShift",
		"baseProfile",
		"bbox",
		"begin",
		"bias",
		"by",
		"calcMode",
		"capHeight",
		"clip",
		"clipPath",
		"clipPathUnits",
		"clipRule",
		"colorInterpolation",
		"colorInterpolationFilters",
		"colorProfile",
		"colorRendering",
		"contentScriptType",
		"contentStyleType",
		"cursor",
		"cx",
		"cy",
		"d",
		"decelerate",
		"descent",
		"diffuseConstant",
		"direction",
		"display",
		"divisor",
		"dominantBaseline",
		"dur",
		"dx",
		"dy",
		"edgeMode",
		"elevation",
		"enableBackground",
		"end",
		"exponent",
		"externalResourcesRequired",
		"fill",
		"fillOpacity",
		"fillRule",
		"filter",
		"filterRes",
		"filterUnits",
		"floodColor",
		"floodOpacity",
		"focusable",
		"fontFamily",
		"fontSize",
		"fontSizeAdjust",
		"fontStretch",
		"fontStyle",
		"fontVariant",
		"fontWeight",
		"format",
		"from",
		"fx",
		"fy",
		"g1",
		"g2",
		"glyphName",
		"glyphOrientationHorizontal",
		"glyphOrientationVertical",
		"glyphRef",
		"gradientTransform",
		"gradientUnits",
		"hanging",
		"horizAdvX",
		"horizOriginX",
		"href",
		"ideographic",
		"imageRendering",
		"in2",
		"in",
		"intercept",
		"k1",
		"k2",
		"k3",
		"k4",
		"k",
		"kernelMatrix",
		"kernelUnitLength",
		"kerning",
		"keyPoints",
		"keySplines",
		"keyTimes",
		"lengthAdjust",
		"letterSpacing",
		"lightingColor",
		"limitingConeAngle",
		"local",
		"markerEnd",
		"markerHeight",
		"markerMid",
		"markerStart",
		"markerUnits",
		"markerWidth",
		"mask",
		"maskContentUnits",
		"maskUnits",
		"mathematical",
		"mode",
		"numOctaves",
		"offset",
		"opacity",
		"operator",
		"order",
		"orient",
		"orientation",
		"origin",
		"overflow",
		"overlinePosition",
		"overlineThickness",
		"paintOrder",
		"panose1",
		"pathLength",
		"patternContentUnits",
		"patternTransform",
		"patternUnits",
		"pointerEvents",
		"pointsAtX",
		"pointsAtY",
		"pointsAtZ",
		"preserveAlpha",
		"preserveAspectRatio",
		"primitiveUnits",
		"r",
		"radius",
		"refX",
		"refY",
		"renderingIntent",
		"repeatCount",
		"repeatDur",
		"requiredExtensions",
		"requiredFeatures",
		"restart",
		"result",
		"rotate",
		"rx",
		"ry",
		"seed",
		"shapeRendering",
		"slope",
		"spacing",
		"specularConstant",
		"specularExponent",
		"speed",
		"spreadMethod",
		"startOffset",
		"stdDeviation",
		"stemh",
		"stemv",
		"stitchTiles",
		"stopColor",
		"stopOpacity",
		"strikethroughPosition",
		"strikethroughThickness",
		"string",
		"stroke",
		"strokeDasharray",
		"strokeDashoffset",
		"strokeLinecap",
		"strokeLinejoin",
		"strokeMiterlimit",
		"strokeOpacity",
		"strokeWidth",
		"surfaceScale",
		"systemLanguage",
		"tableValues",
		"targetX",
		"targetY",
		"textAnchor",
		"textDecoration",
		"textLength",
		"textRendering",
		"to",
		"transform",
		"u1",
		"u2",
		"underlinePosition",
		"underlineThickness",
		"unicode",
		"unicodeBidi",
		"unicodeRange",
		"unitsPerEm",
		"vAlphabetic",
		"values",
		"vectorEffect",
		"version",
		"vertAdvY",
		"vertOriginX",
		"vertOriginY",
		"vHanging",
		"vIdeographic",
		"viewTarget",
		"visibility",
		"vMathematical",
		"widths",
		"wordSpacing",
		"writingMode",
		"x1",
		"x2",
		"x",
		"xChannelSelector",
		"xHeight",
		"xlinkActuate",
		"xlinkArcrole",
		"xlinkHref",
		"xlinkRole",
		"xlinkShow",
		"xlinkTitle",
		"xlinkType",
		"xmlBase",
		"xmlLang",
		"xmlns",
		"xmlnsXlink",
		"xmlSpace",
		"y1",
		"y2",
		"y",
		"yChannelSelector",
		"z",
		"zoomAndPan",
		"ref",
		"key",
		"angle",
	],
	wd = ["points", "pathLength"],
	Go = { svg: B1, polygon: wd, polyline: wd },
	df = [
		"dangerouslySetInnerHTML",
		"onCopy",
		"onCopyCapture",
		"onCut",
		"onCutCapture",
		"onPaste",
		"onPasteCapture",
		"onCompositionEnd",
		"onCompositionEndCapture",
		"onCompositionStart",
		"onCompositionStartCapture",
		"onCompositionUpdate",
		"onCompositionUpdateCapture",
		"onFocus",
		"onFocusCapture",
		"onBlur",
		"onBlurCapture",
		"onChange",
		"onChangeCapture",
		"onBeforeInput",
		"onBeforeInputCapture",
		"onInput",
		"onInputCapture",
		"onReset",
		"onResetCapture",
		"onSubmit",
		"onSubmitCapture",
		"onInvalid",
		"onInvalidCapture",
		"onLoad",
		"onLoadCapture",
		"onError",
		"onErrorCapture",
		"onKeyDown",
		"onKeyDownCapture",
		"onKeyPress",
		"onKeyPressCapture",
		"onKeyUp",
		"onKeyUpCapture",
		"onAbort",
		"onAbortCapture",
		"onCanPlay",
		"onCanPlayCapture",
		"onCanPlayThrough",
		"onCanPlayThroughCapture",
		"onDurationChange",
		"onDurationChangeCapture",
		"onEmptied",
		"onEmptiedCapture",
		"onEncrypted",
		"onEncryptedCapture",
		"onEnded",
		"onEndedCapture",
		"onLoadedData",
		"onLoadedDataCapture",
		"onLoadedMetadata",
		"onLoadedMetadataCapture",
		"onLoadStart",
		"onLoadStartCapture",
		"onPause",
		"onPauseCapture",
		"onPlay",
		"onPlayCapture",
		"onPlaying",
		"onPlayingCapture",
		"onProgress",
		"onProgressCapture",
		"onRateChange",
		"onRateChangeCapture",
		"onSeeked",
		"onSeekedCapture",
		"onSeeking",
		"onSeekingCapture",
		"onStalled",
		"onStalledCapture",
		"onSuspend",
		"onSuspendCapture",
		"onTimeUpdate",
		"onTimeUpdateCapture",
		"onVolumeChange",
		"onVolumeChangeCapture",
		"onWaiting",
		"onWaitingCapture",
		"onAuxClick",
		"onAuxClickCapture",
		"onClick",
		"onClickCapture",
		"onContextMenu",
		"onContextMenuCapture",
		"onDoubleClick",
		"onDoubleClickCapture",
		"onDrag",
		"onDragCapture",
		"onDragEnd",
		"onDragEndCapture",
		"onDragEnter",
		"onDragEnterCapture",
		"onDragExit",
		"onDragExitCapture",
		"onDragLeave",
		"onDragLeaveCapture",
		"onDragOver",
		"onDragOverCapture",
		"onDragStart",
		"onDragStartCapture",
		"onDrop",
		"onDropCapture",
		"onMouseDown",
		"onMouseDownCapture",
		"onMouseEnter",
		"onMouseLeave",
		"onMouseMove",
		"onMouseMoveCapture",
		"onMouseOut",
		"onMouseOutCapture",
		"onMouseOver",
		"onMouseOverCapture",
		"onMouseUp",
		"onMouseUpCapture",
		"onSelect",
		"onSelectCapture",
		"onTouchCancel",
		"onTouchCancelCapture",
		"onTouchEnd",
		"onTouchEndCapture",
		"onTouchMove",
		"onTouchMoveCapture",
		"onTouchStart",
		"onTouchStartCapture",
		"onPointerDown",
		"onPointerDownCapture",
		"onPointerMove",
		"onPointerMoveCapture",
		"onPointerUp",
		"onPointerUpCapture",
		"onPointerCancel",
		"onPointerCancelCapture",
		"onPointerEnter",
		"onPointerEnterCapture",
		"onPointerLeave",
		"onPointerLeaveCapture",
		"onPointerOver",
		"onPointerOverCapture",
		"onPointerOut",
		"onPointerOutCapture",
		"onGotPointerCapture",
		"onGotPointerCaptureCapture",
		"onLostPointerCapture",
		"onLostPointerCaptureCapture",
		"onScroll",
		"onScrollCapture",
		"onWheel",
		"onWheelCapture",
		"onAnimationStart",
		"onAnimationStartCapture",
		"onAnimationEnd",
		"onAnimationEndCapture",
		"onAnimationIteration",
		"onAnimationIterationCapture",
		"onTransitionEnd",
		"onTransitionEndCapture",
	],
	li = (t, r) => {
		if (!t || typeof t == "function" || typeof t == "boolean") return null;
		var n = t;
		if ((k.isValidElement(t) && (n = t.props), !Nr(n))) return null;
		var i = {};
		return (
			Object.keys(n).forEach((a) => {
				df.includes(a) && (i[a] = r || ((o) => n[a](n, o)));
			}),
			i
		);
	},
	U1 = (t, r, n) => (i) => (t(r, n, i), null),
	fi = (t, r, n) => {
		if (!Nr(t) || zs(t) !== "object") return null;
		var i = null;
		return (
			Object.keys(t).forEach((a) => {
				var o = t[a];
				df.includes(a) && typeof o == "function" && (i || (i = {}), (i[a] = U1(o, r, n)));
			}),
			i
		);
	},
	z1 = ["children"],
	W1 = ["children"];
function Od(e, t) {
	if (e == null) return {};
	var r = G1(e, t),
		n,
		i;
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (i = 0; i < a.length; i++)
			(n = a[i]), !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
	}
	return r;
}
function G1(e, t) {
	if (e == null) return {};
	var r = {};
	for (var n in e)
		if (Object.prototype.hasOwnProperty.call(e, n)) {
			if (t.indexOf(n) >= 0) continue;
			r[n] = e[n];
		}
	return r;
}
var _d = {
		click: "onClick",
		mousedown: "onMouseDown",
		mouseup: "onMouseUp",
		mouseover: "onMouseOver",
		mousemove: "onMouseMove",
		mouseout: "onMouseOut",
		mouseenter: "onMouseEnter",
		mouseleave: "onMouseLeave",
		touchcancel: "onTouchCancel",
		touchend: "onTouchEnd",
		touchmove: "onTouchMove",
		touchstart: "onTouchStart",
		contextmenu: "onContextMenu",
		dblclick: "onDoubleClick",
	},
	dt = (t) => (typeof t == "string" ? t : t ? t.displayName || t.name || "Component" : ""),
	Sd = null,
	Ho = null,
	pf = function e(t) {
		if (t === Sd && Array.isArray(Ho)) return Ho;
		var r = [];
		return (
			k.Children.forEach(t, (n) => {
				ne(n) || ($1.isFragment(n) ? (r = r.concat(e(n.props.children))) : r.push(n));
			}),
			(Ho = r),
			(Sd = t),
			r
		);
	};
function Je(e, t) {
	var r = [],
		n = [];
	return (
		Array.isArray(t) ? (n = t.map((i) => dt(i))) : (n = [dt(t)]),
		pf(e).forEach((i) => {
			var a = ze(i, "type.displayName") || ze(i, "type.name");
			n.indexOf(a) !== -1 && r.push(i);
		}),
		r
	);
}
function qe(e, t) {
	var r = Je(e, t);
	return r && r[0];
}
var Ad = (t) => {
		if (!t || !t.props) return !1;
		var r = t.props,
			n = r.width,
			i = r.height;
		return !(!B(n) || n <= 0 || !B(i) || i <= 0);
	},
	H1 = [
		"a",
		"altGlyph",
		"altGlyphDef",
		"altGlyphItem",
		"animate",
		"animateColor",
		"animateMotion",
		"animateTransform",
		"circle",
		"clipPath",
		"color-profile",
		"cursor",
		"defs",
		"desc",
		"ellipse",
		"feBlend",
		"feColormatrix",
		"feComponentTransfer",
		"feComposite",
		"feConvolveMatrix",
		"feDiffuseLighting",
		"feDisplacementMap",
		"feDistantLight",
		"feFlood",
		"feFuncA",
		"feFuncB",
		"feFuncG",
		"feFuncR",
		"feGaussianBlur",
		"feImage",
		"feMerge",
		"feMergeNode",
		"feMorphology",
		"feOffset",
		"fePointLight",
		"feSpecularLighting",
		"feSpotLight",
		"feTile",
		"feTurbulence",
		"filter",
		"font",
		"font-face",
		"font-face-format",
		"font-face-name",
		"font-face-url",
		"foreignObject",
		"g",
		"glyph",
		"glyphRef",
		"hkern",
		"image",
		"line",
		"lineGradient",
		"marker",
		"mask",
		"metadata",
		"missing-glyph",
		"mpath",
		"path",
		"pattern",
		"polygon",
		"polyline",
		"radialGradient",
		"rect",
		"script",
		"set",
		"stop",
		"style",
		"svg",
		"switch",
		"symbol",
		"text",
		"textPath",
		"title",
		"tref",
		"tspan",
		"use",
		"view",
		"vkern",
	],
	K1 = (t) => t && t.type && Fn(t.type) && H1.indexOf(t.type) >= 0,
	V1 = (t, r, n, i) => {
		var a,
			o = (a = Go?.[i]) !== null && a !== void 0 ? a : [];
		return r.startsWith("data-") || (!Z(t) && ((i && o.includes(r)) || F1.includes(r))) || (n && df.includes(r));
	},
	ee = (t, r, n) => {
		if (!t || typeof t == "function" || typeof t == "boolean") return null;
		var i = t;
		if ((k.isValidElement(t) && (i = t.props), !Nr(i))) return null;
		var a = {};
		return (
			Object.keys(i).forEach((o) => {
				var u;
				V1((u = i) === null || u === void 0 ? void 0 : u[o], o, r, n) && (a[o] = i[o]);
			}),
			a
		);
	},
	Ws = function e(t, r) {
		if (t === r) return !0;
		var n = k.Children.count(t);
		if (n !== k.Children.count(r)) return !1;
		if (n === 0) return !0;
		if (n === 1) return Pd(Array.isArray(t) ? t[0] : t, Array.isArray(r) ? r[0] : r);
		for (var i = 0; i < n; i++) {
			var a = t[i],
				o = r[i];
			if (Array.isArray(a) || Array.isArray(o)) {
				if (!e(a, o)) return !1;
			} else if (!Pd(a, o)) return !1;
		}
		return !0;
	},
	Pd = (t, r) => {
		if (ne(t) && ne(r)) return !0;
		if (!ne(t) && !ne(r)) {
			var n = t.props || {},
				i = n.children,
				a = Od(n, z1),
				o = r.props || {},
				u = o.children,
				c = Od(o, W1);
			return i && u ? cr(a, c) && Ws(i, u) : !i && !u ? cr(a, c) : !1;
		}
		return !1;
	},
	Td = (t, r) => {
		var n = [],
			i = {};
		return (
			pf(t).forEach((a, o) => {
				if (K1(a)) n.push(a);
				else if (a) {
					var u = dt(a.type),
						c = r[u] || {},
						s = c.handler,
						f = c.once;
					if (s && (!f || !i[u])) {
						var l = s(a, u, o);
						n.push(l), (i[u] = !0);
					}
				}
			}),
			n
		);
	},
	X1 = (t) => {
		var r = t && t.type;
		return r && _d[r] ? _d[r] : null;
	},
	Y1 = (t, r) => pf(r).indexOf(t),
	Z1 = ["children", "width", "height", "viewBox", "className", "style", "title", "desc"];
function Gs() {
	return (
		(Gs = Object.assign
			? Object.assign.bind()
			: (e) => {
					for (var t = 1; t < arguments.length; t++) {
						var r = arguments[t];
						for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
					}
					return e;
				}),
		Gs.apply(this, arguments)
	);
}
function J1(e, t) {
	if (e == null) return {};
	var r = Q1(e, t),
		n,
		i;
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (i = 0; i < a.length; i++)
			(n = a[i]), !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
	}
	return r;
}
function Q1(e, t) {
	if (e == null) return {};
	var r = {};
	for (var n in e)
		if (Object.prototype.hasOwnProperty.call(e, n)) {
			if (t.indexOf(n) >= 0) continue;
			r[n] = e[n];
		}
	return r;
}
function Hs(e) {
	var t = e.children,
		r = e.width,
		n = e.height,
		i = e.viewBox,
		a = e.className,
		o = e.style,
		u = e.title,
		c = e.desc,
		s = J1(e, Z1),
		f = i || { width: r, height: n, x: 0, y: 0 },
		l = ie("recharts-surface", a);
	return T.createElement(
		"svg",
		Gs({}, ee(s, !0, "svg"), {
			className: l,
			width: r,
			height: n,
			style: o,
			viewBox: "".concat(f.x, " ").concat(f.y, " ").concat(f.width, " ").concat(f.height),
		}),
		T.createElement("title", null, u),
		T.createElement("desc", null, c),
		t,
	);
}
var eO = ["children", "className"];
function Ks() {
	return (
		(Ks = Object.assign
			? Object.assign.bind()
			: (e) => {
					for (var t = 1; t < arguments.length; t++) {
						var r = arguments[t];
						for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
					}
					return e;
				}),
		Ks.apply(this, arguments)
	);
}
function tO(e, t) {
	if (e == null) return {};
	var r = rO(e, t),
		n,
		i;
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (i = 0; i < a.length; i++)
			(n = a[i]), !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
	}
	return r;
}
function rO(e, t) {
	if (e == null) return {};
	var r = {};
	for (var n in e)
		if (Object.prototype.hasOwnProperty.call(e, n)) {
			if (t.indexOf(n) >= 0) continue;
			r[n] = e[n];
		}
	return r;
}
var _e = T.forwardRef((e, t) => {
		var r = e.children,
			n = e.className,
			i = tO(e, eO),
			a = ie("recharts-layer", n);
		return T.createElement("g", Ks({ className: a }, ee(i, !0), { ref: t }), r);
	}),
	pt = (t, r) => {
		for (var n = arguments.length, i = new Array(n > 2 ? n - 2 : 0), a = 2; a < n; a++) i[a - 2] = arguments[a];
	},
	Ko,
	Ed;
function nO() {
	if (Ed) return Ko;
	Ed = 1;
	function e(t, r, n) {
		var i = -1,
			a = t.length;
		r < 0 && (r = -r > a ? 0 : a + r),
			(n = n > a ? a : n),
			n < 0 && (n += a),
			(a = r > n ? 0 : (n - r) >>> 0),
			(r >>>= 0);
		for (var o = Array(a); ++i < a; ) o[i] = t[i + r];
		return o;
	}
	return (Ko = e), Ko;
}
var Vo, jd;
function iO() {
	if (jd) return Vo;
	jd = 1;
	var e = nO();
	function t(r, n, i) {
		var a = r.length;
		return (i = i === void 0 ? a : i), !n && i >= a ? r : e(r, n, i);
	}
	return (Vo = t), Vo;
}
var Xo, Md;
function Eb() {
	if (Md) return Xo;
	Md = 1;
	var e = "\\ud800-\\udfff",
		t = "\\u0300-\\u036f",
		r = "\\ufe20-\\ufe2f",
		n = "\\u20d0-\\u20ff",
		i = t + r + n,
		a = "\\ufe0e\\ufe0f",
		o = "\\u200d",
		u = RegExp("[" + o + e + i + a + "]");
	function c(s) {
		return u.test(s);
	}
	return (Xo = c), Xo;
}
var Yo, Cd;
function aO() {
	if (Cd) return Yo;
	Cd = 1;
	function e(t) {
		return t.split("");
	}
	return (Yo = e), Yo;
}
var Zo, Id;
function oO() {
	if (Id) return Zo;
	Id = 1;
	var e = "\\ud800-\\udfff",
		t = "\\u0300-\\u036f",
		r = "\\ufe20-\\ufe2f",
		n = "\\u20d0-\\u20ff",
		i = t + r + n,
		a = "\\ufe0e\\ufe0f",
		o = "[" + e + "]",
		u = "[" + i + "]",
		c = "\\ud83c[\\udffb-\\udfff]",
		s = "(?:" + u + "|" + c + ")",
		f = "[^" + e + "]",
		l = "(?:\\ud83c[\\udde6-\\uddff]){2}",
		h = "[\\ud800-\\udbff][\\udc00-\\udfff]",
		p = "\\u200d",
		y = s + "?",
		v = "[" + a + "]?",
		d = "(?:" + p + "(?:" + [f, l, h].join("|") + ")" + v + y + ")*",
		b = v + y + d,
		w = "(?:" + [f + u + "?", u, l, h, o].join("|") + ")",
		x = RegExp(c + "(?=" + c + ")|" + w + b, "g");
	function O(g) {
		return g.match(x) || [];
	}
	return (Zo = O), Zo;
}
var Jo, $d;
function uO() {
	if ($d) return Jo;
	$d = 1;
	var e = aO(),
		t = Eb(),
		r = oO();
	function n(i) {
		return t(i) ? r(i) : e(i);
	}
	return (Jo = n), Jo;
}
var Qo, Rd;
function cO() {
	if (Rd) return Qo;
	Rd = 1;
	var e = iO(),
		t = Eb(),
		r = uO(),
		n = Sb();
	function i(a) {
		return (o) => {
			o = n(o);
			var u = t(o) ? r(o) : void 0,
				c = u ? u[0] : o.charAt(0),
				s = u ? e(u, 1).join("") : o.slice(1);
			return c[a]() + s;
		};
	}
	return (Qo = i), Qo;
}
var eu, Nd;
function sO() {
	if (Nd) return eu;
	Nd = 1;
	var e = cO(),
		t = e("toUpperCase");
	return (eu = t), eu;
}
var lO = sO();
const fa = ce(lO);
function ue(e) {
	return () => e;
}
const jb = Math.cos,
	hi = Math.sin,
	Qe = Math.sqrt,
	di = Math.PI,
	ha = 2 * di,
	Vs = Math.PI,
	Xs = 2 * Vs,
	qt = 1e-6,
	fO = Xs - qt;
function Mb(e) {
	this._ += e[0];
	for (let t = 1, r = e.length; t < r; ++t) this._ += arguments[t] + e[t];
}
function hO(e) {
	const t = Math.floor(e);
	if (!(t >= 0)) throw new Error(`invalid digits: ${e}`);
	if (t > 15) return Mb;
	const r = 10 ** t;
	return function (n) {
		this._ += n[0];
		for (let i = 1, a = n.length; i < a; ++i) this._ += Math.round(arguments[i] * r) / r + n[i];
	};
}
class dO {
	constructor(t) {
		(this._x0 = this._y0 = this._x1 = this._y1 = null), (this._ = ""), (this._append = t == null ? Mb : hO(t));
	}
	moveTo(t, r) {
		this._append`M${(this._x0 = this._x1 = +t)},${(this._y0 = this._y1 = +r)}`;
	}
	closePath() {
		this._x1 !== null && ((this._x1 = this._x0), (this._y1 = this._y0), this._append`Z`);
	}
	lineTo(t, r) {
		this._append`L${(this._x1 = +t)},${(this._y1 = +r)}`;
	}
	quadraticCurveTo(t, r, n, i) {
		this._append`Q${+t},${+r},${(this._x1 = +n)},${(this._y1 = +i)}`;
	}
	bezierCurveTo(t, r, n, i, a, o) {
		this._append`C${+t},${+r},${+n},${+i},${(this._x1 = +a)},${(this._y1 = +o)}`;
	}
	arcTo(t, r, n, i, a) {
		if (((t = +t), (r = +r), (n = +n), (i = +i), (a = +a), a < 0)) throw new Error(`negative radius: ${a}`);
		const o = this._x1,
			u = this._y1,
			c = n - t,
			s = i - r,
			f = o - t,
			l = u - r,
			h = f * f + l * l;
		if (this._x1 === null) this._append`M${(this._x1 = t)},${(this._y1 = r)}`;
		else if (h > qt)
			if (!(Math.abs(l * c - s * f) > qt) || !a) this._append`L${(this._x1 = t)},${(this._y1 = r)}`;
			else {
				const p = n - o,
					y = i - u,
					v = c * c + s * s,
					d = p * p + y * y,
					b = Math.sqrt(v),
					w = Math.sqrt(h),
					x = a * Math.tan((Vs - Math.acos((v + h - d) / (2 * b * w))) / 2),
					O = x / w,
					g = x / b;
				Math.abs(O - 1) > qt && this._append`L${t + O * f},${r + O * l}`,
					this._append`A${a},${a},0,0,${+(l * p > f * y)},${(this._x1 = t + g * c)},${(this._y1 = r + g * s)}`;
			}
	}
	arc(t, r, n, i, a, o) {
		if (((t = +t), (r = +r), (n = +n), (o = !!o), n < 0)) throw new Error(`negative radius: ${n}`);
		let u = n * Math.cos(i),
			c = n * Math.sin(i),
			s = t + u,
			f = r + c,
			l = 1 ^ o,
			h = o ? i - a : a - i;
		this._x1 === null
			? this._append`M${s},${f}`
			: (Math.abs(this._x1 - s) > qt || Math.abs(this._y1 - f) > qt) && this._append`L${s},${f}`,
			n &&
				(h < 0 && (h = (h % Xs) + Xs),
				h > fO
					? this._append`A${n},${n},0,1,${l},${t - u},${r - c}A${n},${n},0,1,${l},${(this._x1 = s)},${(this._y1 = f)}`
					: h > qt &&
						this
							._append`A${n},${n},0,${+(h >= Vs)},${l},${(this._x1 = t + n * Math.cos(a))},${(this._y1 = r + n * Math.sin(a))}`);
	}
	rect(t, r, n, i) {
		this._append`M${(this._x0 = this._x1 = +t)},${(this._y0 = this._y1 = +r)}h${(n = +n)}v${+i}h${-n}Z`;
	}
	toString() {
		return this._;
	}
}
function vf(e) {
	let t = 3;
	return (
		(e.digits = (r) => {
			if (!arguments.length) return t;
			if (r == null) t = null;
			else {
				const n = Math.floor(r);
				if (!(n >= 0)) throw new RangeError(`invalid digits: ${r}`);
				t = n;
			}
			return e;
		}),
		() => new dO(t)
	);
}
function yf(e) {
	return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function Cb(e) {
	this._context = e;
}
Cb.prototype = {
	areaStart: function () {
		this._line = 0;
	},
	areaEnd: function () {
		this._line = Number.NaN;
	},
	lineStart: function () {
		this._point = 0;
	},
	lineEnd: function () {
		(this._line || (this._line !== 0 && this._point === 1)) && this._context.closePath(), (this._line = 1 - this._line);
	},
	point: function (e, t) {
		switch (((e = +e), (t = +t), this._point)) {
			case 0:
				(this._point = 1), this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
				break;
			case 1:
				this._point = 2;
			default:
				this._context.lineTo(e, t);
				break;
		}
	},
};
function da(e) {
	return new Cb(e);
}
function Ib(e) {
	return e[0];
}
function $b(e) {
	return e[1];
}
function Rb(e, t) {
	var r = ue(!0),
		n = null,
		i = da,
		a = null,
		o = vf(u);
	(e = typeof e == "function" ? e : e === void 0 ? Ib : ue(e)),
		(t = typeof t == "function" ? t : t === void 0 ? $b : ue(t));
	function u(c) {
		var s,
			f = (c = yf(c)).length,
			l,
			h = !1,
			p;
		for (n == null && (a = i((p = o()))), s = 0; s <= f; ++s)
			!(s < f && r((l = c[s]), s, c)) === h && ((h = !h) ? a.lineStart() : a.lineEnd()),
				h && a.point(+e(l, s, c), +t(l, s, c));
		if (p) return (a = null), p + "" || null;
	}
	return (
		(u.x = (c) => (arguments.length ? ((e = typeof c == "function" ? c : ue(+c)), u) : e)),
		(u.y = (c) => (arguments.length ? ((t = typeof c == "function" ? c : ue(+c)), u) : t)),
		(u.defined = (c) => (arguments.length ? ((r = typeof c == "function" ? c : ue(!!c)), u) : r)),
		(u.curve = (c) => (arguments.length ? ((i = c), n != null && (a = i(n)), u) : i)),
		(u.context = (c) => (arguments.length ? (c == null ? (n = a = null) : (a = i((n = c))), u) : n)),
		u
	);
}
function Zn(e, t, r) {
	var n = null,
		i = ue(!0),
		a = null,
		o = da,
		u = null,
		c = vf(s);
	(e = typeof e == "function" ? e : e === void 0 ? Ib : ue(+e)),
		(t = typeof t == "function" ? t : ue(t === void 0 ? 0 : +t)),
		(r = typeof r == "function" ? r : r === void 0 ? $b : ue(+r));
	function s(l) {
		var h,
			p,
			y,
			v = (l = yf(l)).length,
			d,
			b = !1,
			w,
			x = new Array(v),
			O = new Array(v);
		for (a == null && (u = o((w = c()))), h = 0; h <= v; ++h) {
			if (!(h < v && i((d = l[h]), h, l)) === b)
				if ((b = !b)) (p = h), u.areaStart(), u.lineStart();
				else {
					for (u.lineEnd(), u.lineStart(), y = h - 1; y >= p; --y) u.point(x[y], O[y]);
					u.lineEnd(), u.areaEnd();
				}
			b && ((x[h] = +e(d, h, l)), (O[h] = +t(d, h, l)), u.point(n ? +n(d, h, l) : x[h], r ? +r(d, h, l) : O[h]));
		}
		if (w) return (u = null), w + "" || null;
	}
	function f() {
		return Rb().defined(i).curve(o).context(a);
	}
	return (
		(s.x = (l) => (arguments.length ? ((e = typeof l == "function" ? l : ue(+l)), (n = null), s) : e)),
		(s.x0 = (l) => (arguments.length ? ((e = typeof l == "function" ? l : ue(+l)), s) : e)),
		(s.x1 = (l) => (arguments.length ? ((n = l == null ? null : typeof l == "function" ? l : ue(+l)), s) : n)),
		(s.y = (l) => (arguments.length ? ((t = typeof l == "function" ? l : ue(+l)), (r = null), s) : t)),
		(s.y0 = (l) => (arguments.length ? ((t = typeof l == "function" ? l : ue(+l)), s) : t)),
		(s.y1 = (l) => (arguments.length ? ((r = l == null ? null : typeof l == "function" ? l : ue(+l)), s) : r)),
		(s.lineX0 = s.lineY0 = () => f().x(e).y(t)),
		(s.lineY1 = () => f().x(e).y(r)),
		(s.lineX1 = () => f().x(n).y(t)),
		(s.defined = (l) => (arguments.length ? ((i = typeof l == "function" ? l : ue(!!l)), s) : i)),
		(s.curve = (l) => (arguments.length ? ((o = l), a != null && (u = o(a)), s) : o)),
		(s.context = (l) => (arguments.length ? (l == null ? (a = u = null) : (u = o((a = l))), s) : a)),
		s
	);
}
class Nb {
	constructor(t, r) {
		(this._context = t), (this._x = r);
	}
	areaStart() {
		this._line = 0;
	}
	areaEnd() {
		this._line = Number.NaN;
	}
	lineStart() {
		this._point = 0;
	}
	lineEnd() {
		(this._line || (this._line !== 0 && this._point === 1)) && this._context.closePath(), (this._line = 1 - this._line);
	}
	point(t, r) {
		switch (((t = +t), (r = +r), this._point)) {
			case 0: {
				(this._point = 1), this._line ? this._context.lineTo(t, r) : this._context.moveTo(t, r);
				break;
			}
			case 1:
				this._point = 2;
			default: {
				this._x
					? this._context.bezierCurveTo((this._x0 = (this._x0 + t) / 2), this._y0, this._x0, r, t, r)
					: this._context.bezierCurveTo(this._x0, (this._y0 = (this._y0 + r) / 2), t, this._y0, t, r);
				break;
			}
		}
		(this._x0 = t), (this._y0 = r);
	}
}
function pO(e) {
	return new Nb(e, !0);
}
function vO(e) {
	return new Nb(e, !1);
}
const gf = {
		draw(e, t) {
			const r = Qe(t / di);
			e.moveTo(r, 0), e.arc(0, 0, r, 0, ha);
		},
	},
	yO = {
		draw(e, t) {
			const r = Qe(t / 5) / 2;
			e.moveTo(-3 * r, -r),
				e.lineTo(-r, -r),
				e.lineTo(-r, -3 * r),
				e.lineTo(r, -3 * r),
				e.lineTo(r, -r),
				e.lineTo(3 * r, -r),
				e.lineTo(3 * r, r),
				e.lineTo(r, r),
				e.lineTo(r, 3 * r),
				e.lineTo(-r, 3 * r),
				e.lineTo(-r, r),
				e.lineTo(-3 * r, r),
				e.closePath();
		},
	},
	kb = Qe(1 / 3),
	gO = kb * 2,
	mO = {
		draw(e, t) {
			const r = Qe(t / gO),
				n = r * kb;
			e.moveTo(0, -r), e.lineTo(n, 0), e.lineTo(0, r), e.lineTo(-n, 0), e.closePath();
		},
	},
	bO = {
		draw(e, t) {
			const r = Qe(t),
				n = -r / 2;
			e.rect(n, n, r, r);
		},
	},
	xO = 0.8908130915292852,
	Db = hi(di / 10) / hi((7 * di) / 10),
	wO = hi(ha / 10) * Db,
	OO = -jb(ha / 10) * Db,
	_O = {
		draw(e, t) {
			const r = Qe(t * xO),
				n = wO * r,
				i = OO * r;
			e.moveTo(0, -r), e.lineTo(n, i);
			for (let a = 1; a < 5; ++a) {
				const o = (ha * a) / 5,
					u = jb(o),
					c = hi(o);
				e.lineTo(c * r, -u * r), e.lineTo(u * n - c * i, c * n + u * i);
			}
			e.closePath();
		},
	},
	tu = Qe(3),
	SO = {
		draw(e, t) {
			const r = -Qe(t / (tu * 3));
			e.moveTo(0, r * 2), e.lineTo(-tu * r, -r), e.lineTo(tu * r, -r), e.closePath();
		},
	},
	Be = -0.5,
	Fe = Qe(3) / 2,
	Ys = 1 / Qe(12),
	AO = (Ys / 2 + 1) * 3,
	PO = {
		draw(e, t) {
			const r = Qe(t / AO),
				n = r / 2,
				i = r * Ys,
				a = n,
				o = r * Ys + r,
				u = -a,
				c = o;
			e.moveTo(n, i),
				e.lineTo(a, o),
				e.lineTo(u, c),
				e.lineTo(Be * n - Fe * i, Fe * n + Be * i),
				e.lineTo(Be * a - Fe * o, Fe * a + Be * o),
				e.lineTo(Be * u - Fe * c, Fe * u + Be * c),
				e.lineTo(Be * n + Fe * i, Be * i - Fe * n),
				e.lineTo(Be * a + Fe * o, Be * o - Fe * a),
				e.lineTo(Be * u + Fe * c, Be * c - Fe * u),
				e.closePath();
		},
	};
function TO(e, t) {
	let r = null,
		n = vf(i);
	(e = typeof e == "function" ? e : ue(e || gf)), (t = typeof t == "function" ? t : ue(t === void 0 ? 64 : +t));
	function i() {
		let a;
		if ((r || (r = a = n()), e.apply(this, arguments).draw(r, +t.apply(this, arguments)), a))
			return (r = null), a + "" || null;
	}
	return (
		(i.type = (a) => (arguments.length ? ((e = typeof a == "function" ? a : ue(a)), i) : e)),
		(i.size = (a) => (arguments.length ? ((t = typeof a == "function" ? a : ue(+a)), i) : t)),
		(i.context = (a) => (arguments.length ? ((r = a ?? null), i) : r)),
		i
	);
}
function pi() {}
function vi(e, t, r) {
	e._context.bezierCurveTo(
		(2 * e._x0 + e._x1) / 3,
		(2 * e._y0 + e._y1) / 3,
		(e._x0 + 2 * e._x1) / 3,
		(e._y0 + 2 * e._y1) / 3,
		(e._x0 + 4 * e._x1 + t) / 6,
		(e._y0 + 4 * e._y1 + r) / 6,
	);
}
function qb(e) {
	this._context = e;
}
qb.prototype = {
	areaStart: function () {
		this._line = 0;
	},
	areaEnd: function () {
		this._line = Number.NaN;
	},
	lineStart: function () {
		(this._x0 = this._x1 = this._y0 = this._y1 = Number.NaN), (this._point = 0);
	},
	lineEnd: function () {
		switch (this._point) {
			case 3:
				vi(this, this._x1, this._y1);
			case 2:
				this._context.lineTo(this._x1, this._y1);
				break;
		}
		(this._line || (this._line !== 0 && this._point === 1)) && this._context.closePath(), (this._line = 1 - this._line);
	},
	point: function (e, t) {
		switch (((e = +e), (t = +t), this._point)) {
			case 0:
				(this._point = 1), this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
				break;
			case 1:
				this._point = 2;
				break;
			case 2:
				(this._point = 3), this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6);
			default:
				vi(this, e, t);
				break;
		}
		(this._x0 = this._x1), (this._x1 = e), (this._y0 = this._y1), (this._y1 = t);
	},
};
function EO(e) {
	return new qb(e);
}
function Lb(e) {
	this._context = e;
}
Lb.prototype = {
	areaStart: pi,
	areaEnd: pi,
	lineStart: function () {
		(this._x0 =
			this._x1 =
			this._x2 =
			this._x3 =
			this._x4 =
			this._y0 =
			this._y1 =
			this._y2 =
			this._y3 =
			this._y4 =
				Number.NaN),
			(this._point = 0);
	},
	lineEnd: function () {
		switch (this._point) {
			case 1: {
				this._context.moveTo(this._x2, this._y2), this._context.closePath();
				break;
			}
			case 2: {
				this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3),
					this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3),
					this._context.closePath();
				break;
			}
			case 3: {
				this.point(this._x2, this._y2), this.point(this._x3, this._y3), this.point(this._x4, this._y4);
				break;
			}
		}
	},
	point: function (e, t) {
		switch (((e = +e), (t = +t), this._point)) {
			case 0:
				(this._point = 1), (this._x2 = e), (this._y2 = t);
				break;
			case 1:
				(this._point = 2), (this._x3 = e), (this._y3 = t);
				break;
			case 2:
				(this._point = 3),
					(this._x4 = e),
					(this._y4 = t),
					this._context.moveTo((this._x0 + 4 * this._x1 + e) / 6, (this._y0 + 4 * this._y1 + t) / 6);
				break;
			default:
				vi(this, e, t);
				break;
		}
		(this._x0 = this._x1), (this._x1 = e), (this._y0 = this._y1), (this._y1 = t);
	},
};
function jO(e) {
	return new Lb(e);
}
function Bb(e) {
	this._context = e;
}
Bb.prototype = {
	areaStart: function () {
		this._line = 0;
	},
	areaEnd: function () {
		this._line = Number.NaN;
	},
	lineStart: function () {
		(this._x0 = this._x1 = this._y0 = this._y1 = Number.NaN), (this._point = 0);
	},
	lineEnd: function () {
		(this._line || (this._line !== 0 && this._point === 3)) && this._context.closePath(), (this._line = 1 - this._line);
	},
	point: function (e, t) {
		switch (((e = +e), (t = +t), this._point)) {
			case 0:
				this._point = 1;
				break;
			case 1:
				this._point = 2;
				break;
			case 2:
				this._point = 3;
				var r = (this._x0 + 4 * this._x1 + e) / 6,
					n = (this._y0 + 4 * this._y1 + t) / 6;
				this._line ? this._context.lineTo(r, n) : this._context.moveTo(r, n);
				break;
			case 3:
				this._point = 4;
			default:
				vi(this, e, t);
				break;
		}
		(this._x0 = this._x1), (this._x1 = e), (this._y0 = this._y1), (this._y1 = t);
	},
};
function MO(e) {
	return new Bb(e);
}
function Fb(e) {
	this._context = e;
}
Fb.prototype = {
	areaStart: pi,
	areaEnd: pi,
	lineStart: function () {
		this._point = 0;
	},
	lineEnd: function () {
		this._point && this._context.closePath();
	},
	point: function (e, t) {
		(e = +e), (t = +t), this._point ? this._context.lineTo(e, t) : ((this._point = 1), this._context.moveTo(e, t));
	},
};
function CO(e) {
	return new Fb(e);
}
function kd(e) {
	return e < 0 ? -1 : 1;
}
function Dd(e, t, r) {
	var n = e._x1 - e._x0,
		i = t - e._x1,
		a = (e._y1 - e._y0) / (n || (i < 0 && -0)),
		o = (r - e._y1) / (i || (n < 0 && -0)),
		u = (a * i + o * n) / (n + i);
	return (kd(a) + kd(o)) * Math.min(Math.abs(a), Math.abs(o), 0.5 * Math.abs(u)) || 0;
}
function qd(e, t) {
	var r = e._x1 - e._x0;
	return r ? ((3 * (e._y1 - e._y0)) / r - t) / 2 : t;
}
function ru(e, t, r) {
	var n = e._x0,
		i = e._y0,
		a = e._x1,
		o = e._y1,
		u = (a - n) / 3;
	e._context.bezierCurveTo(n + u, i + u * t, a - u, o - u * r, a, o);
}
function yi(e) {
	this._context = e;
}
yi.prototype = {
	areaStart: function () {
		this._line = 0;
	},
	areaEnd: function () {
		this._line = Number.NaN;
	},
	lineStart: function () {
		(this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = Number.NaN), (this._point = 0);
	},
	lineEnd: function () {
		switch (this._point) {
			case 2:
				this._context.lineTo(this._x1, this._y1);
				break;
			case 3:
				ru(this, this._t0, qd(this, this._t0));
				break;
		}
		(this._line || (this._line !== 0 && this._point === 1)) && this._context.closePath(), (this._line = 1 - this._line);
	},
	point: function (e, t) {
		var r = Number.NaN;
		if (((e = +e), (t = +t), !(e === this._x1 && t === this._y1))) {
			switch (this._point) {
				case 0:
					(this._point = 1), this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
					break;
				case 1:
					this._point = 2;
					break;
				case 2:
					(this._point = 3), ru(this, qd(this, (r = Dd(this, e, t))), r);
					break;
				default:
					ru(this, this._t0, (r = Dd(this, e, t)));
					break;
			}
			(this._x0 = this._x1), (this._x1 = e), (this._y0 = this._y1), (this._y1 = t), (this._t0 = r);
		}
	},
};
function Ub(e) {
	this._context = new zb(e);
}
(Ub.prototype = Object.create(yi.prototype)).point = function (e, t) {
	yi.prototype.point.call(this, t, e);
};
function zb(e) {
	this._context = e;
}
zb.prototype = {
	moveTo: function (e, t) {
		this._context.moveTo(t, e);
	},
	closePath: function () {
		this._context.closePath();
	},
	lineTo: function (e, t) {
		this._context.lineTo(t, e);
	},
	bezierCurveTo: function (e, t, r, n, i, a) {
		this._context.bezierCurveTo(t, e, n, r, a, i);
	},
};
function IO(e) {
	return new yi(e);
}
function $O(e) {
	return new Ub(e);
}
function Wb(e) {
	this._context = e;
}
Wb.prototype = {
	areaStart: function () {
		this._line = 0;
	},
	areaEnd: function () {
		this._line = Number.NaN;
	},
	lineStart: function () {
		(this._x = []), (this._y = []);
	},
	lineEnd: function () {
		var e = this._x,
			t = this._y,
			r = e.length;
		if (r)
			if ((this._line ? this._context.lineTo(e[0], t[0]) : this._context.moveTo(e[0], t[0]), r === 2))
				this._context.lineTo(e[1], t[1]);
			else
				for (var n = Ld(e), i = Ld(t), a = 0, o = 1; o < r; ++a, ++o)
					this._context.bezierCurveTo(n[0][a], i[0][a], n[1][a], i[1][a], e[o], t[o]);
		(this._line || (this._line !== 0 && r === 1)) && this._context.closePath(),
			(this._line = 1 - this._line),
			(this._x = this._y = null);
	},
	point: function (e, t) {
		this._x.push(+e), this._y.push(+t);
	},
};
function Ld(e) {
	var t,
		r = e.length - 1,
		n,
		i = new Array(r),
		a = new Array(r),
		o = new Array(r);
	for (i[0] = 0, a[0] = 2, o[0] = e[0] + 2 * e[1], t = 1; t < r - 1; ++t)
		(i[t] = 1), (a[t] = 4), (o[t] = 4 * e[t] + 2 * e[t + 1]);
	for (i[r - 1] = 2, a[r - 1] = 7, o[r - 1] = 8 * e[r - 1] + e[r], t = 1; t < r; ++t)
		(n = i[t] / a[t - 1]), (a[t] -= n), (o[t] -= n * o[t - 1]);
	for (i[r - 1] = o[r - 1] / a[r - 1], t = r - 2; t >= 0; --t) i[t] = (o[t] - i[t + 1]) / a[t];
	for (a[r - 1] = (e[r] + i[r - 1]) / 2, t = 0; t < r - 1; ++t) a[t] = 2 * e[t + 1] - i[t + 1];
	return [i, a];
}
function RO(e) {
	return new Wb(e);
}
function pa(e, t) {
	(this._context = e), (this._t = t);
}
pa.prototype = {
	areaStart: function () {
		this._line = 0;
	},
	areaEnd: function () {
		this._line = Number.NaN;
	},
	lineStart: function () {
		(this._x = this._y = Number.NaN), (this._point = 0);
	},
	lineEnd: function () {
		0 < this._t && this._t < 1 && this._point === 2 && this._context.lineTo(this._x, this._y),
			(this._line || (this._line !== 0 && this._point === 1)) && this._context.closePath(),
			this._line >= 0 && ((this._t = 1 - this._t), (this._line = 1 - this._line));
	},
	point: function (e, t) {
		switch (((e = +e), (t = +t), this._point)) {
			case 0:
				(this._point = 1), this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
				break;
			case 1:
				this._point = 2;
			default: {
				if (this._t <= 0) this._context.lineTo(this._x, t), this._context.lineTo(e, t);
				else {
					var r = this._x * (1 - this._t) + e * this._t;
					this._context.lineTo(r, this._y), this._context.lineTo(r, t);
				}
				break;
			}
		}
		(this._x = e), (this._y = t);
	},
};
function NO(e) {
	return new pa(e, 0.5);
}
function kO(e) {
	return new pa(e, 0);
}
function DO(e) {
	return new pa(e, 1);
}
function hr(e, t) {
	if ((o = e.length) > 1)
		for (var r = 1, n, i, a = e[t[0]], o, u = a.length; r < o; ++r)
			for (i = a, a = e[t[r]], n = 0; n < u; ++n) a[n][1] += a[n][0] = isNaN(i[n][1]) ? i[n][0] : i[n][1];
}
function Zs(e) {
	for (var t = e.length, r = new Array(t); --t >= 0; ) r[t] = t;
	return r;
}
function qO(e, t) {
	return e[t];
}
function LO(e) {
	const t = [];
	return (t.key = e), t;
}
function BO() {
	var e = ue([]),
		t = Zs,
		r = hr,
		n = qO;
	function i(a) {
		var o = Array.from(e.apply(this, arguments), LO),
			u,
			c = o.length,
			s = -1,
			f;
		for (const l of a) for (u = 0, ++s; u < c; ++u) (o[u][s] = [0, +n(l, o[u].key, s, a)]).data = l;
		for (u = 0, f = yf(t(o)); u < c; ++u) o[f[u]].index = u;
		return r(o, f), o;
	}
	return (
		(i.keys = (a) => (arguments.length ? ((e = typeof a == "function" ? a : ue(Array.from(a))), i) : e)),
		(i.value = (a) => (arguments.length ? ((n = typeof a == "function" ? a : ue(+a)), i) : n)),
		(i.order = (a) =>
			arguments.length ? ((t = a == null ? Zs : typeof a == "function" ? a : ue(Array.from(a))), i) : t),
		(i.offset = (a) => (arguments.length ? ((r = a ?? hr), i) : r)),
		i
	);
}
function FO(e, t) {
	if ((n = e.length) > 0) {
		for (var r, n, i = 0, a = e[0].length, o; i < a; ++i) {
			for (o = r = 0; r < n; ++r) o += e[r][i][1] || 0;
			if (o) for (r = 0; r < n; ++r) e[r][i][1] /= o;
		}
		hr(e, t);
	}
}
function UO(e, t) {
	if ((i = e.length) > 0) {
		for (var r = 0, n = e[t[0]], i, a = n.length; r < a; ++r) {
			for (var o = 0, u = 0; o < i; ++o) u += e[o][r][1] || 0;
			n[r][1] += n[r][0] = -u / 2;
		}
		hr(e, t);
	}
}
function zO(e, t) {
	if (!(!((o = e.length) > 0) || !((a = (i = e[t[0]]).length) > 0))) {
		for (var r = 0, n = 1, i, a, o; n < a; ++n) {
			for (var u = 0, c = 0, s = 0; u < o; ++u) {
				for (var f = e[t[u]], l = f[n][1] || 0, h = f[n - 1][1] || 0, p = (l - h) / 2, y = 0; y < u; ++y) {
					var v = e[t[y]],
						d = v[n][1] || 0,
						b = v[n - 1][1] || 0;
					p += d - b;
				}
				(c += l), (s += p * l);
			}
			(i[n - 1][1] += i[n - 1][0] = r), c && (r -= s / c);
		}
		(i[n - 1][1] += i[n - 1][0] = r), hr(e, t);
	}
}
function an(e) {
	"@babel/helpers - typeof";
	return (
		(an =
			typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
				? (t) => typeof t
				: (t) =>
						t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
							? "symbol"
							: typeof t),
		an(e)
	);
}
var WO = ["type", "size", "sizeType"];
function Js() {
	return (
		(Js = Object.assign
			? Object.assign.bind()
			: (e) => {
					for (var t = 1; t < arguments.length; t++) {
						var r = arguments[t];
						for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
					}
					return e;
				}),
		Js.apply(this, arguments)
	);
}
function Bd(e, t) {
	var r = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		t && (n = n.filter((i) => Object.getOwnPropertyDescriptor(e, i).enumerable)), r.push.apply(r, n);
	}
	return r;
}
function Fd(e) {
	for (var t = 1; t < arguments.length; t++) {
		var r = arguments[t] != null ? arguments[t] : {};
		t % 2
			? Bd(Object(r), !0).forEach((n) => {
					GO(e, n, r[n]);
				})
			: Object.getOwnPropertyDescriptors
				? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
				: Bd(Object(r)).forEach((n) => {
						Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
					});
	}
	return e;
}
function GO(e, t, r) {
	return (
		(t = HO(t)),
		t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = r),
		e
	);
}
function HO(e) {
	var t = KO(e, "string");
	return an(t) == "symbol" ? t : t + "";
}
function KO(e, t) {
	if (an(e) != "object" || !e) return e;
	var r = e[Symbol.toPrimitive];
	if (r !== void 0) {
		var n = r.call(e, t);
		if (an(n) != "object") return n;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function VO(e, t) {
	if (e == null) return {};
	var r = XO(e, t),
		n,
		i;
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (i = 0; i < a.length; i++)
			(n = a[i]), !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
	}
	return r;
}
function XO(e, t) {
	if (e == null) return {};
	var r = {};
	for (var n in e)
		if (Object.prototype.hasOwnProperty.call(e, n)) {
			if (t.indexOf(n) >= 0) continue;
			r[n] = e[n];
		}
	return r;
}
var Gb = {
		symbolCircle: gf,
		symbolCross: yO,
		symbolDiamond: mO,
		symbolSquare: bO,
		symbolStar: _O,
		symbolTriangle: SO,
		symbolWye: PO,
	},
	YO = Math.PI / 180,
	ZO = (t) => {
		var r = "symbol".concat(fa(t));
		return Gb[r] || gf;
	},
	JO = (t, r, n) => {
		if (r === "area") return t;
		switch (n) {
			case "cross":
				return (5 * t * t) / 9;
			case "diamond":
				return (0.5 * t * t) / Math.sqrt(3);
			case "square":
				return t * t;
			case "star": {
				var i = 18 * YO;
				return 1.25 * t * t * (Math.tan(i) - Math.tan(i * 2) * Math.pow(Math.tan(i), 2));
			}
			case "triangle":
				return (Math.sqrt(3) * t * t) / 4;
			case "wye":
				return ((21 - 10 * Math.sqrt(3)) * t * t) / 8;
			default:
				return (Math.PI * t * t) / 4;
		}
	},
	QO = (t, r) => {
		Gb["symbol".concat(fa(t))] = r;
	},
	mf = (t) => {
		var r = t.type,
			n = r === void 0 ? "circle" : r,
			i = t.size,
			a = i === void 0 ? 64 : i,
			o = t.sizeType,
			u = o === void 0 ? "area" : o,
			c = VO(t, WO),
			s = Fd(Fd({}, c), {}, { type: n, size: a, sizeType: u }),
			f = () => {
				var d = ZO(n),
					b = TO()
						.type(d)
						.size(JO(a, u, n));
				return b();
			},
			l = s.className,
			h = s.cx,
			p = s.cy,
			y = ee(s, !0);
		return h === +h && p === +p && a === +a
			? T.createElement(
					"path",
					Js({}, y, {
						className: ie("recharts-symbols", l),
						transform: "translate(".concat(h, ", ").concat(p, ")"),
						d: f(),
					}),
				)
			: null;
	};
mf.registerSymbol = QO;
function dr(e) {
	"@babel/helpers - typeof";
	return (
		(dr =
			typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
				? (t) => typeof t
				: (t) =>
						t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
							? "symbol"
							: typeof t),
		dr(e)
	);
}
function Qs() {
	return (
		(Qs = Object.assign
			? Object.assign.bind()
			: (e) => {
					for (var t = 1; t < arguments.length; t++) {
						var r = arguments[t];
						for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
					}
					return e;
				}),
		Qs.apply(this, arguments)
	);
}
function Ud(e, t) {
	var r = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		t && (n = n.filter((i) => Object.getOwnPropertyDescriptor(e, i).enumerable)), r.push.apply(r, n);
	}
	return r;
}
function e_(e) {
	for (var t = 1; t < arguments.length; t++) {
		var r = arguments[t] != null ? arguments[t] : {};
		t % 2
			? Ud(Object(r), !0).forEach((n) => {
					on(e, n, r[n]);
				})
			: Object.getOwnPropertyDescriptors
				? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
				: Ud(Object(r)).forEach((n) => {
						Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
					});
	}
	return e;
}
function t_(e, t) {
	if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function r_(e, t) {
	for (var r = 0; r < t.length; r++) {
		var n = t[r];
		(n.enumerable = n.enumerable || !1),
			(n.configurable = !0),
			"value" in n && (n.writable = !0),
			Object.defineProperty(e, Kb(n.key), n);
	}
}
function n_(e, t, r) {
	return t && r_(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function i_(e, t, r) {
	return (t = gi(t)), a_(e, Hb() ? Reflect.construct(t, r || [], gi(e).constructor) : t.apply(e, r));
}
function a_(e, t) {
	if (t && (dr(t) === "object" || typeof t == "function")) return t;
	if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
	return o_(e);
}
function o_(e) {
	if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	return e;
}
function Hb() {
	try {
		var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], () => {}));
	} catch {}
	return (Hb = () => !!e)();
}
function gi(e) {
	return (
		(gi = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : (r) => r.__proto__ || Object.getPrototypeOf(r)), gi(e)
	);
}
function u_(e, t) {
	if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
	(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } })),
		Object.defineProperty(e, "prototype", { writable: !1 }),
		t && el(e, t);
}
function el(e, t) {
	return (el = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : (n, i) => ((n.__proto__ = i), n)), el(e, t);
}
function on(e, t, r) {
	return (
		(t = Kb(t)),
		t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = r),
		e
	);
}
function Kb(e) {
	var t = c_(e, "string");
	return dr(t) == "symbol" ? t : t + "";
}
function c_(e, t) {
	if (dr(e) != "object" || !e) return e;
	var r = e[Symbol.toPrimitive];
	if (r !== void 0) {
		var n = r.call(e, t);
		if (dr(n) != "object") return n;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return String(e);
}
var He = 32,
	bf = ((e) => {
		function t() {
			return t_(this, t), i_(this, t, arguments);
		}
		return (
			u_(t, e),
			n_(t, [
				{
					key: "renderIcon",
					value: function (n) {
						var i = this.props.inactiveColor,
							a = He / 2,
							o = He / 6,
							u = He / 3,
							c = n.inactive ? i : n.color;
						if (n.type === "plainline")
							return T.createElement("line", {
								strokeWidth: 4,
								fill: "none",
								stroke: c,
								strokeDasharray: n.payload.strokeDasharray,
								x1: 0,
								y1: a,
								x2: He,
								y2: a,
								className: "recharts-legend-icon",
							});
						if (n.type === "line")
							return T.createElement("path", {
								strokeWidth: 4,
								fill: "none",
								stroke: c,
								d: "M0,"
									.concat(a, "h")
									.concat(
										u,
										`
            A`,
									)
									.concat(o, ",")
									.concat(o, ",0,1,1,")
									.concat(2 * u, ",")
									.concat(
										a,
										`
            H`,
									)
									.concat(He, "M")
									.concat(2 * u, ",")
									.concat(
										a,
										`
            A`,
									)
									.concat(o, ",")
									.concat(o, ",0,1,1,")
									.concat(u, ",")
									.concat(a),
								className: "recharts-legend-icon",
							});
						if (n.type === "rect")
							return T.createElement("path", {
								stroke: "none",
								fill: c,
								d: "M0,"
									.concat(He / 8, "h")
									.concat(He, "v")
									.concat((He * 3) / 4, "h")
									.concat(-32, "z"),
								className: "recharts-legend-icon",
							});
						if (T.isValidElement(n.legendIcon)) {
							var s = e_({}, n);
							return delete s.legendIcon, T.cloneElement(n.legendIcon, s);
						}
						return T.createElement(mf, { fill: c, cx: a, cy: a, size: He, sizeType: "diameter", type: n.type });
					},
				},
				{
					key: "renderItems",
					value: function () {
						var i = this.props,
							a = i.payload,
							o = i.iconSize,
							u = i.layout,
							c = i.formatter,
							s = i.inactiveColor,
							f = { x: 0, y: 0, width: He, height: He },
							l = { display: u === "horizontal" ? "inline-block" : "block", marginRight: 10 },
							h = { display: "inline-block", verticalAlign: "middle", marginRight: 4 };
						return a.map((p, y) => {
							var v = p.formatter || c,
								d = ie(on(on({ "recharts-legend-item": !0 }, "legend-item-".concat(y), !0), "inactive", p.inactive));
							if (p.type === "none") return null;
							var b = Z(p.value) ? null : p.value;
							pt(
								!Z(p.value),
								`The name property is also required when using a function for the dataKey of a chart's cartesian components. Ex: <Bar name="Name of my Data"/>`,
							);
							var w = p.inactive ? s : p.color;
							return T.createElement(
								"li",
								Qs({ className: d, style: l, key: "legend-item-".concat(y) }, fi(this.props, p, y)),
								T.createElement(Hs, { width: o, height: o, viewBox: f, style: h }, this.renderIcon(p)),
								T.createElement(
									"span",
									{ className: "recharts-legend-item-text", style: { color: w } },
									v ? v(b, p, y) : b,
								),
							);
						});
					},
				},
				{
					key: "render",
					value: function () {
						var n = this.props,
							i = n.payload,
							a = n.layout,
							o = n.align;
						if (!i || !i.length) return null;
						var u = { padding: 0, margin: 0, textAlign: a === "horizontal" ? o : "left" };
						return T.createElement("ul", { className: "recharts-default-legend", style: u }, this.renderItems());
					},
				},
			])
		);
	})(k.PureComponent);
on(bf, "displayName", "Legend");
on(bf, "defaultProps", {
	iconSize: 14,
	layout: "horizontal",
	align: "center",
	verticalAlign: "middle",
	inactiveColor: "#ccc",
});
var nu, zd;
function s_() {
	if (zd) return nu;
	zd = 1;
	var e = ua();
	function t() {
		(this.__data__ = new e()), (this.size = 0);
	}
	return (nu = t), nu;
}
var iu, Wd;
function l_() {
	if (Wd) return iu;
	Wd = 1;
	function e(t) {
		var r = this.__data__,
			n = r.delete(t);
		return (this.size = r.size), n;
	}
	return (iu = e), iu;
}
var au, Gd;
function f_() {
	if (Gd) return au;
	Gd = 1;
	function e(t) {
		return this.__data__.get(t);
	}
	return (au = e), au;
}
var ou, Hd;
function h_() {
	if (Hd) return ou;
	Hd = 1;
	function e(t) {
		return this.__data__.has(t);
	}
	return (ou = e), ou;
}
var uu, Kd;
function d_() {
	if (Kd) return uu;
	Kd = 1;
	var e = ua(),
		t = sf(),
		r = lf(),
		n = 200;
	function i(a, o) {
		var u = this.__data__;
		if (u instanceof e) {
			var c = u.__data__;
			if (!t || c.length < n - 1) return c.push([a, o]), (this.size = ++u.size), this;
			u = this.__data__ = new r(c);
		}
		return u.set(a, o), (this.size = u.size), this;
	}
	return (uu = i), uu;
}
var cu, Vd;
function Vb() {
	if (Vd) return cu;
	Vd = 1;
	var e = ua(),
		t = s_(),
		r = l_(),
		n = f_(),
		i = h_(),
		a = d_();
	function o(u) {
		var c = (this.__data__ = new e(u));
		this.size = c.size;
	}
	return (
		(o.prototype.clear = t),
		(o.prototype.delete = r),
		(o.prototype.get = n),
		(o.prototype.has = i),
		(o.prototype.set = a),
		(cu = o),
		cu
	);
}
var su, Xd;
function p_() {
	if (Xd) return su;
	Xd = 1;
	var e = "__lodash_hash_undefined__";
	function t(r) {
		return this.__data__.set(r, e), this;
	}
	return (su = t), su;
}
var lu, Yd;
function v_() {
	if (Yd) return lu;
	Yd = 1;
	function e(t) {
		return this.__data__.has(t);
	}
	return (lu = e), lu;
}
var fu, Zd;
function Xb() {
	if (Zd) return fu;
	Zd = 1;
	var e = lf(),
		t = p_(),
		r = v_();
	function n(i) {
		var a = -1,
			o = i == null ? 0 : i.length;
		for (this.__data__ = new e(); ++a < o; ) this.add(i[a]);
	}
	return (n.prototype.add = n.prototype.push = t), (n.prototype.has = r), (fu = n), fu;
}
var hu, Jd;
function Yb() {
	if (Jd) return hu;
	Jd = 1;
	function e(t, r) {
		for (var n = -1, i = t == null ? 0 : t.length; ++n < i; ) if (r(t[n], n, t)) return !0;
		return !1;
	}
	return (hu = e), hu;
}
var du, Qd;
function Zb() {
	if (Qd) return du;
	Qd = 1;
	function e(t, r) {
		return t.has(r);
	}
	return (du = e), du;
}
var pu, ep;
function Jb() {
	if (ep) return pu;
	ep = 1;
	var e = Xb(),
		t = Yb(),
		r = Zb(),
		n = 1,
		i = 2;
	function a(o, u, c, s, f, l) {
		var h = c & n,
			p = o.length,
			y = u.length;
		if (p != y && !(h && y > p)) return !1;
		var v = l.get(o),
			d = l.get(u);
		if (v && d) return v == u && d == o;
		var b = -1,
			w = !0,
			x = c & i ? new e() : void 0;
		for (l.set(o, u), l.set(u, o); ++b < p; ) {
			var O = o[b],
				g = u[b];
			if (s) var m = h ? s(g, O, b, u, o, l) : s(O, g, b, o, u, l);
			if (m !== void 0) {
				if (m) continue;
				w = !1;
				break;
			}
			if (x) {
				if (
					!t(u, (_, S) => {
						if (!r(x, S) && (O === _ || f(O, _, c, s, l))) return x.push(S);
					})
				) {
					w = !1;
					break;
				}
			} else if (!(O === g || f(O, g, c, s, l))) {
				w = !1;
				break;
			}
		}
		return l.delete(o), l.delete(u), w;
	}
	return (pu = a), pu;
}
var vu, tp;
function y_() {
	if (tp) return vu;
	tp = 1;
	var e = ut(),
		t = e.Uint8Array;
	return (vu = t), vu;
}
var yu, rp;
function g_() {
	if (rp) return yu;
	rp = 1;
	function e(t) {
		var r = -1,
			n = Array(t.size);
		return (
			t.forEach((i, a) => {
				n[++r] = [a, i];
			}),
			n
		);
	}
	return (yu = e), yu;
}
var gu, np;
function xf() {
	if (np) return gu;
	np = 1;
	function e(t) {
		var r = -1,
			n = Array(t.size);
		return (
			t.forEach((i) => {
				n[++r] = i;
			}),
			n
		);
	}
	return (gu = e), gu;
}
var mu, ip;
function m_() {
	if (ip) return mu;
	ip = 1;
	var e = Bn(),
		t = y_(),
		r = cf(),
		n = Jb(),
		i = g_(),
		a = xf(),
		o = 1,
		u = 2,
		c = "[object Boolean]",
		s = "[object Date]",
		f = "[object Error]",
		l = "[object Map]",
		h = "[object Number]",
		p = "[object RegExp]",
		y = "[object Set]",
		v = "[object String]",
		d = "[object Symbol]",
		b = "[object ArrayBuffer]",
		w = "[object DataView]",
		x = e ? e.prototype : void 0,
		O = x ? x.valueOf : void 0;
	function g(m, _, S, P, M, A, E) {
		switch (S) {
			case w:
				if (m.byteLength != _.byteLength || m.byteOffset != _.byteOffset) return !1;
				(m = m.buffer), (_ = _.buffer);
			case b:
				return !(m.byteLength != _.byteLength || !A(new t(m), new t(_)));
			case c:
			case s:
			case h:
				return r(+m, +_);
			case f:
				return m.name == _.name && m.message == _.message;
			case p:
			case v:
				return m == _ + "";
			case l:
				var j = i;
			case y:
				var R = P & o;
				if ((j || (j = a), m.size != _.size && !R)) return !1;
				var C = E.get(m);
				if (C) return C == _;
				(P |= u), E.set(m, _);
				var N = n(j(m), j(_), P, M, A, E);
				return E.delete(m), N;
			case d:
				if (O) return O.call(m) == O.call(_);
		}
		return !1;
	}
	return (mu = g), mu;
}
var bu, ap;
function Qb() {
	if (ap) return bu;
	ap = 1;
	function e(t, r) {
		for (var n = -1, i = r.length, a = t.length; ++n < i; ) t[a + n] = r[n];
		return t;
	}
	return (bu = e), bu;
}
var xu, op;
function b_() {
	if (op) return xu;
	op = 1;
	var e = Qb(),
		t = Ne();
	function r(n, i, a) {
		var o = i(n);
		return t(n) ? o : e(o, a(n));
	}
	return (xu = r), xu;
}
var wu, up;
function x_() {
	if (up) return wu;
	up = 1;
	function e(t, r) {
		for (var n = -1, i = t == null ? 0 : t.length, a = 0, o = []; ++n < i; ) {
			var u = t[n];
			r(u, n, t) && (o[a++] = u);
		}
		return o;
	}
	return (wu = e), wu;
}
var Ou, cp;
function w_() {
	if (cp) return Ou;
	cp = 1;
	function e() {
		return [];
	}
	return (Ou = e), Ou;
}
var _u, sp;
function O_() {
	if (sp) return _u;
	sp = 1;
	var e = x_(),
		t = w_(),
		r = Object.prototype,
		n = r.propertyIsEnumerable,
		i = Object.getOwnPropertySymbols,
		a = i ? (o) => (o == null ? [] : ((o = Object(o)), e(i(o), (u) => n.call(o, u)))) : t;
	return (_u = a), _u;
}
var Su, lp;
function __() {
	if (lp) return Su;
	lp = 1;
	function e(t, r) {
		for (var n = -1, i = Array(t); ++n < t; ) i[n] = r(n);
		return i;
	}
	return (Su = e), Su;
}
var Au, fp;
function S_() {
	if (fp) return Au;
	fp = 1;
	var e = bt(),
		t = xt(),
		r = "[object Arguments]";
	function n(i) {
		return t(i) && e(i) == r;
	}
	return (Au = n), Au;
}
var Pu, hp;
function wf() {
	if (hp) return Pu;
	hp = 1;
	var e = S_(),
		t = xt(),
		r = Object.prototype,
		n = r.hasOwnProperty,
		i = r.propertyIsEnumerable,
		a = e((() => arguments)()) ? e : (o) => t(o) && n.call(o, "callee") && !i.call(o, "callee");
	return (Pu = a), Pu;
}
var Zr = { exports: {} },
	Tu,
	dp;
function A_() {
	if (dp) return Tu;
	dp = 1;
	function e() {
		return !1;
	}
	return (Tu = e), Tu;
}
Zr.exports;
var pp;
function e0() {
	return (
		pp ||
			((pp = 1),
			((e, t) => {
				var r = ut(),
					n = A_(),
					i = t && !t.nodeType && t,
					a = i && !0 && e && !e.nodeType && e,
					o = a && a.exports === i,
					u = o ? r.Buffer : void 0,
					c = u ? u.isBuffer : void 0,
					s = c || n;
				e.exports = s;
			})(Zr, Zr.exports)),
		Zr.exports
	);
}
var Eu, vp;
function Of() {
	if (vp) return Eu;
	vp = 1;
	var e = 9007199254740991,
		t = /^(?:0|[1-9]\d*)$/;
	function r(n, i) {
		var a = typeof n;
		return (i = i ?? e), !!i && (a == "number" || (a != "symbol" && t.test(n))) && n > -1 && n % 1 == 0 && n < i;
	}
	return (Eu = r), Eu;
}
var ju, yp;
function _f() {
	if (yp) return ju;
	yp = 1;
	var e = 9007199254740991;
	function t(r) {
		return typeof r == "number" && r > -1 && r % 1 == 0 && r <= e;
	}
	return (ju = t), ju;
}
var Mu, gp;
function P_() {
	if (gp) return Mu;
	gp = 1;
	var e = bt(),
		t = _f(),
		r = xt(),
		n = "[object Arguments]",
		i = "[object Array]",
		a = "[object Boolean]",
		o = "[object Date]",
		u = "[object Error]",
		c = "[object Function]",
		s = "[object Map]",
		f = "[object Number]",
		l = "[object Object]",
		h = "[object RegExp]",
		p = "[object Set]",
		y = "[object String]",
		v = "[object WeakMap]",
		d = "[object ArrayBuffer]",
		b = "[object DataView]",
		w = "[object Float32Array]",
		x = "[object Float64Array]",
		O = "[object Int8Array]",
		g = "[object Int16Array]",
		m = "[object Int32Array]",
		_ = "[object Uint8Array]",
		S = "[object Uint8ClampedArray]",
		P = "[object Uint16Array]",
		M = "[object Uint32Array]",
		A = {};
	(A[w] = A[x] = A[O] = A[g] = A[m] = A[_] = A[S] = A[P] = A[M] = !0),
		(A[n] = A[i] = A[d] = A[a] = A[b] = A[o] = A[u] = A[c] = A[s] = A[f] = A[l] = A[h] = A[p] = A[y] = A[v] = !1);
	function E(j) {
		return r(j) && t(j.length) && !!A[e(j)];
	}
	return (Mu = E), Mu;
}
var Cu, mp;
function t0() {
	if (mp) return Cu;
	mp = 1;
	function e(t) {
		return (r) => t(r);
	}
	return (Cu = e), Cu;
}
var Jr = { exports: {} };
Jr.exports;
var bp;
function T_() {
	return (
		bp ||
			((bp = 1),
			((e, t) => {
				var r = wb(),
					n = t && !t.nodeType && t,
					i = n && !0 && e && !e.nodeType && e,
					a = i && i.exports === n,
					o = a && r.process,
					u = (() => {
						try {
							var c = i && i.require && i.require("util").types;
							return c || (o && o.binding && o.binding("util"));
						} catch {}
					})();
				e.exports = u;
			})(Jr, Jr.exports)),
		Jr.exports
	);
}
var Iu, xp;
function r0() {
	if (xp) return Iu;
	xp = 1;
	var e = P_(),
		t = t0(),
		r = T_(),
		n = r && r.isTypedArray,
		i = n ? t(n) : e;
	return (Iu = i), Iu;
}
var $u, wp;
function E_() {
	if (wp) return $u;
	wp = 1;
	var e = __(),
		t = wf(),
		r = Ne(),
		n = e0(),
		i = Of(),
		a = r0(),
		o = Object.prototype,
		u = o.hasOwnProperty;
	function c(s, f) {
		var l = r(s),
			h = !l && t(s),
			p = !l && !h && n(s),
			y = !l && !h && !p && a(s),
			v = l || h || p || y,
			d = v ? e(s.length, String) : [],
			b = d.length;
		for (var w in s)
			(f || u.call(s, w)) &&
				!(
					v &&
					(w == "length" ||
						(p && (w == "offset" || w == "parent")) ||
						(y && (w == "buffer" || w == "byteLength" || w == "byteOffset")) ||
						i(w, b))
				) &&
				d.push(w);
		return d;
	}
	return ($u = c), $u;
}
var Ru, Op;
function j_() {
	if (Op) return Ru;
	Op = 1;
	var e = Object.prototype;
	function t(r) {
		var n = r && r.constructor,
			i = (typeof n == "function" && n.prototype) || e;
		return r === i;
	}
	return (Ru = t), Ru;
}
var Nu, _p;
function n0() {
	if (_p) return Nu;
	_p = 1;
	function e(t, r) {
		return (n) => t(r(n));
	}
	return (Nu = e), Nu;
}
var ku, Sp;
function M_() {
	if (Sp) return ku;
	Sp = 1;
	var e = n0(),
		t = e(Object.keys, Object);
	return (ku = t), ku;
}
var Du, Ap;
function C_() {
	if (Ap) return Du;
	Ap = 1;
	var e = j_(),
		t = M_(),
		r = Object.prototype,
		n = r.hasOwnProperty;
	function i(a) {
		if (!e(a)) return t(a);
		var o = [];
		for (var u in Object(a)) n.call(a, u) && u != "constructor" && o.push(u);
		return o;
	}
	return (Du = i), Du;
}
var qu, Pp;
function zn() {
	if (Pp) return qu;
	Pp = 1;
	var e = uf(),
		t = _f();
	function r(n) {
		return n != null && t(n.length) && !e(n);
	}
	return (qu = r), qu;
}
var Lu, Tp;
function va() {
	if (Tp) return Lu;
	Tp = 1;
	var e = E_(),
		t = C_(),
		r = zn();
	function n(i) {
		return r(i) ? e(i) : t(i);
	}
	return (Lu = n), Lu;
}
var Bu, Ep;
function I_() {
	if (Ep) return Bu;
	Ep = 1;
	var e = b_(),
		t = O_(),
		r = va();
	function n(i) {
		return e(i, r, t);
	}
	return (Bu = n), Bu;
}
var Fu, jp;
function $_() {
	if (jp) return Fu;
	jp = 1;
	var e = I_(),
		t = 1,
		r = Object.prototype,
		n = r.hasOwnProperty;
	function i(a, o, u, c, s, f) {
		var l = u & t,
			h = e(a),
			p = h.length,
			y = e(o),
			v = y.length;
		if (p != v && !l) return !1;
		for (var d = p; d--; ) {
			var b = h[d];
			if (!(l ? b in o : n.call(o, b))) return !1;
		}
		var w = f.get(a),
			x = f.get(o);
		if (w && x) return w == o && x == a;
		var O = !0;
		f.set(a, o), f.set(o, a);
		for (var g = l; ++d < p; ) {
			b = h[d];
			var m = a[b],
				_ = o[b];
			if (c) var S = l ? c(_, m, b, o, a, f) : c(m, _, b, a, o, f);
			if (!(S === void 0 ? m === _ || s(m, _, u, c, f) : S)) {
				O = !1;
				break;
			}
			g || (g = b == "constructor");
		}
		if (O && !g) {
			var P = a.constructor,
				M = o.constructor;
			P != M &&
				"constructor" in a &&
				"constructor" in o &&
				!(typeof P == "function" && P instanceof P && typeof M == "function" && M instanceof M) &&
				(O = !1);
		}
		return f.delete(a), f.delete(o), O;
	}
	return (Fu = i), Fu;
}
var Uu, Mp;
function R_() {
	if (Mp) return Uu;
	Mp = 1;
	var e = Yt(),
		t = ut(),
		r = e(t, "DataView");
	return (Uu = r), Uu;
}
var zu, Cp;
function N_() {
	if (Cp) return zu;
	Cp = 1;
	var e = Yt(),
		t = ut(),
		r = e(t, "Promise");
	return (zu = r), zu;
}
var Wu, Ip;
function i0() {
	if (Ip) return Wu;
	Ip = 1;
	var e = Yt(),
		t = ut(),
		r = e(t, "Set");
	return (Wu = r), Wu;
}
var Gu, $p;
function k_() {
	if ($p) return Gu;
	$p = 1;
	var e = Yt(),
		t = ut(),
		r = e(t, "WeakMap");
	return (Gu = r), Gu;
}
var Hu, Rp;
function D_() {
	if (Rp) return Hu;
	Rp = 1;
	var e = R_(),
		t = sf(),
		r = N_(),
		n = i0(),
		i = k_(),
		a = bt(),
		o = Ob(),
		u = "[object Map]",
		c = "[object Object]",
		s = "[object Promise]",
		f = "[object Set]",
		l = "[object WeakMap]",
		h = "[object DataView]",
		p = o(e),
		y = o(t),
		v = o(r),
		d = o(n),
		b = o(i),
		w = a;
	return (
		((e && w(new e(new ArrayBuffer(1))) != h) ||
			(t && w(new t()) != u) ||
			(r && w(r.resolve()) != s) ||
			(n && w(new n()) != f) ||
			(i && w(new i()) != l)) &&
			(w = (x) => {
				var O = a(x),
					g = O == c ? x.constructor : void 0,
					m = g ? o(g) : "";
				if (m)
					switch (m) {
						case p:
							return h;
						case y:
							return u;
						case v:
							return s;
						case d:
							return f;
						case b:
							return l;
					}
				return O;
			}),
		(Hu = w),
		Hu
	);
}
var Ku, Np;
function q_() {
	if (Np) return Ku;
	Np = 1;
	var e = Vb(),
		t = Jb(),
		r = m_(),
		n = $_(),
		i = D_(),
		a = Ne(),
		o = e0(),
		u = r0(),
		c = 1,
		s = "[object Arguments]",
		f = "[object Array]",
		l = "[object Object]",
		h = Object.prototype,
		p = h.hasOwnProperty;
	function y(v, d, b, w, x, O) {
		var g = a(v),
			m = a(d),
			_ = g ? f : i(v),
			S = m ? f : i(d);
		(_ = _ == s ? l : _), (S = S == s ? l : S);
		var P = _ == l,
			M = S == l,
			A = _ == S;
		if (A && o(v)) {
			if (!o(d)) return !1;
			(g = !0), (P = !1);
		}
		if (A && !P) return O || (O = new e()), g || u(v) ? t(v, d, b, w, x, O) : r(v, d, _, b, w, x, O);
		if (!(b & c)) {
			var E = P && p.call(v, "__wrapped__"),
				j = M && p.call(d, "__wrapped__");
			if (E || j) {
				var R = E ? v.value() : v,
					C = j ? d.value() : d;
				return O || (O = new e()), x(R, C, b, w, O);
			}
		}
		return A ? (O || (O = new e()), n(v, d, b, w, x, O)) : !1;
	}
	return (Ku = y), Ku;
}
var Vu, kp;
function Sf() {
	if (kp) return Vu;
	kp = 1;
	var e = q_(),
		t = xt();
	function r(n, i, a, o, u) {
		return n === i ? !0 : n == null || i == null || (!t(n) && !t(i)) ? n !== n && i !== i : e(n, i, a, o, r, u);
	}
	return (Vu = r), Vu;
}
var Xu, Dp;
function L_() {
	if (Dp) return Xu;
	Dp = 1;
	var e = Vb(),
		t = Sf(),
		r = 1,
		n = 2;
	function i(a, o, u, c) {
		var s = u.length,
			f = s,
			l = !c;
		if (a == null) return !f;
		for (a = Object(a); s--; ) {
			var h = u[s];
			if (l && h[2] ? h[1] !== a[h[0]] : !(h[0] in a)) return !1;
		}
		while (++s < f) {
			h = u[s];
			var p = h[0],
				y = a[p],
				v = h[1];
			if (l && h[2]) {
				if (y === void 0 && !(p in a)) return !1;
			} else {
				var d = new e();
				if (c) var b = c(y, v, p, a, o, d);
				if (!(b === void 0 ? t(v, y, r | n, c, d) : b)) return !1;
			}
		}
		return !0;
	}
	return (Xu = i), Xu;
}
var Yu, qp;
function a0() {
	if (qp) return Yu;
	qp = 1;
	var e = jt();
	function t(r) {
		return r === r && !e(r);
	}
	return (Yu = t), Yu;
}
var Zu, Lp;
function B_() {
	if (Lp) return Zu;
	Lp = 1;
	var e = a0(),
		t = va();
	function r(n) {
		for (var i = t(n), a = i.length; a--; ) {
			var o = i[a],
				u = n[o];
			i[a] = [o, u, e(u)];
		}
		return i;
	}
	return (Zu = r), Zu;
}
var Ju, Bp;
function o0() {
	if (Bp) return Ju;
	Bp = 1;
	function e(t, r) {
		return (n) => (n == null ? !1 : n[t] === r && (r !== void 0 || t in Object(n)));
	}
	return (Ju = e), Ju;
}
var Qu, Fp;
function F_() {
	if (Fp) return Qu;
	Fp = 1;
	var e = L_(),
		t = B_(),
		r = o0();
	function n(i) {
		var a = t(i);
		return a.length == 1 && a[0][2] ? r(a[0][0], a[0][1]) : (o) => o === i || e(o, i, a);
	}
	return (Qu = n), Qu;
}
var ec, Up;
function U_() {
	if (Up) return ec;
	Up = 1;
	function e(t, r) {
		return t != null && r in Object(t);
	}
	return (ec = e), ec;
}
var tc, zp;
function z_() {
	if (zp) return tc;
	zp = 1;
	var e = Ab(),
		t = wf(),
		r = Ne(),
		n = Of(),
		i = _f(),
		a = sa();
	function o(u, c, s) {
		c = e(c, u);
		for (var f = -1, l = c.length, h = !1; ++f < l; ) {
			var p = a(c[f]);
			if (!(h = u != null && s(u, p))) break;
			u = u[p];
		}
		return h || ++f != l ? h : ((l = u == null ? 0 : u.length), !!l && i(l) && n(p, l) && (r(u) || t(u)));
	}
	return (tc = o), tc;
}
var rc, Wp;
function W_() {
	if (Wp) return rc;
	Wp = 1;
	var e = U_(),
		t = z_();
	function r(n, i) {
		return n != null && t(n, i, e);
	}
	return (rc = r), rc;
}
var nc, Gp;
function G_() {
	if (Gp) return nc;
	Gp = 1;
	var e = Sf(),
		t = Pb(),
		r = W_(),
		n = of(),
		i = a0(),
		a = o0(),
		o = sa(),
		u = 1,
		c = 2;
	function s(f, l) {
		return n(f) && i(l)
			? a(o(f), l)
			: (h) => {
					var p = t(h, f);
					return p === void 0 && p === l ? r(h, f) : e(l, p, u | c);
				};
	}
	return (nc = s), nc;
}
var ic, Hp;
function kr() {
	if (Hp) return ic;
	Hp = 1;
	function e(t) {
		return t;
	}
	return (ic = e), ic;
}
var ac, Kp;
function H_() {
	if (Kp) return ac;
	Kp = 1;
	function e(t) {
		return (r) => r?.[t];
	}
	return (ac = e), ac;
}
var oc, Vp;
function K_() {
	if (Vp) return oc;
	Vp = 1;
	var e = hf();
	function t(r) {
		return (n) => e(n, r);
	}
	return (oc = t), oc;
}
var uc, Xp;
function V_() {
	if (Xp) return uc;
	Xp = 1;
	var e = H_(),
		t = K_(),
		r = of(),
		n = sa();
	function i(a) {
		return r(a) ? e(n(a)) : t(a);
	}
	return (uc = i), uc;
}
var cc, Yp;
function Mt() {
	if (Yp) return cc;
	Yp = 1;
	var e = F_(),
		t = G_(),
		r = kr(),
		n = Ne(),
		i = V_();
	function a(o) {
		return typeof o == "function" ? o : o == null ? r : typeof o == "object" ? (n(o) ? t(o[0], o[1]) : e(o)) : i(o);
	}
	return (cc = a), cc;
}
var sc, Zp;
function u0() {
	if (Zp) return sc;
	Zp = 1;
	function e(t, r, n, i) {
		for (var a = t.length, o = n + (i ? 1 : -1); i ? o-- : ++o < a; ) if (r(t[o], o, t)) return o;
		return -1;
	}
	return (sc = e), sc;
}
var lc, Jp;
function X_() {
	if (Jp) return lc;
	Jp = 1;
	function e(t) {
		return t !== t;
	}
	return (lc = e), lc;
}
var fc, Qp;
function Y_() {
	if (Qp) return fc;
	Qp = 1;
	function e(t, r, n) {
		for (var i = n - 1, a = t.length; ++i < a; ) if (t[i] === r) return i;
		return -1;
	}
	return (fc = e), fc;
}
var hc, ev;
function Z_() {
	if (ev) return hc;
	ev = 1;
	var e = u0(),
		t = X_(),
		r = Y_();
	function n(i, a, o) {
		return a === a ? r(i, a, o) : e(i, t, o);
	}
	return (hc = n), hc;
}
var dc, tv;
function J_() {
	if (tv) return dc;
	tv = 1;
	var e = Z_();
	function t(r, n) {
		var i = r == null ? 0 : r.length;
		return !!i && e(r, n, 0) > -1;
	}
	return (dc = t), dc;
}
var pc, rv;
function Q_() {
	if (rv) return pc;
	rv = 1;
	function e(t, r, n) {
		for (var i = -1, a = t == null ? 0 : t.length; ++i < a; ) if (n(r, t[i])) return !0;
		return !1;
	}
	return (pc = e), pc;
}
var vc, nv;
function eS() {
	if (nv) return vc;
	nv = 1;
	function e() {}
	return (vc = e), vc;
}
var yc, iv;
function tS() {
	if (iv) return yc;
	iv = 1;
	var e = i0(),
		t = eS(),
		r = xf(),
		n = 1 / 0,
		i = e && 1 / r(new e([, -0]))[1] == n ? (a) => new e(a) : t;
	return (yc = i), yc;
}
var gc, av;
function rS() {
	if (av) return gc;
	av = 1;
	var e = Xb(),
		t = J_(),
		r = Q_(),
		n = Zb(),
		i = tS(),
		a = xf(),
		o = 200;
	function u(c, s, f) {
		var l = -1,
			h = t,
			p = c.length,
			y = !0,
			v = [],
			d = v;
		if (f) (y = !1), (h = r);
		else if (p >= o) {
			var b = s ? null : i(c);
			if (b) return a(b);
			(y = !1), (h = n), (d = new e());
		} else d = s ? [] : v;
		e: while (++l < p) {
			var w = c[l],
				x = s ? s(w) : w;
			if (((w = f || w !== 0 ? w : 0), y && x === x)) {
				for (var O = d.length; O--; ) if (d[O] === x) continue e;
				s && d.push(x), v.push(w);
			} else h(d, x, f) || (d !== v && d.push(x), v.push(w));
		}
		return v;
	}
	return (gc = u), gc;
}
var mc, ov;
function nS() {
	if (ov) return mc;
	ov = 1;
	var e = Mt(),
		t = rS();
	function r(n, i) {
		return n && n.length ? t(n, e(i, 2)) : [];
	}
	return (mc = r), mc;
}
var iS = nS();
const uv = ce(iS);
function c0(e, t, r) {
	return t === !0 ? uv(e, r) : Z(t) ? uv(e, t) : e;
}
function pr(e) {
	"@babel/helpers - typeof";
	return (
		(pr =
			typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
				? (t) => typeof t
				: (t) =>
						t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
							? "symbol"
							: typeof t),
		pr(e)
	);
}
var aS = ["ref"];
function cv(e, t) {
	var r = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		t && (n = n.filter((i) => Object.getOwnPropertyDescriptor(e, i).enumerable)), r.push.apply(r, n);
	}
	return r;
}
function ct(e) {
	for (var t = 1; t < arguments.length; t++) {
		var r = arguments[t] != null ? arguments[t] : {};
		t % 2
			? cv(Object(r), !0).forEach((n) => {
					ya(e, n, r[n]);
				})
			: Object.getOwnPropertyDescriptors
				? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
				: cv(Object(r)).forEach((n) => {
						Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
					});
	}
	return e;
}
function oS(e, t) {
	if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function sv(e, t) {
	for (var r = 0; r < t.length; r++) {
		var n = t[r];
		(n.enumerable = n.enumerable || !1),
			(n.configurable = !0),
			"value" in n && (n.writable = !0),
			Object.defineProperty(e, l0(n.key), n);
	}
}
function uS(e, t, r) {
	return t && sv(e.prototype, t), r && sv(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function cS(e, t, r) {
	return (t = mi(t)), sS(e, s0() ? Reflect.construct(t, r || [], mi(e).constructor) : t.apply(e, r));
}
function sS(e, t) {
	if (t && (pr(t) === "object" || typeof t == "function")) return t;
	if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
	return lS(e);
}
function lS(e) {
	if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	return e;
}
function s0() {
	try {
		var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], () => {}));
	} catch {}
	return (s0 = () => !!e)();
}
function mi(e) {
	return (
		(mi = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : (r) => r.__proto__ || Object.getPrototypeOf(r)), mi(e)
	);
}
function fS(e, t) {
	if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
	(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } })),
		Object.defineProperty(e, "prototype", { writable: !1 }),
		t && tl(e, t);
}
function tl(e, t) {
	return (tl = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : (n, i) => ((n.__proto__ = i), n)), tl(e, t);
}
function ya(e, t, r) {
	return (
		(t = l0(t)),
		t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = r),
		e
	);
}
function l0(e) {
	var t = hS(e, "string");
	return pr(t) == "symbol" ? t : t + "";
}
function hS(e, t) {
	if (pr(e) != "object" || !e) return e;
	var r = e[Symbol.toPrimitive];
	if (r !== void 0) {
		var n = r.call(e, t);
		if (pr(n) != "object") return n;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return String(e);
}
function dS(e, t) {
	if (e == null) return {};
	var r = pS(e, t),
		n,
		i;
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (i = 0; i < a.length; i++)
			(n = a[i]), !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
	}
	return r;
}
function pS(e, t) {
	if (e == null) return {};
	var r = {};
	for (var n in e)
		if (Object.prototype.hasOwnProperty.call(e, n)) {
			if (t.indexOf(n) >= 0) continue;
			r[n] = e[n];
		}
	return r;
}
function vS(e) {
	return e.value;
}
function yS(e, t) {
	if (T.isValidElement(e)) return T.cloneElement(e, t);
	if (typeof e == "function") return T.createElement(e, t);
	t.ref;
	var r = dS(t, aS);
	return T.createElement(bf, r);
}
var lv = 1,
	sr = ((e) => {
		function t() {
			var r;
			oS(this, t);
			for (var n = arguments.length, i = new Array(n), a = 0; a < n; a++) i[a] = arguments[a];
			return (r = cS(this, t, [].concat(i))), ya(r, "lastBoundingBox", { width: -1, height: -1 }), r;
		}
		return (
			fS(t, e),
			uS(
				t,
				[
					{
						key: "componentDidMount",
						value: function () {
							this.updateBBox();
						},
					},
					{
						key: "componentDidUpdate",
						value: function () {
							this.updateBBox();
						},
					},
					{
						key: "getBBox",
						value: function () {
							if (this.wrapperNode && this.wrapperNode.getBoundingClientRect) {
								var n = this.wrapperNode.getBoundingClientRect();
								return (n.height = this.wrapperNode.offsetHeight), (n.width = this.wrapperNode.offsetWidth), n;
							}
							return null;
						},
					},
					{
						key: "updateBBox",
						value: function () {
							var n = this.props.onBBoxUpdate,
								i = this.getBBox();
							i
								? (Math.abs(i.width - this.lastBoundingBox.width) > lv ||
										Math.abs(i.height - this.lastBoundingBox.height) > lv) &&
									((this.lastBoundingBox.width = i.width), (this.lastBoundingBox.height = i.height), n && n(i))
								: (this.lastBoundingBox.width !== -1 || this.lastBoundingBox.height !== -1) &&
									((this.lastBoundingBox.width = -1), (this.lastBoundingBox.height = -1), n && n(null));
						},
					},
					{
						key: "getBBoxSnapshot",
						value: function () {
							return this.lastBoundingBox.width >= 0 && this.lastBoundingBox.height >= 0
								? ct({}, this.lastBoundingBox)
								: { width: 0, height: 0 };
						},
					},
					{
						key: "getDefaultPosition",
						value: function (n) {
							var i = this.props,
								a = i.layout,
								o = i.align,
								u = i.verticalAlign,
								c = i.margin,
								s = i.chartWidth,
								f = i.chartHeight,
								l,
								h;
							if (!n || ((n.left === void 0 || n.left === null) && (n.right === void 0 || n.right === null)))
								if (o === "center" && a === "vertical") {
									var p = this.getBBoxSnapshot();
									l = { left: ((s || 0) - p.width) / 2 };
								} else l = o === "right" ? { right: (c && c.right) || 0 } : { left: (c && c.left) || 0 };
							if (!n || ((n.top === void 0 || n.top === null) && (n.bottom === void 0 || n.bottom === null)))
								if (u === "middle") {
									var y = this.getBBoxSnapshot();
									h = { top: ((f || 0) - y.height) / 2 };
								} else h = u === "bottom" ? { bottom: (c && c.bottom) || 0 } : { top: (c && c.top) || 0 };
							return ct(ct({}, l), h);
						},
					},
					{
						key: "render",
						value: function () {
							var i = this.props,
								a = i.content,
								o = i.width,
								u = i.height,
								c = i.wrapperStyle,
								s = i.payloadUniqBy,
								f = i.payload,
								l = ct(
									ct({ position: "absolute", width: o || "auto", height: u || "auto" }, this.getDefaultPosition(c)),
									c,
								);
							return T.createElement(
								"div",
								{
									className: "recharts-legend-wrapper",
									style: l,
									ref: (p) => {
										this.wrapperNode = p;
									},
								},
								yS(a, ct(ct({}, this.props), {}, { payload: c0(f, s, vS) })),
							);
						},
					},
				],
				[
					{
						key: "getWithHeight",
						value: function (n, i) {
							var a = ct(ct({}, this.defaultProps), n.props),
								o = a.layout;
							return o === "vertical" && B(n.props.height)
								? { height: n.props.height }
								: o === "horizontal"
									? { width: n.props.width || i }
									: null;
						},
					},
				],
			)
		);
	})(k.PureComponent);
ya(sr, "displayName", "Legend");
ya(sr, "defaultProps", { iconSize: 14, layout: "horizontal", align: "center", verticalAlign: "bottom" });
var bc, fv;
function gS() {
	if (fv) return bc;
	fv = 1;
	var e = Bn(),
		t = wf(),
		r = Ne(),
		n = e ? e.isConcatSpreadable : void 0;
	function i(a) {
		return r(a) || t(a) || !!(n && a && a[n]);
	}
	return (bc = i), bc;
}
var xc, hv;
function f0() {
	if (hv) return xc;
	hv = 1;
	var e = Qb(),
		t = gS();
	function r(n, i, a, o, u) {
		var c = -1,
			s = n.length;
		for (a || (a = t), u || (u = []); ++c < s; ) {
			var f = n[c];
			i > 0 && a(f) ? (i > 1 ? r(f, i - 1, a, o, u) : e(u, f)) : o || (u[u.length] = f);
		}
		return u;
	}
	return (xc = r), xc;
}
var wc, dv;
function mS() {
	if (dv) return wc;
	dv = 1;
	function e(t) {
		return (r, n, i) => {
			for (var a = -1, o = Object(r), u = i(r), c = u.length; c--; ) {
				var s = u[t ? c : ++a];
				if (n(o[s], s, o) === !1) break;
			}
			return r;
		};
	}
	return (wc = e), wc;
}
var Oc, pv;
function bS() {
	if (pv) return Oc;
	pv = 1;
	var e = mS(),
		t = e();
	return (Oc = t), Oc;
}
var _c, vv;
function h0() {
	if (vv) return _c;
	vv = 1;
	var e = bS(),
		t = va();
	function r(n, i) {
		return n && e(n, i, t);
	}
	return (_c = r), _c;
}
var Sc, yv;
function xS() {
	if (yv) return Sc;
	yv = 1;
	var e = zn();
	function t(r, n) {
		return (i, a) => {
			if (i == null) return i;
			if (!e(i)) return r(i, a);
			for (var o = i.length, u = n ? o : -1, c = Object(i); (n ? u-- : ++u < o) && a(c[u], u, c) !== !1; );
			return i;
		};
	}
	return (Sc = t), Sc;
}
var Ac, gv;
function Af() {
	if (gv) return Ac;
	gv = 1;
	var e = h0(),
		t = xS(),
		r = t(e);
	return (Ac = r), Ac;
}
var Pc, mv;
function d0() {
	if (mv) return Pc;
	mv = 1;
	var e = Af(),
		t = zn();
	function r(n, i) {
		var a = -1,
			o = t(n) ? Array(n.length) : [];
		return (
			e(n, (u, c, s) => {
				o[++a] = i(u, c, s);
			}),
			o
		);
	}
	return (Pc = r), Pc;
}
var Tc, bv;
function wS() {
	if (bv) return Tc;
	bv = 1;
	function e(t, r) {
		var n = t.length;
		for (t.sort(r); n--; ) t[n] = t[n].value;
		return t;
	}
	return (Tc = e), Tc;
}
var Ec, xv;
function OS() {
	if (xv) return Ec;
	xv = 1;
	var e = Rr();
	function t(r, n) {
		if (r !== n) {
			var i = r !== void 0,
				a = r === null,
				o = r === r,
				u = e(r),
				c = n !== void 0,
				s = n === null,
				f = n === n,
				l = e(n);
			if ((!s && !l && !u && r > n) || (u && c && f && !s && !l) || (a && c && f) || (!i && f) || !o) return 1;
			if ((!a && !u && !l && r < n) || (l && i && o && !a && !u) || (s && i && o) || (!c && o) || !f) return -1;
		}
		return 0;
	}
	return (Ec = t), Ec;
}
var jc, wv;
function _S() {
	if (wv) return jc;
	wv = 1;
	var e = OS();
	function t(r, n, i) {
		for (var a = -1, o = r.criteria, u = n.criteria, c = o.length, s = i.length; ++a < c; ) {
			var f = e(o[a], u[a]);
			if (f) {
				if (a >= s) return f;
				var l = i[a];
				return f * (l == "desc" ? -1 : 1);
			}
		}
		return r.index - n.index;
	}
	return (jc = t), jc;
}
var Mc, Ov;
function SS() {
	if (Ov) return Mc;
	Ov = 1;
	var e = ff(),
		t = hf(),
		r = Mt(),
		n = d0(),
		i = wS(),
		a = t0(),
		o = _S(),
		u = kr(),
		c = Ne();
	function s(f, l, h) {
		l.length ? (l = e(l, (v) => (c(v) ? (d) => t(d, v.length === 1 ? v[0] : v) : v))) : (l = [u]);
		var p = -1;
		l = e(l, a(r));
		var y = n(f, (v, d, b) => {
			var w = e(l, (x) => x(v));
			return { criteria: w, index: ++p, value: v };
		});
		return i(y, (v, d) => o(v, d, h));
	}
	return (Mc = s), Mc;
}
var Cc, _v;
function AS() {
	if (_v) return Cc;
	_v = 1;
	function e(t, r, n) {
		switch (n.length) {
			case 0:
				return t.call(r);
			case 1:
				return t.call(r, n[0]);
			case 2:
				return t.call(r, n[0], n[1]);
			case 3:
				return t.call(r, n[0], n[1], n[2]);
		}
		return t.apply(r, n);
	}
	return (Cc = e), Cc;
}
var Ic, Sv;
function PS() {
	if (Sv) return Ic;
	Sv = 1;
	var e = AS(),
		t = Math.max;
	function r(n, i, a) {
		return (
			(i = t(i === void 0 ? n.length - 1 : i, 0)),
			function () {
				for (var o = arguments, u = -1, c = t(o.length - i, 0), s = Array(c); ++u < c; ) s[u] = o[i + u];
				u = -1;
				for (var f = Array(i + 1); ++u < i; ) f[u] = o[u];
				return (f[i] = a(s)), e(n, this, f);
			}
		);
	}
	return (Ic = r), Ic;
}
var $c, Av;
function TS() {
	if (Av) return $c;
	Av = 1;
	function e(t) {
		return () => t;
	}
	return ($c = e), $c;
}
var Rc, Pv;
function p0() {
	if (Pv) return Rc;
	Pv = 1;
	var e = Yt(),
		t = (() => {
			try {
				var r = e(Object, "defineProperty");
				return r({}, "", {}), r;
			} catch {}
		})();
	return (Rc = t), Rc;
}
var Nc, Tv;
function ES() {
	if (Tv) return Nc;
	Tv = 1;
	var e = TS(),
		t = p0(),
		r = kr(),
		n = t ? (i, a) => t(i, "toString", { configurable: !0, enumerable: !1, value: e(a), writable: !0 }) : r;
	return (Nc = n), Nc;
}
var kc, Ev;
function jS() {
	if (Ev) return kc;
	Ev = 1;
	var e = 800,
		t = 16,
		r = Date.now;
	function n(i) {
		var a = 0,
			o = 0;
		return () => {
			var u = r(),
				c = t - (u - o);
			if (((o = u), c > 0)) {
				if (++a >= e) return arguments[0];
			} else a = 0;
			return i.apply(void 0, arguments);
		};
	}
	return (kc = n), kc;
}
var Dc, jv;
function MS() {
	if (jv) return Dc;
	jv = 1;
	var e = ES(),
		t = jS(),
		r = t(e);
	return (Dc = r), Dc;
}
var qc, Mv;
function CS() {
	if (Mv) return qc;
	Mv = 1;
	var e = kr(),
		t = PS(),
		r = MS();
	function n(i, a) {
		return r(t(i, a, e), i + "");
	}
	return (qc = n), qc;
}
var Lc, Cv;
function ga() {
	if (Cv) return Lc;
	Cv = 1;
	var e = cf(),
		t = zn(),
		r = Of(),
		n = jt();
	function i(a, o, u) {
		if (!n(u)) return !1;
		var c = typeof o;
		return (c == "number" ? t(u) && r(o, u.length) : c == "string" && o in u) ? e(u[o], a) : !1;
	}
	return (Lc = i), Lc;
}
var Bc, Iv;
function IS() {
	if (Iv) return Bc;
	Iv = 1;
	var e = f0(),
		t = SS(),
		r = CS(),
		n = ga(),
		i = r((a, o) => {
			if (a == null) return [];
			var u = o.length;
			return u > 1 && n(a, o[0], o[1]) ? (o = []) : u > 2 && n(o[0], o[1], o[2]) && (o = [o[0]]), t(a, e(o, 1), []);
		});
	return (Bc = i), Bc;
}
var $S = IS();
const Pf = ce($S);
function un(e) {
	"@babel/helpers - typeof";
	return (
		(un =
			typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
				? (t) => typeof t
				: (t) =>
						t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
							? "symbol"
							: typeof t),
		un(e)
	);
}
function rl() {
	return (
		(rl = Object.assign
			? Object.assign.bind()
			: (e) => {
					for (var t = 1; t < arguments.length; t++) {
						var r = arguments[t];
						for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
					}
					return e;
				}),
		rl.apply(this, arguments)
	);
}
function RS(e, t) {
	return qS(e) || DS(e, t) || kS(e, t) || NS();
}
function NS() {
	throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function kS(e, t) {
	if (e) {
		if (typeof e == "string") return $v(e, t);
		var r = Object.prototype.toString.call(e).slice(8, -1);
		if ((r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set")) return Array.from(e);
		if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return $v(e, t);
	}
}
function $v(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
	return n;
}
function DS(e, t) {
	var r = e == null ? null : (typeof Symbol < "u" && e[Symbol.iterator]) || e["@@iterator"];
	if (r != null) {
		var n,
			i,
			a,
			o,
			u = [],
			c = !0,
			s = !1;
		try {
			if (((a = (r = r.call(e)).next), t !== 0))
				for (; !(c = (n = a.call(r)).done) && (u.push(n.value), u.length !== t); c = !0);
		} catch (f) {
			(s = !0), (i = f);
		} finally {
			try {
				if (!c && r.return != null && ((o = r.return()), Object(o) !== o)) return;
			} finally {
				if (s) throw i;
			}
		}
		return u;
	}
}
function qS(e) {
	if (Array.isArray(e)) return e;
}
function Rv(e, t) {
	var r = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		t && (n = n.filter((i) => Object.getOwnPropertyDescriptor(e, i).enumerable)), r.push.apply(r, n);
	}
	return r;
}
function Fc(e) {
	for (var t = 1; t < arguments.length; t++) {
		var r = arguments[t] != null ? arguments[t] : {};
		t % 2
			? Rv(Object(r), !0).forEach((n) => {
					LS(e, n, r[n]);
				})
			: Object.getOwnPropertyDescriptors
				? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
				: Rv(Object(r)).forEach((n) => {
						Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
					});
	}
	return e;
}
function LS(e, t, r) {
	return (
		(t = BS(t)),
		t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = r),
		e
	);
}
function BS(e) {
	var t = FS(e, "string");
	return un(t) == "symbol" ? t : t + "";
}
function FS(e, t) {
	if (un(e) != "object" || !e) return e;
	var r = e[Symbol.toPrimitive];
	if (r !== void 0) {
		var n = r.call(e, t);
		if (un(n) != "object") return n;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function US(e) {
	return Array.isArray(e) && xe(e[0]) && xe(e[1]) ? e.join(" ~ ") : e;
}
var zS = (t) => {
	var r = t.separator,
		n = r === void 0 ? " : " : r,
		i = t.contentStyle,
		a = i === void 0 ? {} : i,
		o = t.itemStyle,
		u = o === void 0 ? {} : o,
		c = t.labelStyle,
		s = c === void 0 ? {} : c,
		f = t.payload,
		l = t.formatter,
		h = t.itemSorter,
		p = t.wrapperClassName,
		y = t.labelClassName,
		v = t.label,
		d = t.labelFormatter,
		b = t.accessibilityLayer,
		w = b === void 0 ? !1 : b,
		x = () => {
			if (f && f.length) {
				var E = { padding: 0, margin: 0 },
					j = (h ? Pf(f, h) : f).map((R, C) => {
						if (R.type === "none") return null;
						var N = Fc({ display: "block", paddingTop: 4, paddingBottom: 4, color: R.color || "#000" }, u),
							q = R.formatter || l || US,
							L = R.value,
							F = R.name,
							G = L,
							K = F;
						if (q && G != null && K != null) {
							var z = q(L, F, R, C, f);
							if (Array.isArray(z)) {
								var V = RS(z, 2);
								(G = V[0]), (K = V[1]);
							} else G = z;
						}
						return T.createElement(
							"li",
							{ className: "recharts-tooltip-item", key: "tooltip-item-".concat(C), style: N },
							xe(K) ? T.createElement("span", { className: "recharts-tooltip-item-name" }, K) : null,
							xe(K) ? T.createElement("span", { className: "recharts-tooltip-item-separator" }, n) : null,
							T.createElement("span", { className: "recharts-tooltip-item-value" }, G),
							T.createElement("span", { className: "recharts-tooltip-item-unit" }, R.unit || ""),
						);
					});
				return T.createElement("ul", { className: "recharts-tooltip-item-list", style: E }, j);
			}
			return null;
		},
		O = Fc({ margin: 0, padding: 10, backgroundColor: "#fff", border: "1px solid #ccc", whiteSpace: "nowrap" }, a),
		g = Fc({ margin: 0 }, s),
		m = !ne(v),
		_ = m ? v : "",
		S = ie("recharts-default-tooltip", p),
		P = ie("recharts-tooltip-label", y);
	m && d && f !== void 0 && f !== null && (_ = d(v, f));
	var M = w ? { role: "status", "aria-live": "assertive" } : {};
	return T.createElement(
		"div",
		rl({ className: S, style: O }, M),
		T.createElement("p", { className: P, style: g }, T.isValidElement(_) ? _ : "".concat(_)),
		x(),
	);
};
function cn(e) {
	"@babel/helpers - typeof";
	return (
		(cn =
			typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
				? (t) => typeof t
				: (t) =>
						t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
							? "symbol"
							: typeof t),
		cn(e)
	);
}
function Jn(e, t, r) {
	return (
		(t = WS(t)),
		t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = r),
		e
	);
}
function WS(e) {
	var t = GS(e, "string");
	return cn(t) == "symbol" ? t : t + "";
}
function GS(e, t) {
	if (cn(e) != "object" || !e) return e;
	var r = e[Symbol.toPrimitive];
	if (r !== void 0) {
		var n = r.call(e, t);
		if (cn(n) != "object") return n;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var Ur = "recharts-tooltip-wrapper",
	HS = { visibility: "hidden" };
function KS(e) {
	var t = e.coordinate,
		r = e.translateX,
		n = e.translateY;
	return ie(
		Ur,
		Jn(
			Jn(
				Jn(
					Jn({}, "".concat(Ur, "-right"), B(r) && t && B(t.x) && r >= t.x),
					"".concat(Ur, "-left"),
					B(r) && t && B(t.x) && r < t.x,
				),
				"".concat(Ur, "-bottom"),
				B(n) && t && B(t.y) && n >= t.y,
			),
			"".concat(Ur, "-top"),
			B(n) && t && B(t.y) && n < t.y,
		),
	);
}
function Nv(e) {
	var t = e.allowEscapeViewBox,
		r = e.coordinate,
		n = e.key,
		i = e.offsetTopLeft,
		a = e.position,
		o = e.reverseDirection,
		u = e.tooltipDimension,
		c = e.viewBox,
		s = e.viewBoxDimension;
	if (a && B(a[n])) return a[n];
	var f = r[n] - u - i,
		l = r[n] + i;
	if (t[n]) return o[n] ? f : l;
	if (o[n]) {
		var h = f,
			p = c[n];
		return h < p ? Math.max(l, c[n]) : Math.max(f, c[n]);
	}
	var y = l + u,
		v = c[n] + s;
	return y > v ? Math.max(f, c[n]) : Math.max(l, c[n]);
}
function VS(e) {
	var t = e.translateX,
		r = e.translateY,
		n = e.useTranslate3d;
	return {
		transform: n
			? "translate3d(".concat(t, "px, ").concat(r, "px, 0)")
			: "translate(".concat(t, "px, ").concat(r, "px)"),
	};
}
function XS(e) {
	var t = e.allowEscapeViewBox,
		r = e.coordinate,
		n = e.offsetTopLeft,
		i = e.position,
		a = e.reverseDirection,
		o = e.tooltipBox,
		u = e.useTranslate3d,
		c = e.viewBox,
		s,
		f,
		l;
	return (
		o.height > 0 && o.width > 0 && r
			? ((f = Nv({
					allowEscapeViewBox: t,
					coordinate: r,
					key: "x",
					offsetTopLeft: n,
					position: i,
					reverseDirection: a,
					tooltipDimension: o.width,
					viewBox: c,
					viewBoxDimension: c.width,
				})),
				(l = Nv({
					allowEscapeViewBox: t,
					coordinate: r,
					key: "y",
					offsetTopLeft: n,
					position: i,
					reverseDirection: a,
					tooltipDimension: o.height,
					viewBox: c,
					viewBoxDimension: c.height,
				})),
				(s = VS({ translateX: f, translateY: l, useTranslate3d: u })))
			: (s = HS),
		{ cssProperties: s, cssClasses: KS({ translateX: f, translateY: l, coordinate: r }) }
	);
}
function vr(e) {
	"@babel/helpers - typeof";
	return (
		(vr =
			typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
				? (t) => typeof t
				: (t) =>
						t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
							? "symbol"
							: typeof t),
		vr(e)
	);
}
function kv(e, t) {
	var r = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		t && (n = n.filter((i) => Object.getOwnPropertyDescriptor(e, i).enumerable)), r.push.apply(r, n);
	}
	return r;
}
function Dv(e) {
	for (var t = 1; t < arguments.length; t++) {
		var r = arguments[t] != null ? arguments[t] : {};
		t % 2
			? kv(Object(r), !0).forEach((n) => {
					il(e, n, r[n]);
				})
			: Object.getOwnPropertyDescriptors
				? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
				: kv(Object(r)).forEach((n) => {
						Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
					});
	}
	return e;
}
function YS(e, t) {
	if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function ZS(e, t) {
	for (var r = 0; r < t.length; r++) {
		var n = t[r];
		(n.enumerable = n.enumerable || !1),
			(n.configurable = !0),
			"value" in n && (n.writable = !0),
			Object.defineProperty(e, y0(n.key), n);
	}
}
function JS(e, t, r) {
	return t && ZS(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function QS(e, t, r) {
	return (t = bi(t)), eA(e, v0() ? Reflect.construct(t, r || [], bi(e).constructor) : t.apply(e, r));
}
function eA(e, t) {
	if (t && (vr(t) === "object" || typeof t == "function")) return t;
	if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
	return tA(e);
}
function tA(e) {
	if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	return e;
}
function v0() {
	try {
		var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], () => {}));
	} catch {}
	return (v0 = () => !!e)();
}
function bi(e) {
	return (
		(bi = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : (r) => r.__proto__ || Object.getPrototypeOf(r)), bi(e)
	);
}
function rA(e, t) {
	if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
	(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } })),
		Object.defineProperty(e, "prototype", { writable: !1 }),
		t && nl(e, t);
}
function nl(e, t) {
	return (nl = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : (n, i) => ((n.__proto__ = i), n)), nl(e, t);
}
function il(e, t, r) {
	return (
		(t = y0(t)),
		t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = r),
		e
	);
}
function y0(e) {
	var t = nA(e, "string");
	return vr(t) == "symbol" ? t : t + "";
}
function nA(e, t) {
	if (vr(e) != "object" || !e) return e;
	var r = e[Symbol.toPrimitive];
	if (r !== void 0) {
		var n = r.call(e, t);
		if (vr(n) != "object") return n;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return String(e);
}
var qv = 1,
	iA = ((e) => {
		function t() {
			var r;
			YS(this, t);
			for (var n = arguments.length, i = new Array(n), a = 0; a < n; a++) i[a] = arguments[a];
			return (
				(r = QS(this, t, [].concat(i))),
				il(r, "state", {
					dismissed: !1,
					dismissedAtCoordinate: { x: 0, y: 0 },
					lastBoundingBox: { width: -1, height: -1 },
				}),
				il(r, "handleKeyDown", (o) => {
					if (o.key === "Escape") {
						var u, c, s, f;
						r.setState({
							dismissed: !0,
							dismissedAtCoordinate: {
								x:
									(u = (c = r.props.coordinate) === null || c === void 0 ? void 0 : c.x) !== null && u !== void 0
										? u
										: 0,
								y:
									(s = (f = r.props.coordinate) === null || f === void 0 ? void 0 : f.y) !== null && s !== void 0
										? s
										: 0,
							},
						});
					}
				}),
				r
			);
		}
		return (
			rA(t, e),
			JS(t, [
				{
					key: "updateBBox",
					value: function () {
						if (this.wrapperNode && this.wrapperNode.getBoundingClientRect) {
							var n = this.wrapperNode.getBoundingClientRect();
							(Math.abs(n.width - this.state.lastBoundingBox.width) > qv ||
								Math.abs(n.height - this.state.lastBoundingBox.height) > qv) &&
								this.setState({ lastBoundingBox: { width: n.width, height: n.height } });
						} else
							(this.state.lastBoundingBox.width !== -1 || this.state.lastBoundingBox.height !== -1) &&
								this.setState({ lastBoundingBox: { width: -1, height: -1 } });
					},
				},
				{
					key: "componentDidMount",
					value: function () {
						document.addEventListener("keydown", this.handleKeyDown), this.updateBBox();
					},
				},
				{
					key: "componentWillUnmount",
					value: function () {
						document.removeEventListener("keydown", this.handleKeyDown);
					},
				},
				{
					key: "componentDidUpdate",
					value: function () {
						var n, i;
						this.props.active && this.updateBBox(),
							this.state.dismissed &&
								(((n = this.props.coordinate) === null || n === void 0 ? void 0 : n.x) !==
									this.state.dismissedAtCoordinate.x ||
									((i = this.props.coordinate) === null || i === void 0 ? void 0 : i.y) !==
										this.state.dismissedAtCoordinate.y) &&
								(this.state.dismissed = !1);
					},
				},
				{
					key: "render",
					value: function () {
						var i = this.props,
							a = i.active,
							o = i.allowEscapeViewBox,
							u = i.animationDuration,
							c = i.animationEasing,
							s = i.children,
							f = i.coordinate,
							l = i.hasPayload,
							h = i.isAnimationActive,
							p = i.offset,
							y = i.position,
							v = i.reverseDirection,
							d = i.useTranslate3d,
							b = i.viewBox,
							w = i.wrapperStyle,
							x = XS({
								allowEscapeViewBox: o,
								coordinate: f,
								offsetTopLeft: p,
								position: y,
								reverseDirection: v,
								tooltipBox: this.state.lastBoundingBox,
								useTranslate3d: d,
								viewBox: b,
							}),
							O = x.cssClasses,
							g = x.cssProperties,
							m = Dv(
								Dv({ transition: h && a ? "transform ".concat(u, "ms ").concat(c) : void 0 }, g),
								{},
								{
									pointerEvents: "none",
									visibility: !this.state.dismissed && a && l ? "visible" : "hidden",
									position: "absolute",
									top: 0,
									left: 0,
								},
								w,
							);
						return T.createElement(
							"div",
							{
								tabIndex: -1,
								className: O,
								style: m,
								ref: (S) => {
									this.wrapperNode = S;
								},
							},
							s,
						);
					},
				},
			])
		);
	})(k.PureComponent),
	aA = () => !(typeof window < "u" && window.document && window.document.createElement && window.setTimeout),
	Wn = { isSsr: aA() };
function yr(e) {
	"@babel/helpers - typeof";
	return (
		(yr =
			typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
				? (t) => typeof t
				: (t) =>
						t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
							? "symbol"
							: typeof t),
		yr(e)
	);
}
function Lv(e, t) {
	var r = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		t && (n = n.filter((i) => Object.getOwnPropertyDescriptor(e, i).enumerable)), r.push.apply(r, n);
	}
	return r;
}
function Bv(e) {
	for (var t = 1; t < arguments.length; t++) {
		var r = arguments[t] != null ? arguments[t] : {};
		t % 2
			? Lv(Object(r), !0).forEach((n) => {
					Tf(e, n, r[n]);
				})
			: Object.getOwnPropertyDescriptors
				? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
				: Lv(Object(r)).forEach((n) => {
						Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
					});
	}
	return e;
}
function oA(e, t) {
	if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function uA(e, t) {
	for (var r = 0; r < t.length; r++) {
		var n = t[r];
		(n.enumerable = n.enumerable || !1),
			(n.configurable = !0),
			"value" in n && (n.writable = !0),
			Object.defineProperty(e, m0(n.key), n);
	}
}
function cA(e, t, r) {
	return t && uA(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function sA(e, t, r) {
	return (t = xi(t)), lA(e, g0() ? Reflect.construct(t, r || [], xi(e).constructor) : t.apply(e, r));
}
function lA(e, t) {
	if (t && (yr(t) === "object" || typeof t == "function")) return t;
	if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
	return fA(e);
}
function fA(e) {
	if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	return e;
}
function g0() {
	try {
		var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], () => {}));
	} catch {}
	return (g0 = () => !!e)();
}
function xi(e) {
	return (
		(xi = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : (r) => r.__proto__ || Object.getPrototypeOf(r)), xi(e)
	);
}
function hA(e, t) {
	if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
	(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } })),
		Object.defineProperty(e, "prototype", { writable: !1 }),
		t && al(e, t);
}
function al(e, t) {
	return (al = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : (n, i) => ((n.__proto__ = i), n)), al(e, t);
}
function Tf(e, t, r) {
	return (
		(t = m0(t)),
		t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = r),
		e
	);
}
function m0(e) {
	var t = dA(e, "string");
	return yr(t) == "symbol" ? t : t + "";
}
function dA(e, t) {
	if (yr(e) != "object" || !e) return e;
	var r = e[Symbol.toPrimitive];
	if (r !== void 0) {
		var n = r.call(e, t);
		if (yr(n) != "object") return n;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return String(e);
}
function pA(e) {
	return e.dataKey;
}
function vA(e, t) {
	return T.isValidElement(e)
		? T.cloneElement(e, t)
		: typeof e == "function"
			? T.createElement(e, t)
			: T.createElement(zS, t);
}
var et = ((e) => {
	function t() {
		return oA(this, t), sA(this, t, arguments);
	}
	return (
		hA(t, e),
		cA(t, [
			{
				key: "render",
				value: function () {
					var i = this.props,
						a = i.active,
						o = i.allowEscapeViewBox,
						u = i.animationDuration,
						c = i.animationEasing,
						s = i.content,
						f = i.coordinate,
						l = i.filterNull,
						h = i.isAnimationActive,
						p = i.offset,
						y = i.payload,
						v = i.payloadUniqBy,
						d = i.position,
						b = i.reverseDirection,
						w = i.useTranslate3d,
						x = i.viewBox,
						O = i.wrapperStyle,
						g = y ?? [];
					l &&
						g.length &&
						(g = c0(
							y.filter((_) => _.value != null && (_.hide !== !0 || this.props.includeHidden)),
							v,
							pA,
						));
					var m = g.length > 0;
					return T.createElement(
						iA,
						{
							allowEscapeViewBox: o,
							animationDuration: u,
							animationEasing: c,
							isAnimationActive: h,
							active: a,
							coordinate: f,
							hasPayload: m,
							offset: p,
							position: d,
							reverseDirection: b,
							useTranslate3d: w,
							viewBox: x,
							wrapperStyle: O,
						},
						vA(s, Bv(Bv({}, this.props), {}, { payload: g })),
					);
				},
			},
		])
	);
})(k.PureComponent);
Tf(et, "displayName", "Tooltip");
Tf(et, "defaultProps", {
	accessibilityLayer: !1,
	allowEscapeViewBox: { x: !1, y: !1 },
	animationDuration: 400,
	animationEasing: "ease",
	contentStyle: {},
	coordinate: { x: 0, y: 0 },
	cursor: !0,
	cursorStyle: {},
	filterNull: !0,
	isAnimationActive: !Wn.isSsr,
	itemStyle: {},
	labelStyle: {},
	offset: 10,
	reverseDirection: { x: !1, y: !1 },
	separator: " : ",
	trigger: "hover",
	useTranslate3d: !1,
	viewBox: { x: 0, y: 0, height: 0, width: 0 },
	wrapperStyle: {},
});
var Uc, Fv;
function yA() {
	if (Fv) return Uc;
	Fv = 1;
	var e = ut(),
		t = () => e.Date.now();
	return (Uc = t), Uc;
}
var zc, Uv;
function gA() {
	if (Uv) return zc;
	Uv = 1;
	var e = /\s/;
	function t(r) {
		for (var n = r.length; n-- && e.test(r.charAt(n)); );
		return n;
	}
	return (zc = t), zc;
}
var Wc, zv;
function mA() {
	if (zv) return Wc;
	zv = 1;
	var e = gA(),
		t = /^\s+/;
	function r(n) {
		return n && n.slice(0, e(n) + 1).replace(t, "");
	}
	return (Wc = r), Wc;
}
var Gc, Wv;
function b0() {
	if (Wv) return Gc;
	Wv = 1;
	var e = mA(),
		t = jt(),
		r = Rr(),
		n = Number.NaN,
		i = /^[-+]0x[0-9a-f]+$/i,
		a = /^0b[01]+$/i,
		o = /^0o[0-7]+$/i,
		u = Number.parseInt;
	function c(s) {
		if (typeof s == "number") return s;
		if (r(s)) return n;
		if (t(s)) {
			var f = typeof s.valueOf == "function" ? s.valueOf() : s;
			s = t(f) ? f + "" : f;
		}
		if (typeof s != "string") return s === 0 ? s : +s;
		s = e(s);
		var l = a.test(s);
		return l || o.test(s) ? u(s.slice(2), l ? 2 : 8) : i.test(s) ? n : +s;
	}
	return (Gc = c), Gc;
}
var Hc, Gv;
function bA() {
	if (Gv) return Hc;
	Gv = 1;
	var e = jt(),
		t = yA(),
		r = b0(),
		n = "Expected a function",
		i = Math.max,
		a = Math.min;
	function o(u, c, s) {
		var f,
			l,
			h,
			p,
			y,
			v,
			d = 0,
			b = !1,
			w = !1,
			x = !0;
		if (typeof u != "function") throw new TypeError(n);
		(c = r(c) || 0),
			e(s) &&
				((b = !!s.leading),
				(w = "maxWait" in s),
				(h = w ? i(r(s.maxWait) || 0, c) : h),
				(x = "trailing" in s ? !!s.trailing : x));
		function O(j) {
			var R = f,
				C = l;
			return (f = l = void 0), (d = j), (p = u.apply(C, R)), p;
		}
		function g(j) {
			return (d = j), (y = setTimeout(S, c)), b ? O(j) : p;
		}
		function m(j) {
			var R = j - v,
				C = j - d,
				N = c - R;
			return w ? a(N, h - C) : N;
		}
		function _(j) {
			var R = j - v,
				C = j - d;
			return v === void 0 || R >= c || R < 0 || (w && C >= h);
		}
		function S() {
			var j = t();
			if (_(j)) return P(j);
			y = setTimeout(S, m(j));
		}
		function P(j) {
			return (y = void 0), x && f ? O(j) : ((f = l = void 0), p);
		}
		function M() {
			y !== void 0 && clearTimeout(y), (d = 0), (f = v = l = y = void 0);
		}
		function A() {
			return y === void 0 ? p : P(t());
		}
		function E() {
			var j = t(),
				R = _(j);
			if (((f = arguments), (l = this), (v = j), R)) {
				if (y === void 0) return g(v);
				if (w) return clearTimeout(y), (y = setTimeout(S, c)), O(v);
			}
			return y === void 0 && (y = setTimeout(S, c)), p;
		}
		return (E.cancel = M), (E.flush = A), E;
	}
	return (Hc = o), Hc;
}
var Kc, Hv;
function xA() {
	if (Hv) return Kc;
	Hv = 1;
	var e = bA(),
		t = jt(),
		r = "Expected a function";
	function n(i, a, o) {
		var u = !0,
			c = !0;
		if (typeof i != "function") throw new TypeError(r);
		return (
			t(o) && ((u = "leading" in o ? !!o.leading : u), (c = "trailing" in o ? !!o.trailing : c)),
			e(i, a, { leading: u, maxWait: a, trailing: c })
		);
	}
	return (Kc = n), Kc;
}
var wA = xA();
const x0 = ce(wA);
function sn(e) {
	"@babel/helpers - typeof";
	return (
		(sn =
			typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
				? (t) => typeof t
				: (t) =>
						t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
							? "symbol"
							: typeof t),
		sn(e)
	);
}
function Kv(e, t) {
	var r = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		t && (n = n.filter((i) => Object.getOwnPropertyDescriptor(e, i).enumerable)), r.push.apply(r, n);
	}
	return r;
}
function Qn(e) {
	for (var t = 1; t < arguments.length; t++) {
		var r = arguments[t] != null ? arguments[t] : {};
		t % 2
			? Kv(Object(r), !0).forEach((n) => {
					OA(e, n, r[n]);
				})
			: Object.getOwnPropertyDescriptors
				? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
				: Kv(Object(r)).forEach((n) => {
						Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
					});
	}
	return e;
}
function OA(e, t, r) {
	return (
		(t = _A(t)),
		t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = r),
		e
	);
}
function _A(e) {
	var t = SA(e, "string");
	return sn(t) == "symbol" ? t : t + "";
}
function SA(e, t) {
	if (sn(e) != "object" || !e) return e;
	var r = e[Symbol.toPrimitive];
	if (r !== void 0) {
		var n = r.call(e, t);
		if (sn(n) != "object") return n;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function AA(e, t) {
	return jA(e) || EA(e, t) || TA(e, t) || PA();
}
function PA() {
	throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function TA(e, t) {
	if (e) {
		if (typeof e == "string") return Vv(e, t);
		var r = Object.prototype.toString.call(e).slice(8, -1);
		if ((r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set")) return Array.from(e);
		if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Vv(e, t);
	}
}
function Vv(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
	return n;
}
function EA(e, t) {
	var r = e == null ? null : (typeof Symbol < "u" && e[Symbol.iterator]) || e["@@iterator"];
	if (r != null) {
		var n,
			i,
			a,
			o,
			u = [],
			c = !0,
			s = !1;
		try {
			if (((a = (r = r.call(e)).next), t !== 0))
				for (; !(c = (n = a.call(r)).done) && (u.push(n.value), u.length !== t); c = !0);
		} catch (f) {
			(s = !0), (i = f);
		} finally {
			try {
				if (!c && r.return != null && ((o = r.return()), Object(o) !== o)) return;
			} finally {
				if (s) throw i;
			}
		}
		return u;
	}
}
function jA(e) {
	if (Array.isArray(e)) return e;
}
var MA = k.forwardRef((e, t) => {
		var r = e.aspect,
			n = e.initialDimension,
			i = n === void 0 ? { width: -1, height: -1 } : n,
			a = e.width,
			o = a === void 0 ? "100%" : a,
			u = e.height,
			c = u === void 0 ? "100%" : u,
			s = e.minWidth,
			f = s === void 0 ? 0 : s,
			l = e.minHeight,
			h = e.maxHeight,
			p = e.children,
			y = e.debounce,
			v = y === void 0 ? 0 : y,
			d = e.id,
			b = e.className,
			w = e.onResize,
			x = e.style,
			O = x === void 0 ? {} : x,
			g = k.useRef(null),
			m = k.useRef();
		(m.current = w),
			k.useImperativeHandle(t, () =>
				Object.defineProperty(g.current, "current", {
					get: () => (
						console.warn("The usage of ref.current.current is deprecated and will no longer be supported."), g.current
					),
					configurable: !0,
				}),
			);
		var _ = k.useState({ containerWidth: i.width, containerHeight: i.height }),
			S = AA(_, 2),
			P = S[0],
			M = S[1],
			A = k.useCallback((j, R) => {
				M((C) => {
					var N = Math.round(j),
						q = Math.round(R);
					return C.containerWidth === N && C.containerHeight === q ? C : { containerWidth: N, containerHeight: q };
				});
			}, []);
		k.useEffect(() => {
			var j = (F) => {
				var G,
					K = F[0].contentRect,
					z = K.width,
					V = K.height;
				A(z, V), (G = m.current) === null || G === void 0 || G.call(m, z, V);
			};
			v > 0 && (j = x0(j, v, { trailing: !0, leading: !1 }));
			var R = new ResizeObserver(j),
				C = g.current.getBoundingClientRect(),
				N = C.width,
				q = C.height;
			return (
				A(N, q),
				R.observe(g.current),
				() => {
					R.disconnect();
				}
			);
		}, [A, v]);
		var E = k.useMemo(() => {
			var j = P.containerWidth,
				R = P.containerHeight;
			if (j < 0 || R < 0) return null;
			pt(
				Bt(o) || Bt(c),
				`The width(%s) and height(%s) are both fixed numbers,
       maybe you don't need to use a ResponsiveContainer.`,
				o,
				c,
			),
				pt(!r || r > 0, "The aspect(%s) must be greater than zero.", r);
			var C = Bt(o) ? j : o,
				N = Bt(c) ? R : c;
			r && r > 0 && (C ? (N = C / r) : N && (C = N * r), h && N > h && (N = h)),
				pt(
					C > 0 || N > 0,
					`The width(%s) and height(%s) of chart should be greater than 0,
       please check the style of container, or the props width(%s) and height(%s),
       or add a minWidth(%s) or minHeight(%s) or use aspect(%s) to control the
       height and width.`,
					C,
					N,
					o,
					c,
					f,
					l,
					r,
				);
			var q = !Array.isArray(p) && dt(p.type).endsWith("Chart");
			return T.Children.map(p, (L) =>
				T.isValidElement(L)
					? k.cloneElement(
							L,
							Qn(
								{ width: C, height: N },
								q ? { style: Qn({ height: "100%", width: "100%", maxHeight: N, maxWidth: C }, L.props.style) } : {},
							),
						)
					: L,
			);
		}, [r, p, c, h, l, f, P, o]);
		return T.createElement(
			"div",
			{
				id: d ? "".concat(d) : void 0,
				className: ie("recharts-responsive-container", b),
				style: Qn(Qn({}, O), {}, { width: o, height: c, minWidth: f, minHeight: l, maxHeight: h }),
				ref: g,
			},
			E,
		);
	}),
	w0 = (t) => null;
w0.displayName = "Cell";
function ln(e) {
	"@babel/helpers - typeof";
	return (
		(ln =
			typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
				? (t) => typeof t
				: (t) =>
						t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
							? "symbol"
							: typeof t),
		ln(e)
	);
}
function Xv(e, t) {
	var r = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		t && (n = n.filter((i) => Object.getOwnPropertyDescriptor(e, i).enumerable)), r.push.apply(r, n);
	}
	return r;
}
function ol(e) {
	for (var t = 1; t < arguments.length; t++) {
		var r = arguments[t] != null ? arguments[t] : {};
		t % 2
			? Xv(Object(r), !0).forEach((n) => {
					CA(e, n, r[n]);
				})
			: Object.getOwnPropertyDescriptors
				? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
				: Xv(Object(r)).forEach((n) => {
						Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
					});
	}
	return e;
}
function CA(e, t, r) {
	return (
		(t = IA(t)),
		t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = r),
		e
	);
}
function IA(e) {
	var t = $A(e, "string");
	return ln(t) == "symbol" ? t : t + "";
}
function $A(e, t) {
	if (ln(e) != "object" || !e) return e;
	var r = e[Symbol.toPrimitive];
	if (r !== void 0) {
		var n = r.call(e, t);
		if (ln(n) != "object") return n;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var rr = { widthCache: {}, cacheCount: 0 },
	RA = 2e3,
	NA = { position: "absolute", top: "-20000px", left: 0, padding: 0, margin: 0, border: "none", whiteSpace: "pre" },
	Yv = "recharts_measurement_span";
function kA(e) {
	var t = ol({}, e);
	return (
		Object.keys(t).forEach((r) => {
			t[r] || delete t[r];
		}),
		t
	);
}
var en = (t) => {
		var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
		if (t == null || Wn.isSsr) return { width: 0, height: 0 };
		var n = kA(r),
			i = JSON.stringify({ text: t, copyStyle: n });
		if (rr.widthCache[i]) return rr.widthCache[i];
		try {
			var a = document.getElementById(Yv);
			a ||
				((a = document.createElement("span")),
				a.setAttribute("id", Yv),
				a.setAttribute("aria-hidden", "true"),
				document.body.appendChild(a));
			var o = ol(ol({}, NA), n);
			Object.assign(a.style, o), (a.textContent = "".concat(t));
			var u = a.getBoundingClientRect(),
				c = { width: u.width, height: u.height };
			return (rr.widthCache[i] = c), ++rr.cacheCount > RA && ((rr.cacheCount = 0), (rr.widthCache = {})), c;
		} catch {
			return { width: 0, height: 0 };
		}
	},
	DA = (t) => ({
		top: t.top + window.scrollY - document.documentElement.clientTop,
		left: t.left + window.scrollX - document.documentElement.clientLeft,
	});
function fn(e) {
	"@babel/helpers - typeof";
	return (
		(fn =
			typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
				? (t) => typeof t
				: (t) =>
						t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
							? "symbol"
							: typeof t),
		fn(e)
	);
}
function wi(e, t) {
	return FA(e) || BA(e, t) || LA(e, t) || qA();
}
function qA() {
	throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function LA(e, t) {
	if (e) {
		if (typeof e == "string") return Zv(e, t);
		var r = Object.prototype.toString.call(e).slice(8, -1);
		if ((r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set")) return Array.from(e);
		if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Zv(e, t);
	}
}
function Zv(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
	return n;
}
function BA(e, t) {
	var r = e == null ? null : (typeof Symbol < "u" && e[Symbol.iterator]) || e["@@iterator"];
	if (r != null) {
		var n,
			i,
			a,
			o,
			u = [],
			c = !0,
			s = !1;
		try {
			if (((a = (r = r.call(e)).next), t === 0)) {
				if (Object(r) !== r) return;
				c = !1;
			} else for (; !(c = (n = a.call(r)).done) && (u.push(n.value), u.length !== t); c = !0);
		} catch (f) {
			(s = !0), (i = f);
		} finally {
			try {
				if (!c && r.return != null && ((o = r.return()), Object(o) !== o)) return;
			} finally {
				if (s) throw i;
			}
		}
		return u;
	}
}
function FA(e) {
	if (Array.isArray(e)) return e;
}
function UA(e, t) {
	if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function Jv(e, t) {
	for (var r = 0; r < t.length; r++) {
		var n = t[r];
		(n.enumerable = n.enumerable || !1),
			(n.configurable = !0),
			"value" in n && (n.writable = !0),
			Object.defineProperty(e, WA(n.key), n);
	}
}
function zA(e, t, r) {
	return t && Jv(e.prototype, t), r && Jv(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function WA(e) {
	var t = GA(e, "string");
	return fn(t) == "symbol" ? t : t + "";
}
function GA(e, t) {
	if (fn(e) != "object" || !e) return e;
	var r = e[Symbol.toPrimitive];
	if (r !== void 0) {
		var n = r.call(e, t);
		if (fn(n) != "object") return n;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return String(e);
}
var Qv = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([*/])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/,
	ey = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([+-])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/,
	HA = /^px|cm|vh|vw|em|rem|%|mm|in|pt|pc|ex|ch|vmin|vmax|Q$/,
	KA = /(-?\d+(?:\.\d+)?)([a-zA-Z%]+)?/,
	O0 = { cm: 96 / 2.54, mm: 96 / 25.4, pt: 96 / 72, pc: 96 / 6, in: 96, Q: 96 / (2.54 * 40), px: 1 },
	VA = Object.keys(O0),
	ar = "NaN";
function XA(e, t) {
	return e * O0[t];
}
var ei = (() => {
	function e(t, r) {
		UA(this, e),
			(this.num = t),
			(this.unit = r),
			(this.num = t),
			(this.unit = r),
			Number.isNaN(t) && (this.unit = ""),
			r !== "" && !HA.test(r) && ((this.num = Number.NaN), (this.unit = "")),
			VA.includes(r) && ((this.num = XA(t, r)), (this.unit = "px"));
	}
	return zA(
		e,
		[
			{
				key: "add",
				value: function (r) {
					return this.unit !== r.unit ? new e(Number.NaN, "") : new e(this.num + r.num, this.unit);
				},
			},
			{
				key: "subtract",
				value: function (r) {
					return this.unit !== r.unit ? new e(Number.NaN, "") : new e(this.num - r.num, this.unit);
				},
			},
			{
				key: "multiply",
				value: function (r) {
					return this.unit !== "" && r.unit !== "" && this.unit !== r.unit
						? new e(Number.NaN, "")
						: new e(this.num * r.num, this.unit || r.unit);
				},
			},
			{
				key: "divide",
				value: function (r) {
					return this.unit !== "" && r.unit !== "" && this.unit !== r.unit
						? new e(Number.NaN, "")
						: new e(this.num / r.num, this.unit || r.unit);
				},
			},
			{
				key: "toString",
				value: function () {
					return "".concat(this.num).concat(this.unit);
				},
			},
			{
				key: "isNaN",
				value: function () {
					return Number.isNaN(this.num);
				},
			},
		],
		[
			{
				key: "parse",
				value: (r) => {
					var n,
						i = (n = KA.exec(r)) !== null && n !== void 0 ? n : [],
						a = wi(i, 3),
						o = a[1],
						u = a[2];
					return new e(Number.parseFloat(o), u ?? "");
				},
			},
		],
	);
})();
function _0(e) {
	if (e.includes(ar)) return ar;
	for (var t = e; t.includes("*") || t.includes("/"); ) {
		var r,
			n = (r = Qv.exec(t)) !== null && r !== void 0 ? r : [],
			i = wi(n, 4),
			a = i[1],
			o = i[2],
			u = i[3],
			c = ei.parse(a ?? ""),
			s = ei.parse(u ?? ""),
			f = o === "*" ? c.multiply(s) : c.divide(s);
		if (f.isNaN()) return ar;
		t = t.replace(Qv, f.toString());
	}
	while (t.includes("+") || /.-\d+(?:\.\d+)?/.test(t)) {
		var l,
			h = (l = ey.exec(t)) !== null && l !== void 0 ? l : [],
			p = wi(h, 4),
			y = p[1],
			v = p[2],
			d = p[3],
			b = ei.parse(y ?? ""),
			w = ei.parse(d ?? ""),
			x = v === "+" ? b.add(w) : b.subtract(w);
		if (x.isNaN()) return ar;
		t = t.replace(ey, x.toString());
	}
	return t;
}
var ty = /\(([^()]*)\)/;
function YA(e) {
	for (var t = e; t.includes("("); ) {
		var r = ty.exec(t),
			n = wi(r, 2),
			i = n[1];
		t = t.replace(ty, _0(i));
	}
	return t;
}
function ZA(e) {
	var t = e.replace(/\s+/g, "");
	return (t = YA(t)), (t = _0(t)), t;
}
function JA(e) {
	try {
		return ZA(e);
	} catch {
		return ar;
	}
}
function Vc(e) {
	var t = JA(e.slice(5, -1));
	return t === ar ? "" : t;
}
var QA = ["x", "y", "lineHeight", "capHeight", "scaleToFit", "textAnchor", "verticalAnchor", "fill"],
	eP = ["dx", "dy", "angle", "className", "breakAll"];
function ul() {
	return (
		(ul = Object.assign
			? Object.assign.bind()
			: (e) => {
					for (var t = 1; t < arguments.length; t++) {
						var r = arguments[t];
						for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
					}
					return e;
				}),
		ul.apply(this, arguments)
	);
}
function ry(e, t) {
	if (e == null) return {};
	var r = tP(e, t),
		n,
		i;
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (i = 0; i < a.length; i++)
			(n = a[i]), !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
	}
	return r;
}
function tP(e, t) {
	if (e == null) return {};
	var r = {};
	for (var n in e)
		if (Object.prototype.hasOwnProperty.call(e, n)) {
			if (t.indexOf(n) >= 0) continue;
			r[n] = e[n];
		}
	return r;
}
function ny(e, t) {
	return aP(e) || iP(e, t) || nP(e, t) || rP();
}
function rP() {
	throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function nP(e, t) {
	if (e) {
		if (typeof e == "string") return iy(e, t);
		var r = Object.prototype.toString.call(e).slice(8, -1);
		if ((r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set")) return Array.from(e);
		if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return iy(e, t);
	}
}
function iy(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
	return n;
}
function iP(e, t) {
	var r = e == null ? null : (typeof Symbol < "u" && e[Symbol.iterator]) || e["@@iterator"];
	if (r != null) {
		var n,
			i,
			a,
			o,
			u = [],
			c = !0,
			s = !1;
		try {
			if (((a = (r = r.call(e)).next), t === 0)) {
				if (Object(r) !== r) return;
				c = !1;
			} else for (; !(c = (n = a.call(r)).done) && (u.push(n.value), u.length !== t); c = !0);
		} catch (f) {
			(s = !0), (i = f);
		} finally {
			try {
				if (!c && r.return != null && ((o = r.return()), Object(o) !== o)) return;
			} finally {
				if (s) throw i;
			}
		}
		return u;
	}
}
function aP(e) {
	if (Array.isArray(e)) return e;
}
var S0 = /[ \f\n\r\t\v\u2028\u2029]+/,
	A0 = (t) => {
		var r = t.children,
			n = t.breakAll,
			i = t.style;
		try {
			var a = [];
			ne(r) || (n ? (a = r.toString().split("")) : (a = r.toString().split(S0)));
			var o = a.map((c) => ({ word: c, width: en(c, i).width })),
				u = n ? 0 : en(" ", i).width;
			return { wordsWithComputedWidth: o, spaceWidth: u };
		} catch {
			return null;
		}
	},
	oP = (t, r, n, i, a) => {
		var o = t.maxLines,
			u = t.children,
			c = t.style,
			s = t.breakAll,
			f = B(o),
			l = u,
			h = () => {
				var C = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
				return C.reduce((N, q) => {
					var L = q.word,
						F = q.width,
						G = N[N.length - 1];
					if (G && (i == null || a || G.width + F + n < Number(i))) G.words.push(L), (G.width += F + n);
					else {
						var K = { words: [L], width: F };
						N.push(K);
					}
					return N;
				}, []);
			},
			p = h(r),
			y = (C) => C.reduce((N, q) => (N.width > q.width ? N : q));
		if (!f) return p;
		for (
			var v = "…",
				d = (C) => {
					var N = l.slice(0, C),
						q = A0({ breakAll: s, style: c, children: N + v }).wordsWithComputedWidth,
						L = h(q),
						F = L.length > o || y(L).width > Number(i);
					return [F, L];
				},
				b = 0,
				w = l.length - 1,
				x = 0,
				O;
			b <= w && x <= l.length - 1;
		) {
			var g = Math.floor((b + w) / 2),
				m = g - 1,
				_ = d(m),
				S = ny(_, 2),
				P = S[0],
				M = S[1],
				A = d(g),
				E = ny(A, 1),
				j = E[0];
			if ((!P && !j && (b = g + 1), P && j && (w = g - 1), !P && j)) {
				O = M;
				break;
			}
			x++;
		}
		return O || p;
	},
	ay = (t) => {
		var r = ne(t) ? [] : t.toString().split(S0);
		return [{ words: r }];
	},
	uP = (t) => {
		var r = t.width,
			n = t.scaleToFit,
			i = t.children,
			a = t.style,
			o = t.breakAll,
			u = t.maxLines;
		if ((r || n) && !Wn.isSsr) {
			var c,
				s,
				f = A0({ breakAll: o, children: i, style: a });
			if (f) {
				var l = f.wordsWithComputedWidth,
					h = f.spaceWidth;
				(c = l), (s = h);
			} else return ay(i);
			return oP({ breakAll: o, children: i, maxLines: u, style: a }, c, s, r, n);
		}
		return ay(i);
	},
	oy = "#808080",
	Oi = (t) => {
		var r = t.x,
			n = r === void 0 ? 0 : r,
			i = t.y,
			a = i === void 0 ? 0 : i,
			o = t.lineHeight,
			u = o === void 0 ? "1em" : o,
			c = t.capHeight,
			s = c === void 0 ? "0.71em" : c,
			f = t.scaleToFit,
			l = f === void 0 ? !1 : f,
			h = t.textAnchor,
			p = h === void 0 ? "start" : h,
			y = t.verticalAnchor,
			v = y === void 0 ? "end" : y,
			d = t.fill,
			b = d === void 0 ? oy : d,
			w = ry(t, QA),
			x = k.useMemo(
				() =>
					uP({
						breakAll: w.breakAll,
						children: w.children,
						maxLines: w.maxLines,
						scaleToFit: l,
						style: w.style,
						width: w.width,
					}),
				[w.breakAll, w.children, w.maxLines, l, w.style, w.width],
			),
			O = w.dx,
			g = w.dy,
			m = w.angle,
			_ = w.className,
			S = w.breakAll,
			P = ry(w, eP);
		if (!xe(n) || !xe(a)) return null;
		var M = n + (B(O) ? O : 0),
			A = a + (B(g) ? g : 0),
			E;
		switch (v) {
			case "start":
				E = Vc("calc(".concat(s, ")"));
				break;
			case "middle":
				E = Vc(
					"calc("
						.concat((x.length - 1) / 2, " * -")
						.concat(u, " + (")
						.concat(s, " / 2))"),
				);
				break;
			default:
				E = Vc("calc(".concat(x.length - 1, " * -").concat(u, ")"));
				break;
		}
		var j = [];
		if (l) {
			var R = x[0].width,
				C = w.width;
			j.push("scale(".concat((B(C) ? C / R : 1) / R, ")"));
		}
		return (
			m && j.push("rotate(".concat(m, ", ").concat(M, ", ").concat(A, ")")),
			j.length && (P.transform = j.join(" ")),
			T.createElement(
				"text",
				ul({}, ee(P, !0), {
					x: M,
					y: A,
					className: ie("recharts-text", _),
					textAnchor: p,
					fill: b.includes("url") ? oy : b,
				}),
				x.map((N, q) => {
					var L = N.words.join(S ? "" : " ");
					return T.createElement("tspan", { x: M, dy: q === 0 ? E : u, key: "".concat(L, "-").concat(q) }, L);
				}),
			)
		);
	};
function Tt(e, t) {
	return e == null || t == null ? Number.NaN : e < t ? -1 : e > t ? 1 : e >= t ? 0 : Number.NaN;
}
function cP(e, t) {
	return e == null || t == null ? Number.NaN : t < e ? -1 : t > e ? 1 : t >= e ? 0 : Number.NaN;
}
function Ef(e) {
	let t, r, n;
	e.length !== 2
		? ((t = Tt), (r = (u, c) => Tt(e(u), c)), (n = (u, c) => e(u) - c))
		: ((t = e === Tt || e === cP ? e : sP), (r = e), (n = e));
	function i(u, c, s = 0, f = u.length) {
		if (s < f) {
			if (t(c, c) !== 0) return f;
			do {
				const l = (s + f) >>> 1;
				r(u[l], c) < 0 ? (s = l + 1) : (f = l);
			} while (s < f);
		}
		return s;
	}
	function a(u, c, s = 0, f = u.length) {
		if (s < f) {
			if (t(c, c) !== 0) return f;
			do {
				const l = (s + f) >>> 1;
				r(u[l], c) <= 0 ? (s = l + 1) : (f = l);
			} while (s < f);
		}
		return s;
	}
	function o(u, c, s = 0, f = u.length) {
		const l = i(u, c, s, f - 1);
		return l > s && n(u[l - 1], c) > -n(u[l], c) ? l - 1 : l;
	}
	return { left: i, center: o, right: a };
}
function sP() {
	return 0;
}
function P0(e) {
	return e === null ? Number.NaN : +e;
}
function* lP(e, t) {
	for (let r of e) r != null && (r = +r) >= r && (yield r);
}
const fP = Ef(Tt),
	Gn = fP.right;
Ef(P0).center;
class uy extends Map {
	constructor(t, r = pP) {
		if ((super(), Object.defineProperties(this, { _intern: { value: new Map() }, _key: { value: r } }), t != null))
			for (const [n, i] of t) this.set(n, i);
	}
	get(t) {
		return super.get(cy(this, t));
	}
	has(t) {
		return super.has(cy(this, t));
	}
	set(t, r) {
		return super.set(hP(this, t), r);
	}
	delete(t) {
		return super.delete(dP(this, t));
	}
}
function cy({ _intern: e, _key: t }, r) {
	const n = t(r);
	return e.has(n) ? e.get(n) : r;
}
function hP({ _intern: e, _key: t }, r) {
	const n = t(r);
	return e.has(n) ? e.get(n) : (e.set(n, r), r);
}
function dP({ _intern: e, _key: t }, r) {
	const n = t(r);
	return e.has(n) && ((r = e.get(n)), e.delete(n)), r;
}
function pP(e) {
	return e !== null && typeof e == "object" ? e.valueOf() : e;
}
function vP(e = Tt) {
	if (e === Tt) return T0;
	if (typeof e != "function") throw new TypeError("compare is not a function");
	return (t, r) => {
		const n = e(t, r);
		return n || n === 0 ? n : (e(r, r) === 0) - (e(t, t) === 0);
	};
}
function T0(e, t) {
	return (e == null || !(e >= e)) - (t == null || !(t >= t)) || (e < t ? -1 : e > t ? 1 : 0);
}
const yP = Math.sqrt(50),
	gP = Math.sqrt(10),
	mP = Math.sqrt(2);
function _i(e, t, r) {
	const n = (t - e) / Math.max(0, r),
		i = Math.floor(Math.log10(n)),
		a = n / Math.pow(10, i),
		o = a >= yP ? 10 : a >= gP ? 5 : a >= mP ? 2 : 1;
	let u, c, s;
	return (
		i < 0
			? ((s = Math.pow(10, -i) / o),
				(u = Math.round(e * s)),
				(c = Math.round(t * s)),
				u / s < e && ++u,
				c / s > t && --c,
				(s = -s))
			: ((s = Math.pow(10, i) * o),
				(u = Math.round(e / s)),
				(c = Math.round(t / s)),
				u * s < e && ++u,
				c * s > t && --c),
		c < u && 0.5 <= r && r < 2 ? _i(e, t, r * 2) : [u, c, s]
	);
}
function cl(e, t, r) {
	if (((t = +t), (e = +e), (r = +r), !(r > 0))) return [];
	if (e === t) return [e];
	const n = t < e,
		[i, a, o] = n ? _i(t, e, r) : _i(e, t, r);
	if (!(a >= i)) return [];
	const u = a - i + 1,
		c = new Array(u);
	if (n)
		if (o < 0) for (let s = 0; s < u; ++s) c[s] = (a - s) / -o;
		else for (let s = 0; s < u; ++s) c[s] = (a - s) * o;
	else if (o < 0) for (let s = 0; s < u; ++s) c[s] = (i + s) / -o;
	else for (let s = 0; s < u; ++s) c[s] = (i + s) * o;
	return c;
}
function sl(e, t, r) {
	return (t = +t), (e = +e), (r = +r), _i(e, t, r)[2];
}
function ll(e, t, r) {
	(t = +t), (e = +e), (r = +r);
	const n = t < e,
		i = n ? sl(t, e, r) : sl(e, t, r);
	return (n ? -1 : 1) * (i < 0 ? 1 / -i : i);
}
function sy(e, t) {
	let r;
	for (const n of e) n != null && (r < n || (r === void 0 && n >= n)) && (r = n);
	return r;
}
function ly(e, t) {
	let r;
	for (const n of e) n != null && (r > n || (r === void 0 && n >= n)) && (r = n);
	return r;
}
function E0(e, t, r = 0, n = 1 / 0, i) {
	if (
		((t = Math.floor(t)),
		(r = Math.floor(Math.max(0, r))),
		(n = Math.floor(Math.min(e.length - 1, n))),
		!(r <= t && t <= n))
	)
		return e;
	for (i = i === void 0 ? T0 : vP(i); n > r; ) {
		if (n - r > 600) {
			const c = n - r + 1,
				s = t - r + 1,
				f = Math.log(c),
				l = 0.5 * Math.exp((2 * f) / 3),
				h = 0.5 * Math.sqrt((f * l * (c - l)) / c) * (s - c / 2 < 0 ? -1 : 1),
				p = Math.max(r, Math.floor(t - (s * l) / c + h)),
				y = Math.min(n, Math.floor(t + ((c - s) * l) / c + h));
			E0(e, t, p, y, i);
		}
		const a = e[t];
		let o = r,
			u = n;
		for (zr(e, r, t), i(e[n], a) > 0 && zr(e, r, n); o < u; ) {
			for (zr(e, o, u), ++o, --u; i(e[o], a) < 0; ) ++o;
			while (i(e[u], a) > 0) --u;
		}
		i(e[r], a) === 0 ? zr(e, r, u) : (++u, zr(e, u, n)), u <= t && (r = u + 1), t <= u && (n = u - 1);
	}
	return e;
}
function zr(e, t, r) {
	const n = e[t];
	(e[t] = e[r]), (e[r] = n);
}
function bP(e, t, r) {
	if (((e = Float64Array.from(lP(e))), !(!(n = e.length) || isNaN((t = +t))))) {
		if (t <= 0 || n < 2) return ly(e);
		if (t >= 1) return sy(e);
		var n,
			i = (n - 1) * t,
			a = Math.floor(i),
			o = sy(E0(e, a).subarray(0, a + 1)),
			u = ly(e.subarray(a + 1));
		return o + (u - o) * (i - a);
	}
}
function xP(e, t, r = P0) {
	if (!(!(n = e.length) || isNaN((t = +t)))) {
		if (t <= 0 || n < 2) return +r(e[0], 0, e);
		if (t >= 1) return +r(e[n - 1], n - 1, e);
		var n,
			i = (n - 1) * t,
			a = Math.floor(i),
			o = +r(e[a], a, e),
			u = +r(e[a + 1], a + 1, e);
		return o + (u - o) * (i - a);
	}
}
function wP(e, t, r) {
	(e = +e), (t = +t), (r = (i = arguments.length) < 2 ? ((t = e), (e = 0), 1) : i < 3 ? 1 : +r);
	for (var n = -1, i = Math.max(0, Math.ceil((t - e) / r)) | 0, a = new Array(i); ++n < i; ) a[n] = e + n * r;
	return a;
}
function Ge(e, t) {
	switch (arguments.length) {
		case 0:
			break;
		case 1:
			this.range(e);
			break;
		default:
			this.range(t).domain(e);
			break;
	}
	return this;
}
function wt(e, t) {
	switch (arguments.length) {
		case 0:
			break;
		case 1: {
			typeof e == "function" ? this.interpolator(e) : this.range(e);
			break;
		}
		default: {
			this.domain(e), typeof t == "function" ? this.interpolator(t) : this.range(t);
			break;
		}
	}
	return this;
}
const fl = Symbol("implicit");
function jf() {
	var e = new uy(),
		t = [],
		r = [],
		n = fl;
	function i(a) {
		let o = e.get(a);
		if (o === void 0) {
			if (n !== fl) return n;
			e.set(a, (o = t.push(a) - 1));
		}
		return r[o % r.length];
	}
	return (
		(i.domain = (a) => {
			if (!arguments.length) return t.slice();
			(t = []), (e = new uy());
			for (const o of a) e.has(o) || e.set(o, t.push(o) - 1);
			return i;
		}),
		(i.range = (a) => (arguments.length ? ((r = Array.from(a)), i) : r.slice())),
		(i.unknown = (a) => (arguments.length ? ((n = a), i) : n)),
		(i.copy = () => jf(t, r).unknown(n)),
		Ge.apply(i, arguments),
		i
	);
}
function hn() {
	var e = jf().unknown(void 0),
		t = e.domain,
		r = e.range,
		n = 0,
		i = 1,
		a,
		o,
		u = !1,
		c = 0,
		s = 0,
		f = 0.5;
	delete e.unknown;
	function l() {
		var h = t().length,
			p = i < n,
			y = p ? i : n,
			v = p ? n : i;
		(a = (v - y) / Math.max(1, h - c + s * 2)),
			u && (a = Math.floor(a)),
			(y += (v - y - a * (h - c)) * f),
			(o = a * (1 - c)),
			u && ((y = Math.round(y)), (o = Math.round(o)));
		var d = wP(h).map((b) => y + a * b);
		return r(p ? d.reverse() : d);
	}
	return (
		(e.domain = (h) => (arguments.length ? (t(h), l()) : t())),
		(e.range = (h) => (arguments.length ? (([n, i] = h), (n = +n), (i = +i), l()) : [n, i])),
		(e.rangeRound = (h) => (([n, i] = h), (n = +n), (i = +i), (u = !0), l())),
		(e.bandwidth = () => o),
		(e.step = () => a),
		(e.round = (h) => (arguments.length ? ((u = !!h), l()) : u)),
		(e.padding = (h) => (arguments.length ? ((c = Math.min(1, (s = +h))), l()) : c)),
		(e.paddingInner = (h) => (arguments.length ? ((c = Math.min(1, h)), l()) : c)),
		(e.paddingOuter = (h) => (arguments.length ? ((s = +h), l()) : s)),
		(e.align = (h) => (arguments.length ? ((f = Math.max(0, Math.min(1, h))), l()) : f)),
		(e.copy = () => hn(t(), [n, i]).round(u).paddingInner(c).paddingOuter(s).align(f)),
		Ge.apply(l(), arguments)
	);
}
function j0(e) {
	var t = e.copy;
	return (e.padding = e.paddingOuter), delete e.paddingInner, delete e.paddingOuter, (e.copy = () => j0(t())), e;
}
function tn() {
	return j0(hn.apply(null, arguments).paddingInner(1));
}
function Mf(e, t, r) {
	(e.prototype = t.prototype = r), (r.constructor = e);
}
function M0(e, t) {
	var r = Object.create(e.prototype);
	for (var n in t) r[n] = t[n];
	return r;
}
function Hn() {}
var dn = 0.7,
	Si = 1 / dn,
	lr = "\\s*([+-]?\\d+)\\s*",
	pn = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
	rt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
	OP = /^#([0-9a-f]{3,8})$/,
	_P = new RegExp(`^rgb\\(${lr},${lr},${lr}\\)$`),
	SP = new RegExp(`^rgb\\(${rt},${rt},${rt}\\)$`),
	AP = new RegExp(`^rgba\\(${lr},${lr},${lr},${pn}\\)$`),
	PP = new RegExp(`^rgba\\(${rt},${rt},${rt},${pn}\\)$`),
	TP = new RegExp(`^hsl\\(${pn},${rt},${rt}\\)$`),
	EP = new RegExp(`^hsla\\(${pn},${rt},${rt},${pn}\\)$`),
	fy = {
		aliceblue: 15792383,
		antiquewhite: 16444375,
		aqua: 65535,
		aquamarine: 8388564,
		azure: 15794175,
		beige: 16119260,
		bisque: 16770244,
		black: 0,
		blanchedalmond: 16772045,
		blue: 255,
		blueviolet: 9055202,
		brown: 10824234,
		burlywood: 14596231,
		cadetblue: 6266528,
		chartreuse: 8388352,
		chocolate: 13789470,
		coral: 16744272,
		cornflowerblue: 6591981,
		cornsilk: 16775388,
		crimson: 14423100,
		cyan: 65535,
		darkblue: 139,
		darkcyan: 35723,
		darkgoldenrod: 12092939,
		darkgray: 11119017,
		darkgreen: 25600,
		darkgrey: 11119017,
		darkkhaki: 12433259,
		darkmagenta: 9109643,
		darkolivegreen: 5597999,
		darkorange: 16747520,
		darkorchid: 10040012,
		darkred: 9109504,
		darksalmon: 15308410,
		darkseagreen: 9419919,
		darkslateblue: 4734347,
		darkslategray: 3100495,
		darkslategrey: 3100495,
		darkturquoise: 52945,
		darkviolet: 9699539,
		deeppink: 16716947,
		deepskyblue: 49151,
		dimgray: 6908265,
		dimgrey: 6908265,
		dodgerblue: 2003199,
		firebrick: 11674146,
		floralwhite: 16775920,
		forestgreen: 2263842,
		fuchsia: 16711935,
		gainsboro: 14474460,
		ghostwhite: 16316671,
		gold: 16766720,
		goldenrod: 14329120,
		gray: 8421504,
		green: 32768,
		greenyellow: 11403055,
		grey: 8421504,
		honeydew: 15794160,
		hotpink: 16738740,
		indianred: 13458524,
		indigo: 4915330,
		ivory: 16777200,
		khaki: 15787660,
		lavender: 15132410,
		lavenderblush: 16773365,
		lawngreen: 8190976,
		lemonchiffon: 16775885,
		lightblue: 11393254,
		lightcoral: 15761536,
		lightcyan: 14745599,
		lightgoldenrodyellow: 16448210,
		lightgray: 13882323,
		lightgreen: 9498256,
		lightgrey: 13882323,
		lightpink: 16758465,
		lightsalmon: 16752762,
		lightseagreen: 2142890,
		lightskyblue: 8900346,
		lightslategray: 7833753,
		lightslategrey: 7833753,
		lightsteelblue: 11584734,
		lightyellow: 16777184,
		lime: 65280,
		limegreen: 3329330,
		linen: 16445670,
		magenta: 16711935,
		maroon: 8388608,
		mediumaquamarine: 6737322,
		mediumblue: 205,
		mediumorchid: 12211667,
		mediumpurple: 9662683,
		mediumseagreen: 3978097,
		mediumslateblue: 8087790,
		mediumspringgreen: 64154,
		mediumturquoise: 4772300,
		mediumvioletred: 13047173,
		midnightblue: 1644912,
		mintcream: 16121850,
		mistyrose: 16770273,
		moccasin: 16770229,
		navajowhite: 16768685,
		navy: 128,
		oldlace: 16643558,
		olive: 8421376,
		olivedrab: 7048739,
		orange: 16753920,
		orangered: 16729344,
		orchid: 14315734,
		palegoldenrod: 15657130,
		palegreen: 10025880,
		paleturquoise: 11529966,
		palevioletred: 14381203,
		papayawhip: 16773077,
		peachpuff: 16767673,
		peru: 13468991,
		pink: 16761035,
		plum: 14524637,
		powderblue: 11591910,
		purple: 8388736,
		rebeccapurple: 6697881,
		red: 16711680,
		rosybrown: 12357519,
		royalblue: 4286945,
		saddlebrown: 9127187,
		salmon: 16416882,
		sandybrown: 16032864,
		seagreen: 3050327,
		seashell: 16774638,
		sienna: 10506797,
		silver: 12632256,
		skyblue: 8900331,
		slateblue: 6970061,
		slategray: 7372944,
		slategrey: 7372944,
		snow: 16775930,
		springgreen: 65407,
		steelblue: 4620980,
		tan: 13808780,
		teal: 32896,
		thistle: 14204888,
		tomato: 16737095,
		turquoise: 4251856,
		violet: 15631086,
		wheat: 16113331,
		white: 16777215,
		whitesmoke: 16119285,
		yellow: 16776960,
		yellowgreen: 10145074,
	};
Mf(Hn, vn, {
	copy(e) {
		return Object.assign(new this.constructor(), this, e);
	},
	displayable() {
		return this.rgb().displayable();
	},
	hex: hy,
	formatHex: hy,
	formatHex8: jP,
	formatHsl: MP,
	formatRgb: dy,
	toString: dy,
});
function hy() {
	return this.rgb().formatHex();
}
function jP() {
	return this.rgb().formatHex8();
}
function MP() {
	return C0(this).formatHsl();
}
function dy() {
	return this.rgb().formatRgb();
}
function vn(e) {
	var t, r;
	return (
		(e = (e + "").trim().toLowerCase()),
		(t = OP.exec(e))
			? ((r = t[1].length),
				(t = Number.parseInt(t[1], 16)),
				r === 6
					? py(t)
					: r === 3
						? new Re(((t >> 8) & 15) | ((t >> 4) & 240), ((t >> 4) & 15) | (t & 240), ((t & 15) << 4) | (t & 15), 1)
						: r === 8
							? ti((t >> 24) & 255, (t >> 16) & 255, (t >> 8) & 255, (t & 255) / 255)
							: r === 4
								? ti(
										((t >> 12) & 15) | ((t >> 8) & 240),
										((t >> 8) & 15) | ((t >> 4) & 240),
										((t >> 4) & 15) | (t & 240),
										(((t & 15) << 4) | (t & 15)) / 255,
									)
								: null)
			: (t = _P.exec(e))
				? new Re(t[1], t[2], t[3], 1)
				: (t = SP.exec(e))
					? new Re((t[1] * 255) / 100, (t[2] * 255) / 100, (t[3] * 255) / 100, 1)
					: (t = AP.exec(e))
						? ti(t[1], t[2], t[3], t[4])
						: (t = PP.exec(e))
							? ti((t[1] * 255) / 100, (t[2] * 255) / 100, (t[3] * 255) / 100, t[4])
							: (t = TP.exec(e))
								? gy(t[1], t[2] / 100, t[3] / 100, 1)
								: (t = EP.exec(e))
									? gy(t[1], t[2] / 100, t[3] / 100, t[4])
									: fy.hasOwnProperty(e)
										? py(fy[e])
										: e === "transparent"
											? new Re(Number.NaN, Number.NaN, Number.NaN, 0)
											: null
	);
}
function py(e) {
	return new Re((e >> 16) & 255, (e >> 8) & 255, e & 255, 1);
}
function ti(e, t, r, n) {
	return n <= 0 && (e = t = r = Number.NaN), new Re(e, t, r, n);
}
function CP(e) {
	return e instanceof Hn || (e = vn(e)), e ? ((e = e.rgb()), new Re(e.r, e.g, e.b, e.opacity)) : new Re();
}
function hl(e, t, r, n) {
	return arguments.length === 1 ? CP(e) : new Re(e, t, r, n ?? 1);
}
function Re(e, t, r, n) {
	(this.r = +e), (this.g = +t), (this.b = +r), (this.opacity = +n);
}
Mf(
	Re,
	hl,
	M0(Hn, {
		brighter(e) {
			return (e = e == null ? Si : Math.pow(Si, e)), new Re(this.r * e, this.g * e, this.b * e, this.opacity);
		},
		darker(e) {
			return (e = e == null ? dn : Math.pow(dn, e)), new Re(this.r * e, this.g * e, this.b * e, this.opacity);
		},
		rgb() {
			return this;
		},
		clamp() {
			return new Re(Wt(this.r), Wt(this.g), Wt(this.b), Ai(this.opacity));
		},
		displayable() {
			return (
				-0.5 <= this.r &&
				this.r < 255.5 &&
				-0.5 <= this.g &&
				this.g < 255.5 &&
				-0.5 <= this.b &&
				this.b < 255.5 &&
				0 <= this.opacity &&
				this.opacity <= 1
			);
		},
		hex: vy,
		formatHex: vy,
		formatHex8: IP,
		formatRgb: yy,
		toString: yy,
	}),
);
function vy() {
	return `#${Ft(this.r)}${Ft(this.g)}${Ft(this.b)}`;
}
function IP() {
	return `#${Ft(this.r)}${Ft(this.g)}${Ft(this.b)}${Ft((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function yy() {
	const e = Ai(this.opacity);
	return `${e === 1 ? "rgb(" : "rgba("}${Wt(this.r)}, ${Wt(this.g)}, ${Wt(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function Ai(e) {
	return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function Wt(e) {
	return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function Ft(e) {
	return (e = Wt(e)), (e < 16 ? "0" : "") + e.toString(16);
}
function gy(e, t, r, n) {
	return (
		n <= 0 ? (e = t = r = Number.NaN) : r <= 0 || r >= 1 ? (e = t = Number.NaN) : t <= 0 && (e = Number.NaN),
		new Ye(e, t, r, n)
	);
}
function C0(e) {
	if (e instanceof Ye) return new Ye(e.h, e.s, e.l, e.opacity);
	if ((e instanceof Hn || (e = vn(e)), !e)) return new Ye();
	if (e instanceof Ye) return e;
	e = e.rgb();
	var t = e.r / 255,
		r = e.g / 255,
		n = e.b / 255,
		i = Math.min(t, r, n),
		a = Math.max(t, r, n),
		o = Number.NaN,
		u = a - i,
		c = (a + i) / 2;
	return (
		u
			? (t === a ? (o = (r - n) / u + (r < n) * 6) : r === a ? (o = (n - t) / u + 2) : (o = (t - r) / u + 4),
				(u /= c < 0.5 ? a + i : 2 - a - i),
				(o *= 60))
			: (u = c > 0 && c < 1 ? 0 : o),
		new Ye(o, u, c, e.opacity)
	);
}
function $P(e, t, r, n) {
	return arguments.length === 1 ? C0(e) : new Ye(e, t, r, n ?? 1);
}
function Ye(e, t, r, n) {
	(this.h = +e), (this.s = +t), (this.l = +r), (this.opacity = +n);
}
Mf(
	Ye,
	$P,
	M0(Hn, {
		brighter(e) {
			return (e = e == null ? Si : Math.pow(Si, e)), new Ye(this.h, this.s, this.l * e, this.opacity);
		},
		darker(e) {
			return (e = e == null ? dn : Math.pow(dn, e)), new Ye(this.h, this.s, this.l * e, this.opacity);
		},
		rgb() {
			var e = (this.h % 360) + (this.h < 0) * 360,
				t = isNaN(e) || isNaN(this.s) ? 0 : this.s,
				r = this.l,
				n = r + (r < 0.5 ? r : 1 - r) * t,
				i = 2 * r - n;
			return new Re(
				Xc(e >= 240 ? e - 240 : e + 120, i, n),
				Xc(e, i, n),
				Xc(e < 120 ? e + 240 : e - 120, i, n),
				this.opacity,
			);
		},
		clamp() {
			return new Ye(my(this.h), ri(this.s), ri(this.l), Ai(this.opacity));
		},
		displayable() {
			return (
				((0 <= this.s && this.s <= 1) || isNaN(this.s)) &&
				0 <= this.l &&
				this.l <= 1 &&
				0 <= this.opacity &&
				this.opacity <= 1
			);
		},
		formatHsl() {
			const e = Ai(this.opacity);
			return `${e === 1 ? "hsl(" : "hsla("}${my(this.h)}, ${ri(this.s) * 100}%, ${ri(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
		},
	}),
);
function my(e) {
	return (e = (e || 0) % 360), e < 0 ? e + 360 : e;
}
function ri(e) {
	return Math.max(0, Math.min(1, e || 0));
}
function Xc(e, t, r) {
	return (e < 60 ? t + ((r - t) * e) / 60 : e < 180 ? r : e < 240 ? t + ((r - t) * (240 - e)) / 60 : t) * 255;
}
const Cf = (e) => () => e;
function RP(e, t) {
	return (r) => e + r * t;
}
function NP(e, t, r) {
	return (e = Math.pow(e, r)), (t = Math.pow(t, r) - e), (r = 1 / r), (n) => Math.pow(e + n * t, r);
}
function kP(e) {
	return (e = +e) == 1 ? I0 : (t, r) => (r - t ? NP(t, r, e) : Cf(isNaN(t) ? r : t));
}
function I0(e, t) {
	var r = t - e;
	return r ? RP(e, r) : Cf(isNaN(e) ? t : e);
}
const by = (function e(t) {
	var r = kP(t);
	function n(i, a) {
		var o = r((i = hl(i)).r, (a = hl(a)).r),
			u = r(i.g, a.g),
			c = r(i.b, a.b),
			s = I0(i.opacity, a.opacity);
		return (f) => ((i.r = o(f)), (i.g = u(f)), (i.b = c(f)), (i.opacity = s(f)), i + "");
	}
	return (n.gamma = e), n;
})(1);
function DP(e, t) {
	t || (t = []);
	var r = e ? Math.min(t.length, e.length) : 0,
		n = t.slice(),
		i;
	return (a) => {
		for (i = 0; i < r; ++i) n[i] = e[i] * (1 - a) + t[i] * a;
		return n;
	};
}
function qP(e) {
	return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function LP(e, t) {
	var r = t ? t.length : 0,
		n = e ? Math.min(r, e.length) : 0,
		i = new Array(n),
		a = new Array(r),
		o;
	for (o = 0; o < n; ++o) i[o] = Dr(e[o], t[o]);
	for (; o < r; ++o) a[o] = t[o];
	return (u) => {
		for (o = 0; o < n; ++o) a[o] = i[o](u);
		return a;
	};
}
function BP(e, t) {
	var r = new Date();
	return (e = +e), (t = +t), (n) => (r.setTime(e * (1 - n) + t * n), r);
}
function Pi(e, t) {
	return (e = +e), (t = +t), (r) => e * (1 - r) + t * r;
}
function FP(e, t) {
	var r = {},
		n = {},
		i;
	(e === null || typeof e != "object") && (e = {}), (t === null || typeof t != "object") && (t = {});
	for (i in t) i in e ? (r[i] = Dr(e[i], t[i])) : (n[i] = t[i]);
	return (a) => {
		for (i in r) n[i] = r[i](a);
		return n;
	};
}
var dl = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
	Yc = new RegExp(dl.source, "g");
function UP(e) {
	return () => e;
}
function zP(e) {
	return (t) => e(t) + "";
}
function WP(e, t) {
	var r = (dl.lastIndex = Yc.lastIndex = 0),
		n,
		i,
		a,
		o = -1,
		u = [],
		c = [];
	for (e = e + "", t = t + ""; (n = dl.exec(e)) && (i = Yc.exec(t)); )
		(a = i.index) > r && ((a = t.slice(r, a)), u[o] ? (u[o] += a) : (u[++o] = a)),
			(n = n[0]) === (i = i[0])
				? u[o]
					? (u[o] += i)
					: (u[++o] = i)
				: ((u[++o] = null), c.push({ i: o, x: Pi(n, i) })),
			(r = Yc.lastIndex);
	return (
		r < t.length && ((a = t.slice(r)), u[o] ? (u[o] += a) : (u[++o] = a)),
		u.length < 2
			? c[0]
				? zP(c[0].x)
				: UP(t)
			: ((t = c.length),
				(s) => {
					for (var f = 0, l; f < t; ++f) u[(l = c[f]).i] = l.x(s);
					return u.join("");
				})
	);
}
function Dr(e, t) {
	var r = typeof t,
		n;
	return t == null || r === "boolean"
		? Cf(t)
		: (r === "number"
				? Pi
				: r === "string"
					? (n = vn(t))
						? ((t = n), by)
						: WP
					: t instanceof vn
						? by
						: t instanceof Date
							? BP
							: qP(t)
								? DP
								: Array.isArray(t)
									? LP
									: (typeof t.valueOf != "function" && typeof t.toString != "function") || isNaN(t)
										? FP
										: Pi)(e, t);
}
function If(e, t) {
	return (e = +e), (t = +t), (r) => Math.round(e * (1 - r) + t * r);
}
function GP(e, t) {
	t === void 0 && ((t = e), (e = Dr));
	for (var r = 0, n = t.length - 1, i = t[0], a = new Array(n < 0 ? 0 : n); r < n; ) a[r] = e(i, (i = t[++r]));
	return (o) => {
		var u = Math.max(0, Math.min(n - 1, Math.floor((o *= n))));
		return a[u](o - u);
	};
}
function HP(e) {
	return () => e;
}
function Ti(e) {
	return +e;
}
var xy = [0, 1];
function Ce(e) {
	return e;
}
function pl(e, t) {
	return (t -= e = +e) ? (r) => (r - e) / t : HP(isNaN(t) ? Number.NaN : 0.5);
}
function KP(e, t) {
	var r;
	return e > t && ((r = e), (e = t), (t = r)), (n) => Math.max(e, Math.min(t, n));
}
function VP(e, t, r) {
	var n = e[0],
		i = e[1],
		a = t[0],
		o = t[1];
	return i < n ? ((n = pl(i, n)), (a = r(o, a))) : ((n = pl(n, i)), (a = r(a, o))), (u) => a(n(u));
}
function XP(e, t, r) {
	var n = Math.min(e.length, t.length) - 1,
		i = new Array(n),
		a = new Array(n),
		o = -1;
	for (e[n] < e[0] && ((e = e.slice().reverse()), (t = t.slice().reverse())); ++o < n; )
		(i[o] = pl(e[o], e[o + 1])), (a[o] = r(t[o], t[o + 1]));
	return (u) => {
		var c = Gn(e, u, 1, n) - 1;
		return a[c](i[c](u));
	};
}
function Kn(e, t) {
	return t.domain(e.domain()).range(e.range()).interpolate(e.interpolate()).clamp(e.clamp()).unknown(e.unknown());
}
function ma() {
	var e = xy,
		t = xy,
		r = Dr,
		n,
		i,
		a,
		o = Ce,
		u,
		c,
		s;
	function f() {
		var h = Math.min(e.length, t.length);
		return o !== Ce && (o = KP(e[0], e[h - 1])), (u = h > 2 ? XP : VP), (c = s = null), l;
	}
	function l(h) {
		return h == null || isNaN((h = +h)) ? a : (c || (c = u(e.map(n), t, r)))(n(o(h)));
	}
	return (
		(l.invert = (h) => o(i((s || (s = u(t, e.map(n), Pi)))(h)))),
		(l.domain = (h) => (arguments.length ? ((e = Array.from(h, Ti)), f()) : e.slice())),
		(l.range = (h) => (arguments.length ? ((t = Array.from(h)), f()) : t.slice())),
		(l.rangeRound = (h) => ((t = Array.from(h)), (r = If), f())),
		(l.clamp = (h) => (arguments.length ? ((o = h ? !0 : Ce), f()) : o !== Ce)),
		(l.interpolate = (h) => (arguments.length ? ((r = h), f()) : r)),
		(l.unknown = (h) => (arguments.length ? ((a = h), l) : a)),
		(h, p) => ((n = h), (i = p), f())
	);
}
function $f() {
	return ma()(Ce, Ce);
}
function YP(e) {
	return Math.abs((e = Math.round(e))) >= 1e21 ? e.toLocaleString("en").replace(/,/g, "") : e.toString(10);
}
function Ei(e, t) {
	if ((r = (e = t ? e.toExponential(t - 1) : e.toExponential()).indexOf("e")) < 0) return null;
	var r,
		n = e.slice(0, r);
	return [n.length > 1 ? n[0] + n.slice(2) : n, +e.slice(r + 1)];
}
function gr(e) {
	return (e = Ei(Math.abs(e))), e ? e[1] : Number.NaN;
}
function ZP(e, t) {
	return (r, n) => {
		for (
			var i = r.length, a = [], o = 0, u = e[0], c = 0;
			i > 0 &&
			u > 0 &&
			(c + u + 1 > n && (u = Math.max(1, n - c)), a.push(r.substring((i -= u), i + u)), !((c += u + 1) > n));
		)
			u = e[(o = (o + 1) % e.length)];
		return a.reverse().join(t);
	};
}
function JP(e) {
	return (t) => t.replace(/[0-9]/g, (r) => e[+r]);
}
var QP = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function yn(e) {
	if (!(t = QP.exec(e))) throw new Error("invalid format: " + e);
	var t;
	return new Rf({
		fill: t[1],
		align: t[2],
		sign: t[3],
		symbol: t[4],
		zero: t[5],
		width: t[6],
		comma: t[7],
		precision: t[8] && t[8].slice(1),
		trim: t[9],
		type: t[10],
	});
}
yn.prototype = Rf.prototype;
function Rf(e) {
	(this.fill = e.fill === void 0 ? " " : e.fill + ""),
		(this.align = e.align === void 0 ? ">" : e.align + ""),
		(this.sign = e.sign === void 0 ? "-" : e.sign + ""),
		(this.symbol = e.symbol === void 0 ? "" : e.symbol + ""),
		(this.zero = !!e.zero),
		(this.width = e.width === void 0 ? void 0 : +e.width),
		(this.comma = !!e.comma),
		(this.precision = e.precision === void 0 ? void 0 : +e.precision),
		(this.trim = !!e.trim),
		(this.type = e.type === void 0 ? "" : e.type + "");
}
Rf.prototype.toString = function () {
	return (
		this.fill +
		this.align +
		this.sign +
		this.symbol +
		(this.zero ? "0" : "") +
		(this.width === void 0 ? "" : Math.max(1, this.width | 0)) +
		(this.comma ? "," : "") +
		(this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) +
		(this.trim ? "~" : "") +
		this.type
	);
};
function eT(e) {
	e: for (var t = e.length, r = 1, n = -1, i; r < t; ++r)
		switch (e[r]) {
			case ".":
				n = i = r;
				break;
			case "0":
				n === 0 && (n = r), (i = r);
				break;
			default:
				if (!+e[r]) break e;
				n > 0 && (n = 0);
				break;
		}
	return n > 0 ? e.slice(0, n) + e.slice(i + 1) : e;
}
var $0;
function tT(e, t) {
	var r = Ei(e, t);
	if (!r) return e + "";
	var n = r[0],
		i = r[1],
		a = i - ($0 = Math.max(-8, Math.min(8, Math.floor(i / 3))) * 3) + 1,
		o = n.length;
	return a === o
		? n
		: a > o
			? n + new Array(a - o + 1).join("0")
			: a > 0
				? n.slice(0, a) + "." + n.slice(a)
				: "0." + new Array(1 - a).join("0") + Ei(e, Math.max(0, t + a - 1))[0];
}
function wy(e, t) {
	var r = Ei(e, t);
	if (!r) return e + "";
	var n = r[0],
		i = r[1];
	return i < 0
		? "0." + new Array(-i).join("0") + n
		: n.length > i + 1
			? n.slice(0, i + 1) + "." + n.slice(i + 1)
			: n + new Array(i - n.length + 2).join("0");
}
const Oy = {
	"%": (e, t) => (e * 100).toFixed(t),
	b: (e) => Math.round(e).toString(2),
	c: (e) => e + "",
	d: YP,
	e: (e, t) => e.toExponential(t),
	f: (e, t) => e.toFixed(t),
	g: (e, t) => e.toPrecision(t),
	o: (e) => Math.round(e).toString(8),
	p: (e, t) => wy(e * 100, t),
	r: wy,
	s: tT,
	X: (e) => Math.round(e).toString(16).toUpperCase(),
	x: (e) => Math.round(e).toString(16),
};
function _y(e) {
	return e;
}
var Sy = Array.prototype.map,
	Ay = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function rT(e) {
	var t = e.grouping === void 0 || e.thousands === void 0 ? _y : ZP(Sy.call(e.grouping, Number), e.thousands + ""),
		r = e.currency === void 0 ? "" : e.currency[0] + "",
		n = e.currency === void 0 ? "" : e.currency[1] + "",
		i = e.decimal === void 0 ? "." : e.decimal + "",
		a = e.numerals === void 0 ? _y : JP(Sy.call(e.numerals, String)),
		o = e.percent === void 0 ? "%" : e.percent + "",
		u = e.minus === void 0 ? "−" : e.minus + "",
		c = e.nan === void 0 ? "NaN" : e.nan + "";
	function s(l) {
		l = yn(l);
		var h = l.fill,
			p = l.align,
			y = l.sign,
			v = l.symbol,
			d = l.zero,
			b = l.width,
			w = l.comma,
			x = l.precision,
			O = l.trim,
			g = l.type;
		g === "n" ? ((w = !0), (g = "g")) : Oy[g] || (x === void 0 && (x = 12), (O = !0), (g = "g")),
			(d || (h === "0" && p === "=")) && ((d = !0), (h = "0"), (p = "="));
		var m = v === "$" ? r : v === "#" && /[boxX]/.test(g) ? "0" + g.toLowerCase() : "",
			_ = v === "$" ? n : /[%p]/.test(g) ? o : "",
			S = Oy[g],
			P = /[defgprs%]/.test(g);
		x = x === void 0 ? 6 : /[gprs]/.test(g) ? Math.max(1, Math.min(21, x)) : Math.max(0, Math.min(20, x));
		function M(A) {
			var E = m,
				j = _,
				R,
				C,
				N;
			if (g === "c") (j = S(A) + j), (A = "");
			else {
				A = +A;
				var q = A < 0 || 1 / A < 0;
				if (
					((A = isNaN(A) ? c : S(Math.abs(A), x)),
					O && (A = eT(A)),
					q && +A == 0 && y !== "+" && (q = !1),
					(E = (q ? (y === "(" ? y : u) : y === "-" || y === "(" ? "" : y) + E),
					(j = (g === "s" ? Ay[8 + $0 / 3] : "") + j + (q && y === "(" ? ")" : "")),
					P)
				) {
					for (R = -1, C = A.length; ++R < C; )
						if (((N = A.charCodeAt(R)), 48 > N || N > 57)) {
							(j = (N === 46 ? i + A.slice(R + 1) : A.slice(R)) + j), (A = A.slice(0, R));
							break;
						}
				}
			}
			w && !d && (A = t(A, 1 / 0));
			var L = E.length + A.length + j.length,
				F = L < b ? new Array(b - L + 1).join(h) : "";
			switch ((w && d && ((A = t(F + A, F.length ? b - j.length : 1 / 0)), (F = "")), p)) {
				case "<":
					A = E + A + j + F;
					break;
				case "=":
					A = E + F + A + j;
					break;
				case "^":
					A = F.slice(0, (L = F.length >> 1)) + E + A + j + F.slice(L);
					break;
				default:
					A = F + E + A + j;
					break;
			}
			return a(A);
		}
		return (M.toString = () => l + ""), M;
	}
	function f(l, h) {
		var p = s(((l = yn(l)), (l.type = "f"), l)),
			y = Math.max(-8, Math.min(8, Math.floor(gr(h) / 3))) * 3,
			v = Math.pow(10, -y),
			d = Ay[8 + y / 3];
		return (b) => p(v * b) + d;
	}
	return { format: s, formatPrefix: f };
}
var ni, Nf, R0;
nT({ thousands: ",", grouping: [3], currency: ["$", ""] });
function nT(e) {
	return (ni = rT(e)), (Nf = ni.format), (R0 = ni.formatPrefix), ni;
}
function iT(e) {
	return Math.max(0, -gr(Math.abs(e)));
}
function aT(e, t) {
	return Math.max(0, Math.max(-8, Math.min(8, Math.floor(gr(t) / 3))) * 3 - gr(Math.abs(e)));
}
function oT(e, t) {
	return (e = Math.abs(e)), (t = Math.abs(t) - e), Math.max(0, gr(t) - gr(e)) + 1;
}
function N0(e, t, r, n) {
	var i = ll(e, t, r),
		a;
	switch (((n = yn(n ?? ",f")), n.type)) {
		case "s": {
			var o = Math.max(Math.abs(e), Math.abs(t));
			return n.precision == null && !isNaN((a = aT(i, o))) && (n.precision = a), R0(n, o);
		}
		case "":
		case "e":
		case "g":
		case "p":
		case "r": {
			n.precision == null &&
				!isNaN((a = oT(i, Math.max(Math.abs(e), Math.abs(t))))) &&
				(n.precision = a - (n.type === "e"));
			break;
		}
		case "f":
		case "%": {
			n.precision == null && !isNaN((a = iT(i))) && (n.precision = a - (n.type === "%") * 2);
			break;
		}
	}
	return Nf(n);
}
function Ct(e) {
	var t = e.domain;
	return (
		(e.ticks = (r) => {
			var n = t();
			return cl(n[0], n[n.length - 1], r ?? 10);
		}),
		(e.tickFormat = (r, n) => {
			var i = t();
			return N0(i[0], i[i.length - 1], r ?? 10, n);
		}),
		(e.nice = (r) => {
			r == null && (r = 10);
			var n = t(),
				i = 0,
				a = n.length - 1,
				o = n[i],
				u = n[a],
				c,
				s,
				f = 10;
			for (u < o && ((s = o), (o = u), (u = s), (s = i), (i = a), (a = s)); f-- > 0; ) {
				if (((s = sl(o, u, r)), s === c)) return (n[i] = o), (n[a] = u), t(n);
				if (s > 0) (o = Math.floor(o / s) * s), (u = Math.ceil(u / s) * s);
				else if (s < 0) (o = Math.ceil(o * s) / s), (u = Math.floor(u * s) / s);
				else break;
				c = s;
			}
			return e;
		}),
		e
	);
}
function ji() {
	var e = $f();
	return (e.copy = () => Kn(e, ji())), Ge.apply(e, arguments), Ct(e);
}
function k0(e) {
	var t;
	function r(n) {
		return n == null || isNaN((n = +n)) ? t : n;
	}
	return (
		(r.invert = r),
		(r.domain = r.range = (n) => (arguments.length ? ((e = Array.from(n, Ti)), r) : e.slice())),
		(r.unknown = (n) => (arguments.length ? ((t = n), r) : t)),
		(r.copy = () => k0(e).unknown(t)),
		(e = arguments.length ? Array.from(e, Ti) : [0, 1]),
		Ct(r)
	);
}
function D0(e, t) {
	e = e.slice();
	var r = 0,
		n = e.length - 1,
		i = e[r],
		a = e[n],
		o;
	return a < i && ((o = r), (r = n), (n = o), (o = i), (i = a), (a = o)), (e[r] = t.floor(i)), (e[n] = t.ceil(a)), e;
}
function Py(e) {
	return Math.log(e);
}
function Ty(e) {
	return Math.exp(e);
}
function uT(e) {
	return -Math.log(-e);
}
function cT(e) {
	return -Math.exp(-e);
}
function sT(e) {
	return isFinite(e) ? +("1e" + e) : e < 0 ? 0 : e;
}
function lT(e) {
	return e === 10 ? sT : e === Math.E ? Math.exp : (t) => Math.pow(e, t);
}
function fT(e) {
	return e === Math.E
		? Math.log
		: (e === 10 && Math.log10) || (e === 2 && Math.log2) || ((e = Math.log(e)), (t) => Math.log(t) / e);
}
function Ey(e) {
	return (t, r) => -e(-t, r);
}
function kf(e) {
	const t = e(Py, Ty),
		r = t.domain;
	let n = 10,
		i,
		a;
	function o() {
		return (i = fT(n)), (a = lT(n)), r()[0] < 0 ? ((i = Ey(i)), (a = Ey(a)), e(uT, cT)) : e(Py, Ty), t;
	}
	return (
		(t.base = (u) => (arguments.length ? ((n = +u), o()) : n)),
		(t.domain = (u) => (arguments.length ? (r(u), o()) : r())),
		(t.ticks = (u) => {
			const c = r();
			let s = c[0],
				f = c[c.length - 1];
			const l = f < s;
			l && ([s, f] = [f, s]);
			let h = i(s),
				p = i(f),
				y,
				v;
			const d = u == null ? 10 : +u;
			let b = [];
			if (!(n % 1) && p - h < d) {
				if (((h = Math.floor(h)), (p = Math.ceil(p)), s > 0)) {
					for (; h <= p; ++h)
						for (y = 1; y < n; ++y)
							if (((v = h < 0 ? y / a(-h) : y * a(h)), !(v < s))) {
								if (v > f) break;
								b.push(v);
							}
				} else
					for (; h <= p; ++h)
						for (y = n - 1; y >= 1; --y)
							if (((v = h > 0 ? y / a(-h) : y * a(h)), !(v < s))) {
								if (v > f) break;
								b.push(v);
							}
				b.length * 2 < d && (b = cl(s, f, d));
			} else b = cl(h, p, Math.min(p - h, d)).map(a);
			return l ? b.reverse() : b;
		}),
		(t.tickFormat = (u, c) => {
			if (
				(u == null && (u = 10),
				c == null && (c = n === 10 ? "s" : ","),
				typeof c != "function" && (!(n % 1) && (c = yn(c)).precision == null && (c.trim = !0), (c = Nf(c))),
				u === 1 / 0)
			)
				return c;
			const s = Math.max(1, (n * u) / t.ticks().length);
			return (f) => {
				let l = f / a(Math.round(i(f)));
				return l * n < n - 0.5 && (l *= n), l <= s ? c(f) : "";
			};
		}),
		(t.nice = () => r(D0(r(), { floor: (u) => a(Math.floor(i(u))), ceil: (u) => a(Math.ceil(i(u))) }))),
		t
	);
}
function q0() {
	const e = kf(ma()).domain([1, 10]);
	return (e.copy = () => Kn(e, q0()).base(e.base())), Ge.apply(e, arguments), e;
}
function jy(e) {
	return (t) => Math.sign(t) * Math.log1p(Math.abs(t / e));
}
function My(e) {
	return (t) => Math.sign(t) * Math.expm1(Math.abs(t)) * e;
}
function Df(e) {
	var t = 1,
		r = e(jy(t), My(t));
	return (r.constant = (n) => (arguments.length ? e(jy((t = +n)), My(t)) : t)), Ct(r);
}
function L0() {
	var e = Df(ma());
	return (e.copy = () => Kn(e, L0()).constant(e.constant())), Ge.apply(e, arguments);
}
function Cy(e) {
	return (t) => (t < 0 ? -Math.pow(-t, e) : Math.pow(t, e));
}
function hT(e) {
	return e < 0 ? -Math.sqrt(-e) : Math.sqrt(e);
}
function dT(e) {
	return e < 0 ? -e * e : e * e;
}
function qf(e) {
	var t = e(Ce, Ce),
		r = 1;
	function n() {
		return r === 1 ? e(Ce, Ce) : r === 0.5 ? e(hT, dT) : e(Cy(r), Cy(1 / r));
	}
	return (t.exponent = (i) => (arguments.length ? ((r = +i), n()) : r)), Ct(t);
}
function Lf() {
	var e = qf(ma());
	return (e.copy = () => Kn(e, Lf()).exponent(e.exponent())), Ge.apply(e, arguments), e;
}
function pT() {
	return Lf.apply(null, arguments).exponent(0.5);
}
function Iy(e) {
	return Math.sign(e) * e * e;
}
function vT(e) {
	return Math.sign(e) * Math.sqrt(Math.abs(e));
}
function B0() {
	var e = $f(),
		t = [0, 1],
		r = !1,
		n;
	function i(a) {
		var o = vT(e(a));
		return isNaN(o) ? n : r ? Math.round(o) : o;
	}
	return (
		(i.invert = (a) => e.invert(Iy(a))),
		(i.domain = (a) => (arguments.length ? (e.domain(a), i) : e.domain())),
		(i.range = (a) => (arguments.length ? (e.range((t = Array.from(a, Ti)).map(Iy)), i) : t.slice())),
		(i.rangeRound = (a) => i.range(a).round(!0)),
		(i.round = (a) => (arguments.length ? ((r = !!a), i) : r)),
		(i.clamp = (a) => (arguments.length ? (e.clamp(a), i) : e.clamp())),
		(i.unknown = (a) => (arguments.length ? ((n = a), i) : n)),
		(i.copy = () => B0(e.domain(), t).round(r).clamp(e.clamp()).unknown(n)),
		Ge.apply(i, arguments),
		Ct(i)
	);
}
function F0() {
	var e = [],
		t = [],
		r = [],
		n;
	function i() {
		var o = 0,
			u = Math.max(1, t.length);
		for (r = new Array(u - 1); ++o < u; ) r[o - 1] = xP(e, o / u);
		return a;
	}
	function a(o) {
		return o == null || isNaN((o = +o)) ? n : t[Gn(r, o)];
	}
	return (
		(a.invertExtent = (o) => {
			var u = t.indexOf(o);
			return u < 0 ? [Number.NaN, Number.NaN] : [u > 0 ? r[u - 1] : e[0], u < r.length ? r[u] : e[e.length - 1]];
		}),
		(a.domain = (o) => {
			if (!arguments.length) return e.slice();
			e = [];
			for (let u of o) u != null && !isNaN((u = +u)) && e.push(u);
			return e.sort(Tt), i();
		}),
		(a.range = (o) => (arguments.length ? ((t = Array.from(o)), i()) : t.slice())),
		(a.unknown = (o) => (arguments.length ? ((n = o), a) : n)),
		(a.quantiles = () => r.slice()),
		(a.copy = () => F0().domain(e).range(t).unknown(n)),
		Ge.apply(a, arguments)
	);
}
function U0() {
	var e = 0,
		t = 1,
		r = 1,
		n = [0.5],
		i = [0, 1],
		a;
	function o(c) {
		return c != null && c <= c ? i[Gn(n, c, 0, r)] : a;
	}
	function u() {
		var c = -1;
		for (n = new Array(r); ++c < r; ) n[c] = ((c + 1) * t - (c - r) * e) / (r + 1);
		return o;
	}
	return (
		(o.domain = (c) => (arguments.length ? (([e, t] = c), (e = +e), (t = +t), u()) : [e, t])),
		(o.range = (c) => (arguments.length ? ((r = (i = Array.from(c)).length - 1), u()) : i.slice())),
		(o.invertExtent = (c) => {
			var s = i.indexOf(c);
			return s < 0 ? [Number.NaN, Number.NaN] : s < 1 ? [e, n[0]] : s >= r ? [n[r - 1], t] : [n[s - 1], n[s]];
		}),
		(o.unknown = (c) => (arguments.length && (a = c), o)),
		(o.thresholds = () => n.slice()),
		(o.copy = () => U0().domain([e, t]).range(i).unknown(a)),
		Ge.apply(Ct(o), arguments)
	);
}
function z0() {
	var e = [0.5],
		t = [0, 1],
		r,
		n = 1;
	function i(a) {
		return a != null && a <= a ? t[Gn(e, a, 0, n)] : r;
	}
	return (
		(i.domain = (a) =>
			arguments.length ? ((e = Array.from(a)), (n = Math.min(e.length, t.length - 1)), i) : e.slice()),
		(i.range = (a) =>
			arguments.length ? ((t = Array.from(a)), (n = Math.min(e.length, t.length - 1)), i) : t.slice()),
		(i.invertExtent = (a) => {
			var o = t.indexOf(a);
			return [e[o - 1], e[o]];
		}),
		(i.unknown = (a) => (arguments.length ? ((r = a), i) : r)),
		(i.copy = () => z0().domain(e).range(t).unknown(r)),
		Ge.apply(i, arguments)
	);
}
const Zc = new Date(),
	Jc = new Date();
function we(e, t, r, n) {
	function i(a) {
		return e((a = arguments.length === 0 ? new Date() : new Date(+a))), a;
	}
	return (
		(i.floor = (a) => (e((a = new Date(+a))), a)),
		(i.ceil = (a) => (e((a = new Date(a - 1))), t(a, 1), e(a), a)),
		(i.round = (a) => {
			const o = i(a),
				u = i.ceil(a);
			return a - o < u - a ? o : u;
		}),
		(i.offset = (a, o) => (t((a = new Date(+a)), o == null ? 1 : Math.floor(o)), a)),
		(i.range = (a, o, u) => {
			const c = [];
			if (((a = i.ceil(a)), (u = u == null ? 1 : Math.floor(u)), !(a < o) || !(u > 0))) return c;
			let s;
			do c.push((s = new Date(+a))), t(a, u), e(a);
			while (s < a && a < o);
			return c;
		}),
		(i.filter = (a) =>
			we(
				(o) => {
					if (o >= o) while ((e(o), !a(o))) o.setTime(o - 1);
				},
				(o, u) => {
					if (o >= o)
						if (u < 0) while (++u <= 0) while ((t(o, -1), !a(o)));
						else while (--u >= 0) while ((t(o, 1), !a(o)));
				},
			)),
		r &&
			((i.count = (a, o) => (Zc.setTime(+a), Jc.setTime(+o), e(Zc), e(Jc), Math.floor(r(Zc, Jc)))),
			(i.every = (a) => (
				(a = Math.floor(a)),
				!isFinite(a) || !(a > 0)
					? null
					: a > 1
						? i.filter(n ? (o) => n(o) % a === 0 : (o) => i.count(0, o) % a === 0)
						: i
			))),
		i
	);
}
const Mi = we(
	() => {},
	(e, t) => {
		e.setTime(+e + t);
	},
	(e, t) => t - e,
);
Mi.every = (e) => (
	(e = Math.floor(e)),
	!isFinite(e) || !(e > 0)
		? null
		: e > 1
			? we(
					(t) => {
						t.setTime(Math.floor(t / e) * e);
					},
					(t, r) => {
						t.setTime(+t + r * e);
					},
					(t, r) => (r - t) / e,
				)
			: Mi
);
Mi.range;
const st = 1e3,
	Ue = st * 60,
	lt = Ue * 60,
	yt = lt * 24,
	Bf = yt * 7,
	$y = yt * 30,
	Qc = yt * 365,
	Ut = we(
		(e) => {
			e.setTime(e - e.getMilliseconds());
		},
		(e, t) => {
			e.setTime(+e + t * st);
		},
		(e, t) => (t - e) / st,
		(e) => e.getUTCSeconds(),
	);
Ut.range;
const Ff = we(
	(e) => {
		e.setTime(e - e.getMilliseconds() - e.getSeconds() * st);
	},
	(e, t) => {
		e.setTime(+e + t * Ue);
	},
	(e, t) => (t - e) / Ue,
	(e) => e.getMinutes(),
);
Ff.range;
const Uf = we(
	(e) => {
		e.setUTCSeconds(0, 0);
	},
	(e, t) => {
		e.setTime(+e + t * Ue);
	},
	(e, t) => (t - e) / Ue,
	(e) => e.getUTCMinutes(),
);
Uf.range;
const zf = we(
	(e) => {
		e.setTime(e - e.getMilliseconds() - e.getSeconds() * st - e.getMinutes() * Ue);
	},
	(e, t) => {
		e.setTime(+e + t * lt);
	},
	(e, t) => (t - e) / lt,
	(e) => e.getHours(),
);
zf.range;
const Wf = we(
	(e) => {
		e.setUTCMinutes(0, 0, 0);
	},
	(e, t) => {
		e.setTime(+e + t * lt);
	},
	(e, t) => (t - e) / lt,
	(e) => e.getUTCHours(),
);
Wf.range;
const Vn = we(
	(e) => e.setHours(0, 0, 0, 0),
	(e, t) => e.setDate(e.getDate() + t),
	(e, t) => (t - e - (t.getTimezoneOffset() - e.getTimezoneOffset()) * Ue) / yt,
	(e) => e.getDate() - 1,
);
Vn.range;
const ba = we(
	(e) => {
		e.setUTCHours(0, 0, 0, 0);
	},
	(e, t) => {
		e.setUTCDate(e.getUTCDate() + t);
	},
	(e, t) => (t - e) / yt,
	(e) => e.getUTCDate() - 1,
);
ba.range;
const W0 = we(
	(e) => {
		e.setUTCHours(0, 0, 0, 0);
	},
	(e, t) => {
		e.setUTCDate(e.getUTCDate() + t);
	},
	(e, t) => (t - e) / yt,
	(e) => Math.floor(e / yt),
);
W0.range;
function Zt(e) {
	return we(
		(t) => {
			t.setDate(t.getDate() - ((t.getDay() + 7 - e) % 7)), t.setHours(0, 0, 0, 0);
		},
		(t, r) => {
			t.setDate(t.getDate() + r * 7);
		},
		(t, r) => (r - t - (r.getTimezoneOffset() - t.getTimezoneOffset()) * Ue) / Bf,
	);
}
const xa = Zt(0),
	Ci = Zt(1),
	yT = Zt(2),
	gT = Zt(3),
	mr = Zt(4),
	mT = Zt(5),
	bT = Zt(6);
xa.range;
Ci.range;
yT.range;
gT.range;
mr.range;
mT.range;
bT.range;
function Jt(e) {
	return we(
		(t) => {
			t.setUTCDate(t.getUTCDate() - ((t.getUTCDay() + 7 - e) % 7)), t.setUTCHours(0, 0, 0, 0);
		},
		(t, r) => {
			t.setUTCDate(t.getUTCDate() + r * 7);
		},
		(t, r) => (r - t) / Bf,
	);
}
const wa = Jt(0),
	Ii = Jt(1),
	xT = Jt(2),
	wT = Jt(3),
	br = Jt(4),
	OT = Jt(5),
	_T = Jt(6);
wa.range;
Ii.range;
xT.range;
wT.range;
br.range;
OT.range;
_T.range;
const Gf = we(
	(e) => {
		e.setDate(1), e.setHours(0, 0, 0, 0);
	},
	(e, t) => {
		e.setMonth(e.getMonth() + t);
	},
	(e, t) => t.getMonth() - e.getMonth() + (t.getFullYear() - e.getFullYear()) * 12,
	(e) => e.getMonth(),
);
Gf.range;
const Hf = we(
	(e) => {
		e.setUTCDate(1), e.setUTCHours(0, 0, 0, 0);
	},
	(e, t) => {
		e.setUTCMonth(e.getUTCMonth() + t);
	},
	(e, t) => t.getUTCMonth() - e.getUTCMonth() + (t.getUTCFullYear() - e.getUTCFullYear()) * 12,
	(e) => e.getUTCMonth(),
);
Hf.range;
const gt = we(
	(e) => {
		e.setMonth(0, 1), e.setHours(0, 0, 0, 0);
	},
	(e, t) => {
		e.setFullYear(e.getFullYear() + t);
	},
	(e, t) => t.getFullYear() - e.getFullYear(),
	(e) => e.getFullYear(),
);
gt.every = (e) =>
	!isFinite((e = Math.floor(e))) || !(e > 0)
		? null
		: we(
				(t) => {
					t.setFullYear(Math.floor(t.getFullYear() / e) * e), t.setMonth(0, 1), t.setHours(0, 0, 0, 0);
				},
				(t, r) => {
					t.setFullYear(t.getFullYear() + r * e);
				},
			);
gt.range;
const mt = we(
	(e) => {
		e.setUTCMonth(0, 1), e.setUTCHours(0, 0, 0, 0);
	},
	(e, t) => {
		e.setUTCFullYear(e.getUTCFullYear() + t);
	},
	(e, t) => t.getUTCFullYear() - e.getUTCFullYear(),
	(e) => e.getUTCFullYear(),
);
mt.every = (e) =>
	!isFinite((e = Math.floor(e))) || !(e > 0)
		? null
		: we(
				(t) => {
					t.setUTCFullYear(Math.floor(t.getUTCFullYear() / e) * e), t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0);
				},
				(t, r) => {
					t.setUTCFullYear(t.getUTCFullYear() + r * e);
				},
			);
mt.range;
function G0(e, t, r, n, i, a) {
	const o = [
		[Ut, 1, st],
		[Ut, 5, 5 * st],
		[Ut, 15, 15 * st],
		[Ut, 30, 30 * st],
		[a, 1, Ue],
		[a, 5, 5 * Ue],
		[a, 15, 15 * Ue],
		[a, 30, 30 * Ue],
		[i, 1, lt],
		[i, 3, 3 * lt],
		[i, 6, 6 * lt],
		[i, 12, 12 * lt],
		[n, 1, yt],
		[n, 2, 2 * yt],
		[r, 1, Bf],
		[t, 1, $y],
		[t, 3, 3 * $y],
		[e, 1, Qc],
	];
	function u(s, f, l) {
		const h = f < s;
		h && ([s, f] = [f, s]);
		const p = l && typeof l.range == "function" ? l : c(s, f, l),
			y = p ? p.range(s, +f + 1) : [];
		return h ? y.reverse() : y;
	}
	function c(s, f, l) {
		const h = Math.abs(f - s) / l,
			p = Ef(([, , d]) => d).right(o, h);
		if (p === o.length) return e.every(ll(s / Qc, f / Qc, l));
		if (p === 0) return Mi.every(Math.max(ll(s, f, l), 1));
		const [y, v] = o[h / o[p - 1][2] < o[p][2] / h ? p - 1 : p];
		return y.every(v);
	}
	return [u, c];
}
const [ST, AT] = G0(mt, Hf, wa, W0, Wf, Uf),
	[PT, TT] = G0(gt, Gf, xa, Vn, zf, Ff);
function es(e) {
	if (0 <= e.y && e.y < 100) {
		var t = new Date(-1, e.m, e.d, e.H, e.M, e.S, e.L);
		return t.setFullYear(e.y), t;
	}
	return new Date(e.y, e.m, e.d, e.H, e.M, e.S, e.L);
}
function ts(e) {
	if (0 <= e.y && e.y < 100) {
		var t = new Date(Date.UTC(-1, e.m, e.d, e.H, e.M, e.S, e.L));
		return t.setUTCFullYear(e.y), t;
	}
	return new Date(Date.UTC(e.y, e.m, e.d, e.H, e.M, e.S, e.L));
}
function Wr(e, t, r) {
	return { y: e, m: t, d: r, H: 0, M: 0, S: 0, L: 0 };
}
function ET(e) {
	var t = e.dateTime,
		r = e.date,
		n = e.time,
		i = e.periods,
		a = e.days,
		o = e.shortDays,
		u = e.months,
		c = e.shortMonths,
		s = Gr(i),
		f = Hr(i),
		l = Gr(a),
		h = Hr(a),
		p = Gr(o),
		y = Hr(o),
		v = Gr(u),
		d = Hr(u),
		b = Gr(c),
		w = Hr(c),
		x = {
			a: q,
			A: L,
			b: F,
			B: G,
			c: null,
			d: Ly,
			e: Ly,
			f: ZT,
			g: uE,
			G: sE,
			H: VT,
			I: XT,
			j: YT,
			L: H0,
			m: JT,
			M: QT,
			p: K,
			q: z,
			Q: Uy,
			s: zy,
			S: eE,
			u: tE,
			U: rE,
			V: nE,
			w: iE,
			W: aE,
			x: null,
			X: null,
			y: oE,
			Y: cE,
			Z: lE,
			"%": Fy,
		},
		O = {
			a: V,
			A: se,
			b: pe,
			B: ke,
			c: null,
			d: By,
			e: By,
			f: pE,
			g: SE,
			G: PE,
			H: fE,
			I: hE,
			j: dE,
			L: V0,
			m: vE,
			M: yE,
			p: Rt,
			q: Ie,
			Q: Uy,
			s: zy,
			S: gE,
			u: mE,
			U: bE,
			V: xE,
			w: wE,
			W: OE,
			x: null,
			X: null,
			y: _E,
			Y: AE,
			Z: TE,
			"%": Fy,
		},
		g = {
			a: M,
			A,
			b: E,
			B: j,
			c: R,
			d: Dy,
			e: Dy,
			f: WT,
			g: ky,
			G: Ny,
			H: qy,
			I: qy,
			j: BT,
			L: zT,
			m: LT,
			M: FT,
			p: P,
			q: qT,
			Q: HT,
			s: KT,
			S: UT,
			u: $T,
			U: RT,
			V: NT,
			w: IT,
			W: kT,
			x: C,
			X: N,
			y: ky,
			Y: Ny,
			Z: DT,
			"%": GT,
		};
	(x.x = m(r, x)), (x.X = m(n, x)), (x.c = m(t, x)), (O.x = m(r, O)), (O.X = m(n, O)), (O.c = m(t, O));
	function m(U, X) {
		return (Y) => {
			var D = [],
				he = -1,
				J = 0,
				ge = U.length,
				me,
				$e,
				_t;
			for (Y instanceof Date || (Y = new Date(+Y)); ++he < ge; )
				U.charCodeAt(he) === 37 &&
					(D.push(U.slice(J, he)),
					($e = Ry[(me = U.charAt(++he))]) != null ? (me = U.charAt(++he)) : ($e = me === "e" ? " " : "0"),
					(_t = X[me]) && (me = _t(Y, $e)),
					D.push(me),
					(J = he + 1));
			return D.push(U.slice(J, he)), D.join("");
		};
	}
	function _(U, X) {
		return (Y) => {
			var D = Wr(1900, void 0, 1),
				he = S(D, U, (Y += ""), 0),
				J,
				ge;
			if (he != Y.length) return null;
			if ("Q" in D) return new Date(D.Q);
			if ("s" in D) return new Date(D.s * 1e3 + ("L" in D ? D.L : 0));
			if (
				(X && !("Z" in D) && (D.Z = 0),
				"p" in D && (D.H = (D.H % 12) + D.p * 12),
				D.m === void 0 && (D.m = "q" in D ? D.q : 0),
				"V" in D)
			) {
				if (D.V < 1 || D.V > 53) return null;
				"w" in D || (D.w = 1),
					"Z" in D
						? ((J = ts(Wr(D.y, 0, 1))),
							(ge = J.getUTCDay()),
							(J = ge > 4 || ge === 0 ? Ii.ceil(J) : Ii(J)),
							(J = ba.offset(J, (D.V - 1) * 7)),
							(D.y = J.getUTCFullYear()),
							(D.m = J.getUTCMonth()),
							(D.d = J.getUTCDate() + ((D.w + 6) % 7)))
						: ((J = es(Wr(D.y, 0, 1))),
							(ge = J.getDay()),
							(J = ge > 4 || ge === 0 ? Ci.ceil(J) : Ci(J)),
							(J = Vn.offset(J, (D.V - 1) * 7)),
							(D.y = J.getFullYear()),
							(D.m = J.getMonth()),
							(D.d = J.getDate() + ((D.w + 6) % 7)));
			} else
				("W" in D || "U" in D) &&
					("w" in D || (D.w = "u" in D ? D.u % 7 : "W" in D ? 1 : 0),
					(ge = "Z" in D ? ts(Wr(D.y, 0, 1)).getUTCDay() : es(Wr(D.y, 0, 1)).getDay()),
					(D.m = 0),
					(D.d = "W" in D ? ((D.w + 6) % 7) + D.W * 7 - ((ge + 5) % 7) : D.w + D.U * 7 - ((ge + 6) % 7)));
			return "Z" in D ? ((D.H += (D.Z / 100) | 0), (D.M += D.Z % 100), ts(D)) : es(D);
		};
	}
	function S(U, X, Y, D) {
		for (var he = 0, J = X.length, ge = Y.length, me, $e; he < J; ) {
			if (D >= ge) return -1;
			if (((me = X.charCodeAt(he++)), me === 37)) {
				if (((me = X.charAt(he++)), ($e = g[me in Ry ? X.charAt(he++) : me]), !$e || (D = $e(U, Y, D)) < 0)) return -1;
			} else if (me != Y.charCodeAt(D++)) return -1;
		}
		return D;
	}
	function P(U, X, Y) {
		var D = s.exec(X.slice(Y));
		return D ? ((U.p = f.get(D[0].toLowerCase())), Y + D[0].length) : -1;
	}
	function M(U, X, Y) {
		var D = p.exec(X.slice(Y));
		return D ? ((U.w = y.get(D[0].toLowerCase())), Y + D[0].length) : -1;
	}
	function A(U, X, Y) {
		var D = l.exec(X.slice(Y));
		return D ? ((U.w = h.get(D[0].toLowerCase())), Y + D[0].length) : -1;
	}
	function E(U, X, Y) {
		var D = b.exec(X.slice(Y));
		return D ? ((U.m = w.get(D[0].toLowerCase())), Y + D[0].length) : -1;
	}
	function j(U, X, Y) {
		var D = v.exec(X.slice(Y));
		return D ? ((U.m = d.get(D[0].toLowerCase())), Y + D[0].length) : -1;
	}
	function R(U, X, Y) {
		return S(U, t, X, Y);
	}
	function C(U, X, Y) {
		return S(U, r, X, Y);
	}
	function N(U, X, Y) {
		return S(U, n, X, Y);
	}
	function q(U) {
		return o[U.getDay()];
	}
	function L(U) {
		return a[U.getDay()];
	}
	function F(U) {
		return c[U.getMonth()];
	}
	function G(U) {
		return u[U.getMonth()];
	}
	function K(U) {
		return i[+(U.getHours() >= 12)];
	}
	function z(U) {
		return 1 + ~~(U.getMonth() / 3);
	}
	function V(U) {
		return o[U.getUTCDay()];
	}
	function se(U) {
		return a[U.getUTCDay()];
	}
	function pe(U) {
		return c[U.getUTCMonth()];
	}
	function ke(U) {
		return u[U.getUTCMonth()];
	}
	function Rt(U) {
		return i[+(U.getUTCHours() >= 12)];
	}
	function Ie(U) {
		return 1 + ~~(U.getUTCMonth() / 3);
	}
	return {
		format: (U) => {
			var X = m((U += ""), x);
			return (X.toString = () => U), X;
		},
		parse: (U) => {
			var X = _((U += ""), !1);
			return (X.toString = () => U), X;
		},
		utcFormat: (U) => {
			var X = m((U += ""), O);
			return (X.toString = () => U), X;
		},
		utcParse: (U) => {
			var X = _((U += ""), !0);
			return (X.toString = () => U), X;
		},
	};
}
var Ry = { "-": "", _: " ", 0: "0" },
	Se = /^\s*\d+/,
	jT = /^%/,
	MT = /[\\^$*+?|[\]().{}]/g;
function Q(e, t, r) {
	var n = e < 0 ? "-" : "",
		i = (n ? -e : e) + "",
		a = i.length;
	return n + (a < r ? new Array(r - a + 1).join(t) + i : i);
}
function CT(e) {
	return e.replace(MT, "\\$&");
}
function Gr(e) {
	return new RegExp("^(?:" + e.map(CT).join("|") + ")", "i");
}
function Hr(e) {
	return new Map(e.map((t, r) => [t.toLowerCase(), r]));
}
function IT(e, t, r) {
	var n = Se.exec(t.slice(r, r + 1));
	return n ? ((e.w = +n[0]), r + n[0].length) : -1;
}
function $T(e, t, r) {
	var n = Se.exec(t.slice(r, r + 1));
	return n ? ((e.u = +n[0]), r + n[0].length) : -1;
}
function RT(e, t, r) {
	var n = Se.exec(t.slice(r, r + 2));
	return n ? ((e.U = +n[0]), r + n[0].length) : -1;
}
function NT(e, t, r) {
	var n = Se.exec(t.slice(r, r + 2));
	return n ? ((e.V = +n[0]), r + n[0].length) : -1;
}
function kT(e, t, r) {
	var n = Se.exec(t.slice(r, r + 2));
	return n ? ((e.W = +n[0]), r + n[0].length) : -1;
}
function Ny(e, t, r) {
	var n = Se.exec(t.slice(r, r + 4));
	return n ? ((e.y = +n[0]), r + n[0].length) : -1;
}
function ky(e, t, r) {
	var n = Se.exec(t.slice(r, r + 2));
	return n ? ((e.y = +n[0] + (+n[0] > 68 ? 1900 : 2e3)), r + n[0].length) : -1;
}
function DT(e, t, r) {
	var n = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(t.slice(r, r + 6));
	return n ? ((e.Z = n[1] ? 0 : -(n[2] + (n[3] || "00"))), r + n[0].length) : -1;
}
function qT(e, t, r) {
	var n = Se.exec(t.slice(r, r + 1));
	return n ? ((e.q = n[0] * 3 - 3), r + n[0].length) : -1;
}
function LT(e, t, r) {
	var n = Se.exec(t.slice(r, r + 2));
	return n ? ((e.m = n[0] - 1), r + n[0].length) : -1;
}
function Dy(e, t, r) {
	var n = Se.exec(t.slice(r, r + 2));
	return n ? ((e.d = +n[0]), r + n[0].length) : -1;
}
function BT(e, t, r) {
	var n = Se.exec(t.slice(r, r + 3));
	return n ? ((e.m = 0), (e.d = +n[0]), r + n[0].length) : -1;
}
function qy(e, t, r) {
	var n = Se.exec(t.slice(r, r + 2));
	return n ? ((e.H = +n[0]), r + n[0].length) : -1;
}
function FT(e, t, r) {
	var n = Se.exec(t.slice(r, r + 2));
	return n ? ((e.M = +n[0]), r + n[0].length) : -1;
}
function UT(e, t, r) {
	var n = Se.exec(t.slice(r, r + 2));
	return n ? ((e.S = +n[0]), r + n[0].length) : -1;
}
function zT(e, t, r) {
	var n = Se.exec(t.slice(r, r + 3));
	return n ? ((e.L = +n[0]), r + n[0].length) : -1;
}
function WT(e, t, r) {
	var n = Se.exec(t.slice(r, r + 6));
	return n ? ((e.L = Math.floor(n[0] / 1e3)), r + n[0].length) : -1;
}
function GT(e, t, r) {
	var n = jT.exec(t.slice(r, r + 1));
	return n ? r + n[0].length : -1;
}
function HT(e, t, r) {
	var n = Se.exec(t.slice(r));
	return n ? ((e.Q = +n[0]), r + n[0].length) : -1;
}
function KT(e, t, r) {
	var n = Se.exec(t.slice(r));
	return n ? ((e.s = +n[0]), r + n[0].length) : -1;
}
function Ly(e, t) {
	return Q(e.getDate(), t, 2);
}
function VT(e, t) {
	return Q(e.getHours(), t, 2);
}
function XT(e, t) {
	return Q(e.getHours() % 12 || 12, t, 2);
}
function YT(e, t) {
	return Q(1 + Vn.count(gt(e), e), t, 3);
}
function H0(e, t) {
	return Q(e.getMilliseconds(), t, 3);
}
function ZT(e, t) {
	return H0(e, t) + "000";
}
function JT(e, t) {
	return Q(e.getMonth() + 1, t, 2);
}
function QT(e, t) {
	return Q(e.getMinutes(), t, 2);
}
function eE(e, t) {
	return Q(e.getSeconds(), t, 2);
}
function tE(e) {
	var t = e.getDay();
	return t === 0 ? 7 : t;
}
function rE(e, t) {
	return Q(xa.count(gt(e) - 1, e), t, 2);
}
function K0(e) {
	var t = e.getDay();
	return t >= 4 || t === 0 ? mr(e) : mr.ceil(e);
}
function nE(e, t) {
	return (e = K0(e)), Q(mr.count(gt(e), e) + (gt(e).getDay() === 4), t, 2);
}
function iE(e) {
	return e.getDay();
}
function aE(e, t) {
	return Q(Ci.count(gt(e) - 1, e), t, 2);
}
function oE(e, t) {
	return Q(e.getFullYear() % 100, t, 2);
}
function uE(e, t) {
	return (e = K0(e)), Q(e.getFullYear() % 100, t, 2);
}
function cE(e, t) {
	return Q(e.getFullYear() % 1e4, t, 4);
}
function sE(e, t) {
	var r = e.getDay();
	return (e = r >= 4 || r === 0 ? mr(e) : mr.ceil(e)), Q(e.getFullYear() % 1e4, t, 4);
}
function lE(e) {
	var t = e.getTimezoneOffset();
	return (t > 0 ? "-" : ((t *= -1), "+")) + Q((t / 60) | 0, "0", 2) + Q(t % 60, "0", 2);
}
function By(e, t) {
	return Q(e.getUTCDate(), t, 2);
}
function fE(e, t) {
	return Q(e.getUTCHours(), t, 2);
}
function hE(e, t) {
	return Q(e.getUTCHours() % 12 || 12, t, 2);
}
function dE(e, t) {
	return Q(1 + ba.count(mt(e), e), t, 3);
}
function V0(e, t) {
	return Q(e.getUTCMilliseconds(), t, 3);
}
function pE(e, t) {
	return V0(e, t) + "000";
}
function vE(e, t) {
	return Q(e.getUTCMonth() + 1, t, 2);
}
function yE(e, t) {
	return Q(e.getUTCMinutes(), t, 2);
}
function gE(e, t) {
	return Q(e.getUTCSeconds(), t, 2);
}
function mE(e) {
	var t = e.getUTCDay();
	return t === 0 ? 7 : t;
}
function bE(e, t) {
	return Q(wa.count(mt(e) - 1, e), t, 2);
}
function X0(e) {
	var t = e.getUTCDay();
	return t >= 4 || t === 0 ? br(e) : br.ceil(e);
}
function xE(e, t) {
	return (e = X0(e)), Q(br.count(mt(e), e) + (mt(e).getUTCDay() === 4), t, 2);
}
function wE(e) {
	return e.getUTCDay();
}
function OE(e, t) {
	return Q(Ii.count(mt(e) - 1, e), t, 2);
}
function _E(e, t) {
	return Q(e.getUTCFullYear() % 100, t, 2);
}
function SE(e, t) {
	return (e = X0(e)), Q(e.getUTCFullYear() % 100, t, 2);
}
function AE(e, t) {
	return Q(e.getUTCFullYear() % 1e4, t, 4);
}
function PE(e, t) {
	var r = e.getUTCDay();
	return (e = r >= 4 || r === 0 ? br(e) : br.ceil(e)), Q(e.getUTCFullYear() % 1e4, t, 4);
}
function TE() {
	return "+0000";
}
function Fy() {
	return "%";
}
function Uy(e) {
	return +e;
}
function zy(e) {
	return Math.floor(+e / 1e3);
}
var nr, Y0, Z0;
EE({
	dateTime: "%x, %X",
	date: "%-m/%-d/%Y",
	time: "%-I:%M:%S %p",
	periods: ["AM", "PM"],
	days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
	shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
	months: [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	],
	shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
});
function EE(e) {
	return (nr = ET(e)), (Y0 = nr.format), nr.parse, (Z0 = nr.utcFormat), nr.utcParse, nr;
}
function jE(e) {
	return new Date(e);
}
function ME(e) {
	return e instanceof Date ? +e : +new Date(+e);
}
function Kf(e, t, r, n, i, a, o, u, c, s) {
	var f = $f(),
		l = f.invert,
		h = f.domain,
		p = s(".%L"),
		y = s(":%S"),
		v = s("%I:%M"),
		d = s("%I %p"),
		b = s("%a %d"),
		w = s("%b %d"),
		x = s("%B"),
		O = s("%Y");
	function g(m) {
		return (
			c(m) < m ? p : u(m) < m ? y : o(m) < m ? v : a(m) < m ? d : n(m) < m ? (i(m) < m ? b : w) : r(m) < m ? x : O
		)(m);
	}
	return (
		(f.invert = (m) => new Date(l(m))),
		(f.domain = (m) => (arguments.length ? h(Array.from(m, ME)) : h().map(jE))),
		(f.ticks = (m) => {
			var _ = h();
			return e(_[0], _[_.length - 1], m ?? 10);
		}),
		(f.tickFormat = (m, _) => (_ == null ? g : s(_))),
		(f.nice = (m) => {
			var _ = h();
			return (!m || typeof m.range != "function") && (m = t(_[0], _[_.length - 1], m ?? 10)), m ? h(D0(_, m)) : f;
		}),
		(f.copy = () => Kn(f, Kf(e, t, r, n, i, a, o, u, c, s))),
		f
	);
}
function CE() {
	return Ge.apply(
		Kf(PT, TT, gt, Gf, xa, Vn, zf, Ff, Ut, Y0).domain([new Date(2e3, 0, 1), new Date(2e3, 0, 2)]),
		arguments,
	);
}
function IE() {
	return Ge.apply(
		Kf(ST, AT, mt, Hf, wa, ba, Wf, Uf, Ut, Z0).domain([Date.UTC(2e3, 0, 1), Date.UTC(2e3, 0, 2)]),
		arguments,
	);
}
function Oa() {
	var e = 0,
		t = 1,
		r,
		n,
		i,
		a,
		o = Ce,
		u = !1,
		c;
	function s(l) {
		return l == null || isNaN((l = +l))
			? c
			: o(i === 0 ? 0.5 : ((l = (a(l) - r) * i), u ? Math.max(0, Math.min(1, l)) : l));
	}
	(s.domain = (l) =>
		arguments.length
			? (([e, t] = l), (r = a((e = +e))), (n = a((t = +t))), (i = r === n ? 0 : 1 / (n - r)), s)
			: [e, t]),
		(s.clamp = (l) => (arguments.length ? ((u = !!l), s) : u)),
		(s.interpolator = (l) => (arguments.length ? ((o = l), s) : o));
	function f(l) {
		return (h) => {
			var p, y;
			return arguments.length ? (([p, y] = h), (o = l(p, y)), s) : [o(0), o(1)];
		};
	}
	return (
		(s.range = f(Dr)),
		(s.rangeRound = f(If)),
		(s.unknown = (l) => (arguments.length ? ((c = l), s) : c)),
		(l) => ((a = l), (r = l(e)), (n = l(t)), (i = r === n ? 0 : 1 / (n - r)), s)
	);
}
function It(e, t) {
	return t.domain(e.domain()).interpolator(e.interpolator()).clamp(e.clamp()).unknown(e.unknown());
}
function J0() {
	var e = Ct(Oa()(Ce));
	return (e.copy = () => It(e, J0())), wt.apply(e, arguments);
}
function Q0() {
	var e = kf(Oa()).domain([1, 10]);
	return (e.copy = () => It(e, Q0()).base(e.base())), wt.apply(e, arguments);
}
function ex() {
	var e = Df(Oa());
	return (e.copy = () => It(e, ex()).constant(e.constant())), wt.apply(e, arguments);
}
function Vf() {
	var e = qf(Oa());
	return (e.copy = () => It(e, Vf()).exponent(e.exponent())), wt.apply(e, arguments);
}
function $E() {
	return Vf.apply(null, arguments).exponent(0.5);
}
function tx() {
	var e = [],
		t = Ce;
	function r(n) {
		if (n != null && !isNaN((n = +n))) return t((Gn(e, n, 1) - 1) / (e.length - 1));
	}
	return (
		(r.domain = (n) => {
			if (!arguments.length) return e.slice();
			e = [];
			for (let i of n) i != null && !isNaN((i = +i)) && e.push(i);
			return e.sort(Tt), r;
		}),
		(r.interpolator = (n) => (arguments.length ? ((t = n), r) : t)),
		(r.range = () => e.map((n, i) => t(i / (e.length - 1)))),
		(r.quantiles = (n) => Array.from({ length: n + 1 }, (i, a) => bP(e, a / n))),
		(r.copy = () => tx(t).domain(e)),
		wt.apply(r, arguments)
	);
}
function _a() {
	var e = 0,
		t = 0.5,
		r = 1,
		n = 1,
		i,
		a,
		o,
		u,
		c,
		s = Ce,
		f,
		l = !1,
		h;
	function p(v) {
		return isNaN((v = +v))
			? h
			: ((v = 0.5 + ((v = +f(v)) - a) * (n * v < n * a ? u : c)), s(l ? Math.max(0, Math.min(1, v)) : v));
	}
	(p.domain = (v) =>
		arguments.length
			? (([e, t, r] = v),
				(i = f((e = +e))),
				(a = f((t = +t))),
				(o = f((r = +r))),
				(u = i === a ? 0 : 0.5 / (a - i)),
				(c = a === o ? 0 : 0.5 / (o - a)),
				(n = a < i ? -1 : 1),
				p)
			: [e, t, r]),
		(p.clamp = (v) => (arguments.length ? ((l = !!v), p) : l)),
		(p.interpolator = (v) => (arguments.length ? ((s = v), p) : s));
	function y(v) {
		return (d) => {
			var b, w, x;
			return arguments.length ? (([b, w, x] = d), (s = GP(v, [b, w, x])), p) : [s(0), s(0.5), s(1)];
		};
	}
	return (
		(p.range = y(Dr)),
		(p.rangeRound = y(If)),
		(p.unknown = (v) => (arguments.length ? ((h = v), p) : h)),
		(v) => (
			(f = v),
			(i = v(e)),
			(a = v(t)),
			(o = v(r)),
			(u = i === a ? 0 : 0.5 / (a - i)),
			(c = a === o ? 0 : 0.5 / (o - a)),
			(n = a < i ? -1 : 1),
			p
		)
	);
}
function rx() {
	var e = Ct(_a()(Ce));
	return (e.copy = () => It(e, rx())), wt.apply(e, arguments);
}
function nx() {
	var e = kf(_a()).domain([0.1, 1, 10]);
	return (e.copy = () => It(e, nx()).base(e.base())), wt.apply(e, arguments);
}
function ix() {
	var e = Df(_a());
	return (e.copy = () => It(e, ix()).constant(e.constant())), wt.apply(e, arguments);
}
function Xf() {
	var e = qf(_a());
	return (e.copy = () => It(e, Xf()).exponent(e.exponent())), wt.apply(e, arguments);
}
function RE() {
	return Xf.apply(null, arguments).exponent(0.5);
}
const Wy = Object.freeze(
	Object.defineProperty(
		{
			__proto__: null,
			scaleBand: hn,
			scaleDiverging: rx,
			scaleDivergingLog: nx,
			scaleDivergingPow: Xf,
			scaleDivergingSqrt: RE,
			scaleDivergingSymlog: ix,
			scaleIdentity: k0,
			scaleImplicit: fl,
			scaleLinear: ji,
			scaleLog: q0,
			scaleOrdinal: jf,
			scalePoint: tn,
			scalePow: Lf,
			scaleQuantile: F0,
			scaleQuantize: U0,
			scaleRadial: B0,
			scaleSequential: J0,
			scaleSequentialLog: Q0,
			scaleSequentialPow: Vf,
			scaleSequentialQuantile: tx,
			scaleSequentialSqrt: $E,
			scaleSequentialSymlog: ex,
			scaleSqrt: pT,
			scaleSymlog: L0,
			scaleThreshold: z0,
			scaleTime: CE,
			scaleUtc: IE,
			tickFormat: N0,
		},
		Symbol.toStringTag,
		{ value: "Module" },
	),
);
var rs, Gy;
function ax() {
	if (Gy) return rs;
	Gy = 1;
	var e = Rr();
	function t(r, n, i) {
		for (var a = -1, o = r.length; ++a < o; ) {
			var u = r[a],
				c = n(u);
			if (c != null && (s === void 0 ? c === c && !e(c) : i(c, s)))
				var s = c,
					f = u;
		}
		return f;
	}
	return (rs = t), rs;
}
var ns, Hy;
function NE() {
	if (Hy) return ns;
	Hy = 1;
	function e(t, r) {
		return t > r;
	}
	return (ns = e), ns;
}
var is, Ky;
function kE() {
	if (Ky) return is;
	Ky = 1;
	var e = ax(),
		t = NE(),
		r = kr();
	function n(i) {
		return i && i.length ? e(i, r, t) : void 0;
	}
	return (is = n), is;
}
var DE = kE();
const Sa = ce(DE);
var as, Vy;
function qE() {
	if (Vy) return as;
	Vy = 1;
	function e(t, r) {
		return t < r;
	}
	return (as = e), as;
}
var os, Xy;
function LE() {
	if (Xy) return os;
	Xy = 1;
	var e = ax(),
		t = qE(),
		r = kr();
	function n(i) {
		return i && i.length ? e(i, r, t) : void 0;
	}
	return (os = n), os;
}
var BE = LE();
const Aa = ce(BE);
var us, Yy;
function FE() {
	if (Yy) return us;
	Yy = 1;
	var e = ff(),
		t = Mt(),
		r = d0(),
		n = Ne();
	function i(a, o) {
		var u = n(a) ? e : r;
		return u(a, t(o, 3));
	}
	return (us = i), us;
}
var cs, Zy;
function UE() {
	if (Zy) return cs;
	Zy = 1;
	var e = f0(),
		t = FE();
	function r(n, i) {
		return e(t(n, i), 1);
	}
	return (cs = r), cs;
}
var zE = UE();
const WE = ce(zE);
var ss, Jy;
function GE() {
	if (Jy) return ss;
	Jy = 1;
	var e = Sf();
	function t(r, n) {
		return e(r, n);
	}
	return (ss = t), ss;
}
var HE = GE();
const Yf = ce(HE);
var qr = 1e9,
	KE = {
		precision: 20,
		rounding: 4,
		toExpNeg: -7,
		toExpPos: 21,
		LN10: "2.302585092994045684017991454684364207601101488628772976033327900967572609677352480235997205089598298341967784042286",
	},
	Jf,
	fe = !0,
	We = "[DecimalError] ",
	Gt = We + "Invalid argument: ",
	Zf = We + "Exponent out of range: ",
	Lr = Math.floor,
	Lt = Math.pow,
	VE = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,
	Le,
	Oe = 1e7,
	le = 7,
	ox = 9007199254740991,
	$i = Lr(ox / le),
	W = {};
W.absoluteValue = W.abs = function () {
	var e = new this.constructor(this);
	return e.s && (e.s = 1), e;
};
W.comparedTo = W.cmp = function (e) {
	var t, r, n, i;
	if (((e = new this.constructor(e)), this.s !== e.s)) return this.s || -e.s;
	if (this.e !== e.e) return (this.e > e.e) ^ (this.s < 0) ? 1 : -1;
	for (n = this.d.length, i = e.d.length, t = 0, r = n < i ? n : i; t < r; ++t)
		if (this.d[t] !== e.d[t]) return (this.d[t] > e.d[t]) ^ (this.s < 0) ? 1 : -1;
	return n === i ? 0 : (n > i) ^ (this.s < 0) ? 1 : -1;
};
W.decimalPlaces = W.dp = function () {
	var t = this.d.length - 1,
		r = (t - this.e) * le;
	if (((t = this.d[t]), t)) for (; t % 10 == 0; t /= 10) r--;
	return r < 0 ? 0 : r;
};
W.dividedBy = W.div = function (e) {
	return vt(this, new this.constructor(e));
};
W.dividedToIntegerBy = W.idiv = function (e) {
	var r = this.constructor;
	return oe(vt(this, new r(e), 0, 1), r.precision);
};
W.equals = W.eq = function (e) {
	return !this.cmp(e);
};
W.exponent = function () {
	return ye(this);
};
W.greaterThan = W.gt = function (e) {
	return this.cmp(e) > 0;
};
W.greaterThanOrEqualTo = W.gte = function (e) {
	return this.cmp(e) >= 0;
};
W.isInteger = W.isint = function () {
	return this.e > this.d.length - 2;
};
W.isNegative = W.isneg = function () {
	return this.s < 0;
};
W.isPositive = W.ispos = function () {
	return this.s > 0;
};
W.isZero = function () {
	return this.s === 0;
};
W.lessThan = W.lt = function (e) {
	return this.cmp(e) < 0;
};
W.lessThanOrEqualTo = W.lte = function (e) {
	return this.cmp(e) < 1;
};
W.logarithm = W.log = function (e) {
	var t,
		n = this.constructor,
		i = n.precision,
		a = i + 5;
	if (e === void 0) e = new n(10);
	else if (((e = new n(e)), e.s < 1 || e.eq(Le))) throw Error(We + "NaN");
	if (this.s < 1) throw Error(We + (this.s ? "NaN" : "-Infinity"));
	return this.eq(Le) ? new n(0) : ((fe = !1), (t = vt(gn(this, a), gn(e, a), a)), (fe = !0), oe(t, i));
};
W.minus = W.sub = function (e) {
	return (e = new this.constructor(e)), this.s == e.s ? sx(this, e) : ux(this, ((e.s = -e.s), e));
};
W.modulo = W.mod = function (e) {
	var t,
		n = this.constructor,
		i = n.precision;
	if (((e = new n(e)), !e.s)) throw Error(We + "NaN");
	return this.s ? ((fe = !1), (t = vt(this, e, 0, 1).times(e)), (fe = !0), this.minus(t)) : oe(new n(this), i);
};
W.naturalExponential = W.exp = function () {
	return cx(this);
};
W.naturalLogarithm = W.ln = function () {
	return gn(this);
};
W.negated = W.neg = function () {
	var e = new this.constructor(this);
	return (e.s = -e.s || 0), e;
};
W.plus = W.add = function (e) {
	return (e = new this.constructor(e)), this.s == e.s ? ux(this, e) : sx(this, ((e.s = -e.s), e));
};
W.precision = W.sd = function (e) {
	var t, r, n;
	if (e !== void 0 && e !== !!e && e !== 1 && e !== 0) throw Error(Gt + e);
	if (((t = ye(this) + 1), (n = this.d.length - 1), (r = n * le + 1), (n = this.d[n]), n)) {
		for (; n % 10 == 0; n /= 10) r--;
		for (n = this.d[0]; n >= 10; n /= 10) r++;
	}
	return e && t > r ? t : r;
};
W.squareRoot = W.sqrt = function () {
	var e,
		t,
		r,
		n,
		i,
		a,
		o,
		c = this.constructor;
	if (this.s < 1) {
		if (!this.s) return new c(0);
		throw Error(We + "NaN");
	}
	for (
		e = ye(this),
			fe = !1,
			i = Math.sqrt(+this),
			i == 0 || i == 1 / 0
				? ((t = tt(this.d)),
					(t.length + e) % 2 == 0 && (t += "0"),
					(i = Math.sqrt(t)),
					(e = Lr((e + 1) / 2) - (e < 0 || e % 2)),
					i == 1 / 0 ? (t = "5e" + e) : ((t = i.toExponential()), (t = t.slice(0, t.indexOf("e") + 1) + e)),
					(n = new c(t)))
				: (n = new c(i.toString())),
			r = c.precision,
			i = o = r + 3;
		;
	)
		if (((a = n), (n = a.plus(vt(this, a, o + 2)).times(0.5)), tt(a.d).slice(0, o) === (t = tt(n.d)).slice(0, o))) {
			if (((t = t.slice(o - 3, o + 1)), i == o && t == "4999")) {
				if ((oe(a, r + 1, 0), a.times(a).eq(this))) {
					n = a;
					break;
				}
			} else if (t != "9999") break;
			o += 4;
		}
	return (fe = !0), oe(n, r);
};
W.times = W.mul = function (e) {
	var t,
		r,
		n,
		i,
		a,
		o,
		u,
		c,
		s,
		l = this.constructor,
		h = this.d,
		p = (e = new l(e)).d;
	if (!this.s || !e.s) return new l(0);
	for (
		e.s *= this.s,
			r = this.e + e.e,
			c = h.length,
			s = p.length,
			c < s && ((a = h), (h = p), (p = a), (o = c), (c = s), (s = o)),
			a = [],
			o = c + s,
			n = o;
		n--;
	)
		a.push(0);
	for (n = s; --n >= 0; ) {
		for (t = 0, i = c + n; i > n; ) (u = a[i] + p[n] * h[i - n - 1] + t), (a[i--] = (u % Oe) | 0), (t = (u / Oe) | 0);
		a[i] = ((a[i] + t) % Oe) | 0;
	}
	while (!a[--o]) a.pop();
	return t ? ++r : a.shift(), (e.d = a), (e.e = r), fe ? oe(e, l.precision) : e;
};
W.toDecimalPlaces = W.todp = function (e, t) {
	var r = this,
		n = r.constructor;
	return (
		(r = new n(r)),
		e === void 0 ? r : (at(e, 0, qr), t === void 0 ? (t = n.rounding) : at(t, 0, 8), oe(r, e + ye(r) + 1, t))
	);
};
W.toExponential = function (e, t) {
	var r,
		n = this,
		i = n.constructor;
	return (
		e === void 0
			? (r = Kt(n, !0))
			: (at(e, 0, qr),
				t === void 0 ? (t = i.rounding) : at(t, 0, 8),
				(n = oe(new i(n), e + 1, t)),
				(r = Kt(n, !0, e + 1))),
		r
	);
};
W.toFixed = function (e, t) {
	var r,
		n,
		a = this.constructor;
	return e === void 0
		? Kt(this)
		: (at(e, 0, qr),
			t === void 0 ? (t = a.rounding) : at(t, 0, 8),
			(n = oe(new a(this), e + ye(this) + 1, t)),
			(r = Kt(n.abs(), !1, e + ye(n) + 1)),
			this.isneg() && !this.isZero() ? "-" + r : r);
};
W.toInteger = W.toint = function () {
	var t = this.constructor;
	return oe(new t(this), ye(this) + 1, t.rounding);
};
W.toNumber = function () {
	return +this;
};
W.toPower = W.pow = function (e) {
	var t,
		r,
		n,
		i,
		a,
		o,
		u = this,
		c = u.constructor,
		s = 12,
		f = +(e = new c(e));
	if (!e.s) return new c(Le);
	if (((u = new c(u)), !u.s)) {
		if (e.s < 1) throw Error(We + "Infinity");
		return u;
	}
	if (u.eq(Le)) return u;
	if (((n = c.precision), e.eq(Le))) return oe(u, n);
	if (((t = e.e), (r = e.d.length - 1), (o = t >= r), (a = u.s), o)) {
		if ((r = f < 0 ? -f : f) <= ox) {
			for (
				i = new c(Le), t = Math.ceil(n / le + 4), fe = !1;
				r % 2 && ((i = i.times(u)), eg(i.d, t)), (r = Lr(r / 2)), r !== 0;
			)
				(u = u.times(u)), eg(u.d, t);
			return (fe = !0), e.s < 0 ? new c(Le).div(i) : oe(i, n);
		}
	} else if (a < 0) throw Error(We + "NaN");
	return (
		(a = a < 0 && e.d[Math.max(t, r)] & 1 ? -1 : 1),
		(u.s = 1),
		(fe = !1),
		(i = e.times(gn(u, n + s))),
		(fe = !0),
		(i = cx(i)),
		(i.s = a),
		i
	);
};
W.toPrecision = function (e, t) {
	var r,
		n,
		i = this,
		a = i.constructor;
	return (
		e === void 0
			? ((r = ye(i)), (n = Kt(i, r <= a.toExpNeg || r >= a.toExpPos)))
			: (at(e, 1, qr),
				t === void 0 ? (t = a.rounding) : at(t, 0, 8),
				(i = oe(new a(i), e, t)),
				(r = ye(i)),
				(n = Kt(i, e <= r || r <= a.toExpNeg, e))),
		n
	);
};
W.toSignificantDigits = W.tosd = function (e, t) {
	var n = this.constructor;
	return (
		e === void 0
			? ((e = n.precision), (t = n.rounding))
			: (at(e, 1, qr), t === void 0 ? (t = n.rounding) : at(t, 0, 8)),
		oe(new n(this), e, t)
	);
};
W.toString =
	W.valueOf =
	W.val =
	W.toJSON =
	W[Symbol.for("nodejs.util.inspect.custom")] =
		function () {
			var t = ye(this),
				r = this.constructor;
			return Kt(this, t <= r.toExpNeg || t >= r.toExpPos);
		};
function ux(e, t) {
	var r,
		n,
		i,
		a,
		o,
		u,
		c,
		s,
		f = e.constructor,
		l = f.precision;
	if (!e.s || !t.s) return t.s || (t = new f(e)), fe ? oe(t, l) : t;
	if (((c = e.d), (s = t.d), (o = e.e), (i = t.e), (c = c.slice()), (a = o - i), a)) {
		for (
			a < 0 ? ((n = c), (a = -a), (u = s.length)) : ((n = s), (i = o), (u = c.length)),
				o = Math.ceil(l / le),
				u = o > u ? o + 1 : u + 1,
				a > u && ((a = u), (n.length = 1)),
				n.reverse();
			a--;
		)
			n.push(0);
		n.reverse();
	}
	for (u = c.length, a = s.length, u - a < 0 && ((a = u), (n = s), (s = c), (c = n)), r = 0; a; )
		(r = ((c[--a] = c[a] + s[a] + r) / Oe) | 0), (c[a] %= Oe);
	for (r && (c.unshift(r), ++i), u = c.length; c[--u] == 0; ) c.pop();
	return (t.d = c), (t.e = i), fe ? oe(t, l) : t;
}
function at(e, t, r) {
	if (e !== ~~e || e < t || e > r) throw Error(Gt + e);
}
function tt(e) {
	var t,
		r,
		n,
		i = e.length - 1,
		a = "",
		o = e[0];
	if (i > 0) {
		for (a += o, t = 1; t < i; t++) (n = e[t] + ""), (r = le - n.length), r && (a += St(r)), (a += n);
		(o = e[t]), (n = o + ""), (r = le - n.length), r && (a += St(r));
	} else if (o === 0) return "0";
	while (o % 10 === 0) o /= 10;
	return a + o;
}
var vt = (() => {
	function e(n, i) {
		var a,
			o = 0,
			u = n.length;
		for (n = n.slice(); u--; ) (a = n[u] * i + o), (n[u] = (a % Oe) | 0), (o = (a / Oe) | 0);
		return o && n.unshift(o), n;
	}
	function t(n, i, a, o) {
		var u, c;
		if (a != o) c = a > o ? 1 : -1;
		else
			for (u = c = 0; u < a; u++)
				if (n[u] != i[u]) {
					c = n[u] > i[u] ? 1 : -1;
					break;
				}
		return c;
	}
	function r(n, i, a) {
		for (var o = 0; a--; ) (n[a] -= o), (o = n[a] < i[a] ? 1 : 0), (n[a] = o * Oe + n[a] - i[a]);
		while (!n[0] && n.length > 1) n.shift();
	}
	return (n, i, a, o) => {
		var u,
			c,
			s,
			f,
			l,
			h,
			p,
			y,
			v,
			d,
			b,
			w,
			x,
			O,
			g,
			m,
			_,
			S,
			P = n.constructor,
			M = n.s == i.s ? 1 : -1,
			A = n.d,
			E = i.d;
		if (!n.s) return new P(n);
		if (!i.s) throw Error(We + "Division by zero");
		for (c = n.e - i.e, _ = E.length, g = A.length, p = new P(M), y = p.d = [], s = 0; E[s] == (A[s] || 0); ) ++s;
		if (
			(E[s] > (A[s] || 0) && --c,
			a == null ? (w = a = P.precision) : o ? (w = a + (ye(n) - ye(i)) + 1) : (w = a),
			w < 0)
		)
			return new P(0);
		if (((w = (w / le + 2) | 0), (s = 0), _ == 1))
			for (f = 0, E = E[0], w++; (s < g || f) && w--; s++)
				(x = f * Oe + (A[s] || 0)), (y[s] = (x / E) | 0), (f = (x % E) | 0);
		else {
			for (
				f = (Oe / (E[0] + 1)) | 0,
					f > 1 && ((E = e(E, f)), (A = e(A, f)), (_ = E.length), (g = A.length)),
					O = _,
					v = A.slice(0, _),
					d = v.length;
				d < _;
			)
				v[d++] = 0;
			(S = E.slice()), S.unshift(0), (m = E[0]), E[1] >= Oe / 2 && ++m;
			do
				(f = 0),
					(u = t(E, v, _, d)),
					u < 0
						? ((b = v[0]),
							_ != d && (b = b * Oe + (v[1] || 0)),
							(f = (b / m) | 0),
							f > 1
								? (f >= Oe && (f = Oe - 1),
									(l = e(E, f)),
									(h = l.length),
									(d = v.length),
									(u = t(l, v, h, d)),
									u == 1 && (f--, r(l, _ < h ? S : E, h)))
								: (f == 0 && (u = f = 1), (l = E.slice())),
							(h = l.length),
							h < d && l.unshift(0),
							r(v, l, d),
							u == -1 && ((d = v.length), (u = t(E, v, _, d)), u < 1 && (f++, r(v, _ < d ? S : E, d))),
							(d = v.length))
						: u === 0 && (f++, (v = [0])),
					(y[s++] = f),
					u && v[0] ? (v[d++] = A[O] || 0) : ((v = [A[O]]), (d = 1));
			while ((O++ < g || v[0] !== void 0) && w--);
		}
		return y[0] || y.shift(), (p.e = c), oe(p, o ? a + ye(p) + 1 : a);
	};
})();
function cx(e, t) {
	var r,
		n,
		i,
		a,
		o,
		u,
		c = 0,
		s = 0,
		f = e.constructor,
		l = f.precision;
	if (ye(e) > 16) throw Error(Zf + ye(e));
	if (!e.s) return new f(Le);
	for (fe = !1, u = l, o = new f(0.03125); e.abs().gte(0.1); ) (e = e.times(o)), (s += 5);
	for (n = ((Math.log(Lt(2, s)) / Math.LN10) * 2 + 5) | 0, u += n, r = i = a = new f(Le), f.precision = u; ; ) {
		if (
			((i = oe(i.times(e), u)),
			(r = r.times(++c)),
			(o = a.plus(vt(i, r, u))),
			tt(o.d).slice(0, u) === tt(a.d).slice(0, u))
		) {
			while (s--) a = oe(a.times(a), u);
			return (f.precision = l), t == null ? ((fe = !0), oe(a, l)) : a;
		}
		a = o;
	}
}
function ye(e) {
	for (var t = e.e * le, r = e.d[0]; r >= 10; r /= 10) t++;
	return t;
}
function ls(e, t, r) {
	if (t > e.LN10.sd()) throw ((fe = !0), r && (e.precision = r), Error(We + "LN10 precision limit exceeded"));
	return oe(new e(e.LN10), t);
}
function St(e) {
	for (var t = ""; e--; ) t += "0";
	return t;
}
function gn(e, t) {
	var r,
		n,
		i,
		a,
		o,
		u,
		c,
		s,
		f,
		l = 1,
		h = 10,
		p = e,
		y = p.d,
		v = p.constructor,
		d = v.precision;
	if (p.s < 1) throw Error(We + (p.s ? "NaN" : "-Infinity"));
	if (p.eq(Le)) return new v(0);
	if ((t == null ? ((fe = !1), (s = d)) : (s = t), p.eq(10))) return t == null && (fe = !0), ls(v, s);
	if (((s += h), (v.precision = s), (r = tt(y)), (n = r.charAt(0)), (a = ye(p)), Math.abs(a) < 15e14)) {
		while ((n < 7 && n != 1) || (n == 1 && r.charAt(1) > 3)) (p = p.times(e)), (r = tt(p.d)), (n = r.charAt(0)), l++;
		(a = ye(p)), n > 1 ? ((p = new v("0." + r)), a++) : (p = new v(n + "." + r.slice(1)));
	} else
		return (
			(c = ls(v, s + 2, d).times(a + "")),
			(p = gn(new v(n + "." + r.slice(1)), s - h).plus(c)),
			(v.precision = d),
			t == null ? ((fe = !0), oe(p, d)) : p
		);
	for (u = o = p = vt(p.minus(Le), p.plus(Le), s), f = oe(p.times(p), s), i = 3; ; ) {
		if (((o = oe(o.times(f), s)), (c = u.plus(vt(o, new v(i), s))), tt(c.d).slice(0, s) === tt(u.d).slice(0, s)))
			return (
				(u = u.times(2)),
				a !== 0 && (u = u.plus(ls(v, s + 2, d).times(a + ""))),
				(u = vt(u, new v(l), s)),
				(v.precision = d),
				t == null ? ((fe = !0), oe(u, d)) : u
			);
		(u = c), (i += 2);
	}
}
function Qy(e, t) {
	var r, n, i;
	for (
		(r = t.indexOf(".")) > -1 && (t = t.replace(".", "")),
			(n = t.search(/e/i)) > 0
				? (r < 0 && (r = n), (r += +t.slice(n + 1)), (t = t.substring(0, n)))
				: r < 0 && (r = t.length),
			n = 0;
		t.charCodeAt(n) === 48;
	)
		++n;
	for (i = t.length; t.charCodeAt(i - 1) === 48; ) --i;
	if (((t = t.slice(n, i)), t)) {
		if (((i -= n), (r = r - n - 1), (e.e = Lr(r / le)), (e.d = []), (n = (r + 1) % le), r < 0 && (n += le), n < i)) {
			for (n && e.d.push(+t.slice(0, n)), i -= le; n < i; ) e.d.push(+t.slice(n, (n += le)));
			(t = t.slice(n)), (n = le - t.length);
		} else n -= i;
		while (n--) t += "0";
		if ((e.d.push(+t), fe && (e.e > $i || e.e < -$i))) throw Error(Zf + r);
	} else (e.s = 0), (e.e = 0), (e.d = [0]);
	return e;
}
function oe(e, t, r) {
	var n,
		i,
		a,
		o,
		u,
		c,
		s,
		f,
		l = e.d;
	for (o = 1, a = l[0]; a >= 10; a /= 10) o++;
	if (((n = t - o), n < 0)) (n += le), (i = t), (s = l[(f = 0)]);
	else {
		if (((f = Math.ceil((n + 1) / le)), (a = l.length), f >= a)) return e;
		for (s = a = l[f], o = 1; a >= 10; a /= 10) o++;
		(n %= le), (i = n - le + o);
	}
	if (
		(r !== void 0 &&
			((a = Lt(10, o - i - 1)),
			(u = ((s / a) % 10) | 0),
			(c = t < 0 || l[f + 1] !== void 0 || s % a),
			(c =
				r < 4
					? (u || c) && (r == 0 || r == (e.s < 0 ? 3 : 2))
					: u > 5 ||
						(u == 5 &&
							(r == 4 ||
								c ||
								(r == 6 && ((n > 0 ? (i > 0 ? s / Lt(10, o - i) : 0) : l[f - 1]) % 10) & 1) ||
								r == (e.s < 0 ? 8 : 7))))),
		t < 1 || !l[0])
	)
		return (
			c
				? ((a = ye(e)),
					(l.length = 1),
					(t = t - a - 1),
					(l[0] = Lt(10, (le - (t % le)) % le)),
					(e.e = Lr(-t / le) || 0))
				: ((l.length = 1), (l[0] = e.e = e.s = 0)),
			e
		);
	if (
		(n == 0
			? ((l.length = f), (a = 1), f--)
			: ((l.length = f + 1), (a = Lt(10, le - n)), (l[f] = i > 0 ? (((s / Lt(10, o - i)) % Lt(10, i)) | 0) * a : 0)),
		c)
	)
		for (;;)
			if (f == 0) {
				(l[0] += a) == Oe && ((l[0] = 1), ++e.e);
				break;
			} else {
				if (((l[f] += a), l[f] != Oe)) break;
				(l[f--] = 0), (a = 1);
			}
	for (n = l.length; l[--n] === 0; ) l.pop();
	if (fe && (e.e > $i || e.e < -$i)) throw Error(Zf + ye(e));
	return e;
}
function sx(e, t) {
	var r,
		n,
		i,
		a,
		o,
		u,
		c,
		s,
		f,
		l,
		h = e.constructor,
		p = h.precision;
	if (!e.s || !t.s) return t.s ? (t.s = -t.s) : (t = new h(e)), fe ? oe(t, p) : t;
	if (((c = e.d), (l = t.d), (n = t.e), (s = e.e), (c = c.slice()), (o = s - n), o)) {
		for (
			f = o < 0,
				f ? ((r = c), (o = -o), (u = l.length)) : ((r = l), (n = s), (u = c.length)),
				i = Math.max(Math.ceil(p / le), u) + 2,
				o > i && ((o = i), (r.length = 1)),
				r.reverse(),
				i = o;
			i--;
		)
			r.push(0);
		r.reverse();
	} else {
		for (i = c.length, u = l.length, f = i < u, f && (u = i), i = 0; i < u; i++)
			if (c[i] != l[i]) {
				f = c[i] < l[i];
				break;
			}
		o = 0;
	}
	for (f && ((r = c), (c = l), (l = r), (t.s = -t.s)), u = c.length, i = l.length - u; i > 0; --i) c[u++] = 0;
	for (i = l.length; i > o; ) {
		if (c[--i] < l[i]) {
			for (a = i; a && c[--a] === 0; ) c[a] = Oe - 1;
			--c[a], (c[i] += Oe);
		}
		c[i] -= l[i];
	}
	while (c[--u] === 0) c.pop();
	for (; c[0] === 0; c.shift()) --n;
	return c[0] ? ((t.d = c), (t.e = n), fe ? oe(t, p) : t) : new h(0);
}
function Kt(e, t, r) {
	var n,
		i = ye(e),
		a = tt(e.d),
		o = a.length;
	return (
		t
			? (r && (n = r - o) > 0
					? (a = a.charAt(0) + "." + a.slice(1) + St(n))
					: o > 1 && (a = a.charAt(0) + "." + a.slice(1)),
				(a = a + (i < 0 ? "e" : "e+") + i))
			: i < 0
				? ((a = "0." + St(-i - 1) + a), r && (n = r - o) > 0 && (a += St(n)))
				: i >= o
					? ((a += St(i + 1 - o)), r && (n = r - i - 1) > 0 && (a = a + "." + St(n)))
					: ((n = i + 1) < o && (a = a.slice(0, n) + "." + a.slice(n)),
						r && (n = r - o) > 0 && (i + 1 === o && (a += "."), (a += St(n)))),
		e.s < 0 ? "-" + a : a
	);
}
function eg(e, t) {
	if (e.length > t) return (e.length = t), !0;
}
function lx(e) {
	var t, r, n;
	function i(a) {
		if (!(this instanceof i)) return new i(a);
		if (((this.constructor = i), a instanceof i)) {
			(this.s = a.s), (this.e = a.e), (this.d = (a = a.d) ? a.slice() : a);
			return;
		}
		if (typeof a == "number") {
			if (a * 0 !== 0) throw Error(Gt + a);
			if (a > 0) this.s = 1;
			else if (a < 0) (a = -a), (this.s = -1);
			else {
				(this.s = 0), (this.e = 0), (this.d = [0]);
				return;
			}
			if (a === ~~a && a < 1e7) {
				(this.e = 0), (this.d = [a]);
				return;
			}
			return Qy(this, a.toString());
		} else if (typeof a != "string") throw Error(Gt + a);
		if ((a.charCodeAt(0) === 45 ? ((a = a.slice(1)), (this.s = -1)) : (this.s = 1), VE.test(a))) Qy(this, a);
		else throw Error(Gt + a);
	}
	if (
		((i.prototype = W),
		(i.ROUND_UP = 0),
		(i.ROUND_DOWN = 1),
		(i.ROUND_CEIL = 2),
		(i.ROUND_FLOOR = 3),
		(i.ROUND_HALF_UP = 4),
		(i.ROUND_HALF_DOWN = 5),
		(i.ROUND_HALF_EVEN = 6),
		(i.ROUND_HALF_CEIL = 7),
		(i.ROUND_HALF_FLOOR = 8),
		(i.clone = lx),
		(i.config = i.set = XE),
		e === void 0 && (e = {}),
		e)
	)
		for (n = ["precision", "rounding", "toExpNeg", "toExpPos", "LN10"], t = 0; t < n.length; )
			e.hasOwnProperty((r = n[t++])) || (e[r] = this[r]);
	return i.config(e), i;
}
function XE(e) {
	if (!e || typeof e != "object") throw Error(We + "Object expected");
	var t,
		r,
		n,
		i = ["precision", 1, qr, "rounding", 0, 8, "toExpNeg", -1 / 0, 0, "toExpPos", 0, 1 / 0];
	for (t = 0; t < i.length; t += 3)
		if ((n = e[(r = i[t])]) !== void 0)
			if (Lr(n) === n && n >= i[t + 1] && n <= i[t + 2]) this[r] = n;
			else throw Error(Gt + r + ": " + n);
	if ((n = e[(r = "LN10")]) !== void 0)
		if (n == Math.LN10) this[r] = new this(n);
		else throw Error(Gt + r + ": " + n);
	return this;
}
var Jf = lx(KE);
Le = new Jf(1);
const ae = Jf;
function YE(e) {
	return ej(e) || QE(e) || JE(e) || ZE();
}
function ZE() {
	throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function JE(e, t) {
	if (e) {
		if (typeof e == "string") return vl(e, t);
		var r = Object.prototype.toString.call(e).slice(8, -1);
		if ((r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set")) return Array.from(e);
		if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return vl(e, t);
	}
}
function QE(e) {
	if (typeof Symbol < "u" && Symbol.iterator in Object(e)) return Array.from(e);
}
function ej(e) {
	if (Array.isArray(e)) return vl(e);
}
function vl(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
	return n;
}
var tj = (t) => t,
	fx = {},
	hx = (t) => t === fx,
	tg = (t) =>
		function r() {
			return arguments.length === 0 || (arguments.length === 1 && hx(arguments.length <= 0 ? void 0 : arguments[0]))
				? r
				: t.apply(void 0, arguments);
		},
	rj = function e(t, r) {
		return t === 1
			? r
			: tg(() => {
					for (var n = arguments.length, i = new Array(n), a = 0; a < n; a++) i[a] = arguments[a];
					var o = i.filter((u) => u !== fx).length;
					return o >= t
						? r.apply(void 0, i)
						: e(
								t - o,
								tg(() => {
									for (var u = arguments.length, c = new Array(u), s = 0; s < u; s++) c[s] = arguments[s];
									var f = i.map((l) => (hx(l) ? c.shift() : l));
									return r.apply(void 0, YE(f).concat(c));
								}),
							);
				});
	},
	Pa = (t) => rj(t.length, t),
	yl = (t, r) => {
		for (var n = [], i = t; i < r; ++i) n[i - t] = i;
		return n;
	},
	nj = Pa((e, t) =>
		Array.isArray(t)
			? t.map(e)
			: Object.keys(t)
					.map((r) => t[r])
					.map(e),
	),
	ij = () => {
		for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++) r[n] = arguments[n];
		if (!r.length) return tj;
		var i = r.reverse(),
			a = i[0],
			o = i.slice(1);
		return () => o.reduce((u, c) => c(u), a.apply(void 0, arguments));
	},
	gl = (t) => (Array.isArray(t) ? t.reverse() : t.split("").reverse.join("")),
	dx = (t) => {
		var r = null,
			n = null;
		return () => {
			for (var i = arguments.length, a = new Array(i), o = 0; o < i; o++) a[o] = arguments[o];
			return (r && a.every((u, c) => u === r[c])) || ((r = a), (n = t.apply(void 0, a))), n;
		};
	};
function aj(e) {
	var t;
	return e === 0 ? (t = 1) : (t = Math.floor(new ae(e).abs().log(10).toNumber()) + 1), t;
}
function oj(e, t, r) {
	for (var n = new ae(e), i = 0, a = []; n.lt(t) && i < 1e5; ) a.push(n.toNumber()), (n = n.add(r)), i++;
	return a;
}
var uj = Pa((e, t, r) => {
		var n = +e,
			i = +t;
		return n + r * (i - n);
	}),
	cj = Pa((e, t, r) => {
		var n = t - +e;
		return (n = n || 1 / 0), (r - e) / n;
	}),
	sj = Pa((e, t, r) => {
		var n = t - +e;
		return (n = n || 1 / 0), Math.max(0, Math.min(1, (r - e) / n));
	});
const Ta = {
	rangeStep: oj,
	getDigitCount: aj,
	interpolateNumber: uj,
	uninterpolateNumber: cj,
	uninterpolateTruncation: sj,
};
function ml(e) {
	return hj(e) || fj(e) || px(e) || lj();
}
function lj() {
	throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function fj(e) {
	if (typeof Symbol < "u" && Symbol.iterator in Object(e)) return Array.from(e);
}
function hj(e) {
	if (Array.isArray(e)) return bl(e);
}
function mn(e, t) {
	return vj(e) || pj(e, t) || px(e, t) || dj();
}
function dj() {
	throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function px(e, t) {
	if (e) {
		if (typeof e == "string") return bl(e, t);
		var r = Object.prototype.toString.call(e).slice(8, -1);
		if ((r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set")) return Array.from(e);
		if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return bl(e, t);
	}
}
function bl(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
	return n;
}
function pj(e, t) {
	if (!(typeof Symbol > "u" || !(Symbol.iterator in Object(e)))) {
		var r = [],
			n = !0,
			i = !1,
			a = void 0;
		try {
			for (
				var o = e[Symbol.iterator](), u;
				!(n = (u = o.next()).done) && (r.push(u.value), !(t && r.length === t));
				n = !0
			);
		} catch (c) {
			(i = !0), (a = c);
		} finally {
			try {
				!n && o.return != null && o.return();
			} finally {
				if (i) throw a;
			}
		}
		return r;
	}
}
function vj(e) {
	if (Array.isArray(e)) return e;
}
function vx(e) {
	var t = mn(e, 2),
		r = t[0],
		n = t[1],
		i = r,
		a = n;
	return r > n && ((i = n), (a = r)), [i, a];
}
function yx(e, t, r) {
	if (e.lte(0)) return new ae(0);
	var n = Ta.getDigitCount(e.toNumber()),
		i = new ae(10).pow(n),
		a = e.div(i),
		o = n !== 1 ? 0.05 : 0.1,
		u = new ae(Math.ceil(a.div(o).toNumber())).add(r).mul(o),
		c = u.mul(i);
	return t ? c : new ae(Math.ceil(c));
}
function yj(e, t, r) {
	var n = 1,
		i = new ae(e);
	if (!i.isint() && r) {
		var a = Math.abs(e);
		a < 1
			? ((n = new ae(10).pow(Ta.getDigitCount(e) - 1)), (i = new ae(Math.floor(i.div(n).toNumber())).mul(n)))
			: a > 1 && (i = new ae(Math.floor(e)));
	} else e === 0 ? (i = new ae(Math.floor((t - 1) / 2))) : r || (i = new ae(Math.floor(e)));
	var o = Math.floor((t - 1) / 2),
		u = ij(
			nj((c) => i.add(new ae(c - o).mul(n)).toNumber()),
			yl,
		);
	return u(0, t);
}
function gx(e, t, r, n) {
	var i = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 0;
	if (!Number.isFinite((t - e) / (r - 1))) return { step: new ae(0), tickMin: new ae(0), tickMax: new ae(0) };
	var a = yx(new ae(t).sub(e).div(r - 1), n, i),
		o;
	e <= 0 && t >= 0 ? (o = new ae(0)) : ((o = new ae(e).add(t).div(2)), (o = o.sub(new ae(o).mod(a))));
	var u = Math.ceil(o.sub(e).div(a).toNumber()),
		c = Math.ceil(new ae(t).sub(o).div(a).toNumber()),
		s = u + c + 1;
	return s > r
		? gx(e, t, r, n, i + 1)
		: (s < r && ((c = t > 0 ? c + (r - s) : c), (u = t > 0 ? u : u + (r - s))),
			{ step: a, tickMin: o.sub(new ae(u).mul(a)), tickMax: o.add(new ae(c).mul(a)) });
}
function gj(e) {
	var t = mn(e, 2),
		r = t[0],
		n = t[1],
		i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 6,
		a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0,
		o = Math.max(i, 2),
		u = vx([r, n]),
		c = mn(u, 2),
		s = c[0],
		f = c[1];
	if (s === -1 / 0 || f === 1 / 0) {
		var l =
			f === 1 / 0 ? [s].concat(ml(yl(0, i - 1).map(() => 1 / 0))) : [].concat(ml(yl(0, i - 1).map(() => -1 / 0)), [f]);
		return r > n ? gl(l) : l;
	}
	if (s === f) return yj(s, i, a);
	var h = gx(s, f, o, a),
		p = h.step,
		y = h.tickMin,
		v = h.tickMax,
		d = Ta.rangeStep(y, v.add(new ae(0.1).mul(p)), p);
	return r > n ? gl(d) : d;
}
function mj(e, t) {
	var r = mn(e, 2),
		n = r[0],
		i = r[1],
		a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0,
		o = vx([n, i]),
		u = mn(o, 2),
		c = u[0],
		s = u[1];
	if (c === -1 / 0 || s === 1 / 0) return [n, i];
	if (c === s) return [c];
	var f = Math.max(t, 2),
		l = yx(new ae(s).sub(c).div(f - 1), a, 0),
		h = [].concat(ml(Ta.rangeStep(new ae(c), new ae(s).sub(new ae(0.99).mul(l)), l)), [s]);
	return n > i ? gl(h) : h;
}
var bj = dx(gj),
	xj = dx(mj),
	wj = "Invariant failed";
function Vt(e, t) {
	throw new Error(wj);
}
var Oj = ["offset", "layout", "width", "dataKey", "data", "dataPointFormatter", "xAxis", "yAxis"];
function xr(e) {
	"@babel/helpers - typeof";
	return (
		(xr =
			typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
				? (t) => typeof t
				: (t) =>
						t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
							? "symbol"
							: typeof t),
		xr(e)
	);
}
function Ri() {
	return (
		(Ri = Object.assign
			? Object.assign.bind()
			: (e) => {
					for (var t = 1; t < arguments.length; t++) {
						var r = arguments[t];
						for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
					}
					return e;
				}),
		Ri.apply(this, arguments)
	);
}
function _j(e, t) {
	return Tj(e) || Pj(e, t) || Aj(e, t) || Sj();
}
function Sj() {
	throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Aj(e, t) {
	if (e) {
		if (typeof e == "string") return rg(e, t);
		var r = Object.prototype.toString.call(e).slice(8, -1);
		if ((r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set")) return Array.from(e);
		if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return rg(e, t);
	}
}
function rg(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
	return n;
}
function Pj(e, t) {
	var r = e == null ? null : (typeof Symbol < "u" && e[Symbol.iterator]) || e["@@iterator"];
	if (r != null) {
		var n,
			i,
			a,
			o,
			u = [],
			c = !0,
			s = !1;
		try {
			if (((a = (r = r.call(e)).next), t !== 0))
				for (; !(c = (n = a.call(r)).done) && (u.push(n.value), u.length !== t); c = !0);
		} catch (f) {
			(s = !0), (i = f);
		} finally {
			try {
				if (!c && r.return != null && ((o = r.return()), Object(o) !== o)) return;
			} finally {
				if (s) throw i;
			}
		}
		return u;
	}
}
function Tj(e) {
	if (Array.isArray(e)) return e;
}
function Ej(e, t) {
	if (e == null) return {};
	var r = jj(e, t),
		n,
		i;
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (i = 0; i < a.length; i++)
			(n = a[i]), !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
	}
	return r;
}
function jj(e, t) {
	if (e == null) return {};
	var r = {};
	for (var n in e)
		if (Object.prototype.hasOwnProperty.call(e, n)) {
			if (t.indexOf(n) >= 0) continue;
			r[n] = e[n];
		}
	return r;
}
function Mj(e, t) {
	if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function Cj(e, t) {
	for (var r = 0; r < t.length; r++) {
		var n = t[r];
		(n.enumerable = n.enumerable || !1),
			(n.configurable = !0),
			"value" in n && (n.writable = !0),
			Object.defineProperty(e, xx(n.key), n);
	}
}
function Ij(e, t, r) {
	return t && Cj(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function $j(e, t, r) {
	return (t = Ni(t)), Rj(e, mx() ? Reflect.construct(t, r || [], Ni(e).constructor) : t.apply(e, r));
}
function Rj(e, t) {
	if (t && (xr(t) === "object" || typeof t == "function")) return t;
	if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
	return Nj(e);
}
function Nj(e) {
	if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	return e;
}
function mx() {
	try {
		var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], () => {}));
	} catch {}
	return (mx = () => !!e)();
}
function Ni(e) {
	return (
		(Ni = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : (r) => r.__proto__ || Object.getPrototypeOf(r)), Ni(e)
	);
}
function kj(e, t) {
	if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
	(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } })),
		Object.defineProperty(e, "prototype", { writable: !1 }),
		t && xl(e, t);
}
function xl(e, t) {
	return (xl = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : (n, i) => ((n.__proto__ = i), n)), xl(e, t);
}
function bx(e, t, r) {
	return (
		(t = xx(t)),
		t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = r),
		e
	);
}
function xx(e) {
	var t = Dj(e, "string");
	return xr(t) == "symbol" ? t : t + "";
}
function Dj(e, t) {
	if (xr(e) != "object" || !e) return e;
	var r = e[Symbol.toPrimitive];
	if (r !== void 0) {
		var n = r.call(e, t);
		if (xr(n) != "object") return n;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return String(e);
}
var Ea = ((e) => {
	function t() {
		return Mj(this, t), $j(this, t, arguments);
	}
	return (
		kj(t, e),
		Ij(t, [
			{
				key: "render",
				value: function () {
					var n = this.props,
						i = n.offset,
						a = n.layout,
						o = n.width,
						u = n.dataKey,
						c = n.data,
						s = n.dataPointFormatter,
						f = n.xAxis,
						l = n.yAxis,
						h = Ej(n, Oj),
						p = ee(h, !1);
					this.props.direction === "x" && f.type !== "number" && Vt();
					var y = c.map((v) => {
						var d = s(v, u),
							b = d.x,
							w = d.y,
							x = d.value,
							O = d.errorVal;
						if (!O) return null;
						var g = [],
							m,
							_;
						if (Array.isArray(O)) {
							var S = _j(O, 2);
							(m = S[0]), (_ = S[1]);
						} else m = _ = O;
						if (a === "vertical") {
							var P = f.scale,
								M = w + i,
								A = M + o,
								E = M - o,
								j = P(x - m),
								R = P(x + _);
							g.push({ x1: R, y1: A, x2: R, y2: E }),
								g.push({ x1: j, y1: M, x2: R, y2: M }),
								g.push({ x1: j, y1: A, x2: j, y2: E });
						} else if (a === "horizontal") {
							var C = l.scale,
								N = b + i,
								q = N - o,
								L = N + o,
								F = C(x - m),
								G = C(x + _);
							g.push({ x1: q, y1: G, x2: L, y2: G }),
								g.push({ x1: N, y1: F, x2: N, y2: G }),
								g.push({ x1: q, y1: F, x2: L, y2: F });
						}
						return T.createElement(
							_e,
							Ri(
								{
									className: "recharts-errorBar",
									key: "bar-".concat(
										g.map((K) => "".concat(K.x1, "-").concat(K.x2, "-").concat(K.y1, "-").concat(K.y2)),
									),
								},
								p,
							),
							g.map((K) =>
								T.createElement(
									"line",
									Ri({}, K, { key: "line-".concat(K.x1, "-").concat(K.x2, "-").concat(K.y1, "-").concat(K.y2) }),
								),
							),
						);
					});
					return T.createElement(_e, { className: "recharts-errorBars" }, y);
				},
			},
		])
	);
})(T.Component);
bx(Ea, "defaultProps", { stroke: "black", strokeWidth: 1.5, width: 5, offset: 0, layout: "horizontal" });
bx(Ea, "displayName", "ErrorBar");
function bn(e) {
	"@babel/helpers - typeof";
	return (
		(bn =
			typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
				? (t) => typeof t
				: (t) =>
						t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
							? "symbol"
							: typeof t),
		bn(e)
	);
}
function ng(e, t) {
	var r = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		t && (n = n.filter((i) => Object.getOwnPropertyDescriptor(e, i).enumerable)), r.push.apply(r, n);
	}
	return r;
}
function Dt(e) {
	for (var t = 1; t < arguments.length; t++) {
		var r = arguments[t] != null ? arguments[t] : {};
		t % 2
			? ng(Object(r), !0).forEach((n) => {
					qj(e, n, r[n]);
				})
			: Object.getOwnPropertyDescriptors
				? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
				: ng(Object(r)).forEach((n) => {
						Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
					});
	}
	return e;
}
function qj(e, t, r) {
	return (
		(t = Lj(t)),
		t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = r),
		e
	);
}
function Lj(e) {
	var t = Bj(e, "string");
	return bn(t) == "symbol" ? t : t + "";
}
function Bj(e, t) {
	if (bn(e) != "object" || !e) return e;
	var r = e[Symbol.toPrimitive];
	if (r !== void 0) {
		var n = r.call(e, t);
		if (bn(n) != "object") return n;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var wx = (t) => {
	var r = t.children,
		n = t.formattedGraphicalItems,
		i = t.legendWidth,
		a = t.legendContent,
		o = qe(r, sr);
	if (!o) return null;
	var u = sr.defaultProps,
		c = u !== void 0 ? Dt(Dt({}, u), o.props) : {},
		s;
	return (
		o.props && o.props.payload
			? (s = o.props && o.props.payload)
			: a === "children"
				? (s = (n || []).reduce((f, l) => {
						var h = l.item,
							p = l.props,
							y = p.sectors || p.data || [];
						return f.concat(
							y.map((v) => ({
								type: o.props.iconType || h.props.legendType,
								value: v.name,
								color: v.fill,
								payload: v,
							})),
						);
					}, []))
				: (s = (n || []).map((f) => {
						var l = f.item,
							h = l.type.defaultProps,
							p = h !== void 0 ? Dt(Dt({}, h), l.props) : {},
							y = p.dataKey,
							v = p.name,
							d = p.legendType,
							b = p.hide;
						return {
							inactive: b,
							dataKey: y,
							type: c.iconType || d || "square",
							color: Qf(l),
							value: v || y,
							payload: p,
						};
					})),
		Dt(Dt(Dt({}, c), sr.getWithHeight(o, i)), {}, { payload: s, item: o })
	);
};
function xn(e) {
	"@babel/helpers - typeof";
	return (
		(xn =
			typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
				? (t) => typeof t
				: (t) =>
						t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
							? "symbol"
							: typeof t),
		xn(e)
	);
}
function ig(e) {
	return Wj(e) || zj(e) || Uj(e) || Fj();
}
function Fj() {
	throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Uj(e, t) {
	if (e) {
		if (typeof e == "string") return wl(e, t);
		var r = Object.prototype.toString.call(e).slice(8, -1);
		if ((r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set")) return Array.from(e);
		if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return wl(e, t);
	}
}
function zj(e) {
	if ((typeof Symbol < "u" && e[Symbol.iterator] != null) || e["@@iterator"] != null) return Array.from(e);
}
function Wj(e) {
	if (Array.isArray(e)) return wl(e);
}
function wl(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
	return n;
}
function ag(e, t) {
	var r = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		t && (n = n.filter((i) => Object.getOwnPropertyDescriptor(e, i).enumerable)), r.push.apply(r, n);
	}
	return r;
}
function de(e) {
	for (var t = 1; t < arguments.length; t++) {
		var r = arguments[t] != null ? arguments[t] : {};
		t % 2
			? ag(Object(r), !0).forEach((n) => {
					fr(e, n, r[n]);
				})
			: Object.getOwnPropertyDescriptors
				? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
				: ag(Object(r)).forEach((n) => {
						Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
					});
	}
	return e;
}
function fr(e, t, r) {
	return (
		(t = Gj(t)),
		t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = r),
		e
	);
}
function Gj(e) {
	var t = Hj(e, "string");
	return xn(t) == "symbol" ? t : t + "";
}
function Hj(e, t) {
	if (xn(e) != "object" || !e) return e;
	var r = e[Symbol.toPrimitive];
	if (r !== void 0) {
		var n = r.call(e, t);
		if (xn(n) != "object") return n;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function ot(e, t, r) {
	return ne(e) || ne(t) ? r : xe(t) ? ze(e, t, r) : Z(t) ? t(e) : r;
}
function rn(e, t, r, n) {
	var i = WE(e, (u) => ot(u, t));
	if (r === "number") {
		var a = i.filter((u) => B(u) || Number.parseFloat(u));
		return a.length ? [Aa(a), Sa(a)] : [1 / 0, -1 / 0];
	}
	var o = n ? i.filter((u) => !ne(u)) : i;
	return o.map((u) => (xe(u) || u instanceof Date ? u : ""));
}
var Kj = (t) => {
		var r,
			n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [],
			i = arguments.length > 2 ? arguments[2] : void 0,
			a = arguments.length > 3 ? arguments[3] : void 0,
			o = -1,
			u = (r = n?.length) !== null && r !== void 0 ? r : 0;
		if (u <= 1) return 0;
		if (a && a.axisType === "angleAxis" && Math.abs(Math.abs(a.range[1] - a.range[0]) - 360) <= 1e-6)
			for (var c = a.range, s = 0; s < u; s++) {
				var f = s > 0 ? i[s - 1].coordinate : i[u - 1].coordinate,
					l = i[s].coordinate,
					h = s >= u - 1 ? i[0].coordinate : i[s + 1].coordinate,
					p = void 0;
				if (Ze(l - f) !== Ze(h - l)) {
					var y = [];
					if (Ze(h - l) === Ze(c[1] - c[0])) {
						p = h;
						var v = l + c[1] - c[0];
						(y[0] = Math.min(v, (v + f) / 2)), (y[1] = Math.max(v, (v + f) / 2));
					} else {
						p = f;
						var d = h + c[1] - c[0];
						(y[0] = Math.min(l, (d + l) / 2)), (y[1] = Math.max(l, (d + l) / 2));
					}
					var b = [Math.min(l, (p + l) / 2), Math.max(l, (p + l) / 2)];
					if ((t > b[0] && t <= b[1]) || (t >= y[0] && t <= y[1])) {
						o = i[s].index;
						break;
					}
				} else {
					var w = Math.min(f, h),
						x = Math.max(f, h);
					if (t > (w + l) / 2 && t <= (x + l) / 2) {
						o = i[s].index;
						break;
					}
				}
			}
		else
			for (var O = 0; O < u; O++)
				if (
					(O === 0 && t <= (n[O].coordinate + n[O + 1].coordinate) / 2) ||
					(O > 0 &&
						O < u - 1 &&
						t > (n[O].coordinate + n[O - 1].coordinate) / 2 &&
						t <= (n[O].coordinate + n[O + 1].coordinate) / 2) ||
					(O === u - 1 && t > (n[O].coordinate + n[O - 1].coordinate) / 2)
				) {
					o = n[O].index;
					break;
				}
		return o;
	},
	Qf = (t) => {
		var r,
			n = t,
			i = n.type.displayName,
			a = (r = t.type) !== null && r !== void 0 && r.defaultProps ? de(de({}, t.type.defaultProps), t.props) : t.props,
			o = a.stroke,
			u = a.fill,
			c;
		switch (i) {
			case "Line":
				c = o;
				break;
			case "Area":
			case "Radar":
				c = o && o !== "none" ? o : u;
				break;
			default:
				c = u;
				break;
		}
		return c;
	},
	Vj = (t) => {
		var r = t.barSize,
			n = t.totalSize,
			i = t.stackGroups,
			a = i === void 0 ? {} : i;
		if (!a) return {};
		for (var o = {}, u = Object.keys(a), c = 0, s = u.length; c < s; c++)
			for (var f = a[u[c]].stackGroups, l = Object.keys(f), h = 0, p = l.length; h < p; h++) {
				var y = f[l[h]],
					v = y.items,
					d = y.cateAxisId,
					b = v.filter((_) => dt(_.type).indexOf("Bar") >= 0);
				if (b && b.length) {
					var w = b[0].type.defaultProps,
						x = w !== void 0 ? de(de({}, w), b[0].props) : b[0].props,
						O = x.barSize,
						g = x[d];
					o[g] || (o[g] = []);
					var m = ne(O) ? r : O;
					o[g].push({ item: b[0], stackList: b.slice(1), barSize: ne(m) ? void 0 : Ht(m, n, 0) });
				}
			}
		return o;
	},
	Xj = (t) => {
		var r = t.barGap,
			n = t.barCategoryGap,
			i = t.bandSize,
			a = t.sizeList,
			o = a === void 0 ? [] : a,
			u = t.maxBarSize,
			c = o.length;
		if (c < 1) return null;
		var s = Ht(r, i, 0, !0),
			f,
			l = [];
		if (o[0].barSize === +o[0].barSize) {
			var h = !1,
				p = i / c,
				y = o.reduce((O, g) => O + g.barSize || 0, 0);
			(y += (c - 1) * s),
				y >= i && ((y -= (c - 1) * s), (s = 0)),
				y >= i && p > 0 && ((h = !0), (p *= 0.9), (y = c * p));
			var v = ((i - y) / 2) >> 0,
				d = { offset: v - s, size: 0 };
			f = o.reduce((O, g) => {
				var m = { item: g.item, position: { offset: d.offset + d.size + s, size: h ? p : g.barSize } },
					_ = [].concat(ig(O), [m]);
				return (
					(d = _[_.length - 1].position),
					g.stackList &&
						g.stackList.length &&
						g.stackList.forEach((S) => {
							_.push({ item: S, position: d });
						}),
					_
				);
			}, l);
		} else {
			var b = Ht(n, i, 0, !0);
			i - 2 * b - (c - 1) * s <= 0 && (s = 0);
			var w = (i - 2 * b - (c - 1) * s) / c;
			w > 1 && (w >>= 0);
			var x = u === +u ? Math.min(w, u) : w;
			f = o.reduce((O, g, m) => {
				var _ = [].concat(ig(O), [{ item: g.item, position: { offset: b + (w + s) * m + (w - x) / 2, size: x } }]);
				return (
					g.stackList &&
						g.stackList.length &&
						g.stackList.forEach((S) => {
							_.push({ item: S, position: _[_.length - 1].position });
						}),
					_
				);
			}, l);
		}
		return f;
	},
	Yj = (t, r, n, i) => {
		var a = n.children,
			o = n.width,
			u = n.margin,
			c = o - (u.left || 0) - (u.right || 0),
			s = wx({ children: a, legendWidth: c });
		if (s) {
			var f = i || {},
				l = f.width,
				h = f.height,
				p = s.align,
				y = s.verticalAlign,
				v = s.layout;
			if ((v === "vertical" || (v === "horizontal" && y === "middle")) && p !== "center" && B(t[p]))
				return de(de({}, t), {}, fr({}, p, t[p] + (l || 0)));
			if ((v === "horizontal" || (v === "vertical" && p === "center")) && y !== "middle" && B(t[y]))
				return de(de({}, t), {}, fr({}, y, t[y] + (h || 0)));
		}
		return t;
	},
	Zj = (t, r, n) =>
		ne(r)
			? !0
			: t === "horizontal"
				? r === "yAxis"
				: t === "vertical" || n === "x"
					? r === "xAxis"
					: n === "y"
						? r === "yAxis"
						: !0,
	Ox = (t, r, n, i, a) => {
		var o = r.props.children,
			u = Je(o, Ea).filter((s) => Zj(i, a, s.props.direction));
		if (u && u.length) {
			var c = u.map((s) => s.props.dataKey);
			return t.reduce(
				(s, f) => {
					var l = ot(f, n);
					if (ne(l)) return s;
					var h = Array.isArray(l) ? [Aa(l), Sa(l)] : [l, l],
						p = c.reduce(
							(y, v) => {
								var d = ot(f, v, 0),
									b = h[0] - Math.abs(Array.isArray(d) ? d[0] : d),
									w = h[1] + Math.abs(Array.isArray(d) ? d[1] : d);
								return [Math.min(b, y[0]), Math.max(w, y[1])];
							},
							[1 / 0, -1 / 0],
						);
					return [Math.min(p[0], s[0]), Math.max(p[1], s[1])];
				},
				[1 / 0, -1 / 0],
			);
		}
		return null;
	},
	Jj = (t, r, n, i, a) => {
		var o = r.map((u) => Ox(t, u, n, a, i)).filter((u) => !ne(u));
		return o && o.length ? o.reduce((u, c) => [Math.min(u[0], c[0]), Math.max(u[1], c[1])], [1 / 0, -1 / 0]) : null;
	},
	_x = (t, r, n, i, a) => {
		var o = r.map((c) => {
			var s = c.props.dataKey;
			return (n === "number" && s && Ox(t, c, s, i)) || rn(t, s, n, a);
		});
		if (n === "number") return o.reduce((c, s) => [Math.min(c[0], s[0]), Math.max(c[1], s[1])], [1 / 0, -1 / 0]);
		var u = {};
		return o.reduce((c, s) => {
			for (var f = 0, l = s.length; f < l; f++) u[s[f]] || ((u[s[f]] = !0), c.push(s[f]));
			return c;
		}, []);
	},
	Sx = (t, r) =>
		(t === "horizontal" && r === "xAxis") ||
		(t === "vertical" && r === "yAxis") ||
		(t === "centric" && r === "angleAxis") ||
		(t === "radial" && r === "radiusAxis"),
	Ax = (t, r, n, i) => {
		if (i) return t.map((c) => c.coordinate);
		var a,
			o,
			u = t.map((c) => (c.coordinate === r && (a = !0), c.coordinate === n && (o = !0), c.coordinate));
		return a || u.push(r), o || u.push(n), u;
	},
	ft = (t, r, n) => {
		if (!t) return null;
		var i = t.scale,
			a = t.duplicateDomain,
			o = t.type,
			u = t.range,
			c = t.realScaleType === "scaleBand" ? i.bandwidth() / 2 : 2,
			s = (r || n) && o === "category" && i.bandwidth ? i.bandwidth() / c : 0;
		if (
			((s = t.axisType === "angleAxis" && u?.length >= 2 ? Ze(u[0] - u[1]) * 2 * s : s), r && (t.ticks || t.niceTicks))
		) {
			var f = (t.ticks || t.niceTicks).map((l) => {
				var h = a ? a.indexOf(l) : l;
				return { coordinate: i(h) + s, value: l, offset: s };
			});
			return f.filter((l) => !Un(l.coordinate));
		}
		return t.isCategorical && t.categoricalDomain
			? t.categoricalDomain.map((l, h) => ({ coordinate: i(l) + s, value: l, index: h, offset: s }))
			: i.ticks && !n
				? i.ticks(t.tickCount).map((l) => ({ coordinate: i(l) + s, value: l, offset: s }))
				: i.domain().map((l, h) => ({ coordinate: i(l) + s, value: a ? a[l] : l, index: h, offset: s }));
	},
	fs = new WeakMap(),
	ii = (t, r) => {
		if (typeof r != "function") return t;
		fs.has(t) || fs.set(t, new WeakMap());
		var n = fs.get(t);
		if (n.has(r)) return n.get(r);
		var i = () => {
			t.apply(void 0, arguments), r.apply(void 0, arguments);
		};
		return n.set(r, i), i;
	},
	Qj = (t, r, n) => {
		var i = t.scale,
			a = t.type,
			o = t.layout,
			u = t.axisType;
		if (i === "auto")
			return o === "radial" && u === "radiusAxis"
				? { scale: hn(), realScaleType: "band" }
				: o === "radial" && u === "angleAxis"
					? { scale: ji(), realScaleType: "linear" }
					: a === "category" &&
							r &&
							(r.indexOf("LineChart") >= 0 || r.indexOf("AreaChart") >= 0 || (r.indexOf("ComposedChart") >= 0 && !n))
						? { scale: tn(), realScaleType: "point" }
						: a === "category"
							? { scale: hn(), realScaleType: "band" }
							: { scale: ji(), realScaleType: "linear" };
		if (Fn(i)) {
			var c = "scale".concat(fa(i));
			return { scale: (Wy[c] || tn)(), realScaleType: Wy[c] ? c : "point" };
		}
		return Z(i) ? { scale: i } : { scale: tn(), realScaleType: "point" };
	},
	og = 1e-4,
	eM = (t) => {
		var r = t.domain();
		if (!(!r || r.length <= 2)) {
			var n = r.length,
				i = t.range(),
				a = Math.min(i[0], i[1]) - og,
				o = Math.max(i[0], i[1]) + og,
				u = t(r[0]),
				c = t(r[n - 1]);
			(u < a || u > o || c < a || c > o) && t.domain([r[0], r[n - 1]]);
		}
	},
	tM = (t, r) => {
		if (!t) return null;
		for (var n = 0, i = t.length; n < i; n++) if (t[n].item === r) return t[n].position;
		return null;
	},
	rM = (t, r) => {
		if (!r || r.length !== 2 || !B(r[0]) || !B(r[1])) return t;
		var n = Math.min(r[0], r[1]),
			i = Math.max(r[0], r[1]),
			a = [t[0], t[1]];
		return (
			(!B(t[0]) || t[0] < n) && (a[0] = n),
			(!B(t[1]) || t[1] > i) && (a[1] = i),
			a[0] > i && (a[0] = i),
			a[1] < n && (a[1] = n),
			a
		);
	},
	nM = (t) => {
		var r = t.length;
		if (!(r <= 0))
			for (var n = 0, i = t[0].length; n < i; ++n)
				for (var a = 0, o = 0, u = 0; u < r; ++u) {
					var c = Un(t[u][n][1]) ? t[u][n][0] : t[u][n][1];
					c >= 0
						? ((t[u][n][0] = a), (t[u][n][1] = a + c), (a = t[u][n][1]))
						: ((t[u][n][0] = o), (t[u][n][1] = o + c), (o = t[u][n][1]));
				}
	},
	iM = (t) => {
		var r = t.length;
		if (!(r <= 0))
			for (var n = 0, i = t[0].length; n < i; ++n)
				for (var a = 0, o = 0; o < r; ++o) {
					var u = Un(t[o][n][1]) ? t[o][n][0] : t[o][n][1];
					u >= 0 ? ((t[o][n][0] = a), (t[o][n][1] = a + u), (a = t[o][n][1])) : ((t[o][n][0] = 0), (t[o][n][1] = 0));
				}
	},
	aM = { sign: nM, expand: FO, none: hr, silhouette: UO, wiggle: zO, positive: iM },
	oM = (t, r, n) => {
		var i = r.map((u) => u.props.dataKey),
			a = aM[n],
			o = BO()
				.keys(i)
				.value((u, c) => +ot(u, c, 0))
				.order(Zs)
				.offset(a);
		return o(t);
	},
	uM = (t, r, n, i, a, o) => {
		if (!t) return null;
		var u = o ? r.reverse() : r,
			c = {},
			s = u.reduce((l, h) => {
				var p,
					y =
						(p = h.type) !== null && p !== void 0 && p.defaultProps
							? de(de({}, h.type.defaultProps), h.props)
							: h.props,
					v = y.stackId,
					d = y.hide;
				if (d) return l;
				var b = y[n],
					w = l[b] || { hasStack: !1, stackGroups: {} };
				if (xe(v)) {
					var x = w.stackGroups[v] || { numericAxisId: n, cateAxisId: i, items: [] };
					x.items.push(h), (w.hasStack = !0), (w.stackGroups[v] = x);
				} else w.stackGroups[la("_stackId_")] = { numericAxisId: n, cateAxisId: i, items: [h] };
				return de(de({}, l), {}, fr({}, b, w));
			}, c),
			f = {};
		return Object.keys(s).reduce((l, h) => {
			var p = s[h];
			if (p.hasStack) {
				var y = {};
				p.stackGroups = Object.keys(p.stackGroups).reduce((v, d) => {
					var b = p.stackGroups[d];
					return de(
						de({}, v),
						{},
						fr({}, d, { numericAxisId: n, cateAxisId: i, items: b.items, stackedData: oM(t, b.items, a) }),
					);
				}, y);
			}
			return de(de({}, l), {}, fr({}, h, p));
		}, f);
	},
	cM = (t, r) => {
		var n = r.realScaleType,
			i = r.type,
			a = r.tickCount,
			o = r.originalDomain,
			u = r.allowDecimals,
			c = n || r.scale;
		if (c !== "auto" && c !== "linear") return null;
		if (a && i === "number" && o && (o[0] === "auto" || o[1] === "auto")) {
			var s = t.domain();
			if (!s.length) return null;
			var f = bj(s, a, u);
			return t.domain([Aa(f), Sa(f)]), { niceTicks: f };
		}
		if (a && i === "number") {
			var l = t.domain(),
				h = xj(l, a, u);
			return { niceTicks: h };
		}
		return null;
	},
	ug = (t) => {
		var r = t.axis,
			n = t.ticks,
			i = t.offset,
			a = t.bandSize,
			o = t.entry,
			u = t.index;
		if (r.type === "category") return n[u] ? n[u].coordinate + i : null;
		var c = ot(o, r.dataKey, r.domain[u]);
		return ne(c) ? null : r.scale(c) - a / 2 + i;
	},
	sM = (t) => {
		var r = t.numericAxis,
			n = r.scale.domain();
		if (r.type === "number") {
			var i = Math.min(n[0], n[1]),
				a = Math.max(n[0], n[1]);
			return i <= 0 && a >= 0 ? 0 : a < 0 ? a : i;
		}
		return n[0];
	},
	lM = (t, r) => {
		var n,
			i = (n = t.type) !== null && n !== void 0 && n.defaultProps ? de(de({}, t.type.defaultProps), t.props) : t.props,
			a = i.stackId;
		if (xe(a)) {
			var o = r[a];
			if (o) {
				var u = o.items.indexOf(t);
				return u >= 0 ? o.stackedData[u] : null;
			}
		}
		return null;
	},
	fM = (t) => t.reduce((r, n) => [Aa(n.concat([r[0]]).filter(B)), Sa(n.concat([r[1]]).filter(B))], [1 / 0, -1 / 0]),
	Px = (t, r, n) =>
		Object.keys(t)
			.reduce(
				(i, a) => {
					var o = t[a],
						u = o.stackedData,
						c = u.reduce(
							(s, f) => {
								var l = fM(f.slice(r, n + 1));
								return [Math.min(s[0], l[0]), Math.max(s[1], l[1])];
							},
							[1 / 0, -1 / 0],
						);
					return [Math.min(c[0], i[0]), Math.max(c[1], i[1])];
				},
				[1 / 0, -1 / 0],
			)
			.map((i) => (i === 1 / 0 || i === -1 / 0 ? 0 : i)),
	cg = /^dataMin[\s]*-[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/,
	sg = /^dataMax[\s]*\+[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/,
	Ol = (t, r, n) => {
		if (Z(t)) return t(r, n);
		if (!Array.isArray(t)) return r;
		var i = [];
		if (B(t[0])) i[0] = n ? t[0] : Math.min(t[0], r[0]);
		else if (cg.test(t[0])) {
			var a = +cg.exec(t[0])[1];
			i[0] = r[0] - a;
		} else Z(t[0]) ? (i[0] = t[0](r[0])) : (i[0] = r[0]);
		if (B(t[1])) i[1] = n ? t[1] : Math.max(t[1], r[1]);
		else if (sg.test(t[1])) {
			var o = +sg.exec(t[1])[1];
			i[1] = r[1] + o;
		} else Z(t[1]) ? (i[1] = t[1](r[1])) : (i[1] = r[1]);
		return i;
	},
	ki = (t, r, n) => {
		if (t && t.scale && t.scale.bandwidth) {
			var i = t.scale.bandwidth();
			if (!n || i > 0) return i;
		}
		if (t && r && r.length >= 2) {
			for (var a = Pf(r, (l) => l.coordinate), o = 1 / 0, u = 1, c = a.length; u < c; u++) {
				var s = a[u],
					f = a[u - 1];
				o = Math.min((s.coordinate || 0) - (f.coordinate || 0), o);
			}
			return o === 1 / 0 ? 0 : o;
		}
		return n ? void 0 : 0;
	},
	lg = (t, r, n) => (!t || !t.length || Yf(t, ze(n, "type.defaultProps.domain")) ? r : t),
	Tx = (t, r) => {
		var n = t.type.defaultProps ? de(de({}, t.type.defaultProps), t.props) : t.props,
			i = n.dataKey,
			a = n.name,
			o = n.unit,
			u = n.formatter,
			c = n.tooltipType,
			s = n.chartType,
			f = n.hide;
		return de(
			de({}, ee(t, !1)),
			{},
			{
				dataKey: i,
				unit: o,
				formatter: u,
				name: a || i,
				color: Qf(t),
				value: ot(r, i),
				type: c,
				payload: r,
				chartType: s,
				hide: f,
			},
		);
	};
function wn(e) {
	"@babel/helpers - typeof";
	return (
		(wn =
			typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
				? (t) => typeof t
				: (t) =>
						t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
							? "symbol"
							: typeof t),
		wn(e)
	);
}
function fg(e, t) {
	var r = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		t && (n = n.filter((i) => Object.getOwnPropertyDescriptor(e, i).enumerable)), r.push.apply(r, n);
	}
	return r;
}
function hg(e) {
	for (var t = 1; t < arguments.length; t++) {
		var r = arguments[t] != null ? arguments[t] : {};
		t % 2
			? fg(Object(r), !0).forEach((n) => {
					hM(e, n, r[n]);
				})
			: Object.getOwnPropertyDescriptors
				? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
				: fg(Object(r)).forEach((n) => {
						Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
					});
	}
	return e;
}
function hM(e, t, r) {
	return (
		(t = dM(t)),
		t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = r),
		e
	);
}
function dM(e) {
	var t = pM(e, "string");
	return wn(t) == "symbol" ? t : t + "";
}
function pM(e, t) {
	if (wn(e) != "object" || !e) return e;
	var r = e[Symbol.toPrimitive];
	if (r !== void 0) {
		var n = r.call(e, t);
		if (wn(n) != "object") return n;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var Di = Math.PI / 180,
	vM = (t) => (t * 180) / Math.PI,
	Pe = (t, r, n, i) => ({ x: t + Math.cos(-Di * i) * n, y: r + Math.sin(-Di * i) * n }),
	yM = (t, r) => {
		var n = t.x,
			i = t.y,
			a = r.x,
			o = r.y;
		return Math.sqrt(Math.pow(n - a, 2) + Math.pow(i - o, 2));
	},
	gM = (t, r) => {
		var n = t.x,
			i = t.y,
			a = r.cx,
			o = r.cy,
			u = yM({ x: n, y: i }, { x: a, y: o });
		if (u <= 0) return { radius: u };
		var c = (n - a) / u,
			s = Math.acos(c);
		return i > o && (s = 2 * Math.PI - s), { radius: u, angle: vM(s), angleInRadian: s };
	},
	mM = (t) => {
		var r = t.startAngle,
			n = t.endAngle,
			i = Math.floor(r / 360),
			a = Math.floor(n / 360),
			o = Math.min(i, a);
		return { startAngle: r - o * 360, endAngle: n - o * 360 };
	},
	bM = (t, r) => {
		var n = r.startAngle,
			i = r.endAngle,
			a = Math.floor(n / 360),
			o = Math.floor(i / 360),
			u = Math.min(a, o);
		return t + u * 360;
	},
	dg = (t, r) => {
		var n = t.x,
			i = t.y,
			a = gM({ x: n, y: i }, r),
			o = a.radius,
			u = a.angle,
			c = r.innerRadius,
			s = r.outerRadius;
		if (o < c || o > s) return !1;
		if (o === 0) return !0;
		var f = mM(r),
			l = f.startAngle,
			h = f.endAngle,
			p = u,
			y;
		if (l <= h) {
			while (p > h) p -= 360;
			while (p < l) p += 360;
			y = p >= l && p <= h;
		} else {
			while (p > l) p -= 360;
			while (p < h) p += 360;
			y = p >= h && p <= l;
		}
		return y ? hg(hg({}, r), {}, { radius: o, angle: bM(p, r) }) : null;
	};
function On(e) {
	"@babel/helpers - typeof";
	return (
		(On =
			typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
				? (t) => typeof t
				: (t) =>
						t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
							? "symbol"
							: typeof t),
		On(e)
	);
}
var xM = ["offset"];
function wM(e) {
	return AM(e) || SM(e) || _M(e) || OM();
}
function OM() {
	throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function _M(e, t) {
	if (e) {
		if (typeof e == "string") return _l(e, t);
		var r = Object.prototype.toString.call(e).slice(8, -1);
		if ((r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set")) return Array.from(e);
		if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return _l(e, t);
	}
}
function SM(e) {
	if ((typeof Symbol < "u" && e[Symbol.iterator] != null) || e["@@iterator"] != null) return Array.from(e);
}
function AM(e) {
	if (Array.isArray(e)) return _l(e);
}
function _l(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
	return n;
}
function PM(e, t) {
	if (e == null) return {};
	var r = TM(e, t),
		n,
		i;
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (i = 0; i < a.length; i++)
			(n = a[i]), !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
	}
	return r;
}
function TM(e, t) {
	if (e == null) return {};
	var r = {};
	for (var n in e)
		if (Object.prototype.hasOwnProperty.call(e, n)) {
			if (t.indexOf(n) >= 0) continue;
			r[n] = e[n];
		}
	return r;
}
function pg(e, t) {
	var r = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		t && (n = n.filter((i) => Object.getOwnPropertyDescriptor(e, i).enumerable)), r.push.apply(r, n);
	}
	return r;
}
function be(e) {
	for (var t = 1; t < arguments.length; t++) {
		var r = arguments[t] != null ? arguments[t] : {};
		t % 2
			? pg(Object(r), !0).forEach((n) => {
					EM(e, n, r[n]);
				})
			: Object.getOwnPropertyDescriptors
				? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
				: pg(Object(r)).forEach((n) => {
						Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
					});
	}
	return e;
}
function EM(e, t, r) {
	return (
		(t = jM(t)),
		t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = r),
		e
	);
}
function jM(e) {
	var t = MM(e, "string");
	return On(t) == "symbol" ? t : t + "";
}
function MM(e, t) {
	if (On(e) != "object" || !e) return e;
	var r = e[Symbol.toPrimitive];
	if (r !== void 0) {
		var n = r.call(e, t);
		if (On(n) != "object") return n;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function _n() {
	return (
		(_n = Object.assign
			? Object.assign.bind()
			: (e) => {
					for (var t = 1; t < arguments.length; t++) {
						var r = arguments[t];
						for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
					}
					return e;
				}),
		_n.apply(this, arguments)
	);
}
var CM = (t) => {
		var r = t.value,
			n = t.formatter,
			i = ne(t.children) ? r : t.children;
		return Z(n) ? n(i) : i;
	},
	IM = (t, r) => {
		var n = Ze(r - t),
			i = Math.min(Math.abs(r - t), 360);
		return n * i;
	},
	$M = (t, r, n) => {
		var i = t.position,
			a = t.viewBox,
			o = t.offset,
			u = t.className,
			c = a,
			s = c.cx,
			f = c.cy,
			l = c.innerRadius,
			h = c.outerRadius,
			p = c.startAngle,
			y = c.endAngle,
			v = c.clockWise,
			d = (l + h) / 2,
			b = IM(p, y),
			w = b >= 0 ? 1 : -1,
			x,
			O;
		i === "insideStart"
			? ((x = p + w * o), (O = v))
			: i === "insideEnd"
				? ((x = y - w * o), (O = !v))
				: i === "end" && ((x = y + w * o), (O = v)),
			(O = b <= 0 ? O : !O);
		var g = Pe(s, f, d, x),
			m = Pe(s, f, d, x + (O ? 1 : -1) * 359),
			_ = "M"
				.concat(g.x, ",")
				.concat(
					g.y,
					`
    A`,
				)
				.concat(d, ",")
				.concat(d, ",0,1,")
				.concat(
					O ? 0 : 1,
					`,
    `,
				)
				.concat(m.x, ",")
				.concat(m.y),
			S = ne(t.id) ? la("recharts-radial-line-") : t.id;
		return T.createElement(
			"text",
			_n({}, n, { dominantBaseline: "central", className: ie("recharts-radial-bar-label", u) }),
			T.createElement("defs", null, T.createElement("path", { id: S, d: _ })),
			T.createElement("textPath", { xlinkHref: "#".concat(S) }, r),
		);
	},
	RM = (t) => {
		var r = t.viewBox,
			n = t.offset,
			i = t.position,
			a = r,
			o = a.cx,
			u = a.cy,
			c = a.innerRadius,
			s = a.outerRadius,
			f = a.startAngle,
			l = a.endAngle,
			h = (f + l) / 2;
		if (i === "outside") {
			var p = Pe(o, u, s + n, h),
				y = p.x,
				v = p.y;
			return { x: y, y: v, textAnchor: y >= o ? "start" : "end", verticalAnchor: "middle" };
		}
		if (i === "center") return { x: o, y: u, textAnchor: "middle", verticalAnchor: "middle" };
		if (i === "centerTop") return { x: o, y: u, textAnchor: "middle", verticalAnchor: "start" };
		if (i === "centerBottom") return { x: o, y: u, textAnchor: "middle", verticalAnchor: "end" };
		var d = (c + s) / 2,
			b = Pe(o, u, d, h),
			w = b.x,
			x = b.y;
		return { x: w, y: x, textAnchor: "middle", verticalAnchor: "middle" };
	},
	NM = (t) => {
		var r = t.viewBox,
			n = t.parentViewBox,
			i = t.offset,
			a = t.position,
			o = r,
			u = o.x,
			c = o.y,
			s = o.width,
			f = o.height,
			l = f >= 0 ? 1 : -1,
			h = l * i,
			p = l > 0 ? "end" : "start",
			y = l > 0 ? "start" : "end",
			v = s >= 0 ? 1 : -1,
			d = v * i,
			b = v > 0 ? "end" : "start",
			w = v > 0 ? "start" : "end";
		if (a === "top") {
			var x = { x: u + s / 2, y: c - l * i, textAnchor: "middle", verticalAnchor: p };
			return be(be({}, x), n ? { height: Math.max(c - n.y, 0), width: s } : {});
		}
		if (a === "bottom") {
			var O = { x: u + s / 2, y: c + f + h, textAnchor: "middle", verticalAnchor: y };
			return be(be({}, O), n ? { height: Math.max(n.y + n.height - (c + f), 0), width: s } : {});
		}
		if (a === "left") {
			var g = { x: u - d, y: c + f / 2, textAnchor: b, verticalAnchor: "middle" };
			return be(be({}, g), n ? { width: Math.max(g.x - n.x, 0), height: f } : {});
		}
		if (a === "right") {
			var m = { x: u + s + d, y: c + f / 2, textAnchor: w, verticalAnchor: "middle" };
			return be(be({}, m), n ? { width: Math.max(n.x + n.width - m.x, 0), height: f } : {});
		}
		var _ = n ? { width: s, height: f } : {};
		return a === "insideLeft"
			? be({ x: u + d, y: c + f / 2, textAnchor: w, verticalAnchor: "middle" }, _)
			: a === "insideRight"
				? be({ x: u + s - d, y: c + f / 2, textAnchor: b, verticalAnchor: "middle" }, _)
				: a === "insideTop"
					? be({ x: u + s / 2, y: c + h, textAnchor: "middle", verticalAnchor: y }, _)
					: a === "insideBottom"
						? be({ x: u + s / 2, y: c + f - h, textAnchor: "middle", verticalAnchor: p }, _)
						: a === "insideTopLeft"
							? be({ x: u + d, y: c + h, textAnchor: w, verticalAnchor: y }, _)
							: a === "insideTopRight"
								? be({ x: u + s - d, y: c + h, textAnchor: b, verticalAnchor: y }, _)
								: a === "insideBottomLeft"
									? be({ x: u + d, y: c + f - h, textAnchor: w, verticalAnchor: p }, _)
									: a === "insideBottomRight"
										? be({ x: u + s - d, y: c + f - h, textAnchor: b, verticalAnchor: p }, _)
										: Nr(a) && (B(a.x) || Bt(a.x)) && (B(a.y) || Bt(a.y))
											? be({ x: u + Ht(a.x, s), y: c + Ht(a.y, f), textAnchor: "end", verticalAnchor: "end" }, _)
											: be({ x: u + s / 2, y: c + f / 2, textAnchor: "middle", verticalAnchor: "middle" }, _);
	},
	kM = (t) => "cx" in t && B(t.cx);
function Ee(e) {
	var t = e.offset,
		r = t === void 0 ? 5 : t,
		n = PM(e, xM),
		i = be({ offset: r }, n),
		a = i.viewBox,
		o = i.position,
		u = i.value,
		c = i.children,
		s = i.content,
		f = i.className,
		l = f === void 0 ? "" : f,
		h = i.textBreakAll;
	if (!a || (ne(u) && ne(c) && !k.isValidElement(s) && !Z(s))) return null;
	if (k.isValidElement(s)) return k.cloneElement(s, i);
	var p;
	if (Z(s)) {
		if (((p = k.createElement(s, i)), k.isValidElement(p))) return p;
	} else p = CM(i);
	var y = kM(a),
		v = ee(i, !0);
	if (y && (o === "insideStart" || o === "insideEnd" || o === "end")) return $M(i, p, v);
	var d = y ? RM(i) : NM(i);
	return T.createElement(Oi, _n({ className: ie("recharts-label", l) }, v, d, { breakAll: h }), p);
}
Ee.displayName = "Label";
var Ex = (t) => {
		var r = t.cx,
			n = t.cy,
			i = t.angle,
			a = t.startAngle,
			o = t.endAngle,
			u = t.r,
			c = t.radius,
			s = t.innerRadius,
			f = t.outerRadius,
			l = t.x,
			h = t.y,
			p = t.top,
			y = t.left,
			v = t.width,
			d = t.height,
			b = t.clockWise,
			w = t.labelViewBox;
		if (w) return w;
		if (B(v) && B(d)) {
			if (B(l) && B(h)) return { x: l, y: h, width: v, height: d };
			if (B(p) && B(y)) return { x: p, y, width: v, height: d };
		}
		return B(l) && B(h)
			? { x: l, y: h, width: 0, height: 0 }
			: B(r) && B(n)
				? {
						cx: r,
						cy: n,
						startAngle: a || i || 0,
						endAngle: o || i || 0,
						innerRadius: s || 0,
						outerRadius: f || c || u || 0,
						clockWise: b,
					}
				: t.viewBox
					? t.viewBox
					: {};
	},
	DM = (t, r) =>
		t
			? t === !0
				? T.createElement(Ee, { key: "label-implicit", viewBox: r })
				: xe(t)
					? T.createElement(Ee, { key: "label-implicit", viewBox: r, value: t })
					: k.isValidElement(t)
						? t.type === Ee
							? k.cloneElement(t, { key: "label-implicit", viewBox: r })
							: T.createElement(Ee, { key: "label-implicit", content: t, viewBox: r })
						: Z(t)
							? T.createElement(Ee, { key: "label-implicit", content: t, viewBox: r })
							: Nr(t)
								? T.createElement(Ee, _n({ viewBox: r }, t, { key: "label-implicit" }))
								: null
			: null,
	qM = (t, r) => {
		var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
		if (!t || (!t.children && n && !t.label)) return null;
		var i = t.children,
			a = Ex(t),
			o = Je(i, Ee).map((c, s) => k.cloneElement(c, { viewBox: r || a, key: "label-".concat(s) }));
		if (!n) return o;
		var u = DM(t.label, r || a);
		return [u].concat(wM(o));
	};
Ee.parseViewBox = Ex;
Ee.renderCallByParent = qM;
var hs, vg;
function LM() {
	if (vg) return hs;
	vg = 1;
	function e(t) {
		var r = t == null ? 0 : t.length;
		return r ? t[r - 1] : void 0;
	}
	return (hs = e), hs;
}
var BM = LM();
const FM = ce(BM);
function Sn(e) {
	"@babel/helpers - typeof";
	return (
		(Sn =
			typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
				? (t) => typeof t
				: (t) =>
						t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
							? "symbol"
							: typeof t),
		Sn(e)
	);
}
var UM = ["valueAccessor"],
	zM = ["data", "dataKey", "clockWise", "id", "textBreakAll"];
function WM(e) {
	return VM(e) || KM(e) || HM(e) || GM();
}
function GM() {
	throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function HM(e, t) {
	if (e) {
		if (typeof e == "string") return Sl(e, t);
		var r = Object.prototype.toString.call(e).slice(8, -1);
		if ((r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set")) return Array.from(e);
		if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Sl(e, t);
	}
}
function KM(e) {
	if ((typeof Symbol < "u" && e[Symbol.iterator] != null) || e["@@iterator"] != null) return Array.from(e);
}
function VM(e) {
	if (Array.isArray(e)) return Sl(e);
}
function Sl(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
	return n;
}
function qi() {
	return (
		(qi = Object.assign
			? Object.assign.bind()
			: (e) => {
					for (var t = 1; t < arguments.length; t++) {
						var r = arguments[t];
						for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
					}
					return e;
				}),
		qi.apply(this, arguments)
	);
}
function yg(e, t) {
	var r = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		t && (n = n.filter((i) => Object.getOwnPropertyDescriptor(e, i).enumerable)), r.push.apply(r, n);
	}
	return r;
}
function gg(e) {
	for (var t = 1; t < arguments.length; t++) {
		var r = arguments[t] != null ? arguments[t] : {};
		t % 2
			? yg(Object(r), !0).forEach((n) => {
					XM(e, n, r[n]);
				})
			: Object.getOwnPropertyDescriptors
				? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
				: yg(Object(r)).forEach((n) => {
						Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
					});
	}
	return e;
}
function XM(e, t, r) {
	return (
		(t = YM(t)),
		t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = r),
		e
	);
}
function YM(e) {
	var t = ZM(e, "string");
	return Sn(t) == "symbol" ? t : t + "";
}
function ZM(e, t) {
	if (Sn(e) != "object" || !e) return e;
	var r = e[Symbol.toPrimitive];
	if (r !== void 0) {
		var n = r.call(e, t);
		if (Sn(n) != "object") return n;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function mg(e, t) {
	if (e == null) return {};
	var r = JM(e, t),
		n,
		i;
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (i = 0; i < a.length; i++)
			(n = a[i]), !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
	}
	return r;
}
function JM(e, t) {
	if (e == null) return {};
	var r = {};
	for (var n in e)
		if (Object.prototype.hasOwnProperty.call(e, n)) {
			if (t.indexOf(n) >= 0) continue;
			r[n] = e[n];
		}
	return r;
}
var QM = (t) => (Array.isArray(t.value) ? FM(t.value) : t.value);
function nt(e) {
	var t = e.valueAccessor,
		r = t === void 0 ? QM : t,
		n = mg(e, UM),
		i = n.data,
		a = n.dataKey,
		o = n.clockWise,
		u = n.id,
		c = n.textBreakAll,
		s = mg(n, zM);
	return !i || !i.length
		? null
		: T.createElement(
				_e,
				{ className: "recharts-label-list" },
				i.map((f, l) => {
					var h = ne(a) ? r(f, l) : ot(f && f.payload, a),
						p = ne(u) ? {} : { id: "".concat(u, "-").concat(l) };
					return T.createElement(
						Ee,
						qi({}, ee(f, !0), s, p, {
							parentViewBox: f.parentViewBox,
							value: h,
							textBreakAll: c,
							viewBox: Ee.parseViewBox(ne(o) ? f : gg(gg({}, f), {}, { clockWise: o })),
							key: "label-".concat(l),
							index: l,
						}),
					);
				}),
			);
}
nt.displayName = "LabelList";
function eC(e, t) {
	return e
		? e === !0
			? T.createElement(nt, { key: "labelList-implicit", data: t })
			: T.isValidElement(e) || Z(e)
				? T.createElement(nt, { key: "labelList-implicit", data: t, content: e })
				: Nr(e)
					? T.createElement(nt, qi({ data: t }, e, { key: "labelList-implicit" }))
					: null
		: null;
}
function tC(e, t) {
	var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
	if (!e || (!e.children && r && !e.label)) return null;
	var n = e.children,
		i = Je(n, nt).map((o, u) => k.cloneElement(o, { data: t, key: "labelList-".concat(u) }));
	if (!r) return i;
	var a = eC(e.label, t);
	return [a].concat(WM(i));
}
nt.renderCallByParent = tC;
function An(e) {
	"@babel/helpers - typeof";
	return (
		(An =
			typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
				? (t) => typeof t
				: (t) =>
						t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
							? "symbol"
							: typeof t),
		An(e)
	);
}
function Al() {
	return (
		(Al = Object.assign
			? Object.assign.bind()
			: (e) => {
					for (var t = 1; t < arguments.length; t++) {
						var r = arguments[t];
						for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
					}
					return e;
				}),
		Al.apply(this, arguments)
	);
}
function bg(e, t) {
	var r = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		t && (n = n.filter((i) => Object.getOwnPropertyDescriptor(e, i).enumerable)), r.push.apply(r, n);
	}
	return r;
}
function xg(e) {
	for (var t = 1; t < arguments.length; t++) {
		var r = arguments[t] != null ? arguments[t] : {};
		t % 2
			? bg(Object(r), !0).forEach((n) => {
					rC(e, n, r[n]);
				})
			: Object.getOwnPropertyDescriptors
				? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
				: bg(Object(r)).forEach((n) => {
						Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
					});
	}
	return e;
}
function rC(e, t, r) {
	return (
		(t = nC(t)),
		t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = r),
		e
	);
}
function nC(e) {
	var t = iC(e, "string");
	return An(t) == "symbol" ? t : t + "";
}
function iC(e, t) {
	if (An(e) != "object" || !e) return e;
	var r = e[Symbol.toPrimitive];
	if (r !== void 0) {
		var n = r.call(e, t);
		if (An(n) != "object") return n;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var aC = (t, r) => {
		var n = Ze(r - t),
			i = Math.min(Math.abs(r - t), 359.999);
		return n * i;
	},
	ai = (t) => {
		var r = t.cx,
			n = t.cy,
			i = t.radius,
			a = t.angle,
			o = t.sign,
			u = t.isExternal,
			c = t.cornerRadius,
			s = t.cornerIsExternal,
			f = c * (u ? 1 : -1) + i,
			l = Math.asin(c / f) / Di,
			h = s ? a : a + o * l,
			p = Pe(r, n, f, h),
			y = Pe(r, n, i, h),
			v = s ? a - o * l : a,
			d = Pe(r, n, f * Math.cos(l * Di), v);
		return { center: p, circleTangency: y, lineTangency: d, theta: l };
	},
	jx = (t) => {
		var r = t.cx,
			n = t.cy,
			i = t.innerRadius,
			a = t.outerRadius,
			o = t.startAngle,
			u = t.endAngle,
			c = aC(o, u),
			s = o + c,
			f = Pe(r, n, a, o),
			l = Pe(r, n, a, s),
			h = "M "
				.concat(f.x, ",")
				.concat(
					f.y,
					`
    A `,
				)
				.concat(a, ",")
				.concat(
					a,
					`,0,
    `,
				)
				.concat(+(Math.abs(c) > 180), ",")
				.concat(
					+(o > s),
					`,
    `,
				)
				.concat(l.x, ",")
				.concat(
					l.y,
					`
  `,
				);
		if (i > 0) {
			var p = Pe(r, n, i, o),
				y = Pe(r, n, i, s);
			h += "L "
				.concat(y.x, ",")
				.concat(
					y.y,
					`
            A `,
				)
				.concat(i, ",")
				.concat(
					i,
					`,0,
            `,
				)
				.concat(+(Math.abs(c) > 180), ",")
				.concat(
					+(o <= s),
					`,
            `,
				)
				.concat(p.x, ",")
				.concat(p.y, " Z");
		} else h += "L ".concat(r, ",").concat(n, " Z");
		return h;
	},
	oC = (t) => {
		var r = t.cx,
			n = t.cy,
			i = t.innerRadius,
			a = t.outerRadius,
			o = t.cornerRadius,
			u = t.forceCornerRadius,
			c = t.cornerIsExternal,
			s = t.startAngle,
			f = t.endAngle,
			l = Ze(f - s),
			h = ai({ cx: r, cy: n, radius: a, angle: s, sign: l, cornerRadius: o, cornerIsExternal: c }),
			p = h.circleTangency,
			y = h.lineTangency,
			v = h.theta,
			d = ai({ cx: r, cy: n, radius: a, angle: f, sign: -l, cornerRadius: o, cornerIsExternal: c }),
			b = d.circleTangency,
			w = d.lineTangency,
			x = d.theta,
			O = c ? Math.abs(s - f) : Math.abs(s - f) - v - x;
		if (O < 0)
			return u
				? "M "
						.concat(y.x, ",")
						.concat(
							y.y,
							`
        a`,
						)
						.concat(o, ",")
						.concat(o, ",0,0,1,")
						.concat(
							o * 2,
							`,0
        a`,
						)
						.concat(o, ",")
						.concat(o, ",0,0,1,")
						.concat(
							-o * 2,
							`,0
      `,
						)
				: jx({ cx: r, cy: n, innerRadius: i, outerRadius: a, startAngle: s, endAngle: f });
		var g = "M "
			.concat(y.x, ",")
			.concat(
				y.y,
				`
    A`,
			)
			.concat(o, ",")
			.concat(o, ",0,0,")
			.concat(+(l < 0), ",")
			.concat(p.x, ",")
			.concat(
				p.y,
				`
    A`,
			)
			.concat(a, ",")
			.concat(a, ",0,")
			.concat(+(O > 180), ",")
			.concat(+(l < 0), ",")
			.concat(b.x, ",")
			.concat(
				b.y,
				`
    A`,
			)
			.concat(o, ",")
			.concat(o, ",0,0,")
			.concat(+(l < 0), ",")
			.concat(w.x, ",")
			.concat(
				w.y,
				`
  `,
			);
		if (i > 0) {
			var m = ai({ cx: r, cy: n, radius: i, angle: s, sign: l, isExternal: !0, cornerRadius: o, cornerIsExternal: c }),
				_ = m.circleTangency,
				S = m.lineTangency,
				P = m.theta,
				M = ai({ cx: r, cy: n, radius: i, angle: f, sign: -l, isExternal: !0, cornerRadius: o, cornerIsExternal: c }),
				A = M.circleTangency,
				E = M.lineTangency,
				j = M.theta,
				R = c ? Math.abs(s - f) : Math.abs(s - f) - P - j;
			if (R < 0 && o === 0) return "".concat(g, "L").concat(r, ",").concat(n, "Z");
			g += "L"
				.concat(E.x, ",")
				.concat(
					E.y,
					`
      A`,
				)
				.concat(o, ",")
				.concat(o, ",0,0,")
				.concat(+(l < 0), ",")
				.concat(A.x, ",")
				.concat(
					A.y,
					`
      A`,
				)
				.concat(i, ",")
				.concat(i, ",0,")
				.concat(+(R > 180), ",")
				.concat(+(l > 0), ",")
				.concat(_.x, ",")
				.concat(
					_.y,
					`
      A`,
				)
				.concat(o, ",")
				.concat(o, ",0,0,")
				.concat(+(l < 0), ",")
				.concat(S.x, ",")
				.concat(S.y, "Z");
		} else g += "L".concat(r, ",").concat(n, "Z");
		return g;
	},
	uC = {
		cx: 0,
		cy: 0,
		innerRadius: 0,
		outerRadius: 0,
		startAngle: 0,
		endAngle: 0,
		cornerRadius: 0,
		forceCornerRadius: !1,
		cornerIsExternal: !1,
	},
	Mx = (t) => {
		var r = xg(xg({}, uC), t),
			n = r.cx,
			i = r.cy,
			a = r.innerRadius,
			o = r.outerRadius,
			u = r.cornerRadius,
			c = r.forceCornerRadius,
			s = r.cornerIsExternal,
			f = r.startAngle,
			l = r.endAngle,
			h = r.className;
		if (o < a || f === l) return null;
		var p = ie("recharts-sector", h),
			y = o - a,
			v = Ht(u, y, 0, !0),
			d;
		return (
			v > 0 && Math.abs(f - l) < 360
				? (d = oC({
						cx: n,
						cy: i,
						innerRadius: a,
						outerRadius: o,
						cornerRadius: Math.min(v, y / 2),
						forceCornerRadius: c,
						cornerIsExternal: s,
						startAngle: f,
						endAngle: l,
					}))
				: (d = jx({ cx: n, cy: i, innerRadius: a, outerRadius: o, startAngle: f, endAngle: l })),
			T.createElement("path", Al({}, ee(r, !0), { className: p, d, role: "img" }))
		);
	};
function Pn(e) {
	"@babel/helpers - typeof";
	return (
		(Pn =
			typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
				? (t) => typeof t
				: (t) =>
						t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
							? "symbol"
							: typeof t),
		Pn(e)
	);
}
function Pl() {
	return (
		(Pl = Object.assign
			? Object.assign.bind()
			: (e) => {
					for (var t = 1; t < arguments.length; t++) {
						var r = arguments[t];
						for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
					}
					return e;
				}),
		Pl.apply(this, arguments)
	);
}
function wg(e, t) {
	var r = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		t && (n = n.filter((i) => Object.getOwnPropertyDescriptor(e, i).enumerable)), r.push.apply(r, n);
	}
	return r;
}
function Og(e) {
	for (var t = 1; t < arguments.length; t++) {
		var r = arguments[t] != null ? arguments[t] : {};
		t % 2
			? wg(Object(r), !0).forEach((n) => {
					cC(e, n, r[n]);
				})
			: Object.getOwnPropertyDescriptors
				? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
				: wg(Object(r)).forEach((n) => {
						Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
					});
	}
	return e;
}
function cC(e, t, r) {
	return (
		(t = sC(t)),
		t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = r),
		e
	);
}
function sC(e) {
	var t = lC(e, "string");
	return Pn(t) == "symbol" ? t : t + "";
}
function lC(e, t) {
	if (Pn(e) != "object" || !e) return e;
	var r = e[Symbol.toPrimitive];
	if (r !== void 0) {
		var n = r.call(e, t);
		if (Pn(n) != "object") return n;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var _g = {
		curveBasisClosed: jO,
		curveBasisOpen: MO,
		curveBasis: EO,
		curveBumpX: pO,
		curveBumpY: vO,
		curveLinearClosed: CO,
		curveLinear: da,
		curveMonotoneX: IO,
		curveMonotoneY: $O,
		curveNatural: RO,
		curveStep: NO,
		curveStepAfter: DO,
		curveStepBefore: kO,
	},
	oi = (t) => t.x === +t.x && t.y === +t.y,
	Kr = (t) => t.x,
	Vr = (t) => t.y,
	fC = (t, r) => {
		if (Z(t)) return t;
		var n = "curve".concat(fa(t));
		return (n === "curveMonotone" || n === "curveBump") && r
			? _g["".concat(n).concat(r === "vertical" ? "Y" : "X")]
			: _g[n] || da;
	},
	hC = (t) => {
		var r = t.type,
			n = r === void 0 ? "linear" : r,
			i = t.points,
			a = i === void 0 ? [] : i,
			o = t.baseLine,
			u = t.layout,
			c = t.connectNulls,
			s = c === void 0 ? !1 : c,
			f = fC(n, u),
			l = s ? a.filter((v) => oi(v)) : a,
			h;
		if (Array.isArray(o)) {
			var p = s ? o.filter((v) => oi(v)) : o,
				y = l.map((v, d) => Og(Og({}, v), {}, { base: p[d] }));
			return (
				u === "vertical"
					? (h = Zn()
							.y(Vr)
							.x1(Kr)
							.x0((v) => v.base.x))
					: (h = Zn()
							.x(Kr)
							.y1(Vr)
							.y0((v) => v.base.y)),
				h.defined(oi).curve(f),
				h(y)
			);
		}
		return (
			u === "vertical" && B(o)
				? (h = Zn().y(Vr).x1(Kr).x0(o))
				: B(o)
					? (h = Zn().x(Kr).y1(Vr).y0(o))
					: (h = Rb().x(Kr).y(Vr)),
			h.defined(oi).curve(f),
			h(l)
		);
	},
	Sg = (t) => {
		var r = t.className,
			n = t.points,
			i = t.path,
			a = t.pathRef;
		if ((!n || !n.length) && !i) return null;
		var o = n && n.length ? hC(t) : i;
		return T.createElement("path", Pl({}, ee(t, !1), li(t), { className: ie("recharts-curve", r), d: o, ref: a }));
	},
	ds = { exports: {} },
	ps,
	Ag;
function dC() {
	if (Ag) return ps;
	Ag = 1;
	var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
	return (ps = e), ps;
}
var vs, Pg;
function pC() {
	if (Pg) return vs;
	Pg = 1;
	var e = dC();
	function t() {}
	function r() {}
	return (
		(r.resetWarningCache = t),
		(vs = () => {
			function n(o, u, c, s, f, l) {
				if (l !== e) {
					var h = new Error(
						"Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types",
					);
					throw ((h.name = "Invariant Violation"), h);
				}
			}
			n.isRequired = n;
			function i() {
				return n;
			}
			var a = {
				array: n,
				bigint: n,
				bool: n,
				func: n,
				number: n,
				object: n,
				string: n,
				symbol: n,
				any: n,
				arrayOf: i,
				element: n,
				elementType: n,
				instanceOf: i,
				node: n,
				objectOf: i,
				oneOf: i,
				oneOfType: i,
				shape: i,
				exact: i,
				checkPropTypes: r,
				resetWarningCache: t,
			};
			return (a.PropTypes = a), a;
		}),
		vs
	);
}
var Tg;
function vC() {
	return Tg || ((Tg = 1), (ds.exports = pC()())), ds.exports;
}
var yC = vC();
const re = ce(yC);
var gC = Object.getOwnPropertyNames,
	mC = Object.getOwnPropertySymbols,
	bC = Object.prototype.hasOwnProperty;
function Eg(e, t) {
	return (n, i, a) => e(n, i, a) && t(n, i, a);
}
function ui(e) {
	return (r, n, i) => {
		if (!r || !n || typeof r != "object" || typeof n != "object") return e(r, n, i);
		var a = i.cache,
			o = a.get(r),
			u = a.get(n);
		if (o && u) return o === n && u === r;
		a.set(r, n), a.set(n, r);
		var c = e(r, n, i);
		return a.delete(r), a.delete(n), c;
	};
}
function jg(e) {
	return gC(e).concat(mC(e));
}
var xC = Object.hasOwn || ((e, t) => bC.call(e, t));
function Qt(e, t) {
	return e === t || (!e && !t && e !== e && t !== t);
}
var wC = "__v",
	OC = "__o",
	_C = "_owner",
	Mg = Object.getOwnPropertyDescriptor,
	Cg = Object.keys;
function SC(e, t, r) {
	var n = e.length;
	if (t.length !== n) return !1;
	while (n-- > 0) if (!r.equals(e[n], t[n], n, n, e, t, r)) return !1;
	return !0;
}
function AC(e, t) {
	return Qt(e.getTime(), t.getTime());
}
function PC(e, t) {
	return e.name === t.name && e.message === t.message && e.cause === t.cause && e.stack === t.stack;
}
function TC(e, t) {
	return e === t;
}
function Ig(e, t, r) {
	var n = e.size;
	if (n !== t.size) return !1;
	if (!n) return !0;
	for (var i = new Array(n), a = e.entries(), o, u, c = 0; (o = a.next()) && !o.done; ) {
		for (var s = t.entries(), f = !1, l = 0; (u = s.next()) && !u.done; ) {
			if (i[l]) {
				l++;
				continue;
			}
			var h = o.value,
				p = u.value;
			if (r.equals(h[0], p[0], c, l, e, t, r) && r.equals(h[1], p[1], h[0], p[0], e, t, r)) {
				f = i[l] = !0;
				break;
			}
			l++;
		}
		if (!f) return !1;
		c++;
	}
	return !0;
}
var EC = Qt;
function jC(e, t, r) {
	var n = Cg(e),
		i = n.length;
	if (Cg(t).length !== i) return !1;
	while (i-- > 0) if (!Cx(e, t, r, n[i])) return !1;
	return !0;
}
function Xr(e, t, r) {
	var n = jg(e),
		i = n.length;
	if (jg(t).length !== i) return !1;
	for (var a, o, u; i-- > 0; )
		if (
			((a = n[i]),
			!Cx(e, t, r, a) ||
				((o = Mg(e, a)),
				(u = Mg(t, a)),
				(o || u) &&
					(!o ||
						!u ||
						o.configurable !== u.configurable ||
						o.enumerable !== u.enumerable ||
						o.writable !== u.writable)))
		)
			return !1;
	return !0;
}
function MC(e, t) {
	return Qt(e.valueOf(), t.valueOf());
}
function CC(e, t) {
	return e.source === t.source && e.flags === t.flags;
}
function $g(e, t, r) {
	var n = e.size;
	if (n !== t.size) return !1;
	if (!n) return !0;
	for (var i = new Array(n), a = e.values(), o, u; (o = a.next()) && !o.done; ) {
		for (var c = t.values(), s = !1, f = 0; (u = c.next()) && !u.done; ) {
			if (!i[f] && r.equals(o.value, u.value, o.value, u.value, e, t, r)) {
				s = i[f] = !0;
				break;
			}
			f++;
		}
		if (!s) return !1;
	}
	return !0;
}
function IC(e, t) {
	var r = e.length;
	if (t.length !== r) return !1;
	while (r-- > 0) if (e[r] !== t[r]) return !1;
	return !0;
}
function $C(e, t) {
	return (
		e.hostname === t.hostname &&
		e.pathname === t.pathname &&
		e.protocol === t.protocol &&
		e.port === t.port &&
		e.hash === t.hash &&
		e.username === t.username &&
		e.password === t.password
	);
}
function Cx(e, t, r, n) {
	return (n === _C || n === OC || n === wC) && (e.$$typeof || t.$$typeof)
		? !0
		: xC(t, n) && r.equals(e[n], t[n], n, n, e, t, r);
}
var RC = "[object Arguments]",
	NC = "[object Boolean]",
	kC = "[object Date]",
	DC = "[object Error]",
	qC = "[object Map]",
	LC = "[object Number]",
	BC = "[object Object]",
	FC = "[object RegExp]",
	UC = "[object Set]",
	zC = "[object String]",
	WC = "[object URL]",
	GC = Array.isArray,
	Rg = typeof ArrayBuffer == "function" && ArrayBuffer.isView ? ArrayBuffer.isView : null,
	Ng = Object.assign,
	HC = Object.prototype.toString.call.bind(Object.prototype.toString);
function KC(e) {
	var t = e.areArraysEqual,
		r = e.areDatesEqual,
		n = e.areErrorsEqual,
		i = e.areFunctionsEqual,
		a = e.areMapsEqual,
		o = e.areNumbersEqual,
		u = e.areObjectsEqual,
		c = e.arePrimitiveWrappersEqual,
		s = e.areRegExpsEqual,
		f = e.areSetsEqual,
		l = e.areTypedArraysEqual,
		h = e.areUrlsEqual;
	return (y, v, d) => {
		if (y === v) return !0;
		if (y == null || v == null) return !1;
		var b = typeof y;
		if (b !== typeof v) return !1;
		if (b !== "object") return b === "number" ? o(y, v, d) : b === "function" ? i(y, v, d) : !1;
		var w = y.constructor;
		if (w !== v.constructor) return !1;
		if (w === Object) return u(y, v, d);
		if (GC(y)) return t(y, v, d);
		if (Rg != null && Rg(y)) return l(y, v, d);
		if (w === Date) return r(y, v, d);
		if (w === RegExp) return s(y, v, d);
		if (w === Map) return a(y, v, d);
		if (w === Set) return f(y, v, d);
		var x = HC(y);
		return x === kC
			? r(y, v, d)
			: x === FC
				? s(y, v, d)
				: x === qC
					? a(y, v, d)
					: x === UC
						? f(y, v, d)
						: x === BC
							? typeof y.then != "function" && typeof v.then != "function" && u(y, v, d)
							: x === WC
								? h(y, v, d)
								: x === DC
									? n(y, v, d)
									: x === RC
										? u(y, v, d)
										: x === NC || x === LC || x === zC
											? c(y, v, d)
											: !1;
	};
}
function VC(e) {
	var t = e.circular,
		r = e.createCustomConfig,
		n = e.strict,
		i = {
			areArraysEqual: n ? Xr : SC,
			areDatesEqual: AC,
			areErrorsEqual: PC,
			areFunctionsEqual: TC,
			areMapsEqual: n ? Eg(Ig, Xr) : Ig,
			areNumbersEqual: EC,
			areObjectsEqual: n ? Xr : jC,
			arePrimitiveWrappersEqual: MC,
			areRegExpsEqual: CC,
			areSetsEqual: n ? Eg($g, Xr) : $g,
			areTypedArraysEqual: n ? Xr : IC,
			areUrlsEqual: $C,
		};
	if ((r && (i = Ng({}, i, r(i))), t)) {
		var a = ui(i.areArraysEqual),
			o = ui(i.areMapsEqual),
			u = ui(i.areObjectsEqual),
			c = ui(i.areSetsEqual);
		i = Ng({}, i, { areArraysEqual: a, areMapsEqual: o, areObjectsEqual: u, areSetsEqual: c });
	}
	return i;
}
function XC(e) {
	return (t, r, n, i, a, o, u) => e(t, r, u);
}
function YC(e) {
	var t = e.circular,
		r = e.comparator,
		n = e.createState,
		i = e.equals,
		a = e.strict;
	if (n)
		return (c, s) => {
			var f = n(),
				l = f.cache,
				h = l === void 0 ? (t ? new WeakMap() : void 0) : l,
				p = f.meta;
			return r(c, s, { cache: h, equals: i, meta: p, strict: a });
		};
	if (t) return (c, s) => r(c, s, { cache: new WeakMap(), equals: i, meta: void 0, strict: a });
	var o = { cache: void 0, equals: i, meta: void 0, strict: a };
	return (c, s) => r(c, s, o);
}
var ZC = $t();
$t({ strict: !0 });
$t({ circular: !0 });
$t({ circular: !0, strict: !0 });
$t({
	createInternalComparator: () => Qt,
});
$t({
	strict: !0,
	createInternalComparator: () => Qt,
});
$t({
	circular: !0,
	createInternalComparator: () => Qt,
});
$t({
	circular: !0,
	createInternalComparator: () => Qt,
	strict: !0,
});
function $t(e) {
	e === void 0 && (e = {});
	var t = e.circular,
		r = t === void 0 ? !1 : t,
		n = e.createInternalComparator,
		i = e.createState,
		a = e.strict,
		o = a === void 0 ? !1 : a,
		u = VC(e),
		c = KC(u),
		s = n ? n(c) : XC(c);
	return YC({ circular: r, comparator: c, createState: i, equals: s, strict: o });
}
function JC(e) {
	typeof requestAnimationFrame < "u" && requestAnimationFrame(e);
}
function kg(e) {
	var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0,
		r = -1,
		n = function i(a) {
			r < 0 && (r = a), a - r > t ? (e(a), (r = -1)) : JC(i);
		};
	requestAnimationFrame(n);
}
function Tl(e) {
	"@babel/helpers - typeof";
	return (
		(Tl =
			typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
				? (t) => typeof t
				: (t) =>
						t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
							? "symbol"
							: typeof t),
		Tl(e)
	);
}
function QC(e) {
	return nI(e) || rI(e) || tI(e) || eI();
}
function eI() {
	throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function tI(e, t) {
	if (e) {
		if (typeof e == "string") return Dg(e, t);
		var r = Object.prototype.toString.call(e).slice(8, -1);
		if ((r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set")) return Array.from(e);
		if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Dg(e, t);
	}
}
function Dg(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
	return n;
}
function rI(e) {
	if ((typeof Symbol < "u" && e[Symbol.iterator] != null) || e["@@iterator"] != null) return Array.from(e);
}
function nI(e) {
	if (Array.isArray(e)) return e;
}
function iI() {
	var e = {},
		t = () => null,
		r = !1,
		n = function i(a) {
			if (!r) {
				if (Array.isArray(a)) {
					if (!a.length) return;
					var o = a,
						u = QC(o),
						c = u[0],
						s = u.slice(1);
					if (typeof c == "number") {
						kg(i.bind(null, s), c);
						return;
					}
					i(c), kg(i.bind(null, s));
					return;
				}
				Tl(a) === "object" && ((e = a), t(e)), typeof a == "function" && a();
			}
		};
	return {
		stop: () => {
			r = !0;
		},
		start: (a) => {
			(r = !1), n(a);
		},
		subscribe: (a) => (
			(t = a),
			() => {
				t = () => null;
			}
		),
	};
}
function Tn(e) {
	"@babel/helpers - typeof";
	return (
		(Tn =
			typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
				? (t) => typeof t
				: (t) =>
						t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
							? "symbol"
							: typeof t),
		Tn(e)
	);
}
function qg(e, t) {
	var r = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		t && (n = n.filter((i) => Object.getOwnPropertyDescriptor(e, i).enumerable)), r.push.apply(r, n);
	}
	return r;
}
function Lg(e) {
	for (var t = 1; t < arguments.length; t++) {
		var r = arguments[t] != null ? arguments[t] : {};
		t % 2
			? qg(Object(r), !0).forEach((n) => {
					Ix(e, n, r[n]);
				})
			: Object.getOwnPropertyDescriptors
				? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
				: qg(Object(r)).forEach((n) => {
						Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
					});
	}
	return e;
}
function Ix(e, t, r) {
	return (
		(t = aI(t)),
		t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = r),
		e
	);
}
function aI(e) {
	var t = oI(e, "string");
	return Tn(t) === "symbol" ? t : String(t);
}
function oI(e, t) {
	if (Tn(e) !== "object" || e === null) return e;
	var r = e[Symbol.toPrimitive];
	if (r !== void 0) {
		var n = r.call(e, t);
		if (Tn(n) !== "object") return n;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var uI = (t, r) => [Object.keys(t), Object.keys(r)].reduce((n, i) => n.filter((a) => i.includes(a))),
	cI = (t) => t,
	sI = (t) => t.replace(/([A-Z])/g, (r) => "-".concat(r.toLowerCase())),
	nn = (t, r) => Object.keys(r).reduce((n, i) => Lg(Lg({}, n), {}, Ix({}, i, t(i, r[i]))), {}),
	Bg = (t, r, n) => t.map((i) => "".concat(sI(i), " ").concat(r, "ms ").concat(n)).join(",");
function lI(e, t) {
	return dI(e) || hI(e, t) || $x(e, t) || fI();
}
function fI() {
	throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function hI(e, t) {
	var r = e == null ? null : (typeof Symbol < "u" && e[Symbol.iterator]) || e["@@iterator"];
	if (r != null) {
		var n,
			i,
			a,
			o,
			u = [],
			c = !0,
			s = !1;
		try {
			if (((a = (r = r.call(e)).next), t !== 0))
				for (; !(c = (n = a.call(r)).done) && (u.push(n.value), u.length !== t); c = !0);
		} catch (f) {
			(s = !0), (i = f);
		} finally {
			try {
				if (!c && r.return != null && ((o = r.return()), Object(o) !== o)) return;
			} finally {
				if (s) throw i;
			}
		}
		return u;
	}
}
function dI(e) {
	if (Array.isArray(e)) return e;
}
function pI(e) {
	return gI(e) || yI(e) || $x(e) || vI();
}
function vI() {
	throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function $x(e, t) {
	if (e) {
		if (typeof e == "string") return El(e, t);
		var r = Object.prototype.toString.call(e).slice(8, -1);
		if ((r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set")) return Array.from(e);
		if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return El(e, t);
	}
}
function yI(e) {
	if ((typeof Symbol < "u" && e[Symbol.iterator] != null) || e["@@iterator"] != null) return Array.from(e);
}
function gI(e) {
	if (Array.isArray(e)) return El(e);
}
function El(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
	return n;
}
var Li = 1e-4,
	Rx = (t, r) => [0, 3 * t, 3 * r - 6 * t, 3 * t - 3 * r + 1],
	Nx = (t, r) => t.map((n, i) => n * Math.pow(r, i)).reduce((n, i) => n + i),
	Fg = (t, r) => (n) => {
		var i = Rx(t, r);
		return Nx(i, n);
	},
	mI = (t, r) => (n) => {
		var i = Rx(t, r),
			a = [].concat(pI(i.map((o, u) => o * u).slice(1)), [0]);
		return Nx(a, n);
	},
	Ug = () => {
		for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++) r[n] = arguments[n];
		var i = r[0],
			a = r[1],
			o = r[2],
			u = r[3];
		if (r.length === 1)
			switch (r[0]) {
				case "linear":
					(i = 0), (a = 0), (o = 1), (u = 1);
					break;
				case "ease":
					(i = 0.25), (a = 0.1), (o = 0.25), (u = 1);
					break;
				case "ease-in":
					(i = 0.42), (a = 0), (o = 1), (u = 1);
					break;
				case "ease-out":
					(i = 0.42), (a = 0), (o = 0.58), (u = 1);
					break;
				case "ease-in-out":
					(i = 0), (a = 0), (o = 0.58), (u = 1);
					break;
				default: {
					var c = r[0].split("(");
					if (c[0] === "cubic-bezier" && c[1].split(")")[0].split(",").length === 4) {
						var s = c[1]
								.split(")")[0]
								.split(",")
								.map((d) => Number.parseFloat(d)),
							f = lI(s, 4);
						(i = f[0]), (a = f[1]), (o = f[2]), (u = f[3]);
					}
				}
			}
		var l = Fg(i, o),
			h = Fg(a, u),
			p = mI(i, o),
			y = (b) => (b > 1 ? 1 : b < 0 ? 0 : b),
			v = (b) => {
				for (var w = b > 1 ? 1 : b, x = w, O = 0; O < 8; ++O) {
					var g = l(x) - w,
						m = p(x);
					if (Math.abs(g - w) < Li || m < Li) return h(x);
					x = y(x - g / m);
				}
				return h(x);
			};
		return (v.isStepper = !1), v;
	},
	bI = () => {
		var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
			r = t.stiff,
			n = r === void 0 ? 100 : r,
			i = t.damping,
			a = i === void 0 ? 8 : i,
			o = t.dt,
			u = o === void 0 ? 17 : o,
			c = (f, l, h) => {
				var p = -(f - l) * n,
					y = h * a,
					v = h + ((p - y) * u) / 1e3,
					d = (h * u) / 1e3 + f;
				return Math.abs(d - l) < Li && Math.abs(v) < Li ? [l, 0] : [d, v];
			};
		return (c.isStepper = !0), (c.dt = u), c;
	},
	xI = () => {
		for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++) r[n] = arguments[n];
		var i = r[0];
		if (typeof i == "string")
			switch (i) {
				case "ease":
				case "ease-in-out":
				case "ease-out":
				case "ease-in":
				case "linear":
					return Ug(i);
				case "spring":
					return bI();
				default:
					if (i.split("(")[0] === "cubic-bezier") return Ug(i);
			}
		return typeof i == "function" ? i : null;
	};
function En(e) {
	"@babel/helpers - typeof";
	return (
		(En =
			typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
				? (t) => typeof t
				: (t) =>
						t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
							? "symbol"
							: typeof t),
		En(e)
	);
}
function zg(e) {
	return _I(e) || OI(e) || kx(e) || wI();
}
function wI() {
	throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function OI(e) {
	if ((typeof Symbol < "u" && e[Symbol.iterator] != null) || e["@@iterator"] != null) return Array.from(e);
}
function _I(e) {
	if (Array.isArray(e)) return Ml(e);
}
function Wg(e, t) {
	var r = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		t && (n = n.filter((i) => Object.getOwnPropertyDescriptor(e, i).enumerable)), r.push.apply(r, n);
	}
	return r;
}
function Ae(e) {
	for (var t = 1; t < arguments.length; t++) {
		var r = arguments[t] != null ? arguments[t] : {};
		t % 2
			? Wg(Object(r), !0).forEach((n) => {
					jl(e, n, r[n]);
				})
			: Object.getOwnPropertyDescriptors
				? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
				: Wg(Object(r)).forEach((n) => {
						Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
					});
	}
	return e;
}
function jl(e, t, r) {
	return (
		(t = SI(t)),
		t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = r),
		e
	);
}
function SI(e) {
	var t = AI(e, "string");
	return En(t) === "symbol" ? t : String(t);
}
function AI(e, t) {
	if (En(e) !== "object" || e === null) return e;
	var r = e[Symbol.toPrimitive];
	if (r !== void 0) {
		var n = r.call(e, t);
		if (En(n) !== "object") return n;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function PI(e, t) {
	return jI(e) || EI(e, t) || kx(e, t) || TI();
}
function TI() {
	throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function kx(e, t) {
	if (e) {
		if (typeof e == "string") return Ml(e, t);
		var r = Object.prototype.toString.call(e).slice(8, -1);
		if ((r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set")) return Array.from(e);
		if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Ml(e, t);
	}
}
function Ml(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
	return n;
}
function EI(e, t) {
	var r = e == null ? null : (typeof Symbol < "u" && e[Symbol.iterator]) || e["@@iterator"];
	if (r != null) {
		var n,
			i,
			a,
			o,
			u = [],
			c = !0,
			s = !1;
		try {
			if (((a = (r = r.call(e)).next), t !== 0))
				for (; !(c = (n = a.call(r)).done) && (u.push(n.value), u.length !== t); c = !0);
		} catch (f) {
			(s = !0), (i = f);
		} finally {
			try {
				if (!c && r.return != null && ((o = r.return()), Object(o) !== o)) return;
			} finally {
				if (s) throw i;
			}
		}
		return u;
	}
}
function jI(e) {
	if (Array.isArray(e)) return e;
}
var Bi = (t, r, n) => t + (r - t) * n,
	Cl = (t) => {
		var r = t.from,
			n = t.to;
		return r !== n;
	},
	MI = function e(t, r, n) {
		var i = nn((a, o) => {
			if (Cl(o)) {
				var u = t(o.from, o.to, o.velocity),
					c = PI(u, 2),
					s = c[0],
					f = c[1];
				return Ae(Ae({}, o), {}, { from: s, velocity: f });
			}
			return o;
		}, r);
		return n < 1
			? nn(
					(a, o) =>
						Cl(o)
							? Ae(Ae({}, o), {}, { velocity: Bi(o.velocity, i[a].velocity, n), from: Bi(o.from, i[a].from, n) })
							: o,
					r,
				)
			: e(t, i, n - 1);
	};
const CI = (e, t, r, n, i) => {
	var a = uI(e, t),
		o = a.reduce((d, b) => Ae(Ae({}, d), {}, jl({}, b, [e[b], t[b]])), {}),
		u = a.reduce((d, b) => Ae(Ae({}, d), {}, jl({}, b, { from: e[b], velocity: 0, to: t[b] })), {}),
		c = -1,
		s,
		f,
		l = () => null,
		h = () => nn((b, w) => w.from, u),
		p = () => !Object.values(u).filter(Cl).length,
		y = (b) => {
			s || (s = b);
			var w = b - s,
				x = w / r.dt;
			(u = MI(r, u, x)), i(Ae(Ae(Ae({}, e), t), h())), (s = b), p() || (c = requestAnimationFrame(l));
		},
		v = (b) => {
			f || (f = b);
			var w = (b - f) / n,
				x = nn((g, m) => Bi.apply(void 0, zg(m).concat([r(w)])), o);
			if ((i(Ae(Ae(Ae({}, e), t), x)), w < 1)) c = requestAnimationFrame(l);
			else {
				var O = nn((g, m) => Bi.apply(void 0, zg(m).concat([r(1)])), o);
				i(Ae(Ae(Ae({}, e), t), O));
			}
		};
	return (
		(l = r.isStepper ? y : v),
		() => (
			requestAnimationFrame(l),
			() => {
				cancelAnimationFrame(c);
			}
		)
	);
};
function wr(e) {
	"@babel/helpers - typeof";
	return (
		(wr =
			typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
				? (t) => typeof t
				: (t) =>
						t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
							? "symbol"
							: typeof t),
		wr(e)
	);
}
var II = [
	"children",
	"begin",
	"duration",
	"attributeName",
	"easing",
	"isActive",
	"steps",
	"from",
	"to",
	"canBegin",
	"onAnimationEnd",
	"shouldReAnimate",
	"onAnimationReStart",
];
function $I(e, t) {
	if (e == null) return {};
	var r = RI(e, t),
		n,
		i;
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (i = 0; i < a.length; i++)
			(n = a[i]), !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
	}
	return r;
}
function RI(e, t) {
	if (e == null) return {};
	var r = {},
		n = Object.keys(e),
		i,
		a;
	for (a = 0; a < n.length; a++) (i = n[a]), !(t.indexOf(i) >= 0) && (r[i] = e[i]);
	return r;
}
function ys(e) {
	return qI(e) || DI(e) || kI(e) || NI();
}
function NI() {
	throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function kI(e, t) {
	if (e) {
		if (typeof e == "string") return Il(e, t);
		var r = Object.prototype.toString.call(e).slice(8, -1);
		if ((r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set")) return Array.from(e);
		if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Il(e, t);
	}
}
function DI(e) {
	if ((typeof Symbol < "u" && e[Symbol.iterator] != null) || e["@@iterator"] != null) return Array.from(e);
}
function qI(e) {
	if (Array.isArray(e)) return Il(e);
}
function Il(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
	return n;
}
function Gg(e, t) {
	var r = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		t && (n = n.filter((i) => Object.getOwnPropertyDescriptor(e, i).enumerable)), r.push.apply(r, n);
	}
	return r;
}
function Ke(e) {
	for (var t = 1; t < arguments.length; t++) {
		var r = arguments[t] != null ? arguments[t] : {};
		t % 2
			? Gg(Object(r), !0).forEach((n) => {
					Qr(e, n, r[n]);
				})
			: Object.getOwnPropertyDescriptors
				? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
				: Gg(Object(r)).forEach((n) => {
						Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
					});
	}
	return e;
}
function Qr(e, t, r) {
	return (
		(t = Dx(t)),
		t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = r),
		e
	);
}
function LI(e, t) {
	if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function BI(e, t) {
	for (var r = 0; r < t.length; r++) {
		var n = t[r];
		(n.enumerable = n.enumerable || !1),
			(n.configurable = !0),
			"value" in n && (n.writable = !0),
			Object.defineProperty(e, Dx(n.key), n);
	}
}
function FI(e, t, r) {
	return t && BI(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function Dx(e) {
	var t = UI(e, "string");
	return wr(t) === "symbol" ? t : String(t);
}
function UI(e, t) {
	if (wr(e) !== "object" || e === null) return e;
	var r = e[Symbol.toPrimitive];
	if (r !== void 0) {
		var n = r.call(e, t);
		if (wr(n) !== "object") return n;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function zI(e, t) {
	if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
	(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } })),
		Object.defineProperty(e, "prototype", { writable: !1 }),
		t && $l(e, t);
}
function $l(e, t) {
	return ($l = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : (n, i) => ((n.__proto__ = i), n)), $l(e, t);
}
function WI(e) {
	var t = GI();
	return function () {
		var n = Fi(e),
			i;
		if (t) {
			var a = Fi(this).constructor;
			i = Reflect.construct(n, arguments, a);
		} else i = n.apply(this, arguments);
		return Rl(this, i);
	};
}
function Rl(e, t) {
	if (t && (wr(t) === "object" || typeof t == "function")) return t;
	if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
	return Nl(e);
}
function Nl(e) {
	if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	return e;
}
function GI() {
	if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham) return !1;
	if (typeof Proxy == "function") return !0;
	try {
		return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], () => {})), !0;
	} catch {
		return !1;
	}
}
function Fi(e) {
	return (
		(Fi = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : (r) => r.__proto__ || Object.getPrototypeOf(r)), Fi(e)
	);
}
var Et = ((e) => {
	zI(r, e);
	var t = WI(r);
	function r(n, i) {
		var a;
		LI(this, r), (a = t.call(this, n, i));
		var o = a.props,
			u = o.isActive,
			c = o.attributeName,
			s = o.from,
			f = o.to,
			l = o.steps,
			h = o.children,
			p = o.duration;
		if (
			((a.handleStyleChange = a.handleStyleChange.bind(Nl(a))),
			(a.changeStyle = a.changeStyle.bind(Nl(a))),
			!u || p <= 0)
		)
			return (a.state = { style: {} }), typeof h == "function" && (a.state = { style: f }), Rl(a);
		if (l && l.length) a.state = { style: l[0].style };
		else if (s) {
			if (typeof h == "function") return (a.state = { style: s }), Rl(a);
			a.state = { style: c ? Qr({}, c, s) : s };
		} else a.state = { style: {} };
		return a;
	}
	return (
		FI(r, [
			{
				key: "componentDidMount",
				value: function () {
					var i = this.props,
						a = i.isActive,
						o = i.canBegin;
					(this.mounted = !0), !(!a || !o) && this.runAnimation(this.props);
				},
			},
			{
				key: "componentDidUpdate",
				value: function (i) {
					var a = this.props,
						o = a.isActive,
						u = a.canBegin,
						c = a.attributeName,
						s = a.shouldReAnimate,
						f = a.to,
						l = a.from,
						h = this.state.style;
					if (u) {
						if (!o) {
							var p = { style: c ? Qr({}, c, f) : f };
							this.state && h && ((c && h[c] !== f) || (!c && h !== f)) && this.setState(p);
							return;
						}
						if (!(ZC(i.to, f) && i.canBegin && i.isActive)) {
							var y = !i.canBegin || !i.isActive;
							this.manager && this.manager.stop(), this.stopJSAnimation && this.stopJSAnimation();
							var v = y || s ? l : i.to;
							if (this.state && h) {
								var d = { style: c ? Qr({}, c, v) : v };
								((c && h[c] !== v) || (!c && h !== v)) && this.setState(d);
							}
							this.runAnimation(Ke(Ke({}, this.props), {}, { from: v, begin: 0 }));
						}
					}
				},
			},
			{
				key: "componentWillUnmount",
				value: function () {
					this.mounted = !1;
					var i = this.props.onAnimationEnd;
					this.unSubscribe && this.unSubscribe(),
						this.manager && (this.manager.stop(), (this.manager = null)),
						this.stopJSAnimation && this.stopJSAnimation(),
						i && i();
				},
			},
			{
				key: "handleStyleChange",
				value: function (i) {
					this.changeStyle(i);
				},
			},
			{
				key: "changeStyle",
				value: function (i) {
					this.mounted && this.setState({ style: i });
				},
			},
			{
				key: "runJSAnimation",
				value: function (i) {
					var o = i.from,
						u = i.to,
						c = i.duration,
						s = i.easing,
						f = i.begin,
						l = i.onAnimationEnd,
						h = i.onAnimationStart,
						p = CI(o, u, xI(s), c, this.changeStyle),
						y = () => {
							this.stopJSAnimation = p();
						};
					this.manager.start([h, f, y, c, l]);
				},
			},
			{
				key: "runStepAnimation",
				value: function (i) {
					var o = i.steps,
						u = i.begin,
						c = i.onAnimationStart,
						s = o[0],
						f = s.style,
						l = s.duration,
						h = l === void 0 ? 0 : l,
						p = (v, d, b) => {
							if (b === 0) return v;
							var w = d.duration,
								x = d.easing,
								O = x === void 0 ? "ease" : x,
								g = d.style,
								m = d.properties,
								_ = d.onAnimationEnd,
								S = b > 0 ? o[b - 1] : d,
								P = m || Object.keys(g);
							if (typeof O == "function" || O === "spring")
								return [].concat(ys(v), [
									this.runJSAnimation.bind(this, { from: S.style, to: g, duration: w, easing: O }),
									w,
								]);
							var M = Bg(P, w, O),
								A = Ke(Ke(Ke({}, S.style), g), {}, { transition: M });
							return [].concat(ys(v), [A, w, _]).filter(cI);
						};
					return this.manager.start([c].concat(ys(o.reduce(p, [f, Math.max(h, u)])), [i.onAnimationEnd]));
				},
			},
			{
				key: "runAnimation",
				value: function (i) {
					this.manager || (this.manager = iI());
					var a = i.begin,
						o = i.duration,
						u = i.attributeName,
						c = i.to,
						s = i.easing,
						f = i.onAnimationStart,
						l = i.onAnimationEnd,
						h = i.steps,
						p = i.children,
						y = this.manager;
					if (
						((this.unSubscribe = y.subscribe(this.handleStyleChange)),
						typeof s == "function" || typeof p == "function" || s === "spring")
					) {
						this.runJSAnimation(i);
						return;
					}
					if (h.length > 1) {
						this.runStepAnimation(i);
						return;
					}
					var v = u ? Qr({}, u, c) : c,
						d = Bg(Object.keys(v), o, s);
					y.start([f, a, Ke(Ke({}, v), {}, { transition: d }), o, l]);
				},
			},
			{
				key: "render",
				value: function () {
					var i = this.props,
						a = i.children;
					i.begin;
					var o = i.duration;
					i.attributeName, i.easing;
					var u = i.isActive;
					i.steps, i.from, i.to, i.canBegin, i.onAnimationEnd, i.shouldReAnimate, i.onAnimationReStart;
					var c = $I(i, II),
						s = k.Children.count(a),
						f = this.state.style;
					if (typeof a == "function") return a(f);
					if (!u || s === 0 || o <= 0) return a;
					var l = (p) => {
						var y = p.props,
							v = y.style,
							d = v === void 0 ? {} : v,
							b = y.className,
							w = k.cloneElement(p, Ke(Ke({}, c), {}, { style: Ke(Ke({}, d), f), className: b }));
						return w;
					};
					return s === 1
						? l(k.Children.only(a))
						: T.createElement(
								"div",
								null,
								k.Children.map(a, (h) => l(h)),
							);
				},
			},
		]),
		r
	);
})(k.PureComponent);
Et.displayName = "Animate";
Et.defaultProps = {
	begin: 0,
	duration: 1e3,
	from: "",
	to: "",
	attributeName: "",
	easing: "ease",
	isActive: !0,
	canBegin: !0,
	steps: [],
	onAnimationEnd: () => {},
	onAnimationStart: () => {},
};
Et.propTypes = {
	from: re.oneOfType([re.object, re.string]),
	to: re.oneOfType([re.object, re.string]),
	attributeName: re.string,
	duration: re.number,
	begin: re.number,
	easing: re.oneOfType([re.string, re.func]),
	steps: re.arrayOf(
		re.shape({
			duration: re.number.isRequired,
			style: re.object.isRequired,
			easing: re.oneOfType([re.oneOf(["ease", "ease-in", "ease-out", "ease-in-out", "linear"]), re.func]),
			properties: re.arrayOf("string"),
			onAnimationEnd: re.func,
		}),
	),
	children: re.oneOfType([re.node, re.func]),
	isActive: re.bool,
	canBegin: re.bool,
	onAnimationEnd: re.func,
	shouldReAnimate: re.bool,
	onAnimationStart: re.func,
	onAnimationReStart: re.func,
};
function jn(e) {
	"@babel/helpers - typeof";
	return (
		(jn =
			typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
				? (t) => typeof t
				: (t) =>
						t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
							? "symbol"
							: typeof t),
		jn(e)
	);
}
function Ui() {
	return (
		(Ui = Object.assign
			? Object.assign.bind()
			: (e) => {
					for (var t = 1; t < arguments.length; t++) {
						var r = arguments[t];
						for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
					}
					return e;
				}),
		Ui.apply(this, arguments)
	);
}
function HI(e, t) {
	return YI(e) || XI(e, t) || VI(e, t) || KI();
}
function KI() {
	throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function VI(e, t) {
	if (e) {
		if (typeof e == "string") return Hg(e, t);
		var r = Object.prototype.toString.call(e).slice(8, -1);
		if ((r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set")) return Array.from(e);
		if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Hg(e, t);
	}
}
function Hg(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
	return n;
}
function XI(e, t) {
	var r = e == null ? null : (typeof Symbol < "u" && e[Symbol.iterator]) || e["@@iterator"];
	if (r != null) {
		var n,
			i,
			a,
			o,
			u = [],
			c = !0,
			s = !1;
		try {
			if (((a = (r = r.call(e)).next), t !== 0))
				for (; !(c = (n = a.call(r)).done) && (u.push(n.value), u.length !== t); c = !0);
		} catch (f) {
			(s = !0), (i = f);
		} finally {
			try {
				if (!c && r.return != null && ((o = r.return()), Object(o) !== o)) return;
			} finally {
				if (s) throw i;
			}
		}
		return u;
	}
}
function YI(e) {
	if (Array.isArray(e)) return e;
}
function Kg(e, t) {
	var r = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		t && (n = n.filter((i) => Object.getOwnPropertyDescriptor(e, i).enumerable)), r.push.apply(r, n);
	}
	return r;
}
function Vg(e) {
	for (var t = 1; t < arguments.length; t++) {
		var r = arguments[t] != null ? arguments[t] : {};
		t % 2
			? Kg(Object(r), !0).forEach((n) => {
					ZI(e, n, r[n]);
				})
			: Object.getOwnPropertyDescriptors
				? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
				: Kg(Object(r)).forEach((n) => {
						Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
					});
	}
	return e;
}
function ZI(e, t, r) {
	return (
		(t = JI(t)),
		t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = r),
		e
	);
}
function JI(e) {
	var t = QI(e, "string");
	return jn(t) == "symbol" ? t : t + "";
}
function QI(e, t) {
	if (jn(e) != "object" || !e) return e;
	var r = e[Symbol.toPrimitive];
	if (r !== void 0) {
		var n = r.call(e, t);
		if (jn(n) != "object") return n;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var Xg = (t, r, n, i, a) => {
		var o = Math.min(Math.abs(n) / 2, Math.abs(i) / 2),
			u = i >= 0 ? 1 : -1,
			c = n >= 0 ? 1 : -1,
			s = (i >= 0 && n >= 0) || (i < 0 && n < 0) ? 1 : 0,
			f;
		if (o > 0 && a instanceof Array) {
			for (var l = [0, 0, 0, 0], h = 0, p = 4; h < p; h++) l[h] = a[h] > o ? o : a[h];
			(f = "M".concat(t, ",").concat(r + u * l[0])),
				l[0] > 0 &&
					(f += "A "
						.concat(l[0], ",")
						.concat(l[0], ",0,0,")
						.concat(s, ",")
						.concat(t + c * l[0], ",")
						.concat(r)),
				(f += "L ".concat(t + n - c * l[1], ",").concat(r)),
				l[1] > 0 &&
					(f += "A "
						.concat(l[1], ",")
						.concat(l[1], ",0,0,")
						.concat(
							s,
							`,
        `,
						)
						.concat(t + n, ",")
						.concat(r + u * l[1])),
				(f += "L ".concat(t + n, ",").concat(r + i - u * l[2])),
				l[2] > 0 &&
					(f += "A "
						.concat(l[2], ",")
						.concat(l[2], ",0,0,")
						.concat(
							s,
							`,
        `,
						)
						.concat(t + n - c * l[2], ",")
						.concat(r + i)),
				(f += "L ".concat(t + c * l[3], ",").concat(r + i)),
				l[3] > 0 &&
					(f += "A "
						.concat(l[3], ",")
						.concat(l[3], ",0,0,")
						.concat(
							s,
							`,
        `,
						)
						.concat(t, ",")
						.concat(r + i - u * l[3])),
				(f += "Z");
		} else if (o > 0 && a === +a && a > 0) {
			var y = Math.min(o, a);
			f = "M "
				.concat(t, ",")
				.concat(
					r + u * y,
					`
            A `,
				)
				.concat(y, ",")
				.concat(y, ",0,0,")
				.concat(s, ",")
				.concat(t + c * y, ",")
				.concat(
					r,
					`
            L `,
				)
				.concat(t + n - c * y, ",")
				.concat(
					r,
					`
            A `,
				)
				.concat(y, ",")
				.concat(y, ",0,0,")
				.concat(s, ",")
				.concat(t + n, ",")
				.concat(
					r + u * y,
					`
            L `,
				)
				.concat(t + n, ",")
				.concat(
					r + i - u * y,
					`
            A `,
				)
				.concat(y, ",")
				.concat(y, ",0,0,")
				.concat(s, ",")
				.concat(t + n - c * y, ",")
				.concat(
					r + i,
					`
            L `,
				)
				.concat(t + c * y, ",")
				.concat(
					r + i,
					`
            A `,
				)
				.concat(y, ",")
				.concat(y, ",0,0,")
				.concat(s, ",")
				.concat(t, ",")
				.concat(r + i - u * y, " Z");
		} else f = "M ".concat(t, ",").concat(r, " h ").concat(n, " v ").concat(i, " h ").concat(-n, " Z");
		return f;
	},
	e$ = (t, r) => {
		if (!t || !r) return !1;
		var n = t.x,
			i = t.y,
			a = r.x,
			o = r.y,
			u = r.width,
			c = r.height;
		if (Math.abs(u) > 0 && Math.abs(c) > 0) {
			var s = Math.min(a, a + u),
				f = Math.max(a, a + u),
				l = Math.min(o, o + c),
				h = Math.max(o, o + c);
			return n >= s && n <= f && i >= l && i <= h;
		}
		return !1;
	},
	t$ = {
		x: 0,
		y: 0,
		width: 0,
		height: 0,
		radius: 0,
		isAnimationActive: !1,
		isUpdateAnimationActive: !1,
		animationBegin: 0,
		animationDuration: 1500,
		animationEasing: "ease",
	},
	eh = (t) => {
		var r = Vg(Vg({}, t$), t),
			n = k.useRef(),
			i = k.useState(-1),
			a = HI(i, 2),
			o = a[0],
			u = a[1];
		k.useEffect(() => {
			if (n.current && n.current.getTotalLength)
				try {
					var O = n.current.getTotalLength();
					O && u(O);
				} catch {}
		}, []);
		var c = r.x,
			s = r.y,
			f = r.width,
			l = r.height,
			h = r.radius,
			p = r.className,
			y = r.animationEasing,
			v = r.animationDuration,
			d = r.animationBegin,
			b = r.isAnimationActive,
			w = r.isUpdateAnimationActive;
		if (c !== +c || s !== +s || f !== +f || l !== +l || f === 0 || l === 0) return null;
		var x = ie("recharts-rectangle", p);
		return w
			? T.createElement(
					Et,
					{
						canBegin: o > 0,
						from: { width: f, height: l, x: c, y: s },
						to: { width: f, height: l, x: c, y: s },
						duration: v,
						animationEasing: y,
						isActive: w,
					},
					(O) => {
						var g = O.width,
							m = O.height,
							_ = O.x,
							S = O.y;
						return T.createElement(
							Et,
							{
								canBegin: o > 0,
								from: "0px ".concat(o === -1 ? 1 : o, "px"),
								to: "".concat(o, "px 0px"),
								attributeName: "strokeDasharray",
								begin: d,
								duration: v,
								isActive: b,
								easing: y,
							},
							T.createElement("path", Ui({}, ee(r, !0), { className: x, d: Xg(_, S, g, m, h), ref: n })),
						);
					},
				)
			: T.createElement("path", Ui({}, ee(r, !0), { className: x, d: Xg(c, s, f, l, h) }));
	};
function kl() {
	return (
		(kl = Object.assign
			? Object.assign.bind()
			: (e) => {
					for (var t = 1; t < arguments.length; t++) {
						var r = arguments[t];
						for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
					}
					return e;
				}),
		kl.apply(this, arguments)
	);
}
var qx = (t) => {
	var r = t.cx,
		n = t.cy,
		i = t.r,
		a = t.className,
		o = ie("recharts-dot", a);
	return r === +r && n === +n && i === +i
		? T.createElement("circle", kl({}, ee(t, !1), li(t), { className: o, cx: r, cy: n, r: i }))
		: null;
};
function Mn(e) {
	"@babel/helpers - typeof";
	return (
		(Mn =
			typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
				? (t) => typeof t
				: (t) =>
						t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
							? "symbol"
							: typeof t),
		Mn(e)
	);
}
var r$ = ["x", "y", "top", "left", "width", "height", "className"];
function Dl() {
	return (
		(Dl = Object.assign
			? Object.assign.bind()
			: (e) => {
					for (var t = 1; t < arguments.length; t++) {
						var r = arguments[t];
						for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
					}
					return e;
				}),
		Dl.apply(this, arguments)
	);
}
function Yg(e, t) {
	var r = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		t && (n = n.filter((i) => Object.getOwnPropertyDescriptor(e, i).enumerable)), r.push.apply(r, n);
	}
	return r;
}
function n$(e) {
	for (var t = 1; t < arguments.length; t++) {
		var r = arguments[t] != null ? arguments[t] : {};
		t % 2
			? Yg(Object(r), !0).forEach((n) => {
					i$(e, n, r[n]);
				})
			: Object.getOwnPropertyDescriptors
				? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
				: Yg(Object(r)).forEach((n) => {
						Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
					});
	}
	return e;
}
function i$(e, t, r) {
	return (
		(t = a$(t)),
		t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = r),
		e
	);
}
function a$(e) {
	var t = o$(e, "string");
	return Mn(t) == "symbol" ? t : t + "";
}
function o$(e, t) {
	if (Mn(e) != "object" || !e) return e;
	var r = e[Symbol.toPrimitive];
	if (r !== void 0) {
		var n = r.call(e, t);
		if (Mn(n) != "object") return n;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function u$(e, t) {
	if (e == null) return {};
	var r = c$(e, t),
		n,
		i;
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (i = 0; i < a.length; i++)
			(n = a[i]), !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
	}
	return r;
}
function c$(e, t) {
	if (e == null) return {};
	var r = {};
	for (var n in e)
		if (Object.prototype.hasOwnProperty.call(e, n)) {
			if (t.indexOf(n) >= 0) continue;
			r[n] = e[n];
		}
	return r;
}
var s$ = (t, r, n, i, a, o) => "M".concat(t, ",").concat(a, "v").concat(i, "M").concat(o, ",").concat(r, "h").concat(n),
	l$ = (t) => {
		var r = t.x,
			n = r === void 0 ? 0 : r,
			i = t.y,
			a = i === void 0 ? 0 : i,
			o = t.top,
			u = o === void 0 ? 0 : o,
			c = t.left,
			s = c === void 0 ? 0 : c,
			f = t.width,
			l = f === void 0 ? 0 : f,
			h = t.height,
			p = h === void 0 ? 0 : h,
			y = t.className,
			v = u$(t, r$),
			d = n$({ x: n, y: a, top: u, left: s, width: l, height: p }, v);
		return !B(n) || !B(a) || !B(l) || !B(p) || !B(u) || !B(s)
			? null
			: T.createElement("path", Dl({}, ee(d, !0), { className: ie("recharts-cross", y), d: s$(n, a, l, p, u, s) }));
	},
	gs,
	Zg;
function f$() {
	if (Zg) return gs;
	Zg = 1;
	var e = n0(),
		t = e(Object.getPrototypeOf, Object);
	return (gs = t), gs;
}
var ms, Jg;
function h$() {
	if (Jg) return ms;
	Jg = 1;
	var e = bt(),
		t = f$(),
		r = xt(),
		n = "[object Object]",
		i = Function.prototype,
		a = Object.prototype,
		o = i.toString,
		u = a.hasOwnProperty,
		c = o.call(Object);
	function s(f) {
		if (!r(f) || e(f) != n) return !1;
		var l = t(f);
		if (l === null) return !0;
		var h = u.call(l, "constructor") && l.constructor;
		return typeof h == "function" && h instanceof h && o.call(h) == c;
	}
	return (ms = s), ms;
}
var d$ = h$();
const p$ = ce(d$);
var bs, Qg;
function v$() {
	if (Qg) return bs;
	Qg = 1;
	var e = bt(),
		t = xt(),
		r = "[object Boolean]";
	function n(i) {
		return i === !0 || i === !1 || (t(i) && e(i) == r);
	}
	return (bs = n), bs;
}
var y$ = v$();
const g$ = ce(y$);
function Cn(e) {
	"@babel/helpers - typeof";
	return (
		(Cn =
			typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
				? (t) => typeof t
				: (t) =>
						t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
							? "symbol"
							: typeof t),
		Cn(e)
	);
}
function zi() {
	return (
		(zi = Object.assign
			? Object.assign.bind()
			: (e) => {
					for (var t = 1; t < arguments.length; t++) {
						var r = arguments[t];
						for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
					}
					return e;
				}),
		zi.apply(this, arguments)
	);
}
function m$(e, t) {
	return O$(e) || w$(e, t) || x$(e, t) || b$();
}
function b$() {
	throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function x$(e, t) {
	if (e) {
		if (typeof e == "string") return em(e, t);
		var r = Object.prototype.toString.call(e).slice(8, -1);
		if ((r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set")) return Array.from(e);
		if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return em(e, t);
	}
}
function em(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
	return n;
}
function w$(e, t) {
	var r = e == null ? null : (typeof Symbol < "u" && e[Symbol.iterator]) || e["@@iterator"];
	if (r != null) {
		var n,
			i,
			a,
			o,
			u = [],
			c = !0,
			s = !1;
		try {
			if (((a = (r = r.call(e)).next), t !== 0))
				for (; !(c = (n = a.call(r)).done) && (u.push(n.value), u.length !== t); c = !0);
		} catch (f) {
			(s = !0), (i = f);
		} finally {
			try {
				if (!c && r.return != null && ((o = r.return()), Object(o) !== o)) return;
			} finally {
				if (s) throw i;
			}
		}
		return u;
	}
}
function O$(e) {
	if (Array.isArray(e)) return e;
}
function tm(e, t) {
	var r = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		t && (n = n.filter((i) => Object.getOwnPropertyDescriptor(e, i).enumerable)), r.push.apply(r, n);
	}
	return r;
}
function rm(e) {
	for (var t = 1; t < arguments.length; t++) {
		var r = arguments[t] != null ? arguments[t] : {};
		t % 2
			? tm(Object(r), !0).forEach((n) => {
					_$(e, n, r[n]);
				})
			: Object.getOwnPropertyDescriptors
				? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
				: tm(Object(r)).forEach((n) => {
						Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
					});
	}
	return e;
}
function _$(e, t, r) {
	return (
		(t = S$(t)),
		t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = r),
		e
	);
}
function S$(e) {
	var t = A$(e, "string");
	return Cn(t) == "symbol" ? t : t + "";
}
function A$(e, t) {
	if (Cn(e) != "object" || !e) return e;
	var r = e[Symbol.toPrimitive];
	if (r !== void 0) {
		var n = r.call(e, t);
		if (Cn(n) != "object") return n;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var nm = (t, r, n, i, a) => {
		var o = n - i,
			u;
		return (
			(u = "M ".concat(t, ",").concat(r)),
			(u += "L ".concat(t + n, ",").concat(r)),
			(u += "L ".concat(t + n - o / 2, ",").concat(r + a)),
			(u += "L ".concat(t + n - o / 2 - i, ",").concat(r + a)),
			(u += "L ".concat(t, ",").concat(r, " Z")),
			u
		);
	},
	P$ = {
		x: 0,
		y: 0,
		upperWidth: 0,
		lowerWidth: 0,
		height: 0,
		isUpdateAnimationActive: !1,
		animationBegin: 0,
		animationDuration: 1500,
		animationEasing: "ease",
	},
	T$ = (t) => {
		var r = rm(rm({}, P$), t),
			n = k.useRef(),
			i = k.useState(-1),
			a = m$(i, 2),
			o = a[0],
			u = a[1];
		k.useEffect(() => {
			if (n.current && n.current.getTotalLength)
				try {
					var x = n.current.getTotalLength();
					x && u(x);
				} catch {}
		}, []);
		var c = r.x,
			s = r.y,
			f = r.upperWidth,
			l = r.lowerWidth,
			h = r.height,
			p = r.className,
			y = r.animationEasing,
			v = r.animationDuration,
			d = r.animationBegin,
			b = r.isUpdateAnimationActive;
		if (c !== +c || s !== +s || f !== +f || l !== +l || h !== +h || (f === 0 && l === 0) || h === 0) return null;
		var w = ie("recharts-trapezoid", p);
		return b
			? T.createElement(
					Et,
					{
						canBegin: o > 0,
						from: { upperWidth: 0, lowerWidth: 0, height: h, x: c, y: s },
						to: { upperWidth: f, lowerWidth: l, height: h, x: c, y: s },
						duration: v,
						animationEasing: y,
						isActive: b,
					},
					(x) => {
						var O = x.upperWidth,
							g = x.lowerWidth,
							m = x.height,
							_ = x.x,
							S = x.y;
						return T.createElement(
							Et,
							{
								canBegin: o > 0,
								from: "0px ".concat(o === -1 ? 1 : o, "px"),
								to: "".concat(o, "px 0px"),
								attributeName: "strokeDasharray",
								begin: d,
								duration: v,
								easing: y,
							},
							T.createElement("path", zi({}, ee(r, !0), { className: w, d: nm(_, S, O, g, m), ref: n })),
						);
					},
				)
			: T.createElement("g", null, T.createElement("path", zi({}, ee(r, !0), { className: w, d: nm(c, s, f, l, h) })));
	},
	E$ = ["option", "shapeType", "propTransformer", "activeClassName", "isActive"];
function In(e) {
	"@babel/helpers - typeof";
	return (
		(In =
			typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
				? (t) => typeof t
				: (t) =>
						t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
							? "symbol"
							: typeof t),
		In(e)
	);
}
function j$(e, t) {
	if (e == null) return {};
	var r = M$(e, t),
		n,
		i;
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (i = 0; i < a.length; i++)
			(n = a[i]), !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
	}
	return r;
}
function M$(e, t) {
	if (e == null) return {};
	var r = {};
	for (var n in e)
		if (Object.prototype.hasOwnProperty.call(e, n)) {
			if (t.indexOf(n) >= 0) continue;
			r[n] = e[n];
		}
	return r;
}
function im(e, t) {
	var r = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		t && (n = n.filter((i) => Object.getOwnPropertyDescriptor(e, i).enumerable)), r.push.apply(r, n);
	}
	return r;
}
function Wi(e) {
	for (var t = 1; t < arguments.length; t++) {
		var r = arguments[t] != null ? arguments[t] : {};
		t % 2
			? im(Object(r), !0).forEach((n) => {
					C$(e, n, r[n]);
				})
			: Object.getOwnPropertyDescriptors
				? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
				: im(Object(r)).forEach((n) => {
						Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
					});
	}
	return e;
}
function C$(e, t, r) {
	return (
		(t = I$(t)),
		t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = r),
		e
	);
}
function I$(e) {
	var t = $$(e, "string");
	return In(t) == "symbol" ? t : t + "";
}
function $$(e, t) {
	if (In(e) != "object" || !e) return e;
	var r = e[Symbol.toPrimitive];
	if (r !== void 0) {
		var n = r.call(e, t);
		if (In(n) != "object") return n;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function R$(e, t) {
	return Wi(Wi({}, t), e);
}
function N$(e, t) {
	return e === "symbols";
}
function am(e) {
	var t = e.shapeType,
		r = e.elementProps;
	switch (t) {
		case "rectangle":
			return T.createElement(eh, r);
		case "trapezoid":
			return T.createElement(T$, r);
		case "sector":
			return T.createElement(Mx, r);
		case "symbols":
			if (N$(t)) return T.createElement(mf, r);
			break;
		default:
			return null;
	}
}
function k$(e) {
	return k.isValidElement(e) ? e.props : e;
}
function D$(e) {
	var t = e.option,
		r = e.shapeType,
		n = e.propTransformer,
		i = n === void 0 ? R$ : n,
		a = e.activeClassName,
		o = a === void 0 ? "recharts-active-shape" : a,
		u = e.isActive,
		c = j$(e, E$),
		s;
	if (k.isValidElement(t)) s = k.cloneElement(t, Wi(Wi({}, c), k$(t)));
	else if (Z(t)) s = t(c);
	else if (p$(t) && !g$(t)) {
		var f = i(t, c);
		s = T.createElement(am, { shapeType: r, elementProps: f });
	} else {
		var l = c;
		s = T.createElement(am, { shapeType: r, elementProps: l });
	}
	return u ? T.createElement(_e, { className: o }, s) : s;
}
function ja(e, t) {
	return t != null && "trapezoids" in e.props;
}
function Ma(e, t) {
	return t != null && "sectors" in e.props;
}
function $n(e, t) {
	return t != null && "points" in e.props;
}
function q$(e, t) {
	var r,
		n,
		i = e.x === (t == null || (r = t.labelViewBox) === null || r === void 0 ? void 0 : r.x) || e.x === t.x,
		a = e.y === (t == null || (n = t.labelViewBox) === null || n === void 0 ? void 0 : n.y) || e.y === t.y;
	return i && a;
}
function L$(e, t) {
	var r = e.endAngle === t.endAngle,
		n = e.startAngle === t.startAngle;
	return r && n;
}
function B$(e, t) {
	var r = e.x === t.x,
		n = e.y === t.y,
		i = e.z === t.z;
	return r && n && i;
}
function F$(e, t) {
	var r;
	return ja(e, t) ? (r = q$) : Ma(e, t) ? (r = L$) : $n(e, t) && (r = B$), r;
}
function U$(e, t) {
	var r;
	return ja(e, t) ? (r = "trapezoids") : Ma(e, t) ? (r = "sectors") : $n(e, t) && (r = "points"), r;
}
function z$(e, t) {
	if (ja(e, t)) {
		var r;
		return (r = t.tooltipPayload) === null ||
			r === void 0 ||
			(r = r[0]) === null ||
			r === void 0 ||
			(r = r.payload) === null ||
			r === void 0
			? void 0
			: r.payload;
	}
	if (Ma(e, t)) {
		var n;
		return (n = t.tooltipPayload) === null ||
			n === void 0 ||
			(n = n[0]) === null ||
			n === void 0 ||
			(n = n.payload) === null ||
			n === void 0
			? void 0
			: n.payload;
	}
	return $n(e, t) ? t.payload : {};
}
function W$(e) {
	var t = e.activeTooltipItem,
		r = e.graphicalItem,
		n = e.itemData,
		i = U$(r, t),
		a = z$(r, t),
		o = n.filter((c, s) => {
			var f = Yf(a, c),
				l = r.props[i].filter((y) => {
					var v = F$(r, t);
					return v(y, t);
				}),
				h = r.props[i].indexOf(l[l.length - 1]),
				p = s === h;
			return f && p;
		}),
		u = n.indexOf(o[o.length - 1]);
	return u;
}
var xs, om;
function G$() {
	if (om) return xs;
	om = 1;
	var e = Math.ceil,
		t = Math.max;
	function r(n, i, a, o) {
		for (var u = -1, c = t(e((i - n) / (a || 1)), 0), s = Array(c); c--; ) (s[o ? c : ++u] = n), (n += a);
		return s;
	}
	return (xs = r), xs;
}
var ws, um;
function Lx() {
	if (um) return ws;
	um = 1;
	var e = b0(),
		t = 1 / 0,
		r = 17976931348623157e292;
	function n(i) {
		if (!i) return i === 0 ? i : 0;
		if (((i = e(i)), i === t || i === -1 / 0)) {
			var a = i < 0 ? -1 : 1;
			return a * r;
		}
		return i === i ? i : 0;
	}
	return (ws = n), ws;
}
var Os, cm;
function H$() {
	if (cm) return Os;
	cm = 1;
	var e = G$(),
		t = ga(),
		r = Lx();
	function n(i) {
		return (a, o, u) => (
			u && typeof u != "number" && t(a, o, u) && (o = u = void 0),
			(a = r(a)),
			o === void 0 ? ((o = a), (a = 0)) : (o = r(o)),
			(u = u === void 0 ? (a < o ? 1 : -1) : r(u)),
			e(a, o, u, i)
		);
	}
	return (Os = n), Os;
}
var _s, sm;
function K$() {
	if (sm) return _s;
	sm = 1;
	var e = H$(),
		t = e();
	return (_s = t), _s;
}
var V$ = K$();
const Gi = ce(V$);
function Rn(e) {
	"@babel/helpers - typeof";
	return (
		(Rn =
			typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
				? (t) => typeof t
				: (t) =>
						t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
							? "symbol"
							: typeof t),
		Rn(e)
	);
}
function lm(e, t) {
	var r = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		t && (n = n.filter((i) => Object.getOwnPropertyDescriptor(e, i).enumerable)), r.push.apply(r, n);
	}
	return r;
}
function fm(e) {
	for (var t = 1; t < arguments.length; t++) {
		var r = arguments[t] != null ? arguments[t] : {};
		t % 2
			? lm(Object(r), !0).forEach((n) => {
					Bx(e, n, r[n]);
				})
			: Object.getOwnPropertyDescriptors
				? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
				: lm(Object(r)).forEach((n) => {
						Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
					});
	}
	return e;
}
function Bx(e, t, r) {
	return (
		(t = X$(t)),
		t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = r),
		e
	);
}
function X$(e) {
	var t = Y$(e, "string");
	return Rn(t) == "symbol" ? t : t + "";
}
function Y$(e, t) {
	if (Rn(e) != "object" || !e) return e;
	var r = e[Symbol.toPrimitive];
	if (r !== void 0) {
		var n = r.call(e, t);
		if (Rn(n) != "object") return n;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var Z$ = ["Webkit", "Moz", "O", "ms"],
	J$ = (t, r) => {
		var n = t.replace(/(\w)/, (a) => a.toUpperCase()),
			i = Z$.reduce((a, o) => fm(fm({}, a), {}, Bx({}, o + n, r)), {});
		return (i[t] = r), i;
	};
function Or(e) {
	"@babel/helpers - typeof";
	return (
		(Or =
			typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
				? (t) => typeof t
				: (t) =>
						t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
							? "symbol"
							: typeof t),
		Or(e)
	);
}
function Hi() {
	return (
		(Hi = Object.assign
			? Object.assign.bind()
			: (e) => {
					for (var t = 1; t < arguments.length; t++) {
						var r = arguments[t];
						for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
					}
					return e;
				}),
		Hi.apply(this, arguments)
	);
}
function hm(e, t) {
	var r = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		t && (n = n.filter((i) => Object.getOwnPropertyDescriptor(e, i).enumerable)), r.push.apply(r, n);
	}
	return r;
}
function Ss(e) {
	for (var t = 1; t < arguments.length; t++) {
		var r = arguments[t] != null ? arguments[t] : {};
		t % 2
			? hm(Object(r), !0).forEach((n) => {
					De(e, n, r[n]);
				})
			: Object.getOwnPropertyDescriptors
				? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
				: hm(Object(r)).forEach((n) => {
						Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
					});
	}
	return e;
}
function Q$(e, t) {
	if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function dm(e, t) {
	for (var r = 0; r < t.length; r++) {
		var n = t[r];
		(n.enumerable = n.enumerable || !1),
			(n.configurable = !0),
			"value" in n && (n.writable = !0),
			Object.defineProperty(e, Ux(n.key), n);
	}
}
function eR(e, t, r) {
	return t && dm(e.prototype, t), r && dm(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function tR(e, t, r) {
	return (t = Ki(t)), rR(e, Fx() ? Reflect.construct(t, r || [], Ki(e).constructor) : t.apply(e, r));
}
function rR(e, t) {
	if (t && (Or(t) === "object" || typeof t == "function")) return t;
	if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
	return nR(e);
}
function nR(e) {
	if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	return e;
}
function Fx() {
	try {
		var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], () => {}));
	} catch {}
	return (Fx = () => !!e)();
}
function Ki(e) {
	return (
		(Ki = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : (r) => r.__proto__ || Object.getPrototypeOf(r)), Ki(e)
	);
}
function iR(e, t) {
	if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
	(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } })),
		Object.defineProperty(e, "prototype", { writable: !1 }),
		t && ql(e, t);
}
function ql(e, t) {
	return (ql = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : (n, i) => ((n.__proto__ = i), n)), ql(e, t);
}
function De(e, t, r) {
	return (
		(t = Ux(t)),
		t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = r),
		e
	);
}
function Ux(e) {
	var t = aR(e, "string");
	return Or(t) == "symbol" ? t : t + "";
}
function aR(e, t) {
	if (Or(e) != "object" || !e) return e;
	var r = e[Symbol.toPrimitive];
	if (r !== void 0) {
		var n = r.call(e, t);
		if (Or(n) != "object") return n;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return String(e);
}
var oR = (t) => {
		var r = t.data,
			n = t.startIndex,
			i = t.endIndex,
			a = t.x,
			o = t.width,
			u = t.travellerWidth;
		if (!r || !r.length) return {};
		var c = r.length,
			s = tn()
				.domain(Gi(0, c))
				.range([a, a + o - u]),
			f = s.domain().map((l) => s(l));
		return {
			isTextActive: !1,
			isSlideMoving: !1,
			isTravellerMoving: !1,
			isTravellerFocused: !1,
			startX: s(n),
			endX: s(i),
			scale: s,
			scaleValues: f,
		};
	},
	pm = (t) => t.changedTouches && !!t.changedTouches.length,
	_r = ((e) => {
		function t(r) {
			var n;
			return (
				Q$(this, t),
				(n = tR(this, t, [r])),
				De(n, "handleDrag", (i) => {
					n.leaveTimer && (clearTimeout(n.leaveTimer), (n.leaveTimer = null)),
						n.state.isTravellerMoving ? n.handleTravellerMove(i) : n.state.isSlideMoving && n.handleSlideDrag(i);
				}),
				De(n, "handleTouchMove", (i) => {
					i.changedTouches != null && i.changedTouches.length > 0 && n.handleDrag(i.changedTouches[0]);
				}),
				De(n, "handleDragEnd", () => {
					n.setState({ isTravellerMoving: !1, isSlideMoving: !1 }, () => {
						var i = n.props,
							a = i.endIndex,
							o = i.onDragEnd,
							u = i.startIndex;
						o?.({ endIndex: a, startIndex: u });
					}),
						n.detachDragEndListener();
				}),
				De(n, "handleLeaveWrapper", () => {
					(n.state.isTravellerMoving || n.state.isSlideMoving) &&
						(n.leaveTimer = window.setTimeout(n.handleDragEnd, n.props.leaveTimeOut));
				}),
				De(n, "handleEnterSlideOrTraveller", () => {
					n.setState({ isTextActive: !0 });
				}),
				De(n, "handleLeaveSlideOrTraveller", () => {
					n.setState({ isTextActive: !1 });
				}),
				De(n, "handleSlideDragStart", (i) => {
					var a = pm(i) ? i.changedTouches[0] : i;
					n.setState({ isTravellerMoving: !1, isSlideMoving: !0, slideMoveStartX: a.pageX }), n.attachDragEndListener();
				}),
				(n.travellerDragStartHandlers = {
					startX: n.handleTravellerDragStart.bind(n, "startX"),
					endX: n.handleTravellerDragStart.bind(n, "endX"),
				}),
				(n.state = {}),
				n
			);
		}
		return (
			iR(t, e),
			eR(
				t,
				[
					{
						key: "componentWillUnmount",
						value: function () {
							this.leaveTimer && (clearTimeout(this.leaveTimer), (this.leaveTimer = null)),
								this.detachDragEndListener();
						},
					},
					{
						key: "getIndex",
						value: function (n) {
							var i = n.startX,
								a = n.endX,
								o = this.state.scaleValues,
								u = this.props,
								c = u.gap,
								s = u.data,
								f = s.length - 1,
								l = Math.min(i, a),
								h = Math.max(i, a),
								p = t.getIndexInRange(o, l),
								y = t.getIndexInRange(o, h);
							return { startIndex: p - (p % c), endIndex: y === f ? f : y - (y % c) };
						},
					},
					{
						key: "getTextOfTick",
						value: function (n) {
							var i = this.props,
								a = i.data,
								o = i.tickFormatter,
								u = i.dataKey,
								c = ot(a[n], u, n);
							return Z(o) ? o(c, n) : c;
						},
					},
					{
						key: "attachDragEndListener",
						value: function () {
							window.addEventListener("mouseup", this.handleDragEnd, !0),
								window.addEventListener("touchend", this.handleDragEnd, !0),
								window.addEventListener("mousemove", this.handleDrag, !0);
						},
					},
					{
						key: "detachDragEndListener",
						value: function () {
							window.removeEventListener("mouseup", this.handleDragEnd, !0),
								window.removeEventListener("touchend", this.handleDragEnd, !0),
								window.removeEventListener("mousemove", this.handleDrag, !0);
						},
					},
					{
						key: "handleSlideDrag",
						value: function (n) {
							var i = this.state,
								a = i.slideMoveStartX,
								o = i.startX,
								u = i.endX,
								c = this.props,
								s = c.x,
								f = c.width,
								l = c.travellerWidth,
								h = c.startIndex,
								p = c.endIndex,
								y = c.onChange,
								v = n.pageX - a;
							v > 0 ? (v = Math.min(v, s + f - l - u, s + f - l - o)) : v < 0 && (v = Math.max(v, s - o, s - u));
							var d = this.getIndex({ startX: o + v, endX: u + v });
							(d.startIndex !== h || d.endIndex !== p) && y && y(d),
								this.setState({ startX: o + v, endX: u + v, slideMoveStartX: n.pageX });
						},
					},
					{
						key: "handleTravellerDragStart",
						value: function (n, i) {
							var a = pm(i) ? i.changedTouches[0] : i;
							this.setState({
								isSlideMoving: !1,
								isTravellerMoving: !0,
								movingTravellerId: n,
								brushMoveStartX: a.pageX,
							}),
								this.attachDragEndListener();
						},
					},
					{
						key: "handleTravellerMove",
						value: function (n) {
							var i = this.state,
								a = i.brushMoveStartX,
								o = i.movingTravellerId,
								u = i.endX,
								c = i.startX,
								s = this.state[o],
								f = this.props,
								l = f.x,
								h = f.width,
								p = f.travellerWidth,
								y = f.onChange,
								v = f.gap,
								d = f.data,
								b = { startX: this.state.startX, endX: this.state.endX },
								w = n.pageX - a;
							w > 0 ? (w = Math.min(w, l + h - p - s)) : w < 0 && (w = Math.max(w, l - s)), (b[o] = s + w);
							var x = this.getIndex(b),
								O = x.startIndex,
								g = x.endIndex,
								m = () => {
									var S = d.length - 1;
									return (
										(o === "startX" && (u > c ? O % v === 0 : g % v === 0)) ||
										(u < c && g === S) ||
										(o === "endX" && (u > c ? g % v === 0 : O % v === 0)) ||
										(u > c && g === S)
									);
								};
							this.setState(De(De({}, o, s + w), "brushMoveStartX", n.pageX), () => {
								y && m() && y(x);
							});
						},
					},
					{
						key: "handleTravellerMoveKeyboard",
						value: function (n, i) {
							var o = this.state,
								u = o.scaleValues,
								c = o.startX,
								s = o.endX,
								f = this.state[i],
								l = u.indexOf(f);
							if (l !== -1) {
								var h = l + n;
								if (!(h === -1 || h >= u.length)) {
									var p = u[h];
									(i === "startX" && p >= s) ||
										(i === "endX" && p <= c) ||
										this.setState(De({}, i, p), () => {
											this.props.onChange(this.getIndex({ startX: this.state.startX, endX: this.state.endX }));
										});
								}
							}
						},
					},
					{
						key: "renderBackground",
						value: function () {
							var n = this.props,
								i = n.x,
								a = n.y,
								o = n.width,
								u = n.height,
								c = n.fill,
								s = n.stroke;
							return T.createElement("rect", { stroke: s, fill: c, x: i, y: a, width: o, height: u });
						},
					},
					{
						key: "renderPanorama",
						value: function () {
							var n = this.props,
								i = n.x,
								a = n.y,
								o = n.width,
								u = n.height,
								c = n.data,
								s = n.children,
								f = n.padding,
								l = k.Children.only(s);
							return l ? T.cloneElement(l, { x: i, y: a, width: o, height: u, margin: f, compact: !0, data: c }) : null;
						},
					},
					{
						key: "renderTravellerLayer",
						value: function (n, i) {
							var a,
								o,
								c = this.props,
								s = c.y,
								f = c.travellerWidth,
								l = c.height,
								h = c.traveller,
								p = c.ariaLabel,
								y = c.data,
								v = c.startIndex,
								d = c.endIndex,
								b = Math.max(n, this.props.x),
								w = Ss(Ss({}, ee(this.props, !1)), {}, { x: b, y: s, width: f, height: l }),
								x =
									p ||
									"Min value: "
										.concat((a = y[v]) === null || a === void 0 ? void 0 : a.name, ", Max value: ")
										.concat((o = y[d]) === null || o === void 0 ? void 0 : o.name);
							return T.createElement(
								_e,
								{
									tabIndex: 0,
									role: "slider",
									"aria-label": x,
									"aria-valuenow": n,
									className: "recharts-brush-traveller",
									onMouseEnter: this.handleEnterSlideOrTraveller,
									onMouseLeave: this.handleLeaveSlideOrTraveller,
									onMouseDown: this.travellerDragStartHandlers[i],
									onTouchStart: this.travellerDragStartHandlers[i],
									onKeyDown: (g) => {
										["ArrowLeft", "ArrowRight"].includes(g.key) &&
											(g.preventDefault(),
											g.stopPropagation(),
											this.handleTravellerMoveKeyboard(g.key === "ArrowRight" ? 1 : -1, i));
									},
									onFocus: () => {
										this.setState({ isTravellerFocused: !0 });
									},
									onBlur: () => {
										this.setState({ isTravellerFocused: !1 });
									},
									style: { cursor: "col-resize" },
								},
								t.renderTraveller(h, w),
							);
						},
					},
					{
						key: "renderSlide",
						value: function (n, i) {
							var a = this.props,
								o = a.y,
								u = a.height,
								c = a.stroke,
								s = a.travellerWidth,
								f = Math.min(n, i) + s,
								l = Math.max(Math.abs(i - n) - s, 0);
							return T.createElement("rect", {
								className: "recharts-brush-slide",
								onMouseEnter: this.handleEnterSlideOrTraveller,
								onMouseLeave: this.handleLeaveSlideOrTraveller,
								onMouseDown: this.handleSlideDragStart,
								onTouchStart: this.handleSlideDragStart,
								style: { cursor: "move" },
								stroke: "none",
								fill: c,
								fillOpacity: 0.2,
								x: f,
								y: o,
								width: l,
								height: u,
							});
						},
					},
					{
						key: "renderText",
						value: function () {
							var n = this.props,
								i = n.startIndex,
								a = n.endIndex,
								o = n.y,
								u = n.height,
								c = n.travellerWidth,
								s = n.stroke,
								f = this.state,
								l = f.startX,
								h = f.endX,
								p = 5,
								y = { pointerEvents: "none", fill: s };
							return T.createElement(
								_e,
								{ className: "recharts-brush-texts" },
								T.createElement(
									Oi,
									Hi({ textAnchor: "end", verticalAnchor: "middle", x: Math.min(l, h) - p, y: o + u / 2 }, y),
									this.getTextOfTick(i),
								),
								T.createElement(
									Oi,
									Hi({ textAnchor: "start", verticalAnchor: "middle", x: Math.max(l, h) + c + p, y: o + u / 2 }, y),
									this.getTextOfTick(a),
								),
							);
						},
					},
					{
						key: "render",
						value: function () {
							var n = this.props,
								i = n.data,
								a = n.className,
								o = n.children,
								u = n.x,
								c = n.y,
								s = n.width,
								f = n.height,
								l = n.alwaysShowText,
								h = this.state,
								p = h.startX,
								y = h.endX,
								v = h.isTextActive,
								d = h.isSlideMoving,
								b = h.isTravellerMoving,
								w = h.isTravellerFocused;
							if (!i || !i.length || !B(u) || !B(c) || !B(s) || !B(f) || s <= 0 || f <= 0) return null;
							var x = ie("recharts-brush", a),
								O = T.Children.count(o) === 1,
								g = J$("userSelect", "none");
							return T.createElement(
								_e,
								{ className: x, onMouseLeave: this.handleLeaveWrapper, onTouchMove: this.handleTouchMove, style: g },
								this.renderBackground(),
								O && this.renderPanorama(),
								this.renderSlide(p, y),
								this.renderTravellerLayer(p, "startX"),
								this.renderTravellerLayer(y, "endX"),
								(v || d || b || w || l) && this.renderText(),
							);
						},
					},
				],
				[
					{
						key: "renderDefaultTraveller",
						value: (n) => {
							var i = n.x,
								a = n.y,
								o = n.width,
								u = n.height,
								c = n.stroke,
								s = Math.floor(a + u / 2) - 1;
							return T.createElement(
								T.Fragment,
								null,
								T.createElement("rect", { x: i, y: a, width: o, height: u, fill: c, stroke: "none" }),
								T.createElement("line", { x1: i + 1, y1: s, x2: i + o - 1, y2: s, fill: "none", stroke: "#fff" }),
								T.createElement("line", {
									x1: i + 1,
									y1: s + 2,
									x2: i + o - 1,
									y2: s + 2,
									fill: "none",
									stroke: "#fff",
								}),
							);
						},
					},
					{
						key: "renderTraveller",
						value: (n, i) => {
							var a;
							return (
								T.isValidElement(n)
									? (a = T.cloneElement(n, i))
									: Z(n)
										? (a = n(i))
										: (a = t.renderDefaultTraveller(i)),
								a
							);
						},
					},
					{
						key: "getDerivedStateFromProps",
						value: (n, i) => {
							var a = n.data,
								o = n.width,
								u = n.x,
								c = n.travellerWidth,
								s = n.updateId,
								f = n.startIndex,
								l = n.endIndex;
							if (a !== i.prevData || s !== i.prevUpdateId)
								return Ss(
									{ prevData: a, prevTravellerWidth: c, prevUpdateId: s, prevX: u, prevWidth: o },
									a && a.length
										? oR({ data: a, width: o, x: u, travellerWidth: c, startIndex: f, endIndex: l })
										: { scale: null, scaleValues: null },
								);
							if (i.scale && (o !== i.prevWidth || u !== i.prevX || c !== i.prevTravellerWidth)) {
								i.scale.range([u, u + o - c]);
								var h = i.scale.domain().map((p) => i.scale(p));
								return {
									prevData: a,
									prevTravellerWidth: c,
									prevUpdateId: s,
									prevX: u,
									prevWidth: o,
									startX: i.scale(n.startIndex),
									endX: i.scale(n.endIndex),
									scaleValues: h,
								};
							}
							return null;
						},
					},
					{
						key: "getIndexInRange",
						value: (n, i) => {
							for (var a = n.length, o = 0, u = a - 1; u - o > 1; ) {
								var c = Math.floor((o + u) / 2);
								n[c] > i ? (u = c) : (o = c);
							}
							return i >= n[u] ? u : o;
						},
					},
				],
			)
		);
	})(k.PureComponent);
De(_r, "displayName", "Brush");
De(_r, "defaultProps", {
	height: 40,
	travellerWidth: 5,
	gap: 1,
	fill: "#fff",
	stroke: "#666",
	padding: { top: 1, right: 1, bottom: 1, left: 1 },
	leaveTimeOut: 1e3,
	alwaysShowText: !1,
});
var As, vm;
function uR() {
	if (vm) return As;
	vm = 1;
	var e = Af();
	function t(r, n) {
		var i;
		return e(r, (a, o, u) => ((i = n(a, o, u)), !i)), !!i;
	}
	return (As = t), As;
}
var Ps, ym;
function cR() {
	if (ym) return Ps;
	ym = 1;
	var e = Yb(),
		t = Mt(),
		r = uR(),
		n = Ne(),
		i = ga();
	function a(o, u, c) {
		var s = n(o) ? e : r;
		return c && i(o, u, c) && (u = void 0), s(o, t(u, 3));
	}
	return (Ps = a), Ps;
}
var sR = cR();
const lR = ce(sR);
var it = (t, r) => {
		var n = t.alwaysShow,
			i = t.ifOverflow;
		return n && (i = "extendDomain"), i === r;
	},
	Ts,
	gm;
function fR() {
	if (gm) return Ts;
	gm = 1;
	var e = p0();
	function t(r, n, i) {
		n == "__proto__" && e ? e(r, n, { configurable: !0, enumerable: !0, value: i, writable: !0 }) : (r[n] = i);
	}
	return (Ts = t), Ts;
}
var Es, mm;
function hR() {
	if (mm) return Es;
	mm = 1;
	var e = fR(),
		t = h0(),
		r = Mt();
	function n(i, a) {
		var o = {};
		return (
			(a = r(a, 3)),
			t(i, (u, c, s) => {
				e(o, c, a(u, c, s));
			}),
			o
		);
	}
	return (Es = n), Es;
}
var dR = hR();
const pR = ce(dR);
var js, bm;
function vR() {
	if (bm) return js;
	bm = 1;
	function e(t, r) {
		for (var n = -1, i = t == null ? 0 : t.length; ++n < i; ) if (!r(t[n], n, t)) return !1;
		return !0;
	}
	return (js = e), js;
}
var Ms, xm;
function yR() {
	if (xm) return Ms;
	xm = 1;
	var e = Af();
	function t(r, n) {
		var i = !0;
		return e(r, (a, o, u) => ((i = !!n(a, o, u)), i)), i;
	}
	return (Ms = t), Ms;
}
var Cs, wm;
function gR() {
	if (wm) return Cs;
	wm = 1;
	var e = vR(),
		t = yR(),
		r = Mt(),
		n = Ne(),
		i = ga();
	function a(o, u, c) {
		var s = n(o) ? e : t;
		return c && i(o, u, c) && (u = void 0), s(o, r(u, 3));
	}
	return (Cs = a), Cs;
}
var mR = gR();
const zx = ce(mR);
var bR = ["x", "y"];
function Nn(e) {
	"@babel/helpers - typeof";
	return (
		(Nn =
			typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
				? (t) => typeof t
				: (t) =>
						t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
							? "symbol"
							: typeof t),
		Nn(e)
	);
}
function Ll() {
	return (
		(Ll = Object.assign
			? Object.assign.bind()
			: (e) => {
					for (var t = 1; t < arguments.length; t++) {
						var r = arguments[t];
						for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
					}
					return e;
				}),
		Ll.apply(this, arguments)
	);
}
function Om(e, t) {
	var r = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		t && (n = n.filter((i) => Object.getOwnPropertyDescriptor(e, i).enumerable)), r.push.apply(r, n);
	}
	return r;
}
function Yr(e) {
	for (var t = 1; t < arguments.length; t++) {
		var r = arguments[t] != null ? arguments[t] : {};
		t % 2
			? Om(Object(r), !0).forEach((n) => {
					xR(e, n, r[n]);
				})
			: Object.getOwnPropertyDescriptors
				? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
				: Om(Object(r)).forEach((n) => {
						Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
					});
	}
	return e;
}
function xR(e, t, r) {
	return (
		(t = wR(t)),
		t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = r),
		e
	);
}
function wR(e) {
	var t = OR(e, "string");
	return Nn(t) == "symbol" ? t : t + "";
}
function OR(e, t) {
	if (Nn(e) != "object" || !e) return e;
	var r = e[Symbol.toPrimitive];
	if (r !== void 0) {
		var n = r.call(e, t);
		if (Nn(n) != "object") return n;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function _R(e, t) {
	if (e == null) return {};
	var r = SR(e, t),
		n,
		i;
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (i = 0; i < a.length; i++)
			(n = a[i]), !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
	}
	return r;
}
function SR(e, t) {
	if (e == null) return {};
	var r = {};
	for (var n in e)
		if (Object.prototype.hasOwnProperty.call(e, n)) {
			if (t.indexOf(n) >= 0) continue;
			r[n] = e[n];
		}
	return r;
}
function AR(e, t) {
	var r = e.x,
		n = e.y,
		i = _R(e, bR),
		a = "".concat(r),
		o = Number.parseInt(a, 10),
		u = "".concat(n),
		c = Number.parseInt(u, 10),
		s = "".concat(t.height || i.height),
		f = Number.parseInt(s, 10),
		l = "".concat(t.width || i.width),
		h = Number.parseInt(l, 10);
	return Yr(
		Yr(Yr(Yr(Yr({}, t), i), o ? { x: o } : {}), c ? { y: c } : {}),
		{},
		{ height: f, width: h, name: t.name, radius: t.radius },
	);
}
function _m(e) {
	return T.createElement(
		D$,
		Ll({ shapeType: "rectangle", propTransformer: AR, activeClassName: "recharts-active-bar" }, e),
	);
}
var PR = (t) => {
		var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
		return (n, i) => {
			if (typeof t == "number") return t;
			var a = typeof n == "number";
			return a ? t(n, i) : (a || Vt(), r);
		};
	},
	TR = ["value", "background"],
	Wx;
function Sr(e) {
	"@babel/helpers - typeof";
	return (
		(Sr =
			typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
				? (t) => typeof t
				: (t) =>
						t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
							? "symbol"
							: typeof t),
		Sr(e)
	);
}
function ER(e, t) {
	if (e == null) return {};
	var r = jR(e, t),
		n,
		i;
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (i = 0; i < a.length; i++)
			(n = a[i]), !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
	}
	return r;
}
function jR(e, t) {
	if (e == null) return {};
	var r = {};
	for (var n in e)
		if (Object.prototype.hasOwnProperty.call(e, n)) {
			if (t.indexOf(n) >= 0) continue;
			r[n] = e[n];
		}
	return r;
}
function Vi() {
	return (
		(Vi = Object.assign
			? Object.assign.bind()
			: (e) => {
					for (var t = 1; t < arguments.length; t++) {
						var r = arguments[t];
						for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
					}
					return e;
				}),
		Vi.apply(this, arguments)
	);
}
function Sm(e, t) {
	var r = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		t && (n = n.filter((i) => Object.getOwnPropertyDescriptor(e, i).enumerable)), r.push.apply(r, n);
	}
	return r;
}
function ve(e) {
	for (var t = 1; t < arguments.length; t++) {
		var r = arguments[t] != null ? arguments[t] : {};
		t % 2
			? Sm(Object(r), !0).forEach((n) => {
					Pt(e, n, r[n]);
				})
			: Object.getOwnPropertyDescriptors
				? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
				: Sm(Object(r)).forEach((n) => {
						Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
					});
	}
	return e;
}
function MR(e, t) {
	if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function Am(e, t) {
	for (var r = 0; r < t.length; r++) {
		var n = t[r];
		(n.enumerable = n.enumerable || !1),
			(n.configurable = !0),
			"value" in n && (n.writable = !0),
			Object.defineProperty(e, Hx(n.key), n);
	}
}
function CR(e, t, r) {
	return t && Am(e.prototype, t), r && Am(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function IR(e, t, r) {
	return (t = Xi(t)), $R(e, Gx() ? Reflect.construct(t, r || [], Xi(e).constructor) : t.apply(e, r));
}
function $R(e, t) {
	if (t && (Sr(t) === "object" || typeof t == "function")) return t;
	if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
	return RR(e);
}
function RR(e) {
	if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	return e;
}
function Gx() {
	try {
		var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], () => {}));
	} catch {}
	return (Gx = () => !!e)();
}
function Xi(e) {
	return (
		(Xi = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : (r) => r.__proto__ || Object.getPrototypeOf(r)), Xi(e)
	);
}
function NR(e, t) {
	if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
	(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } })),
		Object.defineProperty(e, "prototype", { writable: !1 }),
		t && Bl(e, t);
}
function Bl(e, t) {
	return (Bl = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : (n, i) => ((n.__proto__ = i), n)), Bl(e, t);
}
function Pt(e, t, r) {
	return (
		(t = Hx(t)),
		t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = r),
		e
	);
}
function Hx(e) {
	var t = kR(e, "string");
	return Sr(t) == "symbol" ? t : t + "";
}
function kR(e, t) {
	if (Sr(e) != "object" || !e) return e;
	var r = e[Symbol.toPrimitive];
	if (r !== void 0) {
		var n = r.call(e, t);
		if (Sr(n) != "object") return n;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return String(e);
}
var Ot = ((e) => {
	function t() {
		var r;
		MR(this, t);
		for (var n = arguments.length, i = new Array(n), a = 0; a < n; a++) i[a] = arguments[a];
		return (
			(r = IR(this, t, [].concat(i))),
			Pt(r, "state", { isAnimationFinished: !1 }),
			Pt(r, "id", la("recharts-bar-")),
			Pt(r, "handleAnimationEnd", () => {
				var o = r.props.onAnimationEnd;
				r.setState({ isAnimationFinished: !0 }), o && o();
			}),
			Pt(r, "handleAnimationStart", () => {
				var o = r.props.onAnimationStart;
				r.setState({ isAnimationFinished: !1 }), o && o();
			}),
			r
		);
	}
	return (
		NR(t, e),
		CR(
			t,
			[
				{
					key: "renderRectanglesStatically",
					value: function (n) {
						var a = this.props,
							o = a.shape,
							u = a.dataKey,
							c = a.activeIndex,
							s = a.activeBar,
							f = ee(this.props, !1);
						return (
							n &&
							n.map((l, h) => {
								var p = h === c,
									y = p ? s : o,
									v = ve(
										ve(ve({}, f), l),
										{},
										{
											isActive: p,
											option: y,
											index: h,
											dataKey: u,
											onAnimationStart: this.handleAnimationStart,
											onAnimationEnd: this.handleAnimationEnd,
										},
									);
								return T.createElement(
									_e,
									Vi({ className: "recharts-bar-rectangle" }, fi(this.props, l, h), {
										key: "rectangle-".concat(l?.x, "-").concat(l?.y, "-").concat(l?.value, "-").concat(h),
									}),
									T.createElement(_m, v),
								);
							})
						);
					},
				},
				{
					key: "renderRectanglesWithAnimation",
					value: function () {
						var i = this.props,
							a = i.data,
							o = i.layout,
							u = i.isAnimationActive,
							c = i.animationBegin,
							s = i.animationDuration,
							f = i.animationEasing,
							l = i.animationId,
							h = this.state.prevData;
						return T.createElement(
							Et,
							{
								begin: c,
								duration: s,
								isActive: u,
								easing: f,
								from: { t: 0 },
								to: { t: 1 },
								key: "bar-".concat(l),
								onAnimationEnd: this.handleAnimationEnd,
								onAnimationStart: this.handleAnimationStart,
							},
							(p) => {
								var y = p.t,
									v = a.map((d, b) => {
										var w = h && h[b];
										if (w) {
											var x = tr(w.x, d.x),
												O = tr(w.y, d.y),
												g = tr(w.width, d.width),
												m = tr(w.height, d.height);
											return ve(ve({}, d), {}, { x: x(y), y: O(y), width: g(y), height: m(y) });
										}
										if (o === "horizontal") {
											var _ = tr(0, d.height),
												S = _(y);
											return ve(ve({}, d), {}, { y: d.y + d.height - S, height: S });
										}
										var P = tr(0, d.width),
											M = P(y);
										return ve(ve({}, d), {}, { width: M });
									});
								return T.createElement(_e, null, this.renderRectanglesStatically(v));
							},
						);
					},
				},
				{
					key: "renderRectangles",
					value: function () {
						var n = this.props,
							i = n.data,
							a = n.isAnimationActive,
							o = this.state.prevData;
						return a && i && i.length && (!o || !Yf(o, i))
							? this.renderRectanglesWithAnimation()
							: this.renderRectanglesStatically(i);
					},
				},
				{
					key: "renderBackground",
					value: function () {
						var i = this.props,
							a = i.data,
							o = i.dataKey,
							u = i.activeIndex,
							c = ee(this.props.background, !1);
						return a.map((s, f) => {
							s.value;
							var l = s.background,
								h = ER(s, TR);
							if (!l) return null;
							var p = ve(
								ve(ve(ve(ve({}, h), {}, { fill: "#eee" }, l), c), fi(this.props, s, f)),
								{},
								{
									onAnimationStart: this.handleAnimationStart,
									onAnimationEnd: this.handleAnimationEnd,
									dataKey: o,
									index: f,
									className: "recharts-bar-background-rectangle",
								},
							);
							return T.createElement(
								_m,
								Vi({ key: "background-bar-".concat(f), option: this.props.background, isActive: f === u }, p),
							);
						});
					},
				},
				{
					key: "renderErrorBar",
					value: function (n, i) {
						if (this.props.isAnimationActive && !this.state.isAnimationFinished) return null;
						var a = this.props,
							o = a.data,
							u = a.xAxis,
							c = a.yAxis,
							s = a.layout,
							f = a.children,
							l = Je(f, Ea);
						if (!l) return null;
						var h = s === "vertical" ? o[0].height / 2 : o[0].width / 2,
							p = (d, b) => {
								var w = Array.isArray(d.value) ? d.value[1] : d.value;
								return { x: d.x, y: d.y, value: w, errorVal: ot(d, b) };
							},
							y = { clipPath: n ? "url(#clipPath-".concat(i, ")") : null };
						return T.createElement(
							_e,
							y,
							l.map((v) =>
								T.cloneElement(v, {
									key: "error-bar-".concat(i, "-").concat(v.props.dataKey),
									data: o,
									xAxis: u,
									yAxis: c,
									layout: s,
									offset: h,
									dataPointFormatter: p,
								}),
							),
						);
					},
				},
				{
					key: "render",
					value: function () {
						var n = this.props,
							i = n.hide,
							a = n.data,
							o = n.className,
							u = n.xAxis,
							c = n.yAxis,
							s = n.left,
							f = n.top,
							l = n.width,
							h = n.height,
							p = n.isAnimationActive,
							y = n.background,
							v = n.id;
						if (i || !a || !a.length) return null;
						var d = this.state.isAnimationFinished,
							b = ie("recharts-bar", o),
							w = u && u.allowDataOverflow,
							x = c && c.allowDataOverflow,
							O = w || x,
							g = ne(v) ? this.id : v;
						return T.createElement(
							_e,
							{ className: b },
							w || x
								? T.createElement(
										"defs",
										null,
										T.createElement(
											"clipPath",
											{ id: "clipPath-".concat(g) },
											T.createElement("rect", {
												x: w ? s : s - l / 2,
												y: x ? f : f - h / 2,
												width: w ? l : l * 2,
												height: x ? h : h * 2,
											}),
										),
									)
								: null,
							T.createElement(
								_e,
								{ className: "recharts-bar-rectangles", clipPath: O ? "url(#clipPath-".concat(g, ")") : null },
								y ? this.renderBackground() : null,
								this.renderRectangles(),
							),
							this.renderErrorBar(O, g),
							(!p || d) && nt.renderCallByParent(this.props, a),
						);
					},
				},
			],
			[
				{
					key: "getDerivedStateFromProps",
					value: (n, i) =>
						n.animationId !== i.prevAnimationId
							? { prevAnimationId: n.animationId, curData: n.data, prevData: i.curData }
							: n.data !== i.curData
								? { curData: n.data }
								: null,
				},
			],
		)
	);
})(k.PureComponent);
Wx = Ot;
Pt(Ot, "displayName", "Bar");
Pt(Ot, "defaultProps", {
	xAxisId: 0,
	yAxisId: 0,
	legendType: "rect",
	minPointSize: 0,
	hide: !1,
	data: [],
	layout: "vertical",
	activeBar: !1,
	isAnimationActive: !Wn.isSsr,
	animationBegin: 0,
	animationDuration: 400,
	animationEasing: "ease",
});
Pt(Ot, "getComposedData", (e) => {
	var t = e.props,
		r = e.item,
		n = e.barPosition,
		i = e.bandSize,
		a = e.xAxis,
		o = e.yAxis,
		u = e.xAxisTicks,
		c = e.yAxisTicks,
		s = e.stackedData,
		f = e.dataStartIndex,
		l = e.displayedData,
		h = e.offset,
		p = tM(n, r);
	if (!p) return null;
	var y = t.layout,
		v = r.type.defaultProps,
		d = v !== void 0 ? ve(ve({}, v), r.props) : r.props,
		b = d.dataKey,
		w = d.children,
		x = d.minPointSize,
		O = y === "horizontal" ? o : a,
		g = s ? O.scale.domain() : null,
		m = sM({ numericAxis: O }),
		_ = Je(w, w0),
		S = l.map((P, M) => {
			var A, E, j, R, C, N;
			s ? (A = rM(s[f + M], g)) : ((A = ot(P, b)), Array.isArray(A) || (A = [m, A]));
			var q = PR(x, Wx.defaultProps.minPointSize)(A[1], M);
			if (y === "horizontal") {
				var L,
					F = [o.scale(A[0]), o.scale(A[1])],
					G = F[0],
					K = F[1];
				(E = ug({ axis: a, ticks: u, bandSize: i, offset: p.offset, entry: P, index: M })),
					(j = (L = K ?? G) !== null && L !== void 0 ? L : void 0),
					(R = p.size);
				var z = G - K;
				if (
					((C = Number.isNaN(z) ? 0 : z),
					(N = { x: E, y: o.y, width: R, height: o.height }),
					Math.abs(q) > 0 && Math.abs(C) < Math.abs(q))
				) {
					var V = Ze(C || q) * (Math.abs(q) - Math.abs(C));
					(j -= V), (C += V);
				}
			} else {
				var se = [a.scale(A[0]), a.scale(A[1])],
					pe = se[0],
					ke = se[1];
				if (
					((E = pe),
					(j = ug({ axis: o, ticks: c, bandSize: i, offset: p.offset, entry: P, index: M })),
					(R = ke - pe),
					(C = p.size),
					(N = { x: a.x, y: j, width: a.width, height: C }),
					Math.abs(q) > 0 && Math.abs(R) < Math.abs(q))
				) {
					var Rt = Ze(R || q) * (Math.abs(q) - Math.abs(R));
					R += Rt;
				}
			}
			return ve(
				ve(
					ve({}, P),
					{},
					{ x: E, y: j, width: R, height: C, value: s ? A : A[1], payload: P, background: N },
					_ && _[M] && _[M].props,
				),
				{},
				{ tooltipPayload: [Tx(r, P)], tooltipPosition: { x: E + R / 2, y: j + C / 2 } },
			);
		});
	return ve({ data: S, layout: y }, h);
});
function kn(e) {
	"@babel/helpers - typeof";
	return (
		(kn =
			typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
				? (t) => typeof t
				: (t) =>
						t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
							? "symbol"
							: typeof t),
		kn(e)
	);
}
function DR(e, t) {
	if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function Pm(e, t) {
	for (var r = 0; r < t.length; r++) {
		var n = t[r];
		(n.enumerable = n.enumerable || !1),
			(n.configurable = !0),
			"value" in n && (n.writable = !0),
			Object.defineProperty(e, Kx(n.key), n);
	}
}
function qR(e, t, r) {
	return t && Pm(e.prototype, t), r && Pm(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function Tm(e, t) {
	var r = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		t && (n = n.filter((i) => Object.getOwnPropertyDescriptor(e, i).enumerable)), r.push.apply(r, n);
	}
	return r;
}
function Ve(e) {
	for (var t = 1; t < arguments.length; t++) {
		var r = arguments[t] != null ? arguments[t] : {};
		t % 2
			? Tm(Object(r), !0).forEach((n) => {
					Ca(e, n, r[n]);
				})
			: Object.getOwnPropertyDescriptors
				? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
				: Tm(Object(r)).forEach((n) => {
						Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
					});
	}
	return e;
}
function Ca(e, t, r) {
	return (
		(t = Kx(t)),
		t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = r),
		e
	);
}
function Kx(e) {
	var t = LR(e, "string");
	return kn(t) == "symbol" ? t : t + "";
}
function LR(e, t) {
	if (kn(e) != "object" || !e) return e;
	var r = e[Symbol.toPrimitive];
	if (r !== void 0) {
		var n = r.call(e, t);
		if (kn(n) != "object") return n;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var BR = (t, r, n, i, a) => {
		var o = t.width,
			u = t.height,
			c = t.layout,
			s = t.children,
			f = Object.keys(r),
			l = {
				left: n.left,
				leftMirror: n.left,
				right: o - n.right,
				rightMirror: o - n.right,
				top: n.top,
				topMirror: n.top,
				bottom: u - n.bottom,
				bottomMirror: u - n.bottom,
			},
			h = !!qe(s, Ot);
		return f.reduce((p, y) => {
			var v = r[y],
				d = v.orientation,
				b = v.domain,
				w = v.padding,
				x = w === void 0 ? {} : w,
				O = v.mirror,
				g = v.reversed,
				m = "".concat(d).concat(O ? "Mirror" : ""),
				_,
				S,
				P,
				M,
				A;
			if (v.type === "number" && (v.padding === "gap" || v.padding === "no-gap")) {
				var E = b[1] - b[0],
					j = 1 / 0,
					R = v.categoricalDomain.sort();
				if (
					(R.forEach((se, pe) => {
						pe > 0 && (j = Math.min((se || 0) - (R[pe - 1] || 0), j));
					}),
					Number.isFinite(j))
				) {
					var C = j / E,
						N = v.layout === "vertical" ? n.height : n.width;
					if ((v.padding === "gap" && (_ = (C * N) / 2), v.padding === "no-gap")) {
						var q = Ht(t.barCategoryGap, C * N),
							L = (C * N) / 2;
						_ = L - q - ((L - q) / N) * q;
					}
				}
			}
			i === "xAxis"
				? (S = [n.left + (x.left || 0) + (_ || 0), n.left + n.width - (x.right || 0) - (_ || 0)])
				: i === "yAxis"
					? (S =
							c === "horizontal"
								? [n.top + n.height - (x.bottom || 0), n.top + (x.top || 0)]
								: [n.top + (x.top || 0) + (_ || 0), n.top + n.height - (x.bottom || 0) - (_ || 0)])
					: (S = v.range),
				g && (S = [S[1], S[0]]);
			var F = Qj(v, a, h),
				G = F.scale,
				K = F.realScaleType;
			G.domain(b).range(S), eM(G);
			var z = cM(G, Ve(Ve({}, v), {}, { realScaleType: K }));
			i === "xAxis"
				? ((A = (d === "top" && !O) || (d === "bottom" && O)), (P = n.left), (M = l[m] - A * v.height))
				: i === "yAxis" && ((A = (d === "left" && !O) || (d === "right" && O)), (P = l[m] - A * v.width), (M = n.top));
			var V = Ve(
				Ve(Ve({}, v), z),
				{},
				{
					realScaleType: K,
					x: P,
					y: M,
					scale: G,
					width: i === "xAxis" ? n.width : v.width,
					height: i === "yAxis" ? n.height : v.height,
				},
			);
			return (
				(V.bandSize = ki(V, z)),
				!v.hide && i === "xAxis" ? (l[m] += (A ? -1 : 1) * V.height) : v.hide || (l[m] += (A ? -1 : 1) * V.width),
				Ve(Ve({}, p), {}, Ca({}, y, V))
			);
		}, {});
	},
	Vx = (t, r) => {
		var n = t.x,
			i = t.y,
			a = r.x,
			o = r.y;
		return { x: Math.min(n, a), y: Math.min(i, o), width: Math.abs(a - n), height: Math.abs(o - i) };
	},
	FR = (t) => {
		var r = t.x1,
			n = t.y1,
			i = t.x2,
			a = t.y2;
		return Vx({ x: r, y: n }, { x: i, y: a });
	},
	Xx = (() => {
		function e(t) {
			DR(this, e), (this.scale = t);
		}
		return qR(
			e,
			[
				{
					key: "domain",
					get: function () {
						return this.scale.domain;
					},
				},
				{
					key: "range",
					get: function () {
						return this.scale.range;
					},
				},
				{
					key: "rangeMin",
					get: function () {
						return this.range()[0];
					},
				},
				{
					key: "rangeMax",
					get: function () {
						return this.range()[1];
					},
				},
				{
					key: "bandwidth",
					get: function () {
						return this.scale.bandwidth;
					},
				},
				{
					key: "apply",
					value: function (r) {
						var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
							i = n.bandAware,
							a = n.position;
						if (r !== void 0) {
							if (a)
								switch (a) {
									case "start":
										return this.scale(r);
									case "middle": {
										var o = this.bandwidth ? this.bandwidth() / 2 : 0;
										return this.scale(r) + o;
									}
									case "end": {
										var u = this.bandwidth ? this.bandwidth() : 0;
										return this.scale(r) + u;
									}
									default:
										return this.scale(r);
								}
							if (i) {
								var c = this.bandwidth ? this.bandwidth() / 2 : 0;
								return this.scale(r) + c;
							}
							return this.scale(r);
						}
					},
				},
				{
					key: "isInRange",
					value: function (r) {
						var n = this.range(),
							i = n[0],
							a = n[n.length - 1];
						return i <= a ? r >= i && r <= a : r >= a && r <= i;
					},
				},
			],
			[
				{
					key: "create",
					value: (r) => new e(r),
				},
			],
		);
	})();
Ca(Xx, "EPS", 1e-4);
var th = (t) => {
	var r = Object.keys(t).reduce((n, i) => Ve(Ve({}, n), {}, Ca({}, i, Xx.create(t[i]))), {});
	return Ve(
		Ve({}, r),
		{},
		{
			apply: (i) => {
				var a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
					o = a.bandAware,
					u = a.position;
				return pR(i, (c, s) => r[s].apply(c, { bandAware: o, position: u }));
			},
			isInRange: (i) => zx(i, (a, o) => r[o].isInRange(a)),
		},
	);
};
function UR(e) {
	return ((e % 180) + 180) % 180;
}
var zR = (t) => {
		var r = t.width,
			n = t.height,
			i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0,
			a = UR(i),
			o = (a * Math.PI) / 180,
			u = Math.atan(n / r),
			c = o > u && o < Math.PI - u ? n / Math.sin(o) : r / Math.cos(o);
		return Math.abs(c);
	},
	Is,
	Em;
function WR() {
	if (Em) return Is;
	Em = 1;
	var e = Mt(),
		t = zn(),
		r = va();
	function n(i) {
		return (a, o, u) => {
			var c = Object(a);
			if (!t(a)) {
				var s = e(o, 3);
				(a = r(a)), (o = (l) => s(c[l], l, c));
			}
			var f = i(a, o, u);
			return f > -1 ? c[s ? a[f] : f] : void 0;
		};
	}
	return (Is = n), Is;
}
var $s, jm;
function GR() {
	if (jm) return $s;
	jm = 1;
	var e = Lx();
	function t(r) {
		var n = e(r),
			i = n % 1;
		return n === n ? (i ? n - i : n) : 0;
	}
	return ($s = t), $s;
}
var Rs, Mm;
function HR() {
	if (Mm) return Rs;
	Mm = 1;
	var e = u0(),
		t = Mt(),
		r = GR(),
		n = Math.max;
	function i(a, o, u) {
		var c = a == null ? 0 : a.length;
		if (!c) return -1;
		var s = u == null ? 0 : r(u);
		return s < 0 && (s = n(c + s, 0)), e(a, t(o, 3), s);
	}
	return (Rs = i), Rs;
}
var Ns, Cm;
function KR() {
	if (Cm) return Ns;
	Cm = 1;
	var e = WR(),
		t = HR(),
		r = e(t);
	return (Ns = r), Ns;
}
var VR = KR();
const XR = ce(VR);
var YR = _b();
const ZR = ce(YR);
var JR = ZR(
		(e) => ({ x: e.left, y: e.top, width: e.width, height: e.height }),
		(e) => ["l", e.left, "t", e.top, "w", e.width, "h", e.height].join(""),
	),
	rh = k.createContext(void 0),
	nh = k.createContext(void 0),
	Yx = k.createContext(void 0),
	Zx = k.createContext({}),
	Jx = k.createContext(void 0),
	Qx = k.createContext(0),
	ew = k.createContext(0),
	Im = (t) => {
		var r = t.state,
			n = r.xAxisMap,
			i = r.yAxisMap,
			a = r.offset,
			o = t.clipPathId,
			u = t.children,
			c = t.width,
			s = t.height,
			f = JR(a);
		return T.createElement(
			rh.Provider,
			{ value: n },
			T.createElement(
				nh.Provider,
				{ value: i },
				T.createElement(
					Zx.Provider,
					{ value: a },
					T.createElement(
						Yx.Provider,
						{ value: f },
						T.createElement(
							Jx.Provider,
							{ value: o },
							T.createElement(Qx.Provider, { value: s }, T.createElement(ew.Provider, { value: c }, u)),
						),
					),
				),
			),
		);
	},
	QR = () => k.useContext(Jx),
	tw = (t) => {
		var r = k.useContext(rh);
		r == null && Vt();
		var n = r[t];
		return n == null && Vt(), n;
	},
	eN = () => {
		var t = k.useContext(rh);
		return At(t);
	},
	tN = () => {
		var t = k.useContext(nh),
			r = XR(t, (n) => zx(n.domain, Number.isFinite));
		return r || At(t);
	},
	rw = (t) => {
		var r = k.useContext(nh);
		r == null && Vt();
		var n = r[t];
		return n == null && Vt(), n;
	},
	rN = () => {
		var t = k.useContext(Yx);
		return t;
	},
	nN = () => k.useContext(Zx),
	ih = () => k.useContext(ew),
	ah = () => k.useContext(Qx);
function Ar(e) {
	"@babel/helpers - typeof";
	return (
		(Ar =
			typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
				? (t) => typeof t
				: (t) =>
						t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
							? "symbol"
							: typeof t),
		Ar(e)
	);
}
function iN(e, t) {
	if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function aN(e, t) {
	for (var r = 0; r < t.length; r++) {
		var n = t[r];
		(n.enumerable = n.enumerable || !1),
			(n.configurable = !0),
			"value" in n && (n.writable = !0),
			Object.defineProperty(e, iw(n.key), n);
	}
}
function oN(e, t, r) {
	return t && aN(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function uN(e, t, r) {
	return (t = Yi(t)), cN(e, nw() ? Reflect.construct(t, r || [], Yi(e).constructor) : t.apply(e, r));
}
function cN(e, t) {
	if (t && (Ar(t) === "object" || typeof t == "function")) return t;
	if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
	return sN(e);
}
function sN(e) {
	if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	return e;
}
function nw() {
	try {
		var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], () => {}));
	} catch {}
	return (nw = () => !!e)();
}
function Yi(e) {
	return (
		(Yi = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : (r) => r.__proto__ || Object.getPrototypeOf(r)), Yi(e)
	);
}
function lN(e, t) {
	if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
	(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } })),
		Object.defineProperty(e, "prototype", { writable: !1 }),
		t && Fl(e, t);
}
function Fl(e, t) {
	return (Fl = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : (n, i) => ((n.__proto__ = i), n)), Fl(e, t);
}
function $m(e, t) {
	var r = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		t && (n = n.filter((i) => Object.getOwnPropertyDescriptor(e, i).enumerable)), r.push.apply(r, n);
	}
	return r;
}
function Rm(e) {
	for (var t = 1; t < arguments.length; t++) {
		var r = arguments[t] != null ? arguments[t] : {};
		t % 2
			? $m(Object(r), !0).forEach((n) => {
					oh(e, n, r[n]);
				})
			: Object.getOwnPropertyDescriptors
				? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
				: $m(Object(r)).forEach((n) => {
						Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
					});
	}
	return e;
}
function oh(e, t, r) {
	return (
		(t = iw(t)),
		t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = r),
		e
	);
}
function iw(e) {
	var t = fN(e, "string");
	return Ar(t) == "symbol" ? t : t + "";
}
function fN(e, t) {
	if (Ar(e) != "object" || !e) return e;
	var r = e[Symbol.toPrimitive];
	if (r !== void 0) {
		var n = r.call(e, t);
		if (Ar(n) != "object") return n;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return String(e);
}
function hN(e, t) {
	return yN(e) || vN(e, t) || pN(e, t) || dN();
}
function dN() {
	throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function pN(e, t) {
	if (e) {
		if (typeof e == "string") return Nm(e, t);
		var r = Object.prototype.toString.call(e).slice(8, -1);
		if ((r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set")) return Array.from(e);
		if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Nm(e, t);
	}
}
function Nm(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
	return n;
}
function vN(e, t) {
	var r = e == null ? null : (typeof Symbol < "u" && e[Symbol.iterator]) || e["@@iterator"];
	if (r != null) {
		var n,
			i,
			a,
			o,
			u = [],
			c = !0,
			s = !1;
		try {
			if (((a = (r = r.call(e)).next), t !== 0))
				for (; !(c = (n = a.call(r)).done) && (u.push(n.value), u.length !== t); c = !0);
		} catch (f) {
			(s = !0), (i = f);
		} finally {
			try {
				if (!c && r.return != null && ((o = r.return()), Object(o) !== o)) return;
			} finally {
				if (s) throw i;
			}
		}
		return u;
	}
}
function yN(e) {
	if (Array.isArray(e)) return e;
}
function Ul() {
	return (
		(Ul = Object.assign
			? Object.assign.bind()
			: (e) => {
					for (var t = 1; t < arguments.length; t++) {
						var r = arguments[t];
						for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
					}
					return e;
				}),
		Ul.apply(this, arguments)
	);
}
var gN = (t, r) => {
		var n;
		return (
			T.isValidElement(t)
				? (n = T.cloneElement(t, r))
				: Z(t)
					? (n = t(r))
					: (n = T.createElement("line", Ul({}, r, { className: "recharts-reference-line-line" }))),
			n
		);
	},
	mN = (t, r, n, i, a, o, u, c, s) => {
		var f = a.x,
			l = a.y,
			h = a.width,
			p = a.height;
		if (n) {
			var y = s.y,
				v = t.y.apply(y, { position: o });
			if (it(s, "discard") && !t.y.isInRange(v)) return null;
			var d = [
				{ x: f + h, y: v },
				{ x: f, y: v },
			];
			return c === "left" ? d.reverse() : d;
		}
		if (r) {
			var b = s.x,
				w = t.x.apply(b, { position: o });
			if (it(s, "discard") && !t.x.isInRange(w)) return null;
			var x = [
				{ x: w, y: l + p },
				{ x: w, y: l },
			];
			return u === "top" ? x.reverse() : x;
		}
		if (i) {
			var O = s.segment,
				g = O.map((m) => t.apply(m, { position: o }));
			return it(s, "discard") && lR(g, (m) => !t.isInRange(m)) ? null : g;
		}
		return null;
	};
function bN(e) {
	var t = e.x,
		r = e.y,
		n = e.segment,
		i = e.xAxisId,
		a = e.yAxisId,
		o = e.shape,
		u = e.className,
		c = e.alwaysShow,
		s = QR(),
		f = tw(i),
		l = rw(a),
		h = rN();
	if (!s || !h) return null;
	pt(c === void 0, 'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.');
	var p = th({ x: f.scale, y: l.scale }),
		y = xe(t),
		v = xe(r),
		d = n && n.length === 2,
		b = mN(p, y, v, d, h, e.position, f.orientation, l.orientation, e);
	if (!b) return null;
	var w = hN(b, 2),
		x = w[0],
		O = x.x,
		g = x.y,
		m = w[1],
		_ = m.x,
		S = m.y,
		P = it(e, "hidden") ? "url(#".concat(s, ")") : void 0,
		M = Rm(Rm({ clipPath: P }, ee(e, !0)), {}, { x1: O, y1: g, x2: _, y2: S });
	return T.createElement(
		_e,
		{ className: ie("recharts-reference-line", u) },
		gN(o, M),
		Ee.renderCallByParent(e, FR({ x1: O, y1: g, x2: _, y2: S })),
	);
}
var uh = ((e) => {
	function t() {
		return iN(this, t), uN(this, t, arguments);
	}
	return (
		lN(t, e),
		oN(t, [
			{
				key: "render",
				value: function () {
					return T.createElement(bN, this.props);
				},
			},
		])
	);
})(T.Component);
oh(uh, "displayName", "ReferenceLine");
oh(uh, "defaultProps", {
	isFront: !1,
	ifOverflow: "discard",
	xAxisId: 0,
	yAxisId: 0,
	fill: "none",
	stroke: "#ccc",
	fillOpacity: 1,
	strokeWidth: 1,
	position: "middle",
});
function zl() {
	return (
		(zl = Object.assign
			? Object.assign.bind()
			: (e) => {
					for (var t = 1; t < arguments.length; t++) {
						var r = arguments[t];
						for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
					}
					return e;
				}),
		zl.apply(this, arguments)
	);
}
function Pr(e) {
	"@babel/helpers - typeof";
	return (
		(Pr =
			typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
				? (t) => typeof t
				: (t) =>
						t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
							? "symbol"
							: typeof t),
		Pr(e)
	);
}
function km(e, t) {
	var r = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		t && (n = n.filter((i) => Object.getOwnPropertyDescriptor(e, i).enumerable)), r.push.apply(r, n);
	}
	return r;
}
function Dm(e) {
	for (var t = 1; t < arguments.length; t++) {
		var r = arguments[t] != null ? arguments[t] : {};
		t % 2
			? km(Object(r), !0).forEach((n) => {
					Ia(e, n, r[n]);
				})
			: Object.getOwnPropertyDescriptors
				? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
				: km(Object(r)).forEach((n) => {
						Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
					});
	}
	return e;
}
function xN(e, t) {
	if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function wN(e, t) {
	for (var r = 0; r < t.length; r++) {
		var n = t[r];
		(n.enumerable = n.enumerable || !1),
			(n.configurable = !0),
			"value" in n && (n.writable = !0),
			Object.defineProperty(e, ow(n.key), n);
	}
}
function ON(e, t, r) {
	return t && wN(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function _N(e, t, r) {
	return (t = Zi(t)), SN(e, aw() ? Reflect.construct(t, r || [], Zi(e).constructor) : t.apply(e, r));
}
function SN(e, t) {
	if (t && (Pr(t) === "object" || typeof t == "function")) return t;
	if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
	return AN(e);
}
function AN(e) {
	if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	return e;
}
function aw() {
	try {
		var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], () => {}));
	} catch {}
	return (aw = () => !!e)();
}
function Zi(e) {
	return (
		(Zi = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : (r) => r.__proto__ || Object.getPrototypeOf(r)), Zi(e)
	);
}
function PN(e, t) {
	if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
	(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } })),
		Object.defineProperty(e, "prototype", { writable: !1 }),
		t && Wl(e, t);
}
function Wl(e, t) {
	return (Wl = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : (n, i) => ((n.__proto__ = i), n)), Wl(e, t);
}
function Ia(e, t, r) {
	return (
		(t = ow(t)),
		t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = r),
		e
	);
}
function ow(e) {
	var t = TN(e, "string");
	return Pr(t) == "symbol" ? t : t + "";
}
function TN(e, t) {
	if (Pr(e) != "object" || !e) return e;
	var r = e[Symbol.toPrimitive];
	if (r !== void 0) {
		var n = r.call(e, t);
		if (Pr(n) != "object") return n;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return String(e);
}
var EN = (t) => {
		var r = t.x,
			n = t.y,
			i = t.xAxis,
			a = t.yAxis,
			o = th({ x: i.scale, y: a.scale }),
			u = o.apply({ x: r, y: n }, { bandAware: !0 });
		return it(t, "discard") && !o.isInRange(u) ? null : u;
	},
	$a = ((e) => {
		function t() {
			return xN(this, t), _N(this, t, arguments);
		}
		return (
			PN(t, e),
			ON(t, [
				{
					key: "render",
					value: function () {
						var n = this.props,
							i = n.x,
							a = n.y,
							o = n.r,
							u = n.alwaysShow,
							c = n.clipPathId,
							s = xe(i),
							f = xe(a);
						if (
							(pt(u === void 0, 'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.'),
							!s || !f)
						)
							return null;
						var l = EN(this.props);
						if (!l) return null;
						var h = l.x,
							p = l.y,
							y = this.props,
							v = y.shape,
							d = y.className,
							b = it(this.props, "hidden") ? "url(#".concat(c, ")") : void 0,
							w = Dm(Dm({ clipPath: b }, ee(this.props, !0)), {}, { cx: h, cy: p });
						return T.createElement(
							_e,
							{ className: ie("recharts-reference-dot", d) },
							t.renderDot(v, w),
							Ee.renderCallByParent(this.props, { x: h - o, y: p - o, width: 2 * o, height: 2 * o }),
						);
					},
				},
			])
		);
	})(T.Component);
Ia($a, "displayName", "ReferenceDot");
Ia($a, "defaultProps", {
	isFront: !1,
	ifOverflow: "discard",
	xAxisId: 0,
	yAxisId: 0,
	r: 10,
	fill: "#fff",
	stroke: "#ccc",
	fillOpacity: 1,
	strokeWidth: 1,
});
Ia($a, "renderDot", (e, t) => {
	var r;
	return (
		T.isValidElement(e)
			? (r = T.cloneElement(e, t))
			: Z(e)
				? (r = e(t))
				: (r = T.createElement(qx, zl({}, t, { cx: t.cx, cy: t.cy, className: "recharts-reference-dot-dot" }))),
		r
	);
});
function Gl() {
	return (
		(Gl = Object.assign
			? Object.assign.bind()
			: (e) => {
					for (var t = 1; t < arguments.length; t++) {
						var r = arguments[t];
						for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
					}
					return e;
				}),
		Gl.apply(this, arguments)
	);
}
function Tr(e) {
	"@babel/helpers - typeof";
	return (
		(Tr =
			typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
				? (t) => typeof t
				: (t) =>
						t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
							? "symbol"
							: typeof t),
		Tr(e)
	);
}
function qm(e, t) {
	var r = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		t && (n = n.filter((i) => Object.getOwnPropertyDescriptor(e, i).enumerable)), r.push.apply(r, n);
	}
	return r;
}
function Lm(e) {
	for (var t = 1; t < arguments.length; t++) {
		var r = arguments[t] != null ? arguments[t] : {};
		t % 2
			? qm(Object(r), !0).forEach((n) => {
					Ra(e, n, r[n]);
				})
			: Object.getOwnPropertyDescriptors
				? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
				: qm(Object(r)).forEach((n) => {
						Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
					});
	}
	return e;
}
function jN(e, t) {
	if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function MN(e, t) {
	for (var r = 0; r < t.length; r++) {
		var n = t[r];
		(n.enumerable = n.enumerable || !1),
			(n.configurable = !0),
			"value" in n && (n.writable = !0),
			Object.defineProperty(e, cw(n.key), n);
	}
}
function CN(e, t, r) {
	return t && MN(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function IN(e, t, r) {
	return (t = Ji(t)), $N(e, uw() ? Reflect.construct(t, r || [], Ji(e).constructor) : t.apply(e, r));
}
function $N(e, t) {
	if (t && (Tr(t) === "object" || typeof t == "function")) return t;
	if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
	return RN(e);
}
function RN(e) {
	if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	return e;
}
function uw() {
	try {
		var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], () => {}));
	} catch {}
	return (uw = () => !!e)();
}
function Ji(e) {
	return (
		(Ji = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : (r) => r.__proto__ || Object.getPrototypeOf(r)), Ji(e)
	);
}
function NN(e, t) {
	if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
	(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } })),
		Object.defineProperty(e, "prototype", { writable: !1 }),
		t && Hl(e, t);
}
function Hl(e, t) {
	return (Hl = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : (n, i) => ((n.__proto__ = i), n)), Hl(e, t);
}
function Ra(e, t, r) {
	return (
		(t = cw(t)),
		t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = r),
		e
	);
}
function cw(e) {
	var t = kN(e, "string");
	return Tr(t) == "symbol" ? t : t + "";
}
function kN(e, t) {
	if (Tr(e) != "object" || !e) return e;
	var r = e[Symbol.toPrimitive];
	if (r !== void 0) {
		var n = r.call(e, t);
		if (Tr(n) != "object") return n;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return String(e);
}
var DN = (t, r, n, i, a) => {
		var o = a.x1,
			u = a.x2,
			c = a.y1,
			s = a.y2,
			f = a.xAxis,
			l = a.yAxis;
		if (!f || !l) return null;
		var h = th({ x: f.scale, y: l.scale }),
			p = {
				x: t ? h.x.apply(o, { position: "start" }) : h.x.rangeMin,
				y: n ? h.y.apply(c, { position: "start" }) : h.y.rangeMin,
			},
			y = {
				x: r ? h.x.apply(u, { position: "end" }) : h.x.rangeMax,
				y: i ? h.y.apply(s, { position: "end" }) : h.y.rangeMax,
			};
		return it(a, "discard") && (!h.isInRange(p) || !h.isInRange(y)) ? null : Vx(p, y);
	},
	Na = ((e) => {
		function t() {
			return jN(this, t), IN(this, t, arguments);
		}
		return (
			NN(t, e),
			CN(t, [
				{
					key: "render",
					value: function () {
						var n = this.props,
							i = n.x1,
							a = n.x2,
							o = n.y1,
							u = n.y2,
							c = n.className,
							s = n.alwaysShow,
							f = n.clipPathId;
						pt(s === void 0, 'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.');
						var l = xe(i),
							h = xe(a),
							p = xe(o),
							y = xe(u),
							v = this.props.shape;
						if (!l && !h && !p && !y && !v) return null;
						var d = DN(l, h, p, y, this.props);
						if (!d && !v) return null;
						var b = it(this.props, "hidden") ? "url(#".concat(f, ")") : void 0;
						return T.createElement(
							_e,
							{ className: ie("recharts-reference-area", c) },
							t.renderRect(v, Lm(Lm({ clipPath: b }, ee(this.props, !0)), d)),
							Ee.renderCallByParent(this.props, d),
						);
					},
				},
			])
		);
	})(T.Component);
Ra(Na, "displayName", "ReferenceArea");
Ra(Na, "defaultProps", {
	isFront: !1,
	ifOverflow: "discard",
	xAxisId: 0,
	yAxisId: 0,
	r: 10,
	fill: "#ccc",
	fillOpacity: 0.5,
	stroke: "none",
	strokeWidth: 1,
});
Ra(Na, "renderRect", (e, t) => {
	var r;
	return (
		T.isValidElement(e)
			? (r = T.cloneElement(e, t))
			: Z(e)
				? (r = e(t))
				: (r = T.createElement(eh, Gl({}, t, { className: "recharts-reference-area-rect" }))),
		r
	);
});
function sw(e, t, r) {
	if (t < 1) return [];
	if (t === 1 && r === void 0) return e;
	for (var n = [], i = 0; i < e.length; i += t) n.push(e[i]);
	return n;
}
function qN(e, t, r) {
	var n = { width: e.width + t.width, height: e.height + t.height };
	return zR(n, r);
}
function LN(e, t, r) {
	var n = r === "width",
		i = e.x,
		a = e.y,
		o = e.width,
		u = e.height;
	return t === 1 ? { start: n ? i : a, end: n ? i + o : a + u } : { start: n ? i + o : a + u, end: n ? i : a };
}
function Qi(e, t, r, n, i) {
	if (e * t < e * n || e * t > e * i) return !1;
	var a = r();
	return e * (t - (e * a) / 2 - n) >= 0 && e * (t + (e * a) / 2 - i) <= 0;
}
function BN(e, t) {
	return sw(e, t + 1);
}
function FN(e, t, r, n, i) {
	for (
		var a = (n || []).slice(),
			o = t.start,
			u = t.end,
			c = 0,
			s = 1,
			f = o,
			l = () => {
				var y = n?.[c];
				if (y === void 0) return { v: sw(n, s) };
				var v = c,
					d,
					b = () => (d === void 0 && (d = r(y, v)), d),
					w = y.coordinate,
					x = c === 0 || Qi(e, w, b, f, u);
				x || ((c = 0), (f = o), (s += 1)), x && ((f = w + e * (b() / 2 + i)), (c += s));
			},
			h;
		s <= a.length;
	)
		if (((h = l()), h)) return h.v;
	return [];
}
function Dn(e) {
	"@babel/helpers - typeof";
	return (
		(Dn =
			typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
				? (t) => typeof t
				: (t) =>
						t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
							? "symbol"
							: typeof t),
		Dn(e)
	);
}
function Bm(e, t) {
	var r = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		t && (n = n.filter((i) => Object.getOwnPropertyDescriptor(e, i).enumerable)), r.push.apply(r, n);
	}
	return r;
}
function Te(e) {
	for (var t = 1; t < arguments.length; t++) {
		var r = arguments[t] != null ? arguments[t] : {};
		t % 2
			? Bm(Object(r), !0).forEach((n) => {
					UN(e, n, r[n]);
				})
			: Object.getOwnPropertyDescriptors
				? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
				: Bm(Object(r)).forEach((n) => {
						Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
					});
	}
	return e;
}
function UN(e, t, r) {
	return (
		(t = zN(t)),
		t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = r),
		e
	);
}
function zN(e) {
	var t = WN(e, "string");
	return Dn(t) == "symbol" ? t : t + "";
}
function WN(e, t) {
	if (Dn(e) != "object" || !e) return e;
	var r = e[Symbol.toPrimitive];
	if (r !== void 0) {
		var n = r.call(e, t);
		if (Dn(n) != "object") return n;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function GN(e, t, r, n, i) {
	for (
		var a = (n || []).slice(),
			o = a.length,
			u = t.start,
			c = t.end,
			s = (h) => {
				var p = a[h],
					y,
					v = () => (y === void 0 && (y = r(p, h)), y);
				if (h === o - 1) {
					var d = e * (p.coordinate + (e * v()) / 2 - c);
					a[h] = p = Te(Te({}, p), {}, { tickCoord: d > 0 ? p.coordinate - d * e : p.coordinate });
				} else a[h] = p = Te(Te({}, p), {}, { tickCoord: p.coordinate });
				var b = Qi(e, p.tickCoord, v, u, c);
				b && ((c = p.tickCoord - e * (v() / 2 + i)), (a[h] = Te(Te({}, p), {}, { isShow: !0 })));
			},
			f = o - 1;
		f >= 0;
		f--
	)
		s(f);
	return a;
}
function HN(e, t, r, n, i, a) {
	var o = (n || []).slice(),
		u = o.length,
		c = t.start,
		s = t.end;
	if (a) {
		var f = n[u - 1],
			l = r(f, u - 1),
			h = e * (f.coordinate + (e * l) / 2 - s);
		o[u - 1] = f = Te(Te({}, f), {}, { tickCoord: h > 0 ? f.coordinate - h * e : f.coordinate });
		var p = Qi(e, f.tickCoord, () => l, c, s);
		p && ((s = f.tickCoord - e * (l / 2 + i)), (o[u - 1] = Te(Te({}, f), {}, { isShow: !0 })));
	}
	for (
		var y = a ? u - 1 : u,
			v = (w) => {
				var x = o[w],
					O,
					g = () => (O === void 0 && (O = r(x, w)), O);
				if (w === 0) {
					var m = e * (x.coordinate - (e * g()) / 2 - c);
					o[w] = x = Te(Te({}, x), {}, { tickCoord: m < 0 ? x.coordinate - m * e : x.coordinate });
				} else o[w] = x = Te(Te({}, x), {}, { tickCoord: x.coordinate });
				var _ = Qi(e, x.tickCoord, g, c, s);
				_ && ((c = x.tickCoord + e * (g() / 2 + i)), (o[w] = Te(Te({}, x), {}, { isShow: !0 })));
			},
			d = 0;
		d < y;
		d++
	)
		v(d);
	return o;
}
function ch(e, t, r) {
	var n = e.tick,
		i = e.ticks,
		a = e.viewBox,
		o = e.minTickGap,
		u = e.orientation,
		c = e.interval,
		s = e.tickFormatter,
		f = e.unit,
		l = e.angle;
	if (!i || !i.length || !n) return [];
	if (B(c) || Wn.isSsr) return BN(i, typeof c == "number" && B(c) ? c : 0);
	var h = [],
		p = u === "top" || u === "bottom" ? "width" : "height",
		y = f && p === "width" ? en(f, { fontSize: t, letterSpacing: r }) : { width: 0, height: 0 },
		v = (x, O) => {
			var g = Z(s) ? s(x.value, O) : x.value;
			return p === "width"
				? qN(en(g, { fontSize: t, letterSpacing: r }), y, l)
				: en(g, { fontSize: t, letterSpacing: r })[p];
		},
		d = i.length >= 2 ? Ze(i[1].coordinate - i[0].coordinate) : 1,
		b = LN(a, d, p);
	return c === "equidistantPreserveStart"
		? FN(d, b, v, i, o)
		: (c === "preserveStart" || c === "preserveStartEnd"
				? (h = HN(d, b, v, i, o, c === "preserveStartEnd"))
				: (h = GN(d, b, v, i, o)),
			h.filter((w) => w.isShow));
}
var KN = ["viewBox"],
	VN = ["viewBox"],
	XN = ["ticks"];
function Er(e) {
	"@babel/helpers - typeof";
	return (
		(Er =
			typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
				? (t) => typeof t
				: (t) =>
						t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
							? "symbol"
							: typeof t),
		Er(e)
	);
}
function or() {
	return (
		(or = Object.assign
			? Object.assign.bind()
			: (e) => {
					for (var t = 1; t < arguments.length; t++) {
						var r = arguments[t];
						for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
					}
					return e;
				}),
		or.apply(this, arguments)
	);
}
function Fm(e, t) {
	var r = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		t && (n = n.filter((i) => Object.getOwnPropertyDescriptor(e, i).enumerable)), r.push.apply(r, n);
	}
	return r;
}
function Me(e) {
	for (var t = 1; t < arguments.length; t++) {
		var r = arguments[t] != null ? arguments[t] : {};
		t % 2
			? Fm(Object(r), !0).forEach((n) => {
					sh(e, n, r[n]);
				})
			: Object.getOwnPropertyDescriptors
				? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
				: Fm(Object(r)).forEach((n) => {
						Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
					});
	}
	return e;
}
function ks(e, t) {
	if (e == null) return {};
	var r = YN(e, t),
		n,
		i;
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (i = 0; i < a.length; i++)
			(n = a[i]), !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
	}
	return r;
}
function YN(e, t) {
	if (e == null) return {};
	var r = {};
	for (var n in e)
		if (Object.prototype.hasOwnProperty.call(e, n)) {
			if (t.indexOf(n) >= 0) continue;
			r[n] = e[n];
		}
	return r;
}
function ZN(e, t) {
	if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function Um(e, t) {
	for (var r = 0; r < t.length; r++) {
		var n = t[r];
		(n.enumerable = n.enumerable || !1),
			(n.configurable = !0),
			"value" in n && (n.writable = !0),
			Object.defineProperty(e, fw(n.key), n);
	}
}
function JN(e, t, r) {
	return t && Um(e.prototype, t), r && Um(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function QN(e, t, r) {
	return (t = ea(t)), ek(e, lw() ? Reflect.construct(t, r || [], ea(e).constructor) : t.apply(e, r));
}
function ek(e, t) {
	if (t && (Er(t) === "object" || typeof t == "function")) return t;
	if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
	return tk(e);
}
function tk(e) {
	if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	return e;
}
function lw() {
	try {
		var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], () => {}));
	} catch {}
	return (lw = () => !!e)();
}
function ea(e) {
	return (
		(ea = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : (r) => r.__proto__ || Object.getPrototypeOf(r)), ea(e)
	);
}
function rk(e, t) {
	if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
	(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } })),
		Object.defineProperty(e, "prototype", { writable: !1 }),
		t && Kl(e, t);
}
function Kl(e, t) {
	return (Kl = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : (n, i) => ((n.__proto__ = i), n)), Kl(e, t);
}
function sh(e, t, r) {
	return (
		(t = fw(t)),
		t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = r),
		e
	);
}
function fw(e) {
	var t = nk(e, "string");
	return Er(t) == "symbol" ? t : t + "";
}
function nk(e, t) {
	if (Er(e) != "object" || !e) return e;
	var r = e[Symbol.toPrimitive];
	if (r !== void 0) {
		var n = r.call(e, t);
		if (Er(n) != "object") return n;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return String(e);
}
var Br = ((e) => {
	function t(r) {
		var n;
		return ZN(this, t), (n = QN(this, t, [r])), (n.state = { fontSize: "", letterSpacing: "" }), n;
	}
	return (
		rk(t, e),
		JN(
			t,
			[
				{
					key: "shouldComponentUpdate",
					value: function (n, i) {
						var a = n.viewBox,
							o = ks(n, KN),
							u = this.props,
							c = u.viewBox,
							s = ks(u, VN);
						return !cr(a, c) || !cr(o, s) || !cr(i, this.state);
					},
				},
				{
					key: "componentDidMount",
					value: function () {
						var n = this.layerReference;
						if (n) {
							var i = n.getElementsByClassName("recharts-cartesian-axis-tick-value")[0];
							i &&
								this.setState({
									fontSize: window.getComputedStyle(i).fontSize,
									letterSpacing: window.getComputedStyle(i).letterSpacing,
								});
						}
					},
				},
				{
					key: "getTickLineCoord",
					value: function (n) {
						var i = this.props,
							a = i.x,
							o = i.y,
							u = i.width,
							c = i.height,
							s = i.orientation,
							f = i.tickSize,
							l = i.mirror,
							h = i.tickMargin,
							p,
							y,
							v,
							d,
							b,
							w,
							x = l ? -1 : 1,
							O = n.tickSize || f,
							g = B(n.tickCoord) ? n.tickCoord : n.coordinate;
						switch (s) {
							case "top":
								(p = y = n.coordinate), (d = o + +!l * c), (v = d - x * O), (w = v - x * h), (b = g);
								break;
							case "left":
								(v = d = n.coordinate), (y = a + +!l * u), (p = y - x * O), (b = p - x * h), (w = g);
								break;
							case "right":
								(v = d = n.coordinate), (y = a + +l * u), (p = y + x * O), (b = p + x * h), (w = g);
								break;
							default:
								(p = y = n.coordinate), (d = o + +l * c), (v = d + x * O), (w = v + x * h), (b = g);
								break;
						}
						return { line: { x1: p, y1: v, x2: y, y2: d }, tick: { x: b, y: w } };
					},
				},
				{
					key: "getTickTextAnchor",
					value: function () {
						var n = this.props,
							i = n.orientation,
							a = n.mirror,
							o;
						switch (i) {
							case "left":
								o = a ? "start" : "end";
								break;
							case "right":
								o = a ? "end" : "start";
								break;
							default:
								o = "middle";
								break;
						}
						return o;
					},
				},
				{
					key: "getTickVerticalAnchor",
					value: function () {
						var n = this.props,
							i = n.orientation,
							a = n.mirror,
							o = "end";
						switch (i) {
							case "left":
							case "right":
								o = "middle";
								break;
							case "top":
								o = a ? "start" : "end";
								break;
							default:
								o = a ? "end" : "start";
								break;
						}
						return o;
					},
				},
				{
					key: "renderAxisLine",
					value: function () {
						var n = this.props,
							i = n.x,
							a = n.y,
							o = n.width,
							u = n.height,
							c = n.orientation,
							s = n.mirror,
							f = n.axisLine,
							l = Me(Me(Me({}, ee(this.props, !1)), ee(f, !1)), {}, { fill: "none" });
						if (c === "top" || c === "bottom") {
							var h = +((c === "top" && !s) || (c === "bottom" && s));
							l = Me(Me({}, l), {}, { x1: i, y1: a + h * u, x2: i + o, y2: a + h * u });
						} else {
							var p = +((c === "left" && !s) || (c === "right" && s));
							l = Me(Me({}, l), {}, { x1: i + p * o, y1: a, x2: i + p * o, y2: a + u });
						}
						return T.createElement(
							"line",
							or({}, l, { className: ie("recharts-cartesian-axis-line", ze(f, "className")) }),
						);
					},
				},
				{
					key: "renderTicks",
					value: function (n, i, a) {
						var u = this.props,
							c = u.tickLine,
							s = u.stroke,
							f = u.tick,
							l = u.tickFormatter,
							h = u.unit,
							p = ch(Me(Me({}, this.props), {}, { ticks: n }), i, a),
							y = this.getTickTextAnchor(),
							v = this.getTickVerticalAnchor(),
							d = ee(this.props, !1),
							b = ee(f, !1),
							w = Me(Me({}, d), {}, { fill: "none" }, ee(c, !1)),
							x = p.map((O, g) => {
								var m = this.getTickLineCoord(O),
									_ = m.line,
									S = m.tick,
									P = Me(
										Me(Me(Me({ textAnchor: y, verticalAnchor: v }, d), {}, { stroke: "none", fill: s }, b), S),
										{},
										{ index: g, payload: O, visibleTicksCount: p.length, tickFormatter: l },
									);
								return T.createElement(
									_e,
									or(
										{
											className: "recharts-cartesian-axis-tick",
											key: "tick-".concat(O.value, "-").concat(O.coordinate, "-").concat(O.tickCoord),
										},
										fi(this.props, O, g),
									),
									c &&
										T.createElement(
											"line",
											or({}, w, _, { className: ie("recharts-cartesian-axis-tick-line", ze(c, "className")) }),
										),
									f && t.renderTickItem(f, P, "".concat(Z(l) ? l(O.value, g) : O.value).concat(h || "")),
								);
							});
						return T.createElement("g", { className: "recharts-cartesian-axis-ticks" }, x);
					},
				},
				{
					key: "render",
					value: function () {
						var i = this.props,
							a = i.axisLine,
							o = i.width,
							u = i.height,
							c = i.ticksGenerator,
							s = i.className,
							f = i.hide;
						if (f) return null;
						var l = this.props,
							h = l.ticks,
							p = ks(l, XN),
							y = h;
						return (
							Z(c) && (y = h && h.length > 0 ? c(this.props) : c(p)),
							o <= 0 || u <= 0 || !y || !y.length
								? null
								: T.createElement(
										_e,
										{
											className: ie("recharts-cartesian-axis", s),
											ref: (d) => {
												this.layerReference = d;
											},
										},
										a && this.renderAxisLine(),
										this.renderTicks(y, this.state.fontSize, this.state.letterSpacing),
										Ee.renderCallByParent(this.props),
									)
						);
					},
				},
			],
			[
				{
					key: "renderTickItem",
					value: (n, i, a) => {
						var o;
						return (
							T.isValidElement(n)
								? (o = T.cloneElement(n, i))
								: Z(n)
									? (o = n(i))
									: (o = T.createElement(Oi, or({}, i, { className: "recharts-cartesian-axis-tick-value" }), a)),
							o
						);
					},
				},
			],
		)
	);
})(k.Component);
sh(Br, "displayName", "CartesianAxis");
sh(Br, "defaultProps", {
	x: 0,
	y: 0,
	width: 0,
	height: 0,
	viewBox: { x: 0, y: 0, width: 0, height: 0 },
	orientation: "bottom",
	ticks: [],
	stroke: "#666",
	tickLine: !0,
	axisLine: !0,
	tick: !0,
	mirror: !1,
	minTickGap: 5,
	tickSize: 6,
	tickMargin: 2,
	interval: "preserveEnd",
});
var ik = ["x1", "y1", "x2", "y2", "key"],
	ak = ["offset"];
function Xt(e) {
	"@babel/helpers - typeof";
	return (
		(Xt =
			typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
				? (t) => typeof t
				: (t) =>
						t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
							? "symbol"
							: typeof t),
		Xt(e)
	);
}
function zm(e, t) {
	var r = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		t && (n = n.filter((i) => Object.getOwnPropertyDescriptor(e, i).enumerable)), r.push.apply(r, n);
	}
	return r;
}
function je(e) {
	for (var t = 1; t < arguments.length; t++) {
		var r = arguments[t] != null ? arguments[t] : {};
		t % 2
			? zm(Object(r), !0).forEach((n) => {
					ok(e, n, r[n]);
				})
			: Object.getOwnPropertyDescriptors
				? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
				: zm(Object(r)).forEach((n) => {
						Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
					});
	}
	return e;
}
function ok(e, t, r) {
	return (
		(t = uk(t)),
		t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = r),
		e
	);
}
function uk(e) {
	var t = ck(e, "string");
	return Xt(t) == "symbol" ? t : t + "";
}
function ck(e, t) {
	if (Xt(e) != "object" || !e) return e;
	var r = e[Symbol.toPrimitive];
	if (r !== void 0) {
		var n = r.call(e, t);
		if (Xt(n) != "object") return n;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function zt() {
	return (
		(zt = Object.assign
			? Object.assign.bind()
			: (e) => {
					for (var t = 1; t < arguments.length; t++) {
						var r = arguments[t];
						for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
					}
					return e;
				}),
		zt.apply(this, arguments)
	);
}
function Wm(e, t) {
	if (e == null) return {};
	var r = sk(e, t),
		n,
		i;
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (i = 0; i < a.length; i++)
			(n = a[i]), !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
	}
	return r;
}
function sk(e, t) {
	if (e == null) return {};
	var r = {};
	for (var n in e)
		if (Object.prototype.hasOwnProperty.call(e, n)) {
			if (t.indexOf(n) >= 0) continue;
			r[n] = e[n];
		}
	return r;
}
var lk = (t) => {
	var r = t.fill;
	if (!r || r === "none") return null;
	var n = t.fillOpacity,
		i = t.x,
		a = t.y,
		o = t.width,
		u = t.height,
		c = t.ry;
	return T.createElement("rect", {
		x: i,
		y: a,
		ry: c,
		width: o,
		height: u,
		stroke: "none",
		fill: r,
		fillOpacity: n,
		className: "recharts-cartesian-grid-bg",
	});
};
function hw(e, t) {
	var r;
	if (T.isValidElement(e)) r = T.cloneElement(e, t);
	else if (Z(e)) r = e(t);
	else {
		var n = t.x1,
			i = t.y1,
			a = t.x2,
			o = t.y2,
			u = t.key,
			c = Wm(t, ik),
			s = ee(c, !1);
		s.offset;
		var f = Wm(s, ak);
		r = T.createElement("line", zt({}, f, { x1: n, y1: i, x2: a, y2: o, fill: "none", key: u }));
	}
	return r;
}
function fk(e) {
	var t = e.x,
		r = e.width,
		n = e.horizontal,
		i = n === void 0 ? !0 : n,
		a = e.horizontalPoints;
	if (!i || !a || !a.length) return null;
	var o = a.map((u, c) => {
		var s = je(je({}, e), {}, { x1: t, y1: u, x2: t + r, y2: u, key: "line-".concat(c), index: c });
		return hw(i, s);
	});
	return T.createElement("g", { className: "recharts-cartesian-grid-horizontal" }, o);
}
function hk(e) {
	var t = e.y,
		r = e.height,
		n = e.vertical,
		i = n === void 0 ? !0 : n,
		a = e.verticalPoints;
	if (!i || !a || !a.length) return null;
	var o = a.map((u, c) => {
		var s = je(je({}, e), {}, { x1: u, y1: t, x2: u, y2: t + r, key: "line-".concat(c), index: c });
		return hw(i, s);
	});
	return T.createElement("g", { className: "recharts-cartesian-grid-vertical" }, o);
}
function dk(e) {
	var t = e.horizontalFill,
		r = e.fillOpacity,
		n = e.x,
		i = e.y,
		a = e.width,
		o = e.height,
		u = e.horizontalPoints,
		c = e.horizontal,
		s = c === void 0 ? !0 : c;
	if (!s || !t || !t.length) return null;
	var f = u.map((h) => Math.round(h + i - i)).sort((h, p) => h - p);
	i !== f[0] && f.unshift(0);
	var l = f.map((h, p) => {
		var y = !f[p + 1],
			v = y ? i + o - h : f[p + 1] - h;
		if (v <= 0) return null;
		var d = p % t.length;
		return T.createElement("rect", {
			key: "react-".concat(p),
			y: h,
			x: n,
			height: v,
			width: a,
			stroke: "none",
			fill: t[d],
			fillOpacity: r,
			className: "recharts-cartesian-grid-bg",
		});
	});
	return T.createElement("g", { className: "recharts-cartesian-gridstripes-horizontal" }, l);
}
function pk(e) {
	var t = e.vertical,
		r = t === void 0 ? !0 : t,
		n = e.verticalFill,
		i = e.fillOpacity,
		a = e.x,
		o = e.y,
		u = e.width,
		c = e.height,
		s = e.verticalPoints;
	if (!r || !n || !n.length) return null;
	var f = s.map((h) => Math.round(h + a - a)).sort((h, p) => h - p);
	a !== f[0] && f.unshift(0);
	var l = f.map((h, p) => {
		var y = !f[p + 1],
			v = y ? a + u - h : f[p + 1] - h;
		if (v <= 0) return null;
		var d = p % n.length;
		return T.createElement("rect", {
			key: "react-".concat(p),
			x: h,
			y: o,
			width: v,
			height: c,
			stroke: "none",
			fill: n[d],
			fillOpacity: i,
			className: "recharts-cartesian-grid-bg",
		});
	});
	return T.createElement("g", { className: "recharts-cartesian-gridstripes-vertical" }, l);
}
var vk = (t, r) => {
		var n = t.xAxis,
			i = t.width,
			a = t.height,
			o = t.offset;
		return Ax(
			ch(je(je(je({}, Br.defaultProps), n), {}, { ticks: ft(n, !0), viewBox: { x: 0, y: 0, width: i, height: a } })),
			o.left,
			o.left + o.width,
			r,
		);
	},
	yk = (t, r) => {
		var n = t.yAxis,
			i = t.width,
			a = t.height,
			o = t.offset;
		return Ax(
			ch(je(je(je({}, Br.defaultProps), n), {}, { ticks: ft(n, !0), viewBox: { x: 0, y: 0, width: i, height: a } })),
			o.top,
			o.top + o.height,
			r,
		);
	},
	ir = { horizontal: !0, vertical: !0, stroke: "#ccc", fill: "none", verticalFill: [], horizontalFill: [] };
function ka(e) {
	var t,
		r,
		n,
		i,
		a,
		o,
		u = ih(),
		c = ah(),
		s = nN(),
		f = je(
			je({}, e),
			{},
			{
				stroke: (t = e.stroke) !== null && t !== void 0 ? t : ir.stroke,
				fill: (r = e.fill) !== null && r !== void 0 ? r : ir.fill,
				horizontal: (n = e.horizontal) !== null && n !== void 0 ? n : ir.horizontal,
				horizontalFill: (i = e.horizontalFill) !== null && i !== void 0 ? i : ir.horizontalFill,
				vertical: (a = e.vertical) !== null && a !== void 0 ? a : ir.vertical,
				verticalFill: (o = e.verticalFill) !== null && o !== void 0 ? o : ir.verticalFill,
				x: B(e.x) ? e.x : s.left,
				y: B(e.y) ? e.y : s.top,
				width: B(e.width) ? e.width : s.width,
				height: B(e.height) ? e.height : s.height,
			},
		),
		l = f.x,
		h = f.y,
		p = f.width,
		y = f.height,
		v = f.syncWithTicks,
		d = f.horizontalValues,
		b = f.verticalValues,
		w = eN(),
		x = tN();
	if (!B(p) || p <= 0 || !B(y) || y <= 0 || !B(l) || l !== +l || !B(h) || h !== +h) return null;
	var O = f.verticalCoordinatesGenerator || vk,
		g = f.horizontalCoordinatesGenerator || yk,
		m = f.horizontalPoints,
		_ = f.verticalPoints;
	if ((!m || !m.length) && Z(g)) {
		var S = d && d.length,
			P = g(
				{ yAxis: x ? je(je({}, x), {}, { ticks: S ? d : x.ticks }) : void 0, width: u, height: c, offset: s },
				S ? !0 : v,
			);
		pt(
			Array.isArray(P),
			"horizontalCoordinatesGenerator should return Array but instead it returned [".concat(Xt(P), "]"),
		),
			Array.isArray(P) && (m = P);
	}
	if ((!_ || !_.length) && Z(O)) {
		var M = b && b.length,
			A = O(
				{ xAxis: w ? je(je({}, w), {}, { ticks: M ? b : w.ticks }) : void 0, width: u, height: c, offset: s },
				M ? !0 : v,
			);
		pt(
			Array.isArray(A),
			"verticalCoordinatesGenerator should return Array but instead it returned [".concat(Xt(A), "]"),
		),
			Array.isArray(A) && (_ = A);
	}
	return T.createElement(
		"g",
		{ className: "recharts-cartesian-grid" },
		T.createElement(lk, {
			fill: f.fill,
			fillOpacity: f.fillOpacity,
			x: f.x,
			y: f.y,
			width: f.width,
			height: f.height,
			ry: f.ry,
		}),
		T.createElement(fk, zt({}, f, { offset: s, horizontalPoints: m, xAxis: w, yAxis: x })),
		T.createElement(hk, zt({}, f, { offset: s, verticalPoints: _, xAxis: w, yAxis: x })),
		T.createElement(dk, zt({}, f, { horizontalPoints: m })),
		T.createElement(pk, zt({}, f, { verticalPoints: _ })),
	);
}
ka.displayName = "CartesianGrid";
function jr(e) {
	"@babel/helpers - typeof";
	return (
		(jr =
			typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
				? (t) => typeof t
				: (t) =>
						t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
							? "symbol"
							: typeof t),
		jr(e)
	);
}
function gk(e, t) {
	if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function mk(e, t) {
	for (var r = 0; r < t.length; r++) {
		var n = t[r];
		(n.enumerable = n.enumerable || !1),
			(n.configurable = !0),
			"value" in n && (n.writable = !0),
			Object.defineProperty(e, vw(n.key), n);
	}
}
function bk(e, t, r) {
	return t && mk(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function xk(e, t, r) {
	return (t = ta(t)), wk(e, dw() ? Reflect.construct(t, r || [], ta(e).constructor) : t.apply(e, r));
}
function wk(e, t) {
	if (t && (jr(t) === "object" || typeof t == "function")) return t;
	if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
	return Ok(e);
}
function Ok(e) {
	if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	return e;
}
function dw() {
	try {
		var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], () => {}));
	} catch {}
	return (dw = () => !!e)();
}
function ta(e) {
	return (
		(ta = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : (r) => r.__proto__ || Object.getPrototypeOf(r)), ta(e)
	);
}
function _k(e, t) {
	if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
	(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } })),
		Object.defineProperty(e, "prototype", { writable: !1 }),
		t && Vl(e, t);
}
function Vl(e, t) {
	return (Vl = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : (n, i) => ((n.__proto__ = i), n)), Vl(e, t);
}
function pw(e, t, r) {
	return (
		(t = vw(t)),
		t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = r),
		e
	);
}
function vw(e) {
	var t = Sk(e, "string");
	return jr(t) == "symbol" ? t : t + "";
}
function Sk(e, t) {
	if (jr(e) != "object" || !e) return e;
	var r = e[Symbol.toPrimitive];
	if (r !== void 0) {
		var n = r.call(e, t);
		if (jr(n) != "object") return n;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return String(e);
}
function Xl() {
	return (
		(Xl = Object.assign
			? Object.assign.bind()
			: (e) => {
					for (var t = 1; t < arguments.length; t++) {
						var r = arguments[t];
						for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
					}
					return e;
				}),
		Xl.apply(this, arguments)
	);
}
function Ak(e) {
	var t = e.xAxisId,
		r = ih(),
		n = ah(),
		i = tw(t);
	return i == null
		? null
		: T.createElement(
				Br,
				Xl({}, i, {
					className: ie("recharts-".concat(i.axisType, " ").concat(i.axisType), i.className),
					viewBox: { x: 0, y: 0, width: r, height: n },
					ticksGenerator: (o) => ft(o, !0),
				}),
			);
}
var Fr = ((e) => {
	function t() {
		return gk(this, t), xk(this, t, arguments);
	}
	return (
		_k(t, e),
		bk(t, [
			{
				key: "render",
				value: function () {
					return T.createElement(Ak, this.props);
				},
			},
		])
	);
})(T.Component);
pw(Fr, "displayName", "XAxis");
pw(Fr, "defaultProps", {
	allowDecimals: !0,
	hide: !1,
	orientation: "bottom",
	width: 0,
	height: 30,
	mirror: !1,
	xAxisId: 0,
	tickCount: 5,
	type: "category",
	padding: { left: 0, right: 0 },
	allowDataOverflow: !1,
	scale: "auto",
	reversed: !1,
	allowDuplicatedCategory: !0,
});
function Mr(e) {
	"@babel/helpers - typeof";
	return (
		(Mr =
			typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
				? (t) => typeof t
				: (t) =>
						t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
							? "symbol"
							: typeof t),
		Mr(e)
	);
}
function Pk(e, t) {
	if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function Tk(e, t) {
	for (var r = 0; r < t.length; r++) {
		var n = t[r];
		(n.enumerable = n.enumerable || !1),
			(n.configurable = !0),
			"value" in n && (n.writable = !0),
			Object.defineProperty(e, mw(n.key), n);
	}
}
function Ek(e, t, r) {
	return t && Tk(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function jk(e, t, r) {
	return (t = ra(t)), Mk(e, yw() ? Reflect.construct(t, r || [], ra(e).constructor) : t.apply(e, r));
}
function Mk(e, t) {
	if (t && (Mr(t) === "object" || typeof t == "function")) return t;
	if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
	return Ck(e);
}
function Ck(e) {
	if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	return e;
}
function yw() {
	try {
		var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], () => {}));
	} catch {}
	return (yw = () => !!e)();
}
function ra(e) {
	return (
		(ra = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : (r) => r.__proto__ || Object.getPrototypeOf(r)), ra(e)
	);
}
function Ik(e, t) {
	if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
	(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } })),
		Object.defineProperty(e, "prototype", { writable: !1 }),
		t && Yl(e, t);
}
function Yl(e, t) {
	return (Yl = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : (n, i) => ((n.__proto__ = i), n)), Yl(e, t);
}
function gw(e, t, r) {
	return (
		(t = mw(t)),
		t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = r),
		e
	);
}
function mw(e) {
	var t = $k(e, "string");
	return Mr(t) == "symbol" ? t : t + "";
}
function $k(e, t) {
	if (Mr(e) != "object" || !e) return e;
	var r = e[Symbol.toPrimitive];
	if (r !== void 0) {
		var n = r.call(e, t);
		if (Mr(n) != "object") return n;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function Zl() {
	return (
		(Zl = Object.assign
			? Object.assign.bind()
			: (e) => {
					for (var t = 1; t < arguments.length; t++) {
						var r = arguments[t];
						for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
					}
					return e;
				}),
		Zl.apply(this, arguments)
	);
}
var Rk = (t) => {
		var r = t.yAxisId,
			n = ih(),
			i = ah(),
			a = rw(r);
		return a == null
			? null
			: T.createElement(
					Br,
					Zl({}, a, {
						className: ie("recharts-".concat(a.axisType, " ").concat(a.axisType), a.className),
						viewBox: { x: 0, y: 0, width: n, height: i },
						ticksGenerator: (u) => ft(u, !0),
					}),
				);
	},
	lh = ((e) => {
		function t() {
			return Pk(this, t), jk(this, t, arguments);
		}
		return (
			Ik(t, e),
			Ek(t, [
				{
					key: "render",
					value: function () {
						return T.createElement(Rk, this.props);
					},
				},
			])
		);
	})(T.Component);
gw(lh, "displayName", "YAxis");
gw(lh, "defaultProps", {
	allowDuplicatedCategory: !0,
	allowDecimals: !0,
	hide: !1,
	orientation: "left",
	width: 60,
	height: 0,
	mirror: !1,
	yAxisId: 0,
	tickCount: 5,
	type: "number",
	padding: { top: 0, bottom: 0 },
	allowDataOverflow: !1,
	scale: "auto",
	reversed: !1,
});
function Gm(e) {
	return qk(e) || Dk(e) || kk(e) || Nk();
}
function Nk() {
	throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function kk(e, t) {
	if (e) {
		if (typeof e == "string") return Jl(e, t);
		var r = Object.prototype.toString.call(e).slice(8, -1);
		if ((r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set")) return Array.from(e);
		if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Jl(e, t);
	}
}
function Dk(e) {
	if ((typeof Symbol < "u" && e[Symbol.iterator] != null) || e["@@iterator"] != null) return Array.from(e);
}
function qk(e) {
	if (Array.isArray(e)) return Jl(e);
}
function Jl(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
	return n;
}
var Ql = (t, r, n, i, a) => {
		var o = Je(t, uh),
			u = Je(t, $a),
			c = [].concat(Gm(o), Gm(u)),
			s = Je(t, Na),
			f = "".concat(i, "Id"),
			l = i[0],
			h = r;
		if (
			(c.length &&
				(h = c.reduce((v, d) => {
					if (d.props[f] === n && it(d.props, "extendDomain") && B(d.props[l])) {
						var b = d.props[l];
						return [Math.min(v[0], b), Math.max(v[1], b)];
					}
					return v;
				}, h)),
			s.length)
		) {
			var p = "".concat(l, "1"),
				y = "".concat(l, "2");
			h = s.reduce((v, d) => {
				if (d.props[f] === n && it(d.props, "extendDomain") && B(d.props[p]) && B(d.props[y])) {
					var b = d.props[p],
						w = d.props[y];
					return [Math.min(v[0], b, w), Math.max(v[1], b, w)];
				}
				return v;
			}, h);
		}
		return a && a.length && (h = a.reduce((v, d) => (B(d) ? [Math.min(v[0], d), Math.max(v[1], d)] : v), h)), h;
	},
	Ds = { exports: {} },
	Hm;
function Lk() {
	return (
		Hm ||
			((Hm = 1),
			((e) => {
				var t = Object.prototype.hasOwnProperty,
					r = "~";
				function n() {}
				Object.create && ((n.prototype = Object.create(null)), new n().__proto__ || (r = !1));
				function i(c, s, f) {
					(this.fn = c), (this.context = s), (this.once = f || !1);
				}
				function a(c, s, f, l, h) {
					if (typeof f != "function") throw new TypeError("The listener must be a function");
					var p = new i(f, l || c, h),
						y = r ? r + s : s;
					return (
						c._events[y]
							? c._events[y].fn
								? (c._events[y] = [c._events[y], p])
								: c._events[y].push(p)
							: ((c._events[y] = p), c._eventsCount++),
						c
					);
				}
				function o(c, s) {
					--c._eventsCount === 0 ? (c._events = new n()) : delete c._events[s];
				}
				function u() {
					(this._events = new n()), (this._eventsCount = 0);
				}
				(u.prototype.eventNames = function () {
					var s = [],
						f,
						l;
					if (this._eventsCount === 0) return s;
					for (l in (f = this._events)) t.call(f, l) && s.push(r ? l.slice(1) : l);
					return Object.getOwnPropertySymbols ? s.concat(Object.getOwnPropertySymbols(f)) : s;
				}),
					(u.prototype.listeners = function (s) {
						var f = r ? r + s : s,
							l = this._events[f];
						if (!l) return [];
						if (l.fn) return [l.fn];
						for (var h = 0, p = l.length, y = new Array(p); h < p; h++) y[h] = l[h].fn;
						return y;
					}),
					(u.prototype.listenerCount = function (s) {
						var f = r ? r + s : s,
							l = this._events[f];
						return l ? (l.fn ? 1 : l.length) : 0;
					}),
					(u.prototype.emit = function (s, f, l, h, p, y) {
						var v = r ? r + s : s;
						if (!this._events[v]) return !1;
						var d = this._events[v],
							b = arguments.length,
							w,
							x;
						if (d.fn) {
							switch ((d.once && this.removeListener(s, d.fn, void 0, !0), b)) {
								case 1:
									return d.fn.call(d.context), !0;
								case 2:
									return d.fn.call(d.context, f), !0;
								case 3:
									return d.fn.call(d.context, f, l), !0;
								case 4:
									return d.fn.call(d.context, f, l, h), !0;
								case 5:
									return d.fn.call(d.context, f, l, h, p), !0;
								case 6:
									return d.fn.call(d.context, f, l, h, p, y), !0;
							}
							for (x = 1, w = new Array(b - 1); x < b; x++) w[x - 1] = arguments[x];
							d.fn.apply(d.context, w);
						} else {
							var O = d.length,
								g;
							for (x = 0; x < O; x++)
								switch ((d[x].once && this.removeListener(s, d[x].fn, void 0, !0), b)) {
									case 1:
										d[x].fn.call(d[x].context);
										break;
									case 2:
										d[x].fn.call(d[x].context, f);
										break;
									case 3:
										d[x].fn.call(d[x].context, f, l);
										break;
									case 4:
										d[x].fn.call(d[x].context, f, l, h);
										break;
									default:
										if (!w) for (g = 1, w = new Array(b - 1); g < b; g++) w[g - 1] = arguments[g];
										d[x].fn.apply(d[x].context, w);
								}
						}
						return !0;
					}),
					(u.prototype.on = function (s, f, l) {
						return a(this, s, f, l, !1);
					}),
					(u.prototype.once = function (s, f, l) {
						return a(this, s, f, l, !0);
					}),
					(u.prototype.removeListener = function (s, f, l, h) {
						var p = r ? r + s : s;
						if (!this._events[p]) return this;
						if (!f) return o(this, p), this;
						var y = this._events[p];
						if (y.fn) y.fn === f && (!h || y.once) && (!l || y.context === l) && o(this, p);
						else {
							for (var v = 0, d = [], b = y.length; v < b; v++)
								(y[v].fn !== f || (h && !y[v].once) || (l && y[v].context !== l)) && d.push(y[v]);
							d.length ? (this._events[p] = d.length === 1 ? d[0] : d) : o(this, p);
						}
						return this;
					}),
					(u.prototype.removeAllListeners = function (s) {
						var f;
						return (
							s
								? ((f = r ? r + s : s), this._events[f] && o(this, f))
								: ((this._events = new n()), (this._eventsCount = 0)),
							this
						);
					}),
					(u.prototype.off = u.prototype.removeListener),
					(u.prototype.addListener = u.prototype.on),
					(u.prefixed = r),
					(u.EventEmitter = u),
					(e.exports = u);
			})(Ds)),
		Ds.exports
	);
}
var Bk = Lk();
const Fk = ce(Bk);
var qs = new Fk(),
	Ls = "recharts.syncMouseEvents";
function qn(e) {
	"@babel/helpers - typeof";
	return (
		(qn =
			typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
				? (t) => typeof t
				: (t) =>
						t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
							? "symbol"
							: typeof t),
		qn(e)
	);
}
function Uk(e, t) {
	if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function zk(e, t) {
	for (var r = 0; r < t.length; r++) {
		var n = t[r];
		(n.enumerable = n.enumerable || !1),
			(n.configurable = !0),
			"value" in n && (n.writable = !0),
			Object.defineProperty(e, bw(n.key), n);
	}
}
function Wk(e, t, r) {
	return t && zk(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function Bs(e, t, r) {
	return (
		(t = bw(t)),
		t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = r),
		e
	);
}
function bw(e) {
	var t = Gk(e, "string");
	return qn(t) == "symbol" ? t : t + "";
}
function Gk(e, t) {
	if (qn(e) != "object" || !e) return e;
	var r = e[Symbol.toPrimitive];
	if (r !== void 0) {
		var n = r.call(e, t);
		if (qn(n) != "object") return n;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return String(e);
}
var Hk = (() => {
	function e() {
		Uk(this, e), Bs(this, "activeIndex", 0), Bs(this, "coordinateList", []), Bs(this, "layout", "horizontal");
	}
	return Wk(e, [
		{
			key: "setDetails",
			value: function (r) {
				var n,
					i = r.coordinateList,
					a = i === void 0 ? null : i,
					o = r.container,
					u = o === void 0 ? null : o,
					c = r.layout,
					s = c === void 0 ? null : c,
					f = r.offset,
					l = f === void 0 ? null : f,
					h = r.mouseHandlerCallback,
					p = h === void 0 ? null : h;
				(this.coordinateList = (n = a ?? this.coordinateList) !== null && n !== void 0 ? n : []),
					(this.container = u ?? this.container),
					(this.layout = s ?? this.layout),
					(this.offset = l ?? this.offset),
					(this.mouseHandlerCallback = p ?? this.mouseHandlerCallback),
					(this.activeIndex = Math.min(Math.max(this.activeIndex, 0), this.coordinateList.length - 1));
			},
		},
		{
			key: "focus",
			value: function () {
				this.spoofMouse();
			},
		},
		{
			key: "keyboardEvent",
			value: function (r) {
				if (this.coordinateList.length !== 0)
					switch (r.key) {
						case "ArrowRight": {
							if (this.layout !== "horizontal") return;
							(this.activeIndex = Math.min(this.activeIndex + 1, this.coordinateList.length - 1)), this.spoofMouse();
							break;
						}
						case "ArrowLeft": {
							if (this.layout !== "horizontal") return;
							(this.activeIndex = Math.max(this.activeIndex - 1, 0)), this.spoofMouse();
							break;
						}
					}
			},
		},
		{
			key: "setIndex",
			value: function (r) {
				this.activeIndex = r;
			},
		},
		{
			key: "spoofMouse",
			value: function () {
				var r, n;
				if (this.layout === "horizontal" && this.coordinateList.length !== 0) {
					var i = this.container.getBoundingClientRect(),
						a = i.x,
						o = i.y,
						u = i.height,
						c = this.coordinateList[this.activeIndex].coordinate,
						s = ((r = window) === null || r === void 0 ? void 0 : r.scrollX) || 0,
						f = ((n = window) === null || n === void 0 ? void 0 : n.scrollY) || 0,
						l = a + c + s,
						h = o + this.offset.top + u / 2 + f;
					this.mouseHandlerCallback({ pageX: l, pageY: h });
				}
			},
		},
	]);
})();
function Kk(e, t, r) {
	if (r === "number" && t === !0 && Array.isArray(e)) {
		var n = e?.[0],
			i = e?.[1];
		if (n && i && B(n) && B(i)) return !0;
	}
	return !1;
}
function Vk(e, t, r, n) {
	var i = n / 2;
	return {
		stroke: "none",
		fill: "#ccc",
		x: e === "horizontal" ? t.x - i : r.left + 0.5,
		y: e === "horizontal" ? r.top + 0.5 : t.y - i,
		width: e === "horizontal" ? n : r.width - 1,
		height: e === "horizontal" ? r.height - 1 : n,
	};
}
function xw(e) {
	var t = e.cx,
		r = e.cy,
		n = e.radius,
		i = e.startAngle,
		a = e.endAngle,
		o = Pe(t, r, n, i),
		u = Pe(t, r, n, a);
	return { points: [o, u], cx: t, cy: r, radius: n, startAngle: i, endAngle: a };
}
function Xk(e, t, r) {
	var n, i, a, o;
	if (e === "horizontal") (n = t.x), (a = n), (i = r.top), (o = r.top + r.height);
	else if (e === "vertical") (i = t.y), (o = i), (n = r.left), (a = r.left + r.width);
	else if (t.cx != null && t.cy != null)
		if (e === "centric") {
			var u = t.cx,
				c = t.cy,
				s = t.innerRadius,
				f = t.outerRadius,
				l = t.angle,
				h = Pe(u, c, s, l),
				p = Pe(u, c, f, l);
			(n = h.x), (i = h.y), (a = p.x), (o = p.y);
		} else return xw(t);
	return [
		{ x: n, y: i },
		{ x: a, y: o },
	];
}
function Ln(e) {
	"@babel/helpers - typeof";
	return (
		(Ln =
			typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
				? (t) => typeof t
				: (t) =>
						t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
							? "symbol"
							: typeof t),
		Ln(e)
	);
}
function Km(e, t) {
	var r = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		t && (n = n.filter((i) => Object.getOwnPropertyDescriptor(e, i).enumerable)), r.push.apply(r, n);
	}
	return r;
}
function ci(e) {
	for (var t = 1; t < arguments.length; t++) {
		var r = arguments[t] != null ? arguments[t] : {};
		t % 2
			? Km(Object(r), !0).forEach((n) => {
					Yk(e, n, r[n]);
				})
			: Object.getOwnPropertyDescriptors
				? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
				: Km(Object(r)).forEach((n) => {
						Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
					});
	}
	return e;
}
function Yk(e, t, r) {
	return (
		(t = Zk(t)),
		t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = r),
		e
	);
}
function Zk(e) {
	var t = Jk(e, "string");
	return Ln(t) == "symbol" ? t : t + "";
}
function Jk(e, t) {
	if (Ln(e) != "object" || !e) return e;
	var r = e[Symbol.toPrimitive];
	if (r !== void 0) {
		var n = r.call(e, t);
		if (Ln(n) != "object") return n;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function Qk(e) {
	var t,
		r,
		n = e.element,
		i = e.tooltipEventType,
		a = e.isActive,
		o = e.activeCoordinate,
		u = e.activePayload,
		c = e.offset,
		s = e.activeTooltipIndex,
		f = e.tooltipAxisBandSize,
		l = e.layout,
		h = e.chartName,
		p =
			(t = n.props.cursor) !== null && t !== void 0
				? t
				: (r = n.type.defaultProps) === null || r === void 0
					? void 0
					: r.cursor;
	if (!n || !p || !a || !o || (h !== "ScatterChart" && i !== "axis")) return null;
	var y,
		v = Sg;
	if (h === "ScatterChart") (y = o), (v = l$);
	else if (h === "BarChart") (y = Vk(l, o, c, f)), (v = eh);
	else if (l === "radial") {
		var d = xw(o),
			b = d.cx,
			w = d.cy,
			x = d.radius,
			O = d.startAngle,
			g = d.endAngle;
		(y = { cx: b, cy: w, startAngle: O, endAngle: g, innerRadius: x, outerRadius: x }), (v = Mx);
	} else (y = { points: Xk(l, o, c) }), (v = Sg);
	var m = ci(
		ci(ci(ci({ stroke: "#ccc", pointerEvents: "none" }, c), y), ee(p, !1)),
		{},
		{ payload: u, payloadIndex: s, className: ie("recharts-tooltip-cursor", p.className) },
	);
	return k.isValidElement(p) ? k.cloneElement(p, m) : k.createElement(v, m);
}
var eD = ["item"],
	tD = ["children", "className", "width", "height", "style", "compact", "title", "desc"];
function Cr(e) {
	"@babel/helpers - typeof";
	return (
		(Cr =
			typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
				? (t) => typeof t
				: (t) =>
						t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
							? "symbol"
							: typeof t),
		Cr(e)
	);
}
function ur() {
	return (
		(ur = Object.assign
			? Object.assign.bind()
			: (e) => {
					for (var t = 1; t < arguments.length; t++) {
						var r = arguments[t];
						for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
					}
					return e;
				}),
		ur.apply(this, arguments)
	);
}
function Vm(e, t) {
	return iD(e) || nD(e, t) || Ow(e, t) || rD();
}
function rD() {
	throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function nD(e, t) {
	var r = e == null ? null : (typeof Symbol < "u" && e[Symbol.iterator]) || e["@@iterator"];
	if (r != null) {
		var n,
			i,
			a,
			o,
			u = [],
			c = !0,
			s = !1;
		try {
			if (((a = (r = r.call(e)).next), t !== 0))
				for (; !(c = (n = a.call(r)).done) && (u.push(n.value), u.length !== t); c = !0);
		} catch (f) {
			(s = !0), (i = f);
		} finally {
			try {
				if (!c && r.return != null && ((o = r.return()), Object(o) !== o)) return;
			} finally {
				if (s) throw i;
			}
		}
		return u;
	}
}
function iD(e) {
	if (Array.isArray(e)) return e;
}
function Xm(e, t) {
	if (e == null) return {};
	var r = aD(e, t),
		n,
		i;
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (i = 0; i < a.length; i++)
			(n = a[i]), !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
	}
	return r;
}
function aD(e, t) {
	if (e == null) return {};
	var r = {};
	for (var n in e)
		if (Object.prototype.hasOwnProperty.call(e, n)) {
			if (t.indexOf(n) >= 0) continue;
			r[n] = e[n];
		}
	return r;
}
function oD(e, t) {
	if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function uD(e, t) {
	for (var r = 0; r < t.length; r++) {
		var n = t[r];
		(n.enumerable = n.enumerable || !1),
			(n.configurable = !0),
			"value" in n && (n.writable = !0),
			Object.defineProperty(e, _w(n.key), n);
	}
}
function cD(e, t, r) {
	return t && uD(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function sD(e, t, r) {
	return (t = na(t)), lD(e, ww() ? Reflect.construct(t, r || [], na(e).constructor) : t.apply(e, r));
}
function lD(e, t) {
	if (t && (Cr(t) === "object" || typeof t == "function")) return t;
	if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
	return fD(e);
}
function fD(e) {
	if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	return e;
}
function ww() {
	try {
		var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], () => {}));
	} catch {}
	return (ww = () => !!e)();
}
function na(e) {
	return (
		(na = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : (r) => r.__proto__ || Object.getPrototypeOf(r)), na(e)
	);
}
function hD(e, t) {
	if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
	(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } })),
		Object.defineProperty(e, "prototype", { writable: !1 }),
		t && ef(e, t);
}
function ef(e, t) {
	return (ef = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : (n, i) => ((n.__proto__ = i), n)), ef(e, t);
}
function Ir(e) {
	return vD(e) || pD(e) || Ow(e) || dD();
}
function dD() {
	throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Ow(e, t) {
	if (e) {
		if (typeof e == "string") return tf(e, t);
		var r = Object.prototype.toString.call(e).slice(8, -1);
		if ((r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set")) return Array.from(e);
		if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return tf(e, t);
	}
}
function pD(e) {
	if ((typeof Symbol < "u" && e[Symbol.iterator] != null) || e["@@iterator"] != null) return Array.from(e);
}
function vD(e) {
	if (Array.isArray(e)) return tf(e);
}
function tf(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
	return n;
}
function Ym(e, t) {
	var r = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		t && (n = n.filter((i) => Object.getOwnPropertyDescriptor(e, i).enumerable)), r.push.apply(r, n);
	}
	return r;
}
function I(e) {
	for (var t = 1; t < arguments.length; t++) {
		var r = arguments[t] != null ? arguments[t] : {};
		t % 2
			? Ym(Object(r), !0).forEach((n) => {
					H(e, n, r[n]);
				})
			: Object.getOwnPropertyDescriptors
				? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
				: Ym(Object(r)).forEach((n) => {
						Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
					});
	}
	return e;
}
function H(e, t, r) {
	return (
		(t = _w(t)),
		t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = r),
		e
	);
}
function _w(e) {
	var t = yD(e, "string");
	return Cr(t) == "symbol" ? t : t + "";
}
function yD(e, t) {
	if (Cr(e) != "object" || !e) return e;
	var r = e[Symbol.toPrimitive];
	if (r !== void 0) {
		var n = r.call(e, t);
		if (Cr(n) != "object") return n;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var gD = { xAxis: ["bottom", "top"], yAxis: ["left", "right"] },
	mD = { width: "100%", height: "100%" },
	Sw = { x: 0, y: 0 };
function si(e) {
	return e;
}
var bD = (t, r) => (r === "horizontal" ? t.x : r === "vertical" ? t.y : r === "centric" ? t.angle : t.radius),
	xD = (t, r, n, i) => {
		var a = r.find((f) => f && f.index === n);
		if (a) {
			if (t === "horizontal") return { x: a.coordinate, y: i.y };
			if (t === "vertical") return { x: i.x, y: a.coordinate };
			if (t === "centric") {
				var o = a.coordinate,
					u = i.radius;
				return I(I(I({}, i), Pe(i.cx, i.cy, u, o)), {}, { angle: o, radius: u });
			}
			var c = a.coordinate,
				s = i.angle;
			return I(I(I({}, i), Pe(i.cx, i.cy, c, s)), {}, { angle: s, radius: c });
		}
		return Sw;
	},
	Da = (t, r) => {
		var n = r.graphicalItems,
			i = r.dataStartIndex,
			a = r.dataEndIndex,
			o = (n ?? []).reduce((u, c) => {
				var s = c.props.data;
				return s && s.length ? [].concat(Ir(u), Ir(s)) : u;
			}, []);
		return o.length > 0 ? o : t && t.length && B(i) && B(a) ? t.slice(i, a + 1) : [];
	};
function Aw(e) {
	return e === "number" ? [0, "auto"] : void 0;
}
var rf = (t, r, n, i) => {
		var a = t.graphicalItems,
			o = t.tooltipAxis,
			u = Da(r, t);
		return n < 0 || !a || !a.length || n >= u.length
			? null
			: a.reduce((c, s) => {
					var f,
						l = (f = s.props.data) !== null && f !== void 0 ? f : r;
					l &&
						t.dataStartIndex + t.dataEndIndex !== 0 &&
						t.dataEndIndex - t.dataStartIndex >= n &&
						(l = l.slice(t.dataStartIndex, t.dataEndIndex + 1));
					var h;
					if (o.dataKey && !o.allowDuplicatedCategory) {
						var p = l === void 0 ? u : l;
						h = Us(p, o.dataKey, i);
					} else h = (l && l[n]) || u[n];
					return h ? [].concat(Ir(c), [Tx(s, h)]) : c;
				}, []);
	},
	Zm = (t, r, n, i) => {
		var a = i || { x: t.chartX, y: t.chartY },
			o = bD(a, n),
			u = t.orderedTooltipTicks,
			c = t.tooltipAxis,
			s = t.tooltipTicks,
			f = Kj(o, u, s, c);
		if (f >= 0 && s) {
			var l = s[f] && s[f].value,
				h = rf(t, r, f, l),
				p = xD(n, u, f, a);
			return { activeTooltipIndex: f, activeLabel: l, activePayload: h, activeCoordinate: p };
		}
		return null;
	},
	wD = (t, r) => {
		var n = r.axes,
			i = r.graphicalItems,
			a = r.axisType,
			o = r.axisIdKey,
			u = r.stackGroups,
			c = r.dataStartIndex,
			s = r.dataEndIndex,
			f = t.layout,
			l = t.children,
			h = t.stackOffset,
			p = Sx(f, a);
		return n.reduce((y, v) => {
			var d,
				b = v.type.defaultProps !== void 0 ? I(I({}, v.type.defaultProps), v.props) : v.props,
				w = b.type,
				x = b.dataKey,
				O = b.allowDataOverflow,
				g = b.allowDuplicatedCategory,
				m = b.scale,
				_ = b.ticks,
				S = b.includeHidden,
				P = b[o];
			if (y[P]) return y;
			var M = Da(t.data, {
					graphicalItems: i.filter((z) => {
						var V,
							se = o in z.props ? z.props[o] : (V = z.type.defaultProps) === null || V === void 0 ? void 0 : V[o];
						return se === P;
					}),
					dataStartIndex: c,
					dataEndIndex: s,
				}),
				A = M.length,
				E,
				j,
				R;
			Kk(b.domain, O, w) &&
				((E = Ol(b.domain, null, O)), p && (w === "number" || m !== "auto") && (R = rn(M, x, "category")));
			var C = Aw(w);
			if (!E || E.length === 0) {
				var N,
					q = (N = b.domain) !== null && N !== void 0 ? N : C;
				if (x) {
					if (((E = rn(M, x, w)), w === "category" && p)) {
						var L = L1(E);
						g && L
							? ((j = E), (E = Gi(0, A)))
							: g || (E = lg(q, E, v).reduce((z, V) => (z.indexOf(V) >= 0 ? z : [].concat(Ir(z), [V])), []));
					} else if (w === "category")
						g
							? (E = E.filter((z) => z !== "" && !ne(z)))
							: (E = lg(q, E, v).reduce(
									(z, V) => (z.indexOf(V) >= 0 || V === "" || ne(V) ? z : [].concat(Ir(z), [V])),
									[],
								));
					else if (w === "number") {
						var F = Jj(
							M,
							i.filter((z) => {
								var V,
									se,
									pe = o in z.props ? z.props[o] : (V = z.type.defaultProps) === null || V === void 0 ? void 0 : V[o],
									ke =
										"hide" in z.props
											? z.props.hide
											: (se = z.type.defaultProps) === null || se === void 0
												? void 0
												: se.hide;
								return pe === P && (S || !ke);
							}),
							x,
							a,
							f,
						);
						F && (E = F);
					}
					p && (w === "number" || m !== "auto") && (R = rn(M, x, "category"));
				} else
					p
						? (E = Gi(0, A))
						: u && u[P] && u[P].hasStack && w === "number"
							? (E = h === "expand" ? [0, 1] : Px(u[P].stackGroups, c, s))
							: (E = _x(
									M,
									i.filter((z) => {
										var V = o in z.props ? z.props[o] : z.type.defaultProps[o],
											se = "hide" in z.props ? z.props.hide : z.type.defaultProps.hide;
										return V === P && (S || !se);
									}),
									w,
									f,
									!0,
								));
				if (w === "number") (E = Ql(l, E, P, a, _)), q && (E = Ol(q, E, O));
				else if (w === "category" && q) {
					var G = q,
						K = E.every((z) => G.indexOf(z) >= 0);
					K && (E = G);
				}
			}
			return I(
				I({}, y),
				{},
				H(
					{},
					P,
					I(
						I({}, b),
						{},
						{
							axisType: a,
							domain: E,
							categoricalDomain: R,
							duplicateDomain: j,
							originalDomain: (d = b.domain) !== null && d !== void 0 ? d : C,
							isCategorical: p,
							layout: f,
						},
					),
				),
			);
		}, {});
	},
	OD = (t, r) => {
		var n = r.graphicalItems,
			i = r.Axis,
			a = r.axisType,
			o = r.axisIdKey,
			u = r.stackGroups,
			c = r.dataStartIndex,
			s = r.dataEndIndex,
			f = t.layout,
			l = t.children,
			h = Da(t.data, { graphicalItems: n, dataStartIndex: c, dataEndIndex: s }),
			p = h.length,
			y = Sx(f, a),
			v = -1;
		return n.reduce((d, b) => {
			var w = b.type.defaultProps !== void 0 ? I(I({}, b.type.defaultProps), b.props) : b.props,
				x = w[o],
				O = Aw("number");
			if (!d[x]) {
				v++;
				var g;
				return (
					y
						? (g = Gi(0, p))
						: u && u[x] && u[x].hasStack
							? ((g = Px(u[x].stackGroups, c, s)), (g = Ql(l, g, x, a)))
							: ((g = Ol(
									O,
									_x(
										h,
										n.filter((m) => {
											var _,
												S,
												P =
													o in m.props
														? m.props[o]
														: (_ = m.type.defaultProps) === null || _ === void 0
															? void 0
															: _[o],
												M =
													"hide" in m.props
														? m.props.hide
														: (S = m.type.defaultProps) === null || S === void 0
															? void 0
															: S.hide;
											return P === x && !M;
										}),
										"number",
										f,
									),
									i.defaultProps.allowDataOverflow,
								)),
								(g = Ql(l, g, x, a))),
					I(
						I({}, d),
						{},
						H(
							{},
							x,
							I(
								I({ axisType: a }, i.defaultProps),
								{},
								{
									hide: !0,
									orientation: ze(gD, "".concat(a, ".").concat(v % 2), null),
									domain: g,
									originalDomain: O,
									isCategorical: y,
									layout: f,
								},
							),
						),
					)
				);
			}
			return d;
		}, {});
	},
	_D = (t, r) => {
		var n = r.axisType,
			i = n === void 0 ? "xAxis" : n,
			a = r.AxisComp,
			o = r.graphicalItems,
			u = r.stackGroups,
			c = r.dataStartIndex,
			s = r.dataEndIndex,
			f = t.children,
			l = "".concat(i, "Id"),
			h = Je(f, a),
			p = {};
		return (
			h && h.length
				? (p = wD(t, {
						axes: h,
						graphicalItems: o,
						axisType: i,
						axisIdKey: l,
						stackGroups: u,
						dataStartIndex: c,
						dataEndIndex: s,
					}))
				: o &&
					o.length &&
					(p = OD(t, {
						Axis: a,
						graphicalItems: o,
						axisType: i,
						axisIdKey: l,
						stackGroups: u,
						dataStartIndex: c,
						dataEndIndex: s,
					})),
			p
		);
	},
	SD = (t) => {
		var r = At(t),
			n = ft(r, !1, !0);
		return {
			tooltipTicks: n,
			orderedTooltipTicks: Pf(n, (i) => i.coordinate),
			tooltipAxis: r,
			tooltipAxisBandSize: ki(r, n),
		};
	},
	Jm = (t) => {
		var r = t.children,
			n = t.defaultShowTooltip,
			i = qe(r, _r),
			a = 0,
			o = 0;
		return (
			t.data && t.data.length !== 0 && (o = t.data.length - 1),
			i &&
				i.props &&
				(i.props.startIndex >= 0 && (a = i.props.startIndex), i.props.endIndex >= 0 && (o = i.props.endIndex)),
			{ chartX: 0, chartY: 0, dataStartIndex: a, dataEndIndex: o, activeTooltipIndex: -1, isTooltipActive: !!n }
		);
	},
	AD = (t) =>
		!t || !t.length
			? !1
			: t.some((r) => {
					var n = dt(r && r.type);
					return n && n.indexOf("Bar") >= 0;
				}),
	Qm = (t) =>
		t === "horizontal"
			? { numericAxisName: "yAxis", cateAxisName: "xAxis" }
			: t === "vertical"
				? { numericAxisName: "xAxis", cateAxisName: "yAxis" }
				: t === "centric"
					? { numericAxisName: "radiusAxis", cateAxisName: "angleAxis" }
					: { numericAxisName: "angleAxis", cateAxisName: "radiusAxis" },
	PD = (t, r) => {
		var n = t.props,
			i = t.graphicalItems,
			a = t.xAxisMap,
			o = a === void 0 ? {} : a,
			u = t.yAxisMap,
			c = u === void 0 ? {} : u,
			s = n.width,
			f = n.height,
			l = n.children,
			h = n.margin || {},
			p = qe(l, _r),
			y = qe(l, sr),
			v = Object.keys(c).reduce(
				(g, m) => {
					var _ = c[m],
						S = _.orientation;
					return !_.mirror && !_.hide ? I(I({}, g), {}, H({}, S, g[S] + _.width)) : g;
				},
				{ left: h.left || 0, right: h.right || 0 },
			),
			d = Object.keys(o).reduce(
				(g, m) => {
					var _ = o[m],
						S = _.orientation;
					return !_.mirror && !_.hide ? I(I({}, g), {}, H({}, S, ze(g, "".concat(S)) + _.height)) : g;
				},
				{ top: h.top || 0, bottom: h.bottom || 0 },
			),
			b = I(I({}, d), v),
			w = b.bottom;
		p && (b.bottom += p.props.height || _r.defaultProps.height), y && r && (b = Yj(b, i, n, r));
		var x = s - b.left - b.right,
			O = f - b.top - b.bottom;
		return I(I({ brushBottom: w }, b), {}, { width: Math.max(x, 0), height: Math.max(O, 0) });
	},
	TD = (t, r) => {
		if (r === "xAxis") return t[r].width;
		if (r === "yAxis") return t[r].height;
	},
	ED = (t) => {
		var r = t.chartName,
			n = t.GraphicalChild,
			i = t.defaultTooltipEventType,
			a = i === void 0 ? "axis" : i,
			o = t.validateTooltipEventTypes,
			u = o === void 0 ? ["axis"] : o,
			c = t.axisComponents,
			s = t.legendContent,
			f = t.formatAxisMap,
			l = t.defaultProps,
			h = (b, w) => {
				var x = w.graphicalItems,
					O = w.stackGroups,
					g = w.offset,
					m = w.updateId,
					_ = w.dataStartIndex,
					S = w.dataEndIndex,
					P = b.barSize,
					M = b.layout,
					A = b.barGap,
					E = b.barCategoryGap,
					j = b.maxBarSize,
					R = Qm(M),
					C = R.numericAxisName,
					N = R.cateAxisName,
					q = AD(x),
					L = [];
				return (
					x.forEach((F, G) => {
						var K = Da(b.data, { graphicalItems: [F], dataStartIndex: _, dataEndIndex: S }),
							z = F.type.defaultProps !== void 0 ? I(I({}, F.type.defaultProps), F.props) : F.props,
							V = z.dataKey,
							se = z.maxBarSize,
							pe = z["".concat(C, "Id")],
							ke = z["".concat(N, "Id")],
							Rt = {},
							Ie = c.reduce((Nt, kt) => {
								var qa = w["".concat(kt.axisType, "Map")],
									vh = z["".concat(kt.axisType, "Id")];
								(qa && qa[vh]) || kt.axisType === "zAxis" || Vt();
								var yh = qa[vh];
								return I(I({}, Nt), {}, H(H({}, kt.axisType, yh), "".concat(kt.axisType, "Ticks"), ft(yh)));
							}, Rt),
							U = Ie[N],
							X = Ie["".concat(N, "Ticks")],
							Y = O && O[pe] && O[pe].hasStack && lM(F, O[pe].stackGroups),
							D = dt(F.type).indexOf("Bar") >= 0,
							he = ki(U, X),
							J = [],
							ge = q && Vj({ barSize: P, stackGroups: O, totalSize: TD(Ie, N) });
						if (D) {
							var me,
								$e,
								_t = ne(se) ? j : se,
								er = (me = ($e = ki(U, X, !0)) !== null && $e !== void 0 ? $e : _t) !== null && me !== void 0 ? me : 0;
							(J = Xj({
								barGap: A,
								barCategoryGap: E,
								bandSize: er !== he ? er : he,
								sizeList: ge[ke],
								maxBarSize: _t,
							})),
								er !== he &&
									(J = J.map((Nt) =>
										I(I({}, Nt), {}, { position: I(I({}, Nt.position), {}, { offset: Nt.position.offset - er / 2 }) }),
									));
						}
						var Xn = F && F.type && F.type.getComposedData;
						Xn &&
							L.push({
								props: I(
									I(
										{},
										Xn(
											I(
												I({}, Ie),
												{},
												{
													displayedData: K,
													props: b,
													dataKey: V,
													item: F,
													bandSize: he,
													barPosition: J,
													offset: g,
													stackedData: Y,
													layout: M,
													dataStartIndex: _,
													dataEndIndex: S,
												},
											),
										),
									),
									{},
									H(H(H({ key: F.key || "item-".concat(G) }, C, Ie[C]), N, Ie[N]), "animationId", m),
								),
								childIndex: Y1(F, b.children),
								item: F,
							});
					}),
					L
				);
			},
			p = (b, w) => {
				var x = b.props,
					O = b.dataStartIndex,
					g = b.dataEndIndex,
					m = b.updateId;
				if (!Ad({ props: x })) return null;
				var _ = x.children,
					S = x.layout,
					P = x.stackOffset,
					M = x.data,
					A = x.reverseStackOrder,
					E = Qm(S),
					j = E.numericAxisName,
					R = E.cateAxisName,
					C = Je(_, n),
					N = uM(M, C, "".concat(j, "Id"), "".concat(R, "Id"), P, A),
					q = c.reduce((z, V) => {
						var se = "".concat(V.axisType, "Map");
						return I(
							I({}, z),
							{},
							H(
								{},
								se,
								_D(
									x,
									I(
										I({}, V),
										{},
										{ graphicalItems: C, stackGroups: V.axisType === j && N, dataStartIndex: O, dataEndIndex: g },
									),
								),
							),
						);
					}, {}),
					L = PD(I(I({}, q), {}, { props: x, graphicalItems: C }), w?.legendBBox);
				Object.keys(q).forEach((z) => {
					q[z] = f(x, q[z], L, z.replace("Map", ""), r);
				});
				var F = q["".concat(R, "Map")],
					G = SD(F),
					K = h(
						x,
						I(
							I({}, q),
							{},
							{ dataStartIndex: O, dataEndIndex: g, updateId: m, graphicalItems: C, stackGroups: N, offset: L },
						),
					);
				return I(I({ formattedGraphicalItems: K, graphicalItems: C, offset: L, stackGroups: N }, G), q);
			},
			y = ((d) => {
				function b(w) {
					var x, O, g;
					return (
						oD(this, b),
						(g = sD(this, b, [w])),
						H(g, "eventEmitterSymbol", Symbol("rechartsEventEmitter")),
						H(g, "accessibilityManager", new Hk()),
						H(g, "handleLegendBBoxUpdate", (m) => {
							if (m) {
								var _ = g.state,
									S = _.dataStartIndex,
									P = _.dataEndIndex,
									M = _.updateId;
								g.setState(
									I(
										{ legendBBox: m },
										p(
											{ props: g.props, dataStartIndex: S, dataEndIndex: P, updateId: M },
											I(I({}, g.state), {}, { legendBBox: m }),
										),
									),
								);
							}
						}),
						H(g, "handleReceiveSyncEvent", (m, _, S) => {
							if (g.props.syncId === m) {
								if (S === g.eventEmitterSymbol && typeof g.props.syncMethod != "function") return;
								g.applySyncEvent(_);
							}
						}),
						H(g, "handleBrushChange", (m) => {
							var _ = m.startIndex,
								S = m.endIndex;
							if (_ !== g.state.dataStartIndex || S !== g.state.dataEndIndex) {
								var P = g.state.updateId;
								g.setState(() =>
									I(
										{ dataStartIndex: _, dataEndIndex: S },
										p({ props: g.props, dataStartIndex: _, dataEndIndex: S, updateId: P }, g.state),
									),
								),
									g.triggerSyncEvent({ dataStartIndex: _, dataEndIndex: S });
							}
						}),
						H(g, "handleMouseEnter", (m) => {
							var _ = g.getMouseInfo(m);
							if (_) {
								var S = I(I({}, _), {}, { isTooltipActive: !0 });
								g.setState(S), g.triggerSyncEvent(S);
								var P = g.props.onMouseEnter;
								Z(P) && P(S, m);
							}
						}),
						H(g, "triggeredAfterMouseMove", (m) => {
							var _ = g.getMouseInfo(m),
								S = _ ? I(I({}, _), {}, { isTooltipActive: !0 }) : { isTooltipActive: !1 };
							g.setState(S), g.triggerSyncEvent(S);
							var P = g.props.onMouseMove;
							Z(P) && P(S, m);
						}),
						H(g, "handleItemMouseEnter", (m) => {
							g.setState(() => ({
								isTooltipActive: !0,
								activeItem: m,
								activePayload: m.tooltipPayload,
								activeCoordinate: m.tooltipPosition || { x: m.cx, y: m.cy },
							}));
						}),
						H(g, "handleItemMouseLeave", () => {
							g.setState(() => ({ isTooltipActive: !1 }));
						}),
						H(g, "handleMouseMove", (m) => {
							m.persist(), g.throttleTriggeredAfterMouseMove(m);
						}),
						H(g, "handleMouseLeave", (m) => {
							g.throttleTriggeredAfterMouseMove.cancel();
							var _ = { isTooltipActive: !1 };
							g.setState(_), g.triggerSyncEvent(_);
							var S = g.props.onMouseLeave;
							Z(S) && S(_, m);
						}),
						H(g, "handleOuterEvent", (m) => {
							var _ = X1(m),
								S = ze(g.props, "".concat(_));
							if (_ && Z(S)) {
								var P, M;
								/.*touch.*/i.test(_) ? (M = g.getMouseInfo(m.changedTouches[0])) : (M = g.getMouseInfo(m)),
									S((P = M) !== null && P !== void 0 ? P : {}, m);
							}
						}),
						H(g, "handleClick", (m) => {
							var _ = g.getMouseInfo(m);
							if (_) {
								var S = I(I({}, _), {}, { isTooltipActive: !0 });
								g.setState(S), g.triggerSyncEvent(S);
								var P = g.props.onClick;
								Z(P) && P(S, m);
							}
						}),
						H(g, "handleMouseDown", (m) => {
							var _ = g.props.onMouseDown;
							if (Z(_)) {
								var S = g.getMouseInfo(m);
								_(S, m);
							}
						}),
						H(g, "handleMouseUp", (m) => {
							var _ = g.props.onMouseUp;
							if (Z(_)) {
								var S = g.getMouseInfo(m);
								_(S, m);
							}
						}),
						H(g, "handleTouchMove", (m) => {
							m.changedTouches != null &&
								m.changedTouches.length > 0 &&
								g.throttleTriggeredAfterMouseMove(m.changedTouches[0]);
						}),
						H(g, "handleTouchStart", (m) => {
							m.changedTouches != null && m.changedTouches.length > 0 && g.handleMouseDown(m.changedTouches[0]);
						}),
						H(g, "handleTouchEnd", (m) => {
							m.changedTouches != null && m.changedTouches.length > 0 && g.handleMouseUp(m.changedTouches[0]);
						}),
						H(g, "handleDoubleClick", (m) => {
							var _ = g.props.onDoubleClick;
							if (Z(_)) {
								var S = g.getMouseInfo(m);
								_(S, m);
							}
						}),
						H(g, "handleContextMenu", (m) => {
							var _ = g.props.onContextMenu;
							if (Z(_)) {
								var S = g.getMouseInfo(m);
								_(S, m);
							}
						}),
						H(g, "triggerSyncEvent", (m) => {
							g.props.syncId !== void 0 && qs.emit(Ls, g.props.syncId, m, g.eventEmitterSymbol);
						}),
						H(g, "applySyncEvent", (m) => {
							var _ = g.props,
								S = _.layout,
								P = _.syncMethod,
								M = g.state.updateId,
								A = m.dataStartIndex,
								E = m.dataEndIndex;
							if (m.dataStartIndex !== void 0 || m.dataEndIndex !== void 0)
								g.setState(
									I(
										{ dataStartIndex: A, dataEndIndex: E },
										p({ props: g.props, dataStartIndex: A, dataEndIndex: E, updateId: M }, g.state),
									),
								);
							else if (m.activeTooltipIndex !== void 0) {
								var j = m.chartX,
									R = m.chartY,
									C = m.activeTooltipIndex,
									N = g.state,
									q = N.offset,
									L = N.tooltipTicks;
								if (!q) return;
								if (typeof P == "function") C = P(L, m);
								else if (P === "value") {
									C = -1;
									for (var F = 0; F < L.length; F++)
										if (L[F].value === m.activeLabel) {
											C = F;
											break;
										}
								}
								var G = I(I({}, q), {}, { x: q.left, y: q.top }),
									K = Math.min(j, G.x + G.width),
									z = Math.min(R, G.y + G.height),
									V = L[C] && L[C].value,
									se = rf(g.state, g.props.data, C),
									pe = L[C]
										? { x: S === "horizontal" ? L[C].coordinate : K, y: S === "horizontal" ? z : L[C].coordinate }
										: Sw;
								g.setState(
									I(I({}, m), {}, { activeLabel: V, activeCoordinate: pe, activePayload: se, activeTooltipIndex: C }),
								);
							} else g.setState(m);
						}),
						H(g, "renderCursor", (m) => {
							var _,
								S = g.state,
								P = S.isTooltipActive,
								M = S.activeCoordinate,
								A = S.activePayload,
								E = S.offset,
								j = S.activeTooltipIndex,
								R = S.tooltipAxisBandSize,
								C = g.getTooltipEventType(),
								N = (_ = m.props.active) !== null && _ !== void 0 ? _ : P,
								q = g.props.layout,
								L = m.key || "_recharts-cursor";
							return T.createElement(Qk, {
								key: L,
								activeCoordinate: M,
								activePayload: A,
								activeTooltipIndex: j,
								chartName: r,
								element: m,
								isActive: N,
								layout: q,
								offset: E,
								tooltipAxisBandSize: R,
								tooltipEventType: C,
							});
						}),
						H(g, "renderPolarAxis", (m, _, S) => {
							var P = ze(m, "type.axisType"),
								M = ze(g.state, "".concat(P, "Map")),
								A = m.type.defaultProps,
								E = A !== void 0 ? I(I({}, A), m.props) : m.props,
								j = M && M[E["".concat(P, "Id")]];
							return k.cloneElement(
								m,
								I(
									I({}, j),
									{},
									{ className: ie(P, j.className), key: m.key || "".concat(_, "-").concat(S), ticks: ft(j, !0) },
								),
							);
						}),
						H(g, "renderPolarGrid", (m) => {
							var _ = m.props,
								S = _.radialLines,
								P = _.polarAngles,
								M = _.polarRadius,
								A = g.state,
								E = A.radiusAxisMap,
								j = A.angleAxisMap,
								R = At(E),
								C = At(j),
								N = C.cx,
								q = C.cy,
								L = C.innerRadius,
								F = C.outerRadius;
							return k.cloneElement(m, {
								polarAngles: Array.isArray(P) ? P : ft(C, !0).map((G) => G.coordinate),
								polarRadius: Array.isArray(M) ? M : ft(R, !0).map((G) => G.coordinate),
								cx: N,
								cy: q,
								innerRadius: L,
								outerRadius: F,
								key: m.key || "polar-grid",
								radialLines: S,
							});
						}),
						H(g, "renderLegend", () => {
							var m = g.state.formattedGraphicalItems,
								_ = g.props,
								S = _.children,
								P = _.width,
								M = _.height,
								A = g.props.margin || {},
								E = P - (A.left || 0) - (A.right || 0),
								j = wx({ children: S, formattedGraphicalItems: m, legendWidth: E, legendContent: s });
							if (!j) return null;
							var R = j.item,
								C = Xm(j, eD);
							return k.cloneElement(
								R,
								I(I({}, C), {}, { chartWidth: P, chartHeight: M, margin: A, onBBoxUpdate: g.handleLegendBBoxUpdate }),
							);
						}),
						H(g, "renderTooltip", () => {
							var m,
								_ = g.props,
								S = _.children,
								P = _.accessibilityLayer,
								M = qe(S, et);
							if (!M) return null;
							var A = g.state,
								E = A.isTooltipActive,
								j = A.activeCoordinate,
								R = A.activePayload,
								C = A.activeLabel,
								N = A.offset,
								q = (m = M.props.active) !== null && m !== void 0 ? m : E;
							return k.cloneElement(M, {
								viewBox: I(I({}, N), {}, { x: N.left, y: N.top }),
								active: q,
								label: C,
								payload: q ? R : [],
								coordinate: j,
								accessibilityLayer: P,
							});
						}),
						H(g, "renderBrush", (m) => {
							var _ = g.props,
								S = _.margin,
								P = _.data,
								M = g.state,
								A = M.offset,
								E = M.dataStartIndex,
								j = M.dataEndIndex,
								R = M.updateId;
							return k.cloneElement(m, {
								key: m.key || "_recharts-brush",
								onChange: ii(g.handleBrushChange, m.props.onChange),
								data: P,
								x: B(m.props.x) ? m.props.x : A.left,
								y: B(m.props.y) ? m.props.y : A.top + A.height + A.brushBottom - (S.bottom || 0),
								width: B(m.props.width) ? m.props.width : A.width,
								startIndex: E,
								endIndex: j,
								updateId: "brush-".concat(R),
							});
						}),
						H(g, "renderReferenceElement", (m, _, S) => {
							if (!m) return null;
							var P = g,
								M = P.clipPathId,
								A = g.state,
								E = A.xAxisMap,
								j = A.yAxisMap,
								R = A.offset,
								C = m.type.defaultProps || {},
								N = m.props,
								q = N.xAxisId,
								L = q === void 0 ? C.xAxisId : q,
								F = N.yAxisId,
								G = F === void 0 ? C.yAxisId : F;
							return k.cloneElement(m, {
								key: m.key || "".concat(_, "-").concat(S),
								xAxis: E[L],
								yAxis: j[G],
								viewBox: { x: R.left, y: R.top, width: R.width, height: R.height },
								clipPathId: M,
							});
						}),
						H(g, "renderActivePoints", (m) => {
							var _ = m.item,
								S = m.activePoint,
								P = m.basePoint,
								M = m.childIndex,
								A = m.isRange,
								E = [],
								j = _.props.key,
								R =
									_.item.type.defaultProps !== void 0 ? I(I({}, _.item.type.defaultProps), _.item.props) : _.item.props,
								C = R.activeDot,
								N = R.dataKey,
								q = I(
									I(
										{
											index: M,
											dataKey: N,
											cx: S.x,
											cy: S.y,
											r: 4,
											fill: Qf(_.item),
											strokeWidth: 2,
											stroke: "#fff",
											payload: S.payload,
											value: S.value,
										},
										ee(C, !1),
									),
									li(C),
								);
							return (
								E.push(b.renderActiveDot(C, q, "".concat(j, "-activePoint-").concat(M))),
								P
									? E.push(
											b.renderActiveDot(
												C,
												I(I({}, q), {}, { cx: P.x, cy: P.y }),
												"".concat(j, "-basePoint-").concat(M),
											),
										)
									: A && E.push(null),
								E
							);
						}),
						H(g, "renderGraphicChild", (m, _, S) => {
							var P = g.filterFormatItem(m, _, S);
							if (!P) return null;
							var M = g.getTooltipEventType(),
								A = g.state,
								E = A.isTooltipActive,
								j = A.tooltipAxis,
								R = A.activeTooltipIndex,
								C = A.activeLabel,
								N = g.props.children,
								q = qe(N, et),
								L = P.props,
								F = L.points,
								G = L.isRange,
								K = L.baseLine,
								z =
									P.item.type.defaultProps !== void 0 ? I(I({}, P.item.type.defaultProps), P.item.props) : P.item.props,
								V = z.activeDot,
								se = z.hide,
								pe = z.activeBar,
								ke = z.activeShape,
								Rt = !!(!se && E && q && (V || pe || ke)),
								Ie = {};
							M !== "axis" && q && q.props.trigger === "click"
								? (Ie = { onClick: ii(g.handleItemMouseEnter, m.props.onClick) })
								: M !== "axis" &&
									(Ie = {
										onMouseLeave: ii(g.handleItemMouseLeave, m.props.onMouseLeave),
										onMouseEnter: ii(g.handleItemMouseEnter, m.props.onMouseEnter),
									});
							var U = k.cloneElement(m, I(I({}, P.props), Ie));
							function X(kt) {
								return typeof j.dataKey == "function" ? j.dataKey(kt.payload) : null;
							}
							if (Rt)
								if (R >= 0) {
									var Y, D;
									if (j.dataKey && !j.allowDuplicatedCategory) {
										var he = typeof j.dataKey == "function" ? X : "payload.".concat(j.dataKey.toString());
										(Y = Us(F, he, C)), (D = G && K && Us(K, he, C));
									} else (Y = F?.[R]), (D = G && K && K[R]);
									if (ke || pe) {
										var J = m.props.activeIndex !== void 0 ? m.props.activeIndex : R;
										return [k.cloneElement(m, I(I(I({}, P.props), Ie), {}, { activeIndex: J })), null, null];
									}
									if (!ne(Y))
										return [U].concat(
											Ir(g.renderActivePoints({ item: P, activePoint: Y, basePoint: D, childIndex: R, isRange: G })),
										);
								} else {
									var ge,
										me =
											(ge = g.getItemByXY(g.state.activeCoordinate)) !== null && ge !== void 0
												? ge
												: { graphicalItem: U },
										$e = me.graphicalItem,
										_t = $e.item,
										er = _t === void 0 ? m : _t,
										Xn = $e.childIndex,
										Nt = I(I(I({}, P.props), Ie), {}, { activeIndex: Xn });
									return [k.cloneElement(er, Nt), null, null];
								}
							return G ? [U, null, null] : [U, null];
						}),
						H(g, "renderCustomized", (m, _, S) =>
							k.cloneElement(m, I(I({ key: "recharts-customized-".concat(S) }, g.props), g.state)),
						),
						H(g, "renderMap", {
							CartesianGrid: { handler: si, once: !0 },
							ReferenceArea: { handler: g.renderReferenceElement },
							ReferenceLine: { handler: si },
							ReferenceDot: { handler: g.renderReferenceElement },
							XAxis: { handler: si },
							YAxis: { handler: si },
							Brush: { handler: g.renderBrush, once: !0 },
							Bar: { handler: g.renderGraphicChild },
							Line: { handler: g.renderGraphicChild },
							Area: { handler: g.renderGraphicChild },
							Radar: { handler: g.renderGraphicChild },
							RadialBar: { handler: g.renderGraphicChild },
							Scatter: { handler: g.renderGraphicChild },
							Pie: { handler: g.renderGraphicChild },
							Funnel: { handler: g.renderGraphicChild },
							Tooltip: { handler: g.renderCursor, once: !0 },
							PolarGrid: { handler: g.renderPolarGrid, once: !0 },
							PolarAngleAxis: { handler: g.renderPolarAxis },
							PolarRadiusAxis: { handler: g.renderPolarAxis },
							Customized: { handler: g.renderCustomized },
						}),
						(g.clipPathId = "".concat((x = w.id) !== null && x !== void 0 ? x : la("recharts"), "-clip")),
						(g.throttleTriggeredAfterMouseMove = x0(
							g.triggeredAfterMouseMove,
							(O = w.throttleDelay) !== null && O !== void 0 ? O : 1e3 / 60,
						)),
						(g.state = {}),
						g
					);
				}
				return (
					hD(b, d),
					cD(b, [
						{
							key: "componentDidMount",
							value: function () {
								var x, O;
								this.addListener(),
									this.accessibilityManager.setDetails({
										container: this.container,
										offset: {
											left: (x = this.props.margin.left) !== null && x !== void 0 ? x : 0,
											top: (O = this.props.margin.top) !== null && O !== void 0 ? O : 0,
										},
										coordinateList: this.state.tooltipTicks,
										mouseHandlerCallback: this.triggeredAfterMouseMove,
										layout: this.props.layout,
									}),
									this.displayDefaultTooltip();
							},
						},
						{
							key: "displayDefaultTooltip",
							value: function () {
								var x = this.props,
									O = x.children,
									g = x.data,
									m = x.height,
									_ = x.layout,
									S = qe(O, et);
								if (S) {
									var P = S.props.defaultIndex;
									if (!(typeof P != "number" || P < 0 || P > this.state.tooltipTicks.length - 1)) {
										var M = this.state.tooltipTicks[P] && this.state.tooltipTicks[P].value,
											A = rf(this.state, g, P, M),
											E = this.state.tooltipTicks[P].coordinate,
											j = (this.state.offset.top + m) / 2,
											R = _ === "horizontal",
											C = R ? { x: E, y: j } : { y: E, x: j },
											N = this.state.formattedGraphicalItems.find((L) => {
												var F = L.item;
												return F.type.name === "Scatter";
											});
										N && ((C = I(I({}, C), N.props.points[P].tooltipPosition)), (A = N.props.points[P].tooltipPayload));
										var q = {
											activeTooltipIndex: P,
											isTooltipActive: !0,
											activeLabel: M,
											activePayload: A,
											activeCoordinate: C,
										};
										this.setState(q), this.renderCursor(S), this.accessibilityManager.setIndex(P);
									}
								}
							},
						},
						{
							key: "getSnapshotBeforeUpdate",
							value: function (x, O) {
								if (!this.props.accessibilityLayer) return null;
								if (
									(this.state.tooltipTicks !== O.tooltipTicks &&
										this.accessibilityManager.setDetails({ coordinateList: this.state.tooltipTicks }),
									this.props.layout !== x.layout && this.accessibilityManager.setDetails({ layout: this.props.layout }),
									this.props.margin !== x.margin)
								) {
									var g, m;
									this.accessibilityManager.setDetails({
										offset: {
											left: (g = this.props.margin.left) !== null && g !== void 0 ? g : 0,
											top: (m = this.props.margin.top) !== null && m !== void 0 ? m : 0,
										},
									});
								}
								return null;
							},
						},
						{
							key: "componentDidUpdate",
							value: function (x) {
								Ws([qe(x.children, et)], [qe(this.props.children, et)]) || this.displayDefaultTooltip();
							},
						},
						{
							key: "componentWillUnmount",
							value: function () {
								this.removeListener(), this.throttleTriggeredAfterMouseMove.cancel();
							},
						},
						{
							key: "getTooltipEventType",
							value: function () {
								var x = qe(this.props.children, et);
								if (x && typeof x.props.shared == "boolean") {
									var O = x.props.shared ? "axis" : "item";
									return u.indexOf(O) >= 0 ? O : a;
								}
								return a;
							},
						},
						{
							key: "getMouseInfo",
							value: function (x) {
								if (!this.container) return null;
								var O = this.container,
									g = O.getBoundingClientRect(),
									m = DA(g),
									_ = { chartX: Math.round(x.pageX - m.left), chartY: Math.round(x.pageY - m.top) },
									S = g.width / O.offsetWidth || 1,
									P = this.inRange(_.chartX, _.chartY, S);
								if (!P) return null;
								var M = this.state,
									A = M.xAxisMap,
									E = M.yAxisMap,
									j = this.getTooltipEventType(),
									R = Zm(this.state, this.props.data, this.props.layout, P);
								if (j !== "axis" && A && E) {
									var C = At(A).scale,
										N = At(E).scale,
										q = C && C.invert ? C.invert(_.chartX) : null,
										L = N && N.invert ? N.invert(_.chartY) : null;
									return I(I({}, _), {}, { xValue: q, yValue: L }, R);
								}
								return R ? I(I({}, _), R) : null;
							},
						},
						{
							key: "inRange",
							value: function (x, O) {
								var g = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1,
									m = this.props.layout,
									_ = x / g,
									S = O / g;
								if (m === "horizontal" || m === "vertical") {
									var P = this.state.offset,
										M = _ >= P.left && _ <= P.left + P.width && S >= P.top && S <= P.top + P.height;
									return M ? { x: _, y: S } : null;
								}
								var A = this.state,
									E = A.angleAxisMap,
									j = A.radiusAxisMap;
								if (E && j) {
									var R = At(E);
									return dg({ x: _, y: S }, R);
								}
								return null;
							},
						},
						{
							key: "parseEventsOfWrapper",
							value: function () {
								var x = this.props.children,
									O = this.getTooltipEventType(),
									g = qe(x, et),
									m = {};
								g &&
									O === "axis" &&
									(g.props.trigger === "click"
										? (m = { onClick: this.handleClick })
										: (m = {
												onMouseEnter: this.handleMouseEnter,
												onDoubleClick: this.handleDoubleClick,
												onMouseMove: this.handleMouseMove,
												onMouseLeave: this.handleMouseLeave,
												onTouchMove: this.handleTouchMove,
												onTouchStart: this.handleTouchStart,
												onTouchEnd: this.handleTouchEnd,
												onContextMenu: this.handleContextMenu,
											}));
								var _ = li(this.props, this.handleOuterEvent);
								return I(I({}, _), m);
							},
						},
						{
							key: "addListener",
							value: function () {
								qs.on(Ls, this.handleReceiveSyncEvent);
							},
						},
						{
							key: "removeListener",
							value: function () {
								qs.removeListener(Ls, this.handleReceiveSyncEvent);
							},
						},
						{
							key: "filterFormatItem",
							value: function (x, O, g) {
								for (var m = this.state.formattedGraphicalItems, _ = 0, S = m.length; _ < S; _++) {
									var P = m[_];
									if (P.item === x || P.props.key === x.key || (O === dt(P.item.type) && g === P.childIndex)) return P;
								}
								return null;
							},
						},
						{
							key: "renderClipPath",
							value: function () {
								var x = this.clipPathId,
									O = this.state.offset,
									g = O.left,
									m = O.top,
									_ = O.height,
									S = O.width;
								return T.createElement(
									"defs",
									null,
									T.createElement("clipPath", { id: x }, T.createElement("rect", { x: g, y: m, height: _, width: S })),
								);
							},
						},
						{
							key: "getXScales",
							value: function () {
								var x = this.state.xAxisMap;
								return x
									? Object.entries(x).reduce((O, g) => {
											var m = Vm(g, 2),
												_ = m[0],
												S = m[1];
											return I(I({}, O), {}, H({}, _, S.scale));
										}, {})
									: null;
							},
						},
						{
							key: "getYScales",
							value: function () {
								var x = this.state.yAxisMap;
								return x
									? Object.entries(x).reduce((O, g) => {
											var m = Vm(g, 2),
												_ = m[0],
												S = m[1];
											return I(I({}, O), {}, H({}, _, S.scale));
										}, {})
									: null;
							},
						},
						{
							key: "getXScaleByAxisId",
							value: function (x) {
								var O;
								return (O = this.state.xAxisMap) === null || O === void 0 || (O = O[x]) === null || O === void 0
									? void 0
									: O.scale;
							},
						},
						{
							key: "getYScaleByAxisId",
							value: function (x) {
								var O;
								return (O = this.state.yAxisMap) === null || O === void 0 || (O = O[x]) === null || O === void 0
									? void 0
									: O.scale;
							},
						},
						{
							key: "getItemByXY",
							value: function (x) {
								var O = this.state,
									g = O.formattedGraphicalItems,
									m = O.activeItem;
								if (g && g.length)
									for (var _ = 0, S = g.length; _ < S; _++) {
										var P = g[_],
											M = P.props,
											A = P.item,
											E = A.type.defaultProps !== void 0 ? I(I({}, A.type.defaultProps), A.props) : A.props,
											j = dt(A.type);
										if (j === "Bar") {
											var R = (M.data || []).find((L) => e$(x, L));
											if (R) return { graphicalItem: P, payload: R };
										} else if (j === "RadialBar") {
											var C = (M.data || []).find((L) => dg(x, L));
											if (C) return { graphicalItem: P, payload: C };
										} else if (ja(P, m) || Ma(P, m) || $n(P, m)) {
											var N = W$({ graphicalItem: P, activeTooltipItem: m, itemData: E.data }),
												q = E.activeIndex === void 0 ? N : E.activeIndex;
											return {
												graphicalItem: I(I({}, P), {}, { childIndex: q }),
												payload: $n(P, m) ? E.data[N] : P.props.data[N],
											};
										}
									}
								return null;
							},
						},
						{
							key: "render",
							value: function () {
								if (!Ad(this)) return null;
								var O = this.props,
									g = O.children,
									m = O.className,
									_ = O.width,
									S = O.height,
									P = O.style,
									M = O.compact,
									A = O.title,
									E = O.desc,
									j = Xm(O, tD),
									R = ee(j, !1);
								if (M)
									return T.createElement(
										Im,
										{
											state: this.state,
											width: this.props.width,
											height: this.props.height,
											clipPathId: this.clipPathId,
										},
										T.createElement(
											Hs,
											ur({}, R, { width: _, height: S, title: A, desc: E }),
											this.renderClipPath(),
											Td(g, this.renderMap),
										),
									);
								if (this.props.accessibilityLayer) {
									var C, N;
									(R.tabIndex = (C = this.props.tabIndex) !== null && C !== void 0 ? C : 0),
										(R.role = (N = this.props.role) !== null && N !== void 0 ? N : "application"),
										(R.onKeyDown = (L) => {
											this.accessibilityManager.keyboardEvent(L);
										}),
										(R.onFocus = () => {
											this.accessibilityManager.focus();
										});
								}
								var q = this.parseEventsOfWrapper();
								return T.createElement(
									Im,
									{
										state: this.state,
										width: this.props.width,
										height: this.props.height,
										clipPathId: this.clipPathId,
									},
									T.createElement(
										"div",
										ur(
											{
												className: ie("recharts-wrapper", m),
												style: I({ position: "relative", cursor: "default", width: _, height: S }, P),
											},
											q,
											{
												ref: (F) => {
													this.container = F;
												},
											},
										),
										T.createElement(
											Hs,
											ur({}, R, { width: _, height: S, title: A, desc: E, style: mD }),
											this.renderClipPath(),
											Td(g, this.renderMap),
										),
										this.renderLegend(),
										this.renderTooltip(),
									),
								);
							},
						},
					])
				);
			})(k.Component);
		H(y, "displayName", r),
			H(
				y,
				"defaultProps",
				I(
					{
						layout: "horizontal",
						stackOffset: "none",
						barCategoryGap: "10%",
						barGap: 4,
						margin: { top: 5, right: 5, bottom: 5, left: 5 },
						reverseStackOrder: !1,
						syncMethod: "index",
					},
					l,
				),
			),
			H(y, "getDerivedStateFromProps", (d, b) => {
				var w = d.dataKey,
					x = d.data,
					O = d.children,
					g = d.width,
					m = d.height,
					_ = d.layout,
					S = d.stackOffset,
					P = d.margin,
					M = b.dataStartIndex,
					A = b.dataEndIndex;
				if (b.updateId === void 0) {
					var E = Jm(d);
					return I(
						I(I({}, E), {}, { updateId: 0 }, p(I(I({ props: d }, E), {}, { updateId: 0 }), b)),
						{},
						{
							prevDataKey: w,
							prevData: x,
							prevWidth: g,
							prevHeight: m,
							prevLayout: _,
							prevStackOffset: S,
							prevMargin: P,
							prevChildren: O,
						},
					);
				}
				if (
					w !== b.prevDataKey ||
					x !== b.prevData ||
					g !== b.prevWidth ||
					m !== b.prevHeight ||
					_ !== b.prevLayout ||
					S !== b.prevStackOffset ||
					!cr(P, b.prevMargin)
				) {
					var j = Jm(d),
						R = { chartX: b.chartX, chartY: b.chartY, isTooltipActive: b.isTooltipActive },
						C = I(I({}, Zm(b, x, _)), {}, { updateId: b.updateId + 1 }),
						N = I(I(I({}, j), R), C);
					return I(
						I(I({}, N), p(I({ props: d }, N), b)),
						{},
						{
							prevDataKey: w,
							prevData: x,
							prevWidth: g,
							prevHeight: m,
							prevLayout: _,
							prevStackOffset: S,
							prevMargin: P,
							prevChildren: O,
						},
					);
				}
				if (!Ws(O, b.prevChildren)) {
					var q,
						L,
						F,
						G,
						K = qe(O, _r),
						z =
							K && (q = (L = K.props) === null || L === void 0 ? void 0 : L.startIndex) !== null && q !== void 0
								? q
								: M,
						V =
							K && (F = (G = K.props) === null || G === void 0 ? void 0 : G.endIndex) !== null && F !== void 0 ? F : A,
						se = z !== M || V !== A,
						pe = !ne(x),
						ke = pe && !se ? b.updateId : b.updateId + 1;
					return I(
						I({ updateId: ke }, p(I(I({ props: d }, b), {}, { updateId: ke, dataStartIndex: z, dataEndIndex: V }), b)),
						{},
						{ prevChildren: O, dataStartIndex: z, dataEndIndex: V },
					);
				}
				return null;
			}),
			H(y, "renderActiveDot", (d, b, w) => {
				var x;
				return (
					k.isValidElement(d) ? (x = k.cloneElement(d, b)) : Z(d) ? (x = d(b)) : (x = T.createElement(qx, b)),
					T.createElement(_e, { className: "recharts-active-dot", key: w }, x)
				);
			});
		var v = k.forwardRef((b, w) => T.createElement(y, ur({}, b, { ref: w })));
		return (v.displayName = y.displayName), v;
	},
	fh = ED({
		chartName: "BarChart",
		GraphicalChild: Ot,
		defaultTooltipEventType: "axis",
		validateTooltipEventTypes: ["axis", "item"],
		axisComponents: [
			{ axisType: "xAxis", AxisComp: Fr },
			{ axisType: "yAxis", AxisComp: lh },
		],
		formatAxisMap: BR,
	});
const jD = { light: "", dark: ".dark" },
	Pw = k.createContext(null);
function MD() {
	const e = k.useContext(Pw);
	if (!e) throw new Error("useChart must be used within a <ChartContainer />");
	return e;
}
function hh({ id: e, className: t, children: r, config: n, ...i }) {
	const a = k.useId(),
		o = `chart-${e || a.replace(/:/g, "")}`;
	return $.jsx(Pw.Provider, {
		value: { config: n },
		children: $.jsxs("div", {
			"data-slot": "chart",
			"data-chart": o,
			className: Xe(
				"[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border flex aspect-video justify-center text-xs [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden",
				t,
			),
			...i,
			children: [$.jsx(CD, { id: o, config: n }), $.jsx(MA, { children: r })],
		}),
	});
}
const CD = ({ id: e, config: t }) => {
		const r = Object.entries(t).filter(([, i]) => i.theme || i.color);
		if (!r.length) return null;
		const n = Object.entries(jD)
			.map(([i, a]) => {
				const o = r
					.map(([u, c]) => {
						const s = c.theme?.[i] || c.color;
						return s ? `  --color-${u}: ${s};` : null;
					})
					.filter(Boolean)
					.join(`
`);
				return `${a} [data-chart="${e}"] {
${o}
}`;
			})
			.join(`
`);
		return $.jsx("style", { children: n });
	},
	dh = et;
function ph({
	active: e,
	payload: t,
	className: r,
	indicator: n = "dot",
	hideLabel: i = !1,
	hideIndicator: a = !1,
	label: o,
	labelFormatter: u,
	labelClassName: c,
	formatter: s,
	color: f,
	nameKey: l,
	labelKey: h,
}) {
	const { config: p } = MD(),
		y = k.useMemo(() => {
			if (i || !t?.length) return null;
			const [d] = t,
				b = `${h || d?.dataKey || d?.name || "value"}`,
				w = eb(p, d, b),
				x = !h && typeof o == "string" ? p[o]?.label || o : w?.label;
			return u
				? $.jsx("div", { className: Xe("font-medium", c), children: u(x, t) })
				: x
					? $.jsx("div", { className: Xe("font-medium", c), children: x })
					: null;
		}, [o, u, t, i, c, p, h]);
	if (!e || !t?.length) return null;
	const v = t.length === 1 && n !== "dot";
	return $.jsxs("div", {
		className: Xe(
			"border-border/50 bg-background grid min-w-[8rem] items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl",
			r,
		),
		children: [
			v ? null : y,
			$.jsx("div", {
				className: "grid gap-1.5",
				children: t.map((d, b) => {
					const w = `${l || d.name || d.dataKey || "value"}`,
						x = eb(p, d, w),
						O = f || d.payload.fill || d.color;
					return $.jsx(
						"div",
						{
							className: Xe(
								"[&>svg]:text-muted-foreground flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5",
								n === "dot" && "items-center",
							),
							children:
								s && d?.value !== void 0 && d.name
									? s(d.value, d.name, d, b, d.payload)
									: $.jsxs($.Fragment, {
											children: [
												x?.icon
													? $.jsx(x.icon, {})
													: !a &&
														$.jsx("div", {
															className: Xe("shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)", {
																"h-2.5 w-2.5": n === "dot",
																"w-1": n === "line",
																"w-0 border-[1.5px] border-dashed bg-transparent": n === "dashed",
																"my-0.5": v && n === "dashed",
															}),
															style: { "--color-bg": O, "--color-border": O },
														}),
												$.jsxs("div", {
													className: Xe("flex flex-1 justify-between leading-none", v ? "items-end" : "items-center"),
													children: [
														$.jsxs("div", {
															className: "grid gap-1.5",
															children: [
																v ? y : null,
																$.jsx("span", { className: "text-muted-foreground", children: x?.label || d.name }),
															],
														}),
														d.value &&
															$.jsx("span", {
																className: "text-foreground font-mono font-medium tabular-nums",
																children: d.value.toLocaleString(),
															}),
													],
												}),
											],
										}),
						},
						d.dataKey,
					);
				}),
			}),
		],
	});
}
function eb(e, t, r) {
	if (typeof t != "object" || t === null) return;
	const n = "payload" in t && typeof t.payload == "object" && t.payload !== null ? t.payload : void 0;
	let i = r;
	return (
		r in t && typeof t[r] == "string" ? (i = t[r]) : n && r in n && typeof n[r] == "string" && (i = n[r]),
		i in e ? e[i] : e[r]
	);
}
const ID = { amount: { label: "Electricity bill" } },
	$D = ({ data: e }) =>
		$.jsxs("div", {
			children: [
				$.jsx(hh, {
					config: ID,
					className: "pb-6",
					children: $.jsxs(fh, {
						accessibilityLayer: !0,
						data: e,
						margin: { top: 20 },
						children: [
							$.jsx(ka, { vertical: !1 }),
							$.jsx(Fr, { dataKey: "date", tickLine: !1, tickMargin: 10, axisLine: !1 }),
							$.jsx(dh, { cursor: !1, content: $.jsx(ph, { hideLabel: !0 }) }),
							$.jsx(Ot, {
								dataKey: "amount",
								fill: "var(--color-desktop)",
								radius: 8,
								children: $.jsx(nt, { position: "top", offset: 12, className: "fill-foreground", fontSize: 12 }),
							}),
						],
					}),
				}),
				$.jsx(RD, { data: e }),
			],
		}),
	RD = ({ data: e }) => {
		const t = Math.max(...e.map((a) => a.amount)),
			r = Math.min(...e.map((a) => a.amount)),
			i = e.reduce((a, o) => a + o.amount, 0) / e.length;
		return $.jsx("div", {
			className: "w-full max-w-md bg-white rounded-lg shadow-sm border border-gray-200",
			children: $.jsxs("table", {
				className: "w-full",
				children: [
					$.jsx("thead", {
						children: $.jsxs("tr", {
							className: "border-b border-gray-200",
							children: [
								$.jsx("th", { className: "text-left py-3 px-4 font-medium text-gray-900", children: "สถิติ" }),
								$.jsx("th", { className: "text-right py-3 px-4 font-medium text-gray-900", children: "จำนวนเงิน (฿)" }),
							],
						}),
					}),
					$.jsxs("tbody", {
						children: [
							$.jsxs("tr", {
								className: "border-b border-gray-100",
								children: [
									$.jsx("td", { className: "py-3 px-4 text-gray-700", children: "สูงสุด" }),
									$.jsx("td", {
										className: "py-3 px-4 text-gray-900 text-right font-medium",
										children: t.toLocaleString(),
									}),
								],
							}),
							$.jsxs("tr", {
								className: "border-b border-gray-100",
								children: [
									$.jsx("td", { className: "py-3 px-4 text-gray-700", children: "ต่ำสุด" }),
									$.jsx("td", {
										className: "py-3 px-4 text-gray-900 text-right font-medium",
										children: r.toLocaleString(),
									}),
								],
							}),
							$.jsxs("tr", {
								children: [
									$.jsx("td", { className: "py-3 px-4 text-gray-700", children: "เฉลี่ย" }),
									$.jsx("td", {
										className: "py-3 px-4 text-gray-900 text-right font-medium",
										children: i.toLocaleString(),
									}),
								],
							}),
						],
					}),
				],
			}),
		});
	},
	ND = { amount: { label: "Rent bill" } },
	kD = ({ data: e }) =>
		$.jsxs("div", {
			children: [
				$.jsx(hh, {
					config: ND,
					className: "pb-6",
					children: $.jsxs(fh, {
						accessibilityLayer: !0,
						data: e,
						margin: { top: 20 },
						children: [
							$.jsx(ka, { vertical: !1 }),
							$.jsx(Fr, { dataKey: "date", tickLine: !1, tickMargin: 10, axisLine: !1 }),
							$.jsx(dh, { cursor: !1, content: $.jsx(ph, { hideLabel: !0 }) }),
							$.jsx(Ot, {
								dataKey: "amount",
								fill: "var(--color-desktop)",
								radius: 8,
								children: $.jsx(nt, { position: "top", offset: 12, className: "fill-foreground", fontSize: 12 }),
							}),
						],
					}),
				}),
				$.jsx(DD, { data: e }),
			],
		}),
	DD = ({ data: e }) => {
		const t = Math.max(...e.map((a) => a.amount)),
			r = Math.min(...e.map((a) => a.amount)),
			i = e.reduce((a, o) => a + o.amount, 0) / e.length;
		return $.jsx("div", {
			className: "w-full max-w-md bg-white rounded-lg shadow-sm border border-gray-200",
			children: $.jsxs("table", {
				className: "w-full",
				children: [
					$.jsx("thead", {
						children: $.jsxs("tr", {
							className: "border-b border-gray-200",
							children: [
								$.jsx("th", { className: "text-left py-3 px-4 font-medium text-gray-900", children: "สถิติ" }),
								$.jsx("th", { className: "text-right py-3 px-4 font-medium text-gray-900", children: "จำนวนเงิน (฿)" }),
							],
						}),
					}),
					$.jsxs("tbody", {
						children: [
							$.jsxs("tr", {
								className: "border-b border-gray-100",
								children: [
									$.jsx("td", { className: "py-3 px-4 text-gray-700", children: "สูงสุด" }),
									$.jsx("td", {
										className: "py-3 px-4 text-gray-900 text-right font-medium",
										children: t.toLocaleString(),
									}),
								],
							}),
							$.jsxs("tr", {
								className: "border-b border-gray-100",
								children: [
									$.jsx("td", { className: "py-3 px-4 text-gray-700", children: "ต่ำสุด" }),
									$.jsx("td", {
										className: "py-3 px-4 text-gray-900 text-right font-medium",
										children: r.toLocaleString(),
									}),
								],
							}),
							$.jsxs("tr", {
								children: [
									$.jsx("td", { className: "py-3 px-4 text-gray-700", children: "เฉลี่ย" }),
									$.jsx("td", {
										className: "py-3 px-4 text-gray-900 text-right font-medium",
										children: i.toLocaleString(),
									}),
								],
							}),
						],
					}),
				],
			}),
		});
	},
	qD = { amount: { label: "Water bill" } },
	LD = ({ data: e }) => (
		console.log(e),
		$.jsxs("div", {
			children: [
				$.jsx(hh, {
					config: qD,
					className: "pb-6",
					children: $.jsxs(fh, {
						accessibilityLayer: !0,
						data: e,
						margin: { top: 20 },
						children: [
							$.jsx(ka, { vertical: !1 }),
							$.jsx(Fr, { dataKey: "date", tickLine: !1, tickMargin: 10, axisLine: !1 }),
							$.jsx(dh, { cursor: !1, content: $.jsx(ph, { hideLabel: !0 }) }),
							$.jsx(Ot, {
								dataKey: "amount",
								fill: "var(--color-desktop)",
								radius: 8,
								children: $.jsx(nt, { position: "top", offset: 12, className: "fill-foreground", fontSize: 12 }),
							}),
						],
					}),
				}),
				$.jsx(BD, { data: e }),
			],
		})
	),
	BD = ({ data: e }) => {
		const t = Math.max(...e.map((a) => a.amount)),
			r = Math.min(...e.map((a) => a.amount)),
			i = e.reduce((a, o) => a + o.amount, 0) / e.length;
		return $.jsx("div", {
			className: "w-full max-w-md bg-white rounded-lg shadow-sm border border-gray-200",
			children: $.jsxs("table", {
				className: "w-full",
				children: [
					$.jsx("thead", {
						children: $.jsxs("tr", {
							className: "border-b border-gray-200",
							children: [
								$.jsx("th", { className: "text-left py-3 px-4 font-medium text-gray-900", children: "สถิติ" }),
								$.jsx("th", { className: "text-right py-3 px-4 font-medium text-gray-900", children: "จำนวนเงิน (฿)" }),
							],
						}),
					}),
					$.jsxs("tbody", {
						children: [
							$.jsxs("tr", {
								className: "border-b border-gray-100",
								children: [
									$.jsx("td", { className: "py-3 px-4 text-gray-700", children: "สูงสุด" }),
									$.jsx("td", {
										className: "py-3 px-4 text-gray-900 text-right font-medium",
										children: t.toLocaleString(),
									}),
								],
							}),
							$.jsxs("tr", {
								className: "border-b border-gray-100",
								children: [
									$.jsx("td", { className: "py-3 px-4 text-gray-700", children: "ต่ำสุด" }),
									$.jsx("td", {
										className: "py-3 px-4 text-gray-900 text-right font-medium",
										children: r.toLocaleString(),
									}),
								],
							}),
							$.jsxs("tr", {
								children: [
									$.jsx("td", { className: "py-3 px-4 text-gray-700", children: "เฉลี่ย" }),
									$.jsx("td", {
										className: "py-3 px-4 text-gray-900 text-right font-medium",
										children: i.toLocaleString(),
									}),
								],
							}),
						],
					}),
				],
			}),
		});
	};
class HD extends k.Component {
	tabs = [
		{ value: "rent", label: "ค่าเช่าห้อง" },
		{ value: "electricity", label: "ค่าไฟฟ้า" },
		{ value: "water", label: "ค่าน้ำ" },
	];
	render() {
		return $.jsxs(Xw, {
			defaultValue: "rent",
			className: "w-full",
			children: [
				$.jsx(Yw, {
					className: "flex w-full bg-black",
					children: this.tabs.map((t) =>
						$.jsx(
							Zw,
							{
								value: t.value,
								className: "text-white data-[state=active]:bg-white data-[state=active]:text-black",
								children: t.label,
							},
							t.value,
						),
					),
				}),
				$.jsxs("div", {
					className: "p-6 bg-white",
					children: [
						$.jsx(Ba, { value: "rent", children: $.jsx(kD, { data: this.props.data.rent }) }),
						$.jsx(Ba, { value: "electricity", children: $.jsx($D, { data: this.props.data.electricity }) }),
						$.jsx(Ba, { value: "water", children: $.jsx(LD, { data: this.props.data.water }) }),
					],
				}),
			],
		});
	}
}
export { HD as TabSwitcher };
