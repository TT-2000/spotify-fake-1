import * as apis from "@/apis"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ListItem } from "@/components"

const RelatedArtists = () => {
    const { id } = useParams()

    const [dataArtist, setDataArtist] = useState([])

    useEffect(() => {
        const getApi = async () => {
            const res = await apis?.getRelatedArtists(id)

            if (res) {
                setDataArtist(res)
            }
        }

        getApi()
    }, [id])

    return (
        <ListItem data={dataArtist?.artists} artist />
    )
}


export default RelatedArtists