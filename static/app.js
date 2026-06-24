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