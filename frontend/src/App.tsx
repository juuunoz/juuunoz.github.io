
import { useState } from 'react'
import { NavbarInstance } from './assets/Navbar'

import ThoughtsPage from './assets/pages/ThoughtsPage';
import { AboutPage } from './assets/pages/AboutPage';
import { ProjectsPage } from './assets/pages/ProjectsPage';

//TODO: add content
//TODO: make the projects section
//TODO: light-dark switch?


  

function App() {
  const [bodyContentNumber, setBodyContentNumber] = useState(0);

  return (
    <div className="center  ml-auto mr-auto md:w-[65vw] w-[90vw]">
      <NavbarInstance 
        setContent={setBodyContentNumber}/>
      {bodyContentNumber === 0 ? <AboutPage></AboutPage>  : <></>}
      {bodyContentNumber === 1 ? <ProjectsPage></ProjectsPage>  : <></>}
      {bodyContentNumber === 2 ? <ThoughtsPage></ThoughtsPage>  : <></>}
    </div>
    
  )
}

export default App
