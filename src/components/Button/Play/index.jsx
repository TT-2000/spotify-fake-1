import classNames from "classnames/bind"
import style from "./Play.module.scss"
import icons from "@/utils/icons"
import PropType from "prop-types"

const { RiPlayLargeFill, IoIosPause } = icons
const cx = classNames.bind(style)

const ButtonPlay = ({ onClick, big = false, small = false, non_color = false, action = false, custom }) => {
    const props = {
        onClick
    }
    return (
        <button {...props} className={cx("wrapper", {
            big: big,
            small: small,
            non_color: non_color,
            playing: action,
            custom: custom
        })}>
            {action ? <IoIosPause /> : <RiPlayLargeFill />}
        </button>
    )
}

ButtonPlay.propTypes = {
    big: PropType.bool,
    small: PropType.bool,
    non_color: PropType.bool,
    action: PropType.bool,
    onClick: PropType.func
}

export default ButtonPlay