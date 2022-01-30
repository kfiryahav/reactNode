import React from 'react';

function Footer(props) {
    return (
        <p className="border-top pt-3 text-center mt-5" id="footer">
            Cards App © {new Date().getFullYear()} - 1991
        </p>
    )
}

export default Footer