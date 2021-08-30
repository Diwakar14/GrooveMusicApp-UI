import { memo } from "react";
import { BASE_URL } from "../../common/Utility";
import { ISong } from "../../interfaces"
import './VideoCard.scss';
import { PlayAction } from "../../redux/actions/playerActions";
import { connect } from "react-redux";

interface VideoCardProps {
    data: ISong,
    onChange?: any,
    PlayAction: any
}

const VideoCard = ({ data, PlayAction }: VideoCardProps) => {
    const handlePlay = () => {
        PlayAction(data)
    }
    return (
        <div className="card video-card card-rect">
            <div className="dynamicShadow" style={{ backgroundImage: "url('" + BASE_URL + data.art + "')" }}></div>
            <div className="card-image video-image card-react">
                <img src={BASE_URL + data.art} alt={data.title} width="100%" />
                <div className="options">
                    <button onClick={handlePlay}>
                        <i className="ui-icon-play"></i>
                    </button>
                    <button>
                        <i className="ui-icon-add"></i>
                    </button>
                </div>
                <span>{data.length}</span>
            </div>
            <h3>{data.title.split('_').join(' ').slice(0, 20) + ' ...'}</h3>
            <h4>{data.album.title}</h4>
        </div>
    )
}

export default connect(null, { PlayAction })(memo(VideoCard));
