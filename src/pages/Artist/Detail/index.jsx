import classNames from "classnames/bind"
import style from "./DetailArtist.module.scss"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

import path from "@/routes/path"
import * as apis from "@/apis"
import icons from "@/utils/icons"

import { Heading, ImageColorThief, ListActions } from "@/components"

import { AppearsOn, ListAlbum, RelatedArtists, TrackPopular } from "./Layout"


const { PiSealCheckFill } = icons
const cx = classNames.bind(style)

const DetailArtist = () => {
    const { id } = useParams()
    const [dataArtist, setDataArtist] = useState([])
    const main_color = ImageColorThief(dataArtist?.images?.length > 0 && dataArtist?.images[0]?.url)

    useEffect(() => {
        const getApi = async () => {
            const detail = await apis?.getDetailArtists(id)

            if (detail) {
                setDataArtist(detail?.data)
            }
        }
        getApi()
    }, [id])



    return (
        <div className={cx("wrapper")}>
            <section className={cx("background")}>
                <div className={cx("background-color")} style={{ backgroundColor: main_color }}></div>
                <div className={cx("background-content")}>
                    <div className={cx("info")}>
                        {dataArtist?.images?.length > 0 && <img src={dataArtist?.images[0]?.url} alt={dataArtist?.name} />}
                        <div className={cx("title")}>
                            <span><p><PiSealCheckFill /></p>Nghệ sĩ được xác minh</span>
                            <h2>{dataArtist?.name}</h2>
                            <p className={cx("total_follow")}>{dataArtist?.followers?.total.toLocaleString('de-DE')} người theo dõi</p>
                        </div>
                    </div>
                </div>
                <div className={cx("background-shadow")} style={{ backgroundColor: main_color }} />
            </section>

            <section className={cx("content")}>
                <ListActions non_format />

                <div className={cx("track-popular")}>
                    <Heading title="Phổ biến" non_all />
                    <TrackPopular />
                </div>

                <div className={cx("list-cd")}>
                    <ListAlbum />
                </div>


                <div className={cx("nominated-artist")}>
                    <Heading title="Fan cũng thích" link={path?.related} />
                    <RelatedArtists />
                </div>

                <div className={cx("appears_on")}>
                    <Heading title="Xuất hiện trên" link={path?.appears_on} />
                    <AppearsOn />
                </div>


            </section>
        </div>
    )
}

export default DetailArtist