const explanationElements = document.getElementsByClassName("explanation");

const explanationArray = [
  `A polynomial is a mathematical expression made up of numbers (aka coefficients) and letters (aka variables) combined using addition and subtraction, with NO negative or fractional exponents/roots (like a square root √). 
  
For example, x^3 + 3x^2 - x + 7. Notice how each term is separated by either addition or subtraction, and that there are no negative or fractional exponents.
  `,
  `
A degree is the highest exponent that a single term in a polynomial is raised to. 

For example, in x^3 + 3x^2 - x + 7, the highest exponent is 3 of the first term. This makes the x^3 term the leading term, as it is the term with the highest power/degree of the entire polynomial. 

\n💡 Top Tip - sometimes, teachers may place the leading term in the middle of the polynomial and ask you to identify the degree. For example,

x^3 + 3x^2 + x^4 + 7, where the highest power is 4 of the x^4 term, but notice how it is not at the start of the polynomial. This is called not standard form notation, but we are getting there!
  `,
  `
You might have heard them as "forms," and these are the same thing.
`,
  `
This is known as function notation, relating the input variable, this case x, to a certain output variable, in this case f(x). Note that for x to be related to f(x), verbally said as a function of x, for every input of x, there can only be exactly one output value/value of f(x).
`,
  `
A mathematical representation of "not equal to."
`,
  `
A constant is a term in a polynomial that has x value, or a degree of 0, since x raised to the 0th power is just a 1 (a constant value that just isolates the corresponding coefficient as a result).
`,
  `
The vertex of the quadratic is the quadratic's turning point, in which on a graph it looks like it switches from decreasing to increasing or the other way around. You can visualize it like the point at which you can balance the quadratic's parabolic graph on, or pick it up from. 

Take a look at the image above if you want a visual depiction.
`,

  `
Also known as the x-intercepts, zeroes or roots of the function on the graph, but we are getting there!
`,
  `A fancy way of saying that the graph opens upward. You can think of concave up graphs as bowls that water can flow down into.`,

  `
  A fancy way of saying that the graph opens downward. You can think of concanve down graphs a sad face :(
  `,
  `
The size of the numerical value held by a variable.
`,
  `This is the point at which the quadratic function will go through the y-axis of the coordinate plane. Every quadratic function must have exactly one y-intercept.`,
  `These are the points at which the quadratic function will touch or go through the x-axis of the coordinate plane.`,
];

const alertBox = document.getElementById("customAlertBox");
const alertMessageContainer = document.getElementById("alertMessage");
const closeButton = document.querySelector(".close");

if (alertBox && closeButton) {
  closeButton.addEventListener("click", function () {
    // hiding the explanation textbox when the close button is clicked
    alertBox.style.display = "none";
    // allowing scrolling when pop up has closed
    document.body.classList.remove("no-scroll");
  });

  for (let i = 0; i < explanationElements.length; i++) {
    explanationElements[i].addEventListener("click", function () {
      alertMessageContainer.innerText = explanationArray[i];
      // allowing the new text to sit with the other elements / not be hidden
      alertBox.style.display = "block";
      // preventing scrolling when pop up is open
      document.body.classList.add("no-scroll");
    });
  }
}

const selectElement = document.getElementById("form-select");
const standardDiv = document.getElementById("standard-div");
const vertexDiv = document.getElementById("vertex-div");
const factoredDiv = document.getElementById("factored-div");
const solveButton = document.getElementById("solve-button");

const solutionsDiv = document.getElementById("solutions-div");
const stepsDiv = document.getElementById("steps-div");
const otherResultsHeader = document.getElementById("other-results");

// Desmos Graphing Calculator API taken from their website
const calcElement = document.getElementById("calculator");
let calculator = null;

if (calcElement) {
  calculator = Desmos.GraphingCalculator(calcElement);
}

if (selectElement) {
  selectElement.addEventListener("change", (event) => {
    // showing the standard form div if value is standard form
    if (event.target.value === "standard") {
      standardDiv.hidden = false;
      vertexDiv.hidden = true;
      factoredDiv.hidden = true;
      solveButton.hidden = false;
    } else if (event.target.value === "vertex") {
      standardDiv.hidden = true;
      vertexDiv.hidden = false;
      factoredDiv.hidden = true;
      solveButton.hidden = false;
    } else if (event.target.value === "factored") {
      standardDiv.hidden = true;
      vertexDiv.hidden = true;
      factoredDiv.hidden = false;
      solveButton.hidden = false;
    } else {
      standardDiv.hidden = true;
      vertexDiv.hidden = true;
      factoredDiv.hidden = true;
      solveButton.hidden = true;
    }
  });
}

