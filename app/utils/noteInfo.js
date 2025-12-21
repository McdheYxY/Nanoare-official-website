const regexp =
	/^- \[\s*((?:[^\]\\]|\\.)+)\s*\](?:\(\s*((?:[^"\\]|\\.)*?)\s*(?:"\s*(\d*?)\s*"\s*)?\))?/gm;

const idregexp =
	/^\s*https:\/\/github\.com\/McdheYxY\/Nanoare-official-website\/discussions\/(\d+)\s*$/;

function getDate(str) {
	const d = new Date(str);
	return `${d.getFullYear().toString().padStart(4, "0")}-${(d.getMonth() + 1)
		.toString()
		.padStart(2, "0")}-${d.getDate().toString().padStart(2, "0")}`;
}

function getData(str) {
	const data = [];
	for (const match of str.matchAll(regexp)) {
		if (
			!match[1] ||
			!match[3] ||
			!getDate(+match[3]) ||
			!match[2]?.match(idregexp)[1]
		)
			continue;
		const post = {
			title: match[1],
			id: match[2].match(idregexp)[1],
			date: getDate(+match[3]),
		};
		data.push(post);
	}
	return data;
}

export default { getData };
