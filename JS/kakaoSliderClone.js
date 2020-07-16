const CLASS_ACTIVE = 'active';

const leftButton = document.querySelector(".btn-left");
const rightButton = document.querySelector(".btn-right");

const slide = () =>{
    const first_slider = document.querySelector('.slider_item:first-child');
    const currentSlide = document.querySelector(`.${CLASS_ACTIVE}`);
    if(currentSlide){
        currentSlide.classList.remove(CLASS_ACTIVE);
        const nextSlide = currentSlide.nextElementSibling;
        if(nextSlide){
            nextSlide.classList.add(CLASS_ACTIVE);
        }else {
            first_slider.classList.add(CLASS_ACTIVE);
        }
    }else{
        first_slider.classList.add(CLASS_ACTIVE);
    }
}
const prevSlide = ()=>{
    const lastSlider = document.querySelector('.slider_item:last-child')
    const currentSlide = document.querySelector(`.${CLASS_ACTIVE}`);
    if(currentSlide){
        currentSlide.classList.remove(CLASS_ACTIVE);
        const prevSlide = currentSlide.previousElementSibling;
        if(prevSlide){
            prevSlide.classList.add(CLASS_ACTIVE);
        }else {
            lastSlider.classList.add(CLASS_ACTIVE);
        }
    }else{
        lastSlider.classList.add(CLASS_ACTIVE);
    }
}

slide();
rightButton.addEventListener('click',slide);
leftButton.addEventListener('click',prevSlide);

const selectBtn = (select) => ()=>{
    const currentSlide = document.querySelector(`.${CLASS_ACTIVE}`);
        switch (select) {
            case 1:     
                currentSlide.classList.remove(CLASS_ACTIVE);
                document.querySelector('.slider1').classList.add(CLASS_ACTIVE);
                break;
            case 2:     
                currentSlide.classList.remove(CLASS_ACTIVE);
                document.querySelector('.slider2').classList.add(CLASS_ACTIVE);
                break;
            case 3:
                currentSlide.classList.remove(CLASS_ACTIVE);
                document.querySelector('.slider3').classList.add(CLASS_ACTIVE);
                break;
            case 4:     
                currentSlide.classList.remove(CLASS_ACTIVE);
                document.querySelector('.slider4').classList.add(CLASS_ACTIVE);
                break;
        }
}

document.querySelector('.btn1').addEventListener('click',selectBtn(1));
document.querySelector('.btn2').addEventListener('click',selectBtn(2));
document.querySelector('.btn3').addEventListener('click',selectBtn(3));
document.querySelector('.btn4').addEventListener('click',selectBtn(4));

setInterval(slide,5000)