// NOTE - some explanation paragraph text (not code) generated by Google Gemini, wanted to just get a placeholder to make sure everything is working in following section before continuing forward

// using addEventListener instead of onclick in html code as need to only allow clicks when there is a solveButton and calculator object - was bugging out before when this condition wasn't there, so had to change the logic slightly
if (solveButton && calculator) {
  solveButton.addEventListener("click", () => {
    let latexString = "";

    otherResultsHeader.hidden = false;

    if (selectElement.value === "standard") {
      // parsing the decimal values from the inputs as floats - defaulting each value if they are nan/not a number
      let a = parseFloat(document.getElementById("input-a").value);
      if (isNaN(a)) {
        a = 1; // defaulting to 1, as cannot to 0 since then there would be no x^2 term and it wouldn't a quadratic
      }

      let b = parseFloat(document.getElementById("input-b").value);
      if (isNaN(b)) {
        b = 0; // defaulting to 0/no b term
      }

      let c = parseFloat(document.getElementById("input-c").value);
      if (isNaN(c)) {
        c = 0; // defaulting to 0/no c term
      }

      latexString = `y = ${a}x^2 + (${b})x + (${c})`;
      let discriminant = Math.pow(b, 2) - 4 * a * c;

      if (discriminant >= 0) {
        let solution1 = (-b + Math.sqrt(Math.pow(b, 2) - 4 * a * c)) / (2 * a);
        let solution2 = (-b - Math.sqrt(Math.pow(b, 2) - 4 * a * c)) / (2 * a);
        if (solution1 !== solution2) {
          // pattern to round to 4 decimal places in javascript, taken from stack overflow thread
          solution1 = Math.round(solution1 * 10000) / 10000;
          solution2 = Math.round(solution2 * 10000) / 10000;
          solutionsDiv.textContent = `x = ${solution1}, x = ${solution2}`;
          stepsDiv.innerText = `Since this quadratic is in standard form, we can find the solutions using the quadratic formula. 
          \nRemember that the quadratic formula is x = (-b ± √(b^2 - 4ac)) / 2a, where in this case as you inputted above, a = ${a}, b = ${b}, and c = ${c}. Therefore, 
          \nx = (-${b} ± √((${b})^2 - 4(${a})(${c}))) / 2(${a}) \nx = (-${b} ± √(${discriminant})) / ${2 * a} 
          \nSimplifying, this gets us that x = ${solution1} and x = ${solution2}. `;
        } else {
          solution1 = Math.round(solution1 * 10000) / 10000;
          solutionsDiv.textContent = `Solution: x = ${solution1}`;
          stepsDiv.innerText = `Since this quadratic is in standard form, we can find the solutions using the quadratic formula. 
          \nRemember that the quadratic formula is x = (-b ± √(b^2 - 4ac)) / 2a, where in this case as you inputted above, a = ${a}, b = ${b}, and c = ${c}. Therefore, 
          \nx = (-${b} ± √((${b})^2 - 4(${a})(${c}))) / 2(${a}) \nx = (-${b} ± √(${discriminant})) / ${2 * a} 
          \nSimplifying, this gets us that x = ${solution1} and x = ${solution2}, or just that x = ${solution1}. `;
        }
      } else {
        solutionsDiv.textContent = `No real solutions`;
        stepsDiv.innerText = `Since this quadratic is in standard form, we can determine that there are no real solutions by looking at the discriminant of the quadratic. 
        \nRemember that the discriminant is the inside of the quadratic formula, or b^2 - 4ac, where in this case as you inputted above, a = ${a}, b = ${b}, and c = ${c}. Therefore, the discriminant is 
        \n(${b})^2 - 4(${a})(${c}) = \n${Math.pow(b, 2)} - ${4 * a * c} = \n${discriminant} 
        \nClearly, the discriminant is less than 0, and as we know that means that there cannot be any real solutions to this quadratic. `;
      }
    } else if (selectElement.value === "vertex") {
      // parsing the decimal values from the inputs as floats - defaulting each value if they are nan/not a number
      let a = parseFloat(document.getElementById("vertex-a").value);
      if (isNaN(a)) {
        a = 1; // defaulting to 1, as cannot to 0 since then there would be no x^2 term and it wouldn't a quadratic
      }

      let h = parseFloat(document.getElementById("vertex-h").value);
      if (isNaN(h)) {
        h = 0; // defaulting to 0/no h term
      }

      let k = parseFloat(document.getElementById("vertex-k").value);
      if (isNaN(k)) {
        k = 0; // defaulting to 0/no k term
      }

      latexString = `y = ${a}(x - (${h}))^2 + (${k})`;
      let check = (-1 * k) / a;

      if (check >= 0) {
        let solution1 = h + Math.sqrt((-1 * k) / a);
        let solution2 = h - Math.sqrt((-1 * k) / a);
        if (solution1 !== solution2) {
          solution1 = Math.round(solution1 * 10000) / 10000;
          solution2 = Math.round(solution2 * 10000) / 10000;
          solutionsDiv.textContent = `x = ${solution1}, x = ${solution2}`;
          stepsDiv.innerText = `Since this quadratic is in vertex form, y = a(x - h)^2 + k, we can solve for the x-intercepts by setting y = 0 and isolating x. \nWith your inputs of a = ${a}, h = ${h}, and k = ${k}, our equation becomes: 
          \n0 = ${a}(x - (${h}))^2 + (${k}) 
          \nFirst, subtract ${k} from both sides and divide by ${a} to isolate the squared term: \n(x - (${h}))^2 = ${-k} / ${a} = ${Math.round(check * 10000) / 10000} \nNext, take the square root of both sides (remembering to include ±): \nx - (${h}) = ±√(${Math.round(check * 10000) / 10000}) \nFinally, add ${h} to both sides to get x by itself: \nx = ${h} ± ${Math.round(Math.sqrt(check) * 10000) / 10000} 
          \nSimplifying, this gives us two solutions: x = ${solution1} and x = ${solution2}.`;
        } else {
          solution1 = Math.round(solution1 * 10000) / 10000;
          solutionsDiv.textContent = `Solution: x = ${solution1}`;
          stepsDiv.innerText = `Since this quadratic is in vertex form, y = a(x - h)^2 + k, we can solve for the x-intercepts by setting y = 0 and isolating x. \nWith your inputs of a = ${a}, h = ${h}, and k = ${k}, our equation becomes: 
          \n0 = ${a}(x - (${h}))^2 + (${k}) 
          \nNotice that k = 0, which means the vertex sits right on the x-axis! Dividing both sides by ${a} gives us: \n(x - (${h}))^2 = 0 
          \nTaking the square root of both sides leaves us with x - (${h}) = 0. Adding ${h} to both sides gives us our single solution: x = ${solution1}.`;
        }
      } else {
        solutionsDiv.textContent = `No real solutions`;
        stepsDiv.innerText = `Since this quadratic is in vertex form, y = a(x - h)^2 + k, we can solve for the x-intercepts by setting y = 0 and isolating x. \nWith your inputs of a = ${a}, h = ${h}, and k = ${k}, our equation becomes: \n0 = ${a}(x - (${h}))^2 + (${k}) 
        \nFirst, subtract ${k} from both sides and divide by ${a} to isolate the squared term: \n(x - (${h}))^2 = ${-k} / ${a} = ${Math.round(check * 10000) / 10000} 
        \nTo keep going, we would need to take the square root of ${Math.round(check * 10000) / 10000}. However, because this number is negative, we cannot take its real square root! Therefore, there are no real solutions to this quadratic.`;
      }
    } else if (selectElement.value === "factored") {
      // parsing the decimal values from the inputs as floats - defaulting each value if they are nan/not a number
      let a = parseFloat(document.getElementById("vertex-a").value);
      if (isNaN(a)) {
        a = 1; // defaulting to 1, as cannot to 0 since then there would be no x^2 term and it wouldn't a quadratic
      }

      let p = parseFloat(document.getElementById("factored-p").value);
      if (isNaN(p)) {
        p = 0; // defaulting to 0/no h term
      }

      let q = parseFloat(document.getElementById("factored-q").value);
      if (isNaN(q)) {
        q = 0; // defaulting to 0/no k term
      }

      latexString = `y = ${a}(x - (${p}))(x - (${q}))`;

      if (p !== q) {
        solutionsDiv.textContent = `x = ${p}, x = ${q}`;
        stepsDiv.innerText = `Since this quadratic is in factored form, y = a(x - p)(x - q), finding the solutions is the easiest! \nWe set y = 0 to find the x-intercepts: \n0 = ${a}(x - (${p}))(x - (${q})) 
        \nBy the Zero Product Property, if terms multiply together to equal 0, at least one of those factors must equal 0. Since a = ${a} is not 0, we set each of the other two factors equal to 0: \nx - (${p}) = 0   and   x - (${q}) = 0 
        \nSolving each mini-equation gives us our two solutions: x = ${p} and x = ${q}.`;
      } else {
        solutionsDiv.textContent = `Solution: x = ${p}`;
        stepsDiv.innerText = `Since this quadratic is in factored form, y = a(x - p)(x - q), finding the solutions is the easiest! \nWe set y = 0 to find the x-intercepts: \n0 = ${a}(x - (${p}))(x - (${q})) 
        \nNotice that both factors are identical here because p and q are both ${p}! 
        \nBy the Zero Product Property, we set that repeated factor equal to 0: \nx - (${p}) = 0 
        \nAdding ${p} to both sides gives us just one unique solution: x = ${p}.`;
      }
    }

    // passing in function to desmos via API
    if (latexString) {
      calculator.setExpression({
        id: "quadratic-graph",
        latex: latexString,
        color: Desmos.Colors.BLUE,
      });
    }
  });
}

