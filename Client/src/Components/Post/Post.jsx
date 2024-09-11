import './Post.css'
import {Link} from 'react-router-dom';

export default function Post({post}) {
  const PF="https://blog-backend-sd67.onrender.com/images/"
  return (
    <div className='Post'>
      {post.photo && (
        <img 
        className='PostImg'
        src={PF + post.photo} 
        alt=''/>
      )}
        <div className="PostInfo">
          <div className="PostCats">
           {
            post.categories.map(c=>(
              <span className="PostCat">{c.name}</span>
            ))
           }
          </div>
          <Link to={`/post/${post._id}`} className='link'>
            <span className="PostTitle">
            {post.title}
            </span>
          </Link>
          <hr/>
          <span className="PostDate">
          {new Date(post.createdAt).toDateString()}
          </span>
          <p className="PostDesc">
          {post.desc}
          </p>
          
        </div>
    </div>
  )
}
