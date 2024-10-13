import classNames from "classnames/bind"
import style from "./ListTextArtist.module.scss"
import PropType from "prop-types"
import { useNavigate } from "react-router-dom"

const cx = classNames.bind(style)

const ListTextArtist = ({ data }) => {
    const navigate = useNavigate()

    return (
        <div className={cx("artists")}>
            <div className={cx("list")}>
                {
                    data?.map((artist, index) =>
                        <span className={cx("item-artist")} key={index}>
                            <span onClick={() => navigate(`/artist/${artist.id}`)}>{artist.name}</span>
                            <p>,</p>
                        </span>)
                }
            </div>
        </div>
    )
}

ListTextArtist.propTypes = {
    data: PropType.array
}

export default ListTextArtist