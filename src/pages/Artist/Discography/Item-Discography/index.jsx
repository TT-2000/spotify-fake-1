import PropType from "prop-types"
import style from "./Item-Discography.module.scss"
import classNames from "classnames/bind"
import icons from "@/utils/icons"
import { useNavigate } from "react-router-dom"

const { LuDot } = icons
const cx = classNames.bind(style)

const ItemDiscography = ({ data }) => {
    const navigate = useNavigate()

    return (
        <div className={cx("wrapper")}>

            <div className={cx("title")}>
                <div className={cx("content")}>
                    <div className={cx("images")}>
                        <img src={data?.images[0]?.url} alt={data?.name} />
                    </div>
                    <div className={cx("info")}>
                        <div className={cx("info-content")}>
                            <div className={cx("top")}>
                                <h2>{data?.name}</h2>
                                <ul>
                                    <li className={cx("type")}>{data?.album_group === "single" ? "Đĩa đơn" : "Album"}</li>
                                    <li className={cx("dot")}><LuDot /></li>
                                    <li className={cx("year")}>{data?.release_date?.split("-")[0]}</li>
                                    <li className={cx("dot")}><LuDot /></li>
                                    <li className={cx("total_name")}>{data?.total_tracks} bài hát</li>
                                </ul>
                            </div>
                            <div className={cx("actions")}>
                            </div>
                        </div>
                        <span className={cx("nav")} onClick={() => navigate(`/album/${data?.id}`)}>
                            Đi tới Album
                        </span>
                    </div>
                </div>
            </div>
            {/* <div className={cx("nav-album")}>
                <span>Đi tới Album</span>
            </div> */}

        </div>
    )
}

ItemDiscography.propTypes = {
    data: PropType.object
}

export default ItemDiscography