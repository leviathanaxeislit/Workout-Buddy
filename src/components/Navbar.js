import { Link } from "react-router-dom"



const Navbar = () => {
/* Returning the header and the link to the home page. */
    return (
        <header>
            <div className="container">
            <Link to="/">
                <h1>Workout Buddy</h1>
            </Link>
            </div>
        </header>
    )
}

export default Navbar