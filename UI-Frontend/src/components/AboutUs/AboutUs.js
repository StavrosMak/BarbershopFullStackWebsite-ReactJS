
import Tabss from '../../components/Tabs/Tabs';
import logo from '../../Images/logo7.png'
import './About.css'
export default function AboutUs() {
    return (
        <div className="AboutUs" id='AboutUs'>
            <h2 className='AboutUsHeader'>About us</h2>
            <div className="AboutUsSection">

                <div className='leftSide'>
                    <img src={logo} alt='' />

                </div>
                <div className='rightSide'>

                    <Tabss />

                </div>
            </div>


        </div>
    )
}