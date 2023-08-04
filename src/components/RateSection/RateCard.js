import './RateCard.css';
import { useState, useEffect } from 'react';
import Rating from '@mui/material/Rating';
export default function RateCard({ cardContent }) {
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        const checkTouchDevice = () => {
            setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints);
        };
        checkTouchDevice();
        // Listen for resize events (in case the user switches from mobile to desktop view)
        window.addEventListener('resize', checkTouchDevice);
        // Clean up the event listener when the component is unmounted
        return () => {
            window.removeEventListener('resize', checkTouchDevice);
        };
    }, []);

    return (
        <div className={`RateCard ${isTouchDevice ? 'touch-enabled' : ''}`}>
            <div className="blog">

                <div className="title-box">
                    <h3>
                        {cardContent.title}
                    </h3>
                    <hr />
                    <div className="intro">
                        {cardContent.author}
                    </div>
                </div>
                <div className="info">
                    <span>
                        {cardContent.reviewText}
                    </span>
                </div>
                <div className="footer">
                    <div className="icon-holder">
                        <span>
                            <i className="fa fa-calendar"></i>
                            <span>{cardContent.date}</span>
                          
                        </span>
                        <div className='rateStar'>
                            <Rating name="read-only" value={cardContent.rateValue} readOnly />
                        </div>
                    </div>
                </div>

                <div className="color-overlay"></div>
            </div>
        </div>
    )
}