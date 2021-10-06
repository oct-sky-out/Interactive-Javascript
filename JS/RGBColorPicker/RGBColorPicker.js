"use strict";

var canvas = document.getElementById("canvas");
var colorHex = document.getElementById("colorHEX");
var hexInput = document.querySelector(".color-code-input");
var ctx = canvas.getContext("2d");
var hex = "";
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const setCanvasGradiant = (ctx) => {
	ctx.rect(0, 0, canvas.width, canvas.height);
	var gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
	gradient.addColorStop(0, "#f2bb07");
	gradient.addColorStop(1, "#e62605");
	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.fill();
};

const rgbToHex = (r, g, b) => {
	if (r > 255 || g > 255 || b > 255) throw "Over the rgb state.";
	return ((r << 16) | (g << 8) | b).toString(16);
};

const copyHex = function (e) {
	var x = e.offsetX;
	var y = e.offsetY;
	var c = this.getContext("2d");
	var p = c.getImageData(x, y, 1, 1).data;
	hex = "#" + rgbToHex(p[0], p[1], p[2]);
	navigator.clipboard.writeText(hex);
};

setCanvasGradiant(ctx);

canvas.addEventListener("click", copyHex);

window.addEventListener("resize", (e) => {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	setCanvasGradiant(canvas.getContext("2d"));
});
