export default defineEventHandler(async (event) => {
    const query = getQuery(event)
	try {
		const access_token_res  = await fetch(
			"https://github.com/login/oauth/access_token",
			{
				method: "post",
				headers: {
					"Content-Type": "application/json;charset=utf-8;",
					Accept: "application/json",
				},
				body: JSON.stringify({
					client_id: "Iv23liOZ63fLxRHKZIFy",
					client_secret: "cc83ae3e84d37368b38c0e917b6021b3d36835f0",
					code: query.code,
				}),
			}
		);
        const access_token = await access_token_res.json()
        setResponseStatus(event,access_token_res.status)
        return access_token
	} catch (error) {
		console.log(error);
		
	}
});
