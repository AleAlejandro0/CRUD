import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import UsersForm from './Components/UsersForm'
import UsersList from './Components/UsersList'

function App() {

  const [users, setUsers] = useState()
  const [updateUser, setUpdateUser] = useState()
  const [formBTN, setFormBTN] = useState(false)

  useEffect(() => {
    getAllUsers()
  }, [])

  /* REQUEST ALL USERAS TO END POINT */
  const getAllUsers = () => {
    const URL = 'https://users-crud1.herokuapp.com/users/'
    axios.get(URL)
         .then(res=>setUsers(res.data))
         .catch(err => console.log(err))
  }
  /*HANDLE CLOSE AND OPEN MENU*/
  const handdleForm = () => {
    setFormBTN(true)
  }

  const handleFormState = () => {
    setUpdateUser()
    setFormBTN(false)
  }

  return (
    <div className="App">
      <h1 className='app__tittle'>CRUD USERS</h1>
      <button className='open__form' onClick={handdleForm}>Use form</button>
      <div className={formBTN ? 'app__form' : 'form__hidden'}>
        <UsersForm
          getAllUsers={getAllUsers}
          updateUser={updateUser}
          setUpdateUser={setUpdateUser}
          handleFormState={handleFormState}
        />
      </div>
      <div className='app__users'>
        {
         users?.map(user => (
          <UsersList 
           key={user.id}
           user={user}
           getAllUsers={getAllUsers}
           setUpdateUser={setUpdateUser}
           handdleForm={handdleForm}
          />
        ))
        }
      </div>
    </div>
  )
}

export default App
