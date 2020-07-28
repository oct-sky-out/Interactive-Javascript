const nameForm = document.querySelector(".js-form"),
  userName = nameForm.querySelector(".js-inputUser"),
  userEnroll = document.querySelector(".userEnroll");

const USER_LOCAL_STORAGE = "currentUser";
const ACTIVE_BLOCK = "active";

const submitEventHandle = (event) => {
  event.preventDefault();
  const name = userName.value;
  showEnrollUser(name);
  localStorage.setItem(USER_LOCAL_STORAGE, name);
};

const askForName = function () {
  nameForm.classList.add(ACTIVE_BLOCK);
  nameForm.addEventListener("submit", submitEventHandle);
};

const showEnrollUser = function (user) {
  nameForm.classList.remove(ACTIVE_BLOCK);
  userEnroll.innerHTML += `   ${user}!😺`;
  userEnroll.classList.add(ACTIVE_BLOCK);
};

const loadName = function () {
  const currentUser = localStorage.getItem(USER_LOCAL_STORAGE);
  if (currentUser === null) {
    askForName();
  } else {
    showEnrollUser(currentUser);
  }
};

const run = () => {
  loadName();
};

run();
