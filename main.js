const form = document.querySelector('.form');
const errorContainer = document.querySelector(".error-container");
const email = document.querySelector("#email");
const country = document.querySelector("#country");
const zipcode = document.querySelector("#zipcode");
const password = document.querySelector("#password");
const passwordConfirm = document.querySelector("#password-confirm");
const emailError = document.querySelector("#email ~ .error");
const countryError = document.querySelector("#country ~ .error");
const zipcodeError = document.querySelector("#zipcode ~ .error");
const passwordError = document.querySelector("#password ~ .error");
const passwordConfirmError = document.querySelector("#password-confirm ~ .error");

// For each country, defines the pattern that the ZIP has to follow
const constraints = {
  ch: [
    "^(CH-)?\\d{4}$",
    "Switzerland ZIPs must have exactly 4 digits: e.g. CH-1950 or 1950",
  ],
  fr: [
    "^(F-)?\\d{5}$",
    "France ZIPs must have exactly 5 digits: e.g. F-75012 or 75012",
  ],
  de: [
    "^(D-)?\\d{5}$",
    "Germany ZIPs must have exactly 5 digits: e.g. D-12345 or 12345",
  ],
  nl: [
    "^(NL-)?\\d{4}\\s*([A-RT-Z][A-Z]|S[BCE-RT-Z])$",
    "Netherlands ZIPs must have exactly 4 digits, followed by 2 capital letters except SA, SD and SS",
  ],
};


form.addEventListener("submit", handleSubmit);
email.addEventListener("input", handleInputEmail);
email.addEventListener("focusout", handleInputEmail);
zipcode.addEventListener("input", checkZIP);
country.addEventListener("input", checkZIP);
country.addEventListener("input", handleInputCountry);
country.addEventListener("focusout", handleInputCountry);

password.addEventListener("input", handleInputPassword);
password.addEventListener("focusout", handleInputPassword);
password.addEventListener("input", handleInputPasswordConfirm); // these fields are connected so they have to be reactive to each other

passwordConfirm.addEventListener("input", handleInputPasswordConfirm);
passwordConfirm.addEventListener("focusout", handleInputPasswordConfirm);
passwordConfirm.addEventListener("input", handleInputPassword); // these fields are connected so they have to be reactive to each other

function handleInputEmail(e) {
  const emailRegExp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  email.className = "invalid";
  emailError.className = "error active"

  if (email.value.length === 0) {
    emailError.textContent = "Enter an email cuz its required";
  } else if (!emailRegExp.test(email.value)) {
    emailError.textContent = "If you gonna input an email, at least provide a correct one";
  } else {
    email.className = "";
    emailError.className = "error"
    emailError.textContent = "";
  }

}

function checkZIP() {
  if (country.value === "none") {

    if (zipcode.value.length !== 0) {
      zipcode.className = "invalid";
      zipcodeError.className = "error active";
      zipcodeError.textContent = "Select a country before providing zipcode";
      return;
    }
    zipcode.className = "";
    zipcodeError.className = "error";
    zipcodeError.textContent = "";

    return;
  }

  const [constraint, errorMsg] = constraints[country.value];

  const regex = new RegExp(constraint);

  if (regex.test(zipcode.value) || zipcode.value.length === 0) {
    zipcode.className = ""
    zipcodeError.className = "error";
    zipcodeError.textContent = "";
  } else {
    zipcode.className = "invalid"
    zipcodeError.className = "error active";
    zipcodeError.textContent = errorMsg;
  }

}

function handleInputCountry() {
  if (country.value === "none") {
    country.className = "invalid";
    countryError.className = "error active";
    countryError.textContent = "Please provide a country cuz it's flippin required";
  } else {
    country.className = "";
    countryError.className = "error";
    countryError.textContent = "";
  }
}

