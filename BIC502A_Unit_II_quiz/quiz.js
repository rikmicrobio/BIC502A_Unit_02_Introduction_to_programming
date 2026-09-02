/*
  BIC502A Unit II Linux Mini Quiz

  IMPORTANT:
  The quiz itself works without Google Sheets.

  After your Google Apps Script Web App is deployed, replace
  PASTE_WEB_APP_URL_HERE with the Web App URL ending in /exec.
*/

const GOOGLE_SCRIPT_URL = "PASTE_WEB_APP_URL_HERE";

const questions = [
  {
    question: "Which command displays the beginning of a file?",
    options: ["tail", "head", "grep", "cut"],
    answer: "head"
  },
  {
    question: "Which command displays the end of a file?",
    options: ["head", "tail", "grep", "paste"],
    answer: "tail"
  },
  {
    question: "Which command searches for a pattern in a text file?",
    options: ["grep", "fold", "cat", "vim"],
    answer: "grep"
  },
  {
    question: 'In "head -n 10 proteins_large.fasta", what is "-n"?',
    options: ["Command", "Option", "Argument", "Output"],
    answer: "Option"
  },
  {
    question: 'In "head -n 10 proteins_large.fasta", what is "proteins_large.fasta"?',
    options: ["Command", "Option", "Argument", "Delimiter"],
    answer: "Argument"
  },
  {
    question: 'What is the delimiter in "protein_01|KINASE_A|TEACHING_SET"?',
    options: [">", "|", "-", "/"],
    answer: "|"
  },
  {
    question: "Which option makes grep ignore uppercase/lowercase differences?",
    options: ["-n", "-i", "-c", "-f"],
    answer: "-i"
  },
  {
    question: "What does the pipe symbol | do?",
    options: [
      "Deletes a file",
      "Sends output of one command to another command",
      "Edits a file",
      "Counts lines"
    ],
    answer: "Sends output of one command to another command"
  },
  {
    question: "Which symbol writes command output to a file and replaces its existing contents?",
    options: [">>", ">", "|", "-"],
    answer: ">"
  },
  {
    question: "Which symbol appends command output to the end of an existing file?",
    options: [">", ">>", "|", "-"],
    answer: ">>"
  }
];

document.addEventListener("DOMContentLoaded", function () {
  const startScreen = document.getElementById("startScreen");
  const quizForm = document.getElementById("quizForm");
  const resultScreen = document.getElementById("resultScreen");
  const questionsContainer = document.getElementById("questions");

  document.getElementById("startButton").addEventListener("click", startQuiz);

  function startQuiz() {
    const name = document.getElementById("studentName").value.trim();

    if (name === "") {
      alert("Please enter your full name before starting the quiz.");
      document.getElementById("studentName").focus();
      return;
    }

    startScreen.classList.add("hidden");
    quizForm.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  questions.forEach(function (item, index) {
    const questionDiv = document.createElement("section");
    questionDiv.className = "question";

    const heading = document.createElement("h3");
    heading.textContent = (index + 1) + ". " + item.question;
    questionDiv.appendChild(heading);

    item.options.forEach(function (option) {
      const label = document.createElement("label");
      label.className = "option";

      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "question" + index;
      radio.value = option;
      radio.required = true;

      label.appendChild(radio);
      label.appendChild(document.createTextNode(option));
      questionDiv.appendChild(label);
    });

    questionsContainer.appendChild(questionDiv);
  });

  quizForm.addEventListener("submit", submitQuiz);

  async function submitQuiz(event) {
    event.preventDefault();

    let score = 0;

    questions.forEach(function (item, index) {
      const selected = document.querySelector(
        'input[name="question' + index + '"]:checked'
      );

      if (selected && selected.value === item.answer) {
        score++;
      }
    });

    const name = document.getElementById("studentName").value.trim();
    const roll = document.getElementById("rollNumber").value.trim();
    const total = questions.length;
    const percentage = Math.round((score / total) * 100);

    quizForm.classList.add("hidden");
    resultScreen.classList.remove("hidden");

    document.getElementById("score").textContent =
      score + " / " + total;

    document.getElementById("message").textContent =
      score >= 9
        ? "Excellent — Linux Explorer!"
        : score >= 7
        ? "Good work — Command Apprentice!"
        : score >= 5
        ? "Good start — keep exploring!"
        : "Keep practising and try again!";

    const status = document.getElementById("submissionStatus");

    if (GOOGLE_SCRIPT_URL.includes("PASTE_WEB_APP_URL_HERE")) {
      status.textContent =
        "Your score has been calculated. Google Sheets submission is not configured yet.";
      return;
    }

    status.textContent = "Submitting your result...";

    const data = new URLSearchParams();
    data.append("name", name);
    data.append("roll", roll);
    data.append("score", String(score));
    data.append("total", String(total));
    data.append("percentage", String(percentage));

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: data
      });

      status.textContent = "Your result has been submitted.";
    } catch (error) {
      console.error(error);
      status.textContent =
        "Your score was calculated, but the result could not be submitted.";
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  document.getElementById("againButton").addEventListener("click", function () {
    window.location.reload();
  });
});
