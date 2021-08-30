import React from "react"
import AlbumCard from "../../components/AlbumCard/AlbumCard"
import { IRecent } from "../../interfaces"
import { recent } from "../../models/recent"

const RecentPlays = () => {
    return (
        <div className="ui-wrapper">
            <header>
                <h1>Recent Plays</h1>
                <ul className="filter">
                    <li><i className="ui-icon-shuffle"></i><span>Suffle all (1000)</span></li>
                    <li><i className="ui-icon-sorting"></i><span>Sort By: Date Added</span></li>
                    <li><i className="ui-icon-musical"></i><span>Genre: Rock</span></li>
                </ul>
            </header>
            <div className="routes">
                {/* <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {
                        recent.map((recent: IRecent) => <AlbumCard key={recent.id} data={recent} />).reverse()
                    }
                </div> */}
            </div>
        </div>
    )
}

export default RecentPlays
