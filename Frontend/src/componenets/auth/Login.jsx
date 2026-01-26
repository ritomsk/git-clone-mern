import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import './Login.css';

export default function Login(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { currUser, setCurrUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogIn = async (e) => {
    e.preventDefault();
    try{
      setIsLoading(true);
      const res = await axios.post('http://localhost:3000/login',
        {
          email: email,
          password: password
        }
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);

      setCurrUser(res.data.userId);
      setIsLoading(false);
      
      navigate('/');
    }
    catch(err){
      console.error("Error logging in: ", err);
      alert("Error logging in!");
      setIsLoading(false);
    }
  }

return (
      <div className="login-wrapper">
        <div className="login-logo-container">
          <img 
            src="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png" 
            alt="github logo" 
            className="login-logo"
          />
          <h2 className="login-heading">Log in to GitHub</h2>
        </div>

        <div className="login-box-wrapper">
          <div className="login-box">
            <form className="login-form">
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input 
                  type="email"
                  id="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <div className="label-wrapper">
                  <label htmlFor="password">Password</label>
                  <a href="/forgot" className="forgot-password-link">Forgot password?</a>
                </div>
                <input 
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                />
              </div>
              <button
                type='submit'
                onClick={handleLogIn}
                disabled={isLoading}
                className="btn-primary"
              >
                {isLoading ? 'Loading...' : 'Sign in'}
              </button>
            </form>
          </div>

          <div className="login-callout">
            <p>
              New to GitHub? <Link to='/signup'>Create an account</Link>
            </p>
          </div>
        </div>
      </div>
  );
};