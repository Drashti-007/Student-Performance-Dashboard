document.getElementById("loginForm").addEventListener("submit", async function (e) {

    e.preventDefault();

    const enrollment_no =
        document.getElementById("enrollment_no").value;

    const password =
        document.getElementById("password").value;

    try {

        const response = await fetch("/student/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                enrollment_no: enrollment_no,
                password: password
            })
        });

        const data = await response.json();

        if (response.ok) {

            console.log(data);

            localStorage.setItem(
                "enrollment_no",
                data.enrollment_no
            );

            console.log(
                localStorage.getItem("enrollment_no")
            );

            alert("Login Successful!");

            window.location.href = "/student";

        } else {

            alert(data.message);

        }

    } catch (error) {

        console.error(error);

        alert("Server Error");

    }

});