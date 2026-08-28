import { BodyEntry } from "../BodyEntry"
import Markdown from "react-markdown"

import aboutMd from '../../markdown/about.md?raw'

export const AboutPage = () => {
    return (
    <div className="md:pt-[2vh] flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 md:m-5 mt-6">
             <BodyEntry>
                <img 
                    className="object-contain w-[400px] md:w-[300px] md:ml-auto md:mr-0 ml-auto mr-auto"
                    src="/profile.jpg"/>
                <p className="text-right text-s prose prose-neutral pr-16 md:pr-0">
                    <br/>
                    <a href="https://github.com/juuunoz">github</a><br/>
                    <a href="https://www.linkedin.com/in/juno-zhang/">linkedin</a><br/>
                    <a href="https://drive.google.com/file/d/1Qk3NxfkvdFxtL9RfcLXfGzOcQ3kIGGT2/view?usp=sharing">resume</a>
                    <br/>
                    <br/>
                    junozhangworking (at) gmail (dot) com<br/>
                    website inspired by <a href="https://www.computerangel.blog/shop">computer angel</a><br/>
                    <br/>
                </p>
            </BodyEntry>
        </div>
        <div className="w-full md:w-2/3 md:m-5 mb-10 prose prose-neutral">
             <BodyEntry>
              <Markdown>{aboutMd}</Markdown>
            </BodyEntry>
        </div>
    </div>
    )
}