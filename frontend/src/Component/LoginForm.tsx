import React, {useState} from "react";
import {LocalUserInterface} from "../Interface/LocalUserInterface";

interface LoginFormPropsInterface {
    setLocalUser: React.Dispatch<LocalUserInterface>,
    needsLogin: boolean,
    setNeedsLogin: React.Dispatch<boolean>
}

export default function LoginForm({setLocalUser, needsLogin, setNeedsLogin}: LoginFormPropsInterface) {
    const [formInput, setFormInput] = useState<LocalUserInterface>({password: "", username: ""})

    const handleChange = ({target}: any) => {
        setFormInput(prev => ({
            ...prev,
            [target.name]: target.value
        }))
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setLocalUser(formInput);
    }

    return (
        <form className='mx-auto' style={{maxWidth: '350px'}} onSubmit={handleSubmit}>
            <h2 className='mb-3 text-center'>{needsLogin ? 'Please Log In' : 'Please Register'}</h2>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" id="floatingInput" placeholder="FrancisHuster"
                       name='username' onChange={handleChange} value={formInput.username}/>
                <label htmlFor="floatingInput">Username</label>
            </div>
            <div className="mb-3 form-floating">
                <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
                       name='password' onChange={handleChange} value={formInput.password}/>
                <label htmlFor="floatingPassword">Password</label>
            </div>
            <button type='submit' className='btn btn-primary w-100'>{needsLogin ? 'Login' : 'Register'}</button>
            <button className='btn btn-warning mt-3 w-100'
                    onClick={() => setNeedsLogin(!needsLogin)}>{needsLogin ? 'Register' : 'Login'} instead ?</button>
        </form>
    )
}
