import * as apis from "@/apis"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ItemSong } from "@/components"
import classNames from "classnames/bind"
import style from "../../DetailArtist.module.scss"

const cx = classNames.bind(style)

const TrackPopular = () => {
    const { id } = useParams()

    const [dataArtist, setDataArtist] = useState([])
    const [toggleShowTracks, setToggleShowTracks] = useState(false)

    useEffect(() => {
        const getApi = async () => {
            const res = await apis?.getArtistTopTrack(id)

            if (res) {
                setDataArtist(res)
            }
        }
        getApi()
    }, [id])

    return (
        <ul>
            {
                dataArtist?.tracks?.map((item, index) => {
                    if (!toggleShowTracks && index >= 5) return
                    return (
                        <ItemSong key={index} images={item.album.images} name={item.name} duration={item.duration_ms} id={item.id} order={index} />
                    )
                })
            }
            <li onClick={() => setToggleShowTracks(prev => !prev)} className={cx("btn_all")}>{toggleShowTracks ? "Ẩn bớt" : "Xem thêm"}</li>
        </ul>
    )
}



export default TrackPopular