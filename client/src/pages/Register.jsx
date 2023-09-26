import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const Register = () => {

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [err, setError] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("auth/register", inputs);
      navigate("/login"); 
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="auth">
      <h1>Register</h1>
      <form>
        <input required type="text" name='username' onChange={handleChange} placeholder='Username...' />
        <input required type="email" name='email' onChange={handleChange} placeholder='Email...' />
        <input required type="password" name='password' onChange={handleChange} placeholder='Password...' />
        <button onClick={handleSubmit}>Sign Up</button>
        {err && <p>{err}</p>}
        <span>Do you have an account? <Link className='link signLink' to='/login'>Login</Link></span>
      </form>
    </div>
  )
}

export default Register