// practice quiz logic

// function to generate random integer using random number generator formatting from AP Computer Science A - no integer type-casting, so Math.floor() to round down like a truncated integer
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to create and format quadratics problem passed on entered difficulty level
function createProblem(difficulty) {
  let a;
  let root1;
  let root2;

  if (difficulty === "mild") {
    a = 1;
    root1 = getRandomInt(1, 6);
    root2 = getRandomInt(1, 6);
  } else if (difficulty === "medium") {
    a = 1;
    root1 = getRandomInt(-9, 9);
    root2 = getRandomInt(-9, 9);
  } else if (difficulty === "spicy") {
    a = getRandomInt(2, 4);
    root1 = getRandomInt(-9, 9);
    root2 = getRandomInt(-9, 9);
  } else if (difficulty === "hardcore") {
    a = getRandomInt(3, 7);
    root1 = getRandomInt(-12, 12);
    root2 = getRandomInt(-12, 12);
  }

  // rearranging Vieta's formula to obtain b and c terms of standard form of quadratic (- b/a = sum of roots, c/a = product of roots -> b = -a * sum of roots, c = a * product of roots)
  const b = -a * (root1 + root2);
  const c = a * (root1 * root2);

  let aTerm;
  // defaulting to empty in case value is 0
  let bTerm = "";
  let cTerm = "";

  if (a === 1) {
    aTerm = "x² ";
  } else {
    aTerm = `${a}x² `;
  }

  if (b === 1) {
    bTerm = "+ x ";
  } else if (b === -1) {
    bTerm = "- x ";
  } else if (b > 0) {
    bTerm = `+ ${b}x `;
  } else if (b < 0) {
    bTerm = `- ${Math.abs(b)}x `;
  }

  if (c > 0) {
    cTerm = `+ ${c}`;
  } else if (c < 0) {
    cTerm = `- ${Math.abs(c)}`;
  }

  // formatting equation to display to look correct
  const equation = `${aTerm}${bTerm}${cTerm} = 0`;

  let returnRoots;

  // returning roots in ascending order/sorted to easily check answers after each question
  if (root1 > root2) {
    returnRoots = [root2, root1];
  } else {
    returnRoots = [root1, root2];
  }

  // returning for the question the necessary proble equation and its solution roots in a dictionary to be accessed via indices while checking answers
  return {
    equation,
    roots: returnRoots,
  };
}

