export function lockScreen() {
	var $body = document.body;
	// 不直接把 body 设为 box-sizing: border-box，避免污染全局样式
	var newBodyWidth = window.getComputedStyle($body).width;
	var level = Number($body.dataset.lockscreenLevel) || 0;
	$body.classList.add("nano-locked");
    $body.style.width = `${newBodyWidth}px`
    $body.dataset.lockscreenLevel = ++level;
};

export function unlockScreen(force) {
	if (force === void 0) force = false;
	var $body = document.body;
	var level = force ? 1 : Number($body.dataset.lockscreenLevel);
	if (level > 1) {
        $body.dataset.lockscreenLevel = --level;
		return;
	}
    $body.dataset.lockscreenLevel =0;
    $body.classList.remove("nano-locked");
    $body.style.width = ""
};

