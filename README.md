# MusicBot

Simple Discord bot that can play music

## Installation

1. Make sure you have Node.js and npm installed on your system.
2. Clone this repo to your local machine.
3. Navigate to the project directory in your terminal.
4. Run the following command to install dependencies:

```bash
npm install
```
5. To start the bot, run the following command:

```bash
node index.js
```

## Hosting

1. Fork this repo
2. Go to Render then create a Web Service
3. Paste the link of repo you have forked
4. Enter the build command below:

```bash
npm install
```
5. Enter the start command as below:

```bash
node index.js
```
6. Go to Discord Dev Portal to get your app's token
7. Create env TOKEN then assign the token to it
8. Start the project

### Commands

- `play [name]` - Play a song. Provide the name or URL of the song to play.
- `pause` - Pause the currently playing song.
- `resume` - Resume playback of the paused song.
- `stop` - Stop playback and disconnect the bot from the voice channel.
- `skip` - Skip the current song and play the next one in the queue.
- `queue` - View the current song queue.
- `volume [value]` - Adjust the volume of the bot. Provide a value between 1 and 100.

### Example Usage

To play a song:

```
/play Despacito
```

To pause the currently playing song:

```
/pause
```

## Contributing

Contributions are welcome! Feel free to open a pull request for any improvements or fixes.

## License

This project is licensed under the [MIT License](LICENSE).
