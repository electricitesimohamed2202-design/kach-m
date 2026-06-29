import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DXjAb9eS.mjs";
import { i as require_react, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { I as useRouter, c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, k as redirect, m as createFileRoute, p as lazyRouteComponent, s as Scripts } from "../_libs--tanstack-react-router+[...].mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { t as Route$7 } from "./c.-slug-DkvxS1QL.mjs";
import { t as Route$8 } from "./clients.-id-BxmjqwIL.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-DjLUZPAC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var styles_default = "/assets/styles-CNkjTW4S.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
var _jsxFileName$1 = "/app/applet/src/components/ui/sonner.tsx";
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 7,
		columnNumber: 5
	}, void 0);
};
var _jsxFileName = "/app/applet/src/routes/__root.tsx";
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "font-serif text-7xl text-gold",
					children: "404"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 21,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-4 text-sm text-muted-foreground uppercase tracking-[0.3em]",
					children: "Page not found"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 22,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/",
					className: "mt-8 inline-block border border-gold/40 px-6 py-3 text-xs uppercase tracking-[0.2em] text-gold hover:bg-gold hover:text-obsidian transition-colors",
					children: "Return Home"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 25,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 20,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 19,
		columnNumber: 5
	}, this);
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "font-serif text-3xl text-white",
					children: "Something went wrong"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 45,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: error.message
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 46,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					onClick: () => {
						router.invalidate();
						reset();
					},
					className: "mt-6 bg-gold text-obsidian px-6 py-3 text-xs uppercase tracking-[0.2em] font-semibold",
					children: "Try again"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 47,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 44,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 43,
		columnNumber: 5
	}, this);
}
var Route$6 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Kach QR Code — Luxury Digital Business Profiles" },
			{
				name: "description",
				content: "Create premium digital profile pages for your clients and generate luxury QR codes."
			},
			{
				name: "theme-color",
				content: "#0A0A0A"
			},
			{
				property: "og:title",
				content: "Kach QR Code — Luxury Digital Business Profiles"
			},
			{
				property: "og:description",
				content: "Create premium digital profile pages for your clients and generate luxury QR codes."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:title",
				content: "Kach QR Code — Luxury Digital Business Profiles"
			},
			{
				name: "twitter:description",
				content: "Create premium digital profile pages for your clients and generate luxury QR codes."
			},
			{
				property: "og:image",
				content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/c14386f9-7119-4449-bfcf-2fde28cb7881/id-preview-de02ca85--15d19161-6bb6-4675-8f09-d5a7e0bb98ac.lovable.app-1782488681458.png"
			},
			{
				name: "twitter:image",
				content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/c14386f9-7119-4449-bfcf-2fde28cb7881/id-preview-de02ca85--15d19161-6bb6-4675-8f09-d5a7e0bb98ac.lovable.app-1782488681458.png"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("html", {
		lang: "en",
		className: "dark",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("head", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(HeadContent, {}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 118,
			columnNumber: 9
		}, this) }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 117,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Scripts, {}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 122,
			columnNumber: 9
		}, this)] }, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 120,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 116,
		columnNumber: 5
	}, this);
}
function RootComponent() {
	const { queryClient } = Route$6.useRouteContext();
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		const { data: sub } = supabase.auth.onAuthStateChange((event) => {
			if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
			router.invalidate();
			if (event !== "SIGNED_OUT") queryClient.invalidateQueries();
		});
		return () => sub.subscription.unsubscribe();
	}, [router, queryClient]);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(QueryClientProvider, {
		client: queryClient,
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Outlet, {}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 141,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Toaster$1, { theme: "dark" }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 142,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 140,
		columnNumber: 5
	}, this);
}
var $$splitComponentImporter$5 = () => import("./auth-HVp4XTWo.mjs");
var Route$5 = createFileRoute("/auth")({
	ssr: false,
	head: () => ({ meta: [{ title: "Admin — Kach QR Code" }] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./route-Dx4f0jld.mjs");
var Route$4 = createFileRoute("/_authenticated")({
	ssr: false,
	beforeLoad: async () => {
		const { data, error } = await supabase.auth.getUser();
		if (error || !data.user) throw redirect({ to: "/auth" });
		const { data: roleRow } = await supabase.from("user_roles").select("role").eq("user_id", data.user.id).eq("role", "admin").maybeSingle();
		if (!roleRow) throw redirect({ to: "/auth" });
		return { user: data.user };
	},
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./routes-CW3_x7Ln.mjs");
var Route$3 = createFileRoute("/")({
	head: () => ({ meta: [{ title: "Kach QR Code — Luxury Digital Profiles" }, {
		name: "description",
		content: "Premium digital business profiles delivered through a single elegant QR code."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./settings-KCvKyJL8.mjs");
var Route$2 = createFileRoute("/_authenticated/settings")({
	head: () => ({ meta: [{ title: "Admin Settings — Kach QR Code" }] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./dashboard-Xd9Q22ND.mjs");
var Route$1 = createFileRoute("/_authenticated/dashboard")({
	head: () => ({ meta: [{ title: "Dashboard — Kach QR Code" }] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./clients.new-M7o4etzc.mjs");
var Route = createFileRoute("/_authenticated/clients/new")({
	head: () => ({ meta: [{ title: "New Client — Kach QR Code" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var AuthRoute = Route$5.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$6
});
var AuthenticatedRouteRoute = Route$4.update({
	id: "/_authenticated",
	getParentRoute: () => Route$6
});
var IndexRoute = Route$3.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$6
});
var CSlugRoute = Route$7.update({
	id: "/c/$slug",
	path: "/c/$slug",
	getParentRoute: () => Route$6
});
var AuthenticatedSettingsRoute = Route$2.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedDashboardRoute = Route$1.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedClientsNewRoute = Route.update({
	id: "/clients/new",
	path: "/clients/new",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedRouteRouteChildren = {
	AuthenticatedDashboardRoute,
	AuthenticatedSettingsRoute,
	AuthenticatedClientsIdRoute: Route$8.update({
		id: "/clients/$id",
		path: "/clients/$id",
		getParentRoute: () => AuthenticatedRouteRoute
	}),
	AuthenticatedClientsNewRoute
};
var rootRouteChildren = {
	IndexRoute,
	AuthenticatedRouteRoute: AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren),
	AuthRoute,
	CSlugRoute
};
var routeTree = Route$6._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient({ defaultOptions: { queries: {
			staleTime: 3e4,
			refetchOnWindowFocus: false
		} } }) },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
