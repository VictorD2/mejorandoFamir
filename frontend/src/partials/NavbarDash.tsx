import React from 'react'
import { Link } from 'react-router-dom'

const NavbarDash:React.FC = () => {
    return (
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        {/* Left navbar links */}
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="#" className="nav-link" data-widget="pushmenu" role="button">
              <i className="fas fa-bars" />
            </Link>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <Link to="/" className="nav-link">
              Inicio
            </Link>
          </li>
        </ul>
      </nav>
    )
}

export default NavbarDash
