import React, { Fragment, useEffect, useState } from "react"
import { APIService } from "../../common/Api"
import VideoCard from "../../components/VideoCard/VideoCard"
import { ISong, IVideo } from "../../interfaces"
import { videos } from "../../models/videos"

const MyVideos = () => {
    let apiManager = new APIService();

    const [loading, setLoading] = useState(false);
    const [allVideos, setAllVideos] = useState([]) as any[];

    const getVideos = async () => {
        setLoading(false);
        let filter = new FormData();
        filter.append('type', JSON.stringify(["video"]))
        try {
            let Videos = await apiManager.post('/', filter)
            if (Videos.status === 200) {
                setAllVideos(Videos.data);
                console.log(Videos.data);
                setLoading(true);
            }
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        getVideos();
    }, []);
    return (
        <div className="ui-wrapper">
            <header>
                <h1>My Videos</h1>
                <ul className="filter">
                    <li><i className="ui-icon-shuffle"></i><span>Suffle all (1000)</span></li>
                    <li><i className="ui-icon-sorting"></i><span>Sort By: Date Added</span></li>
                    <li><i className="ui-icon-musical"></i><span>Genre: Rock</span></li>
                </ul>
            </header>
            <div className="routes">
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {
                        loading
                            ? <Fragment>
                                {
                                    allVideos.map((video: ISong) => <VideoCard key={video._id} data={video} />)
                                }
                            </Fragment>
                            : <div>Loading....</div>

                    }
                </div>
            </div>
        </div>
    )
}

export default MyVideos
