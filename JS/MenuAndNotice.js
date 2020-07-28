const menuIn = document.querySelector(".menu_btn");
const menuOut = document.querySelector(".menu-out-btn");
const bellIn = document.querySelector(".bell_btn");
const bellOut = document.querySelector(".bell-out-btn");

const openMenuBell = (menuBell) => () => {
  const menuCont = document.querySelector(`.${menuBell}`);
  if (menuBell == "menu-tap") {
    menuCont.classList.add("active_menu");
    const currentBell = document.querySelector(".active_bell");
    if (currentBell) {
      currentBell.classList.remove("active_bell");
    }
  } else {
    menuCont.classList.add("active_bell");
    const currentMenu = document.querySelector(".active_menu");
    if (currentMenu) {
      currentMenu.classList.remove("active_menu");
    }
  }
};
const closeMenuBell = (menuBell) => () => {
  const menuCont = document.querySelector(`.${menuBell}`);
  if (menuBell == "menu-tap") {
    menuCont.classList.remove("active_menu");
  } else {
    menuCont.classList.remove("active_bell");
  }
};

menuIn.addEventListener("click", openMenuBell("menu-tap"));
menuOut.addEventListener("click", closeMenuBell("menu-tap"));
bellIn.addEventListener("click", openMenuBell("bell-tap"));
bellOut.addEventListener("click", closeMenuBell("bell-tap"));
