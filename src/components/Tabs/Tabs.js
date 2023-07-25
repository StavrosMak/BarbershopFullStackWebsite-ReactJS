import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import React, { useState } from 'react';
import MapBox from '../MapBox/MapBox';
import ContactInfo from '../data/Contact_Info.json'
import './Tabs.css';

export default function Tabss() {
    const [key, setKey] = useState('tab2')

    return (
        <div className="App">
            <Tabs className="Tabs" activekey={key} onSelect={(k) => setKey(k)}>
                <TabList>
                    <Tab eventkey="tab1">AboutUs</Tab>
                    <Tab eventkey="tab2">Location</Tab>
                    <Tab eventkey="tab3">Contact</Tab>
                </TabList>
                <TabPanel>
                    <h3>Who we are</h3>
                    <p>
                        Welcome to our Barbershop! We are a dedicated
                        team of skilled barbers who are passionate about crafting
                        the perfect hairstyle for every client. With years of
                        experience in the industry, we take pride in our attention
                        to detail and ability to create trendy and classic looks that suit your unique style. Our barbershop is more than just a place for a haircut; it's a space where you can relax, unwind, and enjoy the ultimate grooming experience. We prioritize customer satisfaction and strive to exceed your expectations with every visit. Join us at [Your Barbershop Name] and let our talented barbers give you a fresh, stylish look
                        that boosts your confidence and leaves you feeling your best.
                    </p>
                </TabPanel>
                <TabPanel>
                    <h3>Where we are</h3>
                    <MapBox />
                </TabPanel>
                <TabPanel>
                    <h3>Contact US!</h3>
                    <div className='tabsContactInfo'>
                        {ContactInfo.contactInfo.map((contactItem, index) => (
                            <p key={index}>
                                <i className={contactItem.icon}></i>
                                <span>{contactItem.value}</span>
                            </p>
                        ))}
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    )
}
