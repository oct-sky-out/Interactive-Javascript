
const clockFunc = () =>{
    const date = new Date(),
    hours = date.getHours(),
    minuets = date.getMinutes(),
    seconds = date.getSeconds();

    document.querySelector('.clock').innerHTML = `
    ${hours < 10 ? `0${hours}` : hours} :
    ${minuets < 10 ? `0${minuets}` : minuets} :
    ${seconds < 10 ? `0${seconds}` : seconds}`;
}

clockFunc();
setInterval(clockFunc, 1000)