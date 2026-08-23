# This example requires the 'message_content' intent.

import discord
import requests
import json
import datetime
import os
from dotenv import load_dotenv
load_dotenv()
import re 

# Define the API endpoint
url = os.getenv('SERVER_BASE')
api_key = os.getenv('ACCESS_TOKEN')

# Define regex for matching tags
HASHTAG_RE = re.compile(r"(#\w+)")

def extract_hashtags_regex(text):
    tags = HASHTAG_RE.findall(text)
    cleaned = HASHTAG_RE.sub('', text)

    return cleaned, tags

def serialize_datetime(obj):
    if isinstance(obj, datetime.datetime):
        return obj.isoformat()
    raise TypeError("Type not serializable")

class MyClient(discord.Client):
    async def on_ready(self):
        print(f'Logged on as {self.user}!')

    async def on_message(self, message):
        content, topics = extract_hashtags_regex(message.content)

        topics = [ topic[1:] for topic in topics]

        payload = {
            "note_id": str(message.id),
            "date": message.created_at.strftime("%Y-%m-%d %H:%M:%S"),

            "topics": topics,
            "content": content
        }

        endpoint = url + "/api" + "/notes"
        response = requests.post(endpoint, json=payload)

        if response.status_code == 200 or response.status_code == 201:
            print("Received message:")
            print(message.content)
            print("Recovered topics: ")
            print(topics)
        else:
            print(f"Failed with status code: {response.status_code}")
            print(f"Message: {response.reason}")

    async def on_message_delete(self, message):
        endpoint = url + "/api" + "/notes" + "/" + str(message.id)
        response = requests.delete(endpoint)
        
        if response.status_code == 200 or response.status_code == 201:
            print("Successfully delete note: ")
            print(message.id)
        else:
            print(f"Failed with status code: {response.status_code}")
            print(f"Message: {response.reason}")

    async def on_message_edit(self, before, after):
        content, topics = extract_hashtags_regex(after.content)
        
        payload = {
            "topics": topics,
            "content": content
        }

        endpoint = url  + "/api" + "/notes/" + str(after.id)
        response = requests.patch(endpoint, json=payload)

        if response.status_code == 200 or response.status_code == 201:
            print("Success!")
            print(response.json())
        else:
            print(f"Failed with status code: {response.status_code}")
            print(f"Message: {response.reason}")


intents = discord.Intents.default()
intents.message_content = True

client = MyClient(intents=intents)
client.run(api_key)
