
import { useState, useEffect } from 'react'
import { NavbarInstance } from './assets/Navbar'

import ThoughtsPage from './assets/pages/ThoughtsPage';
import { AboutPage } from './assets/pages/AboutPage';
import { ProjectsPage } from './assets/pages/ProjectsPage';

//TODO: add content
//TODO: make the projects section
//TODO: light-dark switch?


  

function App() {
  const [selectedTab, setSelectedTab] = useState(() => {
    const saved = sessionStorage.getItem('lastSelectedTab')
    return saved ? parseInt(saved, 10) : 0
  });

  useEffect(() => {
        sessionStorage.setItem('lastSelectedTab', selectedTab.toString())
    }, [selectedTab])
  

  return (
    <div className="center  ml-auto mr-auto md:w-[65vw] w-[90vw] text-[#374152]">
      <NavbarInstance 
        setContent={setSelectedTab}/>
      {selectedTab === 0 ? <AboutPage></AboutPage>  : <></>}
      {selectedTab === 1 ? <ProjectsPage></ProjectsPage>  : <></>}
      {selectedTab === 2 ? <ThoughtsPage></ThoughtsPage>  : <></>}
    </div>
  )
}

export default App
