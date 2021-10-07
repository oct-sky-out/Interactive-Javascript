"use strict";
// CopyComplete와 parseToHEX를 import
import copyComplete from "./CopyComplete";
import parseToHEX from "./ParseToHEX";

var canvas = document.getElementById("canvas");
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

const copyHex = function (e) {
	var x = e.offsetX;
	var y = e.offsetY;
	var [r, g, b] = this.getContext("2d").getImageData(x, y, 1, 1).data;
	hex = "#" + parseToHEX(r, g, b);
	navigator.clipboard.writeText(hex);
	copyComplete();
};

setCanvasGradiant(ctx);

canvas.addEventListener("click", copyHex);

window.addEventListener("resize", (e) => {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	setCanvasGradiant(canvas.getContext("2d"));
});
