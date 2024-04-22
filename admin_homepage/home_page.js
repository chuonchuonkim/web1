// tìm kiếm theo tên
document.getElementById('searchInput').addEventListener('input', function() {
    var filter = this.value.toLowerCase();
    var examItems = document.getElementsByClassName('exam-item');

    Array.from(examItems).forEach(function(item) {
        var examName = item.textContent.toLowerCase();
        if (examName.indexOf(filter) > -1) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
});

// hiển thị thông tin người dùng
var profileIcon = document.getElementById('profile-icon');
var profileInfo = document.getElementById('profile-info');
var person = document.getElementById('person');

// Bắt sự kiện khi click vào icon
profileIcon.addEventListener('click', function(event) {
    // Nếu khung thông tin đang ẩn, hiển thị. Nếu đang hiển thị, ẩn đi.
    if (profileInfo.style.display === 'none') {
        profileInfo.style.display = 'block';
    } else {
        profileInfo.style.display = 'none';
    }
    // Ngăn sự kiện click được lan truyền lên các phần tử cha khác
    event.stopPropagation();
});

// Bắt sự kiện khi click ra ngoài icon và khung thông tin người dùng
document.addEventListener('click', function(event) {
    var isClickInside = person.contains(event.target);
    if (!isClickInside) {
        profileInfo.style.display = 'none';
    }
});

var bell = document.getElementById('bell');
var announcement = document.getElementById('announcement');
bell.addEventListener('click',function(event){
    if (announcement.style.display === 'none') {
        announcement.style.display = 'block';
    } else {
        announcement.style.display = 'none';
    }
    event.stopPropagation();
});
document.addEventListener('click', function(event) {
    var isClickInside = bell.contains(event.target);
    if (!isClickInside) {
        announcement.style.display = 'none';
    }
});
// tìm kiếm theo trạng thái 
function filterExams() {
    var selectedStatus = document.getElementById("filterSelect").value;
    var exams = document.getElementsByClassName("exam-item");

    for (var i = 0; i < exams.length; i++) {
        var examItem = exams[i];

        if (selectedStatus === "all") {
            examItem.style.display = "block"; // Hiển thị tất cả các kỳ thi
        } else if (selectedStatus === "free-access" && examItem.classList.contains("free-access")) {
            examItem.style.display = "block"; // Hiển thị các kỳ thi có thể truy cập tự do
        } else if (selectedStatus === "time-bound" && examItem.classList.contains("time-bound")) {
            examItem.style.display = "block"; // Hiển thị các kỳ thi có yêu cầu thời gian cụ thể
        } else {
            examItem.style.display = "none"; // Ẩn các kỳ thi không phù hợp với trạng thái được chọn
        }
    }
}
