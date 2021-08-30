import { ETIME } from "constants";
import { Fragment, useEffect, useState } from "react";
import { APIService } from "../../common/Api";
import Modal from "../../components/Modal/Modal"
import PlaylistCard from "../../components/PlaylistCard/PlaylistCard"
import { IPlaylist } from "../../interfaces"

const ModalHeader = () => {
    return <div><h3>Add New Playlist</h3></div>
}
const ModalFooter = (props: any) => {
    return <div>
        <button className="btn-primary" onClick={props.handleClose}>Cancel</button>
        <button className="btn-primary" onClick={props.handleOk} >Create</button>
    </div>
}

const Playlists = () => {
    const [showModal, setShowModal] = useState(false);

    let apiManager = new APIService();

    const [loading, setLoading] = useState(false);
    const [playlist, setPlaylist] = useState({ name: '' })
    const [allPlaylist, setAllPlaylist] = useState([]) as any[];


    const handleSubmit = async (e: any) => {
        e.preventDefault();
        let data = new FormData();
        data.append('name', playlist.name)

        try {
            let Playlist = await apiManager.post('playlist', data)
            if (Playlist.status === 200) {
                setAllPlaylist([{ ...Playlist.data }, ...allPlaylist]);
                console.log(Playlist)
                setShowModal(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getPlaylists = async () => {
        setLoading(false);
        try {
            let Playlist = await apiManager.get('playlist')
            if (Playlist.status === 200) {
                setAllPlaylist(Playlist.data);
                console.log(Playlist.data)
                setLoading(true);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getPlaylists();
    }, []);
    return (
        <div className="ui-wrapper">
            <header>
                <h1>My Playlists</h1>
                <ul className="filter">
                    <li onClick={() => setShowModal(true)}><i className="ui-icon-add"></i><span>Add Playlist</span></li>
                    <li><i className="ui-icon-sorting"></i><span>Sort By: Date Added</span></li>
                </ul>
            </header>
            <div className="routes">
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {
                        loading
                            ? <Fragment>
                                {
                                    allPlaylist.map((playlist: IPlaylist) => <PlaylistCard key={playlist._id} data={playlist} />)
                                }
                            </Fragment>
                            : <div>Loading....</div>

                    }
                </div>
            </div>
            <Modal
                header={<ModalHeader />}
                footer={<ModalFooter handleClose={() => setShowModal(false)} handleOk={(e: any) => handleSubmit(e)} />}
                show={showModal}>
                <form onSubmit={handleSubmit}>
                    <input type="text" autoComplete="off" onChange={(e) => setPlaylist({ ...playlist, name: e.target.value })} placeholder="Name of Playlist" name="playlist" id="" />
                </form>
            </Modal>
        </div>
    )
}

export default Playlists
