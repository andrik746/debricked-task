import axios from '@/axiosConfig'
import handleError from '@/utils/handleError'

export const simulateLoginRequest = async () => {
  // setup credentials or warn user to provide them
  const hardcodedUsername = localStorage.getItem('username')
  const hardcodedPassword = localStorage.getItem('password')
  if (!hardcodedUsername || !hardcodedPassword) {
    console.error('Please, add password and username to the local storage')
    return
  }

  try {
    const response = await axios.post('login_check', {
      _username: hardcodedUsername,
      _password: hardcodedPassword
    })
    
    return response
  } catch(e) {
    handleError(e)
  }
}