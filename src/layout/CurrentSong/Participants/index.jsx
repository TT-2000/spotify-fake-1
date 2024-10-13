

import classNames from "classnames/bind"
import style from "./Paticipants.module.scss"

import PropType from "prop-types"

const cx = classNames.bind(style)

const Participants = ({ data }) => {
    return (
        <div className={cx("participants")}>
            <div className={cx("heading-participants")}>
                <h4>Người tham gia thực hiện</h4>
                <h5 className={cx("show-all")}>Hiện tất cả</h5>
            </div>
            <ul className={cx("list")}>
                {data?.item?.artists?.map((artist) => <li key={artist.id}>
                    <div className={cx("title")}>
                        <h5>{artist.name}</h5>
                        <span>Nghệ sĩ chính</span>
                    </div>
                    <button>Theo dõi</button>
                </li>)}
            </ul>
        </div>
    )
}

Participants.propTypes = {
    data: PropType.any,
}

export default Participants