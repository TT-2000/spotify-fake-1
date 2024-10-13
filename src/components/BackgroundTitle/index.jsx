
import classNames from "classnames/bind"
import style from "./BackgroundTitle.module.scss"
import PropType from "prop-types"
import icons from "@/utils/icons"
import useDescription from "@/hook/useDescription"
import { useNavigate } from "react-router-dom"
import moment from "moment";

import { useEffect, useState } from "react"
import TitleWrapper from "../Title-Wrapper"
// import DynamicFont from "@/components/DynamicFont"

const { LuDot, FaSpotify } = icons
const cx = classNames.bind(style)

const BackgroundTitle = ({ color, data }) => {
    const [totalTime, setTotalTime] = useState()
    const navigate = useNavigate()

    const getTime = (time) => {
        let result;
        if (data?.type !== "album") {
            const hour = Math.floor(time / 60)
            const minute = time % 60
            result = `khoảng ${hour} giờ ${hour > 10 ? "" : minute === 0 ? "" : minute} ${hour > 10 ? "" : minute === 0 ? "" : "phút"}`
        }

        return result
    }

    useEffect(() => {
        if (data?.type === "album" && data?.tracks?.items.length < 20) {
            const total = data?.tracks?.items.reduce((acc, curr) => acc + curr.duration_ms, 0)
            let duration = moment.duration(total);
            let minutes = Math.floor(duration.asMinutes());
            let seconds = duration.seconds();
            setTotalTime(`${minutes} phút ${seconds} giây`)
        }
    }, [data])


    const description = useDescription(data?.description)

    return (
        <div className={cx("background", {
            track: data?.type === "track" ? true : false
        })}>
            <div className={cx("background-color")} style={{ backgroundColor: color }} />
            <div className={cx("content")}>
                <div className={cx("background-title")}>
                    {/* Image */}
                    {(data?.type === "playlist" || data?.type === "album") && <img src={data?.images[0]?.url} alt={data?.name} />}
                    {data?.type === "track" && <img src={data?.album?.images[0]?.url} alt={data?.name} />}
                    {/* Title */}
                    <div className={cx("title")}>
                        <h5 className={cx("type", {
                            track: data?.type === "track" ? true : false
                        })}>{data?.type === "track" ? "Bài hát" : data?.type}</h5>


                        {/* <h2 className={cx("name")}>{data?.name}</h2> */}
                        <TitleWrapper title={data?.name} />
                        {/* description */}
                        {!data?.description && ""}
                        {data?.description && <div className={cx("description")}>
                            {
                                data?.description?.includes("href") ? <ul>
                                    {
                                        description?.map((item, index, array) => {
                                            return <li key={index}>
                                                <p onClick={() => item.id && navigate(`/nghe-si/${item.id}`)} className={cx(item.id
                                                    ? "link"
                                                    : "")}>
                                                    {item.name}
                                                </p>
                                                {index < array?.length - 3 ? <span>,</span> : ""}
                                            </li>
                                        })
                                    }

                                </ul> : <p>{data?.description}</p>
                            }
                        </div>}

                        {/* Parameter  playlist/album*/}
                        {(data?.type === "playlist" || data?.type === "album") && <ul>
                            <li className={cx("owner")}>{data?.owner?.display_name === "Spotify"
                                ?
                                <> <span className={cx("logo")}><FaSpotify /></span> {data?.owner?.display_name} </>
                                :
                                data?.type === "album" || data?.type === "track" ? data?.artists[0]?.name : data?.owner?.display_name}</li>

                            <span className={cx("dot")}><LuDot /></span>

                            {data?.followers?.total > 0
                                ? <> <li className={cx("total-follow")}>{data?.followers?.total.toLocaleString('de-DE')} lượt lưu</li> </>
                                : ""}
                            {data?.followers?.total > 0 ? <span className={cx("dot")}><LuDot /></span> : ""}
                            <li className={cx("infomation")}>
                                <span>{data?.tracks.total} bài hát,</span>
                                <span>{data?.type === "album" && data?.tracks?.items.length < 20 ? totalTime : getTime(data?.tracks.total * 3)}</span>
                            </li>
                        </ul>}
                        {/* Parameter  track*/}
                        {data?.type === "track" && <ul>
                            <li className={cx("owner")}>{data?.artists[0]?.name}</li>
                            <span className={cx("dot")}><LuDot /></span>
                            <li onClick={() => navigate(`/album/${data?.album?.id}`)} className={cx("name-song")}>{data?.name}</li>
                            <span className={cx("dot")}><LuDot /></span>
                            <li className={cx("release_date")}>{data?.album?.release_date?.split("-")[0]}</li>
                            <span className={cx("dot")}><LuDot /></span>
                            <li className={cx("duration_ms")}>{moment.utc((data?.duration_ms / 1000) * 60000).format('H:mm')}</li>
                        </ul>}
                    </div>
                </div>
            </div>
            <div className={cx("background-shadow")} style={{ backgroundColor: color }} />
        </div>
    )
}


BackgroundTitle.propTypes = {
    color: PropType.string,
    data: PropType.object,

}
export default BackgroundTitle