'use strict';

import parseToHEX from './functions/ParseToHex.js';
import canvasTools from './functions/CanvasTools.js';

/**
 * ------------------- 변수 참고 -------------------
 * 앞에 $가 붙는 변수는 Document의 Elements 변수들입니다.
 * -----------------------------------------------
 * backgrdIdx : canvasTools의 canvas_backgroundArr의 n번째 배경 선택 인덱스입니다.
 */

/** @type {number} */
let backgrdIdx = 0;

/**
 * @name copyComplete
 * @param {void}
 * @returns {void}
 * @todo 복사기능이 완료가된다면 완료 메세지 출력후 1초 후에 메세지 사라지게 하는 기능입니다.
 */
const copyComplete = () => {
	/** @type {HTMLDivElement} 복사 완료 알림을 표시하기위한 div element입니다. */
	const $copyMsg = document.querySelector('.copy-msg');
	$copyMsg.classList.add('appear-msg');
	setTimeout(() => $copyMsg.classList.remove('appear-msg'), 1000);
};

/**
 * @name copyHex
 * @param {MouseEvent} e
 * @returns {void}
 * @todos 캔버스 배경을 클릭 시 클립보드에 hex값이 복사됩니다.
 */
const copyHex = function (e) {
	var x = e.offsetX;
	var y = e.offsetY;
	var [r, g, b] = this.getContext('2d').getImageData(x, y, 1, 1).data;
	navigator.clipboard.writeText('#' + parseToHEX(r, g, b));
	copyComplete();
};

/**
 * @name btnsChangeColor
 * @param {Evnet} e
 * @returns {void}
 * @todo 다음 색상버튼, 이전 색상버튼을 누르면 캔버스의 색상이 변경되게 하는 기능입니다.
 */
const btnsChangeColor = (e) => {
	const $canvas = document.getElementById('canvas');
	const $nxtColorBtn = document.querySelector('.next-color');
	const $prvColorBtn = document.querySelector('.prv-color');

	if (e.target.className === 'next-color') backgrdIdx++;
	if (e.target.className === 'prv-color') backgrdIdx--;

	if (backgrdIdx === 4) backgrdIdx = 0;
	else if (backgrdIdx === -1) backgrdIdx = 3;

	canvasTools.setCanvasGradiant.call(
		$canvas,
		$canvas.getContext('2d'),
		backgrdIdx
	);

	const bg1 = canvasTools.getBackgroundColors(backgrdIdx).bg1;
	const bg2 = canvasTools.getBackgroundColors(backgrdIdx).bg2;

	$nxtColorBtn.style.color = bg1;
	$prvColorBtn.style.color = bg1;

	$nxtColorBtn.style.border = '2px solid' + bg1;
	$prvColorBtn.style.border = '2px solid' + bg1;

	$nxtColorBtn.style.setProperty('--nxt-prb-bg-color', bg2);
	$prvColorBtn.style.setProperty('--nxt-prb-bg-color', bg2);
};

/**
 * @name menuChangeColor
 * @param {void}
 * @returns {void}
 * @todo 캔버스 배경의 색상이 바뀔 때 마다 버튼의 테두리 색도 변경되게 하는 기능입니다.
 */
const menuChangeColor = () => {
	const $opnClsBtn = document.querySelector('.menu-mini-ng-big');
	const $doneBtn = document.querySelector('.menu-large-done');

	$opnClsBtn.style.color = canvasTools.getBackgroundColors(backgrdIdx).bg1;
	$doneBtn.style.color = canvasTools.getBackgroundColors(backgrdIdx).bg1;
};

/**
 * @name userSavedColorCodeChangeColor
 * @param {void}
 * @returns {void}
 * @todo 캔버스 배경의 색상이 바뀔 때 마다 미니메뉴의 저장된 색상 아이콘 버튼의 테두리 색도 변경되게 하는 기능입니다.
 */
const userSavedColorCodeChangeColor = () => {
	const $info_rgb = document.querySelectorAll('.menu-mini-circle');
	const $info_del = document.querySelectorAll('.menu-large-info-del');
	if ($info_del.length !== 0) {
		const bg1 = canvasTools.getBackgroundColors(backgrdIdx).bg1;
		const bg2 = canvasTools.getBackgroundColors(backgrdIdx).bg2;

		$info_del.forEach((node) => (node.style.color = bg1));
		$info_rgb.forEach((node) => {
			node.style.setProperty('--circle-color-1', bg1);
			node.style.setProperty('--circle-color-2', bg2);
		});
	}
};

/**
 * @event .next-color .prv-color
 * @name userSavedColorCodeChangeColor
 * @param {Evnet} e
 * @returns {void}
 * @todo 다음 색상, 이전 색상버튼을 누르면 실행되는 기능들입니다.

 */
const changeColors = (e) => {
	btnsChangeColor(e);
	menuChangeColor();
	userSavedColorCodeChangeColor();
};

/**
 *IIFE_InitCanvas는 캔버스의 색상 초기화, 이벤트를 부여하는 기능입니다.
 */
(function IIFE_InitCanvas() {
	/** @type {HTMLCanvasElement}  화면에 배경에 표시된 그라데이션 canvas element입니다*/
	const $canvas = document.getElementById('canvas');
	/** @type {HTMLButtonElement} 다음 컬러로 전환하기 위한 button element입니다 */
	const $nxtColorBtn = document.querySelector('.next-color');
	/** @type {HTMLButtonElement} 이전 컬러로 전환하기 위한 button element입니다. */
	const $prvColorBtn = document.querySelector('.prv-color');
	/** @type {CanvasRenderingContext2D} */
	const ctx = $canvas.getContext('2d');

	canvasTools.canvasSizeChange.call($canvas);
	canvasTools.setCanvasGradiant.call($canvas, ctx);

	$canvas.addEventListener('click', copyHex);

	$nxtColorBtn.addEventListener('click', changeColors);
	$prvColorBtn.addEventListener('click', changeColors);

	window.addEventListener('resize', (e) => {
		canvasTools.canvasSizeChange.call($canvas);
		canvasTools.setCanvasGradiant.call($canvas, $canvas.getContext('2d'));
	});
})();

export { userSavedColorCodeChangeColor, copyComplete };
