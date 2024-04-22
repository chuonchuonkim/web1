const examResults = [
    { examId: 'EX001', examName: 'Kỳ thi giữa kỳ I', studentId: 'SV001', studentName: 'Nguyễn Văn Chiến', score: 8.5, status: 'Hoàn thành' },
    { examId: 'EX001', examName: 'Kỳ thi giữa kỳ I', studentId: 'SV002', studentName: 'Trần Thị Hoa', score: 7, status: 'Hoàn thành' },
    { examId: 'EX002', examName: 'Luyện tập', studentId: 'SV003', studentName: 'Phạm Văn Hoàng', score: 6, status: 'Chưa hoàn thành' },
    { examId: 'EX001', examName: 'Kỳ thi giữa kỳ I', studentId: 'SV003', studentName: 'Nguyễn Văn A', score: 8.5, status: 'Hoàn thành' },
    { examId: 'EX002', examName: 'Luyện tập', studentId: 'SV002', studentName: 'Trần Thị Hoa', score: 7, status: 'Hoàn thành' },
    { examId: 'EX002', examName: 'Luyện tập', studentId: 'SV003', studentName: 'Phạm Văn Hoàng', score: 5, status: 'Chưa hoàn thành' },
    { examId: 'EX001', examName: 'Kỳ thi giữa kỳ I', studentId: 'SV004', studentName: 'Nguyễn Văn A', score: 8.5, status: 'Hoàn thành' },
    { examId: 'EX002', examName: 'Luyện tập', studentId: 'SV002', studentName: 'Trần Thị Hoa', score: 7, status: 'Hoàn thành' },
    { examId: 'EX002', examName: 'Luyện tập', studentId: 'SV003', studentName: 'Phạm Văn Hoàng', score: 6, status: 'Hoàn thành' },
    // Thêm dữ liệu các kỳ thi khác ở đây
];
document.addEventListener('DOMContentLoaded', async function () {
    // Dữ liệu mẫu về kết quả của các kỳ thi

    //fetch
    //axios cdn , react,angular,.... package 
    //user => thongke.html =>   
    //server : user => html => user server side render
    //python: flask django 
    //client-side render => user => client js => html vue,react,anglugar
    //react: react hook,
    //node: express, fastapi, nestJS 
    //database: mongodb , mysql 

    const courses = await (await fetch("http://localhost:3000/courses/")).json()
    // courses = courses.map(p => p.toObject())
    // exam = courses
    // console.log('exam')
    // console.log(exam)
    console.log('type: ' + typeof courses);
    console.log({ courses }, courses.data);

    // Check if courses.data is an array
    if (Array.isArray(courses.data)) {
        // Iterate over each element in the array
        for (let i = 0; i < courses.data.length; i++) {
            // Log the properties of each element
            console.log("Name:", courses.data[i].examId, "Age:", courses.data[i].examName);
        }
    } else {
        console.log("courses.data is not an array. Unable to loop through it.");
    }



    // aray_courses = courses.data

    // Hàm hiển thị bảng thống kê tổng hợp
    function displaySummary(courses) {
        var summaryData = document.getElementById('summaryData');
        summaryData.innerHTML = '';
        // Tạo một đối tượng để lưu trữ thông tin thống kê cho mỗi kỳ thi
        var examSummary = {};
        courses.data.forEach(function (result) {
            // Tạo hoặc cập nhật thông tin thống kê cho từng kỳ thi
            if (!examSummary[result.examId]) {
                examSummary[result.examId] = {
                    name: result.examName,
                    totalParticipants: 0,
                    completedCount: 0,
                    totalScore: 0,
                };
            }
            examSummary[result.examId].totalParticipants++;
            if (result.status === 'Hoàn thành') {
                examSummary[result.examId].completedCount++;
            }
            examSummary[result.examId].totalScore += result.score || 0;
        });
        // Hiển thị thông tin thống kê trên bảng
        Object.keys(examSummary).forEach(function (examId) {
            var exam = examSummary[examId];
            console.log(examId)
            var completionRate = (exam.completedCount / exam.totalParticipants) * 100;
            var averageScore = exam.totalScore / exam.totalParticipants;

            var row = summaryData.insertRow();
            row.insertCell(0).textContent = exam.name;
            row.insertCell(1).textContent = exam.totalParticipants;
            row.insertCell(2).textContent = completionRate.toFixed(2) + '%';
            row.insertCell(3).textContent = averageScore.toFixed(2);
        });
    }



    // Hàm tạo biểu đồ phân phối điểm số
    function createScoreDistributionChart(courses) {
        // Tạo một mảng để lưu trữ số lần xuất hiện của từng điểm số từ 0 đến 10
        var scoreDistribution = Array.from({ length: 11 }, () => 0);
        // Đếm số lần xuất hiện của từng điểm số
        courses.data.forEach(function (result) {
            var score = result.score || 0;
            // Đảm bảo điểm số nằm trong khoảng từ 0 đến 10
            score = Math.min(Math.max(score, 0), 10);
            scoreDistribution[Math.floor(score)]++;
        });
        var ctx = document.getElementById('scoreDistributionCanvas').getContext('2d');
        var scoreDistributionChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Array.from({ length: 11 }, (_, i) => i), // Nhãn từ 0 đến 10
                datasets: [{
                    label: 'Số lượng sinh viên',
                    data: scoreDistribution,
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                layout: {
                    padding: {
                        left: 50,
                        right: 50,
                        top: 0,
                        bottom: 0
                    }
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }

    // Hàm tạo biểu đồ tròn cho tỉ lệ hoàn thành của sinh viên trong mỗi kỳ thi
    function createCompletionRatePieCharts(courses) {
        // Tạo một đối tượng để lưu trữ thông tin thống kê cho từng kỳ thi

        // Tạo danh sách các sinh viên và tỉ lệ hoàn thành của họ
        var completedCount = 0;
        var incompletedCount = 0;

        courses.data.forEach(function (result) {
            if (result.status === 'Hoàn thành') {
                completedCount++;
            } else {
                incompletedCount++;
            }
        });

        // Tính tỉ lệ phần trăm
        var total = completedCount + incompletedCount;
        var completedPercentage = (completedCount / total) * 100;
        var incompletedPercentage = (incompletedCount / total) * 100;

        // Vẽ biểu đồ tròn
        var canvas = document.getElementById('myPieChart');
        var ctx2 = canvas.getContext('2d');
        var centerX = canvas.width / 2;
        var centerY = canvas.height / 2;
        var radius = Math.min(canvas.width, canvas.height) / 2;

        ctx2.clearRect(0, 0, canvas.width, canvas.height);

        // Vẽ phần đã hoàn thành
        ctx2.beginPath();
        ctx2.moveTo(centerX, centerY);
        ctx2.arc(centerX, centerY, radius, 0, Math.PI * 2 * (completedPercentage / 100), false);
        ctx2.fillStyle = '#2ecc71'; // Màu xanh lá cây
        ctx2.fill();

        // Vẽ phần chưa hoàn thành
        ctx2.beginPath();
        ctx2.moveTo(centerX, centerY);
        ctx2.arc(centerX, centerY, radius, Math.PI * 2 * (completedPercentage / 100), 0, false);
        ctx2.fillStyle = '#e74c3c'; // Màu đỏ
        ctx2.fill();
        return completedCount;
        // return completedPercentage
    }

    // Gọi các hàm để hiển thị dữ liệu và biểu đồ khi trang được tải
    displaySummary(courses);
    createScoreDistributionChart(courses);

    var completedCount = createCompletionRatePieCharts(courses);
    var completedPercentage = courses.data.length;
    console.log(completedPercentage)

    // Assuming completedPercentage is calculated correctly elsewhere

    // Create main divs
    var desc1 = document.createElement('div');
    desc1.style.display = "flex";

    var desc2 = document.createElement('div');
    desc2.style.display = "flex";
    desc2.style.marginTop = "20px";

    // Create sub-divs for completion and non-completion
    var subDiv1 = document.createElement("div");
    subDiv1.style.backgroundColor = "#e74c3c";
    subDiv1.style.width = "40px";

    var subDiv2 = document.createElement("div");
    subDiv2.style.backgroundColor = "#2ecc71";
    subDiv2.style.width = "40px";

    // Create paragraphs for completion and non-completion percentages
    var paragraph1 = document.createElement("p");
    paragraph1.style.display = "flex";
    paragraph1.textContent = (100 - (completedPercentage / completedCount).toFixed(2).toString()) + "% Hoàn thành";

    var paragraph2 = document.createElement("p");
    paragraph2.textContent = (completedPercentage / completedCount).toFixed(2).toString() + "% Chưa hoàn thành";

    // Append elements
    desc1.appendChild(subDiv1);
    desc1.appendChild(paragraph1);

    desc2.appendChild(subDiv2);
    desc2.appendChild(paragraph2);

    // Append main divs to container
    var container = document.getElementById('descrition');
    container.appendChild(desc1);
    container.appendChild(desc2);



    // Hàm áp dụng bộ lọc

    //  HAMF YAO BANG KHI co tu khoa lua chon
    // // function displaySummaryChoice(choice, courses) {
    //     var summaryData = document.getElementById('summaryData');
    //     summaryData.innerHTML = '';

    //     // Tạo một đối tượng để lưu trữ thông tin thống kê cho mỗi kỳ thi
    //     var examSummary = {};

    //     courses.data.forEach(function (result) {
    //         // Tạo hoặc cập nhật thông tin thống kê cho từng kỳ thi
    //         if (!examSummary[result.examId]) {
    //             examSummary[result.examId] = {
    //                 name: result.examName,
    //                 totalParticipants: 0,
    //                 completedCount: 0,
    //                 totalScore: 0,
    //             };
    //         }

    //         examSummary[result.examId].totalParticipants++;
    //         if (result.status === 'Hoàn thành') {
    //             examSummary[result.examId].completedCount++;
    //         }
    //         examSummary[result.examId].totalScore += result.score || 0;
    //     });


    //     // Hiển thị thông tin thống kê trên bảng cho kết quả đã lọc
    //     Object.keys(examSummary).forEach(function (examId) {
    //         if (examId === choice) {
    //             exam = examSummary[examId]
    //             var completionRate = exam.completedCount ? (exam.completedCount / exam.totalParticipants) * 100 : 0;
    //             var averageScore = exam.totalParticipants ? exam.totalScore / exam.totalParticipants : 0;
    //             var row = summaryData.insertRow();
    //             row.insertCell(0).textContent = exam.name;
    //             row.insertCell(1).textContent = exam.totalParticipants;
    //             row.insertCell(2).textContent = completionRate.toFixed(2) + '%';
    //             row.insertCell(3).textContent = averageScore.toFixed(2);
    //         }

    //     });
    // }

    // // hamf loc 
    // function applyFilters(courses) {
    //     var selectedOption = document.getElementById("examSelect").value;
    //     console.log(selectedOption);

    //     // Thực hiện các hành động tương ứng với giá trị tùy chọn được chọn
    //     switch (selectedOption) {
    //         case "all":
    //             // Thực hiện hành động khi chọn "Tất cả"
    //             displaySummary(courses)
    //             console.log("Chọn Tất cả");
    //             break;
    //         case "practice":
    //             // Thực hiện hành động khi chọn "Luyện tập"
    //             console.log("Chọn Luyện tập");
    //             displaySummaryChoice("EX002", courses);
    //             // createScoreDistributionChart("EX002");
    //             break;
    //         case "midterm1":
    //             // Thực hiện hành động khi chọn "Giữa kì một"
    //             displaySummaryChoice("EX001", courses);
    //             // createScoreDistributionChart("EX001");
    //             console.log("Chọn Giữa kỳ một");
    //             break;
    //         default:
    //             console.log("Không có hành động được xác định cho tùy chọn này");
    //     }
    // }

    // Gọi các hàm để hiển thị dữ liệu và biểu đồ khi trang được tải
});
function applyFilters() {
    var selectedOption = document.getElementById("examSelect").value;
    console.log(selectedOption, );

    // Thực hiện các hành động tương ứng với giá trị tùy chọn được chọn
    switch (selectedOption) {
        case "all":
            // Thực hiện hành động khi chọn "Tất cả"
            console.log("Chọn Tất cả");
            displaySummaryH()
            break;
        case "practice":
            // Thực hiện hành động khi chọn "Luyện tập"
            console.log("Chọn Luyện tập");
            displaySummaryChoice("EX002");
            // createScoreDistributionChart("EX002");
            break;
        case "midterm1":
            // Thực hiện hành động khi chọn "Giữa kì một"
            displaySummaryChoice("EX001");
            // createScoreDistributionChart("EX001");
            console.log("Chọn Giữa kỳ một");
            break;
        case "completed":
            // Thực hiện hành động khi chọn "Đã hoàn thành"
            console.log("Chọn Đã hoàn thành");
            break;
        default:
            console.log("Không có hành động được xác định cho tùy chọn này");
    }
}
async function displaySummaryChoice(choice,exam) {
    var summaryData = document.getElementById('summaryData');
    summaryData.innerHTML = '';
    const courses = await (await fetch("http://localhost:3000/courses/")).json()
    // Tạo một đối tượng để lưu trữ thông tin thống kê cho mỗi kỳ thi
    var examSummary = {};

    courses.data.forEach(function (result) {
        // Tạo hoặc cập nhật thông tin thống kê cho từng kỳ thi
        if (!examSummary[result.examId]) {
            examSummary[result.examId] = {
                name: result.examName,
                totalParticipants: 0,
                completedCount: 0,
                totalScore: 0,
            };
        }

        examSummary[result.examId].totalParticipants++;
        if (result.status === 'Hoàn thành') {
            examSummary[result.examId].completedCount++;
        }
        examSummary[result.examId].totalScore += result.score || 0;
    });


    // Hiển thị thông tin thống kê trên bảng cho kết quả đã lọc
    Object.keys(examSummary).forEach(function (examId) {
        if (examId === choice) {
            exam = examSummary[examId]
            var completionRate = exam.completedCount ? (exam.completedCount / exam.totalParticipants) * 100 : 0;
            var averageScore = exam.totalParticipants ? exam.totalScore / exam.totalParticipants : 0;
            var row = summaryData.insertRow();
            row.insertCell(0).textContent = exam.name;
            row.insertCell(1).textContent = exam.totalParticipants;
            row.insertCell(2).textContent = completionRate.toFixed(2) + '%';
            row.insertCell(3).textContent = averageScore.toFixed(2);
        }

    });
}

async function displaySummaryH() {
    const courses = await (await fetch("http://localhost:3000/courses/")).json()
    var summaryData = document.getElementById('summaryData');
    summaryData.innerHTML = '';
    // Tạo một đối tượng để lưu trữ thông tin thống kê cho mỗi kỳ thi
    var examSummary = {};
    courses.data.forEach(function (result) {
        // Tạo hoặc cập nhật thông tin thống kê cho từng kỳ thi
        if (!examSummary[result.examId]) {
            examSummary[result.examId] = {
                name: result.examName,
                totalParticipants: 0,
                completedCount: 0,
                totalScore: 0,
            };
        }
        examSummary[result.examId].totalParticipants++;
        if (result.status === 'Hoàn thành') {
            examSummary[result.examId].completedCount++;
        }
        examSummary[result.examId].totalScore += result.score || 0;
    });
    // Hiển thị thông tin thống kê trên bảng
    Object.keys(examSummary).forEach(function (examId) {
        var exam = examSummary[examId];
        console.log(examId)
        var completionRate = (exam.completedCount / exam.totalParticipants) * 100;
        var averageScore = exam.totalScore / exam.totalParticipants;

        var row = summaryData.insertRow();
        row.insertCell(0).textContent = exam.name;
        row.insertCell(1).textContent = exam.totalParticipants;
        row.insertCell(2).textContent = completionRate.toFixed(2) + '%';
        row.insertCell(3).textContent = averageScore.toFixed(2);
    });
}

function exportToPDF() {
    window.print();
}










// function createScoreDistributionChart(choice) {
//     // Lập danh sách điểm số từ kết quả của tất cả các kỳ thi
//     var existingCanvas = document.getElementById('scoreDistributionCanvas');
//     if (existingCanvas) {
//         existingCanvas.parentNode.removeChild(existingCanvas);
//     }

//     // Create a new canvas element for the chart
//     var canvas = document.createElement('canvas');
//     canvas.id = 'scoreDistributionCanvas';

//     // Insert the new canvas element into the DOM
//     var div = document.getElementById('scoreDistributionChart');
//     div.appendChild(canvas);

//     console.log(choice)
//     var filteredResults = examResults.filter(function (result) {
//         console.log("abc " + result.examId)
//         return result.examId === choice;
//     });

//     // Check if filteredResults is empty
//     if (filteredResults.length === 0) {
//         console.log("No results found for examId:", choice);
//         return; // Exit the function if no results are found
//     }

//     var scores = filteredResults.map(function (result) {
//         return result.score || 0;
//     });

//     var ctx = document.getElementById('scoreDistributionCanvas').getContext('2d');
//     var scoreDistributionChart = new Chart(ctx, {
//         type: 'bar',
//         data: {
//             labels: scores.map(function (_, index) {
//                 return 'student' + (index + 1);
//             }),
//             datasets: [{
//                 label: 'Scores',
//                 data: scores,
//                 backgroundColor: 'rgba(54, 162, 235, 0.5)',
//                 borderColor: 'rgba(54, 162, 235, 1)',
//                 borderWidth: 1
//             }]
//         },
//         options: {
//             scales: {
//                 yAxes: {
//                     ticks: {
//                         beginAtZero: true
//                     }
//                 }
//             }
//         }
//     });
// }


