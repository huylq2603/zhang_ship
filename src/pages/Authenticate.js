import { useEffect, useState } from 'react';
import { setCookie, AUTH_COOKIE } from '../components/common';
import { useNavigate } from 'react-router-dom';
import { isAuth } from '../components/common';
import bcrypt from 'bcryptjs'



const Authenticate = () => {

    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        if (isAuth()) {
            navigate('/manage');
        }
    }, []);

    const authenticate = () => {
        const doesPasswordMatch = bcrypt.compareSync(password, '$2a$10$Lla8PhHBfvW7BzgTeNGFLeSJPluz0gx1BFHFo5MMMHFFAlRTlE4b.')
        if (!doesPasswordMatch) {
            setCookie(AUTH_COOKIE, false, 0);
            alert('That\'s a wrong ass password');
            return;
        }
        setCookie(AUTH_COOKIE, true, 24);
        navigate('/manage');
    }

    return (
        <div className='container'>
            <h1>Authenticate &nbsp;
                <button className="btn waves-effect waves-light" type="button" onClick={() => { navigate("/") }}>
                    Back
                </button>
            </h1>

            <div className='input-field'>
                <input id='password' type='password' className='validate' value={password} onChange={(e) => { setPassword(e.target.value) }} />
                <label htmlFor='password'>Password</label>
            </div>

            <button type='button' className='btn btn-default' onClick={authenticate} disabled={!password}>Authenticate</button>

        </div>
    )
}

export default Authenticate;