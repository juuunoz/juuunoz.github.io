import { BodyEntry } from "../BodyEntry"
import { useState, useEffect } from "react"
import { fetchNotes, fetchTopics } from "../service"

interface Note {
  date: string;
  note_id: number;
  content: string;
}

interface Topic {
  topic: string;
}

const coolTopics = ["apples", "bananas", "carrots"]

function ThoughtsPage() {
    const [notes, setNotes] = useState<Note[]>([]); 
    const [topics, setTopics] = useState<string[]>([]);
    const [currentTopic, setCurrentTopic] = useState<string>("none");

    const NoteEntry = ({date, content} : {date: string, content: string}) => {
    return (
        <div
            className="grid grid-cols-5 mb-10">
            <div className="col-1 text-base">{date}</div>
            <div className="col-span-4">{content}</div>
        </div>
    )
}

    const TopicEntry = ({label} : {label: string}) => {
        const handleClick = () => {
            setCurrentTopic(label)
            fetchNotes(15, -1, label)
            .then((rawNotes) => {
                if (rawNotes.length != 0) {
                    const newNotes : Note[] = rawNotes.map((n : Note) => (
                    {
                        date: n.date,
                        note_id: n.note_id,
                        content: n.content
                    }
                    ))
                    console.log(newNotes)
                    setNotes([...newNotes])
                    
                } else {
                    setNotes([])
                }
                } 
            )
            .catch((err) => console.error(err))
        }

        return (
            <li 
                onClick={handleClick}
                className="inline md:block break-words hover:outline outline-1 p-1">
                {label}
            </li>)
    }

     const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        // Source - https://stackoverflow.com/a/49573628
        // Posted by Brendan, modified by community. See post 'Timeline' for change history
        // Retrieved 2026-07-06, License - CC BY-SA 4.0
        var element = e.target as HTMLElement

        if (Math.abs(element.scrollHeight - (element.scrollTop + element.clientHeight)) <= 1) {
            fetchNotes(5, notes[notes.length - 1]["note_id"], currentTopic)
            .then((rawNotes) => {
                if (rawNotes.length > 0)  
                {
                    const newNotes : Note[] = rawNotes.map((n : Note) => (
                    {
                        date: n.date,
                        note_id: n.note_id,
                        content: n.content
                    }
                    ))
                    
                    setNotes(prev => [...prev, ...newNotes])
                }
            })
        }
    }

    // Populate notes and topics on startup
    useEffect(() => {
        let ignore = false;
        fetchNotes(15, -1, currentTopic)
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
        .catch((err) => console.error(err))

        fetchTopics()
        .then((rawTopics) => {
            if (rawTopics.length > 0) {
                const newTopics : string[] = rawTopics.map((t : Topic) => t.topic)

                if (!ignore) setTopics(prev => [...prev, ...newTopics])
            }
        })

        return () => {
            ignore = true;
        };
    }, [])

    return (
        <div className="md:pt-[5vh] flex flex-col md:flex-row">
            <div className="w-full md:w-1/3 md:m-5 mt-6 text-wrap ">
                <BodyEntry>
                    <div>
                        <p>
                        These notes come from a Discord bot I configured to clean, categorize, and publish my messages. I text it throughout my day. <br/>
                        <br/>
                        <div className="hidden md:block">They are a collection of scattered thoughts and feelings on a variety of different topics. <br/>
                        <br/></div>
                        <b> Below are some handpicked topics that I'm most interested in right now: </b>
                        <br/>
                        </p>
                        <ul>{coolTopics.map(t => {
                                    return(
                                        <div className="inline">
                                        <TopicEntry key={t} label={t}/>
                                        </div>
                                    )
                                })}</ul>
                    </div>
                    
                    <div className="hidden md:block">
                        <p>
                            <br/>
                            <b>Here are some recently updated topics: </b>
                            <br/>
                        </p>
                        <ul>{topics.map(t => <TopicEntry key={t} label={t}/>)}</ul>
                    </div>

                    <div>
                        <p>
                            <br/>
                            <b>And here is everything all at once </b>
                            <br/>
                        </p>
                        <ul><TopicEntry key={"everything"} label={"everything"}/></ul>
                    </div>
                    <hr className="block md:hidden mt-5 mb-5 border-black"/>
                </BodyEntry>
            </div>
            <div 
                className="w-full md:w-2/3 md:m-5 max-h-[66vh] overflow-scroll scrollbar-thumb-sky-700"
                onScroll={handleScroll}>
                <BodyEntry>
                    {notes.map(n => <NoteEntry key={n.note_id} date={n.date.slice(0,10)} content={n.content}/>)}
                </BodyEntry>
            </div>
        </div>
    )
}

export default ThoughtsPage;