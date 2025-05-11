import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from './UserContext';
import styles from './SelectDifficulty.module.css';

function SelectDifficulty() {
    const { setSelectedDifficulty } = useUserContext();
    const navigate = useNavigate();

    const difficulties = [
        { level: 'EASY', questions: '10 QUESTIONS' },
        { level: 'MEDIUM', questions: '20 QUESTIONS' },
        { level: 'HARD', questions: '25 QUESTIONS', extra: 'TIME LIMIT' },
    ];

    const handleStart = (difficulty) => {
        setSelectedDifficulty(difficulty);
        console.log('Selected difficulty:', difficulty);
        navigate('/quiz'); // Change this to your actual quiz route
    };

    useEffect(() => {
        document.title = "Select difficulty - EduBot";
    }, []);

    return (
        <>
            <div className={styles.header}>
                <h1 className={styles.title}>Choose your level</h1>
            </div>

            <div className={styles.container} style={{
                backgroundImage: "url('/images/background_3.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}>
                <div className={styles.cardContainer}>
                    {difficulties.map((diff) => (
                        <div className={styles.card} key={diff.level}>
                            <h2 className={styles.level}>{diff.level}</h2>
                            <button
                                className={styles.startButton}
                                onClick={() => handleStart(diff.level)}
                            >
                                START
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );


}

export default SelectDifficulty;
