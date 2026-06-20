import { BodyEntry } from "../BodyEntry"
import { useState, useEffect } from "react"

const NoteEntry = ({date, content} : {date: string, content: string}) => {
    return (
        <div
            className="grid grid-cols-5">
            <div className="col-1 bg-blue-100 text-base">{date}</div>
            <div className="col-span-4 bg-red-100">{content}</div>
        </div>
    )
}

const TopicEntry = ({label} : {label: string}) => {
    return (
        <li className="bg-purple-100 break-words">
            {label}
        </li>)
}

const fetchNotes = () => {
    fetch('https://http://localhost:5000/topics.com')
        .then((res) => {res.json})
}


function ThoughtsPage() {
    const [notes, setNotes] = useState([]);
    

    
    return (
    <div className="pt-[5vh] flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 md:m-5 mt-6 bg-yellow-100 text-wrap">
            <BodyEntry>
                <ul>
                    <TopicEntry label="testingg"/> 
                    <TopicEntry label="note testing"/> 
                    <TopicEntry label="a"/> <TopicEntry label="aaaaaaaaaaaaaaaaaaaaaaa"/>
                </ul>
            </BodyEntry>
        </div>
        <div className="w-full md:w-2/3 md:m-5">
            <BodyEntry>
                <NoteEntry date={"feb 1"} content={"lorem ipsum si dolor amet"}/>
            </BodyEntry>
        </div>
    </div>
    )
}

export default ThoughtsPage;