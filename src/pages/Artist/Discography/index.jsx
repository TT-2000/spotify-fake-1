import { Outlet, useLocation, useNavigate, useOutletContext } from 'react-router-dom'
import classNames from "classnames/bind"
import style from "./Discography.module.scss"
import icons from "@/utils/icons"
import { useDispatch, useSelector } from 'react-redux'

// tippy
import HeadlessTippy from "@tippyjs/react/headless";

import { actionDiscographyFormat } from "@/redux/optionReducer"
import { useState } from 'react'

// import { useEffect, useState } from 'react'

const { GoTriangleDown, AiOutlineUnorderedList, MdGridView, MdOutlineCheck, GoTriangleUp } = icons
const cx = classNames.bind(style)



const Discography = () => {
    const context = useOutletContext()
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const [openPopper, setOpenPopper] = useState(false);
    const { isDiscographyFormat } = useSelector(store => store.actionOption)
    const dispatch = useDispatch()
    const checkAll = pathname.split("/")[pathname.split("/")?.length - 1] === "discography" || pathname.split("/")[pathname.split("/")?.length - 1] === "all"
    const checkAlbum = pathname.split("/")[pathname.split("/")?.length - 1] === "album"
    const checkSingle = pathname.split("/")[pathname.split("/")?.length - 1] === "single"

    const handleFormatColumn = () => {
        if (isDiscographyFormat) {
            dispatch(actionDiscographyFormat(false))
        }
    }

    const handleFormaRow = () => {
        if (!isDiscographyFormat) {
            dispatch(actionDiscographyFormat(true))
        }
    }

    const handleClose = () => {
        setOpenPopper(false);
    };

    const handleClick = () => {
        setOpenPopper((prev) => !prev);
    };



    const handleClickClose = () => {
        setOpenPopper(false);
    }

    const renderResults = (attrs) => (
        <ul className={cx("content_popper")} tabIndex="-1" {...attrs} onClick={handleClickClose}>
            <li
                onClick={() => navigate("all")}
                className={cx({ active: checkAll ? true : false })}
            >Tất cả
                {checkAll ? <MdOutlineCheck /> : ""}
            </li>
            <li
                onClick={() => navigate("album")}
                className={cx({ active: checkAlbum ? true : false })}
            >Album
                {checkAlbum ? <MdOutlineCheck /> : ""}
            </li>
            <li
                onClick={() => navigate("single")}
                className={cx({ active: checkSingle ? true : false })}
            >Đĩa đơn và đĩa mở rộng (EP)
                {checkSingle ? <MdOutlineCheck /> : ""}
            </li>

        </ ul>
    );

    return (
        <div className={cx("wrapper")}>
            <div className={cx("heading-option")}>
                <h2>{context?.name}</h2>
                <div className={cx("options")}>
                    <HeadlessTippy
                        placement={"bottom-start"}
                        interactive
                        visible={openPopper}
                        render={renderResults}
                        onClickOutside={handleClose}
                    >
                        <div className={cx("format__type")} onClick={handleClick}>
                            <span>{checkAll ? "Tất cả" : checkAlbum ? "Album" : "Đĩa đơn và đĩa mở rộng (EP)"}</span>
                            {openPopper ? <GoTriangleUp /> : <GoTriangleDown />}
                        </div>
                    </HeadlessTippy>

                    <div onClick={handleFormatColumn} className={cx("format__layout-column", {
                        active: isDiscographyFormat ? false : true
                    })}>
                        <AiOutlineUnorderedList />
                    </div>
                    <div onClick={handleFormaRow} className={cx("format__layout-row", {
                        active: isDiscographyFormat ? true : false
                    })}>
                        <MdGridView />
                    </div>
                </div>
            </div>
            <div className={cx("content")}>
                <Outlet />
            </div>
        </div>
    )
}

export default Discography