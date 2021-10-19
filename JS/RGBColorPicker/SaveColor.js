'use strict';
import { localStorageColorType } from './modules/type.js';
/**
 * ------------------- 변수 참고 -------------------
 * 앞에 $가 붙는 변수는 Document의 Elements 변수들입니다.
 * -----------------------------------------------
 *
 * cosnt 변수들
 *
 * $colorValue : 메뉴의 컬러값을 입력하는 input element입니다.
 * $colorRegistBtn : 컬러값을 복사 후 등록하는 button element입니다.
 * $colorsContainer : 등록한 컬러값을 감싸는 div element입니다.
 * $circleContainer : 등록한 컬러 색상 버튼을 감싸는 div element입니다.,
 * LOCAL_SOTRAGE_KEY : 로컬 스토리지의 키 값입니다.
 *
 * let 변수들
 * $circles : 컬러값을 등록 후 색상 버튼이 생성되는 div element들입니다.
 * $info_rgbs : 컬러값을 등록 후 생삭 값(HEX)들이 상세 메뉴에 생성되는 span element들입니다.
 * $info_del : 각 등록된 컬러값을 제거하고싶을 때 사용하는 제거 span element들입니다.
 */
/** @type {HTMLInputElement} */
const $colorValue = document.querySelector('.color-code-input');
/** @type {HTMLFormElement} */
const $colorRegistBtn = document.querySelector('.color-submit-form');
/** @type {HTMLDivElement} */
const $colorsContainer = document.querySelector('.menu-large-rgb-container');
/** @type {HTMLDivElement} */
const $circleContainer = document.querySelector('.menu-mini-circle-container');
/** @type {string} */
const LOCAL_SOTRAGE_KEY = 'Color_Picker';

/** @type {HtmlDivElement[]} */
let $circles = null,
	/** @type {HTMLSpanElement[]} */
	$info_rgbs = null,
	/** @type {HTMLSpanElement[]} */
	$info_del = null;

/**
 * @name setLocalStorageItem
 * @param {localStorageColorType} colorObj :로컬 스토리지에 저장 할 컬러 정보값들입니다.
 * @returns void
 * @todo 로컬스토리지에 컬러값을 저장을 실행합니다.
 */
const setLocalStorageItem = (colorObj) => {
	localStorage.setItem(LOCAL_SOTRAGE_KEY, JSON.stringify(colorObj));
};

/**
 * @name getLocalStorageItem
 * @param void
 * @returns {localStorageColorType[]}
 * @todo 로컬스토리지에 저장된 컬러값을 모두 불러옵니다.
 */
const getLocalStorageItem = () => {
	return JSON.parse(localStorage.getItem(LOCAL_SOTRAGE_KEY));
};

/**
 * @name makeCircle
 * @param {string} colorCode
 * @param {number} colorId
 * @returns {HtmlDivElement}
 * @todo 등록하는 색깔과 등록번호를 지정하고, 이를 HtmlDivElement로 만들어서 리턴
 */
const makeCircle = (colorCode, colorId = 0) => {
	const $circle = document.createElement('div');
	const $pickCircle = document.createElement('div');

	$pickCircle.classList.add('circle-pick-color');
	$pickCircle.style.backgroundColor = colorCode;
	$circle.append($pickCircle);

	const circleMakeClassList = (classId) => {
		$circle.classList.add('menu-mini-circle', `circle-${classId}`);
	};

	if (colorId === 0) circleMakeClassList(getLocalStorageItem().length);
	else circleMakeClassList(colorId);

	return $circle;
};

/**
 * @event .menu-mini-circle
 * @name makeCircle
 * @param {MouseEvent} e
 * @returns {void}
 * @todo 색깔 아이콘을 클릭 시 클립보드에 색깔 값을 저장.
 */
