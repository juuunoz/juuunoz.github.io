import Background from '../background/Background.tsx'
import Navbar from '../navbar/Navbar.tsx'
import Heading from '../heading/Heading.tsx'

function Main({isVisible} : {isVisible: boolean}) {
    if (isVisible) {
        return (
            <div>
                <Background/>
                <Heading />
                <Navbar/>
                <div className="h-lvh"></div>
                <div className="m-5 mt-10 p-14 pt-0 outline outline-1 rounded-3xl bg-white">
                    <div className="mb-40 ml-10 mr-10">
                    <h1 id="about" className="text-8xl font-bold">ABOUT</h1>
                    </div>
                    
                    <div id="projects" className="mb-40 ml-10 mr-10">
                    <h1 className="text-8xl font-bold ">PROJECTS</h1>
                    <div className="p-3 mt-2 mb-10 outline outline-1 rounded-3xl h-lvh text-2xl">body</div>
                    <span className="p-3 pl-5 pr-5 m-5 ml-0 outline outline-1 rounded-full bg-white hover:bg-black text-3xl text-black hover:text-white whitespace-nowrap">IMPORTANT PROJECT #1</span> 
                    <span className="p-3 pl-5 pr-5 m-5 ml-0 outline outline-1 rounded-full bg-white hover:bg-black text-3xl text-black hover:text-white whitespace-nowrap">ANOTHER VERY IMPORTANT PROJECT</span> 
                    <span className="p-3 pl-5 pr-5 m-5 ml-0 outline outline-1 rounded-full bg-white hover:bg-black text-3xl text-black hover:text-white whitespace-nowrap">SMALL PROJECT </span> 
                    </div>
    
                    <div className="mb-40 ml-10 mr-10">
                    <h1 id="resume+contact" className="text-8xl font-bold">RESUME + CONTACT</h1>
                    </div>
                </div>
            </div>
        )
    }
    else {
        return null;
    }
    
}

export default Main