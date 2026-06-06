import { useState, useEffect, Dispatch, SetStateAction, useRef } from "react";
import { motion } from "framer-motion";

//TODO:
// trigger width resizing on window resize
// do dragging effect

const Tab = ({name, setPosition, onClick} : {name:string, setPosition: Dispatch<SetStateAction<Position>>, onClick: () => void}) => {
    const ref = useRef<HTMLLIElement>(null);

    return (
        <li 
            ref={ref}
            onClick={onClick}
            onMouseEnter={() => {
                let offset = 0;

                if (!ref.current) return;

                const {width} = ref.current.getBoundingClientRect();
                setPosition({
                    width: width - offset,
                    opacity: 1,
                    left: ref.current.offsetLeft + offset / 2
                });
            }}
            className="relative z-10 block cursor-pointer px-3 py-1.5 
            text-xs text-black
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

const Navbar = ({setContent} : {setContent: Dispatch<SetStateAction<number>>}) => {
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
            
            className="relative mx-auto flex w-fit bg-white p-1">
            <Tab setPosition={setPosition} name="About" onClick={() => setContent(0)}/>
            <Tab setPosition={setPosition} name="Projects" onClick={() => setContent(1)}/>
            <Tab setPosition={setPosition} name="Contact" onClick={() => setContent(2)}/>
            <Cursor position={position}/>
        </ul>
    );
};

const Cursor = ({position} : {position: Position}) => {
    return (
        <motion.li 
            animate={position}
            className="absolute mt-8 z-0 w-36 bg-black h-px" />
    );
};

export const NavbarInstance = ({setContent} : {setContent: Dispatch<SetStateAction<number>>}) => {
    return (
        <Navbar setContent={setContent}/>
    );
};

