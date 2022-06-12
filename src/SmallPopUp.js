import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import "./styles/small-popup.css";

class SmallPopUp extends Component {
    constructor() {
        super();
        this.state = {};
    }

    componentWillMount() {
        library.add(fas);
    }

    componentDidMount() {
        const { onFinish } = this.props;
        let e = document.getElementById("small-popup");

        setTimeout(() => {
            e.classList.add("is-visible");
        }, 50);

        setTimeout(() => {
            e.classList.remove("is-visible");
        }, 3500);

        if (onFinish) {
            setTimeout(onFinish, 4000);
        }
    }

    render() {
        const { type, text } = this.props;
        let icon;

        if (type === "success") {
            icon = <FontAwesomeIcon icon="fa-solid fa-check" size="sm" />;
        } else if (type === "error") {
            icon = <FontAwesomeIcon icon="fa-solid fa-times" size="sm" />;
        }

        return (
            <div className={`popup-container ${type}`} id="small-popup">
                <div class="popup-icon">{icon}</div>
                <div className="popup-text">{text}</div>
            </div>
        );
    }
}

export default SmallPopUp;
