# reader.py
# this script polls an endpoint for messages and reads them aloud

import sys
import time
import requests
import pyttsx3

URL = sys.argv[1]
PASSWORD = sys.argv[2]
VOICE_ENGINE = pyttsx3.init()


def say(words):
    """
    Uses Text-to-Speech to speak.
        :param words: Something to say.
    """
    VOICE_ENGINE.say(words)
    VOICE_ENGINE.runAndWait()


def get_messages():
    """
    Recursively retrieve and speak all messages.
        :param url: Endpoint address.
        :param pw: Password for endpoint.
    """
    r = requests.post(url=URL, json={'password':PASSWORD})
    if r.status_code == 204:
        return
    elif r.status_code != 200:
        print('Unexpected response! Code: ' + r.status_code)
    message = r.json()
    say('from ' + message['from'])
    say(message['content'])
    get_messages()


# poll for messages
while True:
    get_messages()
    time.sleep(5)