# Speak To My Husband

I wanted to send messages to our home office, at first as a prank but it eventually turned into a fun project!

At current, it's deployed on Glitch as a `Node` app with the `Express` framework. `NES.css` is used as the frontend framework.

My Raspberry Pi polls the server's message queue and reads them out via `pyttsx3` a cross-platform Text-To-Speech library.

Deployed [live on Glitch](https://speak-to-my-husband.glitch.me/)!

&nbsp;

![Image of Speak To My Husband](https://raw.githubusercontent.com/madelinecodes/speak-to-my-husband/master/speak-to-my-husband-preview.png "Image of Speak To My Husband")

![Raspberry Pi](https://raw.githubusercontent.com/madelinecodes/speak-to-my-husband/master/pi.png "Image of Raspberry Pi")

&nbsp;

## Install

Server:

`npm install`

Client:

`pip install requests`

`pip install pyttsx3`

&nbsp;

## Run

Server:

Setup password:

```
Unix Bash (Linux, Mac, etc.):
$ export SECRET=hello

Windows CMD:
> set SECRET=hello

Windows PowerShell:
> $env:SECRET = "hello"
```

`npm start`

Client:

`python reader.py 'https://endpoint-url/' 'password'`

&nbsp;

## License

MIT!
