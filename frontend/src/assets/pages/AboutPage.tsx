import { BodyEntry } from "../BodyEntry"
import Markdown from "react-markdown"

import aboutMd from '../../markdown/about.md?raw'

export const AboutPage = () => {
    return (
    <div className="pt-[5vh] flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 md:m-5 mt-6 ">
             <BodyEntry>
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
        </div>
        <div className="w-full md:w-2/3 md:m-5">
             <BodyEntry>
              <Markdown>{aboutMd}</Markdown>
            </BodyEntry>
        </div>
    </div>
    )
}