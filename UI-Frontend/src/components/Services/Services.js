import './Services.css'
import FlipCard from '../../components/FlipCard/FlipCard';
import { useState, useEffect } from 'react';
import useDatabase from '../../CustomHooks/useDatabase';
export default function Services() {

    const [cards, setCards] = useState([]);
    const [limitedCards, setLimitedCards] = useState([]);    
    const {data}=useDatabase('cards')
    
    useEffect(() => {
        setCards(data);
        setLimitedCards(cards.slice(0, 3));
    }, [data,cards]);


    return (
        <div className='services'>
            <h1 className='servicesHeader'>Popular Services</h1>
            <div className='servicesList'>
                {limitedCards.map(card => (
                    <div className='serviceItem' key={card.ServiceID}>
                        <FlipCard
                            frontContent={card.serviceName}
                            backContent={card.serviceDesc}
                            price={card.servicePrice}
                            image={require(`../../Images/${card.serviceImage}`)}
                        />
                    </div>
                ))}

            </div>
        </div>
    )
}