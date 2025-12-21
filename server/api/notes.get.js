const config = useRuntimeConfig();
export default defineCachedEventHandler(
	async (event) => {
		const config = useRuntimeConfig(event);

		try {
			const token = getCookie(event, "access_token");
			gitdcus.auth({
				token: token || process.env.TL_TOKEN,
				owner: config.public.TL_OWNER,
				name: config.public.TL_NAME,
			});
			const data = await gitdcus.queryByCategoryName("note", {
				body: true,
				first: 100,
			});
			return data;
			// setResponseStatus(event, 500);
		} catch (error) {}
	},
	{
		maxAge: config.public.CACHE_TIME,
		getKey: (event) => event.path,
	}
);
