@client.event
async def on_message(message):

    if message.author == client.user:
    return

    if message.content == '!ping':
    await message.channel.send('Pong!')