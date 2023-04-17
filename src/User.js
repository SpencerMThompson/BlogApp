import { Link } from 'react-router-dom';

export default function User({_id, username}){
    function fetchDelete(){
        fetch(`http://localhost:4000/user/${_id}`, {method: 'DELETE'});
      }
    return(
        <div className="user">
            <h2>{username}</h2>
            <p>{_id}</p>
            {username != 'Admin' && (
                <>
            <button onClick={fetchDelete}>Delete</button>
            </>
            )}
      </div>
    );
}