import classNames from "classnames/bind"
import style from "./Nav-action.module.scss"
import 'swiper/css';
import 'swiper/css/navigation';
import icons from "@/utils/icons"
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionLibraryType } from "@/redux/optionReducer";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper/modules';
import "swiper/css";
import "swiper/css/navigation";

const { GrPrevious, GrNext, HiXMark } = icons
const cx = classNames.bind(style)

const TYPE_NAV = [
    {
        id: 1,
        title: "Playlist",
        type: "playlist",
        children: [
            {
                id: "1p1",
                title: "Do Spotify tạo",
                type: "playlist-spotify",
            },
            {
                id: "1p2",
                title: "Của bạn",
                type: "your-playlist",
            }
        ]
    },
    {
        id: 2,
        title: "Nghệ sĩ",
        type: "artist"
    },
    {
        id: 3,
        title: "Album",
        type: 'album'
    }
]


const NavAction = () => {
    const dispatch = useDispatch()
    const { libraryType } = useSelector(state => state.actionOption)
    const listNav = useRef()
    const [dynamicSlidesPerView, setDynamicSlidesPerView] = useState(1);

    const handleClickClear = () => {
        if (libraryType !== "") {
            dispatch(actionLibraryType(""))
        }
    }

    const handleClickType = (item, children) => {
        if (item === libraryType) {
            if (children) {
                dispatch(actionLibraryType(children))
            } else {

                dispatch(actionLibraryType(""))
            }
        } else {
            dispatch(actionLibraryType(item))
        }
    }


    return (
        <div id="sidebar__nav-action" className={cx("action__nav")}>
            {/* <button className={cx("prev", {
                disabled: true
            })}>
                <GrPrevious />
            </button> */}

            <div className={cx("list-item")} ref={listNav}>
                <Swiper
                    modules={[Navigation]}
                    navigation={{
                        nextEl: ".swiper-next",
                        prevEl: ".swiper-prev",
                    }}
                    slidesPerView={'auto'}
                    watchSlidesProgress={true}
                    className="mySwiper"
                    resistanceRatio={0}
                    centeredSlidesBounds={true}
                    onSlideChange={(swiper) => {
                        setDynamicSlidesPerView(swiper.slidesPerViewDynamic()); // Cập nhật khi slide thay đổi
                    }}>
                    {libraryType && <SwiperSlide >
                        <button className={cx("button-clear")} onClick={handleClickClear}>
                            <HiXMark />
                        </button>
                    </SwiperSlide>}
                    <SwiperSlide className={cx("item-playlist")}>
                        {(libraryType === "" || libraryType.includes("playlists")) && <button className={cx("item", {
                            active: libraryType.includes("playlists") ? true : false
                        })} onClick={() => handleClickType("playlists")}>
                            <span>Danh sách phát</span>
                        </ button>}
                        {(libraryType === "playlists-spotify" || libraryType === "your-playlists") && < button className={cx("button-active")} onClick={() => handleClickType(libraryType === "playlists-spotify" ? "playlists-spotify" : "your-playlists", "playlists")}>
                            {
                                libraryType === "playlists-spotify" ? "Do Spotify tạo" : "Của bạn"
                            }
                        </ button>}
                    </SwiperSlide>
                    {libraryType === "playlists" && <SwiperSlide >
                        <button className={cx("item", {
                            active: libraryType === "playlists-spotify" ? true : false
                        })} onClick={() => handleClickType("playlists-spotify", "playlists")}>
                            <span>Do Spotify tạo</span>
                        </ button>
                    </SwiperSlide>}
                    {
                        libraryType === "playlists" && <SwiperSlide >
                            <button className={cx("item", {
                                active: libraryType === "your-playlists" ? true : false,
                                min_width: true,
                            })} onClick={() => handleClickType("your-playlists", "playlists")}>
                                <span>Của bạn</span>
                            </ button>
                        </SwiperSlide>
                    }
                    {(libraryType === "" || libraryType === "albums") &&
                        <SwiperSlide >
                            <button className={cx("item", {
                                active: libraryType === "albums" ? true : false,
                                min_width: true
                            })} onClick={() => handleClickType("albums")}>
                                <span>Album</span>
                            </ button>
                        </SwiperSlide>
                    }

                    {
                        (libraryType === "" || libraryType === "artists") && <SwiperSlide >
                            <button className={cx("item", {
                                active: libraryType === "artists" ? true : false,
                                min_width: true
                            })} onClick={() => handleClickType("artists")}>
                                <span>Nghệ sĩ</span>
                            </ button>
                        </SwiperSlide>
                    }
                    <div className="swiper-prev">
                        <button>
                            <GrPrevious />
                        </button>
                    </div>

                    <div className="swiper-next">
                        <button>
                            <GrNext />
                        </button>
                    </div>
                </Swiper>
            </div>

            {/* <button className={cx("next", {
                disabled: true
            })}>
                <GrNext />
            </button> */}
        </div >
    )
}

export default NavAction


