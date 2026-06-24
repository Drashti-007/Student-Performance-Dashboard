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

table.addEventListener('click', function(e){

    if(
      e.target.classList.contains('delete-btn')
    ){
        e.target.closest('tr').remove();
    }

});




// Logout

function logout(){

    alert("Logged Out Successfully");

    window.location.href = "admin.html";

}
async function loadStudents() {

    const response = await fetch('/students');

    const students = await response.json();

    table.innerHTML = '';

    students.forEach(student => {

        let row = document.createElement('tr');

        let percentage =
        (
            student.maths +
            student.physics +
            student.chemistry +
            student.english +
            student.computer_science
        ) / 5;

        let status = percentage >= 35 ? "Pass" : "Fail";

        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.enrollment_no}</td>
            <td>${student.email}</td>
            <td>${percentage.toFixed(2)}%</td>
            <td>${status}</td>
            <td>
                <button class="delete-btn">
                    Delete
                </button>
            </td>
        `;

        table.appendChild(row);
    });
}

loadStudents();