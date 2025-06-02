let timer;
let timeLeft = 10;

let score = 0;
let correctAnswer = 0;

document.getElementById("category").addEventListener("change", function() {
  const cat = this.value;
  const diffLabel = document.getElementById("difficulty-label");
  const diffSelect = document.getElementById("difficulty");
  if (cat === "growth") {
    diffLabel.style.display = "inline";
    diffSelect.style.display = "inline";
  } else {
    diffLabel.style.display = "none";
    diffSelect.style.display = "none";
  }
});

function startTimer() {
    clearInterval(timer);
    timeLeft = 10;
    document.getElementById("time-left").textContent = timeLeft;

    timer = setInterval(() => {
      timeLeft--;
      document.getElementById("time-left").textContent = timeLeft;

      if (timeLeft <= 0) {
        clearInterval(timer);
        document.getElementById("feedback").textContent = "⏰ Time's up!";
        document.getElementById("score").textContent = score;
        document.getElementById("answer").disabled = true;
        document.querySelector("button").disabled = true;
        setTimeout(generateQuestion, 1500);
      }
    }, 1000);
  }

document.getElementById("answer").disabled = true;
document.querySelector("button").disabled = true;

document.getElementById("enable-timer").addEventListener("change", function () {
  const timerDisplay = document.getElementById("timer");
  clearInterval(timer);  
  
  if (this.checked) {
    timerDisplay.style.display = "block";
    startTimer(); 
  } else {
    timerDisplay.style.display = "none";
    clearInterval(timer); // Stop the timer if it's running
  }
});

function generateQuestion() {

  document.getElementById("answer").disabled = false;
  document.querySelector("button").disabled = false;

  const category = document.getElementById("category").value;

  // Always hide the chart unless explicitly shown later
  document.getElementById('growthChart').style.display = 'none';

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
    // Randomly choose between text or chart question
    if (Math.random() < 0.5) {
      // Existing text question
      document.getElementById('growthChart').style.display = 'none'; //
      num1 = Math.floor(Math.random() * 100) + 50;
      num2 = Math.floor(Math.random() * 100) + 50;
      correctAnswer = Math.round(((num2 - num1) / num1) * 100);
      document.getElementById("question").textContent = `If a value changes from ${num1} to ${num2}, what is the % change?`;
      document.getElementById("answer").value = "";
      document.getElementById("feedback").textContent = "";
    } else {
      // New chart question
      generateGrowthChartQuestion();
      return;
    }
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

  const timerEnabled = document.getElementById("enable-timer");
  if (timerEnabled && timerEnabled.checked) {
      startTimer();
  } else {
      clearInterval(timer);
      document.getElementById("time-left").textContent = "—";
  }
}

 
function checkAnswer() {
  clearInterval(timer);  
  const userAnswer = parseFloat(document.getElementById("answer").value);
  const category = document.getElementById("category").value;
  const feedback = document.getElementById("feedback");
  let isCorrect = false;
  let lowerBound, upperBound;

  if (isNaN(userAnswer)) {
    feedback.textContent = "⚠️ Please enter a valid number.";
    feedback.className = "";
    return;
  }

  if (category === "growth") {
    const difficulty = document.getElementById("difficulty").value;
    let buffer;
    if (difficulty === "easy") buffer = 7;
    else if (difficulty === "medium") buffer = 5;
    else buffer = 2;

    lowerBound = correctAnswer - buffer;
    upperBound = correctAnswer + buffer;
    isCorrect = userAnswer >= lowerBound && userAnswer <= upperBound;
  } else {
    isCorrect = userAnswer === correctAnswer;
  }

  if (isCorrect) {
    if (category === "growth") {
      feedback.textContent = `✅ Correct! Acceptable range: ${lowerBound}% to ${upperBound}%.`;
    } else {    
      feedback.textContent = `✅ Correct!`;
    }
    feedback.className = "correct";
    score++;
  } else {
    if (category === "growth") {
      feedback.textContent = `❌ Incorrect. The correct answer was ${correctAnswer}%. Acceptable range: ${lowerBound}% to ${upperBound}%.`;
    } else {
      feedback.textContent = `❌ Incorrect. The correct answer was ${correctAnswer}.`;
    }
    feedback.className = "incorrect";
  }

  document.getElementById("score").textContent = score;
  setTimeout(generateQuestion, 2000);
}
 
window.onload = generateQuestion;
 
// Allow pressing Enter to submit the answer
document.getElementById("answer").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    checkAnswer();
  }
});

function generateGrowthChartQuestion() {
  // Generate random revenue data for 5 years
  const years = [2020, 2021, 2022, 2023, 2024];
  const revenues = [];
  let base = Math.floor(Math.random() * 5000) + 5000;
  for (let i = 0; i < years.length; i++) {
    base += Math.floor(Math.random() * 2000) - 500; // random fluctuation
    revenues.push(base);
  }

  // Randomly pick two different years, start < end
  let startIdx = Math.floor(Math.random() * (years.length - 1)); // 0 to 3
  let endIdx = Math.floor(Math.random() * (years.length - startIdx - 1)) + startIdx + 1; // startIdx+1 to 4

  // Debug: Log the indices to verify randomness
  console.log("startIdx:", startIdx, "endIdx:", endIdx);

  // Calculate the answer
  correctAnswer = Math.round(((revenues[endIdx] - revenues[startIdx]) / revenues[startIdx]) * 100);
  document.getElementById('question').textContent =
  `What is the percentage change in revenue from ${years[startIdx]} to ${years[endIdx]}?`;
  
  // Show the chart
  document.getElementById('growthChart').style.display = 'block';

  // Create or update the chart
  if (window.growthChartInstance) {
    window.growthChartInstance.destroy();
  }
  const ctx = document.getElementById('growthChart').getContext('2d');
  window.growthChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: years,
      datasets: [{
        label: 'Revenue',
        data: revenues,
        borderColor: 'blue',
        backgroundColor: 'rgba(0,0,255,0.1)',
        fill: true,
        tension: 0.3
      }]
    },
    options: { 
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: { beginAtZero: true }
      }
    }
  });

  // Ask a question about the change (e.g., growth from 2019 to 2023)
  document.getElementById('answer').value = '';
  document.getElementById('feedback').textContent = '';
}

document.getElementById("menu-toggle").addEventListener("click", function () {
  const menu = document.getElementById("side-menu");
  const app = document.querySelector(".app");
  menu.classList.toggle("hidden");
  app.classList.toggle("shifted");
});

function resetSettings() {
    document.getElementById("category").value = "multiplication";
    document.getElementById("difficulty").value = "easy";
    document.getElementById("difficulty-label").style.display = "none";
    document.getElementById("difficulty").style.display = "none";
    document.getElementById("enable-timer").checked = false;
    document.getElementById("interview-mode").checked = false;
    document.getElementById("score").textContent = "0";
    document.getElementById("feedback").textContent = "";
    document.getElementById("answer").value = "";
    document.getElementById("time-left").textContent = "-";
    generateQuestion();
}

