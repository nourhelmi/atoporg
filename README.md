# React & Node.js Skill Test

## Estimated Time

- 60 min

## Requirements

- Bug fix to login without any issues (20min) <br/>
  There is no need to change or add login function.
  Interpret the code structure and set the correct environment by the experience of building projects. <br/>
  Here is a login information. <br/>
  ✓ email: admin@gmail.com  ✓ password: admin123

- Implement Restful API of "Meeting" in the both of server and client sides (40min)<br/>
  Focus Code Style and Code Optimization. <br/>
  Reference other functions.

# INSTRUCTIONS

To get this working I installed monogodb community server through docker and mounted to a specific volume and ran it in a container. then i ran `npm run start` on the server.
I could infer the username and password  from `server/db/config.js` you didn't need to provide it.

NOTE: Used node 18 for this.

Then in the client, i create .env file and set `REACT_APP_BASE_URL=http://localhost:5001/` as env var to point to my running server.

I ran build and start in the Client folder and was able to login.