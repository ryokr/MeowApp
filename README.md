# Requirements

- [Node](https://nodejs.org/en/) - Version 18.20.2
- [NPM](https://www.npmjs.com/)
- [FFMPEG](https://www.ffmpeg.org/)

# Installation

```bash
# Clone the repository
git clone https://github.com/ryokr/MeowBot.git

# Enter into the directory
cd MeowBot

# Install the dependencies
npm install

# Configure Discord Bot Token
 echo "token=INSERT_YOUR_TOKEN_HERE" > .env
```

# Required permissions

Make sure that your bot has the `applications.commands` application scope enabled, which can be found under the `OAuth2` tab on the [developer portal](https://discord.com/developers/applications/)

Enable the `Server Members Intent` and `Message Content Intent` which can be found under the `Bot` tab on the [developer portal](https://discord.com/developers/applications/)

# Configuration

After cloning the project and installing all dependencies, you need to add your Discord API token in the `.env` file.

# Changing the status

You can change the status of your discord bot by editing the `activity` and variables inside the `config.json` file.


# Starting the application

```bash
node index.js
```

# Hosting

This bot can be host anywhere that support nodejs.

# Support

Contact me [ryokr](https://discord.gg/fTuGFk9ayG) for any issue.

# Credits

> If you consider using this Bot, make sure to credit me ><
> Example: `Bot Coded by [ryohuy2410](https://discord.gg/fTuGFk9ayG) but modified by [modifier/your Name](https://discord.gg/)` :3

# Contributing

> If you want to help improve the Bot code, fix spelling or design Errors or if possible even code errors, you may create PULL REQUESTS.
> Please consider, that [**ryohuy2410**](https://github.com/ryokr) is the main Developer of this Bot, everyone else helped just once or sometimes more often.
> Thanks to anyone who considers helping me :3
