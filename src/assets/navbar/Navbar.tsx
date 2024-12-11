import { useState, useRef } from 'react'
import { NavbarObject } from './navbar-interface';

//TODO: Figure out how to make this sticky when we scroll past it
//TODO: Figure out why changing position to absolute breaks the inherited selector left animation
function Navbar() {
    const navbarRef = useRef<NavbarObject>(null);
    const [selectorState, setSelectorState] = useState({
        left: 10,
        right: 68
    });

    const [selectorStateHard, setSelectorStateHard] = useState({
        left: 10,
        right: 68
    });

    const [navbarLeftOffset, setNavbarLeftOffset] = useState(2);

    /*
    let sticky: number = navbarRef.current ? navbarRef.current.offsetTop : 999;

    function stickyOrNot() {
        if (window.scrollY >= sticky) {
            navbarRef.current.classList.add("sticky");
        } else {
            navbarRef.current.classList.remove("sticky");
        }
    }
    */

    function mouseEnterNavButton(e: MouseEvent) {
        console.log("enter");
        e.preventDefault();
        //move selector left and right as needed
        console.log(e.clientX - navbarRef.current.offsetLeft);
        console.log(selectorState.left);

        if (e.clientX - navbarRef.current.offsetLeft < selectorState.left) {
            //move left side right
            setSelectorState({
                left: e.target.offsetLeft - navbarRef.current.offsetLeft,
                right: selectorState.right
            });
        } else if (e.clientX > selectorState.right) {
            setSelectorState({
                left: selectorState.left,
                right:
                    e.target.offsetLeft +
                    e.target.offsetWidth -
                    navbarRef.current.offsetLeft
            });
        }
    }

    function mouseLeaveNavButton(e: MouseEvent) {
        console.log("leave");
        setSelectorState(selectorStateHard);
    }

    function clickNavButton(e: MouseEvent) {
        e.preventDefault();
        console.log("click");
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

    return (
      <div id="navbar-wrapper">
          <div id="navbar-container">
              <div id="navbar" ref={navbarRef}>
                <div
                        className="item"
                        id="home"
                        onClick={(e) => clickNavButton(e)}
                        onMouseEnter={(e) => mouseEnterNavButton(e)}
                        onMouseLeave={(e) => mouseLeaveNavButton(e)}
                    >
                        Home
                  </div>
                  <div
                      className="item"
                      id="code"
                      onClick={(e) => clickNavButton(e)}
                      onMouseEnter={(e) => mouseEnterNavButton(e)}
                      onMouseLeave={(e) => mouseLeaveNavButton(e)}
                  >
                      Projects
                  </div>
                  <div
                      className="item"
                      id="resume+contact"
                      onClick={(e) => clickNavButton(e)}
                      onMouseEnter={(e) => mouseEnterNavButton(e)}
                      onMouseLeave={(e) => mouseLeaveNavButton(e)}
                  >
                      Resume + Contact
                  </div>
              </div>
              <div
                  id="navbar-selector"
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