import classNames from "classnames/bind"
import style from "./Header.module.scss"
import icons from "@/utils/icons"
import { useLocation, useNavigate } from "react-router-dom"
import Search from "./Search"
import { useEffect, useState } from "react"
import * as apis from "@/apis"

const { PiHouse, PiHouseFill, FaSpotify, GoBell, GoBellFill } = icons
const cx = classNames.bind(style)

const Header = () => {
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const [dataUser, setDataUser] = useState([])

    useEffect(() => {
        const getApi = async () => {
            const res = await apis?.getUser()

            if (res) {
                setDataUser(res)
            } else {
                setDataUser([])
            }
        }

        getApi()
    }, [])


    return (
        <div className={cx("wrapper")}>
            <div className={cx("logo")}>
                <FaSpotify />
            </div>
            <div className={cx("menu")}>
                <button onClick={() => navigate("/")} className={cx("button-home", {
                    active: pathname === "/" ? true : false
                })}>
                    {pathname === "/" ? <PiHouseFill /> : <PiHouse />}
                </button>
                <Search />
            </div>
            <div className={cx("option")}>
                <div className={cx("bell")}><GoBell /></div>
                <button className={cx("button-user")}>
                    {
                        dataUser?.images?.length > 0 ?
                            <img src={dataUser?.images[1]?.url} alt={dataUser?.display_name} />
                            : <span className={cx("image-custom")}>
                                {dataUser?.display_name?.split(" ")?.pop()?.charAt(0)?.toUpperCase()}
                            </span>
                    }
                </button>
            </div>
        </div>
    )
}

export default Header