const regexp =
	/^\[\s*((?:[^\]\\]|\\.)+)\s*\](?:\(\s*((?:[^"\\]|\\.)*)\s*(?:"\s*(\d*?)\s*"\s*)?\)$)?/;

// function isValid(str) {
// 	return true;//regexp.test(str);
// }

function getTitle(str) {
	if (str === undefined) return undefined;
	let s = str.match(regexp);
	if (s === null) return str;
	s = s[1]?.trim();
	if (s === "") return str;
	return s;
}
function getAbstract(str) {
	let s = str.match(regexp);
	if (s === null) return undefined;
	s = s[2]?.trim();
	if (s === "") return undefined;
	return s;
}

function getCover(baseUrl,owner,name, str) {
	let s = str.match(regexp);
	if (s === null) return undefined;
	s = s[3]?.trim();
	if (s === "") return undefined;
	if (s === undefined) return undefined;
	baseUrl = baseUrl.endsWith("/") ? baseUrl : baseUrl + "/";
	return `${baseUrl}gh/${owner}/${name}@files/files/${s}.png`;
}
function getDate(str) {
	const d = new Date(str);
	return `${d.getFullYear().toString().padStart(4, "0")}-${(d.getMonth() + 1)
		.toString()
		.padStart(2, "0")}-${d.getDate().toString().padStart(2, "0")}`;
}
function getTime(str) {
	const d = new Date(str);
	return `${d.getHours().toString().padStart(2, "0")}:${d
		.getMinutes()
		.toString()
		.padStart(2, "0")}`;
}
// let str = `[a\\] c](b\\" b "111")`;
// console.log("标题", getTitle(str));
// console.log("摘要", getAbstract(str));
// console.log("封面", getCoverId(str));

export default { getTitle, getAbstract, getCover, getDate, getTime };
