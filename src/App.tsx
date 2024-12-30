
import Main from "./assets/main/Main"
import { useState } from 'react'

//TODO: Make each section a component (so they can be navigated to)
//TODO: Fix project selector buttons [DONE]
//TODO: Add project selector button functionality
function PlacholderModule({title, body}: {title: string, body: string[][]})
{
  return (
    <div className="outline outline-1 rounded-3xl text-center p-3 m-3 grow shrink basis-0">
        <h1 className="font-bold text-l ">{title}</h1>
        {body.map((entry) => (<a href={entry[1]}><p className="text-l pb-3">{entry[0]}</p></a>))}
        
    </div>
  )
}

function Placeholder() {
  const [appState, setAppState] = useState(true)
  
  if (appState) {
      return (
        <div className="flex items-center justify-center">
          <div className="outline outline-1 bg-white rounded-3xl mt-[150px] w-1/3">
              <div className="ml-10 mb-5">
                <h1 className="text-6xl font-bold">JUNO ZHANG</h1>
                <p className="text-l"><a>RESUME</a> | <a href="https://www.linkedin.com/in/juno-zhang/">LINKEDIN</a> | <a href="https://github.com/juuunoz">GITHUB</a> | CONTACT</p>
              </div>
              
              <div className="flex items-center justify-center p-4">
                <div className="flex flex-wrap">
                  <PlacholderModule 
                    title={"What I'm reading"} 
                    body={[["Erewhon by Samuel Butler", "https://en.wikipedia.org/wiki/Erewhon"], ["Plays Well With Others by Eric Barker", "https://www.goodreads.com/en/book/show/58782858-plays-well-with-others"]]}/>
                  <PlacholderModule 
                    title={"What I'm learning"} 
                    body={[["Classical CV Image Pre-Processing Techniques for DL Models", ""], ["Piano (Waltz in C# Minor)", "https://www.youtube.com/watch?v=SUT_0c2QVzo"], ["Intro to the Theory of Computation", "https://mog.dog/files/SP2019/Sipser_Introduction.to.the.Theory.of.Computation.3E.pdf"], ["ThreeJS", ""]]}/>
                  <PlacholderModule 
                    title={"What I'm making"} 
                    body={[["How Many Fingers", "https://github.com/juuunoz/how-many-fingers"]]}/>
                    
                </div>
              </div>

              <div className="bg-black text-white rounded-b-xl text-right p-4 w-full mt-5"> <button onClick={() => (setAppState(false))}>WEBSITE UNDER CONSTRUCTION, TAKE A LOOK :)</button> </div>
          </div>
        </div>
      );
  }
  else {
      return <Main isVisible={!appState}/>;
  }   
}

function App() {

  return (
    <div className="">   
      <Placeholder />
    </div>
    
  )
}

export default App
