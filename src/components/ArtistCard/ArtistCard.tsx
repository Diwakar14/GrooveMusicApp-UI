import { memo } from "react"
import { BASE_URL } from "../../common/Utility";
import { IArtist } from "../../interfaces"
import './ArtistCard.scss';


interface ArtistCardProps {
    data: IArtist,
    onChange?: any
}
const ArtistCard = ({ data, onChange }: ArtistCardProps) => {
    return (
        <div className="card artist-card">
            <div className="dynamicShadow" style={{ backgroundImage: "url('" + BASE_URL + data.profile_pic + "')" }}></div>
            <div className="card-image artist-image">
                <img src={BASE_URL + data.profile_pic} alt={data.name} width="100%" />
            </div>
            <h3>{data.name}</h3>
        </div>
    )
}

export default memo(ArtistCard);
