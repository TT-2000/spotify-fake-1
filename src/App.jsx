import { Suspense, useEffect, lazy } from "react"
import { Routes, Route, useNavigate } from "react-router-dom"
import {
  Login,
  Callback
} from "./pages"
import Public from "@/layout/Public"
import { handleApiRequest } from "@/apis"
import path from "@/routes/path"

const Home = lazy(() => import('./pages/Home'));
const Genres = lazy(() => import('./pages/Genres'));
const Playlist = lazy(() => import('./pages/Playlist'));
const Album = lazy(() => import('./pages/Album'));
const Track = lazy(() => import('./pages/Track'));
const PageArtist = lazy(() => import('./pages/Artist'));
const Discography = lazy(() => import('./pages/Artist/Discography'));
const DiscographyAll = lazy(() => import('./pages/Artist/Discography/All'));
const DiscographyAlbum = lazy(() => import('./pages/Artist/Discography/Album'));
const DiscographySingle = lazy(() => import('./pages/Artist/Discography/Single'));
const Related = lazy(() => import('./pages/Artist/Related'));
const DetailArtist = lazy(() => import('./pages/Artist/Detail'));
const SearchPage = lazy(() => import('./pages/Search'));
const SearchAll = lazy(() => import('./pages/Search/Result/OutLet/Search_All'));
const SearchAlbums = lazy(() => import('./pages/Search/Result/OutLet/Search_Albums'));
const SearchPlaylists = lazy(() => import('./pages/Search/Result/OutLet/Search_Playlists'));
const SearchTracks = lazy(() => import('./pages/Search/Result/OutLet/Search_Tracks'));
const SearchArtists = lazy(() => import('./pages/Search/Result/OutLet/Search_Artists'));


const App = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const getApi = async () => {
      const res = await handleApiRequest()

      if (res.response.status === 401) {
        navigate("/login")
      }
    }
    getApi()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <Suspense fallback={<div style={{ color: "white" }}>Loading...</div>}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/callback" element={<Callback />} />
        <Route path={path.public} id="path" element={<Public />}>
          <Route path={path.star} element={<Home />} />
          <Route path={path.home} element={<Home />} />
          <Route path={path.playlist} element={<Playlist />} />
          <Route path={path.album} element={<Album />} />
          <Route path={path.track} element={<Track />} />
          <Route path={path.genres} element={<Genres />} />
          <Route path={path.artist} element={<PageArtist />} >
            <Route path={path.detail_artist} element={<DetailArtist />} />
            <Route path={path.related} element={<Related />} />
            <Route path={path.discography_artist} element={<Discography />} >
              <Route path="" element={<DiscographyAll />} />
              <Route path={path.discography_artist__all} element={<DiscographyAll />} />
              <Route path={path.discography_artist__single} element={<DiscographySingle />} />
              <Route path={path.discography_artist__album} element={<DiscographyAlbum />} />
            </Route>
          </Route>

          <Route path={path.search} element={<SearchPage />} >
            <Route path={path.search_all} element={<SearchAll />} />
            <Route path={path.search_tracks} element={<SearchTracks />} />
            <Route path={path.search_albums} element={<SearchAlbums />} />
            <Route path={path.search_playlists} element={<SearchPlaylists />} />
            <Route path={path.search_artists} element={<SearchArtists />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  )
}


export default App


