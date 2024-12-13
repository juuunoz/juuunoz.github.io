import { useState, useRef, useEffect } from 'react'
import { NavbarObject } from './navbar-interface';

//TODO: Figure out how to make this sticky when we scroll past it
//TODO: Make selector right value responsive to the size of the first element in navbar

function Navbar() {

    const navbarRef = useRef<NavbarObject>(null);
    const navbarWrapperRef = useRef<NavbarObject>(null)

    const [selectorState, setSelectorState] = useState({
        left: 12,
        right: 75 
    });

    const [selectorStateHard, setSelectorStateHard] = useState({
        left: 12,
        right: 75
    });

    function mouseEnterNavButton(e: MouseEvent) {
        e.preventDefault();

        if (e.clientX - navbarWrapperRef.current.offsetLeft < selectorState.left) {
            setSelectorState({
                left: e.target.offsetLeft,
                right: selectorState.right
            });
        } else if (e.clientX > selectorState.right) {
            setSelectorState({
                left: selectorState.left,
                right: e.target.offsetLeft + e.target.offsetWidth
            });
        }
    }

    function mouseLeaveNavButton(e: MouseEvent) {
        setSelectorState(selectorStateHard);
    }

    function clickNavButton(e: MouseEvent) {
        e.preventDefault();
        let x = e.target.offsetLeft - navbarRef.current.offsetLeft;
        setSelectorState({
            left: x,
            right: x + e.currentTarget.offsetWidth
        });

        setSelectorStateHard({
            left: x,
            right: x + e.currentTarget.offsetWidth
        });
    }

    /* TODO: Turn the navigation bar labels into a component */
    /*
    function NavbarItem(label: string) {

        return(
            <div
                className="item"
                id={label}
                onClick={(e) => clickNavButton(e)}
                onMouseEnter={(e) => mouseEnterNavButton(e)}
                onMouseLeave={(e) => mouseLeaveNavButton(e)}
            >
                {label}
            </div>
        )
    }
    */

    /*
    window.onscroll = () => {
        stickyOrNot();
    }
    */

    useEffect(() => {
        setSelectorStateHard({
            left: navbarRef.current.offsetLeft + 5,
            right: selectorState.right
        })

        setSelectorState({
            left: navbarRef.current.offsetLeft + 5,
            right: selectorState.right
        })
     }, []);

    return (
      <div id="navbar-wrapper">
          <div id="navbar-container" className="" ref={navbarWrapperRef}>
                <div id="navbar" ref={navbarRef}>
                    <div
                        className="item"
                        id="home"
                        onClick={(e) => clickNavButton(e)}
                        onMouseEnter={(e) => mouseEnterNavButton(e)}
                        onMouseLeave={(e) => mouseLeaveNavButton(e)}
                    >
                        HOME
                    </div>
                    <div
                        className="item"
                        id="code"
                        onClick={(e) => clickNavButton(e)}
                        onMouseEnter={(e) => mouseEnterNavButton(e)}
                        onMouseLeave={(e) => mouseLeaveNavButton(e)}
                    >
                        PROJECTS
                    </div>
                    <div
                        className="item"
                        id="resume+contact"
                        onClick={(e) => clickNavButton(e)}
                        onMouseEnter={(e) => mouseEnterNavButton(e)}
                        onMouseLeave={(e) => mouseLeaveNavButton(e)}
                    >
                        RESUME + CONTACT
                    </div>
                </div>
                <div
                    id="navbar-selector"
                    className="mt-1 pt-6 pb-6"
                    style={{
                        width: selectorState.right - selectorState.left + "px",
                        height: "10px",
                        marginLeft: selectorState.left + "px"
                    }}
                ></div>
          </div>
      </div>
  );

}

export default Navbar