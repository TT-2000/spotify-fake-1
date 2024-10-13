import { useEffect, useState } from "react"
import ListItem from "@/components/List-Item"
import * as apis from "@/apis"
import Heading from "@/components/Heading"

const LayoutArtistFollow = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        const getApi = async () => {
            const res = await apis?.getAvoriteArtists()
            if (res) {
                setData(res)
            }
        }
        getApi()
    }, [])

    return (
        <div>
            <Heading title="Nghệ sĩ yêu thích của bạn" />
            <ListItem data={data?.items} artist />
        </div>
    )
}

export default LayoutArtistFollow