import classNames from "classnames/bind"
import style from "./Option.module.scss"
import icons from "@/utils/icons"
import PropType from "prop-types"

const { PiDotsThreeBold } = icons
const cx = classNames.bind(style)

const ButtonOption = ({ big = false }) => {
    return (
        <div className={cx("wrapper", {
            big: big
        })}>
            <PiDotsThreeBold />
        </div>
    )
}

ButtonOption.propTypes = {
    big: PropType.bool,
}

export default ButtonOption