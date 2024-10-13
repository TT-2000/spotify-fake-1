import classNames from "classnames/bind"
import style from "./Genres.module.scss"
import { useEffect, useState } from "react"
import * as apis from "@/apis"
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid } from 'swiper/modules';
import "swiper/css";
import 'swiper/css/grid';

// import { emitter } from '@/emitter';

const cx = classNames.bind(style)

const list_color = [
    "rgb(30,50,100)",
    "rgb(96,129,8)",
    "rgb(71,125,149)",
    "rgb(71,125,149)",
    "rgb(230,30,50)",
    "rgb(225,51,0)",
    "rgb(140,103,171)",
    "rgb(255,0,144)",
    "rgb(20,138,6)",
    "rgb(15,115,236)",
    "rgb(140,103,171)",
    "rgb(30,49,100)",
    "rgb(224,18,139)",
    "rgb(0,99,80)",
    "rgb(224,18,139)",
    "rgb(71,125,148)",
    "rgb(233,21,40)",
    "rgb(119,119,119)",
    "rgb(215,64,0)",
    "rgb(186,93,8)",
    "rgb(176,98,56)",
    "rgb(30,49,100)",
    "rgb(140,103,171)",
    "rgb(81,121,161)",
    "rgb(164,103,82)",
    "rgb(220,20,139)",
    "rgb(233,21,40)",
    "rgb(140,103,171)",
    "rgb(176,39,151)",
    "rgb(125,74,50)",
    "rgb(188,89,0)",
    "rgb(164,103,82)",
    "rgb(220,20,139)",
    "rgb(15,115,236)",
    "rgb(232,16,91)",
    "rgb(15,115,236)",
    "rgb(175,39,150)",
    "rgb(176,98,56)",
    "rgb(175,39,150)",
    "rgb(176,98,56)",
    "rgb(225,51,0)",
    "rgb(82,122,161)",
    "rgb(20,138,6)",
    "rgb(229,29,50)",
    "rgb(20,138,6)",
    "rgb(229,29,50)",
    "rgb(186,93,8)",
    "rgb(225,51,0)",
    "rgb(13,114,237)",
    "rgb(15,115,236)",
    "rgb(139,26,50)",
]

const Genres = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        const getApi = async () => {
            const res = await apis?.getCategories()
            if (res) {
                setData(res)
            }
        }
        getApi()
    }, [])

    return (
        <div className={cx("wrapper")}>
            <h4>Duyệt tìm tất cả</h4>
            <Swiper
                className="mySwiper"
                allowSlideNext={false}
                allowSlidePrev={false}
                modules={[Grid]}
                spaceBetween={20}
                grid={{
                    rows: 10,
                    fill: 'row'
                }}
                breakpoints={{
                    0: {
                        slidesPerView: 2,
                        grid: {
                            rows: 10,
                            fill: 'row'
                        }
                    },
                    400: {
                        slidesPerView: 3,
                        grid: {
                            rows: 10,
                            fill: 'row'
                        }
                    },
                    900: {
                        slidesPerView: 3,
                        grid: {
                            rows: 10,
                            fill: 'row'
                        }
                    },
                    1400: {
                        slidesPerView: 4,
                        grid: {
                            rows: 10,
                            fill: 'row'
                        }
                    },
                    1800: {
                        slidesPerView: 5,
                        grid: {
                            rows: 10,
                            fill: 'row'
                        }
                    },
                    2150: {
                        slidesPerView: 5,
                        grid: {
                            rows: 10,
                            fill: 'row'
                        }
                    },
                    2240: {
                        slidesPerView: 5,
                        grid: {
                            rows: 10,
                            fill: 'row'
                        }
                    },
                    2500: {
                        slidesPerView: 6,
                        grid: {
                            rows: 10,
                            fill: 'row'
                        }
                    },
                }}>

                {
                    data?.items?.map((item, index) => {
                        return (
                            <SwiperSlide key={index} style={{ background: list_color[index] }
                            } className={cx("item-genres")} >
                                <h5>{item.name}</h5>
                                <img src={item.icons[0]?.url} alt={item.name} />
                            </SwiperSlide>
                        )
                    })
                }

            </Swiper>
        </div >
    )
}

export default Genres