
import { useEffect, useState } from "react"
import ListItem from "@/components/List-Item"
import * as apis from "@/apis"
import Heading from "@/components/Heading"

const ForYou = () => {
    const [data, setData] = useState([])
    const [title, setTitle] = useState("")

    useEffect(() => {
        const getApi = async () => {
            const res = await apis?.getPlaylistsCategory("0JQ5DAt0tbjZptfcdMSKl3")

            if (res) {
                setData(res)
                setTitle(res?.message)
            }
        }
        getApi()
    }, [])

    return (
        <div >
            <Heading title={title} />
            <ListItem data={data?.playlists?.items} />

        </div>
    )
}

export default ForYou

