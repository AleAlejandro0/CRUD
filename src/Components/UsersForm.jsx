import axios from 'axios'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

const defaultValues = {
  email: '',
  password: '',
  first_name: '',
  last_name: '',
  birthday: ''
}

const UsersForm = ({getAllUsers, updateUser, setUpdateUser, handleFormState}) => {
    
  const {register, handleSubmit, reset} = useForm()

  useEffect(()=> {
    updateUser && reset(updateUser)
  }, [updateUser]) 

    /* CREATE A NEW USER  */
  const createNewUser = data => {
       const URL = 'https://users-crud1.herokuapp.com/users/'
       axios.post(URL, data) 
            .then(res => { 
              getAllUsers()
            })
            .catch(err => console.log(err))
  }
    /* CREATE UPDATE USER */
  const changeUserData = data => {
       const URL = `https://users-crud1.herokuapp.com/users/${updateUser.id}/`
       axios.patch(URL, data)
            .then(res => getAllUsers())
            .catch(err => console.log(err))
  }
    /* CREATE OR UPDAT THE USER*/
  const submit = data => {
    if(updateUser){
      changeUserData(data)
      setUpdateUser()

    }else{
      createNewUser(data)
    }
   reset(defaultValues)
   handleFormState()
  }

  return (
    <form className='form' onSubmit={handleSubmit(submit)}>
      <div className='form__close' onClick={handleFormState}>x</div>
      <h2 className='form__tittle' >{updateUser ? 'Update user' : 'Create user'}</h2>
      <div className='form__inputs'>
        <div className='form__labels'>
          <label htmlFor="first_name">Name: </label>
          <input {...register('first_name')} type="text" id='first_name'/>
        </div>
        <div className='form__labels'>
          <label htmlFor="last_name">Last Name: </label>
          <input {...register('last_name')} type="text" id='last_name'/>
        </div>
        <div className='form__labels'>
          <label htmlFor="email">Email: </label>
          <input {...register('email')} type="email" id='email'/>
        </div>
        <div className='form__labels'>
          <label htmlFor="birthday">Birthday date: </label>
          <input {...register('birthday')} type="date" id='birthday'/>
        </div>
        <div className='form__labels'>
          <label htmlFor="passworld">Password: </label>
          <input {...register('password')} type="password" id='passworld'/>
        </div>
        <button className='form__btn'>{updateUser ? 'Update' : 'Create'}</button>
      </div>
    </form>
  )
}

export default UsersForm