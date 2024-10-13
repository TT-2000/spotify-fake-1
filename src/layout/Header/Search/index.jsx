import classNames from "classnames/bind"
import style from "./Search.module.scss"
import icons from "@/utils/icons"
import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react"

const { GoSearch, TbAppWindow, TbAppWindowFilled, HiXMark } = icons
const cx = classNames.bind(style)

const Search = () => {
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const [value, setValue] = useState("")
    const [valueDelay, setValueDelay] = useState("")
    const inputRef = useRef()

    useEffect(() => {
        const result = setTimeout(() => setValueDelay(value), [1000])
        return () => clearTimeout(result)
    }, [value])

    useEffect(() => {
        // const valueNav = valueDelay === "" ? "search" : `search/${valueDelay}`
        if (valueDelay !== "") {
            navigate(`search/${valueDelay}`)
        } else if (pathname?.includes("search")) {
            navigate("search")
        }


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [valueDelay])

    const handleChangeValue = (e) => {
        const text = e.target.value
        setValue(text)
    }

    const handelClickClear = () => {
        setValue("")
        inputRef.current.focus();
    }

    const handleClickNav = () => {
        if (!pathname.includes("search")) {
            navigate(`/search`)
        }
    }

    return (
        <div className={cx("wrapper")} onClick={handleClickNav}>
            <button className={cx("button-search")} >
                <GoSearch />
            </button>
            <input
                ref={inputRef}
                type="text"
                value={value}
                onChange={handleChangeValue}
                placeholder="Bạn muốn phát nội dung gì?"
            />
            {value.length > 0
                ?
                <button onClick={handelClickClear} className={cx("button-clear")}><HiXMark /></button>
                :
                <div className={cx("button-browse", {
                    active: pathname.includes("search") ? true : false
                })} >
                    {pathname.includes("search") ? <TbAppWindowFilled /> : <TbAppWindow />}
                </div>}
        </div>
    )
}

export default Search