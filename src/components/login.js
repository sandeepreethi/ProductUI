import axios from "axios";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  const [UserName, setUserName] = useState("");
  const [Password, setPassword] = useState("");
  const login = () => {
    var postData = JSON.stringify({
      username: UserName,
      password: Password,
    });
    axios
      .post("https://localhost:44328/api/v1/login", postData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        window.sessionStorage.setItem("UserData", response.data.token);
        navigate("/dashboard");

        ///else code
      })
      .catch((err) => {
        console.log(err);
        window.sessionStorage.setItem("UserData", null);
      });
  };
  const [authenticated, setauthenticated] = useState(
    sessionStorage.getItem(sessionStorage.getItem("UserData") || false)
  );

  return (
    <div>
      <div className="container">
        <section className="vh-100 gradient-custom">
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div
                  className="card bg-dark text-white"
                  style={{ "border-radius:": "1rem;" }}
                >
                  <div className="card-body p-5 text-center">
                    <div className="mb-md-5 mt-md-4 pb-5">
                      <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                      <p className="text-white-50 mb-5">
                        Please enter your login and password!
                      </p>

                      <div className="form-outline form-white mb-4">
                        <input
                          id="typeEmailX"
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="Enter UserName"
                          value={UserName}
                          onChange={(e) => setUserName(e.target.value)}
                        />
                        <label className="form-label" for="typeEmailX">
                          UserName
                        </label>
                      </div>

                      <div className="form-outline form-white mb-4">
                        <input
                          id="typePasswordX"
                          type="password"
                          className="form-control form-control-lg"
                          placeholder="Enter Password"
                          value={Password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <label className="form-label" for="typePasswordX">
                          Password
                        </label>
                      </div>

                      <p className="small mb-5 pb-lg-2">
                        <a className="text-white-50" href="#!">
                          Forgot password?
                        </a>
                      </p>

                      <input
                        type="button"
                        className="btn btn-outline-light btn-lg px-5"
                        onClick={login}
                        value="Login"
                      />

                      <div className="d-flex justify-content-center text-center mt-4 pt-1">
                        <a href="#!" className="text-white">
                          <i className="fab fa-facebook-f fa-lg"></i>
                        </a>
                        <a href="#!" className="text-white">
                          <i className="fab fa-twitter fa-lg mx-4 px-2"></i>
                        </a>
                        <a href="#!" className="text-white">
                          <i className="fab fa-google fa-lg"></i>
                        </a>
                      </div>
                    </div>

                    <div>
                      <p className="mb-0">
                        Don't have an account?{" "}
                        <a href="#!" className="text-white-50 fw-bold">
                          Sign Up
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <div className="container">
          <div className="row p-3 mb-2">
            <div className="col-sm">
            <h1>RSA Guest House</h1>
            Daily Expense Report
            <br/>Varun Devraj
            <br/>Sandeep Reddy
            <br/>Venkat Ramana</div>
            <div className="col-sm">
        <div className="d-flex justify-content-center"  style={{height: "100%"}} >
          <form className="align-middle">
            <div className="row p-3 mb-2">
              <div className="col-sm">
                <div className="form-group ">
                  <label className="col-sm col-form-label">UserName</label>
                  <div className="col-sm">
                   
                  </div>
                </div>
                <div className="form-group ">
                  <label className="col-sm col-form-label">Password </label>
                  <div className="col-sm">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter Password"
                      value={Password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group ">
                  <label className="col-sm col-form-label"> </label>
                  <div className="col-sm">
                    <div className="form-group">
                      <div className="col-sm">
                        <input
                          type="button"
                          className="btn btn-primary"
                          onClick={login}
                          value="Login"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
          </div></div></div></div> */}
      </div>
    </div>
  );
}
export default Login;
