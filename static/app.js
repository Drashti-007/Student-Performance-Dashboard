function showSection(sectionId){

let sections = document.querySelectorAll('.content');

sections.forEach(section => {
section.classList.remove('active');
});

document.getElementById(sectionId).classList.add('active');

}
function logout() {
    alert("Logged Out Successfully");
    window.location.href = "login.html";
}

const enrollmentNo =
    localStorage.getItem("enrollment_no");

async function loadStudentData() {

    if (!enrollmentNo) {

        alert("Please login first");

        window.location.href = "/login";

        return;
    }

    const response = await fetch(
        `/student/dashboard/${enrollmentNo}`
    );

    const data = await response.json();

    console.log(data);

    document.getElementById("welcomeName")
        .innerText = `Welcome ${data.name} 👋`;

    document.getElementById("studentEmail")
        .innerText = data.email;

    document.getElementById("studentPercentage")
        .innerText =
            data.average_score.toFixed(2) + "%";

    let status = "Pass";

    const marks = data.marks;

    if (
        marks.maths < 37 ||
        marks.physics < 37 ||
        marks.chemistry < 37 ||
        marks.english < 37 ||
        marks.computer_science < 37
    ) {
        status = "Fail";
    }

    document.getElementById("studentStatus")
        .innerText = status;
}

loadStudentData();