// global state variables to keep track of everything happening with the user
let currentQuestions = []; // stores the current questions appearing for the user in their generated quiz
let userResponses = []; // stores what the user types for each question as their corresponding answer
let currentIndex = 0; // stores what question number the user is on - allows to get content for this question, and each of the questions surrounding it

const startButton = document.getElementById("start-button");
const numQuestionsField = document.getElementById("num-questions");
const difficultyChoice = document.getElementById("difficulty");
const timedCheck = document.getElementById("timed");

const practiceInputSection = document.getElementById("practice-input-section");
const quizContainer = document.getElementById("quiz-container");
const navButtons = document.getElementById("nav-buttons");
const resultsArea = document.getElementById("results-area");

const progressDisplay = document.getElementById("progress-display");
const currentQuestionArea = document.getElementById("current-question-area");

const previousButton = document.getElementById("previous-button");
const nextButton = document.getElementById("next-button");
const submitButton = document.getElementById("submit-button");
const timerDisplay = document.getElementById("timer-display");

// function called with on click in start button
function startQuiz() {
  // getting necessary values to use from input fields declared above
  const numQuestions = parseInt(numQuestionsField.value);
  const difficultyLevel = difficultyChoice.value;
  const isTimed = timedCheck.checked;

  if (difficultyLevel === "choose") {
    alert("Please select a difficulty level first!");
    return; // stopping startQuiz() from running
  }

  // resetting global state of quiz when new quiz has started
  currentQuestions = [];
  userResponses = [];
  currentIndex = 0;
  score = 0;
  resultsHTML = "";

  // for loop to line up questions and answer dictionaries together to correspond to each other
  for (let i = 0; i < numQuestions; i++) {
    currentQuestions[i] = createProblem(difficultyLevel);
    userResponses[i] = { root1: "", root2: "" }; // empty slots for users answers for each question
  }

  // changing GUI for users to interact with and see quis
  practiceInputSection.hidden = true; // getting rid of the section where users can enter questions once quiz has started
  quizContainer.hidden = false;
  resultsArea.innerHTML = ""; // results area initially is blank to be filled with html formatted content later

  if (isTimed) {
    timerDisplay.hidden = false;
    startQuizTimer(30 * numQuestions); // giving 30 seconds per question when timed
  }

  showQuestion();
}

