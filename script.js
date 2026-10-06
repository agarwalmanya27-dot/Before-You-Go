function loginUser() {

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();

    let nameError = document.getElementById("nameError");
    let emailError = document.getElementById("emailError");
    let passwordError = document.getElementById("passwordError");

    // Clear old errors
    nameError.innerText = "";
    emailError.innerText = "";
    passwordError.innerText = "";

    // Name validation
    if (name === "") {
        nameError.innerText = "Name is not written.";
        return;
    }

    // Email validation
    if (email === "") {
        emailError.innerText = "Email is not written.";
        return;
    }

    if (!email.includes("@")) {
        emailError.innerText = "Invalid email.";
        return;
    }

    // Password validation
    if (password === "") {
        passwordError.innerText = "Password is not written.";
        return;
    }
      alert("Validation Successful!");

     window.location.href = "index.html";
    // -------------------------------
    // JS VALIDATION COMPLETE
    // Now send data to Flask
    // -------------------------------

   /* fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {

        if (data.success) {
            alert("Login Successful!");
        } else {
            alert(data.message);
        }

    })
    .catch(error => {
        console.error("Error:", error);
        alert("Unable to connect to Flask.");
    });*/
}
