// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	typescript: {
		typeCheck: false, //构建或开发时启用类型检查，Bug:https://github.com/nuxt/nuxt/issues/33647
		strict: false,
	},
	nitro: {
		preset: "cloudflare_module",
		cloudflare: {
			deployConfig: true,
			nodeCompat: true,
		},
		prerender: {
			autoSubfolderIndex: false,
		},
		storage: {
			cache: {
				driver: "cloudflare-kv-binding",
				binding: "NANOARE_WEBSITE_CACHE",
			},
		},
	},
	runtimeConfig: {
		public: {
			//网站基本配置
			LINK: process.env.NUXT_PUBLIC_LINK || "https://example.com/",
			AUTHOR: process.env.NUXT_PUBLIC_AUTHOR || "AUTHOR NAME",
			GHCDN: process.env.NUXT_PUBLIC_GHCDN || "https://testingcf.jsdelivr.net",
			CACHE_TIME: +process.env.NUXT_PUBLIC_CACHE_TIME || 3600,
			//Github 配置
			TL_OWNER: process.env.NUXT_PUBLIC_TL_OWNER,
			TL_NAME: process.env.NUXT_PUBLIC_TL_NAME,
		},
	},
	css: ["~~/node_modules/normalize.css/normalize.css", "~/assets/css/main.css"],

	routeRules: {
		"/blog/new": {
			ssr: false, //关闭服务端渲染
		},
		"/blog/edit/*": {
			ssr: false, //关闭服务端渲染
		},
		"/": {
			prerender: true, //首页预渲染
		},
		"/about": {
			prerender: true, //about预渲染
		},
	},
	app: {
		head: {
			// title:'Nanoare',
			titleTemplate: "Arenot | %s",
			htmlAttrs: {
				lang: "zh",
			},
			link: [
				{
					rel: "icon",
					type: "image/png",
					sizes: "512x512",
					href: "/favicon/favicon.png",
				},
				{ rel: "manifest", href: "/manifest.json" }, //PWA
			],
			script: [
				{
					src: "/js/app.js",
				},
			],
			meta: [
				{
					name: "theme-color",
					content: "#2680d5",
					media: "(prefers-color-scheme: light)",
				},
				{
					name: "theme-color",
					content: "#03c4a1",
					media: "(prefers-color-scheme: dark)",
				},
			],
		},
	},
	compatibilityDate: "2025-07-15",
	devtools: {
		enabled: false,

		timeline: {
			enabled: true,
		},
	},
	devServer: {
		host: "0.0.0.0",
	},
	vite: {
		assetsInclude: ["**/*.md"],
	},
});