// function to show the question and if there are corresponding already inputted answers for the user
function showQuestion() {
  const problem = currentQuestions[currentIndex];
  const savedAnswer = userResponses[currentIndex];

  progressDisplay.textContent = `Question ${currentIndex + 1} of ${currentQuestions.length}`;
  // setting the text with html to allow for formatting and input fields - if there is a saved answer for each root/input field, show it as the default value once the current question area loads
  currentQuestionArea.innerHTML = `
    <p class="very-small-size">Find the roots (x-intercepts) of: <strong>${problem.equation}</strong></p>
    <label class="very-small-size">x₁ = </label>
    <input type="number" id="current-root1" class="very-small-size" style="width: 60px;" value="${savedAnswer.root1}" />
    <label class="very-small-size">x₂ = </label>
    <input type="number" id="current-root2" class="very-small-size" style="width: 60px;" value="${savedAnswer.root2}" />
  `;

  // hiding previous button on first question as doesn't make sense to have negative questions
  if (currentIndex === 0) {
    previousButton.hidden = true;
  } else {
    previousButton.hidden = false;
  }

  // showing the submit button instead of the next button on the last question
  if (
    currentIndex ===
    currentQuestions.length - 1
  ) // indices of questions indexed by 1
  {
    nextButton.hidden = true;
    submitButton.hidden = false;
  } else {
    nextButton.hidden = false;
    submitButton.hidden = true;
  }
}

// function to save the current inputted answers before going to new question
function saveCurrentAnswer() {
  // fields from the innerHTML of currentQuestionArea
  const root1Input = document.getElementById("current-root1");
  const root2Input = document.getElementById("current-root2");

  // if both roots have been inputted, save them like before in dictionary
  if (root1Input && root2Input) {
    userResponses[currentIndex] = {
      root1: root1Input.value,
      root2: root2Input.value,
    };
  }
}

// previous button navigation functions - cannot use onclick as uses methods defined in javascript file
previousButton.addEventListener("click", () => {
  saveCurrentAnswer(); // save the current answer to the current question before moving

  // if there are still questions to go back to,
  if (currentIndex > 0) {
    // go to the previous question/index
    currentIndex--;
    showQuestion(); // show corresponding question
  }
});

