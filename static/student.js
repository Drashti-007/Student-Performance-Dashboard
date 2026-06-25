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

    } catch (error) {

        console.error(error);

        alert(
            "Error loading student data"
        );

    }

}