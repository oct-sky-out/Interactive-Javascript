'use strict';

/**
 * 타입
 */
const canvasBackgroundGradationColorType = {
	bg1: '',
	bg2: '',
};

/**
 * ------------------- 변수 참고 -------------------
 * 앞에 $가 붙는 변수는 Document의 Elements 변수들입니다.
 * -----------------------------------------------
 * const 변수들
 * $copyMsg : 복사 완료 알림을 표시하기위한 div element입니다.
 * $nxtColorBtn : 다음 컬러로 전환하기 위한 button element입니다.
 * $prvColorBtn : 이전 컬러로 전환하기 위한 button element입니다.
 * $canvas : 화면에 배경에 표시된 그라데이션 canvas element입니다.
 *
 * let 변수들
 * ctx : canvas에서 사용할 입체 효과를 지정하여 반환받은 컨텍스트입니다.
 * backgrdArr : 화면 전환 시 적용할 그라데이션 색상들의 배열입니다.
 * backgrdIdx : backgrdArr의 n번째 배경 선택 인덱스입니다.
 */
/** @type {HTMLDivElement} */
const $copyMsg = document.querySelector('.copy-msg');
/** @type {HTMLButtonElement} */
const $nxtColorBtn = document.querySelector('.next-color');
/** @type {HTMLButtonElement} */
const $prvColorBtn = document.querySelector('.prv-color');
/** @type {HTMLCanvasElement} */
const $canvas = document.getElementById('canvas');

/** @type {CanvasRenderingContext2D} */
let ctx = $canvas.getContext('2d');
/** @type {canvasBackgroundGradationColorType[]}*/
let backgrdArr = [
	{ bg1: '#f2bb07', bg2: '#e62605' },
	{ bg1: '#9228c7', bg2: '#b63044' },
	{ bg1: '#2dd5b9', bg2: '#0e31a4' },
	{ bg1: '#805100', bg2: '#feba61' },
];
/** @type {number} */
let backgrdIdx = 0;

/**
 * @name canvasSizeChange
 * @param {void} colorCode
 * @returns {void}
 * @todo 사용자가 창의 크기를 바꿀 때 마다 캔버스도 창의 최대 크기에 맞추어서 늘이는 기능입니다.
 */
const canvasSizeChange = () => {
	$canvas.width = window.innerWidth;
	$canvas.height = window.innerHeight;
};

/**
 * @name parseToHEX
 * @param {number} r
 * @param {number} g
 * @param {number} b
 * @returns {string}
 * @todo 캔버스 클릭 시 해당 값의 rgb를 가져오고, 가져온 값을 hex값으로 치환하는 기능입니다.
 */
const parseToHEX = (r, g, b) => {
	if (r > 255 || g > 255 || b > 255) throw 'Over the rgb state.';
	return ((r << 16) | (g << 8) | b).toString(16);
};

/**
 * @name copyComplete
 * @param {void}
 * @returns {void}
 * @todo 복사기능이 완료가된다면 완료 메세지 출력후 1초 후에 메세지 사라지게 하는 기능입니다.
 */
const copyComplete = () => {
	$copyMsg.classList.add('appear-msg');
	setTimeout(() => $copyMsg.classList.remove('appear-msg'), 1000);
};

/**
 * @name setCanvasGradiant
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} bgColorIdx
 * @returns {void}
 * @todo 캔버스의 배경 그라디언트 색상이 변경되는 기능입니다.
 */
const setCanvasGradiant = (ctx, bgColorIdx = 0) => {
	ctx.rect(0, 0, $canvas.width, $canvas.height);
	var gradient = ctx.createLinearGradient(0, 0, $canvas.width, $canvas.height);
	gradient.addColorStop(0, backgrdArr[bgColorIdx].bg1);
	gradient.addColorStop(1, backgrdArr[bgColorIdx].bg2);
	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, $canvas.width, $canvas.height);
	ctx.fill();
};

/**
 * @name copyHex
 * @param {*} e
 * @returns {void}
 * @todos 캔버스 배경을 클릭 시 클립보드에 hex값이 복사됩니다.
 */
const copyHex = (e) => {
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
	if (e.target.className === 'next-color') backgrdIdx++;
	if (e.target.className === 'prv-color') backgrdIdx--;

	if (backgrdIdx === 4) backgrdIdx = 0;
	else if (backgrdIdx === -1) backgrdIdx = 3;

	setCanvasGradiant($canvas.getContext('2d'), backgrdIdx);

	$nxtColorBtn.style.color = backgrdArr[backgrdIdx].bg1;
	$prvColorBtn.style.color = backgrdArr[backgrdIdx].bg1;
	$nxtColorBtn.style.border = '2px solid' + backgrdArr[backgrdIdx].bg1;
	$prvColorBtn.style.border = '2px solid' + backgrdArr[backgrdIdx].bg1;

	$nxtColorBtn.style.setProperty(
		'--nxt-prb-bg-color',
		backgrdArr[backgrdIdx].bg2
	);
	$prvColorBtn.style.setProperty(
		'--nxt-prb-bg-color',
		backgrdArr[backgrdIdx].bg2
	);
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

	$opnClsBtn.style.color = backgrdArr[backgrdIdx].bg1;
	$doneBtn.style.color = backgrdArr[backgrdIdx].bg1;
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
		$info_del.forEach(
			(node) => (node.style.color = backgrdArr[backgrdIdx].bg1)
		);
		$info_rgb.forEach((node) => {
			node.style.setProperty('--circle-color-1', backgrdArr[backgrdIdx].bg1);
			node.style.setProperty('--circle-color-2', backgrdArr[backgrdIdx].bg2);
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
 *IIFE_InitCanvas는 캔버스의 색상 초기화하는 기능입니다.
 */
(function IIFE_InitCanvas() {
	canvasSizeChange();
	setCanvasGradiant(ctx);
})();

$canvas.addEventListener('click', copyHex);

$nxtColorBtn.addEventListener('click', changeColors);
$prvColorBtn.addEventListener('click', changeColors);

window.addEventListener('resize', (e) => {
	canvasSizeChange();
	setCanvasGradiant($canvas.getContext('2d'));
});
