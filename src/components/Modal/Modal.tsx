import React from 'react'
import { Motion, presets, spring } from 'react-motion';
import './Modal.scss';

interface ModalPropTypes {
    header?: JSX.Element,
    footer?: JSX.Element
    show: boolean,
    children: any
}

const Modal = ({ header, footer, show, children }: ModalPropTypes) => {

    const initialStyle = { opacity: spring(0), scale: spring(1.2) };

    return (
        <Motion
            style={
                show
                    ? {
                        opacity: spring(1),
                        scale: spring(1)
                    }
                    : initialStyle
            }
        >
            {interpolatesStyle => <>
                {
                    interpolatesStyle.opacity > 0
                        ? <div className="backdrop" style={{
                            opacity: interpolatesStyle.opacity,
                        }}>
                            <div className="modal" style={{ opacity: interpolatesStyle.opacity, transform: `scale(${interpolatesStyle.scale})` }}>
                                <div className="header">
                                    {header}
                                </div>
                                <div className="body">
                                    {children}
                                </div>
                                <div className="footer">
                                    {footer}
                                </div>
                            </div>
                        </div>
                        : null
                }

            </>}
        </Motion>


    )
}


export default Modal;