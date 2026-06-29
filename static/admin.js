function showSection(sectionId){

    let sections =
    document.querySelectorAll('.content');

    sections.forEach(section=>{
        section.classList.remove('active');
    });

    document.getElementById(sectionId)
    .classList.add('active');
}


// Add Student

const form =
document.getElementById('studentForm');

const table =
document.getElementById('studentTable');

form.addEventListener("submit", async function(e){

    e.preventDefault();

    const studentData = {

        id: Date.now(),

        enrollment_no: document.getElementById("enrollment_no").value,

        name: document.getElementById("name").value,

        password: document.getElementById("password").value,

        email: document.getElementById("email").value,

        class_name: document.getElementById("class_name").value,

        mobile: document.getElementById("mobile").value,

        maths: parseInt(document.getElementById("maths").value),

        physics: parseInt(document.getElementById("physics").value),

        chemistry: parseInt(document.getElementById("chemistry").value),

        english: parseInt(document.getElementById("english").value),

        computer_science: parseInt(document.getElementById("computer_science").value),

        attendance_maths: parseInt(document.getElementById("attendance_maths").value),

        attendance_physics: parseInt(document.getElementById("attendance_physics").value),

        attendance_chemistry: parseInt(document.getElementById("attendance_chemistry").value),

        attendance_english: parseInt(document.getElementById("attendance_english").value),

        attendance_cs: parseInt(document.getElementById("attendance_cs").value)
    };

    const response = await fetch("/students", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(studentData)

    });

    const data = await response.json();

    alert(data.message);

    


    form.reset();
    loadStudents();

});


// Delete Student

table.addEventListener('click', async function(e){

    if(e.target.classList.contains('delete-btn')){

        const id = e.target.dataset.id;

        const response = await fetch(`/students/${id}`, {
            method: "DELETE"
        });

        const data = await response.json();

        alert(data.message);

        loadStudents();
    }

});




// Logout

function logout(){

    alert("Logged Out Successfully");

    window.location.href = "/admin";

}
async function loadStudents() {

    const response = await fetch('/students');

    const students = await response.json();

    table.innerHTML = '';

    students.forEach(student => {

        let row = document.createElement('tr');
        let status = "Pass";

        if (
            student.maths < 37 ||
            student.physics < 37 ||
            student.chemistry < 37 ||
            student.english < 37 ||
            student.computer_science < 37
        ) {
            status = "Fail";
        }

        let percentage =
        (
            student.maths +
            student.physics +
            student.chemistry +
            student.english +
            student.computer_science
        ) / 5;

        
       row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.enrollment_no}</td>
            <td>${student.email}</td>
            <td>${percentage.toFixed(2)}%</td>
            <td>${status}</td>
            <td>
                <button class="delete-btn" data-id="${student.id}">
                    Delete
                </button>
            </td>
        `;
        table.appendChild(row);
    });
}
async function loadAnalytics() {

    const response =
        await fetch("/admin/analytics");

    const analytics =
        await response.json();

    document.getElementById(
        "averageMarks"
    ).innerText =
        analytics.average_marks.toFixed(2) + "%";

    document.getElementById(
        "passStudents"
    ).innerText =
        analytics.pass_students;

    document.getElementById(
        "failStudents"
    ).innerText =
        analytics.fail_students;

    document.getElementById(
        "totalStudents"
    ).innerText =
        analytics.total_students;
}
loadStudents();
loadAnalytics();