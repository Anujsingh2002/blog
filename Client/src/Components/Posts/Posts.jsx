import Post from '../Post/Post'
import './Posts.css'

export default function Posts({posts}) {
  return (
    <div className='Posts'>
      {posts.map(p=>(
        <Post post={p}/>
      ))}
        
        
    </div>
  )
}
