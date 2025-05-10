import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from './UserContext';
import styles from './Login.module.css'; // ✅ Use the same styles

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { setToken, setUser } = useUserContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://edubot-app-b910de05b052.herokuapp.com/api/auth/register', {
                name,
                email,
                password
            });

            const token = response.data['jwt-token'];
            if (token) {
                localStorage.setItem('token', token);
                setToken(token);

                const userResponse = await axios.get(`https://edubot-app-b910de05b052.herokuapp.com/eduBot/user/details/${email}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (userResponse.data) {
                    const { id, name, highscore } = userResponse.data;
                    setUser({ id, name, highscore });
                }

                navigate('/select-continent');
            }
        } catch (error) {
            console.error('Registration failed:', error.response?.data || error.message);
        }
    };

    return (
        <div
            className={styles.container}
            style={{ backgroundImage: 'url(/images/background_3.png)', backgroundSize: 'cover' }}
        >
            <form onSubmit={handleSubmit} className={styles.form}>
                <h2 className={styles.label}>Create Account</h2>

                <label className={styles.label}>Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className={styles.input}
                />

                <label className={styles.label}>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={styles.input}
                />

                <label className={styles.label}>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={styles.input}
                />

                <button type="submit" className={styles.button}>REGISTER</button>

                <p className={styles.linkText}>
                    Already have an account? <a href="/login">Login here</a>
                </p>
            </form>
        </div>
    );
}

export default Register;
