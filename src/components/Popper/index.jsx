import "react-tippy/dist/tippy.css";
import { Tooltip } from "react-tippy";

const Popper = ({ children }) => {
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

export default Popper;
