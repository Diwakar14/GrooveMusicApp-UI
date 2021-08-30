import { Palette } from 'color-thief-react';
import React, { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { APIService } from '../../common/Api';
import { BASE_URL } from '../../common/Utility';
import TableRow from '../../components/TableRow/TableRow';
import { ISong } from '../../interfaces';
import './Details.scss';

const Details = () => {
    let apiManager = new APIService();
    let { id, category }: any = useParams();

    const [album, setAlbum] = useState({}) as any;
    const [artist, setArtist] = useState({}) as any;
    const [loading, setLoading] = useState({ album: false, artist: false });

    const getAlbumDetails = async (albumId: string) => {
        setLoading({ ...loading, album: false })
        try {
            let api = await apiManager.get('album/' + albumId)
            if (api.status === 200) {
                setAlbum(api.data);
                setLoading({ ...loading, album: true });
            }
        } catch (error) {
            setLoading({ ...loading, album: true });
        }
    }


    const getArtistDetails = async (albumId: string) => {
        setLoading({ ...loading, artist: false })
        try {
            let api = await apiManager.get('artist/' + albumId)
            if (api.status === 200) {
                setArtist(api.data);
                setLoading({ ...loading, artist: true });
            }
        } catch (error) {
            setLoading({ ...loading, artist: true });
        }
    }


    useEffect(() => {
        if (category === 'album') {
            getAlbumDetails(id);
        } else {
            getArtistDetails(id);
        }
    }, []);
    return (
        <div className="ui-wrapper">
            <Palette src={BASE_URL + album.album_art} colorCount={4} crossOrigin="Anonymous" format="rgbArray">
                {({ data, loading, error }: any) => (
                    <div className="detail-header" style={{ background: `linear-gradient(0deg, rgba(${data?.[2]},0.6), rgba(${data?.[0]},0.8))` }}>
                        <div className="album-image">
                            <img src={BASE_URL + album.album_art} width="100%" alt="loading..." />
                        </div>
                        <div className="content">
                            <h1>{album.name}</h1>
                            <h3>{album.year}</h3>

                            <div className="footer">
                                <button><i className="ui-icon-play me-2"></i> Play All</button>
                                <button><i className="ui-icon-add me-2"></i> Add to Playlist</button>
                            </div>
                        </div>
                    </div>
                )}
            </Palette>

            <div className="all-songs">
                <table>
                    <tbody>
                        {
                            loading
                                ? <Fragment>
                                    {
                                        album?.songs?.map((song: ISong) => (
                                            <TableRow
                                                data={song}
                                                key={song._id}
                                            // onChange={(e: any, data: any) => handleContextMenu(e, data)}
                                            />
                                        ))
                                    }
                                </Fragment>
                                : <div>Loading....</div>
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Details
