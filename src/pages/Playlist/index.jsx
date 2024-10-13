

import classNames from "classnames/bind"
import style from "./Playlist.module.scss"
import * as apis from "@/apis"

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import LoadingWrapper from "../../layout/LoadingWrapper"

import { ListItem, Heading, ImageColorThief, ListTrack, BackgroundTitle, ListActions } from "@/components"

const cx = classNames.bind(style)

const Playlist = () => {
    const { id } = useParams()
    const [dataPlaylist, setDataPlaylist] = useState(null)
    const [dataRecommendation, setDataRecommendation] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const main_color = ImageColorThief(dataPlaylist?.images[0]?.url)


    useEffect(() => {
        setLoading(true)
        const getApi = async () => {
            const res = await apis?.getDetailPlaylist(id)
            if (res.data) {
                setDataPlaylist(res?.data)
                const firstTrack = res?.data?.tracks?.items[0]
                const resRecommendation = await apis?.getSearch(`${firstTrack?.track?.artists[0]?.name} ${firstTrack?.track?.artists[1]?.name}`, "playlist")
                const dataRecommendation = resRecommendation?.playlists?.items?.filter((item) => item.id !== id && item.owner.id === "spotify")
                if (dataRecommendation) setDataRecommendation(dataRecommendation)
                setLoading(false)
            }
        }
        getApi()
    }, [id])
    return (
        <>
            {isLoading ? <LoadingWrapper /> : <div className={cx("wrapper")} >
                <BackgroundTitle data={dataPlaylist} color={main_color ? main_color : ""} />
                <section className={cx("container")}>
                    <ListActions big />
                    <ListTrack data={dataPlaylist} />
                    {dataRecommendation?.length > 0 && dataPlaylist?.owner?.id === "spotify" && <div className={cx("recommendation-playlist")}>
                        <Heading title="Có thể bạn cũng thích" non_all />
                        <ListItem data={dataRecommendation} non_name />
                    </div>}

                    {dataPlaylist?.owner?.id !== "spotify" && <div className={cx("recommendation-tracks")}>
                        <Heading title="Đề xuất" non_all style_item="bottom" text_item="Dựa trên nội dung có trong danh sách phát này" />
                    </div>}
                </section>

            </div>}
        </>
    )
}

export default Playlist