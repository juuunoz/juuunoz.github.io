
import { useState } from 'react'
import { NavbarInstance } from './assets/navbar/navbar'
import { ThoughtsLeft, ThoughtsRight } from './assets/navbar/thoughts';
import { motion, AnimatePresence } from "framer-motion";
import Markdown from 'react-markdown';

import aboutMd from './markdown/about.md?raw'
import project1 from './markdown/project1.md?raw'



//TODO: add content
//TODO: make the projects section
//TODO: light-dark switch?


const BodyEntry = ({children, bodyContentNumber, currentBodyContentNumber} : {children: React.ReactNode, bodyContentNumber: number, currentBodyContentNumber: number}) => {
    return (
      <>
        {bodyContentNumber === currentBodyContentNumber ?
          <div 
            id="bodyContent"
            >
              {children}
          </div>
        : null}
      </>
    );
  }

  const ProjectEntry = ({children, title} : {children: React.ReactNode, title: string}) => {
    return (
      <div className="mb-10">
        <p className="text-2xl">{title}    v</p>
        <p>{children}</p>
      </div>
    )
  }

function App() {
  const [bodyContentNumber, setBodyContentNumber] = useState(0);

  return (
    <div className="center  ml-auto mr-auto md:w-[65vw] w-[90vw]">
      <NavbarInstance 
        setContent={setBodyContentNumber}/>
      <div className="pt-[5vh] flex flex-col md:flex-row">
        
        <div id="body-left" className="w-full md:w-1/3 md:m-5 mt-6 ">
          {/** about */}
          <BodyEntry
            bodyContentNumber={0}
            currentBodyContentNumber={bodyContentNumber}
            >
              <img 
                className="object-contain ml-auto mr-auto"
                src="/profile.jpg"/>
              <p className="text-right md:text-sm text-xs">
                <br/>
                <p className=""><a href="https://github.com/juuunoz">github</a></p>
                <p><a href="https://www.linkedin.com/in/juno-zhang/">linkedin</a></p>
                <br/>
                <p>junozhangworking (at) gmail (dot) com</p>
                <p>website inspired by <a href="https://www.computerangel.blog/shop">computer angel</a></p>
                <br/>
                <p className="text-center sm:hidden">v</p>
              </p>
          </BodyEntry>

          {/** projects */}
          <BodyEntry
          bodyContentNumber={1}
          currentBodyContentNumber={bodyContentNumber}
          >
            <ul>
              <li>project 1</li>
              <li>project 2</li>
              <li>project 3</li>
            </ul>
          </BodyEntry>

          {/** thoughts */}
          <BodyEntry
          bodyContentNumber={2}
          currentBodyContentNumber={bodyContentNumber}
          >
            <ThoughtsLeft/>
          </BodyEntry>
          
        </div>

        <div id="body-right" className="w-full md:w-2/3 md:m-5">

          <div id="body-right-content" className="">
            {/** about */}
            <BodyEntry
              bodyContentNumber={0}
              currentBodyContentNumber={bodyContentNumber}
              >
              <Markdown>{aboutMd}</Markdown>
            </BodyEntry>

            {/** projects */}
            <BodyEntry
              bodyContentNumber={1}
              currentBodyContentNumber={bodyContentNumber}
              >
              <ProjectEntry
                title="project 1">
                  <Markdown>{project1}</Markdown>
              </ProjectEntry>
              <ProjectEntry
                title="project 2">
                  <Markdown>{project1}</Markdown>
              </ProjectEntry>
              <ProjectEntry
                title="project 3">
                  <Markdown>{project1}</Markdown>
              </ProjectEntry>
            </BodyEntry>

            {/** thoughts */}
            <BodyEntry
              bodyContentNumber={2}
              currentBodyContentNumber={bodyContentNumber}
            >
              <ThoughtsRight/>
            </BodyEntry>
            
          </div>
        </div>

      </div>

    </div>
    
  )
}

export default App
