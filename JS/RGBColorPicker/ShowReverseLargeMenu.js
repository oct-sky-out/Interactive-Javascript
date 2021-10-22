'use strict';
/**
 * ------------------- 변수 참고 -------------------
 * 앞에 $가 붙는 변수는 Document의 Elements 변수들입니다.
 * -----------------------------------------------
 */

/**
 *
 * @event .menu-mini-ng-big
 * @name OpenLargeMenuBtnClick
 * @param {Event} e
 * @return {void}
 * @todo 미니 메뉴에서 상세메뉴 열고닫는 버튼을 누를 때 실행되는 기능입니다.
 */
const OpenLargeMenuBtnClick = (e) => {
	/** @type {HTMLDivElement} 상세 메뉴 컨테이너 div element입니다.*/
	const $largeMenu = document.querySelector('.menu-large');
	/** @type {string[]} 상세 메뉴가 열리거나 닫힐 때 입력되는 클래스 이름입니다.*/
	const openCloseClasses = ['close-menu', 'open-menu'];

	if ($largeMenu.classList.contains(openCloseClasses[0])) {
		$largeMenu.classList.remove(openCloseClasses[0]);
		$largeMenu.classList.add(openCloseClasses[1]);
	} else {
		$largeMenu.classList.remove(openCloseClasses[1]);
		$largeMenu.classList.add(openCloseClasses[0]);
	}
};

(function IIFE_MenuToggleEventInit() {
	/** @type {HTMLButtonElement} 상세 메뉴 컨테이너를 열고 닫는 button element입니다. */
	const $opnClsBtn = document.querySelector('.menu-mini-ng-big');
	$opnClsBtn.addEventListener('click', (e) => OpenLargeMenuBtnClick(e));
})();
