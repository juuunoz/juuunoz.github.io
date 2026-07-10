# This example requires the 'message_content' intent.

import discord
import requests
import json
import datetime
import os
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("ACCESS_TOKEN")
server_base = os.getenv("SERVER_BASE")

def serialize_datetime(obj):
    if isinstance(obj, datetime.datetime):
        return obj.isoformat()
    raise TypeError("Type not serializable")

class MyClient(discord.Client):
    async def on_ready(self):
        print(f'Logged on as {self.user}!')

    async def on_message(self, message):
        
        payload = {
            "note_id": message.id,
            "date": message.created_at.strftime("%Y-%m-%d %H:%M:%S"),
            
            "topics": ["misc"],
            "content": message.content
        }

        print(payload)

        response = requests.post(server_base + "/notes", json=payload)

        if response.status_code == 200 or response.status_code == 201:
            print("Success!")
            print(response.json())  # Parse JSON response into a Python dictionary
        else:
            print(f"Failed with status code: {response.status_code}")

intents = discord.Intents.default()
intents.message_content = True

client = MyClient(intents=intents)
client.run(api_key)
