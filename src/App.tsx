
import Main from "./assets/main/Main"
import { useState } from 'react'

//TODO: Make each section a component (so they can be navigated to)
//TODO: Fix project selector buttons [DONE]
//TODO: Add project selector button functionality
function PlacholderModule({title, body}: {title: string, body: string[][]})
{
  return (
    <div className="outline outline-1 rounded-3xl text-center p-5 w-[350px]">
        <h1 className="font-bold text-2xl ">{title}</h1>
        {body.map((entry) => (<a href={entry[1]}><p className="text-2xl pb-3">{entry[0]}</p></a>))}
        
    </div>
  )
}

function Placeholder() {
  const [appState, setAppState] = useState(true)
  
  if (appState) {
      return (
        <div className="bg-white">
          <div className="outline outline-1 bg-white rounded-3xl m-[500px] mt-[150px]">
              <div className="ml-10 mb-5">
                <h1 className="text-8xl font-bold">JUNO ZHANG</h1>
                <p className="text-2xl"><a>RESUME</a> | <a href="https://www.linkedin.com/in/juno-zhang/">LINKEDIN</a> | <a href="https://github.com/juuunoz">GITHUB</a> | CONTACT</p>
              </div>
              
              <div className="flex items-center justify-center pb-10">
                <div className="grid grid-cols-3 gap-4 content-center">
                  <PlacholderModule 
                    title={"What I'm reading"} 
                    body={[["Erewhon", "https://en.wikipedia.org/wiki/Erewhon"], ["Plays Well With Others", "https://www.goodreads.com/en/book/show/58782858-plays-well-with-others"]]}/>
                  <PlacholderModule 
                    title={"What I'm learning"} 
                    body={[["Classical Computer Vision Techniques", ""], ["Piano (Waltz in C# Minor)", "https://www.youtube.com/watch?v=SUT_0c2QVzo"], ["Intro to the Theory of Computation", "https://mog.dog/files/SP2019/Sipser_Introduction.to.the.Theory.of.Computation.3E.pdf"], ["ThreeJS", ""]]}/>
                  <PlacholderModule 
                    title={"What I'm making"} 
                    body={[["How Many Fingers", "https://github.com/juuunoz/how-many-fingers"]]}/>
                </div>
              </div>

              <div className="bg-black text-white rounded-b-3xl text-right p-4"> <button onClick={(e) => (setAppState(false))}>WEBSITE UNDER CONSTRUCTION, TAKE A LOOK :)</button> </div>
          </div>
        </div>
      );
  }
  else {
      return <Main isVisible={!appState}/>;
  }   
}

function App() {

  //TODO: figure out how to chuck this shit into placeholder
  return (
    <div className="">   
      <Placeholder />
    </div>
    
  )
}

export default App
