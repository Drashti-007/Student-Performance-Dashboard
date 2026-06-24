document.getElementById("adminLoginForm")
.addEventListener("submit", async function(e){

    e.preventDefault();

    const username =
        document.getElementById("username").value;

    const password =
        document.getElementById("password").value;

    try {

        const response = await fetch(
            "/admin/login",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    username,
                    password
                })
            }
        );

        const data = await response.json();

        if(response.ok){

            alert("Admin Login Successful");

            // change later
            window.location.href = "/admin-dashboard";

        } else {

            alert(data.message);

        }

    } catch(error){

        console.error(error);

        alert("Server Error");

    }

});