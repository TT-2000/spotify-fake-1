import classNames from "classnames/bind"
import style from "./Search.module.scss"
import Genres from "./Genres"
import { useParams } from "react-router-dom"
import ResultSearch from "./Result"

const cx = classNames.bind(style)

const SearchPage = () => {
    const { value } = useParams()

    return (
        <div className={cx("wrapper", {
            genres: value ? false : true
        })}>
            {value ? <ResultSearch /> : <Genres />}
        </div>
    )
}

export default SearchPage