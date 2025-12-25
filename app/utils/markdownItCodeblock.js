function getCodeLangEle(str = "") {
	const reg = /class="language-([a-z]+)/;
	reg.test(str);
	return (RegExp.$1 && `<span class="lang-text">${RegExp.$1}</span>`) || "";
}

function isMermaid(str = "") {
	const reg = /class="mermaid/;
	return reg.test(str);
}

const LAST_TAG = "</pre>";
function fenceRenderPlus(oldRender) {
	// 闭包函数，oldRender在此范围使用
	return function innerFun(tokens, idx, options, env, slf) {
		const oldResult = oldRender.apply(this, arguments);
		console.log(oldResult);
		
		if(isMermaid(oldResult)){
			return oldResult;
		}
		const insetEle = [
			'<button class="copy-btn" aria-label="复制代码" onclick="copyText(this)">Copy</button>',
			getCodeLangEle(oldResult),
		];
		const newResult = oldResult.replace(
			LAST_TAG,
			`${insetEle.join("")}${LAST_TAG}`
		);
		return newResult;
	};
}

export default function markdownItCodeblock(md) {
	const codeBlockRender = md.renderer.rules.code_block;
	const fenceRender = md.renderer.rules.fence;
	md.renderer.rules.code_block = fenceRenderPlus(codeBlockRender);
	md.renderer.rules.fence = fenceRenderPlus(fenceRender);
}
