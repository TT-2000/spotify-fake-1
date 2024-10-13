import { useEffect, useState } from "react"
import { Outlet, useParams } from "react-router-dom"
import * as apis from "@/apis"

const PageArtist = () => {
    const { id } = useParams()
    const [nameArtist, setNameArtist] = useState("")

    useEffect(() => {
        const getApi = async () => {
            const res = await apis?.getDetailArtists(id)
            if (res?.data) setNameArtist(res?.data)
        }
        getApi()
    }, [id])

    return (
        <div style={{ width: 100 + "%" }} >
            <Outlet context={{ name: nameArtist?.name, genres: nameArtist?.genres }} />
        </div>
    )
}

export default PageArtist