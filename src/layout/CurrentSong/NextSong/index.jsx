
import classNames from "classnames/bind"
import style from "./NextSong.module.scss"

import PropType from "prop-types"
import ListTextArtist from "../../../components/ListTextArtist"

const cx = classNames.bind(style)

const NextSong = ({ data }) => {

    return (
        <div className={cx("next-song")}>
            <div className={cx("heading-next_song")}>
                <h4>Tiếp theo trong danh sách chờ</h4>
                <h5 className={cx("show-playlist")}>Mở danh sách chờ</h5>
            </div>
            <div className={cx("item")}>
                <div className={cx("title")}>
                    {/* <img src={theNextSong?.album?.images[1]?.url} alt={theNextSong?.name} /> */}
                    <img src={data?.images} alt={data?.name} />
                    <div className={cx("information")}>
                        <h5>
                            {data?.title}
                        </h5>
                        <ul className={cx("artists")}>

                            <ListTextArtist data={data?.artists} />
                        </ul>
                    </div>
                </div>

                <div className={cx("option")}></div>

            </div>
        </div>
    )
}

NextSong.propTypes = {
    data: PropType.any,
}

export default NextSong

