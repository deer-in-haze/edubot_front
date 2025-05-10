import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from './UserContext';
import styles from './Login.module.css';
import { Link } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { setToken, setUser } = useUserContext();

    useEffect(() => {
        console.log('Login Component mounted');
        if (!localStorage.getItem('token')) {
            console.log('Clearing token');
            localStorage.removeItem('token');
            setToken('');
        }
    }, [setToken]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Sending login request...');
            const loginResponse = await axios.post('https://edubot-app-b910de05b052.herokuapp.com/api/auth/login', { username, password });

            const newToken = loginResponse.data['jwt-token'];
            if (newToken) {
                localStorage.setItem('token', newToken);
                setToken(newToken);
                console.log('Login successful! Fetching user details...');

                const userResponse = await axios.get(`https://edubot-app-b910de05b052.herokuapp.com/eduBot/user/details/${username}`, {
                    headers: {
                        Authorization: `Bearer ${newToken}`
                    }
                });

                if (userResponse.data) {
                    const { id, name, highscore } = userResponse.data;
                    setUser({ id, name, highscore });
                    localStorage.setItem('user', JSON.stringify({ id, name, highscore }));
                    navigate('/select-continent');
                }
            }
        } catch (error) {
            console.error('Login failed:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div
            className={styles.container}
            style={{ backgroundImage: 'url(/images/background_3.png)', backgroundSize: 'cover' }}
        >
            <form onSubmit={handleSubmit} className={styles.form}>
                <div>
                    <label className={styles.label}>USERNAME</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className={styles.input}
                    />
                </div>
                <div>
                    <label className={styles.label}>PASSWORD</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className={styles.input}
                    />
                </div>
                <button type="submit" className={styles.button}>LOGIN</button>
                <p className={styles.linkText}>
                    Don’t have an account? <Link to="/register">Register here</Link>
                </p>
            </form>
        </div>
    );
}

export default Login;