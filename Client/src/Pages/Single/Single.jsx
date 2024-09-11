import './Single.css'
import Sidebar from '../../Components/Sidebar/Sidebar';
import Singlepost from '../../Components/Singlepost/Singlepost';

export default function Single() {
  return (
    <div className='Single'>
        <Singlepost/>
        <Sidebar/>
    </div>
  )
}
