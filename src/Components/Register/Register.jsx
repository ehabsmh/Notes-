import React, { useState } from "react";
import Joi from "joi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Register() {
  let navigate = useNavigate();
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    age: 0,
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [fNameError, setFNameError] = useState("");
  const [lNameError, setLNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState([
    "password must contain at least 1 letter",
    "and 4 numbers at least",
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const getUser = function (e) {
    let newUser = { ...user };
    newUser[e.target.name] = e.target.value;
    setUser(newUser);
  };

  const formSubmit = async function (e) {
    e.preventDefault();
    setIsLoading(true);
    let fNameValidate = firstNameValidation();
    let lNameValidate = lastNameValidation();
    let emailValidate = emailValidation();
    let passwordValidate = passwordValidation();
    // console.log(fNameValidate, lNameValidate, emailValidate, passwordValidate);
    if (
      !fNameValidate.error &&
      !lNameValidate.error &&
      !emailValidate.error &&
      !passwordValidate.error
    ) {
      let { data } = await axios.post(
        "https://route-egypt-api.herokuapp.com/signup",
        user
      );

      if (data.message === "success") {
        setIsLoading(false);
        navigate("/login");
      } else {
        let errorText = data.message;
        let newArray = errorText.split(" ");
        let newestArray = newArray.slice(4);
        newestArray = newestArray.join(" ");
        setErrorMsg(newestArray);
        console.log(newestArray);
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  };

  function firstNameValidation() {
    const schema = Joi.object({
      first_name: Joi.string().alphanum().min(3).max(20).required(),
    }).extract("first_name");
    let result = schema.validate(user.first_name);
    if (!result.error) {
      document
        .getElementById("first_name")
        .classList.replace("is-invalid", "is-valid");
      document
        .getElementById("fNameValidationMsg")
        .classList.replace("d-block", "d-none");
      return schema.validate(user.first_name);
    } else {
      document.getElementById("first_name").classList.add("is-invalid");
      document
        .getElementById("fNameValidationMsg")
        .classList.replace("d-none", "d-block");
      setFNameError("length must be at least 3 characters long");
      return schema.validate(user.first_name);
    }
  }

  function lastNameValidation() {
    const schema = Joi.object({
      last_name: Joi.string().alphanum().min(3).max(20).required(),
    }).extract("last_name");
    let result = schema.validate(user.last_name);
    if (!result.error) {
      document
        .getElementById("last_name")
        .classList.replace("is-invalid", "is-valid");
      document
        .getElementById("lNameValidationMsg")
        .classList.replace("d-block", "d-none");
      return schema.validate(user.last_name);
    } else {
      document.getElementById("last_name").classList.add("is-invalid");
      document
        .getElementById("lNameValidationMsg")
        .classList.replace("d-none", "d-block");

      setLNameError("length must be at least 3 characters long");
      return schema.validate(user.last_name);
    }
  }

  function emailValidation() {
    const schema = Joi.object({
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: false,
        })
        .required(),
    }).extract("email");
    let result = schema.validate(user.email);
    if (!result.error) {
      document
        .getElementById("email")
        .classList.replace("is-invalid", "is-valid");
      document
        .getElementById("emailValidationMsg")
        .classList.replace("d-block", "d-none");
      return schema.validate(user.email);
    } else {
      document.getElementById("email").classList.add("is-invalid");
      document
        .getElementById("emailValidationMsg")
        .classList.replace("d-none", "d-block");
      setEmailError("Example: johndoe@example.com");
      return schema.validate(user.email);
    }
  }

  function passwordValidation() {
    const schema = Joi.object({
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z][0-9]{3,10}"))
        .required(),
    }).extract("password");
    let result = schema.validate(user.password);
    if (!result.error) {
      document
        .getElementById("password")
        .classList.replace("is-invalid", "is-valid");
      document
        .getElementById("passwordValidationMsg")
        .classList.replace("d-block", "d-none");
      return schema.validate(user.password);
    } else {
      document.getElementById("password").classList.add("is-invalid");
      document
        .getElementById("passwordValidationMsg")
        .classList.replace("d-none", "d-block");

      setPasswordError(passwordError);
      return schema.validate(user.password);
    }
  }

  return (
    <section id="register" className="w-50 ">
      <div className="position-absolute w-50 translate-middle start-50 top-50">
        <h1 className="mb-4">Register Now!</h1>

        {errorMsg ? <div className="alert alert-danger">{errorMsg}</div> : ""}
        <form action="" className="h-100" onSubmit={formSubmit}>
          <div className="row d-flex  align-items-center justify-content-center">
            <div className="col-md-6 mb-3">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control rounded-1"
                  placeholder="Enter First Name"
                  id="first_name"
                  name="first_name"
                  onChange={getUser}
                  onInput={firstNameValidation}
                />
                <div
                  className="alert alert-danger d-none"
                  id="fNameValidationMsg"
                >
                  {fNameError}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <input
                type="text"
                className="form-control rounded-1"
                placeholder="Enter Last Name"
                id="last_name"
                name="last_name"
                onChange={getUser}
                onInput={lastNameValidation}
              />
              <div
                className="alert alert-danger d-none"
                id="lNameValidationMsg"
              >
                {lNameError}
              </div>
            </div>
            <div className="col-md-12 mb-3">
              <input
                type="email"
                className="form-control rounded-1"
                placeholder="Enter Your Email"
                id="email"
                name="email"
                onChange={getUser}
                onInput={emailValidation}
              />
              <div
                className="alert alert-danger d-none"
                id="emailValidationMsg"
              >
                {emailError}
              </div>
            </div>
            <div className="col-md-12 mb-3">
              <input
                type="number"
                className="form-control rounded-1"
                placeholder="Enter Your Age"
                id="age"
                name="age"
                onChange={getUser}
              />
            </div>
            <div className="col-md-12 mb-3 ">
              <input
                type="password"
                className="form-control rounded-1"
                placeholder="Enter Password"
                id="password"
                name="password"
                onChange={getUser}
                onInput={passwordValidation}
              />
              <div
                className="alert alert-danger d-none"
                id="passwordValidationMsg"
              >
                <label>Password is required</label>
                <ul>
                  {passwordError.map((error, i) => (
                    <li key={i}>{error}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="col-md-12 mb-3">
              <button
                type="submit"
                className="btn btn-primary rounded-1 text-white col-md-12 mb-3"
              >
                {isLoading === true ? (
                  <i className="fa-solid fa-spinner fa-spin"></i>
                ) : (
                  "Register"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
