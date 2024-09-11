import './Header.css'

export default function Header() {
  return (
    <div className='header'>
      <div className="headerTitle">
        <span className='headerTitleSM'>MERN</span>
        <span className='headerTitleLG'>BLOG</span>
      </div>

      <img
        className="headerImage"
        src="https://images.pexels.com/photos/4458/cup-mug-desk-office.jpg?auto=compress&cs=tinysrgb&w=600" alt=""
       />

    </div>
  )
}
