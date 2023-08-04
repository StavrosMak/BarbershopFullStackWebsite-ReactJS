import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import React, { useState } from 'react';
import MapBox from '../MapBox/MapBox';
import ContactInfo from '../data/Contact_Info.json';
import { motion } from 'framer-motion';

import './Tabs.css';

const tabVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.2, ease: 'easeIn' } },
};

export default function Tabss() {
  const [key, setKey] = useState('tab2');

  return (
    <div className="App">
      <Tabs className="Tabs" selected={key} onSelect={(k) => setKey(k)}>
        <TabList>
          <Tab eventkey="tab1">AboutUs</Tab>
          <Tab eventkey="tab2">Location</Tab>
          <Tab eventkey="tab3">Contact</Tab>
        </TabList>
        <TabPanel>
          <h4 className='tabInfoHeader'>Who we are</h4>
          <motion.div variants={tabVariants} initial="hidden" animate="visible">
            <p className='tabInfo'>
              Welcome to our Barbershop! We are a dedicated
              team of skilled barbers who are passionate about crafting
              the perfect hairstyle for every client. With years of
              experience in the industry, we take pride in our attention
              to detail and ability to create trendy and classic looks that suit your unique style. Our barbershop is more than just a place for a haircut; it's a space where you can relax, unwind, and enjoy the ultimate grooming experience. We prioritize customer satisfaction and strive to exceed your expectations with every visit. Join us at [Your Barbershop Name] and let our talented barbers give you a fresh, stylish look
              that boosts your confidence and leaves you feeling your best.
            </p>
          </motion.div>
        </TabPanel>
        <TabPanel>
          <h4 className='tabInfoHeader'>Where you can find us</h4>
          <motion.div variants={tabVariants} initial="hidden" className='tabInfo' animate="visible">
            <MapBox />
          </motion.div>
        </TabPanel>
        <TabPanel>
          <h4 className='tabInfoHeader'>Contact us</h4>
          <motion.div variants={tabVariants} initial="hidden" animate="visible">

            <div className='tabsContactInfo'>
              {ContactInfo.contactInfo.map((contactItem, index) => (
                <p key={index}>
                  <i className={contactItem.icon}></i>
                  <span>{contactItem.value}</span>
                </p>
              ))}
            </div>
          </motion.div>
        </TabPanel>
      </Tabs>
    </div>
  );
}
