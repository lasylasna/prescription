import React from 'react';
import { Link } from "react-router-dom"; 

const Header = () => {
    return (
        <div className='header'>
            <div className='header-inner-container'>
                <Link className="add-btn" to="/add">
                    Add Prescription
                </Link>
            </div> 
        </div>
    )
}

export default Header