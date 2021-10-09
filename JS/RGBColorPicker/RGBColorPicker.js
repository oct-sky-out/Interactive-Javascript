"use strict";
const $copyMsg = document.querySelector(".copy-msg");
const $nxtColorBtn = document.querySelector(".next-color");
const $prvColorBtn = document.querySelector(".prv-color");

const $canvas = document.getElementById("canvas");
var ctx = $canvas.getContext("2d");
var backgrdArr = [
	{ bg1: "#f2bb07", bg2: "#e62605" },
	{ bg1: "#9228c7", bg2: "#b63044" },
	{ bg1: "#2dd5b9", bg2: "#0e31a4" },
	{ bg1: "#805100", bg2: "#feba61" },
];
var backgrdIdx = 0;

const canvasSizeChange = () => {
	$canvas.width = window.innerWidth;
	$canvas.height = window.innerHeight;
};

function parseToHEX(r, g, b) {
	if (r > 255 || g > 255 || b > 255) throw "Over the rgb state.";
	return ((r << 16) | (g << 8) | b).toString(16);
}
const copyComplete = () => {
	$copyMsg.classList.add("appear-msg");
	setTimeout(() => $copyMsg.classList.remove("appear-msg"), 1000);
};

const setCanvasGradiant = (ctx, bgColorIdx = 0) => {
	ctx.rect(0, 0, $canvas.width, $canvas.height);
	var gradient = ctx.createLinearGradient(0, 0, $canvas.width, $canvas.height);
	gradient.addColorStop(0, backgrdArr[bgColorIdx].bg1);
	gradient.addColorStop(1, backgrdArr[bgColorIdx].bg2);
	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, $canvas.width, $canvas.height);
	ctx.fill();
};

const copyHex = function (e) {
	var x = e.offsetX;
	var y = e.offsetY;
	var [r, g, b] = this.getContext("2d").getImageData(x, y, 1, 1).data;
	navigator.clipboard.writeText("#" + parseToHEX(r, g, b));
	copyComplete();
};

const canvasChangeColor = () => {
	setCanvasGradiant($canvas.getContext("2d"), backgrdIdx);
};

const btnsChangeColor = (e) => {
	if (e.target.className === "next-color") backgrdIdx++;
	if (e.target.className === "prv-color") backgrdIdx--;

	if (backgrdIdx === 4) backgrdIdx = 0;
	else if (backgrdIdx === -1) backgrdIdx = 3;

	canvasChangeColor();

	$nxtColorBtn.style.color = backgrdArr[backgrdIdx].bg1;
	$prvColorBtn.style.color = backgrdArr[backgrdIdx].bg1;
	$nxtColorBtn.style.border = "2px solid" + backgrdArr[backgrdIdx].bg1;
	$prvColorBtn.style.border = "2px solid" + backgrdArr[backgrdIdx].bg1;

	$nxtColorBtn.style.setProperty(
		"--nxt-prb-bg-color",
		backgrdArr[backgrdIdx].bg2
	);
	$prvColorBtn.style.setProperty(
		"--nxt-prb-bg-color",
		backgrdArr[backgrdIdx].bg2
	);
};

const menuChangeColor = () => {
	const $opnClsBtn = document.querySelector(".menu-mini-ng-big");
	const $doneBtn = document.querySelector(".menu-large-done");

	$opnClsBtn.style.color = backgrdArr[backgrdIdx].bg1;
	$doneBtn.style.color = backgrdArr[backgrdIdx].bg1;
};

const userSavedColorCodeChangeColor = () => {
	const $info_rgb = document.querySelectorAll(".menu-mini-circle");
	const $info_del = document.querySelectorAll(".menu-large-info-del");

	if ($info_del.length !== 0) {
		$info_del.forEach(
			(node) => (node.style.color = backgrdArr[backgrdIdx].bg1)
		);
		$info_rgb.forEach((node) => {
			node.style.setProperty("--circle-color-1", backgrdArr[backgrdIdx].bg1);
			node.style.setProperty("--circle-color-2", backgrdArr[backgrdIdx].bg2);
		});
	}
};
const changeColors = (e) => {
	btnsChangeColor(e);
	menuChangeColor();
	userSavedColorCodeChangeColor();
};

(function initCanvas() {
	canvasSizeChange();
	setCanvasGradiant(ctx);
})();

$canvas.addEventListener("click", copyHex);

$nxtColorBtn.addEventListener("click", changeColors);
$prvColorBtn.addEventListener("click", changeColors);

window.addEventListener("resize", (e) => {
	canvasSizeChange();
	setCanvasGradiant($canvas.getContext("2d"));
});
