import RateCard from './RateCard';
import './RateSection.css';

export default function RateSection() {

    const rateCard1Content = {
        title: 'Rate',
        author: 'By John Kennedy',
        rateValue:5,
        reviewText: "This barbershop is a hidden gem! From the moment I stepped in, I was warmly greeted by the staff. My barber, was incredibly skilled and gave me the best haircut I've had in years. He paid great attention to detail and ensured he understood exactly what I wanted. The whole experience was fantastic, I can't wait to come back for my next haircut!",
        date: '06.07.2023',
    };

    const rateCard2Content = {
        title: 'Rate',
        author: 'By Nick D.',
        rateValue:5,
        reviewText: "My visit to this barbershop was fantastic! The team here is so friendly and professional. The barber not only gave me a stylish haircut but also provided some great tips on how to maintain it. I felt pampered throughout the whole process. The atmosphere was laid-back, and I enjoyed the experience immensely. I'll definitely become a regular customer!",
        date: '07.07.2023',
    };
    
    const rateCard3Content = {
        title: 'Rate',
        author: 'By Michael R.',
        rateValue:4,
        reviewText: "I'm extremely satisfied with my experience at this barbershop! The staff here is top-notch, and my barber, Chris, is a true artist. He took the time to understand my preferences and offered some valuable suggestions. The result was a haircut that exceeded my expectations. The ambiance of the place was fantastic, making the whole visit a delight!",
        date: '09.07.2023',
    };
    
    return (
        <div className="RateSection">
            <h3 className='RateSectionHeader'>Feedback from customers</h3>
            <div className='RateSectionList'>
                <RateCard cardContent={rateCard1Content} />
                <RateCard cardContent={rateCard2Content} />
                <RateCard cardContent={rateCard3Content} />
            </div>
            {/*Assuming these reviews are from google rating. */}
        </div>
    )
}