const SERVERADDR = 'http://localhost:5000'

export async function fetchNotes () {
    try {
        const response = await fetch(`${SERVERADDR}/notes`);
        const data = await response.json();
        return data;
    } catch (err) {
        return err
    }
}

export async function fetchTopics () {
    try {
        const response = await fetch(`${SERVERADDR}/topics`);
        const res = await response.json();
        return res.data;
    } catch (err) {
        return err
    }
}