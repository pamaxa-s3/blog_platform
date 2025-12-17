import { NavLink, useNavigate } from 'react-router-dom';
import cls from './DashboardSidebar.module.css';

const DashboardSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // тут пізніше буде authContext.logout()
    navigate('/');
  };

  return (
    <aside className={cls.sidebar}>
      <h2 className={cls.title}>Dashboard</h2>

      <nav className={cls.nav}>
        <NavLink end to="/dashboard" className={cls.link}>
          Головна
        </NavLink>

        <NavLink to="/dashboard/my-posts" className={cls.link}>
          Мої статті
        </NavLink>

        <NavLink to="/dashboard/settings" className={cls.link}>
          Налаштування
        </NavLink>
      </nav>

      <button className={cls.logout} onClick={handleLogout}>
        Вийти
      </button>
    </aside>
  );
};

export default DashboardSidebar;