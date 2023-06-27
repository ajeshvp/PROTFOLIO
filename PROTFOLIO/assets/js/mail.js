// Only process POST requests.
if (window.location.href.indexOf("post") > -1 && window.location.href.indexOf("method") > -1) {
    // Get the form fields and remove whitespace.
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    // Check that data was sent to the mailer.
    if (name === "" || subject === "" || message === "" || !validateEmail(email)) {
        // Set a 400 (bad request) response code and exit.
        // You can handle this response code according to your requirements.
        console.log("Please complete the form and try again.");
        return;
    }

    // Set the recipient email address.
    // FIXME: Update this to your desired email address.
    const recipient = "ajesh0608@gmail.com";

    // Set the email subject.
    const emailSubject = subject;

    // Build the email content.
    let emailContent = "Name: " + name + "\n";
    emailContent += "Email: " + email + "\n\n";
    emailContent += "Subject: " + subject + "\n\n";
    emailContent += "Message:\n" + message + "\n";

    // Build the email headers.
    const emailHeaders = "From: " + name + " <" + email + ">";

    // Send the email.
    const xhr = new XMLHttpRequest();
    const url = "https://example.com/sendEmail"; // Replace with your server-side script URL.
    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                // Set a 200 (okay) response code.
                console.log("Thank You! Your message has been sent.");
            } else {
                // Set a 500 (internal server error) response code.
                console.log("Oops! Something went wrong and we couldn't send your message.");
            }
        }
    };
    xhr.send("name=" + encodeURIComponent(name) +
        "&email=" + encodeURIComponent(email) +
        "&subject=" + encodeURIComponent(subject) +
        "&message=" + encodeURIComponent(message));
} else {
    // Not a POST request, handle the error according to your requirements.
    console.log("There was a problem with your submission, please try again.");
}

function validateEmail(email) {
    // Use a regular expression to validate the email format.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}