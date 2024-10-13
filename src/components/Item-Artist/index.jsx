import classNames from "classnames/bind"
import style from "./Item-Artist.module.scss"
import PropType from "prop-types"
import { useNavigate } from "react-router-dom"
import { ButtonPlay } from "../Button"


const cx = classNames.bind(style)

const ItemArtist = ({ data }) => {
    const navigate = useNavigate()

    const handleNavLinkArtist = () => {
        navigate(`/artist/${data?.id}`)
    }

    return (
        <div className={cx("wrapper")} onClick={handleNavLinkArtist}>
            <div className={cx("image")}  >
                <img src={data?.images[0]?.url} title={data?.name} />
                <div className={cx("btn-playing")}>
                    <ButtonPlay />
                </div>
            </div>
            <div className={cx("title")}>
                {/* <div className={cx("name")}>{data?.name}</div> */}
                <div className={cx("name")}>{data?.name}</div>
                <div className={cx("type")}>{data?.type === "artist" ? "Nghệ sĩ" : ""}</div>
            </div>
        </div>
    )

}

ItemArtist.propTypes = {
    data: PropType.object
}

export default ItemArtist