import React from "react"

export const CloseButton = (toggle) => {
    return (
        <button
            className="close-button"
            type="button"
            onClick={toggle}
        >
            <i className="fas fa-times" />
        </button>
    )
}
