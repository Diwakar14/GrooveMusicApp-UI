import { IPlaylist } from '../../interfaces';
import './PlaylistCard.scss';

interface PlaylistCardProps {
    data: IPlaylist,
    onChange?: any
}


const PlaylistCard = ({ data }: PlaylistCardProps) => {
    return (
        <div>
            <div className="card playlist-card card-rect">
                {/* <div className="dynamicShadow" style={{ backgroundImage: "url('../img/" + data.art + "')" }}></div> */}
                <div className="card-image playlist-image card-react">
                    {/* <img src={"../img/" + data.art} alt={data.name} width="100%" /> */}
                    <div className="options">
                        <button>
                            <i className="ui-icon-play"></i>
                        </button>
                        <button>
                            <i className="ui-icon-add"></i>
                        </button>
                    </div>
                </div>
                <h3>{data.name}</h3>
                <h4>{data.noOfSongs ?? 0} Songs</h4>
            </div>
        </div>
    )
}

export default PlaylistCard;
