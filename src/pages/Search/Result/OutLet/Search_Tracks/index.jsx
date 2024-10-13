import classNames from "classnames/bind"
import style from "../../Result.module.scss"
import { useEffect, useRef, useState } from "react"
import * as apis from "@/apis"
import icons from "@/utils/icons"

import { useParams } from "react-router-dom"
import { ItemSong } from "@/components"
import { emitter } from '@/emitter';

const { IoTimeOutline } = icons
const cx = classNames.bind(style)

const SearchTracks = () => {
    const { value } = useParams()
    const [data, setData] = useState(null)
    const bar = useRef()
    const [isAtTop, setIsAtTop] = useState(false);

    useEffect(() => {
        const getApi = async () => {
            if (value !== "") {
                const res = await apis?.getSearch(value, "track", 50)
                if (res) {
                    setData(res)
                }
            }
        }
        getApi()
    }, [value])

    useEffect(() => {
        const barRef = bar?.current
        const { top } = barRef.getBoundingClientRect();
        const handleScrollChange = (e) => {
            if (barRef) {
                const distanceTop = top - 50 - 16
                setIsAtTop(e >= distanceTop ? true : false);
            }
        };

        emitter.on('scrollChange', handleScrollChange, { passive: false });

        return () => {
            emitter.off('scrollChange', handleScrollChange);
        };
    }, []);

    return (
        <div className={cx("wrapper-tracks")} >
            <div className={cx("bar", {
                background: true
            })} ref={bar}
                style={{ background: isAtTop ? "rgb(31,31,31)" : "transparent" }}
            >
                <span className={cx("order")}>#</span>
                <span className={cx("title")}>Tiêu đề</span>
                <span className={cx("album")}>Album</span>
                <span className={cx("option")}><IoTimeOutline /></span>
            </div>

            <div className={cx("list-result")}>
                {

                    data?.tracks?.items?.map((item, index) => {
                        return <ItemSong duration={item.duration_ms} order={index} images={item.album.images} name={item.name} id={item.id} artists={item.artists} album={item.album} key={item.id} />
                    })

                }
            </div>
        </div>
    )
}

export default SearchTracks