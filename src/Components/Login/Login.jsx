import React, { useEffect, useState } from "react";
import Joi from "joi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Login(props) {
  let navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
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

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      navigate("/profile");
    }
  }, [navigate]);

  const formSubmit = async function (e) {
    e.preventDefault();
    setIsLoading(true);
    let emailValidate = emailValidation();
    let passwordValidate = passwordValidation();
    // console.log(fNameValidate, lNameValidate, emailValidate, passwordValidate);
    if (!emailValidate.error && !passwordValidate.error) {
      let { data } = await axios.post(
        "https://route-egypt-api.herokuapp.com/signin",
        user
      );
      setErrorMsg(data.message);
      if (data.message === "success") {
        setIsLoading(false);
        navigate("/profile");
        localStorage.setItem("userToken", data.token);
        props.saveUserData();
      } else {
        if (data.message === "incorrect password") {
          document.getElementById("password").classList.add("is-invalid");
        }
        if (data.message === "email doesn't exist") {
          document.getElementById("email").classList.add("is-invalid");
        }
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
    // console.log(data);
  };

  function emailValidation() {
    const schema = Joi.object({
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: false },
        })
        .required(),
    }).extract("email");
    let result = schema.validate(user.email);
    if (!result.error) {
      document
        .getElementById("email")
        .classList.replace("is-invalid", "is-valid");
      document.getElementById("email").addEventListener("blur", function () {
        document.getElementById("emailValidationMsg").classList.add("d-none");
      });
      return schema.validate(user.email);
    } else {
      document.getElementById("email").classList.add("is-invalid");
      document.getElementById("email").addEventListener("blur", function () {
        document
          .getElementById("emailValidationMsg")
          .classList.replace("d-none", "d-block");
      });
      setEmailError("Email is required");

      document.getElementById("email").addEventListener("blur", function () {
        document.getElementById("emailValidationMsg").classList.add("d-block");
      });

      document.getElementById("email").addEventListener("keydown", function () {
        document
          .getElementById("emailValidationMsg")
          .classList.replace("d-block", "d-none");
      });

      return schema.validate(user.email);
    }
  }

  function passwordValidation() {
    const schema = Joi.object({
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z][0-9]{4,10}"))
        .required(),
    }).extract("password");
    let result = schema.validate(user.password);
    if (!result.error) {
      document
        .getElementById("password")
        .classList.replace("is-invalid", "is-valid");
      document.getElementById("password").addEventListener("blur", function () {
        document
          .getElementById("passwordValidationMsg")
          .classList.add("d-none");
      });
      return schema.validate(user.password);
    } else {
      document.getElementById("password").classList.add("is-invalid");
      document.getElementById("password").addEventListener("blur", function () {
        document
          .getElementById("passwordValidationMsg")
          .classList.replace("d-none", "d-block");
      });
      setPasswordError("password is required");

      document.getElementById("password").addEventListener("blur", function () {
        document
          .getElementById("passwordValidationMsg")
          .classList.add("d-block");
      });

      document
        .getElementById("password")
        .addEventListener("keydown", function () {
          document
            .getElementById("passwordValidationMsg")
            .classList.replace("d-block", "d-none");
        });

      return schema.validate(user.password);
    }
  }

  return (
    <section id="Login" className="w-50">
      <div className="position-absolute w-50 translate-middle start-50 top-50">
        <h1 className="mb-4">Login Now!</h1>

        {errorMsg ? <div className="alert alert-danger">{errorMsg}</div> : ""}
        <form className="h-100" onSubmit={formSubmit}>
          <div className="row d-flex  align-items-center justify-content-center">
            <div className="col-md-6 mb-3"></div>
            <div className="col-md-12 mb-3">
              <input
                type="email"
                className="form-control rounded-1"
                placeholder="Enter Your Email"
                id="email"
                name="email"
                onChange={getUser}
                onInput={emailValidation}
                // onBlur={emailValidation}
              />
              <div
                className="alert alert-danger d-none"
                id="emailValidationMsg"
              >
                {emailError}
              </div>
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
                {passwordError}
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
                  "Login"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
