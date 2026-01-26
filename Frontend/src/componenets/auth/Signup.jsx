import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import './Signup.css';

export default function Signup(){
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { currUser, setCurrUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try{
      setIsLoading(true);
      const res = await axios.post('http://localhost:3000/signup',
        {
          username: username,
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
      console.error("Error signing up: ", err);
      alert("Error signing in!");
      setIsLoading(false);
    }
  }

return (
      <div className="signup-wrapper">
        <div className="signup-logo-container">
          <img 
            src="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png" 
            alt="github logo" 
            className="signup-logo"
          />
          <h2 className="signup-heading">Sign in to GitHub</h2>
        </div>

        <div className="signup-box-wrapper">
          <div className="signup-box">
            <form className="signup-form">
              
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input 
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="form-control"
                />
              </div>

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
                <label htmlFor="password">Password</label>
                <input 
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                />
                <p className="password-note">Make sure it's at least 15 characters OR at least 8 characters including a number and a lowercase letter.</p>
              </div>

              <button
                type='submit'
                onClick={handleSignIn}
                disabled={isLoading}
                className="btn-primary"
              >
                {isLoading ? 'Loading...' : 'Sign up'}
              </button>
            </form>
          </div>

          <div className="signup-callout">
            <p>
              Already have an account? <Link to='/login'>Log in</Link>
            </p>
          </div>
        </div>
      </div>
  );
};