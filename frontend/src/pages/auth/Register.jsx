import { useState } from "react";
import { Link } from "react-router-dom";
import { axiosClient } from "../../api/axios";
import { useStateContext } from "../../contexts/ContextProvider";
import { Spinner } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";


export default function Register() {

  const { setUser } = useStateContext();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if(userData.password.length < 6) {
        setError("password must be at least 6 characters!")
        setLoading(false)
    } else {
      axiosClient.post("/users", userData)
      .then((data) => {
        const res = data.data;
        setUser(res);
        setSuccess('Register Successfully...');
        setTimeout(() => {
          window.location.href = "/login";
        }, 1000)
      }).catch((error) => {
        const res = error.response;
        const msg = res.data.errors.username;
        if(res.status == 400) {
            setError(msg)
            setLoading(false)
        }
    })
  }
  }

  return (
    <div className='flex items-center w-4/5 mx-auto'>
        <div className='mx-auto my-20'>
            {
              success &&  
              <Alert color="success" className="ease-in duration-100 mb-2">
                <span className="font-medium">{success}</span> 
              </Alert>
            }
          <div className='w-80 mx-auto space-y-3'>
            <h1 className='text-2xl text-black font-semibold'>Register</h1>
            <p>If you have an account You may<br /> 
              <Link to='/login' className='text-blue-800'>Login Now !</Link>
            </p>
            {
              error &&  
              <Alert color="failure" icon={HiInformationCircle} onDismiss={() => setError(false)}>
                <span className="font-medium">{error}</span> 
              </Alert>
            }
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="form-login">
                <label className='text-slate-500'>Name</label>
                <input
                  name="name"
                  value={userData.name}
                  onChange={handleChange} 
                  className='outline-none w-80 py-2 px-3 border rounded-md'
                  type='text' 
                  placeholder='Enter your name' 
                  required
                />
              </div>

              <div className="form-login">
                <label className='text-slate-500'>Username</label>
                <input
                  name="username"
                  value={userData.username}
                  onChange={handleChange}
                  className='outline-none w-80 py-2 px-3 border rounded-md'
                  type='text' 
                  placeholder='Enter your username' 
                  required
                />
              </div>

              <div className="form-login">
                <label className='text-slate-500'>Password</label>
                <input 
                  name="password"
                  value={userData.password}
                  onChange={handleChange}
                  className='outline-none w-80 py-2 px-3 border rounded-md'
                  type='password' 
                  placeholder='Enter your Password' 
                  required
                />
              </div>
              <div className="pt-3">
              {
                loading ? 
                <button 
                  className='bg-blue-800 text-white w-full h-10 rounded-full shadow-lg shadow-blue-500/40'
                  >
                  <Spinner aria-label="Loading register" size="sm" />
                  <span className="pl-3">Loading...</span>
                </button> :
                <button 
                  type="submit"
                  className='bg-blue-800 text-white w-full h-10 rounded-full shadow-lg shadow-blue-500/40'
                  >
                    Register
                </button>
              }
              </div>
              </form>
          </div>
        </div>
        <div className='bg-blue-950 rounded hidden lg:block min-h-96'>
          <div className="mx-auto w-1/2 mb-20">
              <img src="/assets/auth-img.png" alt="auth-image" />
          </div>
        </div>
      </div>
  )
}
