import { BodyEntry } from "../BodyEntry"
import Markdown from "react-markdown"
import { useRef } from "react"

import project1 from '../../markdown/project1.md?raw'

const ProjectEntry = ({children, title} : {children: React.ReactNode, title: string}) => {
    return (
      <div className="mb-20">
        <p className="text-2xl mb-5">{title}</p>
        {children}
      </div>
    )
  }

export const ProjectsPage = () => {
  const projectRefs = useRef<HTMLDivElement[]>([]);
  const projectFiles = [project1, project1, project1];
  const projectTitles: string[] = [
    'reflections on making junozhang.com ', 
    'web-based party game (IN DEVELOPMENT)' 
    ]

  const ProjectLabel = ({label, index} : {label: string, index: number}) => {
      return (
          <li 
              onClick={() => {projectRefs.current[index].scrollIntoView({behavior: "smooth"})}}
              className="break-words hover:outline outline-1 p-1">
              {label}
          </li>)
  }
      
  return (
  <div className="md:pt-[5vh] flex flex-col md:flex-row">
      <div className="w-full md:w-1/3 md:m-5 mt-6 ">
          <BodyEntry>
              <ul>
                {projectTitles.map((item, index) => (
                  <ProjectLabel label={item} index={index}/>
                ))
                }
              </ul>
          </BodyEntry>
          <hr className="block md:hidden mt-5 mb-5 border-black"/>
      </div>
      <div className="w-full md:w-2/3 md:m-5 md:max-h-[650px] max-h-[75vh] overflow-scroll">
          <BodyEntry>
            {projectFiles.map((item, index) => (
              <div 
                key={item} 
                ref={(node) => { node ? projectRefs.current[index] = node: null; }}
              >
                <ProjectEntry
                  title={projectTitles[index]}>
                  <Markdown>{projectFiles[index]}</Markdown>
                </ProjectEntry>
              </div>
            ))}
          </BodyEntry>
      </div>
  </div>
  )
}