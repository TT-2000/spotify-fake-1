
import classNames from "classnames/bind"
import style from "./Waiting-List.module.scss"

const cx = classNames.bind(style)

const WaitingList = () => {
    return (
        <div className={cx("wrapper")}>
            <ul>
                <li></li>
            </ul>
        </div>
    )
}

export default WaitingList