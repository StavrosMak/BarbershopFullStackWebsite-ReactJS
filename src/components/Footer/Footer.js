import './Footer.css';
import logo from '../../Images/logo7.png'
import { Link } from "react-router-dom"
import Social from '../data/Social_Info.json'
import ContactInfo from '../data/Contact_Info.json'
import routes from '../data/Links.json'
export default function Footer() {

    return (
        <footer>
            <div className="FooterContainer">
                <div className='brandInfo'>
                        <img src={logo} alt="logoImg" />
                    {/* <div className="brandHeader">
                         <h2>BarberShop</h2>
                    </div> */}
                    <div className="footerDesc">
                        <p>Welcome to our premier barbershop, where timeless style meets modern grooming. 
                            Our skilled barbers are dedicated to delivering precision haircuts, razor-sharp shaves, 
                            and impeccable grooming services. Step into our vibrant atmosphere, where classic traditions 
                            blend seamlessly with contemporary techniques. Experience the art of grooming excellence and 
                            leave looking and feeling your best. 
                            Book your appointment today and discover the ultimate barbershop experience!
                        </p>
                    </div>
                </div>
                <div className='Footerlinks'>
                    <ul className='FooterItem'>
                        <h3>Explore:</h3>
                        {routes.map((item, index) => {
                            return (
                                <li key={index}>
                                    <Link to={item.url}>{item.title}</Link>
                                </li>

                            )
                        })}
                    </ul>

                    <div className='FooterItem contactInfo'>
                        {ContactInfo.contactInfo.map((contactItem, index) => (
                            <p key={index}>
                                <i className={contactItem.icon}></i>
                                <span>{contactItem.value}</span>
                            </p>
                        ))}
                    </div>
                </div>

                <div className='FooterItem social'>
                    <div className='subscription'>
                        <h3>Newsletter Subscription</h3>
                        <div className='subscriptionField'>
                            <input type='email' aria-label="subscribeInput" /><button onClick={() => { alert("subscribed!") }}>Sub</button>
                        </div>
                    </div>

                    <div className='socialLinks'>
                        {Social.social.map((socialItem) => (
                            <div key={socialItem.id}>
                                <Link to={socialItem.link} title='Social' className="socialItem"><i className={socialItem.icon}></i></Link>
                            </div>
                        ))}

                    </div>
                </div>
                <div className='copyRights'>Copyright © 2023 Example Company. All rights reserved.</div>
            </div>
        </footer>
    )
}
