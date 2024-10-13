import classNames from "classnames/bind"
import style from "./Nav.module.scss"
import icons from "@/utils/icons"
import { useEffect, useRef, useState } from "react"
import { emitter } from '@/emitter';
import { useLocation, useNavigate, useParams } from "react-router-dom";

const { GrPrevious, GrNext } = icons
const cx = classNames.bind(style)

const list_nav = [
    {
        id: 1,
        title: "Tất cả",
        link: ""
    },
    {
        id: 2,
        title: "Nghệ sĩ",
        link: "artists"
    },
    {
        id: 3,
        title: "Bài hát",
        link: "tracks"
    },
    {
        id: 4,
        title: "Playlist",
        link: "playlists"
    },
    {
        id: 5,
        title: "Album",
        link: "albums"
    },
]

const Nav = () => {
    const { pathname } = useLocation()
    const { value } = useParams()
    const listNav = useRef()
    const buttonPrev = useRef()
    const buttonNext = useRef()
    const [toggleDisable, setToggleDisable] = useState(false)
    const navigate = useNavigate()

    const handlePrev = () => {
        listNav?.current?.scrollBy({
            left: `-${listNav?.current?.offsetWidth}`,
            behavior: 'smooth'
        });
    }

    const handleNext = () => {
        listNav?.current?.scrollBy({
            left: listNav?.current?.offsetWidth,
            behavior: 'smooth'
        });
    }

    useEffect(() => {
        if (listNav?.current?.scrollLeft == 0) {
            buttonPrev.current.style.display = "none"
            buttonNext.current.style.display = "flex"
        }
        const handleScroll = () => {
            if (listNav?.current?.scrollLeft > 0) {
                if (listNav?.current?.scrollLeft > 5 && listNav?.current?.scrollLeft < 140) {
                    buttonNext.current.style.display = "flex"
                    buttonPrev.current.style.display = "flex"
                } else if (listNav?.current?.scrollLeft >= listNav?.current?.scrollWidth - listNav?.current?.offsetWidth) {
                    buttonNext.current.style.display = "none"
                }
            } else if (listNav?.current?.scrollLeft == 0) {
                buttonPrev.current.style.display = "none"
            }

        }
        listNav?.current?.addEventListener('scroll', handleScroll)
        // eslint-disable-next-line react-hooks/exhaustive-deps
        return () => listNav?.current?.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        const handleSizeChange = () => {
            if (listNav?.current?.offsetWidth < listNav?.current?.scrollWidth) {
                setToggleDisable(true)
            } else {
                setToggleDisable(false)
            }
        }
        emitter.on('sizeChange', handleSizeChange, { passive: false })
        return () => {
            emitter.off('sizeChange', handleSizeChange)
        }
    }, [])

    return (
        <div className={cx("wrapper")}>
            <div className={cx("content")}>
                <button ref={buttonPrev} className={cx("prev", {
                    disabled: toggleDisable ? false : true,
                })} onClick={handlePrev}>
                    <GrPrevious />
                </button>
                <div className={cx("list-item")} ref={listNav}>
                    {
                        list_nav?.map((item, index) => <span className={cx("item", {
                            active: pathname?.split("/")?.pop() === item.link ? true : false,
                            activeAll: item.link === "" && pathname?.split("/")?.pop() === value ? true : false
                        })} key={index} onClick={() => navigate(item.link)}>
                            {item.title}
                        </span>)
                    }
                </div>
                <button ref={buttonNext} className={cx("next", {
                    disabled: toggleDisable ? false : true,
                })} onClick={handleNext}>
                    <GrNext />
                </button>
            </div>
        </div>
    )
}

export default Nav