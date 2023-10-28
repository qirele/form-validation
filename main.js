const form = document.querySelector('.form');
const email = document.querySelector("#email");
const country = document.querySelector("#country");
const zipcode = document.querySelector("#zipcode");
const emailError = document.querySelector("#email ~ .error");
const countryError = document.querySelector("#country ~ .error");
const zipcodeError = document.querySelector("#zipcode ~ .error");

form.addEventListener("submit", handleSubmit);
email.addEventListener("input", handleInputEmail);
zipcode.addEventListener("input", checkZIP);
country.addEventListener("input", checkZIP);
country.addEventListener("input", handleInputCountry);
country.addEventListener("focus", handleInputCountry);


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

  // on each input on the "zipcode", grab the current select value of "country", and grab the value inside #zipcode
  // on each input on the "country", -----------======-----------

  if (country.value === "none") return;

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