import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import * as apis from "@/apis"
import { Heading, ListItem } from '@/components'
import LoadingWrapper from '@/layout/LoadingWrapper'
import classNames from "classnames/bind"
import style from "../Artist.module.scss"

const cx = classNames.bind(style)

const AppearsOn = () => {
    const context = useOutletContext()
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const getApi = async () => {
            if (context) {
                setIsLoading(true)
                const res = await apis?.getSearch(`${context?.name}`, "playlist")
                if (res) {
                    // const data = res?.playlists?.items?.filter((item) => item.description)
                    setData(res?.playlists?.items)
                    // setData(data)

                }
                setIsLoading(false)
            } else {
                setIsLoading(true)
            }
        }
        getApi()
    }, [context])

    return (
        <>
            {
                isLoading ? <LoadingWrapper /> :
                    <div className={cx("wrapper-page")}>
                        <Heading title="Fan cũng thích" non_all big />
                        <div className={cx("content")}>
                            <ListItem data={data} grid />
                        </div>
                    </div>
            }
        </>
    )
}

export default AppearsOn