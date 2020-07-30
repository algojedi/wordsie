import context from '../../contexts/authContext'

import React, { useContext } from 'react'

function Account() {
    const {user} = useContext(context)
    if (!user) return <div>No user</div>
    return (
        <div>
           Hello {user.name}  
        </div>
    )
}

export default Account
