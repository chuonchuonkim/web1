function showManageExam() {
    document.getElementById("manageExamContent").style.display = "block";
    document.getElementById("manageStudentsContent").style.display = "none";
    document.getElementById("statisticsContent").style.display = "none";
  }
  
  var questionCounter = 1;
  
  function addQuestion() {
    var questionList = document.getElementById("questionList");
    var questionDiv = document.createElement("div");
    questionDiv.classList.add("question");
    questionDiv.innerHTML =
      '<label for="question' +
      questionCounter +
      '">Câu hỏi ' +
      questionCounter +
      ":</label><br>" +
      '<input type="text" id="question' +
      questionCounter +
      '" name="question' +
      questionCounter +
      '"><br>' +
      '<label for="answer' +
      questionCounter +
      'A">Đáp án A:</label><br>' +
      '<input type="text" id="answer' +
      questionCounter +
      'A" name="answer' +
      questionCounter +
      "A" +
      '"><br>' +
      '<label for="answer' +
      questionCounter +
      'B">Đáp án B:</label><br>' +
      '<input type="text" id="answer' +
      questionCounter +
      'B" name="answer' +
      questionCounter +
      "B" +
      '"><br>' +
      '<label for="answer' +
      questionCounter +
      'C">Đáp án C:</label><br>' +
      '<input type="text" id="answer' +
      questionCounter +
      'C" name="answer' +
      questionCounter +
      "C" +
      '"><br>' +
      '<label for="answer' +
      questionCounter +
      'D">Đáp án D:</label><br>' +
      '<input type="text" id="answer' +
      questionCounter +
      'D" name="answer' +
      questionCounter +
      "D" +
      '"><br>' +
      '<label for="correctAnswer' +
      questionCounter +
      '">Đáp án đúng:</label><br>' +
      '<select id="correctAnswer' +
      questionCounter +
      '" name="correctAnswer' +
      questionCounter +
      '">' +
      '<option value="A">A</option>' +
      '<option value="B">B</option>' +
      '<option value="C">C</option>' +
      '<option value="D">D</option>' +
      "</select><br>" +
      '<button type="button" onclick="deleteQuestion(this)">Xóa</button>';
    questionList.appendChild(questionDiv);
    questionCounter++;
  }
  
  function submitExam() {
    var questionCounter = 1;
    var examName = document.getElementById("examName").value;
    var examDescription = document.getElementById("examDescription").value;
    var examEndDate = document.getElementById("examEndDate").value;
  
    var questions = [];
    var questionDivs = document.querySelectorAll(".question");
    questionDivs.forEach(function (questionDiv) {
      var questionText = questionDiv.querySelector(
        'input[name^="question"]'
      ).value;
      var answerA = questionDiv.querySelector(
        'input[name^="answer' + questionCounter + 'A"]'
      ).value;
      var answerB = questionDiv.querySelector(
        'input[name^="answer' + questionCounter + 'B"]'
      ).value;
      var answerC = questionDiv.querySelector(
        'input[name^="answer' + questionCounter + 'C"]'
      ).value;
      var answerD = questionDiv.querySelector(
        'input[name^="answer' + questionCounter + 'D"]'
      ).value;
      var correctAnswer = questionDiv.querySelector(
        'select[name^="correctAnswer' + questionCounter + '"]'
      ).value;
  
      var question = {
        questionText: questionText,
        answers: {
          A: answerA,
          B: answerB,
          C: answerC,
          D: answerD,
        },
        correctAnswer: correctAnswer,
      };
      questions.push(question);
      questionCounter++;
    });
  
    var examData = {
      examName: examName,
      examDescription: examDescription,
      examEndDate: examEndDate,
      questions: questions,
    };
  
    // Chuyển đổi đối tượng JSON thành chuỗi JSON
    var jsonData = JSON.stringify(examData);
  
    // Lưu chuỗi JSON vào một tệp hoặc gửi đến máy chủ
    // Ví dụ: lưu vào localStorage
    localStorage.setItem("examPreviewData", jsonData);
    alert("Đề thi đã được lưu!");
    window.location.href = "preview.html";
  }
  
  function deleteQuestion(button) {
    var questionDiv = button.parentNode;
    questionDiv.parentNode.removeChild(questionDiv);
    questionCounter--; // Giảm số câu hỏi khi xóa
  }
  
  function importQuestionsFromExcel() {
    var excelFileInput = document.getElementById("excelFileInput");
    var file = excelFileInput.files[0];
    if (file) {
      var reader = new FileReader();
      reader.onload = function (event) {
        var contents = event.target.result;
        // Parse Excel contents and extract questions
        // Add questions to the question list
        alert("Import thành công!");
      };
      reader.readAsText(file);
    }
  }
  
  function showManageStudents() {
    document.getElementById("manageExamContent").style.display = "none";
    document.getElementById("manageStudentsContent").style.display = "block";
    document.getElementById("statisticsContent").style.display = "none";
  }
  
  // Dữ liệu mẫu về sinh viên
  var students = [
    {
      stt: 1,
      hoTen: "Nguyễn Văn A",
      maSV: "B21DCCN001",
      lop: "D21CQCN01",
      kyThiThamGia: "Giua ky",
      diem: 8.5,
    },
    {
      stt: 2,
      hoTen: "Trần Thị B",
      maSV: "B21DCCN002",
      lop: "D21CQCN02",
      kyThiThamGia: "Cuoi ky",
      diem: 7.8,
    },
    {
      stt: 3,
      hoTen: "Phạm Văn C",
      maSV: "B21DCCN003",
      lop: "D21CQCN03",
      kyThiThamGia: "Luyen tap",
      diem: 9.2,
    },
    // Thêm dữ liệu sinh viên khác ở đây nếu cần
  ];
  
  // Hiển thị dữ liệu mẫu vào bảng sinh viên
  function showStudentList() {
    var tbody = document.querySelector("#studentTable tbody");
    tbody.innerHTML = ""; // Xóa dữ liệu cũ trước khi thêm mới
  
    students.forEach(function (student) {
      var row = `
        <tr>
          <td>${student.stt}</td>
          <td>${student.hoTen}</td>
          <td>${student.maSV}</td>
          <td>${student.lop}</td>
          <td>${student.kyThiThamGia}</td>
          <td>${student.diem}</td>
          <td><button onclick="deleteStudent(${student.stt})">Xóa</button></td>
        </tr>
      `;
      tbody.innerHTML += row;
    });
  }
  
  // Gọi hàm hiển thị danh sách sinh viên khi tải trang
  showStudentList();
  
  // Tìm kiếm sinh viên
  function searchStudent() {
    var input = document.getElementById("searchInput");
    var filter = input.value.toUpperCase();
    var rows = document.querySelectorAll("#studentTable tbody tr");
  
    rows.forEach(function (row) {
      var maSV = row.getElementsByTagName("td")[2]; // Lấy cột chứa mã sinh viên
      if (maSV) {
        var textValue = maSV.textContent || maSV.innerText;
        if (textValue.toUpperCase().indexOf(filter) > -1) {
          row.style.display = "";
        } else {
          row.style.display = "none";
        }
      }
    });
  }
  
  // Hiển thị form thêm sinh viên
  function showAddStudentForm() {
    var form = document.getElementById("addStudentForm");
    form.style.display = "block";
  }
  
  // Ẩn form thêm sinh viên
  function hideAddStudentForm() {
    var form = document.getElementById("addStudentForm");
    form.style.display = "none";
  }
  
  // Thêm sinh viên mới từ form
  document
    .getElementById("studentForm")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Ngăn chặn form submit mặc định
  
      var hoTen = document.getElementById("hoTen").value;
      var maSV = document.getElementById("maSV").value;
      var lop = document.getElementById("lop").value;
      var kyThiThamGia = document.getElementById("kyThiThamGia").value;
      var diem = parseFloat(document.getElementById("diem").value);
  
      var newStudent = {
        stt: students.length + 1,
        hoTen: hoTen,
        maSV: maSV,
        lop: lop,
        kyThiThamGia: kyThiThamGia,
        diem: diem,
      };
  
      students.push(newStudent); // Thêm sinh viên mới vào danh sách
      showStudentList(); // Hiển thị lại danh sách sinh viên
      hideAddStudentForm(); // Ẩn form thêm sinh viên sau khi thêm thành công
    });
  
  // Xóa sinh viên
  function deleteStudent(stt) {
    students = students.filter(function (student) {
      return student.stt !== stt;
    });
    showStudentList();
  }
  
  // Hàm hiển thị trang thống kê
  function showStatistics() {
    document.getElementById("manageExamContent").style.display = "none";
    document.getElementById("manageStudentsContent").style.display = "none";
    document.getElementById("statisticsContent").style.display = "block";
  
    // Gọi hàm để tạo bảng thống kê và các tùy chọn lọc dữ liệu
    createStatisticsTable();
    createFilterOptions();
  }
  
  // Hàm tạo bảng thống kê
  function createStatisticsTable() {
    // Lấy phần tử div chứa bảng thống kê
    var statisticsTableDiv = document.getElementById("statisticsTable");
  
    // Dữ liệu mẫu về kết quả sinh viên tham gia kỳ thi (Fix dữ liệu với frontend)
    var studentResults = [
      { maSV: "SV001", hoTen: "Nguyễn Văn A", kyThiThamGia: "D20", diem: 8.5 },
      { maSV: "SV002", hoTen: "Trần Thị B", kyThiThamGia: "D21", diem: 7.8 },
      { maSV: "SV003", hoTen: "Phạm Văn C", kyThiThamGia: "D20, D22", diem: 9.2 },
      // Thêm dữ liệu sinh viên khác ở đây nếu cần
    ];
  
    // Tạo bảng
    var table = document.createElement("table");
    table.innerHTML = `
      <thead>
        <tr>
          <th>Mã SV</th>
          <th>Họ tên</th>
          <th>Kỳ thi tham gia</th>
          <th>Điểm số</th>
        </tr>
      </thead>
      <tbody>
        <!-- Dữ liệu sinh viên sẽ được thêm ở đây -->
      </tbody>
    `;
  
    // Thêm dữ liệu sinh viên vào bảng
    var tbody = table.querySelector("tbody");
    studentResults.forEach(function(student) {
      var row = `
        <tr>
          <td>${student.maSV}</td>
          <td>${student.hoTen}</td>
          <td>${student.kyThiThamGia}</td>
          <td>${student.diem}</td>
        </tr>
      `;
      tbody.innerHTML += row;
    });
  
    // Thêm bảng vào phần tử div chứa
    statisticsTableDiv.appendChild(table);
  }
  
  // Hàm tạo các tùy chọn lọc dữ liệu
  function createFilterOptions() {
    // Lấy phần tử div chứa các tùy chọn lọc
    var filterOptionsDiv = document.getElementById("filterOptions");
  
    // Tạo các tùy chọn lọc (ví dụ: dropdown list, input)
    // Thêm code tạo các tùy chọn lọc ở đây
  }
  
  // Hàm xuất báo cáo dưới dạng PDF
  function exportToPDF() {
    // Thêm code để xuất báo cáo dưới dạng PDF ở đây
  }
  
  // Hàm xuất báo cáo dưới dạng Excel
  function exportToExcel() {
    // Thêm code để xuất báo cáo dưới dạng Excel ở đây
  }
  