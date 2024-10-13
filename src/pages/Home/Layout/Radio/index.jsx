
import { useEffect, useState } from "react"
import ListItem from "@/components/List-Item"
import * as apis from "@/apis"
import Heading from "@/components/Heading"

const LayoutRadioLPopular = () => {
    const [data, setData] = useState([])


    useEffect(() => {
        const getApi = async () => {
            const res = await apis?.getPlaylistsRadio()
            if (res) {
                const data = res?.data?.playlists?.items
                const radioPopular = data?.filter((item) => item.owner.id === "spotify")
                setData(radioPopular)
            }
        }
        getApi()
    }, [])

    return (
        <div >
            <Heading title="Radio phổ biến" />
            <ListItem data={data} non_name />
        </div>
    )
}

export default LayoutRadioLPopular

