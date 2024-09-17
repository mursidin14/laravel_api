import { useState } from "react";
import { axiosClient } from "../../api/axios";
import { useStateContext } from "../../contexts/ContextProvider";
import { Spinner } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";


export default function Login() {
  const { setUser, setToken } = useStateContext();
  const [userData, setUserData] = useState({
    username:'',
    password: '',
  });
  const [error, setError] = useState('');
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
    if(userData.password.length < 6){
      setError("password must be at least 6 character");
      setLoading(false);
    } else {
      axiosClient.post("/users/login", userData)
      .then(({data}) => {
        setUser(data.data)
        setToken(data.data.token)
      }).catch((error) => {
          const res = error.response;
          console.log(res)
          const msg = res.data.errors.message;
          if(res.status == 401) {
              setError(msg)
              setLoading(false);
          }
      }) 
    }
  }

  console.log(error)


  return (
    <div className='flex items-center w-4/5 mx-auto'>
      <div className='mx-auto my-20'>
        <div className='w-80 mx-auto space-y-7'>
          <h1 className='text-2xl text-black font-semibold'>Login</h1>
          <p>If you dont have an account register You can<br />  
            <a href='/register' className='text-blue-800'> Register here !</a>
          </p>
          {
              error &&  
              <Alert color="failure" icon={HiInformationCircle} onDismiss={() => setError(false)}>
                  <span className="font-medium">{error}</span> 
              </Alert>
          }
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="form-login relative">
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

            <div className="form-login relative">
                <label className='text-slate-500'>Password</label>
                <input 
                  name="password"
                  value={userData.password}
                  onChange={handleChange}
                  className='outline-none w-80 py-2 px-3 border rounded-md'
                  type='password' 
                  placeholder='Enter your password' 
                  required
                />
            </div>
             <div className='flex mt-2 justify-between'>
                <div className="flex items-center">
                  <input type='checkbox' className='mr-2' />
                  <p className='text-black'>Remember me</p>
                </div>
                <a href='#' className='text-slate-500'>Forgot Password ?</a>
             </div>

             {
              loading ? 
              <button 
                className='bg-blue-800 text-white w-full h-10 mt-16 rounded-full shadow-lg shadow-blue-500/40'
                >
                <Spinner aria-label="Loading register" size="sm" />
                <span className="pl-3">Loading...</span>
              </button> :
              <button 
                type="submit"
                className='bg-blue-800 text-white w-full h-10 mt-16 rounded-full shadow-lg shadow-blue-500/40'
                >
                  Login
              </button>
            }
              </form>    
        </div>
      </div>
      <div className='bg-blue-950 rounded lg:block hidden min-h-96'>
            <div className="mx-auto w-1/2">
                <img src="/assets/auth-img.png" alt="auth-image" />
            </div>
        </div>
      </div>
  )
}
