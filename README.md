Simple Blog Application

The project is divided into two parts, frontend and backend. 
Backend is built using Python, Postgres and FastAPI.
Frontend is built using Javascript, CSS, React and React Quill.

The frontend is at the root ./
The Backend is at the ./backend folder.

You can Deploy the backend with the ./backend as excecution point. The server is started with ```gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app``` .
Also assign the postgres database external URL to the Environment variable.

you can deploy the frontend with the ./ as excecution point. The frontend is triggered with ```npm start```. 
