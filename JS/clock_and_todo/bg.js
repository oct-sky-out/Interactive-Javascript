const body = document.querySelector('body');

const IMG_NUM = 6

const setBg = (randomNum) =>{
    const image = new Image();
    image.src = `../img/bg${randomNum}.jpg`;
    body.style.cssText = `background-image : url(${image.src}); 
    background-position: center; background-repeat : no-repeat;`
}

const getRandomNumber = () =>{
    const number = Math.floor(1 + (Math.random()*IMG_NUM))
    return number;
}

const bgrun = () =>{
    const randomNum = getRandomNumber();
    setBg(randomNum);
}
bgrun();