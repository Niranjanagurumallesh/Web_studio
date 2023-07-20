import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/SignupPage.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignupPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordValid, setPasswordValid] = useState(true);
  const [isConfirmPasswordValid, setConfirmPasswordValid] = useState(true);
  const [emailAddress, setEmailAddress] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmail = (e) => {
    setEmailAddress(e.target.value);
  };

  const handlePasswordChange = (e) => {
    const enteredPassword = e.target.value;
    setPassword(enteredPassword);
    setPasswordValid(validatePassword(enteredPassword));
    setConfirmPasswordValid(enteredPassword === confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    const enteredConfirmPassword = e.target.value;
    setConfirmPassword(enteredConfirmPassword);
    setConfirmPasswordValid(password === enteredConfirmPassword);
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password || !emailAddress || !confirmPassword) {
      toast.error("Please add all the required details!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (
      isConfirmPasswordValid &&
      isPasswordValid &&
      handleUsernameChange
    ) {
      navigate("/login", { state: { signupSuccess: true } });
    } else if (!isPasswordValid) {
      // toast.error(
      //   "Password needs to have a special character and be at least 8 characters long!",
      //   {
      //     position: "top-right",
      //     autoClose: 3000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //   }
      // );
      toast.error(' "Password needs to have a special character and be at least 8 characters long!"', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    }
  };

  const showPasswordErrorIcon = password !== confirmPassword;
  // (password !== " " && confirmPassword !== " ");

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email Address"
              value={emailAddress}
              onChange={handleEmail}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
            {/* {isPasswordValid ? (
              <span className="valid-icon">&#10003;</span>
            ) : (
              <span className="error-icon">&#10007;</span>
            )} */}
          </div>
          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            {showPasswordErrorIcon ? (
              <span className="error-icon">&#10007;</span>
            ) : (
              <span className="valid-icon">&#10003;</span>
            )}
          </div>

          <button type="submit" className="butlogin">
            Sign up
          </button>
          <p>
            Already have an account?
            <Link className="route" to="/login">
              Login here
            </Link>
          </p>
        </form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
    </div>
  );
};

export default SignupPage;
