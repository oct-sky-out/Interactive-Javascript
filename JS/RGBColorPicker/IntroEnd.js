/**
 * ------------------- 변수 참고 -------------------
 * 앞에 $가 붙는 변수는 Document의 Elements 변수들입니다.
 * -----------------------------------------------
/**
 * @name endIntro
 * @param {void}
 * @returns {void}
 * @todo 처음 시작할 때 검은화면에 글자가 사라지는 효과가 끝난 후 검은화면을 HTML Dom에서 삭제하도록 만들었습니다.
 */
const endIntro = () => {
	/** @type {HTMLDivElement}  컬러피커 화면 전체를 감싸는 div element입니다.*/
	let $container = document.getElementById('container');
	let intro = document.querySelector('.page-intro');
	$container.removeChild(intro);
};

/**
 * IIFE_EndIntro는 setTimeout 5초 후에 endIntro는 화면 시작하도록 만들었습니다.
 */
(function IIFE_EndIntro() {
	setTimeout(endIntro, 5000);
})();
