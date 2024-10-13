import classNames from "classnames/bind"
import style from "./Item-Album.module.scss"
import PropType from "prop-types"
import icons from "@/utils/icons"
import { useNavigate } from "react-router-dom"
import { ButtonPlay } from "../Button"


const { LuDot } = icons
const cx = classNames.bind(style)

const ItemAlbum = ({ data, non_name = false }) => {
    const navigate = useNavigate()
    const artistDescription = data?.description?.includes("href") && data?.description?.replace(/href=([^>]+)>/g, 'href="$1">')?.replace(/href="spotify:playlist:([^"]+)"/g, 'href="/nghe-si/$1"');

    const handleNavPlaylist = () => {
        navigate(`/${data?.type}/${data?.id}`)
    }

    const handleClickPlaying = (e) => {
        e.stopPropagation()
    }

    return (
        <div className={cx("wrapper", {
            non_name: non_name,
            non_description: data?.description ? false : true
        })} onClick={handleNavPlaylist}>
            <div className={cx("image")}>
                {/* <img src={data?.type === "album" ? data?.images[0]?.url : data?.images[2] ? data?.images[2]?.url : data?.images[0]?.url} title={data?.name} /> */}
                <img src={data?.type === "album" ? data?.images[0]?.url : data?.images[0]?.url} title={data?.name} />
                <div className={cx("btn-playing")} onClick={handleClickPlaying}>
                    <ButtonPlay />
                </div>
            </div>
            <div className={cx("title")}>
                {!non_name && <div className={cx("name")}>{data?.name}</div>}
                <div className={cx("description")}>
                    {data?.description && (data?.description?.includes("href") ? <div className={cx("artists")} dangerouslySetInnerHTML={{ __html: artistDescription }} /> : <p>{data?.description}</p>)}
                    {!data?.description && < ul >
                        <li className={cx("year")}>{data?.release_date?.split("-")[0]}</li>
                        <li className={cx("dots")}><LuDot /></li>
                        <li className={cx("type")}>{data?.album_type === "single" ? "Bài hát" : data?.album_type}</li>
                    </ul>}
                </div>
            </div>
        </div >
    )
}

ItemAlbum.propTypes = {
    data: PropType.object,
    non_name: PropType.bool,
}

export default ItemAlbum