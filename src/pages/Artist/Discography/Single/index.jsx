

import classNames from "classnames/bind"
import style from "../Discography.module.scss"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import * as apis from "@/apis"
import { useState } from "react"
import ItemDiscography from "../Item-Discography"
import { useSelector } from "react-redux"
import { ListItem } from "../../../../components"

const cx = classNames.bind(style)

const DiscographySingle = () => {
    const { id } = useParams()
    const { isDiscographyFormat } = useSelector(store => store.actionOption)
    const [data, setData] = useState([])
    useEffect(() => {
        const getApi = async () => {
            const res = await apis?.getAlbumArtist(id, "single")
            if (res) {
                const result = res?.items?.sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
                setData(result)
            }
        }
        getApi()
    }, [id])
    return (
        <div className={cx("wrapper-layout")}>
            <div className={cx("content")}>
                {!isDiscographyFormat ?
                    data?.map((item, index) => <ItemDiscography key={index} data={item} />) :
                    <ListItem data={data} grid />
                }
            </div>
        </div>
    )
}

export default DiscographySingle