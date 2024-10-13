import classNames from "classnames/bind"
import style from "./Result.module.scss"
import { Outlet } from "react-router-dom"
import Nav from "./Nav"

const cx = classNames.bind(style)

const ResultSearch = () => {
    return (
        <div className={cx("wrapper")}>
            <Nav />
            {/* <div className={cx("content")}> */}
            <Outlet />
            {/* </div> */}
        </div>
    )
}

export default ResultSearch