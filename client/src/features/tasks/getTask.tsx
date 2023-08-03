import React, { useContext } from 'react'
import { AuthContext } from '../auth/AuthContext'
import { useMutation } from '@apollo/client'

function getTask() {

    // const { token } = useContext(AuthContext)

    // const [ getTask ] = useMutation(GET_TASK, {
    //     context: {
    //         headers: {
    //             authorization: `Bearer ${token}`
    //         }
    //     }
    // })

    return (
      <div>getTask</div>
    )
}

export default getTask