## PDF REMOTE VIEWER

### Install essential npm packages

> npm i && cd client && npm i && cd ..

### Startup server in Production mode (after react app built)

> For Linux, macOS
> cd client && npm build && cd .. && NODE_API_MODE=PRODUCTION npm run start

> For Windows
> cd client && npm build && cd .. && set "NODE_API_MODE=PRODUCTION" npm run start


### Run Development mode

* Client:
> For Linux, macOS
> cd client && REACT_APP_API_MODE=LOCAL 

> For Windows
> cd client && set "REACT_APP_API_MODE=LOCAL" && npm start

* Server:
> NODE_API_MODE=LOCAL npm run start

