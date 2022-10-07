import {data} from "./data.js";
const options = document.querySelector('.options');
const answersList = document.querySelector('.answers ol');
const reloadBtn = document.querySelector('.reload-btn');
// const secondTen = document.querySelector('.secondTen');
// const thirdTen = document.querySelector('.thirdTen');

let shuffledData = shuffle(data);
let newData = shuffledData.slice(0, 9);
setAnswers(newData);
// setAnswers(data);

reloadBtn.addEventListener('click', reloadPage);
function reloadPage () {
    location.reload();
}
// firstTen.addEventListener('click', chooseFirstTen);
// secondTen.addEventListener('click', chooseSecondTen);
// thirdTen.addEventListener('click', chooseThirdTen);

// function chooseFirstTen() {
//     let newData = data.slice(0, 9);
//     setAnswers(newData);
// };

// function chooseSecondTen() {
//     let newData = data.slice(10, 19);
//     setAnswers(newData);
// };

// function chooseThirdTen() {
//     let newData = data.slice(20, data.length);
//     setAnswers(newData);
// };

function setAnswers(arr) {
   answersList.innerHTML = '';
   options.innerHTML = '';
    arr.forEach(function (item) {
        options.insertAdjacentHTML('beforeend', `
            <li class="option" data-target="${item.id}">${item.title}</li>
        `);

    });
    shuffle(arr);
    arr.forEach(function (item) {
        answersList.insertAdjacentHTML('beforeend', `
                <li><span class="target" data-accept="${item.id}">&nbsp;</span>: ${item.description}</li>
        `);
    });
};

//тасование фишера-йетса
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i
        [array[i], array[j]] = [array[j], array[i]];
    };
    return array;
}

$(document).ready(function () {
    //initialize the quiz options
    var answersLeft = [];
    $('.quiz-wrapper').find('li.option').each(function (i) {
        var $this = $(this);
        var answerValue = $this.data('target');
        var $target = $('.answers .target[data-accept="' + answerValue + '"]');
        var labelText = $this.html();
        $this.draggable({
            revert: "invalid",
            containment: ".quiz-wrapper"
        });

        if ($target.length > 0) {
            $target.droppable({
                accept: 'li.option[data-target="' + answerValue + '"]',
                drop: function (event, ui) {
                    $this.draggable('destroy');
                    $target.droppable('destroy');
                    $this.html('&nbsp;');
                    $target.html(labelText);
                    answersLeft.splice(answersLeft.indexOf(answerValue), 1);
                }
            });
            answersLeft.push(answerValue);
        } else { }
    });
    $('.quiz-wrapper button[type="submit"]').click(function () {
        if (answersLeft.length > 0) {
            $('.lightbox-bg').show();
            $('.status.deny').show();
            $('.lightbox-bg').click(function () {
                $('.lightbox-bg').hide();
                $('.status.deny').hide();
                $('.lightbox-bg').unbind('click');
            });
        } else {
            $('.lightbox-bg').show();
            $('.status.confirm').show();
        }
    });
});
