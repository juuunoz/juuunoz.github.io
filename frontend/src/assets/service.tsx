
export async function fetchNotes (limit: number, cursor: number, topic: string) {
    try {
        const myLimit = limit ? limit.toString() : "10";
        const myTopic = topic ? topic : "none";
        const myCursor = cursor ? cursor.toString() : "-1";

        let response;
        if (myTopic == "none" && myCursor == "-1"){
            console.log("one")
            response = await fetch(`${import.meta.env.VITE_SERVERADDR}/notes?limit=${myLimit}`);
        } else if (myTopic == "none") {
            console.log("two")
            response = await fetch(`${import.meta.env.VITE_SERVERADDR}/notes?limit=${myLimit}&cursor=${myCursor}`);
        } else if (myCursor == "-1") {
            console.log("three")
            response = await fetch(`${import.meta.env.VITE_SERVERADDR}/notes?limit=${myLimit}&topic=${myTopic}`);
        } else {
            console.log("four")
            response = await fetch(`${import.meta.env.VITE_SERVERADDR}/notes?limit=${myLimit}&topic=${myTopic}&cursor=${myCursor}`);
        }
         
        const res = await response.json();
        return res;
    } catch (err) {
        return err
    }
}

export async function fetchTopics () {
    try {
        const response = await fetch(`${import.meta.env.VITE_SERVERADDR}/topics?limit=5`);
        const res = await response.json();
        return res;
    } catch (err) {
        return err
    }
}
