$(document.body).on("submit", "#signup_form", function () {
    console.log("in js");
    window.location = "http://localhost:8080/login";
});