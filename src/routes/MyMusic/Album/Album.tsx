import React, { Fragment, useEffect, useState } from "react";
import { APIService } from "../../../common/Api";
import AlbumCard from "../../../components/AlbumCard/AlbumCard";
import { IAlbum } from "../../../interfaces";
import { albums } from "../../../models/albums";

const Album = () => {
    let apiManager = new APIService();

    const [loading, setLoading] = useState(false);
    const [allAlbums, setAllAlbums] = useState([]) as any[];

    const getAlbums = async () => {
        setLoading(false);
        try {
            let albums = await apiManager.get('album')
            if (albums.status === 200) {
                setAllAlbums(albums.data);
                setLoading(true);
            }
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        getAlbums();
    }, []);
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {
                loading
                    ? <Fragment>
                        {
                            allAlbums.map((album: IAlbum) => <AlbumCard key={album._id} data={album} />)
                        }
                    </Fragment>
                    : <div>Loading....</div>
            }

        </div>
    )
}

export default Album;
