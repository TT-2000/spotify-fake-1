import "react-tippy/dist/tippy.css";
import { Tooltip } from "react-tippy";
import PropType from "prop-types"

const TextPopper = ({ children }) => {
    return (
        <Tooltip
            onHidden
        // html={
        //   <div>
        //     <strong>Hello</strong>
        //   </div>
        // }
        >
            {children}
        </Tooltip>
    );
};


TextPopper.propTypes = {
    children: PropType.any,
}

export default TextPopper;
