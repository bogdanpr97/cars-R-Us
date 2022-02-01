import CustomLink from '../CustomLink';
import './styles.scss';

function Header() {
  return (
    <div className="header-container">
      <CustomLink className="link" to="/">Homepage</CustomLink>
      <div className="menu-list">
        <CustomLink className="link" to="/sales-people">Employees</CustomLink>
        <CustomLink className="link" to="/cars">Cars</CustomLink>
        <CustomLink className="link" to="/records">Records</CustomLink>
      </div>
    </div>
  );
}

export default Header;