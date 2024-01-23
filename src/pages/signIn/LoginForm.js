import React, { useState } from "react";
import "./LoginForm.css";
import images from "../../assets/images/logo_ms.png"
import { Alert } from 'react-bootstrap';
import AuthService from "../../service/AuthService";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const LoginForm = () => {
  const [userRole, setUserRole] = useState("");

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };
  const [errorMessage, setErrorMessage] = useState('');
  const [test, setTest] = useState('true');
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    Login: "",
    Password: "",
  });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when login process starts

    const newErrors = {};
    if (loginData.Login.trim() === '') {
      newErrors.Login = 'Le champ Nom d\'utilisateur ne peut pas être vide.';
    }
    if (loginData.Password.trim() === '') {
      newErrors.Password = 'Le champ Mot de passe ne peut pas être vide.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false); // Set loading back to false
    } else {
      try {
        const response = await AuthService.signin(loginData);

        if (response.success) {
          console.log("Authentication successful");

          const token = Cookies.get("access_token");
          console.log(token);

          if (token) {
            const decodedToken = await parseJwt(token);
            setUserRole(decodedToken ? decodedToken.Role : "");
            console.log(userRole);
          } if (userRole === "store") { navigate("/StateLive"); }
          else if (userRole === 'admin') { navigate("/"); }
          window.location.reload();
        } else {
          console.error("Authentication failed");
          setErrorMessage('Password or username incorrect.');
        }
      } catch (error) {
        console.error("Error during login:", error);
        setErrorMessage('Password or username not correct.');
      } finally {
        // Use setTimeout to simulate a 5s delay before setting loading back to false
        setTimeout(() => {
          setLoading(false);
        }, 5000);
      }
    }
  };

  const [errors, setErrors] = useState({
    Login: '',
    Password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: '',
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
  };

  
  return (

    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">

          <div className="card my-5">
            <form className="card-body cardbody-color p-lg-5" onSubmit={handleSubmit}>
              <div className="text-center">
                <img
                  src={images}
                  className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                  width="200px"
                  alt="profile"
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className={`form-control ${errors.Login && 'is-invalid'}`}
                  id="Username"
                  aria-describedby="emailHelp"
                  placeholder="UserName"
                  name="Login"
                  value={loginData.Login}
                  onChange={handleChange}

                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className={`form-control ${errors.Password && 'is-invalid'}`}
                  id="password"
                  placeholder="password"
                  name="Password"
                  value={loginData.Password}
                  onChange={handleChange}
                />

              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-color px-5 mb-5 w-100" style={{ backgroundColor: '#339af0', color: '#ffffff' }} onClick={handleLogin}>
                  Login
                </button>
              </div>      {(test === 'false') ? (
                <Alert variant="danger">
                  {errorMessage}
                </Alert>
              ) : (
                ''
              )}


            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
