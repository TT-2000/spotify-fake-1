const path = {
    public: "/",
    star: "*",
    home: "/",
    ranking: "/bang-xep-hang",
    playlist: "/playlist/:id",
    album: "/album/:id",
    track: "/track/:id",
    genres: "/the-loai",
    login: "/login",
    callback: "/callback",

    // search
    search: "/search/:value?",
    search_all: "",
    search_tracks: "tracks",
    search_albums: "albums",
    search_playlists: "playlists",
    search_artists: "artists",

    // nghe si
    artist: "/artist/:id",
    detail_artist: "",

    related: "related",
    discography_artist: "discography",
    discography_artist__album: "album",
    discography_artist__single: "single",
    discography_artist__all: "all"
}

export default path

