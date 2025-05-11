import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from './UserContext';
import styles from './ContinentSelector.module.css';  // Import the CSS module

function ContinentSelector() {
    const { setSelectedContinent, selectedContinent, selectedDifficulty, token, user } = useUserContext();
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Select continent - EduBot";
        console.log('useEffect triggered');

        if (user?.id) {
            console.log('User ID is valid:', user.id);
        } else {
            console.log('User ID is null - redirecting to login');
            navigate('/login');
        }
    }, [user, navigate]);

    const continents = [
        { name: 'AFRICA', image: './images/africa.png' },
        { name: 'ASIA', image: './images/asia.png' },
        { name: 'EUROPE', image: './images/europe.png' },
        { name: 'NORTH AMERICA', image: './images/n_america.png' },
        { name: 'SOUTH AMERICA', image: './images/s_america.png' },
        { name: 'AUSTRALIA', image: './images/australia.png' },
        { name: 'ANTARCTICA', image: './images/antarctica.png' },
        { name: 'ALL CONTINENTS', image: './images/all_conts.png' },
    ];

    const handleContinentClick = (continent) => {
        setSelectedContinent(continent);
        console.log('Continent selected:', continent);
        console.log('Current token:', token);
        console.log('Selected continent:', selectedContinent);
        console.log('Selected difficulty:', selectedDifficulty);
        navigate('/select-difficulty');
    };

    return (
        <>
            <div className={styles.header}>
                <h1 className={styles.title}>Hello, {user.name}! Select a continent to play</h1>
            </div>

            <div className={styles.container}>
                <div className={styles.grid}>
                    {continents.map((continent) => (
                        <div key={continent.name} className={styles.item}>
                            <div className={styles.imageHolder} onClick={() => handleContinentClick(continent.name)}>
                                <img src={continent.image} alt={continent.name} />
                            </div>
                            <p>{continent.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default ContinentSelector;