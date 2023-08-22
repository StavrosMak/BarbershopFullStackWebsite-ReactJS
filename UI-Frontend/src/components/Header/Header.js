import "./Header.css"
import {HashLink as Link} from 'react-router-hash-link'

export default function Header() {


    return (
        <section className="banner" id="home">
            <div className="banner-content">
                <h1>Welcome to our Barbershop</h1>
                <p>Discover a wide range of grooming services and enjoy the finest barbering experience.</p>
                <Link smooth to="/#services">
                    <button>Explore Services</button>
                </Link>
            </div>


        </section>

    )

}

