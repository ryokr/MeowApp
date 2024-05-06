# MusicBot

This is a simple Discord bot that can play music in voice channels.

## Installation

1. Make sure you have Node.js and npm installed on your system.
2. Clone this repository to your local machine.
3. Navigate to the project directory in your terminal.
4. Run the following command to install dependencies:

```bash
npm install
```

## Usage

To start the bot, run the following command:

```bash
node index.js
```

## Music Bot

This bot provides functionalities to play, pause, stop, and resume music in a Discord voice channel.

### Commands

- `play [song_name]` - Play a song. Provide the name or URL of the song to play.
- `pause` - Pause the currently playing song.
- `resume` - Resume playback of the paused song.
- `stop` - Stop playback and disconnect the bot from the voice channel.
- `skip` - Skip the current song and play the next one in the queue.
- `queue` - View the current song queue.
- `volume [value]` - Adjust the volume of the bot. Provide a value between 1 and 100.

### Example Usage

To play a song:

```
!play Despacito
```

To pause the currently playing song:

```
!pause
```

## Contributing

Contributions are welcome! Feel free to open a pull request for any improvements or fixes.

## License

This project is licensed under the [MIT License](LICENSE).
