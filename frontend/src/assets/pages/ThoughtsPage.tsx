import { BodyEntry } from "../BodyEntry"
import { useState, useEffect, use } from "react"
import { fetchNotes, fetchTopics } from "../service"

interface Note {
  date: string;
  note_id: number;
  content: string;
}

interface Topic {
  topic: string;
}

const NoteEntry = ({date, content} : {date: string, content: string}) => {
    return (
        <div
            className="grid grid-cols-5 mb-5">
            <div className="col-1 text-base">{date}</div>
            <div className="col-span-4">{content}</div>
        </div>
    )
}

const TopicEntry = ({label} : {label: string}) => {
    return (
        <li className="break-words">
            {label}
        </li>)
}


function ThoughtsPage() {
    const [notes, setNotes] = useState<Note[]>([]); 
    const [topics, setTopics] = useState<string[]>([]);

    useEffect(() => {
         let ignore = false;

        fetchNotes()
        .then((rawNotes) => {
            const newNotes : Note[] = rawNotes.map((n : Note) => (
                {
                    date: n.date,
                    note_id: n.note_id,
                    content: n.content
                }
            ))

            if (!ignore) setNotes(prev => [...prev, ...newNotes])
        })

        fetchTopics()
        .then((rawTopics) => {
            const newTopics : string[] = rawTopics.map((t : Topic) => t.topic)

            if (!ignore) setTopics(prev => [...prev, ...newTopics])
        })

        return () => {
            ignore = true;
        };
    }, [])

    return (
    <div className="pt-[5vh] flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 md:m-5 mt-6 text-wrap">
            <BodyEntry>
                <p>
                    These notes come from a Discord bot I configured to forward and categorize my messages here. I text it throughout my day. <br/>
                    <br/>
                    They are a collection of scattered thoughts and feelings on a variety of different topics. <br/>
                    <br/>
                    Here are some handpicked topics that I'm most interested in right now: <br/>
                    <br/>
                </p>
                <ul>
                    {
                        topics.map(t => <TopicEntry key={t} label={t}/>)
                    }
                </ul>
                <p>
                    <br/>
                    Here are the 5 most recently updated topics: <br/>
                </p>
            </BodyEntry>
        </div>
        <div className="w-full md:w-2/3 md:m-5">
            <BodyEntry>
                {
                    notes.map(n => <NoteEntry key={n.note_id} date={n.date.slice(0,10)} content={n.content}/>)
                }
                
            </BodyEntry>
        </div>
    </div>
    )
}

export default ThoughtsPage;