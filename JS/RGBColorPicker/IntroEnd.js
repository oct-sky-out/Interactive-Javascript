// 전체 컴포넌트들을 감싸는 container 참조
var $container = document.getElementById("container");

/**
 * 처음 시작하는 효과가 모두 끝나면 container의 자식노드 page-intro와 그 하위 HTML 태그들을 모두 삭제함.
 */
const endIntro = () => {
	var intro = document.querySelector(".page-intro");
	$container.removeChild(intro);
};

// endIntro는 화면 시작 5초 후에 실행됨.
setTimeout(endIntro, 5000);
