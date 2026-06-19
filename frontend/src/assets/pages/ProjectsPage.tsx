import { BodyEntry } from "../BodyEntry"
import Markdown from "react-markdown"

import project1 from '../../markdown/project1.md?raw'

const ProjectEntry = ({children, title} : {children: React.ReactNode, title: string}) => {
    return (
      <div className="mb-10">
        <p className="text-2xl">{title}    v</p>
        <p>{children}</p>
      </div>
    )
  }

export const ProjectsPage = () => {
    return (
    <div className="pt-[5vh] flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 md:m-5 mt-6 ">
            <BodyEntry>
                <ul>
                <li>project 1</li>
                <li>project 2</li>
                <li>project 3</li>
                </ul>
            </BodyEntry>

        </div>
        <div className="w-full md:w-2/3 md:m-5">
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