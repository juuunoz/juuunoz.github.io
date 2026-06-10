
import { useState } from 'react'
import { NavbarInstance } from './assets/navbar/navbar'
import { motion, AnimatePresence } from "framer-motion";
import Markdown from 'react-markdown';

import aboutMd from './markdown/about.md?raw'



//TODO: add content
//TODO: add a verticle text flip effect, and sync it with a line animation that swipes with it on the side
//TODO: light-dark switch?

/*
function PlacholderModule({title, body}: {title: string, body: string[][]})
{
  return (
    <div className="outline outline-1 rounded-3xl text-center p-3 m-3 grow shrink basis-0">
        <h1 className="font-bold text-l ">{title}</h1>
        {body.map((entry) => (<a href={entry[1]}><p className="text-l pb-3"><u>{entry[0]}</u></p></a>))}
        
    </div>
  )
}

function Placeholder() {
  const [appState, setAppState] = useState(true)
  
  if (appState) {
      return (
        <div className="flex items-center justify-center">
          <div className="outline outline-1 bg-white rounded-3xl mt-10 w-2/3 sm:w-3/4">
              <div className="ml-10 mb-1">
                <h1 className="text-5xl font-bold text-wrap">JUNO ZHANG</h1>
                <p className="text-l"><a>RESUME</a> | <a href="https://www.linkedin.com/in/juno-zhang/">LINKEDIN</a> | <a href="https://github.com/juuunoz">GITHUB</a> | CONTACT</p>
              </div>
              
              <div className="flex items-center justify-center ml-4 mr-4">
                <div className="flex flex-wrap">
                  <PlacholderModule 
                    title={"What I'm reading"} 
                    body={[["Erewhon", "https://en.wikipedia.org/wiki/Erewhon"], ["Porkopolis", "https://www.dukeupress.edu/porkopolis"], ["I'm Glad My Mom Died", "https://en.wikipedia.org/wiki/I%27m_Glad_My_Mom_Died"]]}/>
                  <PlacholderModule 
                    title={"What I'm learning"} 
                    body={[["Sewing", ""], ["Piano (Waltz in C# Minor)", "https://www.youtube.com/watch?v=SUT_0c2QVzo"], ["Intro to the Theory of Computation", "https://mog.dog/files/SP2019/Sipser_Introduction.to.the.Theory.of.Computation.3E.pdf"], ["ThreeJS", "https://threejs.org/"], ["Gouache Painting and Inking", ""]]}/>
                  <PlacholderModule 
                    title={"What I'm making"} 
                    body={[["Bestie Bag", "https://www.blackbirdfabrics.com/collections/bestie-bag-pattern/products/bestie-bag"], ["This Website", "https://github.com/juuunoz/juuunoz.github.io"]]}/>
                    
                </div>
              </div>

              <div className="bg-black text-white rounded-b-xl text-right p-4 w-full mt-5"> <button onClick={() => (setAppState(false))}>WEBSITE UNDER CONSTRUCTION, TAKE A LOOK :) (best on web)</button> </div>
          </div>
        </div>
      );
  }
  else {
      return <Main isVisible={!appState}/>;
  }   
}
  */

const BodyEntry = ({children, bodyContentNumber, currentBodyContentNumber} : {children: React.ReactNode, bodyContentNumber: number, currentBodyContentNumber: number}) => {
    return (
      <AnimatePresence mode="wait">
        {bodyContentNumber == currentBodyContentNumber ?
          <motion.div 
            id="bodyContent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-blue-100"
            >
              {children}
          </motion.div>
        : null}
      </AnimatePresence>
    );
  };

  const ProjectEntry = ({children, title} : {children: React.ReactNode, title: string}) => {
    return (
      <div>
        <p className="text-2xl">{title}    v</p>
        {children}
      </div>
    )
  }

function App() {
  const [bodyContentNumber, setBodyContentNumber] = useState(0);

  return (
    <div className="center md:mt-[10%] mt-[5%] ml-auto mr-auto md:w-[65vw] w-[90vw] bg-blue-300">

      <div className=" pt-[5vh] border-2 border-solid border-black flex flex-col md:flex-row flex-wrap">
      
        <div id="profile" className="md:m-10 m-5 bg-red-400 w-[40vw] md:w-[20vw] shrink-0 ml-auto mr-auto">
          <img 
            className="object-contain ml-auto mr-auto"
            src="src/assets/profile.jpg"/>
        </div>

        <div className="flex-1 md:m-10 m-5 min-w-0 bg-red-100" id="content">
          <NavbarInstance setContent={setBodyContentNumber}/>

          <div id="body" className="bg-blue-400 relative min-h-[200px]">
            <BodyEntry
              bodyContentNumber={0}
              currentBodyContentNumber={bodyContentNumber}
              >
                <Markdown>{aboutMd}</Markdown>
              </BodyEntry>

            <BodyEntry
              bodyContentNumber={1}
              currentBodyContentNumber={bodyContentNumber}
              >
                <ProjectEntry
                  title="project title">
                    body content
                </ProjectEntry>
              </BodyEntry>


            
          </div>
        </div>

      </div>

    </div>
    
  )
}

export default App
