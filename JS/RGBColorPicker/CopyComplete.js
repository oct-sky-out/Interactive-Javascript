const copyMsg = document.querySelector(".copy-msg");

const copyComplete = () => {
	copyMsg.classList.add("appear-msg");
	setTimeout(() => copyMsg.classList.remove("appear-msg"), 1000);
};

export default copyComplete;
