var questions = [
  {
    question: "Câu 1: Mặt trăng có ánh sáng tự nhiên.",
    answer: "Đúng",
    type: "true-false"
  },
  {
      question: "Câu 2: Đại dương Thái Bình Dương nằm ở phía đông của châu Á.",
      answer: "Đúng",
    type: "true-false"
  },
  {
    question: "Câu 3: Con người có 5 ngón tay ở mỗi tay.",
    answer: "Đúng",
    type: "true-false"
  },
  {
    question: "Câu 4: Tác phẩm 'Mona Lisa' được vẽ bởi nghệ sĩ nào?",
    choices: ["Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh", "Michelangelo"],
    answer: "Leonardo da Vinci",
    type: "multiple-choice"
  },
  {
    question: "Câu 5: Câu nào sau đây là câu hỏi có 4 đáp án?",
    choices: ["Câu 1", "Câu 2", "Câu 3", "Câu 4"],
    answer: "Câu 1",
    type: "multiple-choice"
  },
  {
    question: "Câu 6: Trong hệ Mặt trời, hành tinh nào gần mặt trời nhất?",
    choices: ["Mars", "Venus", "Mercury", "Earth"],
    answer: "Mercury",
    type: "multiple-choice"
  },
  {
    question: "Câu 7: Những nguyên tố sau đây thuộc nhóm kim loại:",
    choices: ["Sắt", "Oxy", "Nhôm", "Crom"],
    answer: "Sắt",
    type: "multiple-choice"
  },
  {
    question: "Câu 8: Các loại môi trường sau đây ảnh hưởng đến sự sống của loài cá:",
    choices: ["Nước lạnh", "Nước ô nhiễm", "Nước có nhiều oxy", "Nước có nhiều muối"],
    answer: "Nước lạnh",
    type: "multiple-choice"
  },
  {
    question: "Câu 9: Các hành động sau đây giúp bảo vệ môi trường:",
    choices: ["Tái chế", "Sử dụng túi nylon một lần", "Sử dụng nhiên liệu hóa thạch nhiều hơn"],
    answer: "Tái chế",
    type: "multiple-choice"
  },
  {
    question: "Câu 10: Các mục đích của việc sử dụng máy tính bao gồm:",
    choices: ["Chơi game", "Ghi chép", "Học tập", "Nấu ăn"],
    answer: "Học tập",
    type: "multiple-choice"
  }
];

var quizContainer = document.getElementById('quiz');

// hàm tạo câu hỏi
async function displayQuestions() {
  const exams = await (await fetch("http://localhost:3000/exam/")).json();
  exams.data.forEach(function (question, index) {
    var questionDiv = document.createElement('div');
    questionDiv.classList.add('question');
    questionDiv.innerHTML = '<p>' + question.question + '</p>';

    if (question.type === "true-false") {
      questionDiv.innerHTML += '<div class="choices">' +
        '<label><input type="radio" name="q' + index + '" value="Đúng"> Đúng</label>' +
        '<label><input type="radio" name="q' + index + '" value="Sai"> Sai</label>' +
        '</div>';
    } else if (question.type === "multiple-choice") {
      question.choices.forEach(function (choice) {
        questionDiv.innerHTML += '<div class="choices">' +
          '<label><input type="radio" name="q' + index + '" value="' + choice + '"> ' + choice + '</label>' +
          '</div>';
      });
    } else if (question.type === "multiple-choice") {
      question.choices.forEach(function (choice) {
        questionDiv.innerHTML += '<div class="choices">' +
          '<label><input type="checkbox" name="q' + index + '" value="' + choice + '"> ' + choice + '</label>' +
          '</div>';
      });
    }

    document.getElementById('quiz').appendChild(questionDiv);
  });
}

displayQuestions();

var minutes = 10;
var seconds = 0;
var timerElement = document.getElementById('timer');

function updateTimer() {
  if (seconds === 0) {
    if (minutes === 0) {
      clearInterval(timerInterval);
      timerElement.textContent = "Hết thời gian";
      submitQuiz();
      return;
    } else {
      minutes--;
      seconds = 59;
    }
  } else {
    seconds--;
  }

  timerElement.textContent = "Thời gian còn lại: " + minutes.toString().padStart(2, '0') + ":" + seconds.toString().padStart(2, '0');
}

var timerInterval = setInterval(updateTimer, 1000);

async function submitQuiz() {
  // Tính số câu trả lời đúng và điểm số
  const exams = await (await fetch("http://localhost:3000/exam/")).json();
  var confirmation = confirm("Bạn có chắc chắn muốn nộp bài?");
  if (confirmation) {
    var correctAnswers = 0;
    var answersDetail = [];
    exams.data.forEach(function (question, index) {
      var userAnswer;
      var correctAnswer = question.answer;

      if (question.type === "true-false" || question.type === "multiple-choice") {
        var selectedOption = document.querySelector('input[name="q' + index + '"]:checked');
        if (selectedOption) {
          userAnswer = selectedOption.value;
          if (userAnswer === correctAnswer) {
            correctAnswers++;
          }
        }
      } else if (question.type === "multiple-choice") {
        var selectedOptions = document.querySelectorAll('input[name="q' + index + '"]:checked');
        userAnswer = [];
        selectedOptions.forEach(function (option) {
          userAnswer.push(option.value);
        });
        // Kiểm tra câu trả lời có chính xác không
        var isCorrect = userAnswer.sort().toString() === correctAnswer.sort().toString();
        if (isCorrect) {
          correctAnswers++;
        }
      }

      answersDetail.push({
        question: question.question,
        userAnswer: userAnswer || "Chưa trả lời",
        correctAnswer: correctAnswer
      });
    });

    // Tính điểm số
    var score = (correctAnswers / exams.data.length * 10).toFixed(2);

    // Lưu dữ liệu vào localStorage
    localStorage.setItem('totalQuestions', exams.data.length);
    localStorage.setItem('correctAnswers', correctAnswers);
    localStorage.setItem('score', score);
    localStorage.setItem('answersDetail', JSON.stringify(answersDetail));

    alert("Bạn đã hoàn thành bài thi. Cảm ơn bạn đã tham gia!");

    // Chuyển hướng sang trang kết quả
    window.location.href = "../results/result.html";
  } else {

  }
}
