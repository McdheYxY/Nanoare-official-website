
async function getB2Mp4Url(bvid, cid) {
	if (!bvid || !cid) throw new Error(`error agrs is null`);
	
	var fetchUrl = `https://api.bilibili.com/x/player/hls?bvid=${bvid}&cid=${cid}&fnver=0&qn=64&force_host=2&high_quality=1`;
	return fetch(fetchUrl, {
		method:"GET",
		headers: {
			accept:
				"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
			"Content-Type": "application/json",
			"accept-encoding": "gzip, deflate, br, zstd",
			"accept-language": "zh-CN,zh;q=0.9",
			"cache-control": "no-cache",
			"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36"
		},
	})
		.then(async (res) => {
			console.log(
				res.headers.forEach((v, k) => {
					console.log(k, ": ", v);
				})
			);
			if (res.status != 200) throw new Error(`error ${res.status}`);
			return res.json();
		})
		.then((result) => {
			console.log(result);
			if (result?.data?.durl[0]?.url) {
				let url = new URL(result.data.durl[0].url);
				url.host = "upos-sz-estgoss.bilivideo.com";
				return url.href;
			}
			return "";
		});
}

export default defineCachedEventHandler(async (event) => {
	const query = getQuery(event);
	try {
		let videoUrl = await getB2Mp4Url(query.bvid, query.cid);
		setResponseHeader(event, "cache-control", "no-store");
		return {
			code: 200,
			url: videoUrl,
		};
	} catch (e) {
		console.log(e);

		setResponseStatus(event, 404);
	}
});
