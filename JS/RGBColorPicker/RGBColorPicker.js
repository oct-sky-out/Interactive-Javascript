"use strict";
var canvas = document.getElementById("canvas");
const copyMsg = document.querySelector(".copy-msg");

var ctx = canvas.getContext("2d");
var hex = "";

const canvasSizeChange = () => {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
};

function parseToHEX(r, g, b) {
	if (r > 255 || g > 255 || b > 255) throw "Over the rgb state.";
	return ((r << 16) | (g << 8) | b).toString(16);
}
const copyComplete = () => {
	copyMsg.classList.add("appear-msg");
	setTimeout(() => copyMsg.classList.remove("appear-msg"), 1000);
};

const setCanvasGradiant = (ctx) => {
	ctx.rect(0, 0, canvas.width, canvas.height);
	var gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
	gradient.addColorStop(0, "#f2bb07");
	gradient.addColorStop(1, "#e62605");
	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.fill();
};

const copyHex = function (e) {
	var x = e.offsetX;
	var y = e.offsetY;
	var [r, g, b] = this.getContext("2d").getImageData(x, y, 1, 1).data;
	hex = "#" + parseToHEX(r, g, b);
	navigator.clipboard.writeText(hex);
	copyComplete();
};

(function initCanvas() {
	canvasSizeChange();
	setCanvasGradiant(ctx);
})();

canvas.addEventListener("click", copyHex);

window.addEventListener("resize", (e) => {
	canvasSizeChange();
	setCanvasGradiant(canvas.getContext("2d"));
});
