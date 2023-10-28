const form = document.querySelector('.form');
const email = document.querySelector("#email");
const country = document.querySelector("#country");
const zipcode = document.querySelector("#zipcode");
const password = document.querySelector("#password");
const passwordError = document.querySelector("#password ~ .error");
const emailError = document.querySelector("#email ~ .error");
const countryError = document.querySelector("#country ~ .error");
const zipcodeError = document.querySelector("#zipcode ~ .error");

form.addEventListener("submit", handleSubmit);
email.addEventListener("input", handleInputEmail);
zipcode.addEventListener("input", checkZIP);
country.addEventListener("input", checkZIP);
country.addEventListener("input", handleInputCountry);
country.addEventListener("focus", handleInputCountry);
password.addEventListener("input", handleInputPassword);

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

  if (country.value === "none") {
    zipcode.className = ""
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

function handleSubmit(e) {
  e.preventDefault();
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
        // its a alphabetic letter, in here we can maybe safely compare letters with toUpperCase()
        if (letter === letter.toUpperCase())
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

