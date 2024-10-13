import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import * as apis from "@/apis"
import { Heading, ListItem } from '@/components'
import LoadingWrapper from '@/layout/LoadingWrapper'
import classNames from "classnames/bind"
import style from "../Artist.module.scss"

const cx = classNames.bind(style)

const Related = () => {
    const { id } = useParams()
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const getApi = async () => {
            setIsLoading(true)
            const res = await apis?.getRelatedArtists(id)
            if (res) {
                setData(res?.artists)
                setIsLoading(false)
            }
        }
        getApi()
    }, [id])

    return (
        <>
            {
                isLoading ? <LoadingWrapper /> :
                    <div className={cx("wrapper-page")}>
                        <Heading title="Fan cũng thích" non_all big />
                        <div className={cx("content")}>
                            <ListItem data={data} grid artist />
                        </div>
                    </div>
            }
        </>
    )
}

export default Related