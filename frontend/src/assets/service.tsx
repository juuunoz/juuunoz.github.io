const SERVERADDR = 'http://localhost:5000'

export async function fetchNotes (limit: number, cursor: number, topic: string) {
    try {
        const myLimit = limit.toString() || "10";
        const myTopic = topic || "none";
        const myCursor = cursor.toString() || "-1";

        let response;
        if (myTopic == "none" && myCursor == "-1"){
            response = await fetch(`${SERVERADDR}/notes?limit=${myLimit}`);
            
        } else if (myTopic == "none") {
            response = await fetch(`${SERVERADDR}/notes?limit=${myLimit}$cursor=${myCursor}`);
        } else if (myCursor == "-1") {
            response = await fetch(`${SERVERADDR}/notes?limit=${myLimit}&topic=${myTopic}`);
        } else {
            response = await fetch(`${SERVERADDR}/notes?limit=${myLimit}&topic=${myTopic}$cursor=${myCursor}`);
        }
         
        const data = await response.json();
        return data;
    } catch (err) {
        return err
    }
}

export async function fetchTopics () {
    try {
        const response = await fetch(`${SERVERADDR}/topics?limit=5`);
        const res = await response.json();
        return res.data;
    } catch (err) {
        return err
    }
}
