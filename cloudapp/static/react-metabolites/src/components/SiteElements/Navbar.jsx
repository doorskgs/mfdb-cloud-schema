import React from 'react'
import { Link } from 'react-router-dom'

/**
 * Handles page main navigation bar
 * @param {*} props 
 * @returns 
 */
export default function Navbar(props) {
  return <nav className="navbar navbar-expand-lg bg-primary navbar-dark fixed-top mb-4">
    <div className="container-fluid">
      <Link to="/" className='navbar-brand'>
        <i className="ra ra-lg ra-hollow-cat ms-2"></i>
        Metabolite Index
      </Link>

      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          {/* <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="/">Home</a>
          </li> */}
          <li className="nav-item dropdown">
            <Link className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Examples
            </Link>
            <ul className="dropdown-menu">
              <li><Link to="/metabolite/ZKHQWZAMYRWXGA-KQYNXXCUSA-N" className='dropdown-item'>ATP</Link></li>
              <li><Link to="/metabolite/XLYOFNOQVPJJNP-UHFFFAOYSA-N" className='dropdown-item'>Water</Link></li>
              <li><Link to="/metabolite/MYWUZJCMWCOHBA-VIFPVBQESA-N" className='dropdown-item'>Metamphetamine</Link></li>
              <li><Link to="/metabolite/FPQMUQPPAYCAME-UHFFFAOYSA-N" className='dropdown-item'>2-Acetyl-6-methylpyridine</Link></li>
              <li><hr className="dropdown-divider" /></li>
              <li><Link to="/asdage1" className='dropdown-item'>404 page</Link></li>
              <li><Link to="/test" className='dropdown-item'>Test styles</Link></li>
            </ul>
          </li>

        </ul>
        {/* <form className="d-flex" role="search">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search">
          <button className="btn btn-outline-success" type="submit">Search</button>
        </form> */}
      </div>
    </div>
  </nav>
}
