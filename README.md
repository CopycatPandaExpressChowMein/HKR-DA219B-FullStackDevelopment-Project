# HKR-DA219B-FullStackDevelopment-Project
<p>Repository for the group project in the Full Stack Development (DA219B) course at HKR.</p>

# Stack
- MongoDB
- Express
- React
- Node

# Description
<p>This application, the "Police Event Tracker", in simple terms, is designed to pull data from the Swedish Polices public "event" api, store it on a cloud database and then display it for view.</p>

<p>The Express server itself lives on the app.js file, which connects to the database through the use of db.js found in the config directory, as well as credentials defined in a local .env file (Not supplied with the repository).</p>

<p>Every 10 minutes (managed using node-cron) the server will utilize the functions found in the police_api_connection.js to fetch the events from the polices api, parse and attempt to save them. To keep track of events that already exist, a unique eventId, obtained from the public api during the fetch is used when saving to the database. Existing events get updated instead. Finally, events are iterated over and events that haven't been updated for more than 7 days are "archived". That is to say an "archived" variable is set to true for the document.</p>

<p>All requests to the application are routed through routes_index.js, which continues to route them to respective files depending on what they do. All requests with the origin url are routed to a catchall in routes_webpages.js.</p>

# To Install

## Clone git or Download
```bash
https://github.com/CopycatPandaExpressChowMein/HKR-DA219B-FullStackDevelopment-Project.git
```

## Installing dependencies
<p>Open the repository folder in Terminal (Administrator) and run:<br></p>

```bash
npm ci
```

<p>This performs a clean install of all the dependencies found within the package.json file, these are required for the application to run and to be able to develop it.</p>

# Running the application
<p>The `package.json` file included in the repository comes pre-configured with commands to make running the server easier, more info below.</p>

## Backend
<p>Development of the backend is done using Node.js and Express.js</>

### Starting the server normally
<p>Open the repository folder in Terminal (Administrator) and run:<br></p>

```bash
npm run node_start
```

### Starting the server for development
<p>With the server running for development, it **uses nodemon** to make development easier by rebooting when changes are made to the code.<br><br>
Open the repository folder in Terminal (Administrator) and run:<br></p>

```bash
npm run node_dev
```

### Linting code 
<p>Open the repository folder in Terminal (Administrator) and run:<br></p>

```bash
npm run node_lint
```

## Frontend
<p>Development of the frontend is done using React and Vite.</p>

### Starting the frontend for development
<p>With the frontend running for developnent, the server runs on a separate port (Usually port 5173) and doesn't need to be built.<br><br>
Open the repository folder in Terminal (Administrator) and run:<br></p>

```bash
npm run vite_dev
```

### Building the frontend 
<p>In order for changes done to the frontend to be visible while the server is running, it needs to be built.<br><br>
Open the repository folder in Terminal (Administrator) and run:<br></p>

```bash
npm run vite_build
```