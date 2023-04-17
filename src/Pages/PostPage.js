import { format } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";


export default function PostPage() {
  const { id } = useParams();
  const [postInfo, setPostInfo] = useState(null);
  const {userInfo} = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setPostInfo(postInfo);
      });
    });
  }, [id]);

  async function fetchDelete(){
    const response = await fetch(`http://localhost:4000/post/${id}`, {method: 'DELETE'});
    if(response.ok){
          setRedirect(true);
      };
  }
  if(redirect){
    return <Navigate to={'/'}/>
}
  if (!postInfo) {
    return "";
  } else {
    return (
      <div className="post-page">
        <h1 className="post-title">{postInfo.title}</h1>
        <h2 className="post-author">Written by: {postInfo.author.username}</h2>

        <time>{format(new Date(postInfo.createdAt), "MMM d, yyyy")}</time>
        <div className="image">
          <img src={`http://localhost:4000/${postInfo.cover}`} alt="" className="post-image" />
        </div>
        <div dangerouslySetInnerHTML={{__html:postInfo.content}}/>
        {userInfo?.id == postInfo.author._id && (
            <div className="button-row">
                <Link to={`/edit/${postInfo._id}`} className="edit">Edit Post</Link>
                <p>\\</p>
                <button onClick={fetchDelete}>Delete</button>
            </div>
        )}
      </div>
    );
  }
}
