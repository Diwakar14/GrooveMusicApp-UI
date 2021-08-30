import React from 'react';
import { NavLink, Route, Switch, useRouteMatch } from 'react-router-dom';
import Details from '../Details/Details';
import Album from './Album/Album';
import Artists from './Artists/Artists';
import './MyMusic.scss';
import Songs from './Songs/Songs';

const MyMusic = () => {
    let { path, url } = useRouteMatch();

    return (
        <div className="ui-wrapper">
            <header>
                <h1>My Music</h1>
                <ul className="tabs">
                    <li>
                        <NavLink exact to={`${url}`} activeClassName="selectedTab">
                            <h3>Songs</h3>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={`${url}/artists`} activeClassName="selectedTab">
                            <h3>Artist</h3>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={`${url}/album`} activeClassName="selectedTab">
                            <h3>Album</h3>
                        </NavLink>
                    </li>
                </ul>
                <ul className="filter">
                    <li><i className="ui-icon-shuffle"></i><span>Suffle all (1000)</span></li>
                    <li><i className="ui-icon-sorting"></i><span>Sort By: Date Added</span></li>
                    <li><i className="ui-icon-musical"></i><span>Genre: Rock</span></li>
                </ul>
            </header>
            <div className="routes">
                <Switch>
                    <Route exact path={path} component={Songs} />
                    <Route path={path + '/artists'} component={Artists} />
                    <Route path={path + '/album/:albumId'} component={Details} />
                    <Route path={path + '/album'} component={Album} />
                </Switch>
            </div>
        </div>
    )
}

export default MyMusic
