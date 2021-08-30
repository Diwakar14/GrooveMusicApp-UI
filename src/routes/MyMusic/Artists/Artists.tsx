import { Fragment, useEffect, useState } from "react";
import { APIService } from "../../../common/Api";
import ArtistCard from "../../../components/ArtistCard/ArtistCard";
import { IArtist } from "../../../interfaces";


const Artists = () => {

    let apiManager = new APIService();
    const [loading, setLoading] = useState(false);
    const [allArtist, setAllArtist] = useState([])

    const getArtist = async () => {
        setLoading(false);
        try {
            let songs = await apiManager.get('/artist');
            setAllArtist(songs.data);
            setLoading(true);
        } catch (error) {
            console.log(error);
        }

    }
    useEffect(() => {
        getArtist();
    }, [])
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {
                loading
                    ? <Fragment>
                        {
                            allArtist.map((artist: IArtist) => <ArtistCard key={artist._id} data={artist} />)
                        }
                    </Fragment>
                    : null
            }

        </div>
    )
}

export default Artists;