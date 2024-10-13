
import { useEffect, useState } from "react"
import ListItem from "@/components/List-Item"
import * as apis from "@/apis"
import Heading from "@/components/Heading"

const LayoutDailyMix = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        const getApi = async () => {
            const res = await apis?.getPlaylistsCategory("0JQ5DAt0tbjZptfcdMSKl3")

            if (res) {
                const dataDaily = res?.playlists?.items?.filter((item) => item.name.includes("Daily Mix"))

                setData(dataDaily)
            }

        }
        getApi()
    }, [])

    return (
        <div >
            <Heading title="Daily Mix của bạn" />
            <ListItem data={data} non_name />
        </div>
    )
}

export default LayoutDailyMix

"<a href=spotify:playlist:37i9dQZF1EIVyBIq9f8DAH>Charlie Puth</a>, <a href=spotify:playlist:37i9dQZF1EIUSgzQsDFEw1>Maroon 5</a>, <a href=spotify:playlist:37i9dQZF1EIZ1HkjHHzYzZ>Billie Eilish</a> và nhiều hơn nữa"