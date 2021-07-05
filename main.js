
const intervalID = [];
const timeOutID = [];
const randomNumber = (min, max) => {
    let a = max - min + 1;
    let b = Math.random() * a;
    let r = Math.floor(b) + min;
    return r;
}
const arrayOfNumbers = (start, end) => {
    let arr = [];
    for (let i = start; i < end; i++) {
        arr.push(i);
    }
    return arr;
}

const blockContainer = document.querySelector('.blocks-container');
const carouselContainer = document.querySelector('.carousel-container');
const indexBtn = document.querySelector('.img-index');

for (let i = 0; i < carouselContainer.children.length; i++) {
    const btn = document.createElement('button');
    btn.classList.add('img-index-btn');
    btn.value = i;
    if (i < 1) {
        btn.classList.add('img-index-btn-active');
    }
    indexBtn.appendChild(btn);
}

for (let i = 0; i < indexBtn.children.length; i++) {
    indexBtn.children[i].addEventListener('click', () => {
        changeSlide(i);
    }, false)
}

const blocks = () => {

    for (let i = 0; i < 150; i++) {
        const block = document.createElement('div');
        block.classList.add('block-with-shadow');
        block.classList.add("blocks-ui");
        blockContainer.appendChild(block);
    }
    const blockItem = blockContainer.children;
    const numberArray = arrayOfNumbers(0, 150);
    timeOutID.push(setTimeout(() => {
        let id = setInterval(() => {
            if (numberArray.length == 1) {
                timeOutID.push(setTimeout(() => {
                    blockContainer.innerHTML = "";
                }, 200));
                clearInterval(id);
            }
            const randIndex = randomNumber(0, numberArray.length - 1);
            const randomNum = numberArray[randIndex];
            numberArray.splice(randIndex, 1);
            blockItem[randomNum].classList.add("fade-out")
            blockItem[randomNum].classList.add("border-fade-out");
        }, 7);
    }, 200));
}
const changeSlide = (changeBy = null) => {
    blocks();
    const images = carouselContainer.children;
    for (let i = 0; i < images.length; i++) {
        if (images[i].classList.contains('img-content-active')) {
            images[i].classList.remove('img-content-active');
            let index = changeBy;
            if (typeof changeBy != 'Number') {
                if (changeBy == 'left') {
                    if (i == 0) index = images.length - 1
                    else index = i - 1
                }
                if (changeBy == 'right') {
                    if (i == images.length - 1) index = 0;
                    else index = i + 1
                }
            }
            images[index].classList.add('img-content-active');
            indexBtn.children[i].classList.remove('img-index-btn-active');
            indexBtn.children[index].classList.add('img-index-btn-active');
            break;
        }

    }
}

intervalID.push(setInterval(() => {
    changeSlide('right')
}, 5000));
