import { useState, useEffect, Dispatch, SetStateAction, useRef } from "react";
import { motion } from "framer-motion";

//TODO:
// trigger width resizing on cursor
// do dragging effect

const Tab = ({name, setPosition} : {name:string, setPosition: Dispatch<SetStateAction<Position>>}) => {
    const ref = useRef<HTMLLIElement>(null);

    /*
    useEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
            // Extract updated dimensions safely
            const { width, height } = entry.contentRect;
            setDimensions({ width, height });
            
            // Execute your custom logic here
            console.log("Element resized!", width, height);
        }
    })
        */

    return (
        <li 
            ref={ref}
            onMouseEnter={() => {
                if (!ref.current) return;

                const {width} = ref.current.getBoundingClientRect();
                setPosition({
                    width,
                    opacity: 1,
                    left: ref.current.offsetLeft
                });
            }}
            className="relative z-10 block cursor-pointer px-3 py-1.5 
            text-xs text-white mix-blend-difference md:px-5 md:py-3 
            md:text-base">
            {name}
        </li>
    );
};

type Position = {
    left: number;
    width: number;
    opacity: number;
}

const Navbar = () => {
    const [position, setPosition] = useState({
        left: 0,
        width: 0,
        opacity: 0
    })

    return (
        <ul 
            /*
            onMouseLeave={() => {
                setPosition((pv) => ({
                        ...pv,
                        opacity: 0
                    })
                );
    
            }}
            */
            
            className="relative mx-auto flex w-fit border-2 
            border-black bg-white p-1">
            <Tab setPosition={setPosition} name="About" />
            <Tab setPosition={setPosition} name="Projects" />
            <Tab setPosition={setPosition} name="Contact" />
            <Cursor position={position}/>
        </ul>
    );
};

const Cursor = ({position} : {position: Position}) => {
    return (
        <motion.li 
            animate={position}
            className="absolute z-0 w-36 bg-black h-7 md:h-12" />
    );
};

export const NavbarInstance = () => {
    return (
        <Navbar/>
    );
};

