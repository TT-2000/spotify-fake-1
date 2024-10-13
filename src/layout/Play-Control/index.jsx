import classNames from "classnames/bind"
import style from "./Play-Control.module.scss"
import { useDispatch, useSelector } from "react-redux"
import { actionLayoutCurrentSong } from "@/redux/optionReducer"
import { useEffect, useRef, useState } from "react"
import * as apis from "@/apis"
import icons from "@/utils/icons"
import ListTextArtist from "../../components/ListTextArtist"
import ButtonFollow from "../../components/Button/Follow"
import Progress from "../../components/Progress"
import Volume from "./Volume"


const { AiOutlinePlaySquare,
    HiOutlineQueueList, MdPlayCircle, MdOutlinePauseCircleFilled, FaBackwardStep, FaForwardStep, RiRepeatOneFill, RiRepeat2Line, TiArrowShuffle, BiVolume, BiVolumeFull, BiVolumeLow } = icons
const cx = classNames.bind(style)

const PlayControl = () => {
    const refAudio = useRef()
    const { isToggleLayoutCurrentSong } = useSelector(store => store.actionOption)
    const dispatch = useDispatch()
    const [isPlaying, setIsPlaying] = useState(null);
    // const [audio, setAudio] = useState("")
    const [currentSong, setCurrentSong] = useState("")
    const [duration, setDuration] = useState("")


    useEffect(() => {
        const getApi = async () => {


            const [currenTrack, playing, devices] = await Promise.all([
                apis?.getCurrenTrack(),
                apis?.getPlaying(),
                apis?.getAvailableDevices()
            ])

            if (currenTrack) {
                // console.log(currenTrack)
                setDuration(currenTrack?.item?.duration_ms)
                setCurrentSong(currenTrack)
            } else {
                setCurrentSong(null)
                setDuration(null)
                dispatch(actionLayoutCurrentSong(false))
            }

            console.log(currenTrack)

            if (devices.length > 0) {
                const deviced = devices[0]?.id
                // const track = await apis?.playTrack(deviced, "spotify:track:6IHLOkgZftkcqS3fM0jMCT")
                // const track = await apis?.playTrack(deviced, "spotify:playlist:37i9dQZF1DX2PQDq3PdrHQ")

                // const idplaylist = await apis?.playMusic("7xd2YnMEjqKxaazmvJJrjJ")
                // const playlist = await apis?.playMusic(deviced, "7xd2YnMEjqKxaazmvJJrjJ")

                console.log("ddd", idplaylist)
            } else {

                // window.open('https://open.spotify.com/', '_blank', 'noopener,noreferrer');
            }
        }

        getApi()

        let intervalId
        if (duration) {
            intervalId = setInterval(getApi, duration && duration);
        }

        return () => clearInterval(intervalId);

    }, [duration]);




    const handleClickToggleSidebar = () => {
        if (currentSong) {
            if (isToggleLayoutCurrentSong) {
                dispatch(actionLayoutCurrentSong(false))
            } else {
                dispatch(actionLayoutCurrentSong(true))
            }
        }
    }

    const play = () => {

    }

    const handleClickPrev = async () => {
    }

    const handleClickNext = async () => {
    }

    return (
        <div className={cx("wrapper")}>
            <div className={cx("current-song")}>
                {currentSong &&
                    <>
                        <div className={cx("image")}>
                            <img src={currentSong?.item?.album?.images[1]?.url} alt="" />
                        </div>
                        <div className={cx("title")}>
                            <h5>{currentSong?.item?.name}</h5>
                            <ListTextArtist data={currentSong?.item?.artists} />
                        </div>
                        <ButtonFollow size_icons={18} />
                    </>
                }
            </div>
            <div className={cx("actions", {
                disabled: currentSong ? false : true
            })}>
                <div className={cx("list-actions")}>
                    <button className={cx("shuffle")}>
                        <TiArrowShuffle />
                    </button>
                    <button className={cx("prev")} onClick={handleClickPrev}>
                        <FaBackwardStep />
                    </button>
                    <button className={cx("playing")}>
                        <MdPlayCircle />
                    </button>
                    <button className={cx("next")} onClick={handleClickNext}>
                        <FaForwardStep />
                    </button>
                    <button className={cx("repeat", {
                        active: false
                    })}>
                        <RiRepeat2Line />
                    </button>

                </div>
                <div className={cx("progress")}>
                    <Progress />

                </div>
            </div>
            <div className={cx("options")}>
                <button className={cx("detail_current-song", {
                    active: isToggleLayoutCurrentSong ? true : false,
                    disabled: currentSong ? false : true
                })} onClick={handleClickToggleSidebar}>
                    <AiOutlinePlaySquare />
                </button>

                <button className={cx("playlist")}>
                    <HiOutlineQueueList />
                </button>
                <div className={cx("volumn")}>
                    <Volume />
                </div>
            </div>
            {/* <audio src={audio} ref={refAudio} /> */}

        </div>
    )
}

export default PlayControl