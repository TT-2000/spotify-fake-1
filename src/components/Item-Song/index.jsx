import classNames from "classnames/bind"
import style from "./Item-Song.module.scss"
import { useNavigate } from "react-router-dom"
import PropType from "prop-types"
import icons from "@/utils/icons"
import moment from 'moment';
import ListTextArtist from "../ListTextArtist"

const cx = classNames.bind(style)
const { GoPlusCircle, PiDotsThreeBold } = icons

const ItemSong = ({ images, id, name, duration, artists, order, album, artists_center, big = false, non_order = false }) => {
    const navigate = useNavigate()

    const handleNavTrack = (e) => {
        e.stopPropagation()
        navigate(`/track/${id}`)
    }

    const handleClickAlbum = (e) => {
        e.stopPropagation()
        navigate(`/album/${album.id}`)
    }

    return (
        <div className={cx("wrapper", {
            big: big,
            center: album || artists_center ? true : false,
            non_order: !non_order ? false : true
        })}>
            {!non_order && <div className={cx("order")}>{order + 1}</div>}
            <div className={cx("title")}>
                {images && <img src={images[0]?.url} alt={name} />}
                <div className={cx("info")}>
                    <h5 onClick={handleNavTrack}>{name}</h5>
                    {artists && <ListTextArtist data={artists} />}
                </div>
            </div>
            {artists_center && (
                <div className={cx("center")}>
                    <ListTextArtist data={artists_center} />
                </div>
            )}
            {album && (
                <div className={cx("center")}>
                    <span onClick={handleClickAlbum}>{album.name}</span>
                </div>
            )}
            <div className={cx("action")}>
                <div className={cx("follow")}>
                    <GoPlusCircle />
                </div>
                <span>
                    {moment.utc((duration / 1000) * 60000).format('H:mm')}
                </span>
                <div className={cx("option")}>
                    <PiDotsThreeBold />
                </div>
            </div>
        </div>
    )
}

ItemSong.propTypes = {
    images: PropType.array,
    id: PropType.string,
    name: PropType.string,
    duration: PropType.number,
    artists: PropType.array,
    order: PropType.number,
    album: PropType.object,
    big: PropType.bool,
    non_order: PropType.bool,
    artists_center: PropType.array,
}

export default ItemSong


// sử dụng cho trang nghe si