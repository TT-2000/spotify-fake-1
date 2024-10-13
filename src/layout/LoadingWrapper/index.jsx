import classNames from "classnames/bind"
import style from "./LoadingWrapper.module.scss"

const cx = classNames.bind(style)

const LoadingWrapper = () => {


    return (
        <div className={cx("wrapper-loading")}>
            <div className={cx("loader")}></div>
        </div>
    )
}

export default LoadingWrapper