function handleInputPassword(e) {
  // 8 chars long
  // 1 char is capital letter
  // 1 char is a number
  // 1 char is a special character


  // here comes nested if statements hell

  if (password.value.length < 8) {
    applyPasswordError("Yo password must be at least 8 characters long!")
  } else {
    // ok, its 8 chars long, but does it have a capital letter?

    if (!hasCapitalLetter(password.value)) {
      applyPasswordError("Yo password must contain at least 1 capital letter");
    } else {
      // alright you got your 8 chars and your capital letter, but now input some number you gyatt dang bih

      if (!hasNumber(password.value)) {
        applyPasswordError("Password must contain at least 1 number");
      } else {
        // 8 chars long, capital letter, a number, now input a freaking special char

        if (!hasSpecialChar(password.value)) {
          applyPasswordError("Password must have at least 1 special character");
        } else {
          resetPasswordError();
        }
      }
    }
  }

  function applyPasswordError(msg) {
    password.className = "invalid";
    passwordError.className = "error active";
    passwordError.textContent = msg;
  }

  function resetPasswordError() {
    password.className = "";
    passwordError.className = "error";
    passwordError.textContent = "";
  }

  function hasCapitalLetter(str) {
    for (letter of Array.from(str)) {
      if (!isNaN(letter)) {
        continue;
      } else {
        // its an alphabetic letter and maybe a special character, in here we can maybe safely compare letters with toUpperCase()
        // https://stackoverflow.com/a/9728437
        if (letter === letter.toUpperCase() && letter !== letter.toLowerCase())
          return true;
      }
    }
    return false;
  }

  function hasNumber(str) {
    for (letter of Array.from(str)) {
      if (!isNaN(parseInt(letter))) {
        return true;
      }
    }
    return false;
  }

  function hasSpecialChar(str) {
    const format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return format.test(str);
  }
}

function handleInputPasswordConfirm(e) {
  if (password.value !== passwordConfirm.value || (password.value.length === 0 && passwordConfirm.value.length === 0)) {
    passwordConfirm.className = "invalid";
    passwordConfirmError.className = "error active";
    passwordConfirmError.textContent = "Passwords don't match";
  } else {
    passwordConfirm.className = "";
    passwordConfirmError.className = "error";
    passwordConfirmError.textContent = "";
  }
}

function handleSubmit(e) {
  e.preventDefault();

  while (errorContainer.firstChild) {
    errorContainer.removeChild(errorContainer.firstChild);
  }

  let shouldSubmit = true;

  // check email
  if (email.validity.valueMissing) {
    const p = document.createElement("p");
    p.className = "error active";
    p.textContent = "Forgot the email bud";
    errorContainer.appendChild(p);
    shouldSubmit = false;
  } else if (email.validity.typeMismatch) {
    const p = document.createElement("p");
    p.className = "error active";
    p.textContent = "Provided email is not correct buddy";
    errorContainer.appendChild(p);
    shouldSubmit = false;
  }

  // check country
  if (country.value === "none") {
    const p = document.createElement("p");
    p.className = "error active";
    p.textContent = "Forgot to input country pal?";
    errorContainer.appendChild(p);
    shouldSubmit = false;
  }


  // check zipcode
  if (country.value !== "none") {
    const [constraint, errorMsg] = constraints[country.value];

    const regex = new RegExp(constraint);

    if (!(regex.test(zipcode.value) || zipcode.value.length === 0)) {
      const p = document.createElement("p");
      p.className = "error active";
      p.textContent = errorMsg;
      errorContainer.appendChild(p);
      shouldSubmit = false;
    }
  }

  // check passwords
  if (password.validity.valueMissing || passwordConfirm.validity.valueMissing) {
    const p = document.createElement("p");
    p.className = "error active";
    p.textContent = "Uh huh. So, yeah. You forgot to input password";
    errorContainer.appendChild(p);
    shouldSubmit = false;
  } else {
    if (passwordError.className.indexOf("active") !== -1 || passwordConfirmError.className.indexOf("active") !== -1) {
      const p = document.createElement("p");
      p.className = "error active";
      p.textContent = "Pal, there's summat wrong with your password, check it";
      errorContainer.appendChild(p);
      shouldSubmit = false;
    }
  }

  if (shouldSubmit) {
    const p = document.createElement("p");
    p.className = "success";
    p.textContent = "great success, high five";
    errorContainer.appendChild(p);
  }
}