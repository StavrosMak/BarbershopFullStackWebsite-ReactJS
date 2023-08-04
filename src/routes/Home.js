import Header from '../components/Header/Header';
import Services from '../components/Services/Services';
import Price from '../components/Price/Price';
import AboutUs from '../components/AboutUs/AboutUs';
import Menu from '../components/Menu/Menu';
import Gallery from '../components/Gallery/Gallery';
import RateSection from '../components/RateSection/RateSection';

export default function Home() {

    return (
        <>
            <Header />
            <Services />
            <AboutUs />
            <Menu />
            <Price />
            <Gallery />
            <RateSection />
        </>
    );
}