
import * as apis from "@/apis"

import { ListItem, Heading, ImageColorThief, ItemSong, ListActions, BackgroundTitle } from "@/components"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import LoadingWrapper from "@/layout/LoadingWrapper"
import Date from "@/edit/date"

import classNames from "classnames/bind"
import style from "./Track.module.scss"

const cx = classNames.bind(style)

const Track = () => {
    const { id } = useParams()
    const [isLoading, setLoading] = useState(false)
    const [toggleShowTracks, setToggleShowTracks] = useState(false)
    const [dataTrack, setDataTrack] = useState(null)
    const navigate = useNavigate()

    const main_color = ImageColorThief(dataTrack?.detailTrack?.album?.images[0]?.url)
    const date = Date(dataTrack?.detail_album?.release_date)

    useEffect(() => {
        const getApi = async () => {
            setLoading(true)
            // const [detail, recommendations] = await Promise.all([
            //     apis?.getDetailTrack(id),
            //     apis?.getRecommendationsSongs(id)
            // ])

            // console.log(recommendations)


            const [detail] = await Promise.all([
                apis?.getDetailTrack(id),

            ])

            if (detail) {
                const [artists, topTrack, listPopular, album, ep, related_artist, detailAlbum] = await Promise.all([
                    apis?.getArtistsTrack(detail?.artists),
                    apis?.getArtistTopTrack(detail?.artists[0]?.id),
                    apis?.getAlbumArtist(detail?.artists[0]?.id, "single,album", 10),
                    apis?.getAlbumArtist(detail?.artists[0]?.id, "album", 10),
                    apis?.getAlbumArtist(detail?.artists[0]?.id, "single", 10),
                    apis?.getRelatedArtists(detail?.artists[0]?.id, 10),
                    apis?.getDetailAlbum(detail?.album?.id),
                ])

                if (artists) {
                    setDataTrack({
                        detailTrack: detail,
                        // recommendationstrack: recommendations,
                        artists: artists,
                        topTrack: topTrack,
                        listPopular: listPopular,
                        album: album,
                        single: ep,
                        related_artists: related_artist,
                        detail_album: detailAlbum?.data
                    })

                    setLoading(false)
                }

            }
        }
        getApi()
    }, [id])


    const handleShowAll = () => {
        setToggleShowTracks(prev => !prev)
    }


    return (
        <>
            {isLoading ? <LoadingWrapper /> :
                <div className={cx("wrapper")} >
                    <BackgroundTitle data={dataTrack?.detailTrack} color={main_color ? main_color : ""} />
                    <div className={cx("container")}>
                        <ListActions non_format />
                        <section className={cx("artists")}>
                            {
                                dataTrack?.artists?.map((artist, index) => {
                                    return (
                                        <div key={index} className={cx("item-artist")}>
                                            <img src={artist.images[0]?.url} alt={artist.name} />
                                            <div className={cx("title")}>
                                                <span>Nghệ sĩ</span>
                                                <h5>{artist.name}</h5>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </section>
                        {/* <section className={cx("recommendation-tracks")}>
                        </section> */}
                        <section className={cx("list-song_artist")}>
                            <Heading title={dataTrack?.detailTrack?.artists[0]?.name || ""} text_item="Các bản nhạc thịnh hành của" style_item={"top"} non_all />
                            <ul>
                                {
                                    dataTrack?.topTrack?.tracks?.map((item, index) => {
                                        if (!toggleShowTracks && index > 5) return
                                        return (
                                            <ItemSong key={index} order={index} name={item.name} images={item.album.images} duration={item.duration_ms} id={item.id} artists={item.artists} />
                                        )
                                    })
                                }
                                <li onClick={handleShowAll} className={cx("btn_all")}>{toggleShowTracks ? "Ẩn bớt" : "Xem thêm"}</li>
                            </ul>
                        </section>
                        <section className={cx("list_album-ep")}>
                            <Heading title={`Các bản phát thịnh hành của ${dataTrack?.detailTrack?.artists[0]?.name}`} />
                            <ListItem data={dataTrack?.listPopular?.items} />
                        </section>

                        <section className={cx("list_album-popular")}>
                            <Heading title={`Các album nổi tiếng của ${dataTrack?.detailTrack?.artists[0]?.name}`} />
                            <ListItem data={dataTrack?.album?.items} />
                        </section>


                        <section className={cx("list_ep-popular")}>
                            <Heading title={`Các đĩa đơn và EP thịnh hành của ${dataTrack?.detailTrack?.artists[0]?.name}`} />
                            <ListItem data={dataTrack?.single?.items} />
                        </section>
                        {<section className={cx("list_album-feature")}>

                        </section>}

                        <section className={cx("nominated-artist")}>
                            <Heading title="Fan cũng thích" />
                            <ListItem data={dataTrack?.related_artists?.artists} artist />
                        </section>

                        <section className={cx("album-track")}>
                            <div className={cx("heading-ep")} onClick={() => navigate(`/album/${dataTrack?.detail_album?.id}`)}>
                                <img src={dataTrack?.detail_album?.images[0]?.url} alt={dataTrack?.detail_album?.name} />
                                <ul>
                                    <span>Từ Album</span>
                                    <h4>{dataTrack?.detail_album?.name}</h4>
                                </ul>
                            </div>

                            <ul>
                                {dataTrack?.detail_album?.tracks?.items?.map((item, index) => {
                                    return <ItemSong key={index} order={index} big name={item.name} duration={item.duration_ms} id={item.id} artists_center={item.artists} />
                                })}
                            </ul>

                        </section>
                        <section className={cx("info")}>

                            <span className={cx("release_date")}>
                                {date}
                            </span>
                            <p>
                                <span>{dataTrack?.detail_album?.copyrights[0]?.type}</span>
                                {dataTrack?.detail_album?.copyrights[0]?.text}
                            </p>
                            <p>
                                <span>{dataTrack?.detail_album?.copyrights[1]?.type}</span>
                                {dataTrack?.detail_album?.copyrights[1]?.text}
                            </p>

                        </section>
                    </div>
                </div>
            }
        </>

    )
}

export default Track