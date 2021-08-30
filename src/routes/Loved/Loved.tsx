import React from "react"
import TableRow from "../../components/TableRow/TableRow"
import { ILiked } from "../../interfaces"
import { liked } from "../../models/liked"

const Loved = () => {
    const handleContextMenu = (e: any, data: any) => {

    }
    return (
        <div className="ui-wrapper">
            <header>
                <h1>Liked</h1>
                <ul className="filter">
                    <li><i className="ui-icon-shuffle"></i><span>Suffle all (1000)</span></li>
                    <li><i className="ui-icon-sorting"></i><span>Sort By: Date Added</span></li>
                </ul>
            </header>
            <div className="routes">
                <table>
                    <tbody>
                        {
                            liked.map((likedSong: any) => (
                                <TableRow
                                    data={likedSong}
                                    key={likedSong.id}
                                // onChange={(e: any, data: any) => handleContextMenu(e, data)}
                                />
                            )).reverse()
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Loved
