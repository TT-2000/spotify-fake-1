import * as apis from "@/apis"
import { useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom"
import { ListItem } from "@/components"

const AppearanceArtist = () => {
    const context = useOutletContext()
    const [dataArtist, setDataArtist] = useState([])

    useEffect(() => {
        const getApi = async () => {
            const res = await apis?.getSearch(`${context?.name}`, "playlist")

            if (res) {
                setDataArtist(res?.playlists?.items?.filter((item) => item.owner.id === "spotify"))
            }
        }

        getApi()
    }, [context])

    return (
        <ListItem data={dataArtist && dataArtist} />
    )
}

export default AppearanceArtist