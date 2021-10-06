var container = document.getElementById("container");

const endIntro = () => {
	var intro = document.querySelector(".page-intro");
	container.removeChild(intro);
};
setTimeout(endIntro, 5000);
