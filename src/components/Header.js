// rafce ES7

// When doing function no need to import react but
// need to import it when using class
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import Button from "./Button";

const Header = (props) => {
    const location = useLocation();

    return (
        <header className="header">
            <h1>{props.title}</h1>
            {location.pathname === "/" && (
                <Button
                    color={props.openAdd_pro ? "rgb(178, 13, 13)" : "Black"}
                    text={props.openAdd_pro ? "Cancel" : "Add"}
                    onAddClick_pro2={props.onAddClick_pro}
                />
            )}
            {/* <Button color="Purple" text="Add 1" /> */}
        </header>
    );
};

Header.defaultProps = {
    title: "Task Tracker",
    // title: 1   -(error (expecting string))
};

Header.propTypes = {
    title: PropTypes.string.isRequired,
};

// CSS in JS <h1 style={headingStyle}>
// const headingStyle = {
//     color: "burlywood",
//     backgroundColor: "gray",
// };

export default Header;
