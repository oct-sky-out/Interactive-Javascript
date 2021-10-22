import { canvasBackgroundGradationColorType } from '../types/type.js';

const bgArr = Symbol.for('canvas_backgroundArr');

const canvasTools = {
	/** @type {canvasBackgroundGradationColorType[]}*/
	[Symbol.for('canvas_backgroundArr')]: [
		{ bg1: '#f2bb07', bg2: '#e62605' },
		{ bg1: '#9228c7', bg2: '#b63044' },
		{ bg1: '#2dd5b9', bg2: '#0e31a4' },
		{ bg1: '#805100', bg2: '#feba61' },
	],

	getBackgroundColors(idx) {
		return { bg1: this[bgArr][idx].bg1, bg2: this[bgArr][idx].bg2 };
	},

	/**
	 * @name canvasSizeChange
	 * @param {void} colorCode
	 * @returns {void}
	 * @todo 사용자가 창의 크기를 바꿀 때 마다 캔버스도 창의 최대 크기에 맞추어서 늘이는 기능입니다.
	 */
	canvasSizeChange() {
		// this =>  canvas
		this.width = window.innerWidth;
		this.height = window.innerHeight;
	},

	/**
	 * @name setCanvasGradiant
	 * @param {CanvasRenderingContext2D} ctx
	 * @param {number} bgColorIdx
	 * @returns {void}
	 * @todo 캔버스의 배경 그라디언트 색상이 변경되는 기능입니다.
	 */
	setCanvasGradiant(ctx, bgColorIdx = 0) {
		ctx.rect(0, 0, this.width, this.height);
		var gradient = ctx.createLinearGradient(0, 0, this.width, this.height);
		gradient.addColorStop(0, canvasTools[bgArr][bgColorIdx].bg1);
		gradient.addColorStop(1, canvasTools[bgArr][bgColorIdx].bg2);
		ctx.fillStyle = gradient;
		ctx.fillRect(0, 0, this.width, this.height);
		ctx.fill();
	},
};

export default canvasTools;
