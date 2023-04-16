import {format} from 'date-fns';

export default function Post({title, summary, content, cover,createdAt}){
    return(
        <div className="post">
        <div className="image">
        <img src={cover} alt="image"></img>
        </div>
        <div className="texts">
        <h2>{title}</h2>
        <p className="info">
          <a className="author">Spencer Thompson</a>
          <time>{format(new Date(createdAt), "MMM d, yyyy HH:mm")}</time>
        </p>
        <p className="summary">{summary}</p>
        </div>
      </div>
    );
}