import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Leaderboard.module.css';

function Leaderboard() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('https://edubot-app-b910de05b052.herokuapp.com/eduBot/leaderboard', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log("Leaderboard response:", response.data);
                setUsers(response.data);
            } catch (error) {
                console.error('Failed to fetch leaderboard:', error);
            }
        };

        fetchLeaderboard();
    }, []);

    return (
        <div
            className={styles.container}
            style={{
                backgroundImage: `url(/images/background_3.png)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            <div className={styles.header}>
                <h2 className={styles.title}>Leaderboard</h2>
            </div>

            <div className={styles.leaderboardBox}>
                <table className={styles.table}>
                    <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>High Score</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user, index) => (
                        <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.highscore}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Leaderboard;
