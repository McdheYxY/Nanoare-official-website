const config = useRuntimeConfig();
export default defineCachedEventHandler(
	async (event) => {
		const config = useRuntimeConfig(event);

		const number = parseInt(getRouterParam(event, "number"));
		if (!Number.isInteger(number)) {
			setResponseStatus(event, 400);
		}
		try {
			const token = getCookie(event, "access_token");
			gitdcus.auth({
				token: token || process.env.TL_TOKEN,
				owner: config.public.TL_OWNER,
				name: config.public.TL_NAME,
			});
			const data = await gitdcus.queryByNumber(number);
			return data;
			// setResponseStatus(event, 500);
		} catch (error) {}
	},
	{
		maxAge: config.public.CACHE_TIME,
		getKey: (event) => event.path,
	}
);
