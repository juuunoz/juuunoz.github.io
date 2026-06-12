const NoteEntry = ({date, content} : {date: string, content: string}) => {
    return (
        <div
            className="grid grid-cols-5">
            <div className="col-1 bg-blue-100 text-base">{date}</div>
            <div className="col-span bg-red-100">{content}</div>
        </div>
    )
}

export const ThoughtsRight = () => {
    return (
        <div className="bg-yellow-100">
            <NoteEntry
                date={"10/10/2010"}
                content={"thoughts right"}/>
        </div>
    )
}

export const ThoughtsLeft = () => {
    return (
        <div className="bg-purple-100">thoughts left</div>
    )
}