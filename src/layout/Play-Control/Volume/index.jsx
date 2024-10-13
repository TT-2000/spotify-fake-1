import classNames from "classnames/bind"
import style from "./Volume.module.scss"
import icons from "@/utils/icons"
import Progress from "../../../components/Progress"
import { useState } from "react"

const { BiVolume, BiVolumeFull, BiVolumeLow } = icons

const cx = classNames.bind(style)

const Volume = () => {
    const [data, setData] = useState(50)
    const [value, setValue] = useState(data)
    const [dataHistory, setDataHistory] = useState([])

    const handleDataChildren = (data) => {
        setData(data)
    }

    const handeClickMuteVolume = () => {
        if (data !== 0) {
            setDataHistory(prev => [...prev, data])
        }

        setData(data === 0 ? dataHistory[dataHistory.length - 1] : 0)
        setValue(data === 0 ? dataHistory[dataHistory.length - 1] : 0)

        if (dataHistory.length > 0) {
            dataHistory.shift()
        }
    }

    return (
        <div className={cx("wrapper")}>
            <span className={cx("icons")} onClick={handeClickMuteVolume}>
                {
                    data >= 80 ? <BiVolumeFull /> : data < 80 && data >= 1 ? <BiVolumeLow /> : <BiVolume />
                }
            </span>
            <div className={cx("progress")}>
                <Progress sendData={handleDataChildren} value_first={value / 100} />
            </div>
        </div>
    )
}

export default Volume