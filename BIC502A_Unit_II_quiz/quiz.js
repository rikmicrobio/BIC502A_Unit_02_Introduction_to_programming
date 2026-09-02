// BIC502A Unit II Linux Mini Puzzle
// Replace the URL below after deploying Code.gs as a Google Apps Script Web App.

const GOOGLE_SCRIPT_URL = "PASTE_YOUR_WEB_APP_URL_HERE";

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
    q: 'Which symbol writes command output to a file and replaces its existing contents?',
    options: [">>", ">", "|", "-"],
    answer: ">"
  },
  {
    q: "Which symbol appends command output to the end of an existing file?",
    options: [">", ">>", "|", "-"],
    answer: ">>"
  }
];

const startCard = document.getElementById("start");
const quizForm = document.getElementById("quiz");
const questionsBox = document.getElementById("questions");
const resultCard = document.getElementById("result");

document.getElementById("startBtn").addEventListener("click", function () {

  const name = document.getElementById("name").value.trim();

  if (!name) {
    alert("Please enter your full name.");
    return;
  }

  startCard.classList.add("hidden");
  quizForm.classList.remove("hidden");

  window.scrollTo(0, 0);
});


questions.forEach(function (item, index) {

  const section = document.createElement("section");
  section.className = "question";

  const heading = document.createElement("h3");
  heading.textContent = (index + 1) + ". " + item.q;

  section.appendChild(heading);

  item.options.forEach(function (option) {

    const label = document.createElement("label");
    label.className = "option";

    const input = document.createElement("input");

    input.type = "radio";
    input.name = "q" + index;
    input.value = option;
    input.required = true;

    label.appendChild(input);
    label.appendChild(document.createTextNode(option));

    section.appendChild(label);
  });

  questionsBox.appendChild(section);
});


quizForm.addEventListener("submit", async function (event) {

  event.preventDefault();

  let score = 0;

  questions.forEach(function (item, index) {

    const selected = document.querySelector(
      'input[name="q' + index + '"]:checked'
    );

    if (selected && selected.value === item.answer) {
      score++;
    }

  });


  const name = document.getElementById("name").value.trim();
  const roll = document.getElementById("roll").value.trim();

  const total = questions.length;
  const percentage = Math.round((score / total) * 100);


  quizForm.classList.add("hidden");
  resultCard.classList.remove("hidden");


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


  const status = document.getElementById("status");


  if (GOOGLE_SCRIPT_URL.includes("PASTE_YOUR")) {

    status.textContent =
      "Quiz completed. Teacher result collection is not configured yet.";

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

    status.textContent =
      "Your result has been submitted.";

  } catch (error) {

    status.textContent =
      "Score calculated, but submission failed. Please inform the teacher.";

    console.error(error);

  }


  window.scrollTo(0, 0);

});


document.getElementById("again").addEventListener("click", function () {

  location.reload();

});