// next button navigation functions - cannot use onclick as uses methods defined in javascript file
nextButton.addEventListener("click", () => {
  saveCurrentAnswer(); // save the current answer to the current question before moving

  // if there are still questions to forward to,
  if (currentIndex < currentQuestions.length - 1) {
    // go to the next question/index
    currentIndex++;
    showQuestion(); // show corresponding question
  }
});

let score = 0;
let resultsHTML = "";

// add function to grade answers when submit button is pressed
function gradeQuiz(outOfTime) {
  saveCurrentAnswer(); // saving current answer immediately so that can update unanswered questions alert message when current question is answered

  if (!outOfTime) {
    let unansweredCount = 0;
    let unansweredQuestions = "";

    for (let i = 0; i < currentQuestions.length; i++) {
      if (userResponses[i].root1 === "" || userResponses[i].root2 === "") {
        unansweredCount++;

        if (unansweredCount > 1) {
          unansweredQuestions += ", " + (i + 1);
        } else {
          unansweredQuestions += i + 1;
        }
      }
    }

    if (unansweredCount > 0) {
      alert(
        `Try to answer all the questions! Missing question(s) at ${unansweredQuestions}`,
      );

      return; // preventing rest of grading logic form happening until all questions are answered
    }
  }

  currentQuestionArea.hidden = true;
  progressDisplay.hidden = true;
  navButtons.hidden = true;
  timerDisplay.hidden = true;

  clearTimeout(timerId);

  // for each loop functionality taken from w3schools - runs through every problem and its corresponding index in the currentQuestions list to call the function to check each of their answers for each problem being iterated over using the loop
  currentQuestions.forEach((problem, i) => checkAnswer(problem, i));

  // location.reload() method reloads the current HTML webpage, as taken from stackoverflow
  resultsArea.innerHTML = `<h3 class="medium-small-size">You got ${score} out of ${currentQuestions.length}!</h3>
    ${resultsHTML}
    <br />

    <button onclick="location.reload()" class="small-size">New Quiz</button>
  `;
}

function checkAnswer(problem, index) {
  saveCurrentAnswer();

  const gottenRoot1 = parseInt(userResponses[index].root1);
  const gottenRoot2 = parseInt(userResponses[index].root2);
  let returnRoots;

  // sorting roots to match with sorting of answers to each problem in making them above
  if (gottenRoot1 > gottenRoot2) {
    returnRoots = [gottenRoot2, gottenRoot1];
  } else {
    returnRoots = [gottenRoot1, gottenRoot2];
  }

  let isCorrect = false;
  let color = "red";
  let message = `Incorrect! Yours: ${userResponses[index].root1}, ${userResponses[index].root2} | Correct: ${problem.roots[0]}, ${problem.roots[1]}`;

  if (
    returnRoots[0] === problem.roots[0] &&
    returnRoots[1] === problem.roots[1]
  ) {
    isCorrect = true;
  }

  if (isCorrect) {
    score++;
    color = "green";
    message = "Correct!";
  }

  resultsHTML += `
    <p class="very-small-size" style="color: ${color};">
      ${index + 1}. ${problem.equation} | ${message}
    </p>
  `;
}

let timerId; // stores unique identification for the started timer in the start timer method to allow for using the clearTimeout method to end the corresponding timer with this identification

// custom timer function that runs until remaining time is 0, then stops
function startQuizTimer(durationInSeconds) {
  let timeRemaining = durationInSeconds;
  let firstDigitSeconds;

  function tick() {
    const minutes = Math.floor(timeRemaining / 60); // number of minutes remaining is integer division of seconds remaining by 60
    const seconds = timeRemaining % 60; // remainder is leftover seconds that cannot be converted to minutes

    if (seconds < 10) {
      firstDigitSeconds = "0";
    } else {
      firstDigitSeconds = "";
    }

    timerDisplay.textContent = `${minutes}:${firstDigitSeconds}${seconds}`;

    if (timeRemaining <= 30) {
      timerDisplay.style.color = "red";
    }

    if (timeRemaining <= 0) {
      gradeQuiz(true); // automatically submit/grade when time runs out - passing in true to prevent prompting answering unanswered questions logic since the user didn't have time to do it

      return;
    }

    timeRemaining--;
    timerId = setTimeout(tick, 1000); // using setTimeout method to run tick method for 1000 ms/1 sec until the next decrease to the time remaining
  }

  tick(); // start ticking immediately
}
