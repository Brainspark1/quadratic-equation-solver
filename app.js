const explanationElements = document.getElementsByClassName("explanation");

const explanationArray = [
  `A polynomial is a mathematical expression made up of numbers (aka coefficients) and letters (aka variables) combined using addition and subtraction, with NO negative or fractional exponents/roots (like a square root √). 
  
For example, x^3 + 3x^2 - x + 7. Notice how each term is separated by either addition or subtraction, and that there are no negative or fractional exponents.
  `,
  `
A degree is the highest exponent that a single term in a polynomial is raised to. 

For example, in x^3 + 3x^2 - x + 7, the highest exponent is 3 of the first term. This makes the x^3 term the leading term, as it is the term with the highest power/degree of the entire polynomial. 

💡 Top Tip - sometimes, teachers may place the leading term in the middle of the polynomial and ask you to identify the degree. For example,

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
Also known as the x-intercepts of the function on the graph, but we are getting there!
`,
  `
The size of the numerical value held by a variable.
`,
];

for (let i = 0; i < explanationElements.length; i++) {
  explanationElements[i].addEventListener("click", function () {
    alert(explanationArray[i]);
  });
}
