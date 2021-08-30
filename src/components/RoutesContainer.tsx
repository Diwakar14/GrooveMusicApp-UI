import { Route, Switch } from "react-router-dom"
import Details from "../routes/Details/Details"
import Loved from "../routes/Loved/Loved"
import MyMusic from "../routes/MyMusic/MyMusic"
import MyVideos from "../routes/MyVideos/MyVideos"
import NowPlaying from "../routes/NowPlaying/NowPlaying"
import Playlists from "../routes/Playlists/Playlists"
import RecentPlays from "../routes/RecentPlays/RecentPlays"
import Settings from "../routes/Settings/Settings"
import Modal from "./Modal/Modal"
import Player from "./Player/Player"

const RoutesContainer = () => {
    return (
        <div className="routeContainer ">
            <Switch>
                <Route path={'/music'} component={MyMusic} />
                <Route path={'/details/:category/:id'} component={Details} />
                <Route path={'/recent-plays'} component={RecentPlays} />
                <Route path={'/now-playing'} component={NowPlaying} />
                <Route path={'/loved'} component={Loved} />
                <Route path={'/playlists'} component={Playlists} />
                <Route path={'/videos'} component={MyVideos} />
                <Route path={'/settings'} component={Settings} />
            </Switch>
            <Player />

        </div>
    )
}

export default RoutesContainer
