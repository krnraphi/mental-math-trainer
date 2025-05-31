let score = 0;
let correctAnswer = 0;
 
function generateQuestion() {
  const category = document.getElementById("category").value;
  let num1, num2;
 
  if (category === "multiplication") {
    num1 = Math.floor(Math.random() * 90) + 10;
    num2 = Math.floor(Math.random() * 10) + 1;
    correctAnswer = num1 * num2;
    document.getElementById("question").textContent = `What is ${num1} × ${num2}?`;
 
  } else if (category === "division") {
    num2 = Math.floor(Math.random() * 9) + 2;
    correctAnswer = Math.floor(Math.random() * 10) + 2;
    num1 = num2 * correctAnswer;
    document.getElementById("question").textContent = `What is ${num1} ÷ ${num2}?`;
 
  } else if (category === "percentages") {
    num1 = Math.floor(Math.random() * 900) + 100;
    num2 = [10, 20, 25, 50, 75][Math.floor(Math.random() * 5)];
    correctAnswer = Math.round((num1 * num2) / 100);
    document.getElementById("question").textContent = `What is ${num2}% of ${num1}?`;
 
  } else if (category === "growth") {
    num1 = Math.floor(Math.random() * 100) + 50;
    num2 = Math.floor(Math.random() * 100) + 50;
    correctAnswer = Math.round(((num2 - num1) / num1) * 100);
    document.getElementById("question").textContent = `If a value changes from ${num1} to ${num2}, what is the % change?`;
 
  } else if (category === "profitability") {
    const price = Math.floor(Math.random() * 100) + 50;
    const cost = Math.floor(Math.random() * (price - 10)) + 10;
    correctAnswer = Math.round(((price - cost) / price) * 100);
    document.getElementById("question").textContent = `If price = \$${price} and cost = \$${cost}, what is the profit margin (%)?`;
 
  } else if (category === "ratios") {
    num1 = Math.floor(Math.random() * 9) + 1;
    num2 = Math.floor(Math.random() * 9) + 1;
    correctAnswer = Math.round((num1 / (num1 + num2)) * 100);
    document.getElementById("question").textContent = `What percent is ${num1} out of ${num1 + num2}?`;
 
  } else if (category === "estimation") {
    num1 = Math.floor(Math.random() * 900) + 100;
    num2 = Math.floor(Math.random() * 90) + 10;
    correctAnswer = Math.round((num1 * num2) / 1000) * 1000;
    document.getElementById("question").textContent = `Estimate: ${num1} × ${num2} (round to nearest 1000)`;
  }
 
  document.getElementById("answer").value = "";
  document.getElementById("feedback").textContent = "";
}
 
function checkAnswer() {
  const userAnswer = parseInt(document.getElementById("answer").value);
 
  if (userAnswer === correctAnswer) {
    document.getElementById("feedback").textContent = "✅ Correct!";
    score++;
  } else {
    document.getElementById("feedback").textContent = `❌ Incorrect. The correct answer was ${correctAnswer}.`;
  }
 
  document.getElementById("score").textContent = score;
  setTimeout(generateQuestion, 1500); // Wait 1.5 seconds, then show next question
}
 
window.onload = generateQuestion;
 
// Allow pressing Enter to submit the answer
document.getElementById("answer").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    checkAnswer();
  }
});