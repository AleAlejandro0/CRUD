import axios from 'axios'
import React from 'react'

const UsersList = ({user, getAllUsers, setUpdateUser, handdleForm}) => {
  /* DELETE USER */
  const deleteUser = () => {
    const URL = `https://users-crud1.herokuapp.com/users/${user.id}/`
         axios.delete(URL)
              .then(res => getAllUsers())
              .catch(err => console.log(err))
  }
  /* UPDATE USES INFO */
  const getUpdateInfo = () => {
    setUpdateUser(user)
    handdleForm()
  }

  return (
    <div className='users'>
      <h2 className='users__name'>{`${user['first_name']} ${user['last_name']}`}</h2>
      <ul className='users__list'>
        <li className='users__item'><span>Email:</span> {user.email}</li>
        <li className='users__item'><span>Date:</span> {user.birthday}</li>
      </ul>
      <button className='users__btn btn-1' onClick={getUpdateInfo}>Update</button>
      <button className='users__btn btn-2' onClick={deleteUser}>Delete</button>
    </div>
  )
}

export default UsersList