export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig(event);

	const data = await readBody(event);
	const token = getCookie(event, "access_token");
	if (!data?.id) {
		setResponseStatus(event, 400);
	}
	if (!token) {
		setResponseStatus(event, 401);
	}
	gitdcus.auth({
		token: token,
		owner: config.public.TL_OWNER,
		name: config.public.TL_NAME,
	});
	await gitdcus
		.deleteDiscussion(data.id)
		.then(async () => {
			await useStorage("cache").removeItem(
				`nitro:handlers:_:apiblogs${data.id}.json`
			);
			await useStorage("cache").removeItem(`nitro:handlers:_:apiblogs.json`);
			setResponseStatus(event, 200);
		})
		.catch((error) => {
			setResponseStatus(event, 500);
		});
});
