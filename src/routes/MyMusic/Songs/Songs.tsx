import React, { Fragment, useCallback, useEffect, useState } from "react";
import { APIService } from "../../../common/Api";
import { BASE_URL } from "../../../common/Utility";
import ContextMenu from "../../../components/ContextMenu/ContextMenu";
import TableRow from "../../../components/TableRow/TableRow"
import { ISong } from "../../../interfaces";
import { songs } from "../../../models/songs";
import './Songs.scss';

const Songs = () => {

    let apiManager = new APIService();

    const [xPos, setXPos] = useState("0px");
    const [yPos, setYPos] = useState("0px");
    const [showMenu, setShowMenu] = useState(false);
    const [contextMenu, setContextMenu] = useState({}) as any[];

    const [allMusic, setAllMusic] = useState([]) as any[];
    const [loading, setLoading] = useState(false);

    const handleContextMenu = useCallback(
        (e, data: ISong) => {
            e.preventDefault();

            setXPos(`${e.pageX}px`);
            setYPos(`${e.pageY}px`);
            setContextMenu(data);
            setShowMenu(true);
        },
        [setXPos, setYPos]
    );

    const handleClick = useCallback(() => {
        showMenu && setShowMenu(false);
    }, [showMenu]);

    const getSongs = async () => {
        setLoading(false);
        try {
            let songs = await apiManager.post('/', {});
            setAllMusic(songs.data);
            setLoading(true);
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        getSongs();
    }, []);

    useEffect(() => {
        document.addEventListener("click", handleClick);
        return () => {
            document.addEventListener("click", handleClick);
        };
    });

    return (
        <>
            <table>
                <tbody>
                    {
                        loading
                            ? <Fragment>
                                {
                                    allMusic.map((song: ISong) => (
                                        <TableRow
                                            data={song}
                                            key={song._id}
                                            onChange={(e: any, data: any) => handleContextMenu(e, data)}
                                        />
                                    ))
                                }
                            </Fragment>
                            : <div>Loading....</div>
                    }

                </tbody>
            </table>
            {
                loading
                    ? <ContextMenu showMenu={showMenu} yPos={yPos} xPos={xPos}>
                        <>
                            <div className="heading">
                                <img src={BASE_URL + contextMenu.art} width="100%" alt="loading" />
                                <div>
                                    <p>{contextMenu?.title}</p>
                                    <small>{contextMenu?.artist?.title}</small>
                                </div>
                            </div>

                            <ul>
                                <li>
                                    <i className="ui-icon-play"></i>
                                    <span>Play</span>
                                </li>
                                <li>
                                    <i className="ui-icon-playing"></i>
                                    <span>Queue</span>
                                </li>
                                <li>
                                    <i className="ui-icon-heart"></i>
                                    <span>Like</span>
                                </li>
                                <li>
                                    <i className="ui-icon-add"></i>
                                    <span>Add to</span>
                                </li>
                                <li>
                                    <i className="ui-icon-cd"></i>
                                    <span>Go to Album</span>
                                </li>
                                <li>
                                    <i className="ui-icon-artist"></i>
                                    <span>Go to Artist</span>
                                </li>
                                <li>
                                    <i className="ui-icon-download"></i>
                                    <span>Downloads</span>
                                </li>
                                <li>
                                    <i className="ui-icon-share"></i>
                                    <span>Share</span>
                                </li>
                            </ul>
                        </>
                    </ContextMenu>
                    : null
            }

        </>
    )
}

export default Songs;