import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { useForm, FormProvider } from "react-hook-form";
import $ from 'jquery';

export default function LoginPage(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {setUserInfo} = useContext(UserContext);
    const methods = useForm();
    const onSubmit = methods.handleSubmit(data => {
        console.log(data);
    })
    async function login(ev){
        ev.preventDefault();
        const response = await fetch('http://localhost:4000/login', {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {'Content-Type':'application/json'},
            credentials: 'include', 
        });   
        console.log(response.ok) 
        if(response.ok){
            response.json().then(userInfo => {
                setUserInfo(userInfo);
                setRedirect(true);
            });
        } else{
            alert('Invalid Login');
        }
}

    if(redirect){
        return <Navigate to={'/'}/>
    }
    return(
        <FormProvider {...methods}>
        <form className="login" onSubmit={login}>
            <h1>Login</h1>
            <input type="text" 
            required
            id="username" 
            placeholder="username" 
            value={username} 
            onChange={ev => setUsername(ev.target.value)}/>
            
            <input type="password" 
            id="password" 
            placeholder="password" 
            required
            value={password} 
            onChange={ev => setPassword(ev.target.value)}/>
            <button id="submitButton">Login</button>
        </form>
        </FormProvider>
    );
}