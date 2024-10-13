import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
import classNames from "classnames/bind"
import style from "./Home.module.scss"
// import { isPlaying } from "@/redux/playReducer"
// import * as apis from "@/apis"
import {
    Recently, NewReleases,
    Featured,
    ForYou,
    LayoutRanking,
    LayoutArtistFollow,
    LayoutDailyMix,
    LayoutRadioLPopular
} from './Layout';
import { useSelector } from 'react-redux';

const cx = classNames.bind(style)

const Home = () => {
    const { isImageColor } = useSelector(store => store.actionOption)


    useEffect(() => {
        const getApi = async () => {
            // const res = await apis?.getRecommendations("2ksyzVfU0WJoBpu8otr4pz")

            // const res = await apis?.getPlaylistsCategory("0JQ5DAt0tbjZptfcdMSKl3")
        }
        getApi()
    }, []);



    return (
        <>

            <div className={cx("wrapper")} >
                <div className={cx("container")}>
                    <section className={cx("content")}>
                        <Recently />
                        <NewReleases />
                        <LayoutDailyMix />
                        <Featured />
                        <ForYou />
                        <LayoutArtistFollow />
                        <LayoutRadioLPopular />
                        <LayoutRanking />
                    </section>
                </div>
            </div>
        </>
    );
};

export default Home;


