# 0.6 New note in Signle page app diagram

The diagram below depicts the sequence of steps that take place when adding a new note to the Single page app version of the notes webpage.

```mermaid

sequenceDiagram
    participant browser
    participant server

    Note right of browser: The browser sends the form input in JSON format to the server via HTTP POST.

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: HTTP status code 201 Created
    deactivate server

    Note left of server: The server responds with status code 201, which <br> does not cause the webpage to reload. 

    Note right of browser: Instead the JavaScript code that runs in the browser is updating the notes list <br> that it retrieved when last loading the webpage and renders this list.