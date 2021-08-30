export interface ISong {
    _id: string,
    title: string,
    album: {
        id: string,
        title: string,
        thumb: string | null
    },
    artist: {
        title: string,
        thumb: string | null
    },
    genre: string,
    year: number,
    length: string,
    disc: number,
    type: string,
    art: string,
    copyrights: string,
    create_date: Date
}
export interface IVideo {
    _id: number | string
    name: string,
    album: string,
    artist: string,
    genre: string,
    year: number,
    time: string,
    art: string
}

export interface IArtist {
    _id: number | string
    name: string,
    profile_pic: string
}
export interface IAlbum {
    _id: string,
    name: string,
    noOfSongs: number,
    album_art: string,
    year?: number,
    composer?: string
}
export interface IRecent {
    id: number | string,
    name: string,
    album: string,
    art: string
}
export interface ILiked {
    id: string,
    title: string,
    album: {
        id: string,
        title: string,
        thumb: string | null
    },
    artist: {
        title: string,
        thumb: string | null
    },
    genre: string,
    year: number,
    length: string,
    disc: number,
    type: string,
    art: string,
    copyrights: string,
    create_date: Date
}

export interface IPlaylist {
    _id: string | number,
    name: string,
    thumb?: string,
    noOfSongs?: number,
}