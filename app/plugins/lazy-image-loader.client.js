const els = new Map();

function scrollHandler() {
	els.forEach((value, el) => {
		if (
			el.hasAttribute("actived") ||
			el.hasAttribute("error") ||
			el.hasAttribute("loading")
		) {
			return;
		}
		var elRect = el.getBoundingClientRect();
		var viewportTop = window.scrollY;
		var viewportHeight = window.innerHeight;
		var viewportBottom = viewportTop + viewportHeight;
		var elementTop = elRect.top + viewportTop;
		// var elementBottom = elementTop + elRect.height;
		// console.log(elementBottom,viewportBottom);

		if (elementTop - elRect.height / 2 < viewportBottom) {
			el.setAttribute("loading", "");
			const { imgsrc, succeed, failed } = value;
			if (imgsrc) {
				const img = new Image();
				img.src = imgsrc;
				img.onload = function () {
					el.firstElementChild.remove();
					el.appendChild(img);
					el.removeAttribute("loading");
					el.setAttribute("actived", "");
					succeed();
				};
				img.onerror = function () {
					el.removeAttribute("loading");
					el.setAttribute("error", "");
					failed();
				};
			}
		}
	});
}
window.addEventListener("scroll", scrollHandler);
window.addEventListener("resize", scrollHandler);

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.directive("imgloader", {
		mounted(el, binding) {
			const { imgsrc, succeed, failed } = binding.value;
			if (
				typeof imgsrc !== "string" &&
				typeof failed !== "function" &&
				typeof succeed !== "function"
			) {
				console.error("参数类型错误");
				return;
			}
			els.set(el, binding.value);
			scrollHandler();
		},
		unmounted(el, binding) {
			els.delete(el);
		},
	});
});
