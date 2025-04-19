import { c as createExports } from "./chunks/entrypoint_CLR4RFdy.mjs";
import { manifest } from "./manifest_BAZu9fJd.mjs";
import { renderers } from "./renderers.mjs";

const serverIslandMap = new Map();

const _page0 = () => import("./pages/_image.astro.mjs");
const _page1 = () => import("./pages/analysis.astro.mjs");
const _page2 = () => import("./pages/api/trpc/_trpc_.astro.mjs");
const _page3 = () => import("./pages/bedstatus.astro.mjs");
const _page4 = () => import("./pages/bill.astro.mjs");
const _page5 = () => import("./pages/extend.astro.mjs");
const _page6 = () => import("./pages/news.astro.mjs");
const _page7 = () => import("./pages/notifications.astro.mjs");
const _page8 = () => import("./pages/profile/components/infocard.astro.mjs");
const _page9 = () => import("./pages/profile/components/infoitem.astro.mjs");
const _page10 = () => import("./pages/profile/components/personalinfo.astro.mjs");
const _page11 = () => import("./pages/profile.astro.mjs");
const _page12 = () => import("./pages/report.astro.mjs");
const _page13 = () => import("./pages/selectbed.astro.mjs");
const _page14 = () => import("./pages/settings.astro.mjs");
const _page15 = () => import("./pages/index.astro.mjs");
const pageMap = new Map([
	["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
	["src/pages/analysis/index.astro", _page1],
	["src/pages/api/trpc/[trpc].ts", _page2],
	["src/pages/bedstatus/index.astro", _page3],
	["src/pages/bill/index.astro", _page4],
	["src/pages/extend/index.astro", _page5],
	["src/pages/news/index.astro", _page6],
	["src/pages/notifications/index.astro", _page7],
	["src/pages/profile/components/InfoCard.astro", _page8],
	["src/pages/profile/components/InfoItem.astro", _page9],
	["src/pages/profile/components/PersonalInfo.astro", _page10],
	["src/pages/profile/index.astro", _page11],
	["src/pages/report/index.astro", _page12],
	["src/pages/selectbed/index.astro", _page13],
	["src/pages/settings/index.astro", _page14],
	["src/pages/index.astro", _page15],
]);

const _manifest = Object.assign(manifest, {
	pageMap,
	serverIslandMap,
	renderers,
	actions: () => import("./_noop-actions.mjs"),
	middleware: () => import("./_noop-middleware.mjs"),
});
const _args = {
	middlewareSecret: "6da252be-2c4b-4d00-990e-963645c48b6a",
	skewProtection: false,
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