const circleHexClick = (e) => {
	// ! copyComplete()은 ./RGBColorPicker.js 확인.

	const colorNum = e.target.classList[1].slice(
		e.target.classList[0] === 'menu-mini-circle' ? 7 : 6
	);
	const localStorageColor = getLocalStorageItem();
	const colorTxt = localStorageColor.reduce(
		(acc, val) => acc + (val.color === 'color-' + colorNum ? val.colorHex : ''),
		''
	);
	if (colorTxt === '') {
		alert('이미 삭제된 항목입니다. 새로고침을 한번 해주세요!');
		return;
	}
	navigator.clipboard.writeText(colorTxt);
	copyComplete();
};

/**
 * @name assignCircleSelector
 * @param {void}
 * @returns {void}
 * @todo menu-mini-circle클래스(저장된 색깔 아이콘들)를 가진 모든 elements 리턴
 */
const assignCircleSelector = () => {
	$circles = document.querySelectorAll('.menu-mini-circle');
};

/**
 * @name assignCircleEvent
 * @param {void}
 * @returns {void}
 * @todo menu-mini-circle클래스(저장된 색깔 아이콘)들에게 클릭 이벤트와 콜백 circleHexClick 생성
 */
const assignCircleEvent = () => {
	$circles.forEach((node) => node.addEventListener('click', circleHexClick));
};

/**
 * @name appendCircle
 * @param {void}
 * @returns {void}
 * @todo 색깔 아이콘들을 감싸는 컨테이너에 아이콘을 생성 한 후 이벤트 주입.
 */
const appendCircle = (colorCode, colorId) => {
	$circleContainer.appendChild(makeCircle(colorCode, colorId));

	assignCircleSelector();
	assignCircleEvent();
};

/**
 * @event .menu-large-info-del
 * @name deleteCircleAndInfo
 * @param {Event} e
 * @returns {void}
 * @todo 삭제 아이콘을 누를 시 미니 메뉴와 상세 메뉴에 있는 색깔 값 삭제, 로컬 스토리지에 저장 된 색깔 값도 삭제.
 */
const deleteCircleAndInfo = (e) => {
	const $targrtParent = e.target.parentNode.parentNode;
	const $menuMiniCircle = document.querySelector('.menu-mini-circle-container');
	const targetColorNum = e.target.classList[3].slice(7);

	$menuMiniCircle.removeChild(
		$menuMiniCircle.querySelector(`.circle-${targetColorNum}`)
	);

	$targrtParent.removeChild(
		$targrtParent.querySelector(`.color-container-${targetColorNum}`)
	);

	setLocalStorageItem(
		getLocalStorageItem().filter(
			(val) => val.color !== `color-${targetColorNum}`
		)
	);
};

/**
 * @name assignInfoSelector
 * @param {void}
 * @returns {void}
 * @todo 등록된 색깔 값 코드와 삭제 버튼들을 모두 불러옴.
 */
const assignInfoSelector = () => {
	$info_rgbs = document.querySelectorAll('.menu-large-info-rgb');
	$info_del = document.querySelectorAll('.menu-large-info-del');
};

/**
 * @name assignInfoEvent
 * @param {void}
 * @returns {void}
 * @todo 등록된 색깔 값 코드와 삭제 버튼들에 이벤트 주입.
 */
const assignInfoEvent = () => {
	$info_rgbs.forEach((node) => node.addEventListener('click', circleHexClick));
	$info_del.forEach((node) =>
		node.addEventListener('click', deleteCircleAndInfo)
	);
};

/**
 * @name makeColorInfoTags
 * @param {string} colorCode
 * @param {number} colorId
 * @returns {[HtmlDivElement, HTMLSpanElement, HTMLSpanElement]}
 * @todo 컬러 값 등록 버튼을 누를 시 상세 메뉴에 추가할 elements들을 생성하여 리턴
 */
