import './Navigation.css';

function Navigation() {
    return (
      <div className='navigation'>
        <img className='logo-img cursor-pointer' src="/img/sejong.png" />
        <div className='menu-box'>
            <div className='menu-item-box background-red cursor-pointer'>
                <img className='menu-item-logo-img' src="/img/home.png" />
                <a className='menu-item-text semi-bold'>홈</a>
            </div>
        </div>
        <img className='mypage-img cursor-pointer' src="/img/mypage.png" />
      </div>
    );
}

export default Navigation;