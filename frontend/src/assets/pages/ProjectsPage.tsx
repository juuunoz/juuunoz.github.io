import { BodyEntry } from "../BodyEntry"
import Markdown from "react-markdown"

import project1 from '../../markdown/project1.md?raw'

const ProjectEntry = ({children, title} : {children: React.ReactNode, title: string}) => {
    return (
      <div className="mb-20">
        <p className="text-2xl">{title}    v</p>
        {children}
      </div>
    )
  }

export const ProjectsPage = () => {
  const ProjectLabel = ({label} : {label: string}) => {
  
          return (
              <li 
                  className="break-words hover:outline outline-1 p-1">
                  {label}
              </li>)
      }

    return (
    <div className="pt-[5vh] flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 md:m-5 mt-6 ">
            <BodyEntry>
                <ul>
                <ProjectLabel label="project 1"/>
                <ProjectLabel label="project 2"/>
                <ProjectLabel label="project 3"/>
                </ul>
            </BodyEntry>

        </div>
        <div className="w-full md:w-2/3 md:m-5 max-h-[650px] overflow-scroll">
            <BodyEntry>
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
        </div>
    </div>
    )
}