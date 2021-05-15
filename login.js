const form = document.querySelector("form");

form.addEventListener("submit", function(e){
    e.preventDefault();
    let client_obj = {};

    const formData = new FormData(e.target);
    let email = formData.get('email');
    let password = formData.get('password');

    var regex = /\S+@\S+\.\S+/;
    if(regex.test(email) === true){
        client_obj["email"] = email;
        client_obj["password"] = password;
        alert("Logged in succesfully");
    }
    else {
        alert("Email not valid");
    }
});

