document.addEventListener("DOMContentLoaded", () => {
  const htmlQuestions = [
    {
      question: "Which HTML tag is used to define an internal style sheet?",
      answers: ["<css>", "<style>", "<script>", "<link>"],
      correct: 1
    },
    {
      question: "Which tag creates a numbered list?",
      answers: ["<ul>", "<ol>", "<dl>", "<li>"],
      correct: 1
    },
    {
      question: "What does the 'alt' attribute in images provide?",
      answers: ["Style info", "Title text", "Alternative text", "Nothing"],
      correct: 2
    },
    {
      question: "Which doctype declaration is correct for HTML5?",
      answers: ["<!DOCTYPE html>", "<!DOCTYPE HTML PUBLIC>", "<!HTML5>", "<!DOCTYPE>"],
      correct: 0
    },
    {
      question: "What’s the purpose of the `<label>` tag?",
      answers: ["Adds style", "Links input with text", "Displays alerts", "None"],
      correct: 1
    }
  ];

  const cssQuestions = [
    {
      question: "Which property controls the text size?",
      answers: ["font-style", "text-size", "font-size", "size"],
      correct: 2
    },
    {
      question: "Which CSS property changes the background color?",
      answers: ["color", "bgcolor", "background-color", "background"],
      correct: 2
    },
    {
      question: "How do you select an element with id 'main'?",
      answers: ["#main", ".main", "main", "*main"],
      correct: 0
    },
    {
      question: "Which is the correct syntax for a comment in CSS?",
      answers: ["// comment", "<!-- comment -->", "/* comment */", "# comment"],
      correct: 2
    },
    {
      question: "Which property is used to change the font?",
      answers: ["font-weight", "font-family", "font-style", "text-style"],
      correct: 1
    }
  ];

  function createQuestionBlock(index, questionObj, prefix) {
    const block = document.createElement("div");
    block.className = "question-block";

    const questionId = `${prefix}-q${index + 1}`;
    block.innerHTML = `
      <h3><span class="sr-only">Question</span>${index + 3}</h3>
      <fieldset class="question" name="${questionId}">
        <legend>${questionObj.question}</legend>
        <ul class="answers-list">
          ${questionObj.answers.map((ans, i) => `
            <li>
              <label for="${questionId}-a${i}">
                <input type="radio" id="${questionId}-a${i}" name="${questionId}" value="${ans}" />
                ${ans}
              </label>
            </li>`).join('')}
        </ul>
      </fieldset>
    `;
    return block;
  }

  const htmlContainer = document.querySelector("#html-questions").parentNode;
  const cssContainer = document.querySelector("#css-questions").parentNode.querySelector(".formrow");

  htmlQuestions.slice(2).forEach((q, i) => {
    htmlContainer.appendChild(createQuestionBlock(i, q, "html"));
  });

  cssQuestions.forEach((q, i) => {
    cssContainer.insertBefore(createQuestionBlock(i, q, "css"), cssContainer.lastElementChild);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const correctAnswers = {
    "html-q1": "true",
    "html-q2": "true",
    "html-q3": "style",
    "html-q4": "ol",
    "html-q5": "Alternative text",
    "css-q1": "font-size",
    "css-q2": "background-color",
    "css-q3": "#main",
    "css-q4": "/* comment */",
    "css-q5": "font-family"
  };

  document.getElementById("check-answers").addEventListener("click", () => {
    let score = 0;

    for (const [questionName, correctValue] of Object.entries(correctAnswers)) {
      const selected = document.querySelector(`input[name="${questionName}"]:checked`);
      const options = document.querySelectorAll(`input[name="${questionName}"]`);

      options.forEach(option => {
        option.parentElement.style.backgroundColor = "transparent";
      });

      if (selected) {
        if (selected.value === correctValue) {
          score++;
          selected.parentElement.style.backgroundColor = "#d4edda"; 
        } else {
          selected.parentElement.style.backgroundColor = "#f8d7da"; 
          options.forEach(opt => {
            if (opt.value === correctValue) {
              opt.parentElement.style.backgroundColor = "#d1ecf1"; 
            }
          });
        }
      }
    }

    const display = document.getElementById("score-display");
    display.textContent = `Your score: ${score} / 10`;
    display.style.color = score >= 8 ? "green" : score >= 5 ? "orange" : "red";
  });
});
