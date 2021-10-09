"use strict";

let $largeMenu = document.querySelector(".menu-large");
let $opnClsBtn = document.querySelector(".menu-mini-ng-big");
let openCloseClasses = ["close-menu", "open-menu"];

const OpenLargeMenuBtnClick = (e) => {
	if ($largeMenu.classList.contains(openCloseClasses[0])) {
		$largeMenu.classList.remove(openCloseClasses[0]);
		$largeMenu.classList.add(openCloseClasses[1]);
	} else {
		$largeMenu.classList.remove(openCloseClasses[1]);
		$largeMenu.classList.add(openCloseClasses[0]);
	}
};

$opnClsBtn.addEventListener("click", (e) => OpenLargeMenuBtnClick(e));
