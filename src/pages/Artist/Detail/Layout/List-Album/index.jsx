import * as apis from "@/apis"
import { useEffect, useState } from "react"

import { useParams } from "react-router-dom"
import path from "@/routes/path"

import classNames from "classnames/bind"
import style from "../../DetailArtist.module.scss"
import { ListItem, Heading } from "@/components"

const cx = classNames.bind(style)

const ListAlbum = () => {
    const { id } = useParams()
    const [toggleCd, setToggleCd] = useState("all")
    const [dataArtist, setDataArtist] = useState([])
    const [dataAlbums, setDataAlbums] = useState([])

    const handleClickOptionListEp = (type) => {
        setToggleCd(type)
    }


    useEffect(() => {
        const getApiAlbums = async () => {
            const res = await apis?.getAlbumArtist(id, "single,album", 50)

            if (res) {
                setDataAlbums(res?.items)
            }
        }

        getApiAlbums()
    }, [id])

    useEffect(() => {
        const getApi = async () => {
            const type = toggleCd === "all" ? "single,album" : toggleCd === "album" ? "album" : "single";

            if (type) {
                const res = await apis?.getAlbumArtist(id, type, 10)
                if (res) {
                    setDataArtist(res?.items)
                }
            }
        }
        getApi()

    }, [id, toggleCd])



    return (
        <>
            {dataAlbums?.length > 0 ? <>
                <Heading title="Danh sách đĩa nhạc" link={toggleCd === "all" ? `${path?.discography_artist}/${path?.discography_artist__all}` : toggleCd === "album" ? `${path?.discography_artist}/${path.discography_artist__album}` : `${path?.discography_artist}/${path?.discography_artist__single}`} />
                <ul className={cx("option")}>
                    <li className={cx({ active: toggleCd === "all" ? true : false })} onClick={() => handleClickOptionListEp("all")}>Bản phát hành nổi tiếng</li>
                    {dataAlbums?.find((item) => item.album_group === "album") && <li className={cx({ active: toggleCd === "album" ? true : false })} onClick={() => handleClickOptionListEp("album")}>Album</li>}
                    {dataAlbums?.find((item) => item.album_group === "single") && <li className={cx({ active: toggleCd === "single" ? true : false })} onClick={() => handleClickOptionListEp("single")}>Đĩa đơn và đĩa mở rộng (EP)</li>}
                </ul>

                <ListItem data={dataArtist} />
            </> : ""
            }
        </>
    )
}

export default ListAlbum