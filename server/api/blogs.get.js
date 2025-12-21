const config = useRuntimeConfig();
export default defineCachedEventHandler(
	async (event) => {
		const config = useRuntimeConfig(event);

		const query = getQuery(event);

		try {
			const token = getCookie(event, "access_token");
			gitdcus.auth({
				token: token || process.env.TL_TOKEN,
				owner: config.public.TL_OWNER,
				name: config.public.TL_NAME,
			});
			const data = await gitdcus.queryByCategoryName("blog", {
				after: query.end ? query.end : null,
				before: query.start ? query.start : null,
				[query.start ? "last" : "first"]: 5,
			});
			// console.log(query.end,query.start,[query.start?'last':"first"],5);

			return data;
			// setResponseStatus(event, 500);
		} catch (error) {}
	},
	{
		maxAge: config.public.CACHE_TIME,
		getKey: (event) => event.path,
	}
);
