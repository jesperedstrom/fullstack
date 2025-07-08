# 0.5 Single page app diagram

The diagram below depicts the sequence of steps that take place when loading the Single page app version of the notes webpage. She steps should be identical to the steps taken when loading the other notes webpage, but a different HTML file and JavaScript code file is loaded (spa.js).

```mermaid

sequenceDiagram
    participant browser
    participant server

    Note right of browser: The browser loads the page by performing a HTTP GET request.

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: HTML document
    deactivate server

    Note right of browser: Reloading the page also requires reloading the CSS file and JavaScript code.

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON data from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: JSON data containing notes.
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes

```