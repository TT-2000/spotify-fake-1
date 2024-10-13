import { Outlet, useLocation } from "react-router-dom"
import Library from "../Library"
import Header from "../Header"
import classNames from "classnames/bind"
import style from "./Public.module.scss"
import PlayControl from "../Play-Control"
import CurrentSong from "../CurrentSong"
import { useSelector } from "react-redux"
import { useRef, useEffect, useState } from "react"
import { emitter } from '@/emitter';
import { useResizeDetector } from 'react-resize-detector';
import LoadingWrapper from "../LoadingWrapper"

const cx = classNames.bind(style)

const Public = () => {
    const { isToggleLayoutCurrentSong } = useSelector(store => store.actionOption)
    const { pathname } = useLocation()
    const { width, ref } = useResizeDetector();
    const [isLoading, setLoading] = useState(false)
    const main_public = useRef()

    useEffect(() => {
        const newSize = { width: width };
        emitter?.emit('sizeChange', newSize);
    }, [width, pathname]);

    const handleScroll = () => {
        if (main_public.current) {
            emitter?.emit('scrollChange', main_public?.current.scrollTop);
        }
    }

    useEffect(() => {
        setLoading(true)
        const currentWrapper = main_public.current;
        currentWrapper.scrollTop = 0
        setLoading(false)
    }, [pathname])

    useEffect(() => {
        const currentWrapper = main_public.current;

        currentWrapper.addEventListener('scroll', handleScroll)

        return () => {
            currentWrapper.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <div className={cx("wrapper")}>
            <div className={cx("header")}>
                <Header />
            </div>
            <section className={cx("container")}>
                <Library />
                <main ref={main_public}>
                    {isLoading ?
                        <LoadingWrapper />
                        :
                        <div className={cx("content")} ref={ref}>
                            <Outlet />
                        </div>
                    }
                </main>
                {<CurrentSong isToggleLayoutCurrentSong={isToggleLayoutCurrentSong} />}
            </section>
            <section className={cx("play-control")}>
                <PlayControl />
            </section>
        </div >
    )
}

export default Public