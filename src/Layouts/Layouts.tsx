import { Outlet, /* useNavigate, */ NavLink, useNavigate } from 'react-router-dom-v6';
// import { Button } from 'antd';
import style from './style.module.less';

function Layouts() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className={style.wrap}>
      <div className={style.backBtn} onClick={handleBack}>
        返回
      </div>
      <div className={style.nav}>
        <NavLink to='me'>me</NavLink>
        <br />
        <NavLink to=':123' state={'id路由state参数'}>
          My IdRoute
        </NavLink>
        <br />
        <NavLink to='navLink' state={'id路由state参数'}>
          NavLink
        </NavLink>
        <br />
        <NavLink to='relative'>Relative</NavLink>
        <br />
        <NavLink to='ReactToolkitDemo'>ReactToolkitDemo</NavLink>
        <br />
        <NavLink to='reduxDemo'>ReduxDemo</NavLink>
      </div>
      {/* <Button onClick={() => navigate('123', { state: 'useNavigate' })}>
        useNavigate My IdRoute
      </Button> */}
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default Layouts;
