<h2>Dictionary application setup</h2>

The application is implemented using Java Spring Boot on the server, and ReactJS on the client.

<h4>Running application on docker containers</h4>

In order to create Docker containers make sure to have docker and docker-compose installed.
Depending on host OS installation can differ. Check documentation here: https://docs.docker.com/compose/install/#install-compose

The solution provides docker-compose.yml file which is building two docker containers: one for the client and one for the server. 
The default configuration will run the server on port 8081, and client on port 3001 port. (if these ports are occupied by some other process, you can change them in docker-compose.yml)

To start docker-compose in <i>dictionary/</i> run command (this can take few minutes):

    docker-compose -f "docker-compose.yml" up -d --build

If docker containers are started successfully, something like this should be shown in console:

    Creating dictionary_server_1 ... done
    Creating dictionary_frontend_1 ... done

The application should be available on http://localhost:3001 

To stop and remove docker containers in <i>dictionary/</i> run
    
    docker-compose -f "docker-compose.yml" down

<h4>Running application on local machine</h4>

<h5>Running Server</h5>

In order to run server latest versions of Java and Maven have to be installed. Check the documentation here: 
https://www.java.com/en/download/help/download_options.xml#windows
https://maven.apache.org/download.cgi

In <i>dictionary/server</i> run command: 

    mvn clean spring-boot:run

The server will be running on port 8080

    Running server unit tests

In <i>dictionary/server</i> run command: 

    mvn test

<h5>Running client</h5>

In order to run the client latest version of Node has to be installed. Check the documentation here: https://nodejs.org/en/download/

<i><b>Note: The final configuration is made for docker. In order to run client locally in dictionary/client/package.json change proxy setting from 

    "proxy": "http://server:8080" 
    to
    "proxy": "http://localhost:8080"
</b></i>

In <i>dictionary/client</i> run
   
    npm install 
    npm start

The client will be running on port 3000 and should be available on http://localhost:3000 

<h5>Running client unit tests </h5>

In <i>dictionary/client</i> run

    npm install (if not done already)
    npm test

Both server and client have to be up and running to use the application

<h4>Additional notes:</h4>
<li>Bootstrap is used via the react-bootstrap package. </li>
<li>UI is fully responsive and compatible for use on mobile devices.</li>
<li>Tests on the client are written using Jest and Enzyme</li>

