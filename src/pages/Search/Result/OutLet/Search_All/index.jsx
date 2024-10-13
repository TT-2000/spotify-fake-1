import classNames from "classnames/bind"
import style from "../../Result.module.scss"
import { useEffect, useState } from "react"
import * as apis from "@/apis"
import { Heading, ItemSong, ListItem } from "@/components"
import { useParams } from "react-router-dom"

const cx = classNames.bind(style)

const SearchAll = () => {
    const { value } = useParams()
    const [data, setData] = useState(null)

    useEffect(() => {
        const getApi = async () => {
            if (value !== "") {
                const res = await apis?.getSearchPage(value, 10)
                if (res) {
                    setData(res)
                }
            }
        }
        getApi()
    }, [value])

    return (
        <div className={cx("wrapper")}>
            <section className={cx("list-track")}>
                <Heading title="Bài hát" non_all />
                <div className={cx("list-items")}>
                    {
                        data?.tracks?.items.map((item, index) => {
                            if (index >= 4) return
                            return <ItemSong images={item.album.images} id={item.id} name={item.name} duration={item.duration_ms} key={index} artists={item.artists} non_order />
                        })
                    }
                </div>
            </section>

            <section className={cx("artists")}>
                <Heading title="Nghệ sĩ" non_all />
                <ListItem data={data?.artists?.items} artist />
            </section>
            <section className={cx("Albums")}>
                <Heading title="Album" non_all />
                <ListItem data={data?.albums?.items} />
            </section>
            <section className={cx("playlist")}>
                <Heading title="Playlist" non_all />
                <ListItem data={data?.playlists?.items} />
            </section>
        </div>
    )
}

export default SearchAll