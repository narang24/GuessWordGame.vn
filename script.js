let wrapper = document.querySelector(".wrapper");
let startBtn = document.querySelector(".start");
let button = document.querySelector(".btn1");
let resetButton = document.querySelector(".btn2");
let statsContainer = document.querySelector(".stats-container");
let hint = document.querySelector(".hint");
let items = [{ name: "TESLA", hint: "A multinational automotive company" },
{ name: "LUCKNOW", hint: "The capital and largest city of an Indian state" },
{ name: "BEAGLE", hint: "A dog breed" },
{ name: "CHANEL", hint: "A french luxury brand" },
{ name: "AKBAR", hint: "The great Indian Mughal Emperor" },
{ name: "VARANASI", hint: "The Holiest city in India" },
{ name: "SPADE", hint: "One of the Symbols in Playing Cards" },
{ name: "DENGUE", hint: "A mosquito-borne disease" }
];
function generateRandom(size = 8) {
    let random = Math.floor(Math.random() * size);
    return random;
}
let game = () => {
    startBtn.classList.add("hide");
    wrapper.classList.remove("hide");
    let idx = generateRandom();
    let gameContainer = document.querySelector(".game-container");
    gameContainer.innerHTML = "";
    hint.classList.remove("format");
    button.classList.remove("hide");
    let box;
    for (val of items[idx].name) {
        box = document.createElement("input");
        box.type = "text";
        box.disabled;
        box.className = "box";
        box.maxLength = 1;
        gameContainer.append(box);
        box.classList.add("box");
    }
    let guess = 10;
    hint.innerHTML = `<p>HINT: ${items[idx].hint}</p>`;
    let rem = document.querySelector(".remaining-guesses");
    rem.innerHTML = `<p>Remaining Guesses: ${guess}</p>`;
    let wrongLetters = document.querySelector(".wrong-letters");
    wrongLetters.innerHTML = `<p>Wrong Letters: </p>`;
    let str = "";
    let para = document.querySelector(".wrong-letters p");
    let inputs = document.querySelectorAll("input");
    inputs[0].focus();
    inputs.forEach((val, i) => {
        inputs[i].addEventListener("keyup", (e) => {
            if (e.keyCode === 39 && i < (items[idx].name).length - 1)
                inputs[i].nextElementSibling.focus();
            if (e.keyCode === 37 && i > 0)
                inputs[i].previousElementSibling.focus();
            if (e.keyCode === 40)
                button.focus();
        });
    });

    // inputs.forEach((val, i) => {
    //     inputs[i].addEventListener("input", () => {
    //     let newVal;
    //     if ((inputs[i].value).length > 1 && i < (items[idx].name).length - 1) {
    //         let ch = 0;
    //         newVal=inputs[i].value;
    //         inputs[i].value = (inputs[i].value).charAt(ch);
    //         for (let emp = i + 1; emp < (items[idx].name).length; emp++) {
    //             console.log(emp);
    //             if (inputs[emp].value === "") {
    //                 ch++;
    //                 inputs[emp].value = (newVal).charAt(ch);
    //                 inputs[emp].focus();
    //                 break;
    //             }
    //         }
    // }
    // });
    // });

    inputs.forEach((val, i) => {
        inputs[i].addEventListener("input", () => {
            if ((inputs[i].value).toUpperCase() >= 'A' && (inputs[i].value).toUpperCase() <= 'Z') {
        //og
                if ((inputs[i].value).toUpperCase() === (items[idx].name).charAt(i)) {
                    for (let j = 0; j < (items[idx].name).length; j++) {
                        if ((items[idx].name).charAt(j) === (inputs[i].value).toUpperCase()) {
                            inputs[j].value = inputs[i].value;
                            inputs[j].disabled;
                        }
                    }
                    inputs[i].disabled;
                }
                else {
                    let flag = 0;
                    for (let j = 0; j < (items[idx].name).length; j++) {
                        if ((items[idx].name).charAt(j) === (inputs[i].value).toUpperCase()) {
                            inputs[j].value = inputs[i].value;
                            inputs[j].disabled;
                            flag = 1;
                        }
                    }
                    if (flag === 0)
                        para.innerText += ` ${inputs[i].value},`;
                    inputs[i].value = "";
                }
                
                if (guess === 0) {
                    for (let i = 0; i < (items[idx].name).length; i++) {
                        str += inputs[i].value;
                    }
                    if (str.toUpperCase() !== items[idx].name) {
                        gameContainer.innerHTML = "<h2>Guesses Over</h2>";
                        hint.innerHTML = `<p>${items[idx].hint} is ${items[idx].name}!`;
                        rem.innerHTML = "";
                        wrongLetters.innerHTML = "";
                        hint.classList.add("format");
                        button.classList.add("hide");
                        gameContainer.classList.add("format");
                    }
                }
                let num = document.querySelector(".remaining-guesses p");
                num.innerText = `Remaining Guesses: ${guess}`;
                guess--;
            }
        });
    });
    button.addEventListener("click", () => {
        let str = "";
        for (let i = 0; i < (items[idx].name).length; i++) {
            str += inputs[i].value;
        }
        if (str.toUpperCase() === items[idx].name) {
            gameContainer.innerHTML = "<h2>Well Guessed, Congratulations!</h2>";
            // statsContainer.innerHTML=`<p>${items[idx].hint} indeed is ${items[idx].name}!</p>`;
            hint.innerHTML = `<p>${items[idx].hint} indeed is ${items[idx].name}!`;
            rem.innerHTML = "";
            wrongLetters.innerHTML = "";
            button.classList.add("hide");
            gameContainer.classList.add("format");
            hint.classList.add("format");
        }
        else {
            gameContainer.innerHTML = "<h2>You failed Guessing!</h2>";
            // statsContainer.innerHTML=`<p>${items[idx].hint} indeed is ${items[idx].name}!</p>`;
            hint.innerHTML = `<p>${items[idx].hint} is ${items[idx].name}!`;
            rem.innerHTML = "";
            wrongLetters.innerHTML = "";
            button.classList.add("hide");
            gameContainer.classList.add("format");
            hint.classList.add("format");
        }
    });
};

if (startBtn.classList.contains("hide") === false)
    startBtn.focus();

button.addEventListener("keyup", (e) => {
    if (e.keyCode === 39)
        resetButton.focus();
});
resetButton.addEventListener("keyup", (e) => {
    if (e.keyCode === 37)
        button.focus();
});

startBtn.addEventListener("click", game);
resetButton.addEventListener("click", game); 