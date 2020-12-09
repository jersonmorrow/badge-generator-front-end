import react from 'react'
import { useHistory } from 'react-router-dom'

function AuthOptions() {
    const history = useHistory();

    const register = () => history.push('./register')
    const login = () => history.push('./login')

    return (
        <div>
        <button onClick={register}>Register</button>
        <button onClick={login}>Log in</button>
    </div>
    ) 
}

export default AuthOptions