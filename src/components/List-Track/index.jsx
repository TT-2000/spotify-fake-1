
import classNames from "classnames/bind"
import style from "./List-track.module.scss"
import PropType from "prop-types"
import icons from "@/utils/icons"
import { useLocation, useNavigate } from "react-router-dom"
import moment from 'moment';
import Date from "@/edit/date"
import { useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react"
import { emitter } from '@/emitter';
import ListTextArtist from "../ListTextArtist"

const { IoTimeOutline, GoPlusCircle, PiDotsThreeBold } = icons

const cx = classNames.bind(style)

const ListTrack = ({ data, Album = false }) => {
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const bar = useRef()

    const { isFormatListTrack } = useSelector(store => store.actionOption)
    const [isAtTop, setIsAtTop] = useState(false);


    const handleNavTrack = (item, e) => {
        e.stopPropagation()
        if (Album) {
            navigate(`/track/${item?.id}`)
        } else {
            navigate(`/track/${item?.track?.id}`)
        }
    }

    const handlePlaying = () => {
        // console.log("playlist")
    }


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

    useEffect(() => {
        setIsAtTop(false)
    }, [pathname])

    return (
        <div className={cx("wrapper-list_track")} ref={bar}>
            <div className={cx("bar", {
                abbreviated: isFormatListTrack,
                album: Album
            })}
                style={{ background: isAtTop ? "rgb(31,31,31)" : "transparent" }}
            >
                <div className={cx("order")}>#</div>
                <div className={cx("title")}>Tiêu đề</div>
                {isFormatListTrack && <div className={cx("title")}>Nghệ sĩ</div>}
                {!Album && <div className={cx("album")}>Album</div>}
                {!Album && <div className={cx("day-add")}>Ngày thêm</div>}
                <div className={cx("action")}>
                    <span>
                        <IoTimeOutline />
                    </span>
                </div>
            </div>
            <div className={cx("list-track")}>
                {
                    data?.tracks?.items?.map((item, index) => (
                        <div className={cx("item", {
                            abbreviated: isFormatListTrack,
                            active: false,
                            album: Album
                        })} key={index} onClick={handlePlaying}>

                            <div className={cx("order")}>{index + 1}</div>

                            <div className={cx("title")}>
                                {Album ? "" : <div className={cx("images")}>
                                    {item?.track?.album?.images?.length === 0 ? "" : <img src={item?.track?.album?.images[0]?.url} alt={item?.track?.name} />}
                                </div>}

                                <div className={cx("info")}>
                                    <h5 onClick={(e) => handleNavTrack(item, e)}>{Album ? item.name : item.track?.name}</h5>

                                    <div className={cx("artists")}>
                                        {<ListTextArtist data={(Album ? item : item.track)?.artists} />}
                                    </div>
                                </div>
                            </div>

                            {isFormatListTrack && <ListTextArtist data={(Album ? item : item.track)?.artists} />}

                            {!Album && <div className={cx("album")}>
                                <span>{item.track?.album?.name}</span>
                            </div>}

                            {!Album && <div className={cx("day-add")}>{Date(item.track?.album?.release_date)}</div>}

                            <div className={cx("action")}>
                                <div className={cx("follow")}>
                                    <GoPlusCircle />
                                </div>
                                <span>
                                    {moment.utc(((Album ? item.duration_ms : item.track?.duration_ms) / 1000) * 60000).format('H:mm')}
                                </span>
                                <div className={cx("option")}>
                                    <PiDotsThreeBold />
                                </div>
                            </div>

                        </div>
                    ))
                }
            </div>
        </div>
    )

}

ListTrack.propTypes = {
    data: PropType.any,
    Album: PropType.bool

}

export default ListTrack