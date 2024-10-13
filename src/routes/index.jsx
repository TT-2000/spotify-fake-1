// import path from "./path"
// import { lazy } from "react"
// // import {
// //     Home,
// //     Genres,
// //     Playlist,
// //     Album,
// //     Track,
// //     PageArtist,
// //     Discography,
// //     DiscographyAll,
// //     DiscographyAlbum,
// //     DiscographySingle,
// //     DetailArtist,
// //     SearchPage,
// //     Related,
// //     SearchAll,
// //     SearchAlbums,
// //     SearchPlaylists,
// //     SearchTracks,
// //     SearchArtists
// // } from "@/pages"

// const Home = lazy(() => import('../pages/Home'));
// const Genres = lazy(() => import('../pages/Genres'));
// const Playlist = lazy(() => import('../pages/Playlist'));
// const Album = lazy(() => import('../pages/Album'));
// const Track = lazy(() => import('../pages/Track'));

// const PageArtist = lazy(() => import('../pages/Artist'));

// const Discography = lazy(() => import('../pages/Artist/Discography'));
// const DiscographyAll = lazy(() => import('../pages/Artist/Discography/All'));
// const DiscographyAlbum = lazy(() => import('../pages/Artist/Discography/Album'));
// const DiscographySingle = lazy(() => import('../pages/Artist/Discography/Single'));
// const Related = lazy(() => import('../pages/Artist/Related'));
// const DetailArtist = lazy(() => import('../pages/Artist/Detail'));


// const SearchPage = lazy(() => import('../pages/Search/SearchPage'));

// const SearchAll = lazy(() => import('../pages/Search/Result/OutLet/Search_All'));
// const SearchAlbums = lazy(() => import('../pages/Search/Result/OutLet/Search_Albums'));
// const SearchPlaylists = lazy(() => import('../pages/Search/Result/OutLet/Search_Playlists'));
// const SearchTracks = lazy(() => import('../pages/Search/Result/OutLet/Search_Tracks'));
// const SearchArtists = lazy(() => import('../pages/Search/Result/OutLet/Search_Artists'));


// // const Home = lazy(() => import('@/pages/Home'))


// const PublicRouter = [
//     { path: path.star, element: Home },
//     { path: path.home, element: Home },
//     { path: path.genres, element: Genres },
//     { path: path.playlist, element: Playlist, layoutScroll: true },
//     { path: path.album, element: Album },
//     { path: path.track, element: Track },
//     {
//         path: path.search, element: SearchPage, children: [
//             { path: path.search_all, element: SearchAll },
//             { path: path.search_tracks, element: SearchTracks, layoutScroll: true },
//             { path: path.search_albums, element: SearchAlbums },
//             { path: path.search_playlists, element: SearchPlaylists },
//             { path: path.search_artists, element: SearchArtists },
//         ]
//     },
//     {
//         path: path.artist, element: PageArtist, children: [
//             { path: path.detail_artist, element: DetailArtist },
//             { path: path.related, element: Related },
//             {
//                 path: path.discography_artist, element: Discography, children: [
//                     { path: "", element: DiscographyAll },
//                     { path: path.discography_artist__all, element: DiscographyAll },
//                     { path: path.discography_artist__single, element: DiscographySingle },
//                     { path: path.discography_artist__album, element: DiscographyAlbum },

//                 ]
//             }
//         ]
//     },



// ]

// export default PublicRouter