import classNames from "classnames/bind"
import style from "./Title-Wrapper.module.scss"
import PropType from "prop-types"
import { useEffect, useRef, useState } from "react"

import { useSelector } from "react-redux";

const cx = classNames.bind(style)


const TitleWrapper = ({ title = "" }) => {
    const { isToggleLayoutCurrentSong } = useSelector(store => store.actionOption)
    // const toggleSize = size - 2
    const [sizeCur, setSizeCur] = useState(3)
    const [sizeToggle, setSizeToggle] = useState(sizeCur)

    const textRef = useRef(null);
    const wrapper = useRef(null);

    useEffect(() => {
        // const rem = window.getComputedStyle(textRef.current)?.fontSize.split("px")?.shift() / 16

        // console.log("rem:", rem)

        // console.log("wrappẻ", wrapper.current.offsetWidth)
        // console.log(textRef.current.offsetWidth)

        // if (title.length > 40) {
        //     setSizeCur(3)
        // }

        if (isToggleLayoutCurrentSong) {
            if ((+textRef.current.offsetWidth + 100) > wrapper.current.offsetWidth) {
                setSizeToggle(sizeCur - 0.8)
            }
        }

    }, [title, isToggleLayoutCurrentSong, sizeCur]);

    return (
        <div className={cx("title")} ref={wrapper}>
            <h4 ref={textRef} style={{ fontSize: isToggleLayoutCurrentSong ? `${sizeToggle}rem` : `${sizeCur}rem` }}>{title}</h4>
        </div>
    )
}


TitleWrapper.propTypes = {
    title: PropType.string
}
export default TitleWrapper