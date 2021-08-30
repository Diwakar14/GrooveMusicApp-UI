import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import './Sidebar.scss';

const Sidebar = () => {
    const [toggle, setToggle] = useState(false)
    const toggleSidebar = () => setToggle(!toggle);
    let history = useHistory();

    const goBack = () => {
        history.goBack();
    }

    return (
        <div className={toggle ? "sidebar ui-wrapper sidebar-collapsed" : "sidebar ui-wrapper"} >
            <div className="sidebar-content">
                <div className="toolbar">
                    <button onClick={goBack}>
                        <i className="ui-icon-back"></i>
                    </button>
                    <div>Groove Music</div>
                </div>
                <div className="sidebar-heading">
                    <button className="menu" onClick={toggleSidebar}>
                        <i className="ui-icon-menu"></i>
                    </button>
                    <button className="search" onClick={toggleSidebar}>
                        <i className="ui-icon-search"></i>
                    </button>
                    <input type="search" placeholder="Search" name="searc" />
                </div>
                <ul>
                    <li>
                        <NavLink to="/music" activeClassName="selected">
                            <i className="ui-icon-music"></i><span>Music</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink exact to="/videos" activeClassName="selected">
                            <i className="ui-icon-cd"></i><span>Videos</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink exact to="/now-playing" activeClassName="selected">
                            <i className="ui-icon-playing"></i><span>Now Playing</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink exact to="/loved" activeClassName="selected">
                            <i className="ui-icon-heart"></i><span>Liked</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink exact to="/recent-plays" activeClassName="selected">
                            <i className="ui-icon-history"></i><span>Recent Plays</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink exact to="/playlists" activeClassName="selected">
                            <i className="ui-icon-playlist"></i><span>Playlists</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink exact to="/settings" activeClassName="selected">
                            <i className="ui-icon-settings"></i><span>Settings</span>
                        </NavLink>
                    </li>
                </ul>
            </div>

        </div>
    )
}

export default Sidebar;
