import { useState } from "react";
import { Navigate } from "react-router-dom";



export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  async function register(ev){
    ev.preventDefault();
    const response = await fetch('http://localhost:4000/register',{
        method: 'POST',
        body: JSON.stringify({username, password}),
        headers: {'Content-Type':'application/json'},
    });
    console.log(response);
    // 200 is the successful request code
    if (response.status === 200){
      alert('Registration Successful');
      setRedirect(true);
    }else{
      alert('Registration Failed');
    }
  }
  if(redirect){
    return <Navigate to={'/'}/>
}
  return (
    <form className="register" onSubmit={register}>
      <h1>Register</h1>

      <input
        type="text"
        placeholder="username"
        required 
        value={username}
        onChange={ev => setUsername(ev.target.value)}
      />

      <input
        type="password"
        placeholder="password"
        required 
        value={password}
        onChange={ev => setPassword(ev.target.value)}
      />
      <button>Register</button>
    </form>
  );
}
