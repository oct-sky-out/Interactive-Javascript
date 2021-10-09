"use strict";

const colorValue = document.querySelector(".color-code-input");
const colorRegistBtn = document.querySelector(".color-submit-form");
const colorsContainer = document.querySelector(".menu-large-rgb-container");
const circleContainer = document.querySelector(".menu-mini-circle-container");
const LOCAL_SOTRAGE_KEY = "Color_Picker";

let $circles = null,
	$info_rgb = null,
	$info_del = null;

const setLocalStorageItem = (colorObj) => {
	localStorage.setItem(LOCAL_SOTRAGE_KEY, JSON.stringify(colorObj));
};

const getLocalStorageItem = () => {
	return JSON.parse(localStorage.getItem(LOCAL_SOTRAGE_KEY));
};

const makeCircle = () => {
	const circle = document.createElement("div");
	circle.classList.add(
		"menu-mini-circle",
		`circle-${getLocalStorageItem().length}`
	);
	return circle;
};

const circleHexClick = (e) => {
	const colorNum = e.target.classList[1].slice(
		e.target.classList[0] === "menu-mini-circle" ? 7 : 6
	);
	const localStorageColor = getLocalStorageItem();
	const colorTxt = localStorageColor.reduce(
		(acc, val) => acc + (val.color === "color-" + colorNum ? val.colorHex : ""),
		""
	);
	if (colorTxt === "") {
		alert("circleHexClick");
		return;
	}
	navigator.clipboard.writeText(colorTxt);
	copyComplete(); // ./RGBColorPicker.js 확인.
};

const assignCircleSelector = () => {
	$circles = document.querySelectorAll(".menu-mini-circle");
};

const assignCircleEvent = () => {
	$circles.forEach((node) => node.addEventListener("click", circleHexClick));
};

const appendCircle = () => {
	circleContainer.appendChild(makeCircle());

	assignCircleSelector();
	assignCircleEvent();
};

const deleteCircleAndInfo = (e) => {
	const targrtParent = e.target.parentNode.parentNode;
	const targetColorNum = e.target.classList[3].slice(7);
	const menuMiniCircle = document.querySelector(".menu-mini-circle-container");

	menuMiniCircle.removeChild(
		menuMiniCircle.querySelector(`.circle-${targetColorNum}`)
	);

	targrtParent.removeChild(
		targrtParent.querySelector(`.color-container-${targetColorNum}`)
	);

	setLocalStorageItem(
		getLocalStorageItem().filter(
			(val) => val.color !== `color-${targetColorNum}`
		)
	);
};

const assignInfoSelector = () => {
	$info_rgb = document.querySelectorAll(".menu-large-info-rgb");
	$info_del = document.querySelectorAll(".menu-large-info-del");
};

const assignInfoEvent = () => {
	$info_rgb.forEach((node) => node.addEventListener("click", circleHexClick));
	$info_del.forEach((node) =>
		node.addEventListener("click", deleteCircleAndInfo)
	);
};

const makeColorInfoTags = (colorCode) => {
	const menu_large_rgb = document.createElement("div");
	const menu_large_info_rgb = document.createElement("span");
	const menu_large_info_del = document.createElement("span");
	const localStorageColor = getLocalStorageItem();
	menu_large_rgb.classList.add(
		"menu-large-rgb",
		`color-container-${localStorageColor.length}`
	);
	menu_large_info_rgb.classList.add(
		"menu-large-info-rgb",
		`color-${localStorageColor.length}`
	);
	menu_large_info_del.classList.add(
		"menu-large-info-del",
		"material-icons",
		"orange500",
		`delete-${localStorageColor.length}`
	);

	menu_large_info_rgb.textContent = colorCode;
	menu_large_info_del.textContent = "delete";

	return [menu_large_rgb, menu_large_info_rgb, menu_large_info_del];
};

const appendColor = (colorCode) => {
	const [large_rgb, info_rgb, info_del] = makeColorInfoTags(colorCode);

	large_rgb.append(info_rgb, info_del);
	colorsContainer.append(large_rgb);
	assignInfoSelector();
	assignInfoEvent();

	colorValue.value = null;
};

const registLocalSorage = () => {
	var localStorageColor = getLocalStorageItem();

	setLocalStorageItem([
		...localStorageColor,
		{
			color: `color-${localStorageColor.length + 1}`,
			colorHex: colorValue.value,
		},
	]);
};

const checkIsHex = () => {
	if (
		colorValue.value === "" ||
		!colorValue.value.match(/(^[#])/g) ||
		colorValue.value.length !== 7
	) {
		alert("색깔을 입력해주세요!");
		return false;
	}
	if (getLocalStorageItem().length >= 5) {
		alert("색깔은 최대 5가지만 가능합니다!");
		return false;
	}
	return true;
};

const registColor = (e) => {
	e.preventDefault();

	if (!checkIsHex()) return;

	registLocalSorage();

	appendColor(colorValue.value);
	appendCircle();
};

(function loadColor() {
	const localStorageColor = getLocalStorageItem();
	if (!localStorageColor) setLocalStorageItem([]);
	localStorageColor.forEach((val) => {
		appendColor(val.colorHex);
		appendCircle();
	});
})();

colorRegistBtn.addEventListener("submit", registColor);
