const questions = [
  {
    q: "Which command displays the beginning of a file?",
    options: ["tail", "head", "grep", "cut"],
    answer: "head"
  },
  {
    q: "Which command displays the end of a file?",
    options: ["head", "tail", "grep", "paste"],
    answer: "tail"
  },
  {
    q: "Which command searches for a pattern in a text file?",
    options: ["grep", "fold", "cat", "vim"],
    answer: "grep"
  },
  {
    q: 'In the command "head -n 10 proteins_large.fasta", what is "-n"?',
    options: ["Command", "Option", "Argument", "Output"],
    answer: "Option"
  },
  {
    q: 'In the command "head -n 10 proteins_large.fasta", what is "proteins_large.fasta"?',
    options: ["Command", "Option", "Argument", "Delimiter"],
    answer: "Argument"
  },
  {
    q: 'What is the delimiter in "protein_01|KINASE_A|TEACHING_SET"?',
    options: [">", "|", "-", "/"],
    answer: "|"
  },
  {
    q: "Which option makes grep ignore uppercase/lowercase differences?",
    options: ["-n", "-i", "-c", "-f"],
    answer: "-i"
  },
  {
    q: "What does the pipe symbol | do?",
    options: [
      "Deletes a file",
      "Sends output of one command to another command",
      "Edits a file",
      "Counts lines"
    ],
    answer: "Sends output of one command to another command"
  },
  {
    q: "Which symbol writes command output to a file and replaces its existing contents?",
    options: [">>", ">", "|", "-"],
    answer: ">"
  },
  {
    q: "Which symbol appends command output to the end of an existing file?",
    options: [">", ">>", "|", "-"],
    answer: ">>"
  }
];

const startCard = document.getElementById("start-card");
const quiz = document.getElementById("quiz");
const questionsBox = document.getElementById("questions");
const result = document.getElementById("result");
const scoreBox = document.getElementById("score");
const message = document.getElementById("message");

document.getElementById("startBtn").addEventListener("click", () => {
  const name = document.getElementById("name").value.trim();
  if (!name) {
    alert("Please enter your full name.");
    return;
  }
  startCard.classList.add("hidden");
  quiz.classList.remove("hidden");
  window.scrollTo({top: 0, behavior: "smooth"});
});

questions.forEach((item, index) => {
  const section = document.createElement("section");
  section.className = "question";

  const heading = document.createElement("h3");
  heading.textContent = `${index + 1}. ${item.q}`;
  section.appendChild(heading);

  item.options.forEach((option, optionIndex) => {
    const label = document.createElement("label");
    label.className = "option";

    const input = document.createElement("input");
    input.type = "radio";
    input.name = `q${index}`;
    input.value = option;
    input.required = true;

    label.appendChild(input);
    label.appendChild(document.createTextNode(option));
    section.appendChild(label);
  });

  questionsBox.appendChild(section);
});

quiz.addEventListener("submit", (event) => {
  event.preventDefault();

  let score = 0;
  questions.forEach((item, index) => {
    const selected = document.querySelector(`input[name="q${index}"]:checked`);
    if (selected && selected.value === item.answer) score++;
  });

  const name = document.getElementById("name").value.trim();
  const roll = document.getElementById("roll").value.trim();

  const attempt = {
    name,
    roll,
    score,
    total: questions.length,
    submittedAt: new Date().toISOString()
  };

  // Local browser record. This does not send data to a server.
  const attempts = JSON.parse(localStorage.getItem("unitIIQuizAttempts") || "[]");
  attempts.push(attempt);
  localStorage.setItem("unitIIQuizAttempts", JSON.stringify(attempts));

  quiz.classList.add("hidden");
  result.classList.remove("hidden");

  scoreBox.textContent = `${score} / ${questions.length}`;

  if (score >= 9) {
    message.textContent = "Excellent — Linux Explorer!";
  } else if (score >= 7) {
    message.textContent = "Good work — Command Apprentice!";
  } else if (score >= 5) {
    message.textContent = "Good start — keep exploring!";
  } else {
    message.textContent = "Keep practising and try again!";
  }

  window.scrollTo({top: 0, behavior: "smooth"});
});

document.getElementById("againBtn").addEventListener("click", () => {
  document.getElementById("quiz").reset();
  result.classList.add("hidden");
  startCard.classList.remove("hidden");
  window.scrollTo({top: 0, behavior: "smooth"});
});
