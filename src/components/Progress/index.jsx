import classNames from "classnames/bind"
import style from "./Progress.module.scss"
import { useEffect, useRef, useState } from "react"
import PropType from "prop-types"
const cx = classNames.bind(style)

const Progress = ({ sendData, value_first }) => {
    const [isAction, setIsActions] = useState(false)
    const wrapper = useRef()
    const progress = useRef()
    const thumb = useRef()

    const handleMouseUp = () => {
        const refProgress = progress?.current
        if (refProgress) {
            refProgress.style.background = "white"
        }
        setIsActions(false)
    }

    const handleMouseDown = () => {
        progress.current.style.background = "rgb(29, 149, 29)"
        setIsActions(true)
    }

    const handleMouseMove = (e) => {
        const wrapperProgress = wrapper?.current
        if (isAction) {
            const rect = wrapperProgress?.getBoundingClientRect()
            if (rect) {
                const width = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1)
                thumb.current.style.left = (width * 100 - 1) + "%"
                progress.current.style.width = (width * 100) + "%"
                sendData && sendData(width * 100)
            }
        }
    }

    const handleClickProgress = (e) => {
        const wrapperProgress = wrapper?.current
        const rect = wrapperProgress?.getBoundingClientRect()
        if (rect) {
            const width = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1)
            thumb.current.style.left = (width * 100 - 1) + "%"
            progress.current.style.width = (width * 100) + "%"
            sendData && sendData(width * 100)

        }
    }


    useEffect(() => {
        document.addEventListener('mouseup', handleMouseUp)

        document.addEventListener("mousemove", handleMouseMove)

        return () => document.removeEventListener("mousemove", handleMouseMove)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAction])


    useEffect(() => {
        thumb.current.style.left = (value_first * 100 - 1) + "%"
        progress.current.style.width = (value_first * 100) + "%"
    }, [value_first])

    return (
        <div className={cx("wrapper")} ref={wrapper} onClick={handleClickProgress}>
            <div className={cx("bar-progress")} ref={progress} ></div>
            <div className={cx("thumb")} ref={thumb} onMouseDown={handleMouseDown}></div>
        </div>
    )
}

Progress.propTypes = {
    sendData: PropType.any,
    value_first: PropType.number,
}

export default Progress