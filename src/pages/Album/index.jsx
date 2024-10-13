
import classNames from "classnames/bind"
import style from "./Album.module.scss"
import * as apis from "@/apis"

import { ListItem, Heading, ImageColorThief, BackgroundTitle, ListActions, ListTrack } from "@/components"

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import LoadingWrapper from "../../layout/LoadingWrapper"
import Date from "@/edit/date"

const cx = classNames.bind(style)

const Album = () => {
    const { id } = useParams()
    const [isLoading, setLoading] = useState(false)
    const [dataAlbum, setDataAlbum] = useState(null)
    const [recommendationAlbum, setRecommendationAlbum] = useState([])
    const main_color = ImageColorThief(dataAlbum?.images[0]?.url)
    const date = Date(dataAlbum?.release_date)

    useEffect(() => {
        setLoading(true)
        const getApi = async () => {
            const res = await apis?.getDetailAlbum(id)
            if (res.data) {
                const idArtist = res?.data?.artists[0]?.id
                const resAlbum = await apis?.getAlbumArtist(idArtist, "album,single", 10)

                if (resAlbum) {
                    const dataRecommendation = resAlbum?.items?.filter((item) => item.id !== id)
                    setRecommendationAlbum(dataRecommendation)
                }
                setDataAlbum(res?.data)
                setLoading(false)
            }
        }
        getApi()
    }, [id])

    return (
        <>
            {isLoading ? <LoadingWrapper /> : <div className={cx("wrapper")}>
                <BackgroundTitle data={dataAlbum} color={main_color ? main_color : ""} />
                <section className={cx("container")}>
                    <ListActions big />
                    <ListTrack data={dataAlbum} Album />
                    <div className={cx("info")}>
                        <span className={cx("release_date")}>
                            {date}
                        </span>
                        <p>
                            <span>{dataAlbum?.copyrights[0]?.type}</span>
                            {dataAlbum?.copyrights[0]?.text}
                        </p>
                        <p>
                            <span>{dataAlbum?.copyrights[1]?.type}</span>
                            {dataAlbum?.copyrights[1]?.text}
                        </p>

                    </div>
                    {recommendationAlbum?.length > 0 && <div className={cx("recommendation-album")}>
                        <Heading title={`Album khác của ${dataAlbum?.artists[0]?.name}`} non_all />
                        <ListItem data={recommendationAlbum} />
                    </div>}
                </section>
            </div >
            }
        </>
    )
}

export default Album