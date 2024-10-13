import "./GlobalStyle.scss"
import PropType from "prop-types"

const GlobalStyle = ({ children }) => {
    return <>{children}</>
}

GlobalStyle.propTypes = {
    children: PropType.any
}

export default GlobalStyle