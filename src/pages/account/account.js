import context from '../../contexts/authContext'
import './account.css'
import React, { useContext } from 'react'

function Account() {
    const { user } = useContext(context)
    if (!user)
        return (
            <div className='account-container'>
                Must be logged in to view profile
            </div>
        )
    return (
        <div className='account-body'>
            <div className='account-heading'>{user.name}'s Account Page</div>
        </div>
    )
}

export default Account
