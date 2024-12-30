import { useState, useRef, useEffect } from 'react';

function Navbar() {
    const navbarRef = useRef<HTMLDivElement | null>(null);
    const navbarWrapperRef = useRef<HTMLDivElement | null>(null);

    const [selectorState, setSelectorState] = useState({
        left: 12,
        right: 76,
    });

    const [selectorStateHard, setSelectorStateHard] = useState({
        left: 12,
        right: 76,
    });

    function mouseEnterNavButton(e: React.MouseEvent<HTMLDivElement>) {
        e.preventDefault();
        const target = e.currentTarget;

        if (navbarWrapperRef.current) {
            const offsetLeft = navbarWrapperRef.current.offsetLeft;
            if (e.clientX - offsetLeft < selectorState.left) {
                setSelectorState({
                    left: target.offsetLeft,
                    right: selectorState.right,
                });
            } else if (e.clientX > selectorState.right) {
                setSelectorState({
                    left: selectorState.left,
                    right: target.offsetLeft + target.offsetWidth,
                });
            }
        }
    }

    function mouseLeaveNavButton() {
        setSelectorState(selectorStateHard);
    }

    function clickNavButton(e: React.MouseEvent<HTMLDivElement>, name: string) {
        e.preventDefault();
        const target = e.currentTarget;

        if (navbarRef.current) {
            const x = target.offsetLeft - navbarRef.current.offsetLeft;
            setSelectorState({
                left: x,
                right: x + target.offsetWidth,
            });

            setSelectorStateHard({
                left: x,
                right: x + target.offsetWidth,
            });

            console.log('clicked ', name);

            navbarWrapperRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }

    useEffect(() => {
        if (navbarRef.current) {
            const offsetLeft = navbarRef.current.offsetLeft;
            setSelectorStateHard((prev) => ({
                ...prev,
                left: offsetLeft + 5,
            }));
            setSelectorState((prev) => ({
                ...prev,
                left: offsetLeft + 5,
            }));
        }
    }, []);

    return (
        <div id="navbar-wrapper">
            <div id="navbar-container" ref={navbarWrapperRef}>
                <div id="navbar" className="bg-white" ref={navbarRef}>
                    {['HOME', 'ABOUT', 'PROJECTS', 'RESUME + CONTACT'].map((label, index) => (
                        <div
                            key={index}
                            className="item font-bold"
                            onClick={(e) => clickNavButton(e, label.toLowerCase())}
                            onMouseEnter={(e) => mouseEnterNavButton(e)}
                            onMouseLeave={mouseLeaveNavButton}
                        >
                            {label}
                        </div>
                    ))}
                </div>
                <div
                    id="navbar-selector"
                    className="mt-1 pt-6 pb-6"
                    style={{
                        width: `${selectorState.right - selectorState.left}px`,
                        height: '10px',
                        marginLeft: `${selectorState.left}px`,
                    }}
                ></div>
            </div>
        </div>
    );
}

export default Navbar;
