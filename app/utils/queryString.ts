export const queryParse = (search = window.location.search): object => {
	if (!search) return {};
	const queryString = search[0] === "?" ? search.substring(1) : search;
	const query: any = {};
	queryString.split("&").forEach((queryStr) => {
		const [key, value] = queryStr.split("=");
		/* istanbul ignore else */
		if (key) query[decodeURIComponent(key)] = decodeURIComponent(value as any);
	});

	return query;
};

export const queryStringify = (query: any) => {
	const queryString = Object.keys(query)
		.map((key) => `${key}=${encodeURIComponent(query[key] || "")}`)
		.join("&");
	return queryString;
};
