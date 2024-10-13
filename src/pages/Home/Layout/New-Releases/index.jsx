
import { useEffect, useState } from "react"
import classNames from "classnames/bind"
import style from "./Releses.module.scss"
import ListItem from "@/components/List-Item"
import * as apis from "@/apis"
import Heading from "../../../../components/Heading"

const cx = classNames.bind(style)

const NewReleases = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        const getApi = async () => {
            const res = await apis?.getNewReleases()
            setData(res)
        }

        getApi()
    }, [])

    return (
        <div className={cx("wrapper")}>
            <Heading title="Bản phát hành mới" />
            <ListItem data={data?.albums?.items} />
        </div>
    )
}

export default NewReleases