import React from 'react';
import Button from "./Button.jsx";

const Modal = ({children, title, visible, setVisible}) => {

    const modalClasses = ['modal-wrapper'];

    if(visible) {
        modalClasses.push('open');
    }

    return (
        <div className={modalClasses.join(' ') || 'modal-wrapper'}>

            <div className={'modal-wrapper__inner'}>
                <Button
                    classes="btn-close"
                    onClick={() => setVisible(!visible)}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="4.92896" y="6.34314" width="2" height="18" transform="rotate(-45 4.92896 6.34314)" fill="currentColor"/>
                        <rect x="17.6567" y="4.92892" width="2" height="18" transform="rotate(45 17.6567 4.92892)" fill="currentColor"/>
                    </svg>
                </Button>
                <div className={'modal-wrapper__header text-20 font-600 margin-bottom-40'}>
                    {title}
                </div>
                <div className={'modal-wrapper__body'}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;