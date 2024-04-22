// Lấy dữ liệu từ local storage (truyền từ trang trước)
var totalQuestions = localStorage.getItem('totalQuestions');
var correctAnswers = localStorage.getItem('correctAnswers');
var score = localStorage.getItem('score');
var answersDetail = JSON.parse(localStorage.getItem('answersDetail'));

// Hiển thị dữ liệu trên trang kết quả
document.getElementById('total-questions').textContent = "Tổng số câu: " + totalQuestions;
document.getElementById('correct-answers').textContent = "Số câu trả lời đúng: " + correctAnswers;
document.getElementById('score').textContent = "Điểm số: " + score;

// Hiển thị chi tiết câu trả lời
var answersDetailDiv = document.getElementById('answers-detail');
answersDetail.forEach(function(answer, index) {
    var questionDiv = document.createElement('div');
    questionDiv.classList.add('question-detail');
    questionDiv.innerHTML = '<p>' + answer.question + '</p>';

    // Tạo một span để chứa nội dung của câu trả lời
    var answerSpan = document.createElement('span');

    // Kiểm tra xem câu trả lời có đúng hay không và thêm class và dấu tích/x tương ứng
    if (answer.userAnswer === answer.correctAnswer) {
        answerSpan.textContent = 'Câu trả lời của bạn: ' + answer.userAnswer;
        answerSpan.classList.add('correct-answer');
        answerSpan.classList.add('check-mark');
    } else {
        answerSpan.textContent = 'Câu trả lời của bạn: ' + answer.userAnswer;
        answerSpan.classList.add('wrong-answer');
        answerSpan.classList.add('cross-mark');
    }

    // Thêm span vào div của câu hỏi
    questionDiv.appendChild(answerSpan);

    // Hiển thị đáp án đúng
    questionDiv.innerHTML += '<p>Đáp án đúng: ' + answer.correctAnswer + '</p>';
    answersDetailDiv.appendChild(questionDiv);
});