const makeColorInfoTags = (colorCode, colorId = 0) => {
	const $menu_large_rgb = document.createElement('div');
	const $menu_large_info_rgb = document.createElement('span');
	const $menu_large_info_del = document.createElement('span');
	const localStorageColor = getLocalStorageItem();

	const rgbMakeClassList = (classNum) => {
		$menu_large_rgb.classList.add(
			'menu-large-rgb',
			`color-container-${classNum}`
		);
		$menu_large_info_rgb.classList.add(
			'menu-large-info-rgb',
			`color-${classNum}`
		);
		$menu_large_info_del.classList.add(
			'menu-large-info-del',
			'material-icons',
			'orange500',
			`delete-${classNum}`
		);
	};

	if (colorId === 0) rgbMakeClassList(localStorageColor.length);
	else rgbMakeClassList(colorId);

	$menu_large_info_rgb.textContent = colorCode;
	$menu_large_info_del.textContent = 'delete';

	return [$menu_large_rgb, $menu_large_info_rgb, $menu_large_info_del];
};

/**
 * @name makeColorInfoTags
 * @param {string} colorCode
 * @param {number} colorId
 * @returns {void}
 * @todo makeColorInfoTags에서 상세 메뉴에 추가할 elements들을 생성받은 후
 *  info_rgb, info_del를 large_rgb에 종속 시킨 후 이벤트 주입.
 */
const appendColor = (colorCode, colorId = 0) => {
	const [large_rgb, info_rgb, info_del] = makeColorInfoTags(colorCode, colorId);

	large_rgb.append(info_rgb, info_del);
	$colorsContainer.append(large_rgb);
	assignInfoSelector();
	assignInfoEvent();

	$colorValue.value = null;
};

/**
 * @name registLocalSorage
 * @param {void}
 * @returns {void}
 * @todo 로컬 스토리지에 컬러 값을 저장하는 로직
 */
const registLocalSorage = () => {
	var localStorageColor = getLocalStorageItem() || [];

	setLocalStorageItem([
		...localStorageColor,
		{
			color: `color-${localStorageColor.length + 1}`,
			colorHex: $colorValue.value,
		},
	]);
};

/**
 * @name checkIsHex
 * @param {void}
 * @returns {boolean} 상세메뉴의 input 태그에 hex값 입력 후 등록버튼을 누를 때
 * input태그에 hex값이 제대로 입력되었으면 true
 */
const checkIsHex = () => {
	if (
		$colorValue.value === '' ||
		!$colorValue.value.match(/(^[#])/g) ||
		$colorValue.value.length !== 7
	) {
		alert('색깔을 입력해주세요!');
		return false;
	}
	if (getLocalStorageItem().length >= 5) {
		alert('색깔은 최대 5가지만 가능합니다!');
		return false;
	}
	return true;
};

/**
 * @event .color-submit-form
 * @name registColor
 * @param {Event} e
 * @returns {void}
 * @todo 상세메뉴에 hex 값을 입력 후 등록버튼을 누를 시 로컬스토리지에 색깔 값을 등록하는 로직
 */
const registColor = (e) => {
	e.preventDefault();

	const color = $colorValue.value;

	if (!checkIsHex()) return;

	registLocalSorage();
	appendColor(color);
	appendCircle(color);
	userSavedColorCodeChangeColor(); // RGBColorPicker.js
};

/***********
 * IIFE_LoadColor 페이지 접근 시 즉시 로컬스토리지에 접근하여
 * 기존에 저장하였던 색깔 값들을 불러오고, 상세 메뉴에는 색깔 hex값 텍스트와 삭제버튼을
 * 미니메뉴에는 해당 hex값의 색깔을 불러 와 렌더링합니다.
 *  */

(function IIFE_LoadColor() {
	const localStorageColor = getLocalStorageItem() || [];

	if (localStorageColor == '') setLocalStorageItem(localStorageColor);

	localStorageColor.forEach((val) => {
		appendColor(val.colorHex, val.color.slice(6));
		appendCircle(val.colorHex, val.color.slice(6));
		// RGBColorPicker.js
	});
	userSavedColorCodeChangeColor();
})();

$colorRegistBtn.addEventListener('submit', registColor);
