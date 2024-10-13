import { useEffect, useState } from 'react';
import * as apis from "@/apis"
import classNames from "classnames/bind"
import style from "./Recently.module.scss"
import { ButtonPlay } from '@/components/Button';


// import ImageColorExtractor from '../../../../components/Color-Thief';
// import { useDispatch } from 'react-redux';



const cx = classNames.bind(style)


const COLOR = [
    "rgb(53,33,133)",
    "rgb(237,192,197)",
    "rgb(30,21,16)",
    "rgb(75,61,116)",
    "rgb(230,230,230)",
    "rgb(28,23,21)"
]

const Recently = () => {
    const [dataAlbum, setDataAlbum] = useState([])
    const [color, setColor] = useState(null)


    useEffect(() => {
        const getApi = async () => {
            const res = await apis?.getRecently()

            if (res?.data?.items) {
                const playlistIds = new Array()
                const track = new Array()

                res?.data?.items.forEach(item => {
                    if (item.context && item.context.type === 'playlist') {
                        const playlistUri = item.context.uri;
                        const playlistId = playlistUri.split(':')[2];
                        playlistIds.push({ id: playlistId, date: item.played_at });
                    } else {
                        if (item.track) {
                            track.push({ data: item.track.album, date: item.played_at })
                        }
                    }
                });

                // loại bỏ trùng lặp
                const removeDuplicates = new Map(Array.from(playlistIds).map((item) => [item.id, item]))
                const removeDuplicatesTrack = new Map(Array.from(track).map((item) => [item.data.id, item]))

                // lấy value
                const objectPlaylist = Array.from(removeDuplicates.values());
                const objectTrack = Array.from(removeDuplicatesTrack.values());

                // lặp lấy data playlist
                const dataPl = objectPlaylist?.map(async (item) => {
                    const res = await apis?.getDetailPlaylist(item.id)
                    return { data: res?.data, date: item.date }
                })

                const playlistDetails = await Promise.all(dataPl);

                const dataConcat = playlistDetails.concat(objectTrack)

                setDataAlbum(dataConcat.sort((a, b) => new Date(b.date) - new Date(a.date)))
            }
        }
        getApi()
    }, []);

    const handleHoverItem = (index) => {
        setColor(COLOR[index])
    }

    const handleMouseOver = () => {

    }

    return (
        <>
            <div className={cx("background")} style={{ backgroundColor: color }}></div>
            <div className={cx("wrapper")}>
                <div className={cx("content")}>
                    {
                        dataAlbum?.map((item, index) => {
                            if (index >= 8) return
                            return <div className={cx("item")} key={index} onMouseOut={() => handleHoverItem(index)} onMouseOver={handleMouseOver}>
                                <div className={cx("image")}>
                                    {/* <ImageColorExtractor imageUrl={item.data.images[0]?.url} /> */}
                                    <img src={item.data.images[0]?.url} title={item.data.name} />
                                </div>
                                <div className={cx("title")}>
                                    <span>{item.data.name}</span>
                                    <div className={cx("btn-play")}>
                                        <ButtonPlay small />
                                    </div>
                                </div>

                            </div>
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Recently
