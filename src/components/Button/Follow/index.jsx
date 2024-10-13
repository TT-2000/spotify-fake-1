import classNames from "classnames/bind"
import style from "./Follow.module.scss"
import icons from "@/utils/icons"
import PropType from "prop-types"

const cx = classNames.bind(style)
const { FiPlusCircle, MdCheckCircle } = icons

const ButtonFollow = ({ data, text = false, size_icons }) => {


    return (
        <>
            {text && <div className={cx("wrapper-text")}></div>}
            {!text && <div className={cx("wrapper-icons")} >
                {<FiPlusCircle size={size_icons} />}
            </div>}
        </>
    )
}

ButtonFollow.propTypes = {
    text: PropType.bool,
    data: PropType.any,
}

export default ButtonFollow