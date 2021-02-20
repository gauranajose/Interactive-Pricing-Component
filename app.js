const slider = document.querySelector('.slider');
const toggle = document.querySelector('.switch input');
const priceEl = document.querySelector('#price');
const pageviewsEl = document.querySelector('#pageviews');
const sliderMax = slider.max;
const sliderMin = slider.min;

const prices = [8.00, 12.00, 16.00, 24.00, 36.00];
const discountedPrices = prices.map(price => (price * .75).toFixed(2));

const getDivider = () => {
    const sliderValue = slider.value;
    return (sliderValue-sliderMin)/(sliderMax-sliderMin)*100;
} 

const setSliderColor = () => { 
    slider.style.background = `linear-gradient(to right, #A5F3EB ${getDivider()}%, #EAEEFB ${getDivider()}%, #EAEEFB 100%)`;
}

const setSliderPosition = (value) => {
    if (value <= 12) {
        slider.value = 0;
    } else if (value <= 37) {
        slider.value = 25;
    } else if (value <= 62) {
        slider.value = 50;
    } else if (value <= 87) {
        slider.value = 75;
    } else {
        slider.value = 100;
    }
}

const updateUI = () => {
    if (slider.value == 0) {
        setChanges('10K', 0);
    } else if (slider.value == 25) {
        setChanges('50K', 1);
    } else if (slider.value == 50) {
        setChanges('100K', 2);
    } else if (slider.value == 75) {
        setChanges('500K', 3);
    } else {
        setChanges('1M', 4);
    }
}

const setChanges = (pageviews, idx) => {
    pageviewsEl.innerHTML = pageviews;
    priceEl.innerHTML = toggle.checked ? discountedPrices[idx] : prices[idx].toFixed(2);
}

slider.oninput = () => {
    setSliderPosition(slider.value)
    updateUI();
    setSliderColor();
}

slider.addEventListener('mousedown', () => {
    slider.classList.add('mouseDown');
});

slider.addEventListener('mouseup', () => {
    slider.classList.remove('mouseDown');
});

toggle.addEventListener('click', () => {
    updateUI();
});

setSliderColor();
