import React, { useState } from 'react';
import equalizer from '../../../assets/icons/graphic_eq-black-18dp.svg';
import picInPic from '../../../assets/icons/picture_in_picture_alt-black-18dp.svg';
import Equalizer from '../../Equalizer/Equalizer';

interface ControlsProps {
    onPlayPause: any,
    isPlaying: boolean,
    theme: string,
}
const Controls = (props: ControlsProps) => {
    const [showModal, setShowModal] = useState(false);
    const handleEqualizer = () => {
        setShowModal(!showModal)
    }

    const handlePictureInPicture = () => {

    }
    return (
        <div className="player-controls">
            <button>
                <img
                    src={equalizer}
                    onClick={handleEqualizer}
                    style={{ filter: props.theme === '#fff' ? 'invert(1)' : 'invert(0)' }}
                    alt="loading..."
                    width="20px" />
            </button>
            <button>
                <i className="ui-icon-playlist" style={{ color: props.theme }}></i>
            </button>
            <button>
                <i className="ui-icon-shuffle" style={{ color: props.theme }}></i>
            </button>
            <button>
                <i className="ui-icon-prev" style={{ color: props.theme }}></i>
            </button>
            <button className="play" onClick={props.onPlayPause}>
                <i className={props.isPlaying ? "ui-icon-pause" : "ui-icon-play"} style={{ color: props.theme }}></i>
            </button>
            <button>
                <i className="ui-icon-next" style={{ color: props.theme }}></i>
            </button>
            <button>
                <i className="ui-icon-loop" style={{ color: props.theme }}></i>
            </button>
            <button>
                <i className="ui-icon-heart" style={{ color: props.theme }}></i>
            </button>
            <button>
                <img src={picInPic} style={{ filter: props.theme === '#fff' ? 'invert(1)' : 'invert(0)' }} alt="loading..." width="20px" />
            </button>
            <Equalizer showHide={showModal} />
        </div>
    )
}

export default Controls
