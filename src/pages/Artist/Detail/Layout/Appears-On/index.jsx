import * as apis from "@/apis"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ListItem } from "@/components"

const AppearsOn = () => {
    const { id } = useParams()
    const [dataArtist, setDataArtist] = useState([])

    useEffect(() => {
        const getApi = async () => {
            const res = await apis?.getAlbumArtist(id, "appears_on", 10)

            if (res) {
                setDataArtist(res)
            }
        }

        getApi()
    }, [id])

    return (
        <ListItem data={dataArtist?.items} />
    )
}

export default AppearsOn