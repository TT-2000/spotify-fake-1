import { Swiper, SwiperSlide } from "swiper/react";
import { Grid } from 'swiper/modules';
import "swiper/css";
import 'swiper/css/grid';

import style from "./List-Item.module.scss";
import classNames from "classnames/bind";

import PropType from "prop-types"
import ItemAlbum from "../Item-Album";
import ItemArtist from "../Item-Artist";

import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux"

import { emitter } from '@/emitter';
import { useLocation } from "react-router-dom";
import { Heading } from "..";

const cx = classNames.bind(style);

const responsiveSlide = {
    0: {
        slidesPerView: 2,
    },
    400: {
        isTrue: 2,
        isFalse: 4,
    },
    900: {
        isTrue: 3,
        isFalse: 5,
    },
    1400: {
        isTrue: 4,
        isFalse: 6,
    },
    1800: {
        isTrue: 6,
        isFalse: 8,
    },
    2150: {
        isTrue: 5,
        isFalse: 7,
    },
    2240: {
        isTrue: 6,
        isFalse: 8,
    },
    2500: {
        isTrue: 7,
        isFalse: 9,
    },
}

const ListItem = ({ data, artist = false, non_name = false, grid = false }) => {
    const swiperRef = useRef(null);
    // const { pathname } = useLocation()
    const { isToggleLayoutCurrentSong } = useSelector(store => store.actionOption)
    // const [slice, setSlice] = useState("")

    // useEffect(() => {
    //     const handleSizeChange = () => {
    //         setSlice((responsiveSlide[swiperRef?.current?.swiper?.currentBreakpoint]))
    //     };

    //     emitter.on('sizeChange', handleSizeChange, { passive: false });

    //     return () => {
    //         emitter.off('sizeChange', handleSizeChange);
    //     };
    // }, [pathname, data]);


    const breakpoints = {
        0: {
            slidesPerView: isToggleLayoutCurrentSong ? 2 : 2,
            grid: grid && {
                rows: 10,
                fill: 'row'
            }
        },
        400: {
            slidesPerView: isToggleLayoutCurrentSong ? 2 : 4,
            grid: grid && {
                rows: 10,
                fill: 'row'
            }
        },
        900: {
            slidesPerView: isToggleLayoutCurrentSong ? 3 : 5,
            grid: grid && {
                rows: 10,
                fill: 'row'
            }
        },
        1400: {
            slidesPerView: isToggleLayoutCurrentSong ? 4 : 6,
            grid: grid && {
                rows: 10,
                fill: 'row'
            }
        },
        1800: {
            slidesPerView: isToggleLayoutCurrentSong ? 6 : 8,
            grid: grid && {
                rows: 10,
                fill: 'row'
            }
        },
        2150: {
            slidesPerView: isToggleLayoutCurrentSong ? 5 : 7,
            grid: grid && {
                rows: 10,
                fill: 'row'
            }
        },
        2240: {
            slidesPerView: isToggleLayoutCurrentSong ? 7 : 8,
            grid: grid && {
                rows: 10,
                fill: 'row'
            }
        },
        2500: {
            slidesPerView: isToggleLayoutCurrentSong ? 8 : 9,
            grid: grid && {
                rows: 10,
                fill: 'row'
            }
        },
    }

    return (
        <>
            <div className={cx("wrapper")} id="list-item">
                <Swiper
                    className="mySwiper"
                    key={isToggleLayoutCurrentSong}
                    id={`${grid && "grid"}`}
                    allowSlideNext={false}
                    allowSlidePrev={false}
                    modules={[Grid]}
                    breakpoints={breakpoints}
                    ref={swiperRef}
                >
                    {data &&
                        data.map((item, index) => {
                            return <SwiperSlide key={index}>
                                {artist ? <ItemArtist data={item} /> : <ItemAlbum data={item} non_name={non_name} />}
                            </SwiperSlide>
                        })}
                </Swiper>
            </div >
        </>
    );
};


ListItem.propTypes = {
    data: PropType.array,
    artist: PropType.bool,
    non_name: PropType.bool,
    grid: PropType.bool,

}

export default ListItem;
