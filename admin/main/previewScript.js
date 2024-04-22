document.addEventListener('DOMContentLoaded', function() {
    // Get exam data from localStorage
    var examPreviewData = JSON.parse(localStorage.getItem('examPreviewData'));
  
    // Display exam information
    var examPreviewElement = document.getElementById('examPreview');
    examPreviewElement.innerHTML = `
      <div class="exam-info">
        <h2>${examPreviewData.examName}</h2>
        <p>Description: ${examPreviewData.examDescription}</p>
        <p>End Date: ${examPreviewData.examEndDate}</p>
      </div>
      <div class="question-list">
        ${generateQuestionList(examPreviewData.questions)}
      </div>
    `;
  });
  
  function generateQuestionList(questions) {
    return questions.map(function(question, index) {
      var questionIndex = index + 1;
      return `
        <div class="question">
          <h3>Question ${questionIndex}</h3>
          <p>${question.questionText}</p>
          <ul class="answers">
            ${generateAnswerList(question.answers, question.correctAnswer)}
          </ul>
        </div>
      `;
    }).join('');
  }
  
  function generateAnswerList(answers, correctAnswer) {
    return Object.entries(answers).map(function([key, value]) {
      var isCorrect = key === correctAnswer ? ' correct-answer' : '';
      return `<li class="answer-item${isCorrect}">${key}. ${value}</li>`;
    }).join('');
  }
  