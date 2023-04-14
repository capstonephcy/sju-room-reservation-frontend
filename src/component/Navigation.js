import './Navigation.css';
import '../Common.css'
import sejong_img from './sejong.png'
import home_img from './home.png'
import mypage_img from './mypage.png'

function Navigation() {
    return (
      <div className='navigation'>
        <img className='logo-img cursor-pointer' src={sejong_img} />
        <div className='menu-box'>
            <div className='menu-item-box background-red cursor-pointer'>
                <img className='menu-item-logo-img' src={home_img} />
                <a className='menu-item-text semi-bold'>홈</a>
            </div>
        </div>
        <img className='mypage-img cursor-pointer' src={mypage_img} />
      </div>
    );
}

export default Navigation;