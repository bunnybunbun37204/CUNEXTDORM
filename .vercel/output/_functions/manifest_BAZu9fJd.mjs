import "kleur/colors";
import { g as decodeKey } from "./chunks/astro/server_sfyfDN_r.mjs";
import "clsx";
import "cookie";
import { N as NOOP_MIDDLEWARE_FN } from "./chunks/astro-designed-error-pages_dDkNDAy_.mjs";
import "es-module-lexer";

function sanitizeParams(params) {
	return Object.fromEntries(
		Object.entries(params).map(([key, value]) => {
			if (typeof value === "string") {
				return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
			}
			return [key, value];
		}),
	);
}
function getParameter(part, params) {
	if (part.spread) {
		return params[part.content.slice(3)] || "";
	}
	if (part.dynamic) {
		if (!params[part.content]) {
			throw new TypeError(`Missing parameter: ${part.content}`);
		}
		return params[part.content];
	}
	return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
	const segmentPath = segment.map((part) => getParameter(part, params)).join("");
	return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
	return (params) => {
		const sanitizedParams = sanitizeParams(params);
		let trailing = "";
		if (addTrailingSlash === "always" && segments.length) {
			trailing = "/";
		}
		const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
		return path || "/";
	};
}

function deserializeRouteData(rawRouteData) {
	return {
		route: rawRouteData.route,
		type: rawRouteData.type,
		pattern: new RegExp(rawRouteData.pattern),
		params: rawRouteData.params,
		component: rawRouteData.component,
		generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
		pathname: rawRouteData.pathname || void 0,
		segments: rawRouteData.segments,
		prerender: rawRouteData.prerender,
		redirect: rawRouteData.redirect,
		redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
		fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
			return deserializeRouteData(fallback);
		}),
		isIndex: rawRouteData.isIndex,
		origin: rawRouteData.origin,
	};
}

function deserializeManifest(serializedManifest) {
	const routes = [];
	for (const serializedRoute of serializedManifest.routes) {
		routes.push({
			...serializedRoute,
			routeData: deserializeRouteData(serializedRoute.routeData),
		});
		const route = serializedRoute;
		route.routeData = deserializeRouteData(serializedRoute.routeData);
	}
	const assets = new Set(serializedManifest.assets);
	const componentMetadata = new Map(serializedManifest.componentMetadata);
	const inlinedScripts = new Map(serializedManifest.inlinedScripts);
	const clientDirectives = new Map(serializedManifest.clientDirectives);
	const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
	const key = decodeKey(serializedManifest.key);
	return {
		// in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
		middleware() {
			return { onRequest: NOOP_MIDDLEWARE_FN };
		},
		...serializedManifest,
		assets,
		componentMetadata,
		inlinedScripts,
		clientDirectives,
		routes,
		serverIslandNameMap,
		key,
	};
}

