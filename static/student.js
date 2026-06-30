function showSection(sectionId) {

    let sections =
        document.querySelectorAll(".content");

    sections.forEach(section => {
        section.classList.remove("active");
    });

    document
        .getElementById(sectionId)
        .classList.add("active");
}

function logout() {

    localStorage.removeItem(
        "enrollment_no"
    );

    alert("Logged Out Successfully");

    window.location.href = "/login";
}
document.addEventListener(
    "DOMContentLoaded",
    loadStudentData
);



async function loadStudentData() {

    try {

        const enrollment_no =
            localStorage.getItem(
                "enrollment_no"
            );

        console.log(
            "Enrollment No:",
            enrollment_no
        );

        if (!enrollment_no) {

            alert("Please login first");

            window.location.href =
                "login.html";

            return;
        }

        // Profile API

        const profileResponse =
            await fetch(
                `/student/profile/${enrollment_no}`
            );

        const profile =
            await profileResponse.json();

        console.log(
            "Profile:",
            profile
        );

        // Dashboard API

        const dashboardResponse =
            await fetch(
                `/student/dashboard/${enrollment_no}`
            );

        const dashboard =
            await dashboardResponse.json();

        console.log(
            "Dashboard:",
            dashboard
        );
        // Attendance API

        const attendanceResponse =
        await fetch(
            `/student/attendance/${enrollment_no}`
        );

       

        const attendance =
        await attendanceResponse.json();

        console.log(attendance);

        let attendanceHTML = "";

        Object.entries(
            attendance.attendance
        ).forEach(([subject, percent]) => {

            attendanceHTML += `
            <tr>
                <td>${subject}</td>
                <td>${percent}%</td>
            </tr>
            `;
        });

       

        document.getElementById(
            "attendanceTable"
        ).innerHTML = attendanceHTML;

        // Performance API

        const performanceResponse =
        await fetch(`/student/performance/${enrollment_no}`);

        const performanceData =
        await performanceResponse.json();

        document.getElementById(
            "englishMarks"
        ).innerText =
        performanceData.marks.english + " Marks";

        document.getElementById(
            "physicsMarks"
        ).innerText =
        performanceData.marks.physics + " Marks";

        document.getElementById(
            "chemistryMarks"
        ).innerText =
        performanceData.marks.chemistry + " Marks";

        document.getElementById(
            "mathsMarks"
        ).innerText =
        performanceData.marks.maths + " Marks";

        document.getElementById(
            "computerScienceMarks"
        ).innerText =
        performanceData.marks.computer_science + " Marks";
        // Home Section

        document.getElementById(
            "welcomeName"
        ).innerText =
            `Welcome ${profile.name} 👋`;

        document.getElementById(
            "homeEmail"
        ).innerText =
            profile.email;

        // Profile Section

        document.getElementById(
            "profileName"
        ).innerText =
            profile.name;

        document.getElementById(
            "studentName"
        ).innerText =
            profile.name;

        document.getElementById(
            "enrollmentNo"
        ).innerText =
            profile.enrollment_no;

        document.getElementById(
            "profileEmail"
        ).innerText =
            profile.email;

        document.getElementById(
            "className"
        ).innerText =
            profile.class_name;

        document.getElementById(
            "mobile"
        ).innerText =
            profile.mobile;

        // Percentage

        let percentage =
            dashboard.average_score;

        document.getElementById(
            "percentage"
        ).innerText =
            percentage.toFixed(2) + "%";

        // Status

        let status = "Pass";

        Object.values(
            dashboard.marks
        ).forEach(mark => {

            if (mark < 37) {

                status = "Fail";

            }

        });

        document.getElementById(
            "status"
        ).innerText =
            status;
        // Report API

        const reportResponse =
        await fetch(`/student/report/${enrollment_no}`);

        const report =
        await reportResponse.json();
        const marks = report.performance.marks;

        const total =
            marks.maths +
            marks.physics +
            marks.chemistry +
            marks.english +
            marks.computer_science;

        document.getElementById(
            "totalMarks"
        ).innerText = total;

        document.getElementById(
            "reportPercentage"
        ).innerText =
        report.performance.average_marks.toFixed(2) + "%";

        document.getElementById(
            "reportResult"
        ).innerText =
        report.performance.status;

        new Chart(
            document.getElementById("marksChart"),
            {
                type: "bar",

                data: {

                    labels: [
                        "Maths",
                        "Physics",
                        "Chemistry",
                        "English",
                        "CS"
                    ],

                    datasets: [{

                        label: "Marks",

                        data: [

                            marks.maths,
                            marks.physics,
                            marks.chemistry,
                            marks.english,
                            marks.computer_science

                        ]

                    }]
                },

                options: {

                    responsive: true,

                    plugins: {

                        legend: {
                            display: false
                        }

                    }

                }
            }
        );

        let passCount = 0;
        let failCount = 0;

        Object.values(marks).forEach(mark=>{

            if(mark >= 37){

                passCount++;

            }

            else{

                failCount++;

            }

        });

        new Chart(
            document.getElementById("resultPieChart"),
            {

                type:"pie",

                data:{

                    labels:[
                        "Pass Subjects",
                        "Fail Subjects"
                    ],

                    datasets:[{

                        data:[
                            passCount,
                            failCount
                        ]

                    }]

                }

            }
        );

    } catch (error) {

        console.error(error);

        alert(
            "Error loading student data"
        );

    }

}