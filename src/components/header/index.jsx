import './style.css';
import logo from "../../assets/logo.png";

const Header=()=> {
  return (
    <header className="header">
      <span className="flex items-center space-x-10">
        <img
          src={logo} // ✅ use imported image
          alt="Company Logo"
          className="logo"
        />
      </span>
      <span>
        <h1 style={{ color: 'darkblue' }}>GMAT Diagnostic Exam</h1>
        <p style={{ color: 'black' }}>GMAT 2025 Test</p>
      </span>
    </header>
  );
};


export default Header;
