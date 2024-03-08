import { NavLink, Outlet } from 'react-router-dom-v6';
import style from './style.module.less';

const NavLinkDemo: React.FC = () => {
  return (
    <div className={style.wrap}>
      <div>
        <NavLink to='navLink1'>navLink1</NavLink>
        <NavLink className='ml5' to='navLink2'>
          navLink1
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
};
export default NavLinkDemo;
