
export async function fetchNotes (limit: number, cursor: number, topic: string) {
    try {
        const myLimit = limit ? limit.toString() : "10";
        const myTopic = topic ? topic : "none";
        const myCursor = cursor ? cursor.toString() : "-1";

        let response;
        if (myTopic == "none" && myCursor == "-1"){
            response = await fetch(`${import.meta.env.VITE_SERVERADDR}/api/notes?limit=${myLimit}`);
        } else if (myTopic == "none") {
            response = await fetch(`${import.meta.env.VITE_SERVERADDR}/api/notes?limit=${myLimit}&cursor=${myCursor}`);
        } else if (myCursor == "-1") {
            response = await fetch(`${import.meta.env.VITE_SERVERADDR}/api/notes?limit=${myLimit}&topic=${myTopic}`);
        } else {
            response = await fetch(`${import.meta.env.VITE_SERVERADDR}/api/notes?limit=${myLimit}&topic=${myTopic}&cursor=${myCursor}`);
        }
         
        const res = await response.json();
        console.log(res.content)
        return res;
    } catch (err) {
        return err
    }
}

export async function fetchTopics () {
    try {
        const response = await fetch(`${import.meta.env.VITE_SERVERADDR}/api/topics?limit=5`);
        const res = await response.json();
        return res;
    } catch (err) {
        return err
    }
}
