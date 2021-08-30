import { memo } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { BASE_URL } from "../../common/Utility";
import { IAlbum } from "../../interfaces"
import './AlbumCard.scss';

interface AlbumCardProps {
    data: IAlbum,
    onChange?: any
}

const AlbumCard = ({ data, onChange }: AlbumCardProps) => {

    return (
        <Link to={`/details/album/${data._id}`}>
            <div className="card album-card">
                <div className="dynamicShadow" style={{ backgroundImage: "url('" + BASE_URL + data.album_art + "')" }}></div>
                <div className="card-image album-image">
                    <img src={BASE_URL + data.album_art} alt={data.name} width="100%" />
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
                <h4>{data.year}</h4>
            </div>
        </Link>

    )
}

export default memo(AlbumCard)
