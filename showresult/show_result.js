// Danh sách mẫu về sinh viên và kết quả thi (có thể thay thế bằng dữ liệu thực tế từ cơ sở dữ liệu)
var students = [
    { id: 'B21DCCN111', name: "Nguyễn Văn Chiến",},
    { id: 'B21DCCN131', name: "Trần Thị Chang",},
    { id: 'B21DCCN241', name: "Phạm Văn Đông",},
    { id: 'B21DCCN141', name: "Lê Thị Dung",},
    { id: 'B21DCCN145', name: "Hoàng Văn Quân",}
];

var searchData = []; // Khai báo và khởi tạo mảng searchData để lưu trữ dữ liệu của kỳ thi

// Hàm tìm kiếm sinh viên và hiển thị kết quả tìm kiếm
function searchStudents() {
    var searchInput = document.getElementById('searchInput').value.trim().toLowerCase();
    searchData = [];

    if (searchInput === ""){
        alert("Vui lòng nhập thông tin sinh viên cần tìm.");
        return;
    }

    var filteredStudents = students.filter(function(student) {
        return student.id.toString().toLowerCase().includes(searchInput) || student.name.toLowerCase().includes(searchInput);
    });

    if (filteredStudents.length === 0) {
        alert("Không tìm thấy sinh viên nào.");
        return;
    } else {
        filteredStudents.forEach(function(student) {
            searchData.push(student);
        });
        displaySearchData(); // Gọi hàm để hiển thị dữ liệu kết quả thi sau khi tìm kiếm
    }
}

// Hàm hiển thị dữ liệu kết quả thi trong bảng
function displaySearchData() {
    var searchTableBody = document.getElementById('searchData');
    searchTableBody.innerHTML = ''; // Xóa dữ liệu cũ trong bảng trước khi hiển thị dữ liệu mới

    // Hiển thị hoặc ẩn bảng tùy thuộc vào có dữ liệu hay không
    var searchTable = document.getElementById('searchTable');
    searchTable.style.display = searchData.length > 0 ? 'table' : 'none';
    var examTable = document.getElementById('examTable');
    examTable.style.display = 'none';
    
    searchData.forEach(function(student) {
        var row = searchTableBody.insertRow();
        row.insertCell(0).textContent = student.id;
        row.insertCell(1).textContent = student.name;
        var viewDetailCell = row.insertCell(2);
        var viewDetailButton = document.createElement('button');
        viewDetailButton.textContent = 'Xem chi tiết';
        viewDetailButton.onclick = function() {
            displayExamData(student.id);
        };
        viewDetailCell.appendChild(viewDetailButton);
    });
}

// Danh sách dữ liệu kỳ thi của các học sinh
var examData = [
    { id: 'B21DCCN111', name: 'Kiểm tra giữa kỳ I, lập trình web', score: 8.0, status: 'Hoàn thành', time: '2024-02-28 10:00', link: "../example/example.html"},
    { id: 'B21DCCN131', name: 'Kiểm tra giữa kỳ I, nhập môn công nghệ phần mềm', score: 7.5, status: 'Hoàn thành', time: '2024-02-28 11:00', link: "../example/example.html" },
    { id: 'B21DCCN111', name: 'Kiểm tra giữa kỳ I, cơ sở dữ liệu phân tán', score: null, status: 'Chưa hoàn thành', time: '2024-02-28 12:00', link: "../example/example.html" },
    { id: 'B21DCCN241', name: 'Kiểm tra giữa kỳ I, lập trình web', score: 8.5, status: 'Hoàn thành', time: '2024-02-28 09:00', link: "../example/example.html" },
    { id: 'B21DCCN241', name: 'Kiểm tra giữa kỳ I, nhập môn công nghệ phần mềm', score: 7.0, status: 'Hoàn thành', time: '2024-02-28 10:30', link: "../example/example.html" },
    { id: 'B21DCCN241', name: 'Kiểm tra giữa kỳ I, cơ sở dữ liệu phân tán', score: 9.5, status: 'Hoàn thành', time: '2024-02-28 13:00', link: "../example/example.html" },
    { id: 'B21DCCN145', name: 'Kiểm tra giữa kỳ I, lập trình web', score: null, status: 'Chưa hoàn thành', time: '2024-02-28 08:00', link: "../example/example.html" },
    { id: 'B21DCCN141', name: 'Kiểm tra giữa kỳ I, nhập môn công nghệ phần mềm', score: null, status: 'Chưa hoàn thành', time: '2024-02-28 10:00', link: "../example/example.html" },
    { id: 'B21DCCN145', name: 'Kiểm tra giữa kỳ I, cơ sở dữ liệu phân tán', score: null, status: 'Chưa hoàn thành', time: '2024-02-28 12:00', link: "../example/example.html" }
];

// Hàm hiển thị dữ liệu kết quả thi trong bảng
function displayExamData(id) {
    var examTableBody = document.getElementById('examData');
    examTableBody.innerHTML = ''; // Xóa dữ liệu cũ trong bảng trước khi hiển thị dữ liệu mới
    
    // Hiển thị hoặc ẩn bảng tùy thuộc vào có dữ liệu hay không
    var examTable = document.getElementById('examTable');
    examTable.style.display = examData.length > 0 ? 'table' : 'none';
    examData.forEach(function(exam) {
        if (exam.id === id){
            var row = examTableBody.insertRow();
            row.insertCell(0).textContent = exam.name;
            row.insertCell(1).textContent = exam.status;
            row.insertCell(2).textContent = exam.score;
            row.insertCell(3).textContent = exam.time;
            var viewDetailCell = row.insertCell(4);
            var viewDetailButton = document.createElement('button');
            viewDetailButton.textContent = 'Xem chi tiết';
            viewDetailButton.onclick = function() {
                window.location.href = exam.link;
            };
            viewDetailCell.appendChild(viewDetailButton);
        }
    });
}
