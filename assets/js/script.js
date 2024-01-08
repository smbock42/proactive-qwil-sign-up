const submitBtn = document.querySelector(".submit-btn"),
	phone = document.querySelector("#phone"),
	password = document.querySelector("#user-password"),
	passwordConfirm = document.querySelector("#user-password-confirm"),
	email = document.querySelector("#mail"),
	errorDisplayers = document.getElementsByClassName("error"),
	inputFields = document.querySelectorAll("input"),
	cardContainer = document.querySelector(".card-container"),
	outroOverlay = document.querySelector(".outro-overlay");

let count = 2;

function onValidation(current, messageString, booleanTest) {
	let message = current;
	message.textContent = messageString;
	booleanTest != 0 ? ++count : count;
}

for (let i = 0; i < inputFields.length; i++) {
	let currentInputField = inputFields[i];
	let currentErrorDisplayer = errorDisplayers[i];

	currentInputField.addEventListener("keyup", (e) => {
		let message = currentErrorDisplayer;
		e.target.value != ""
			? onValidation(currentErrorDisplayer, "", 0)
			: onValidation(currentErrorDisplayer, "*This field is Required", 0);
	});
}

phone.addEventListener("keyup", (e) => {
	let message = errorDisplayers[3];
	e.target.value == e.target.value.replace(/\D/g, "")
		? onValidation(message, "", 1)
		: onValidation(message, "*Please enter valid number", 0);
});

email.addEventListener("keyup", (e) => {
	let message = errorDisplayers[2];
	mail.value.includes("@") & mail.value.includes(".com")
		? onValidation(message, "", 1)
		: onValidation(message, "*Please provide a valid Email", 0);
});

password.addEventListener("keyup", (e) => {
	let message = errorDisplayers[4];
	password.value.length >= 8
		? onValidation(message, "", 1)
		: onValidation(message, "Password requires minimum 8 charecters", 0);
});

passwordConfirm.addEventListener("keyup", (e) => {
	let message = errorDisplayers[5];
	password.value === e.target.value
		? onValidation(message, "", 1)
		: onValidation(message, "*Password did not match", 0);
});

submitBtn.addEventListener("click", (e) => {
	e.preventDefault();

	if (count > 5) {
		cardContainer.style.display = "none";
		outroOverlay.classList.remove("disabled");
	} else {
		for (let i = 0; i < errorDisplayers.length; i++) {
			errorDisplayers[i].textContent = "*This field is Required";
		}
	}


    const formData = {
        phone: phone.value,
        password: password.value,
        passwordConfirm: passwordConfirm.value,
        email: email.value,
    };

	var myHeaders = new Headers();
	myHeaders.append("X-SYS-API-KEY-SECRET", process.env.X_SYS_API_KEY_SECRET);
	myHeaders.append("X-SYS-API-KEY", process.env.X_SYS_API_KEY);
	myHeaders.append("Content-Type", "application/json");

	console.log(myHeaders);

    // Convert formData to a JSON string
    const jsonData = JSON.stringify(formData);

    // Make a POST request to your PHP script
    fetch('assets/php/api-proxy.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonData
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
});

