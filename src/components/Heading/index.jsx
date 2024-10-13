import classNames from "classnames/bind"
import style from "./Heading.module.scss"
import PropType from "prop-types"
import { useNavigate } from "react-router-dom"

const cx = classNames.bind(style)

const Heading = ({ title, non_all = false, link, small = false, big = false, text_item, style_item }) => {
    const navigate = useNavigate()
    const handleClickNav = () => {
        if (link) {
            navigate(link)
        }
    }

    return (
        <div className={cx("wrapper-heading", {
            small: small,
            big: big
        })}>
            <div style={{ flexDirection: style_item === "top" ? "column-reverse" : "column" }} className={cx("title", {
                item: text_item ? true : false
            })}>
                <h2>{title}</h2>
                <p>{text_item}</p>
            </div>
            {!non_all && <button onClick={handleClickNav}>Hiện tất cả</button>}
        </div >
    )
}

Heading.propTypes = {
    title: PropType.string.isRequired,
    non_all: PropType.bool,
    link: PropType.any,
    small: PropType.bool,
    big: PropType.bool,
    text_item: PropType.string,
    style_item: PropType.string
}
export default Heading