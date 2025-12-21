var copyText = function (btn) {
	var text = btn.previousElementSibling.textContent;
	const input = document.createElement("input");
	document.body.appendChild(input);
	input.setAttribute("readonly", "readonly");
	input.setAttribute("value", text);
	input.select();
	input.setSelectionRange(0, text.length);
	try {
		document.execCommand("copy");
	} catch (err) {}
	document.body.removeChild(input);

	// 复制成功反馈
	btn.textContent = "Copied";
	btn.classList.add("copied");

	// 2秒后恢复按钮文本
	setTimeout(() => {
		btn.textContent = "Copy";
		btn.classList.remove("copied");
	}, 2000);
};
