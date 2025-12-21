import { generateRssFeed } from "feedsmith";
import blogInfo from "~~/shared/utils/blogInfo.js";

const config = useRuntimeConfig();

export default defineCachedEventHandler(
	async (event) => {
		const data: Array<object> = await event.$fetch("/api/blogs");
		const items: Array<any> = [];
		/*
		[
				{
					title: "Hello World",
					link: "https://arenot.cn/blog/70",
					description: "My first post",
					pubDate: new Date(),
				},
			],
		*/
		if (data) {
			data.forEach((blog: any) => {
				items.push({
					title: blogInfo.getTitle(blog.title),
					link: "https://arenot.cn/blog/" + blog.number,
					description: blogInfo.getAbstract(blog.title),
					pubDate: new Date(blog.createdAt),
				});
			});
		}
		const rss = generateRssFeed({
			title: "NANOARE'S BLOG",
			link: "https://arenot.cn/blog",
			description:
				"Nanoare 的网络日志(blogs)、编程日记(notes)、作品合集(projects)发布页",
			image: {
				url: "https://arenot.cn/img/logo.png",
				link: "https://arenot.cn/blog",
				title: "ARENOT | Nanoare official website",
			},
			items,
		});
		setHeader(event, "Content-Type", "application/xml");
		//已经配置了缓存，这里省略下面的代码 ps：你请求时发现响应头设置不起作用，600秒被覆盖成了1小时
		// setHeader(event, "Cache-Control", "max-age=600");
		// setHeader(event, "Last-Modified", new Date().toUTCString());
		setHeader(
			event,
			"Expires",
			new Date(Date.now() + 10 * 60 * 1000).toUTCString()
		);
		return rss;
	},
	{
		maxAge: config.public.CACHE_TIME,
		getKey: (event) => event.path,
	}
);
