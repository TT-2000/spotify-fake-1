
import classNames from "classnames/bind"
import style from "./ListActions.module.scss"
import PropType from "prop-types"
import icons from "@/utils/icons"
import { ButtonPlay } from "../Button"
import { useState } from "react"
import ButtonOption from "../Button/Option"
import ButtonFollow from "../Button/Follow"
import { useDispatch, useSelector } from "react-redux"
import { actionFormatListTracks } from "@/redux/optionReducer"
import HeadlessTippy from "@tippyjs/react/headless";

const { PiListDashes, FiPlusCircle, LiaBarsSolid, MdOutlineCheck } = icons
const cx = classNames.bind(style)

const ListActions = ({ data, non_format = false, small = false, big = false, artist = false }) => {
    const [playing, setPlaying] = useState(false)
    const { isFormatListTrack } = useSelector(store => store.actionOption)
    const dispatch = useDispatch()
    const [openPopper, setOpenPopper] = useState(false);

    const handleClickPlaying = () => {
        setPlaying(prev => !prev)
    }

    const handleClose = () => {
        setOpenPopper(false);
    };

    const handleClick = () => {
        setOpenPopper((prev) => !prev);
    };

    const renderResults = (attrs) => (
        <div className={cx("content_popper")} tabIndex="-1" {...attrs} >
            <span className={cx("label")}>Xem dưới dạng</span>
            <span onClick={() => dispatch((actionFormatListTracks(true)))} className={cx("item", {
                active: isFormatListTrack ? true : false
            })}>
                <div>
                    <LiaBarsSolid />
                    Rút gọn
                </div>
                {isFormatListTrack && <MdOutlineCheck />}
            </span>
            <span onClick={() => dispatch(actionFormatListTracks(false))} className={cx("item", {
                active: isFormatListTrack ? false : true
            })}>
                <div>
                    <PiListDashes />
                    Danh sách
                </div>
                {!isFormatListTrack && <MdOutlineCheck />}
            </span>
        </ div >
    );

    return (
        <div className={cx("wrapper-actions")}>
            <ul>
                <li className={cx("btn-playing")} onClick={handleClickPlaying}>
                    <ButtonPlay big={big} small={small} action={playing} />
                </li>
                {artist ?
                    <li className={cx("btn-follow-artist")}></li>
                    :
                    <li className={cx("btn-follow")}>
                        <ButtonFollow />
                    </li>}
                <li className={cx("btn-option")}>
                    <ButtonOption />
                </li>
            </ul>

            <HeadlessTippy
                placement={"bottom-start"}
                interactive
                visible={openPopper}
                render={renderResults}
                onClickOutside={handleClose}
            >
                {!non_format && <div className={cx("format-list")} onClick={handleClick}>
                    <span>{isFormatListTrack ? "Rút gọn" : "Danh sách"}</span>
                    {isFormatListTrack ? <LiaBarsSolid /> : <PiListDashes />}
                </div>}
            </HeadlessTippy>
        </div >

    )
}


ListActions.propTypes = {
    data: PropType.any,
    non_format: PropType.any,
    small: PropType.bool,
    artist: PropType.bool,
    big: PropType.bool,

}
export default ListActions