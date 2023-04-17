import User from "../User";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";



export default function IndexPage() {
  const [users, setUsers] = useState([]);
  const [redirect, setRedirect] = useState(false);


  useEffect(() => {
    fetch("http://localhost:4000/users").then(response => {
      response.json().then(users => {
        setUsers(users);
        console.log(users);
      });
    });
  }, []);

  if(redirect){
    return <Navigate to={'/'}/>
}
  return (
  <>
    {users.length > 0 && users.map(user => (
        <User {...user} />
    ))}
  </>
  
  );
}
