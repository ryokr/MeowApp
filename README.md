# MeowBot - Discord Bot
Ultimate Discord Music Bot

## Prerequisites

Before you begin, make sure you have the following installed:

- **[Node.js](https://nodejs.org/en/)** (Version 18.20.2)
- **[NPM](https://www.npmjs.com/)** (comes bundled with Node.js)
- **[FFMPEG](https://www.ffmpeg.org/)**


## Installation

Follow these steps to set up MeowBot:

1. **Clone the Repository**

    ```bash
    git clone https://github.com/ryokr/MeowBot.git
    ```

2. **Navigate to the Project Directory**

    ```bash
    cd MeowBot
    ```

3. **Install Dependencies**

    ```bash
    npm i
    ```

4. **Configure Discord Bot Token**

    Create a `.env` file and add your token:

    ```bash
    echo "token=INSERT_YOUR_TOKEN_HERE" > .env
    ```


## Bot Permissions

To ensure MeowBot works properly, set the following permissions:

- **Application Scope** Enable `applications.commands` `bot` in the **OAuth2** tab on [Developer Portal](https://discord.com/developers/applications/).

- **Intents** Enable `PRESENCE INTENT` `SERVER MEMBERS INTENT` `MESSAGE CONTENT INTENT` in the **Bot** tab on [Developer Portal](https://discord.com/developers/applications/).


## Configuration

After installation, configure the bot:

1. **Add Discord API Token**

    Open the `.env` file and paste your token.

2. **Customize Bot Status**

    Edit the `activity` and other related variables in the `config.json` file to set bot's status or simply add it to `.env` file.


## Starting the Bot

To start MeowBot, run:

```bash
node index.js
```

## Hosting

> This bot can be hosted anywhere that supports Node.js


## Support

> Contact me [ryohuy2410](https://discord.gg/fTuGFk9ayG) for any issue.

## Credits

> If you consider using this Bot, make sure to credit me ><.
> Example: `From [ryohuy2410](https://discord.gg/fTuGFk9ayG) with luv, meowed by [modifier/your Name](<url>)` :3.

## Contributing

> If you wanna help improve the Bot, fix spelling or design Errors or if possible even code errors, you may create PULL REQUESTS.
> Please consider, that [**ryokr**](https://github.com/ryokr) is the main Developer of this Bot, everyone else helped just once or sometimes more often.
> Thanks to anyone who considers helping me :3.