const manifest = deserializeManifest({
	hrefRoot: "file:///Users/nathawatwai/Documents/CUNEXTDORM/",
	cacheDir: "file:///Users/nathawatwai/Documents/CUNEXTDORM/node_modules/.astro/",
	outDir: "file:///Users/nathawatwai/Documents/CUNEXTDORM/dist/",
	srcDir: "file:///Users/nathawatwai/Documents/CUNEXTDORM/src/",
	publicDir: "file:///Users/nathawatwai/Documents/CUNEXTDORM/public/",
	buildClientDir: "file:///Users/nathawatwai/Documents/CUNEXTDORM/dist/client/",
	buildServerDir: "file:///Users/nathawatwai/Documents/CUNEXTDORM/dist/server/",
	adapterName: "@astrojs/vercel",
	routes: [
		{
			file: "",
			links: [],
			scripts: [],
			styles: [],
			routeData: {
				type: "page",
				component: "_server-islands.astro",
				params: ["name"],
				segments: [
					[{ content: "_server-islands", dynamic: false, spread: false }],
					[{ content: "name", dynamic: true, spread: false }],
				],
				pattern: "^\\/_server-islands\\/([^/]+?)\\/?$",
				prerender: false,
				isIndex: false,
				fallbackRoutes: [],
				route: "/_server-islands/[name]",
				origin: "internal",
				_meta: { trailingSlash: "ignore" },
			},
		},
		{
			file: "",
			links: [],
			scripts: [],
			styles: [],
			routeData: {
				type: "endpoint",
				isIndex: false,
				route: "/_image",
				pattern: "^\\/_image\\/?$",
				segments: [[{ content: "_image", dynamic: false, spread: false }]],
				params: [],
				component: "node_modules/astro/dist/assets/endpoint/generic.js",
				pathname: "/_image",
				prerender: false,
				fallbackRoutes: [],
				origin: "internal",
				_meta: { trailingSlash: "ignore" },
			},
		},
		{
			file: "",
			links: [],
			scripts: [],
			styles: [{ type: "external", src: "/_astro/index.C0CwFT_V.css" }],
			routeData: {
				route: "/analysis",
				isIndex: true,
				type: "page",
				pattern: "^\\/analysis\\/?$",
				segments: [[{ content: "analysis", dynamic: false, spread: false }]],
				params: [],
				component: "src/pages/analysis/index.astro",
				pathname: "/analysis",
				prerender: false,
				fallbackRoutes: [],
				distURL: [],
				origin: "project",
				_meta: { trailingSlash: "ignore" },
			},
		},
		{
			file: "",
			links: [],
			scripts: [],
			styles: [],
			routeData: {
				route: "/api/trpc/[trpc]",
				isIndex: false,
				type: "endpoint",
				pattern: "^\\/api\\/trpc\\/([^/]+?)\\/?$",
				segments: [
					[{ content: "api", dynamic: false, spread: false }],
					[{ content: "trpc", dynamic: false, spread: false }],
					[{ content: "trpc", dynamic: true, spread: false }],
				],
				params: ["trpc"],
				component: "src/pages/api/trpc/[trpc].ts",
				prerender: false,
				fallbackRoutes: [],
				distURL: [],
				origin: "project",
				_meta: { trailingSlash: "ignore" },
			},
		},
		{
			file: "",
			links: [],
			scripts: [],
			styles: [{ type: "external", src: "/_astro/index.C0CwFT_V.css" }],
			routeData: {
				route: "/bedstatus",
				isIndex: true,
				type: "page",
				pattern: "^\\/bedstatus\\/?$",
				segments: [[{ content: "bedstatus", dynamic: false, spread: false }]],
				params: [],
				component: "src/pages/bedstatus/index.astro",
				pathname: "/bedstatus",
				prerender: false,
				fallbackRoutes: [],
				distURL: [],
				origin: "project",
				_meta: { trailingSlash: "ignore" },
			},
		},
		{
			file: "",
			links: [],
			scripts: [],
			styles: [
				{ type: "external", src: "/_astro/index.C0CwFT_V.css" },
				{ type: "inline", content: ".icon[data-astro-cid-saki7ppe]{width:14px;height:14px}\n" },
			],
			routeData: {
				route: "/bill",
				isIndex: true,
				type: "page",
				pattern: "^\\/bill\\/?$",
				segments: [[{ content: "bill", dynamic: false, spread: false }]],
				params: [],
				component: "src/pages/bill/index.astro",
				pathname: "/bill",
				prerender: false,
				fallbackRoutes: [],
				distURL: [],
				origin: "project",
				_meta: { trailingSlash: "ignore" },
			},
		},
		{
			file: "",
			links: [],
			scripts: [],
			styles: [{ type: "external", src: "/_astro/index.C0CwFT_V.css" }],
			routeData: {
				route: "/extend",
				isIndex: true,
				type: "page",
				pattern: "^\\/extend\\/?$",
				segments: [[{ content: "extend", dynamic: false, spread: false }]],
				params: [],
				component: "src/pages/extend/index.astro",
				pathname: "/extend",
				prerender: false,
				fallbackRoutes: [],
				distURL: [],
				origin: "project",
				_meta: { trailingSlash: "ignore" },
			},
		},
		{
			file: "",
			links: [],
			scripts: [],
			styles: [{ type: "external", src: "/_astro/index.C0CwFT_V.css" }],
			routeData: {
				route: "/news",
				isIndex: true,
				type: "page",
				pattern: "^\\/news\\/?$",
				segments: [[{ content: "news", dynamic: false, spread: false }]],
				params: [],
				component: "src/pages/news/index.astro",
				pathname: "/news",
				prerender: false,
				fallbackRoutes: [],
				distURL: [],
				origin: "project",
				_meta: { trailingSlash: "ignore" },
			},
		},
		{
			file: "",
			links: [],
			scripts: [],
			styles: [{ type: "external", src: "/_astro/index.C0CwFT_V.css" }],
			routeData: {
				route: "/notifications",
				isIndex: true,
				type: "page",
				pattern: "^\\/notifications\\/?$",
				segments: [[{ content: "notifications", dynamic: false, spread: false }]],
				params: [],
				component: "src/pages/notifications/index.astro",
				pathname: "/notifications",
				prerender: false,
				fallbackRoutes: [],
				distURL: [],
				origin: "project",
				_meta: { trailingSlash: "ignore" },
			},
		},
		{
			file: "",
			links: [],
			scripts: [],
			styles: [],
			routeData: {
				route: "/profile/components/infocard",
				isIndex: false,
				type: "page",
				pattern: "^\\/profile\\/components\\/InfoCard\\/?$",
				segments: [
					[{ content: "profile", dynamic: false, spread: false }],
					[{ content: "components", dynamic: false, spread: false }],
					[{ content: "InfoCard", dynamic: false, spread: false }],
				],
				params: [],
				component: "src/pages/profile/components/InfoCard.astro",
				pathname: "/profile/components/InfoCard",
				prerender: false,
				fallbackRoutes: [],
				distURL: [],
				origin: "project",
				_meta: { trailingSlash: "ignore" },
			},
		},
		{
			file: "",
			links: [],
			scripts: [],
			styles: [],
			routeData: {
				route: "/profile/components/infoitem",
				isIndex: false,
				type: "page",
				pattern: "^\\/profile\\/components\\/InfoItem\\/?$",
				segments: [
					[{ content: "profile", dynamic: false, spread: false }],
					[{ content: "components", dynamic: false, spread: false }],
					[{ content: "InfoItem", dynamic: false, spread: false }],
				],
				params: [],
				component: "src/pages/profile/components/InfoItem.astro",
				pathname: "/profile/components/InfoItem",
				prerender: false,
				fallbackRoutes: [],
				distURL: [],
				origin: "project",
				_meta: { trailingSlash: "ignore" },
			},
		},
		{
			file: "",
			links: [],
			scripts: [],
			styles: [],
			routeData: {
				route: "/profile/components/personalinfo",
				isIndex: false,
				type: "page",
				pattern: "^\\/profile\\/components\\/PersonalInfo\\/?$",
				segments: [
					[{ content: "profile", dynamic: false, spread: false }],
					[{ content: "components", dynamic: false, spread: false }],
					[{ content: "PersonalInfo", dynamic: false, spread: false }],
				],
				params: [],
				component: "src/pages/profile/components/PersonalInfo.astro",
				pathname: "/profile/components/PersonalInfo",
				prerender: false,
				fallbackRoutes: [],
				distURL: [],
				origin: "project",
				_meta: { trailingSlash: "ignore" },
			},
		},
		{
			file: "",
			links: [],
			scripts: [],
			styles: [{ type: "external", src: "/_astro/index.C0CwFT_V.css" }],
			routeData: {
				route: "/profile",
				isIndex: true,
				type: "page",
				pattern: "^\\/profile\\/?$",
				segments: [[{ content: "profile", dynamic: false, spread: false }]],
				params: [],
				component: "src/pages/profile/index.astro",
				pathname: "/profile",
				prerender: false,
				fallbackRoutes: [],
				distURL: [],
				origin: "project",
				_meta: { trailingSlash: "ignore" },
			},
		},
		{
			file: "",
			links: [],
			scripts: [],
			styles: [{ type: "external", src: "/_astro/index.C0CwFT_V.css" }],
			routeData: {
				route: "/report",
				isIndex: true,
				type: "page",
				pattern: "^\\/report\\/?$",
				segments: [[{ content: "report", dynamic: false, spread: false }]],
				params: [],
				component: "src/pages/report/index.astro",
				pathname: "/report",
				prerender: false,
				fallbackRoutes: [],
				distURL: [],
				origin: "project",
				_meta: { trailingSlash: "ignore" },
			},
		},
		{
			file: "",
			links: [],
			scripts: [],
			styles: [{ type: "external", src: "/_astro/index.C0CwFT_V.css" }],
			routeData: {
				route: "/selectbed",
				isIndex: true,
				type: "page",
				pattern: "^\\/selectbed\\/?$",
				segments: [[{ content: "selectbed", dynamic: false, spread: false }]],
				params: [],
				component: "src/pages/selectbed/index.astro",
				pathname: "/selectbed",
				prerender: false,
				fallbackRoutes: [],
				distURL: [],
				origin: "project",
				_meta: { trailingSlash: "ignore" },
			},
		},
		{
			file: "",
			links: [],
			scripts: [],
			styles: [],
			routeData: {
				route: "/settings",
				isIndex: true,
				type: "page",
				pattern: "^\\/settings\\/?$",
				segments: [[{ content: "settings", dynamic: false, spread: false }]],
				params: [],
				component: "src/pages/settings/index.astro",
				pathname: "/settings",
				prerender: false,
				fallbackRoutes: [],
				distURL: [],
				origin: "project",
				_meta: { trailingSlash: "ignore" },
			},
		},
		{
			file: "",
			links: [],
			scripts: [],
			styles: [
				{ type: "external", src: "/_astro/index.C0CwFT_V.css" },
				{ type: "inline", content: ".icon[data-astro-cid-j7pv25f6]{width:28px;color:#fff}\n" },
			],
			routeData: {
				route: "/",
				isIndex: true,
				type: "page",
				pattern: "^\\/$",
				segments: [],
				params: [],
				component: "src/pages/index.astro",
				pathname: "/",
				prerender: false,
				fallbackRoutes: [],
				distURL: [],
				origin: "project",
				_meta: { trailingSlash: "ignore" },
			},
		},
	],
	base: "/",
	trailingSlash: "ignore",
	compressHTML: true,
	componentMetadata: [
		[
			"/Users/nathawatwai/Documents/CUNEXTDORM/src/pages/analysis/index.astro",
			{ propagation: "none", containsHead: true },
		],
		[
			"/Users/nathawatwai/Documents/CUNEXTDORM/src/pages/bedstatus/index.astro",
			{ propagation: "none", containsHead: true },
		],
		["/Users/nathawatwai/Documents/CUNEXTDORM/src/pages/bill/index.astro", { propagation: "none", containsHead: true }],
		[
			"/Users/nathawatwai/Documents/CUNEXTDORM/src/pages/extend/index.astro",
			{ propagation: "none", containsHead: true },
		],
		["/Users/nathawatwai/Documents/CUNEXTDORM/src/pages/index.astro", { propagation: "none", containsHead: true }],
		["/Users/nathawatwai/Documents/CUNEXTDORM/src/pages/news/index.astro", { propagation: "none", containsHead: true }],
		[
			"/Users/nathawatwai/Documents/CUNEXTDORM/src/pages/notifications/index.astro",
			{ propagation: "none", containsHead: true },
		],
		[
			"/Users/nathawatwai/Documents/CUNEXTDORM/src/pages/profile/index.astro",
			{ propagation: "none", containsHead: true },
		],
		[
			"/Users/nathawatwai/Documents/CUNEXTDORM/src/pages/report/index.astro",
			{ propagation: "none", containsHead: true },
		],
		[
			"/Users/nathawatwai/Documents/CUNEXTDORM/src/pages/selectbed/index.astro",
			{ propagation: "none", containsHead: true },
		],
	],
	renderers: [],
	clientDirectives: [
		[
			"idle",
			'(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value=="object"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};"requestIdleCallback"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event("astro:idle"));})();',
		],
		[
			"load",
			'(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event("astro:load"));})();',
		],
		[
			"media",
			'(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener("change",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event("astro:media"));})();',
		],
		[
			"only",
			'(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event("astro:only"));})();',
		],
		[
			"visible",
			'(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value=="object"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event("astro:visible"));})();',
		],
	],
	entryModules: {
		"\u0000@astrojs-ssr-adapter": "_@astrojs-ssr-adapter.mjs",
		"\u0000noop-middleware": "_noop-middleware.mjs",
		"\u0000noop-actions": "_noop-actions.mjs",
		"\u0000@astro-page:src/pages/profile/components/InfoCard@_@astro": "pages/profile/components/infocard.astro.mjs",
		"\u0000@astro-page:src/pages/profile/components/InfoItem@_@astro": "pages/profile/components/infoitem.astro.mjs",
		"\u0000@astro-page:src/pages/profile/components/PersonalInfo@_@astro":
			"pages/profile/components/personalinfo.astro.mjs",
		"\u0000@astro-page:src/pages/bedstatus/index@_@astro": "pages/bedstatus.astro.mjs",
		"\u0000@astro-page:src/pages/extend/index@_@astro": "pages/extend.astro.mjs",
		"\u0000@astro-page:src/pages/news/index@_@astro": "pages/news.astro.mjs",
		"\u0000@astro-page:src/pages/notifications/index@_@astro": "pages/notifications.astro.mjs",
		"\u0000@astro-page:src/pages/profile/index@_@astro": "pages/profile.astro.mjs",
		"\u0000@astro-page:src/pages/selectbed/index@_@astro": "pages/selectbed.astro.mjs",
		"\u0000@astro-page:src/pages/settings/index@_@astro": "pages/settings.astro.mjs",
		"\u0000@astro-page:src/pages/index@_@astro": "pages/index.astro.mjs",
		"\u0000@astrojs-ssr-virtual-entry": "entry.mjs",
		"\u0000@astro-page:src/pages/report/index@_@astro": "pages/report.astro.mjs",
		"\u0000@astro-page:src/pages/api/trpc/[trpc]@_@ts": "pages/api/trpc/_trpc_.astro.mjs",
		"\u0000@astro-renderers": "renderers.mjs",
		"\u0000@astro-page:src/pages/bill/index@_@astro": "pages/bill.astro.mjs",
		"\u0000@astro-page:src/pages/analysis/index@_@astro": "pages/analysis.astro.mjs",
		"\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js": "pages/_image.astro.mjs",
		"/Users/nathawatwai/Documents/CUNEXTDORM/node_modules/astro/dist/assets/services/sharp.js":
			"chunks/sharp_v8hEt8pB.mjs",
		"\u0000@astrojs-manifest": "manifest_BAZu9fJd.mjs",
		"/Users/nathawatwai/Documents/CUNEXTDORM/src/pages/analysis/components/tabSwitcher.tsx":
			"_astro/tabSwitcher.CnvinHrD.js",
		"/Users/nathawatwai/Documents/CUNEXTDORM/src/pages/bill/components/billAccorder": "_astro/billAccorder.C9sCARds.js",
		"/Users/nathawatwai/Documents/CUNEXTDORM/src/pages/report/components/reportForm": "_astro/reportForm.ePzy1QtZ.js",
		"@astrojs/react/client.js": "_astro/client.CqBhBUpr.js",
		"astro:scripts/before-hydration.js": "",
	},
	inlinedScripts: [],
	assets: [
		"/_astro/background.BixuiZes.png",
		"/_astro/index.C0CwFT_V.css",
		"/favicon.svg",
		"/_astro/billAccorder.C9sCARds.js",
		"/_astro/client.CqBhBUpr.js",
		"/_astro/createLucideIcon.LW8We0kz.js",
		"/_astro/index.CDlOlYQx.js",
		"/_astro/index.CclUD5iE.js",
		"/_astro/jsx-runtime.D_zvdyIk.js",
		"/_astro/reportForm.ePzy1QtZ.js",
		"/_astro/tabSwitcher.CnvinHrD.js",
		"/_astro/utils.B-hw8VEN.js",
	],
	buildFormat: "directory",
	checkOrigin: true,
	serverIslandNameMap: [],
	key: "Y+KWec02Jqa+qiJWG1zRbcTitnEmVH6jGzhaWK5CqqU=",
});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
