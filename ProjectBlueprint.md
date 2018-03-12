# Spotify Mainstream Project Blueprint

### Names:
Kathryn Hite, Keenan Zucker

### Abstract:

Spotify Mainstream!

Planning music for a party is difficult! We want to develop an easy way for someone to analyze their friends Spotify preferences to create a well-received and non-offensive playlist for a party. 

### Goals:

##### Keenan's Goals: 
- I want to get a more complete understanding of web development, especially in context of integrations, deployment, and scaling. 
- At the same time, I want to make a product that is usable and polished to a certain extent.
- I also want to gain some fluency/competency with new web technologies.


##### Katie's Goals:
- Be able to implement the production and integration tools for an application and understand which are necessary before initial deployment.
- Become an advanced level Node programmer
- Learn new frameworks / languages

##### Team Goals:
- Learn some new tech/frameworks
- Follow through with production implementation goals (keep unit testing throughout, for example)
- Make a useable app! Think about UX 
- Publish it somewhere at the end! Promote it and #profit

### Feature Set:

##### MVP: 
- A web application that saves a user’s Spotify login and friend information
- Spotify authentication through user account
- Allows the user to select a set of friends
- Plays random songs from those friends’ playlists
- Show as a ‘playlist’ on the app
- Choice of playlist/party length

##### Next Steps: 
- Improve UI/UX
- Save friend songs as a playlist / optionally delete the playlist
- Edit / Delete songs from the playlist
- Integrated web player / how do we play full versions nicely?
- More sophisticated song selection algorithm: use most recent friend songs, pull from top charts playlists based on recently played artists by friends
- Add more testings (through the whole pyramid)

##### Stretch Goals: 
- Messages (thru FB) selected friends for them to login, therefore giving better algorithm selections
- Interface for the user to select attributes of the friend playlist generation
- Collaborative playlist creation (friends can add songs to list, based on similar suggested songs)
- Select genres as well as friends
- Context analysis (should we exclude songs with certain content)
- Analytics! Dashboards! Big Data! ML bc why not!
- Integrate with SoundCloud/AppleMusic/GooglePlay/AmazonMusic?


### System Architecture:

##### Frontend: 
- React
- Redux

##### Backend: NodeJS with Express
- We chose Node as our backend mostly because we both have some level of familiarity with it, and having a consistent JS structure will make some things easier. 
- We are both interested in learning Go, but that's probably out of scope for the purpose of this project. 

##### Database: 
- We are using mySQL because we don’t see ourselves needing to store complex data, and the tabular format works for simple login information
- We also chose the database as a learning area given our lack of experience with SQL
- Also fuck mongo
- Hosting the database on the free tier of Amazon RDS

### Project Timeline:

- Week 0: Project Blueprint → Set up Hello World
- Weeks 1-3: Testing → Finish MVP
- Week 4: Continuous Integration
- Weeks 5-6: Deployment
- Week 7: Feature Development → Ideally Next Steps done
- Weeks 8-9: Docker
- Week 10: Feature Development → Ideally Stretch Goals
- Weeks 11-12: Kubernetes → Documentation


### Risks:
- We don't have much experience with SQL, but our project isn't super database intensive so we foresee it will be alright. 
- Over-scoping the project / realizing that things we wanted to do were way more complicated than we anticipated. 
- Getting caught up in learning a new technology to an unnecessary depth
- Getting lost in Hieu's eyes….. mmmmm…...

### Documentation Plan:

- Nice landing page with signup info (this for sure)
- README & Markdown stuff in the repo (this for sure too)
- Medium publication of how we build this maybe? If time

### Appendix/Resources:

[Spotify Web Player using API](https://github.com/JMPerez/thirtiflux)

[Setting up React/Redux Medium](https://medium.com/@notrab/getting-started-with-create-react-app-redux-react-router-redux-thunk-d6a19259f71f)

[Setting up React/Redux](https://github.com/notrab/create-react-app-redux)



