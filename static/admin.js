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

form.addEventListener('submit', function(e){

    e.preventDefault();

    let name =
    document.getElementById('studentName').value;

    let id =
    document.getElementById('studentId').value;

    let email =
    document.getElementById('studentEmail').value;

    let marks =
    document.getElementById('studentMarks').value;
    let status;

    if (marks < 33) {
        status = "Fail";
    } else {
        status = "Pass";
    }


    let row =
    document.createElement('tr');

    row.innerHTML = `
        <td>${name}</td>
        <td>${id}</td>
        <td>${email}</td>
        <td>${marks}</td>
        <td>${status}</td>
            <button class="delete-btn">
                Delete
            </button>
        </td>
    `;

    table.appendChild(row);

    form.reset();

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