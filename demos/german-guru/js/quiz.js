/**
 * GERMAN GURU - INTERACTIVE LEVEL PLACEMENT QUIZ
 * 5-question diagnostic quiz that evaluates German proficiency
 * and calculates the recommended CEFR level (A1 to C1).
 */

const quizData = [
  {
    question: "1. What is the correct German response to 'Wie geht es Ihnen?' (How are you?)",
    options: [
      { text: "Danke, gut! Und Ihnen?", score: 1 },
      { text: "Ich heiße Rahul.", score: 0 },
      { text: "Auf Wiedersehen.", score: 0 },
      { text: "Bitte schön.", score: 0 }
    ]
  },
  {
    question: "2. Which is the correct definite article for the German word 'Buch' (Book)?",
    options: [
      { text: "Der Buch", score: 0 },
      { text: "Die Buch", score: 0 },
      { text: "Das Buch (Neuter)", score: 1 },
      { text: "Den Buch", score: 0 }
    ]
  },
  {
    question: "3. Choose the grammatically correct sentence:",
    options: [
      { text: "Ich habe gestern Deutsch gelernt.", score: 1 },
      { text: "Ich habe gestern gelernt Deutsch.", score: 0 },
      { text: "Ich bin gestern Deutsch lernen.", score: 0 },
      { text: "Ich gestern Deutsch gelernt habe.", score: 0 }
    ]
  },
  {
    question: "4. Complete the sentence: 'Ich fahre nach Deutschland, ______ ich dort studieren will.' (because)",
    options: [
      { text: "aber", score: 0 },
      { text: "weil", score: 1 },
      { text: "oder", score: 0 },
      { text: "und", score: 0 }
    ]
  },
  {
    question: "5. What is your primary objective for learning German with German Guru?",
    options: [
      { text: "Complete Beginner looking to start with A1", score: 0, tag: "A1" },
      { text: "Clear Goethe B1 / B2 for German Work or Study Visa", score: 1, tag: "B1" },
      { text: "Apply for Germany Ausbildung (Paid Vocational Training)", score: 1, tag: "Ausbildung" },
      { text: "Master Academic German (C1 / TestDaF) for Public Universities", score: 1, tag: "C1" }
    ]
  }
];

let currentQuestionIndex = 0;
let userTotalScore = 0;
let userChoices = [];

function initQuiz() {
  const quizContainer = document.getElementById('germanLevelQuiz');
  if (!quizContainer) return;

  currentQuestionIndex = 0;
  userTotalScore = 0;
  userChoices = [];
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const stepContainer = document.getElementById('quizStepContainer');
  const progressBar = document.getElementById('quizProgressBar');
  const resultContainer = document.getElementById('quizResultContainer');

  if (!stepContainer || !progressBar) return;

  if (resultContainer) resultContainer.classList.remove('active');
  stepContainer.style.display = 'block';

  const total = quizData.length;
  const currentQ = quizData[currentQuestionIndex];
  const progressPercent = ((currentQuestionIndex + 1) / total) * 100;
  progressBar.style.width = `${progressPercent}%`;

  let optionsHtml = '';
  currentQ.options.forEach((opt, idx) => {
    optionsHtml += `
      <button type="button" class="quiz-option-btn" onclick="handleQuizAnswer(${opt.score}, '${opt.text.replace(/'/g, "\\'")}')">
        <i class="far fa-circle"></i>
        <span>${opt.text}</span>
      </button>
    `;
  });

  stepContainer.innerHTML = `
    <div class="quiz-step-card active">
      <div class="quiz-question-number">Question ${currentQuestionIndex + 1} of ${total}</div>
      <h3 class="quiz-question-title">${currentQ.question}</h3>
      <div class="quiz-options-group">
        ${optionsHtml}
      </div>
    </div>
  `;
}

function handleQuizAnswer(score, selectedText) {
  userTotalScore += score;
  userChoices.push(selectedText);

  currentQuestionIndex++;

  if (currentQuestionIndex < quizData.length) {
    renderQuizQuestion();
  } else {
    showQuizResults();
  }
}

function showQuizResults() {
  const stepContainer = document.getElementById('quizStepContainer');
  const resultContainer = document.getElementById('quizResultContainer');
  const progressBar = document.getElementById('quizProgressBar');

  if (stepContainer) stepContainer.style.display = 'none';
  if (progressBar) progressBar.style.width = '100%';

  let recommendedLevel = 'German A1 (Beginner)';
  let levelDesc = 'You are ideally suited to start from our German A1 Foundation batch. You will master basic grammar, pronunciation, daily greetings, and Goethe Start Deutsch 1 exam patterns.';
  let batchCode = 'A1';

  if (userTotalScore >= 4) {
    recommendedLevel = 'German B2 / C1 (Advanced Mastery)';
    levelDesc = 'Impressive skills! You have strong grasp of German syntax. You are ready for our Intensive B2 Upper-Intermediate or C1 Academic/TestDaF program for university and professional careers in Germany.';
    batchCode = 'B2-C1';
  } else if (userTotalScore >= 3) {
    recommendedLevel = 'German B1 (Intermediate)';
    levelDesc = 'Good foundation! You are ready for German B1 Intermediate. We will focus on Goethe-Zertifikat B1 4-module mastery, complex sentence connectors, and conversational fluency for work and study visas.';
    batchCode = 'B1';
  } else if (userTotalScore >= 2) {
    recommendedLevel = 'German A2 (Elementary)';
    levelDesc = 'You know the basics! You are ready to step into German A2 to expand your sentence structures, past tense (Perfekt/Präteritum), and daily conversational confidence.';
    batchCode = 'A2';
  }

  const waMessage = encodeURIComponent(
    `Hallo German Guru! I completed your Online German Level Test.\nMy Score: ${userTotalScore}/5\nRecommended Level: ${recommendedLevel}\nI want to attend a Free Demo Class for this level. Please share batch details!`
  );
  const waUrl = `https://wa.me/916280723651?text=${waMessage}`;

  if (resultContainer) {
    resultContainer.innerHTML = `
      <div class="quiz-result-card active">
        <div class="result-badge"><i class="fas fa-trophy"></i> Your Recommendation</div>
        <h3 class="result-title">${recommendedLevel}</h3>
        <p class="result-explanation">${levelDesc}</p>
        <div class="result-cta-box">
          <a href="${waUrl}" target="_blank" class="btn btn-gold btn-lg">
            <i class="fab fa-whatsapp"></i> Chat with Counselor on WhatsApp
          </a>
          <button type="button" onclick="initQuiz()" class="btn btn-outline-white btn-lg">
            <i class="fas fa-redo"></i> Retake Test
          </button>
        </div>
      </div>
    `;
    resultContainer.classList.add('active');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initQuiz();
});
