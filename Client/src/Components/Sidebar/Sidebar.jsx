import { useState, useEffect } from 'react'
import axios from 'axios';
import './Sidebar.css'
import { Link } from 'react-router-dom';

export default function Sidebar() {
    const [cats, setCats] = useState([]);

    useEffect(() => {
        const getCats = async () => {
            const res = await axios.get('/categories');
            setCats(res.data);
        };
        getCats();

    }, [])

    return (
        <div className='Sidebar'>
            <div className="SidebarItem">
                <span className="SidebarTitle">
                    ABOUT ME!
                </span>
                <img className="SidebarItemIMG" src="https://images.pexels.com/photos/13108294/pexels-photo-13108294.jpeg?auto=compress&cs=tinysrgb&w=200" alt="" />
                <p className='SidebarItemPara'>I am Anuj Pratap Singh.I am a computer science graduate.I am a programmer and full-stack developer...
                </p>
            </div>

            <div className="SidebarItem">
                <span className="SidebarTitle">
                    CATEGORIES!
                </span>
                <ul className="SidebarList">
                    {cats.map(c =>
                        <Link to={`/?cat=${c.name}`} className='link'>
                            <li className="SidebarListItem">{c.name}</li>
                        </Link>
                    )}

                </ul>
            </div>

            <div className="SidebarItem">
                <span className="SidebarTitle">
                    FOLLOW US!
                </span>
                <div className="SidebarSocial">
                    <Link to='https://www.facebook.com/'> <i className="SidebarIcon fa-brands fa-square-facebook"></i> </Link>
                    <Link to='https://x.com/?lang=en'>  <i className="SidebarIcon fa-brands fa-square-x-twitter"></i> </Link>
                    <Link to='https://in.linkedin.com/'> <i className="SidebarIcon fa-brands fa-linkedin"></i> </Link >
                    <Link to='https://www.youtube.com/'> <i className="SidebarIcon fa-brands fa-square-youtube"></i> </Link >
                </div>
            </div>
        </div>
    )
}
