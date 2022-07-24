import PropTypes from "prop-types";

const Button = (props) => {
    return (
        <button
            onClick={props.onAddClick_pro2}
            style={{ backgroundColor: props.color }}
            className="button"
        >
            {props.text}
        </button>
    );
};

Button.defaultProps = {
    color: "Purple",
    text: "Add",
};

Button.propTypes = {
    text: PropTypes.string.isRequired,
    onAddClick_pro2: PropTypes.func,
};

export default Button;
