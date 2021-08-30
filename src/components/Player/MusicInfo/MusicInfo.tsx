import React, { memo } from 'react'
import { BASE_URL } from '../../../common/Utility';

interface MusicInfoProps {
    onVisualPlayer: any,
    art: string,
    title: string,
    album: string,
    artist: string,
}

const MusicInfo = (props: MusicInfoProps) => {
    return (
        <div className="music-info" onClick={props.onVisualPlayer}>
            {
                props.art
                    ? <img src={BASE_URL + props.art} alt="img" width="90px" />
                    : <img src={"../img/microsoft-groove.png"} alt="img" width="90px" />
            }

            <div className="info">
                <h3>{props?.title ?? 'Groove Music'}</h3>
                <h4>{props?.album ?? ''}</h4>
                <small>{props?.artist ?? ''}</small>
            </div>
        </div>
    )
}

export default memo(MusicInfo)

