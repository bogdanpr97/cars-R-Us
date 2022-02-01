import { Outlet } from 'react-router-dom';
import Header from '../../Header';
import './styles.scss';

function MainLayout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  )
}

export default MainLayout;