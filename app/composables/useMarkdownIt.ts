import "@mdit/plugin-alert/style"; /* md警告语法的样式 */
import markdownit from "markdown-it";
import markdown_it_anchor from "markdown-it-anchor";
import hljs from "highlight.js";
import mermaid from "mermaid";
import uslug from "uslug"; /* 优化锚点内容 */
import markdownItTextualUml from "markdown-it-textual-uml";
import markdown_it_front_matter from "markdown-it-front-matter";
import { sub as markdown_it_sub } from "@mdit/plugin-sub";
import { sup as markdown_it_sup } from "@mdit/plugin-sup";
import { footnote as markdown_it_footnote } from "@mdit/plugin-footnote";
import { mark as markdown_it_mark } from "@mdit/plugin-mark";
import { tasklist as markdown_it_tasklist } from "@mdit/plugin-tasklist";
import { ins as markdown_it_ins } from "@mdit/plugin-ins";
import { tocPlugin as markdown_it_toc } from "@mdit-vue/plugin-toc";
import { katex as markdown_it_katex } from "@mdit/plugin-katex";
import { alert as markdown_it_alert } from "@mdit/plugin-alert";
import { imgLazyload as markdown_it_imgLazyload } from "@mdit/plugin-img-lazyload";
import { attrs as markdown_it_attrs } from "@mdit/plugin-attrs";
import { obsidianImgSize as markdown_it_obsidianImgSize } from "@mdit/plugin-img-size";

let defaultConfig = {
	anchor_callback: (token: any, info: any) => {},
};

export default function (options = {}) {
    let config = {...defaultConfig,...options}
	const md = new markdownit({
		highlight: function (str, lang) {
			if (lang && hljs.getLanguage(lang)) {
				try {
					return hljs.highlight(str, { language: lang }).value;
				} catch (__) {}
			}
			return ""; // use external default escaping
		},
	})
		.use(markdown_it_anchor, {
			level: [2, 3],
			callback: config.anchor_callback,
			permalink: markdown_it_anchor.permalink.ariaHidden({
				placement: "before",
			}),
			slugify: (s) => uslug(s),
		})
		.use(markdown_it_sub)
		.use(markdown_it_sup)
		.use(markdown_it_footnote)
		.use(markdown_it_mark)
		.use(markdown_it_tasklist)
		.use(markdown_it_ins)
		.use(markdown_it_toc, { pattern: /^\[toc\]$/i, level: [2, 3] })
		.use(markdown_it_katex)
		.use(markdown_it_alert)
		.use(markdown_it_imgLazyload)
		.use(markdownItTextualUml)
		.use(markdown_it_front_matter, () => {})
		.use(markdown_it_attrs)
		.use(markdown_it_obsidianImgSize)
		.use(markdownItCodeblock);

	onMounted(async() => {
		mermaid.initialize({ startOnLoad: false });
		await mermaid.run();
	});
	return md;
}
