const regexp =
	/^\[\s*((?:[^\]\\]|\\.)+)\s*\](?:\(\s*((?:[^"\\]|\\.)*)\s*(?:"\s*(\d*?)\s*"\s*)\)$)/;

const regexp2 = /\[\s*((?:[^\]\\]|\\.)+)\s*\](?:\(\s*((?:[^"\\]|\\.)*)\s*(?:"\s*(\d*?)\s*"\s*)?\))?/

const regexp3 = /^https?:\/\/[^\s/$.?#].[^\s]*$/

function getTitle(str) {
	let s = str.match(regexp);
	if (s === null) return undefined;
	s = s[1]?.trim();
	if (s === "") return undefined;
	return s;
}

function getCover(baseUrl,owner,name,str) {
	let s = str.match(regexp);
	if (s === null) return undefined;
	s = s[3]?.trim();
	if (s === "") return undefined;
	if (s === undefined) return undefined;
	baseUrl = baseUrl.endsWith("/") ? baseUrl : baseUrl + "/";
	return `${baseUrl}gh/${owner}/${name}@files/files/${s}.gif`;
}

function getLink(str) {
	let s = str.match(regexp2);
	if (s === null) return undefined;
	s = s[2]?.trim();
	if (s === "") return undefined;
	if (s === undefined) return undefined;
	if(!regexp3.test(s)) return undefined;
	return s;
}


function isValid(title,body) {
	return regexp.test(title) && body.search(regexp2)!==-1 && getLink(body);
}
export default { getTitle, getCover,isValid ,getLink};
