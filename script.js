// Mock data for exams (you can replace this with actual data)
const exams = ["Exam A", "Exam B", "Exam C"];

// Mock data for statistics (you can replace this with actual data)
const statsData = {
    "Exam A": {
        totalParticipants: 50,
        completionRate: 0.75,
        averageScore: 85,
        scoreDistribution: {
            "A": 20,
            "B": 15,
            "C": 10,
            "D": 5
        }
    },
    "Exam B": {
        totalParticipants: 60,
        completionRate: 0.85,
        averageScore: 78,
        scoreDistribution: {
            "A": 25,
            "B": 20,
            "C": 10,
            "D": 5
        }
    },
    "Exam C": {
        totalParticipants: 40,
        completionRate: 0.65,
        averageScore: 92,
        scoreDistribution: {
            "A": 30,
            "B": 5,
            "C": 3,
            "D": 2
        }
    }
};

// Function to populate exam options
function populateExams() {
    const select = document.getElementById("exam");
    exams.forEach(exam => {
        const option = document.createElement("option");
        option.value = exam;
        option.textContent = exam;
        select.appendChild(option);
    });
}

// Function to update statistics and draw chart
function updateStats() {
    const selectedExam = document.getElementById("exam").value;
    const stats = statsData[selectedExam];
    const statsDiv = document.getElementById("stats");
    const chartCanvas = document.getElementById("chart");

    if (stats) {
        statsDiv.innerHTML = `
            <h2>Statistics for ${selectedExam}</h2>
            <p>Total Participants: ${stats.totalParticipants}</p>
            <p>Completion Rate: ${stats.completionRate * 100}%</p>
            <p>Average Score: ${stats.averageScore}</p>
        `;

        const scoreLabels = Object.keys(stats.scoreDistribution);
        const scoreData = Object.values(stats.scoreDistribution);

        new Chart(chartCanvas, {
            type: 'bar',
            data: {
                labels: scoreLabels,
                datasets: [{
                    label: 'Score Distribution',
                    data: scoreData,
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    } else {
        statsDiv.innerHTML = "<p>No statistics available for the selected exam.</p>";
    }
}

// Populate exams on page load
populateExams();
