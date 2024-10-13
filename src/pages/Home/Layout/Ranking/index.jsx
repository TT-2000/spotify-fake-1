
import { useEffect, useState } from "react"
import ListItem from "@/components/List-Item"
import * as apis from "@/apis"
import Heading from "@/components/Heading"

const LayoutRanking = () => {
    const [data, setData] = useState([])
    const [title, setTitle] = useState("")

    useEffect(() => {
        const getApi = async () => {
            const res = await apis?.getPlaylistsCategory("0JQ5DAudkNjCgYMM0TZXDw")
            setData(res)
            setTitle(res?.message)
        }
        getApi()
    }, [])

    return (
        <div >
            <Heading title={title} />
            <ListItem data={data?.playlists?.items} non_name />
        </div>
    )
}

export default LayoutRanking

