const openNoticeBtn = document.querySelector('.js-notice-btn');
const noticeWindow = document.querySelector('.js-todo-notice');
const closeNoticeBtn = document.querySelector('.js-close-notice');

const open = () =>{
    noticeWindow.classList.add('active-todo');
}
const close = () =>{
    noticeWindow.classList.remove('active-todo');
}

closeNoticeBtn.addEventListener('click', close);
openNoticeBtn.addEventListener('click', open);