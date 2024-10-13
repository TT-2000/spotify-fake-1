

import classNames from "classnames/bind"
import style from "../../Result.module.scss"
import { useEffect, useState } from "react"
import * as apis from "@/apis"
import { ListItem } from "@/components"
import { useParams } from "react-router-dom"

const cx = classNames.bind(style)

const SearchPlaylists = () => {
    const { value } = useParams()
    const [data, setData] = useState(null)

    useEffect(() => {
        const getApi = async () => {
            if (value !== "") {
                const res = await apis?.getSearch(value, "playlist", 50)

                if (res) {
                    setData(res)
                }
            }
        }
        getApi()
    }, [value])

    return (
        <div className={cx("wrapper")}>
            <ListItem data={data?.playlists?.items} grid />
        </div>
    )
}

export default SearchPlaylists