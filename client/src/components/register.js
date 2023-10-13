import React, { useState } from 'react'
import axios from 'axios';
// import { useNavigate } from '@gatsbyjs/reach-router';
import { useNavigate } from "react-router-dom";

const RegisterUser = (props) => {

  const navigate = useNavigate();
  const {isLoggedin, setIsLoggedin} = props;
  const [confirmReg, setConfirmReg] = useState('');
  const [errs, setErrs] = useState({});

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  }) 

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name] : e.target.value,
    })
  }

  const registerUser = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/user/register', user, {withCredentials: true})
    .then((res) => {
      console.log(res.data);
      setIsLoggedin(true);
      setConfirmReg('Thank you for registering');
      setErrs({})
      navigate('/');
    })
    .catch((err) => {
      console.log(err)
      setErrs(err.response.data.errors)
    })
  }

    return (
        <div class="container mt-5 rounded-3 shadow p-3 bg-body" style={{width: 500, backgroundColor: 'white'}}>
        <h2>Register</h2>
        <form onSubmit={registerUser}>
          <div className='mb-3 mt-3'>
              <label>First Name</label><br/>
              {
              errs.firstName ?
              <span className='error-text' style={{color: "red"}}>{errs.firstName.message}</span>
              : null
              }
              <input 
                  className="form-control"
                  type="text" 
                  name="firstName"
                  value={user.firstName}
                  onChange = {handleChange}
              />
          </div>
          <div className='mb-3'>
          <label>Last Name</label><br/>
              {
              errs.lastName ?
              <span className='error-text' style={{color: "red"}}>{errs.lastName.message}</span>
              : null
              }
              <input className="form-control"
                  type="text" 
                  name="lastName"
                  value={user.lastName}
                  onChange = {handleChange}
              />
          </div>
          <div className='mb-3'>
          <label>User Name</label><br/>
              {
              errs.userName ?
              <span className='error-text' style={{color: "red"}}>{errs.userName.message}</span>
              : null
              }
              <input className="form-control"
                  type="text" 
                  name="userName"
                  value={user.userName}
                  onChange = {handleChange}
              />
          </div>
          <div className='mb-3'>
          <label>Email</label><br/>
              {
              errs.email ?
              <span className='error-text' style={{color: "red"}}>{errs.email.message}</span>
              : null
              }
              <input className="form-control"
                  type="email" 
                  name="email"
                  value={user.email}
                  onChange = {handleChange}
              />
          </div>
          <div className='mb-3'>
          <label>Password</label><br/>
              {
              errs.password ?
              <span className='error-text' style={{color: "red"}}>{errs.password.message}</span>
              : null
              }
              <input className="form-control"
                  type="password" 
                  name="password"
                  value={user.password}
                  onChange = {handleChange}
              />
          </div>
          <div className='mb-3'>
          <label>Password Confirmation</label><br/>
              {
              errs.confirmPassword ?
              <span className='error-text' style={{color: "red"}}>{errs.confirmPassword.message}</span>
              : null
              }
              <input className="form-control"
                  type="password" 
                  name="confirmPassword"
                  value={user.confirmPassword}
                  onChange = {handleChange}
              />
          </div>
          <div>
              <button className="btn btn-primary"
                  type="submit"
              >Register</button>
          </div>
        </form>
      </div>
    )
}

export default RegisterUser;