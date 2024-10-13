import classNames from "classnames/bind"
import style from "./Item-Library.module.scss"
import PropType from "prop-types"
import { useSelector } from "react-redux"
import icons from "@/utils/icons"
import { useNavigate } from "react-router-dom"

const { LuDot } = icons
const cx = classNames.bind(style)

const ItemLibrary = ({ data, toggle_sidebar }) => {
    const { libraryType } = useSelector(store => store.actionOption)
    const navigate = useNavigate()

    const handleClickNav = () => {
        if (data?.album) {
            navigate(`/album/${data?.album.id}`)
        } else if (data.type === "playlist") {
            navigate(`/playlist/${data?.id}`)
        } else if (data.type === "artist") {
            navigate(`/artist/${data?.id}`)
        } else {
            navigate(``)
        }
    }

    return (
        <div className={cx("wrapper", {
            toggleSidebar: toggle_sidebar ? true : false
        })} onClick={handleClickNav}>
            <div className={cx("content", {
                active: data?.id === "0MaYVXKcyQmyOk4da0UGGp" ? true : false
            })}>
                <div className={cx("image", {
                    artists: data?.type === "artist" ? true : false
                })}>
                    {data?.images && <img src={data?.images[0]?.url} />}
                    {data?.added_at && <img src={data?.album?.images[0]?.url} />}
                </div>
                <div className={cx("title")}>
                    <span className={cx("name")}>{data?.added_at ? data?.album?.name : data?.name}</span>
                    {libraryType ?
                        <>
                            {data?.album && <span className={cx("type")}>
                                {data?.album?.artists[0]?.name}
                            </span>}
                            {data?.type === "playlist" && <span className={cx("type")}>
                                {data?.owner?.display_name}
                            </span>}
                            {data?.type === "artist" && <span className={cx("type")}>Nghễ sĩ</span>}
                        </>
                        : (
                            <>
                                {data?.added_at && <span className={cx("type")}>Album<LuDot />{data?.album?.artists[0]?.name}</span>}
                                {data?.type === "playlist" && <span className={cx("type")}>Danh sách phát<LuDot />{data?.owner?.display_name}</span>}
                                {data?.type === "artist" && <span className={cx("type")}>Nghễ sĩ</span>}
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

ItemLibrary.propTypes = {
    data: PropType.object,
    toggle_sidebar: PropType.bool
}

export default ItemLibrary