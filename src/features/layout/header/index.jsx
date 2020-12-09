import React from 'react'
import { Link } from 'react-router-dom'
import AuthOptions from '../../auth/authOptions'

function Header() {
    return <div>
        <Link to='./'>
            <h1>Header to do</h1>
        </Link>
        <AuthOptions />
        </div>
}

export default Header