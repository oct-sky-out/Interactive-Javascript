const boxs = document.querySelectorAll(".box");
const zones = document.querySelectorAll(".zone");

let dragBox = null;

for (const box of boxs) {
  box.addEventListener("dragstart", () => {
    console.log("dragstart");
    dragBox = box;
    setTimeout(() => {
      box.style.display = "none";
    }, 0);
  });

  box.addEventListener("dragend", () => {
    console.log("dragend");
    setTimeout(() => {
      dragBox.style.display = "block";
      dragBox = null;
    }, 0);
  });
  for (const zone of zones) {
    zone.addEventListener("dragover", (e) => {
      e.preventDefault();
      console.log("dragover");
    });
    zone.addEventListener("dragenter", (e) => {
      e.preventDefault();
      console.log("dragenter");
    });
    zone.addEventListener("drop", () => {
      console.log("drop");
      zone.append(dragBox);
    });
  }
}
