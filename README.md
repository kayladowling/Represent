# Represent

A simple to use way to see what your local politicians are doing with their elected post. Search by name or ZIP code, or view congress people by state. View district or congress member pages to see information about vote history, party affiliation, and even view recent news. 

Users can create secure accounts using their email in order to save their location and past searches for easy reference.
  
It's now easier than ever to keep tabs on your repesentatives and make sure the **Represent** you. 

## Team

* __Product Owner__: Chris Clark
* __Scrum Master__: Matt Hand
* __Front End Developer__: Jerome "Auggie" Hudak
* __Front End Developer__: Kayla Dowling
* __Full Stack Developer__: Zac Delventhal

**Legacy "Congressional Stalker" Team**

* __Product Owner__: Sean Reimer
* __Scrum Master__: Santosh Gautam
* __Development Team__: Delphine Foo-Matkin
* __Development Team__: Bryan Bierce

## Table of Contents

1. [Usage](#Usage)
2. [Development](#development)
  1. [Requirements](#requirements)
  2. [Installing Dependencies](#installing-dependencies)
  3. [The API's](#the-apis)
  4. [Tasks](#tasks)
3. [Team](#team)
4. [Contributing](#contributing)

## Usage

In order to use the app as a user, simply go to [represent.heroku.com](http://represent.heroku.com) and begin investigating your representatives.

* **Home Page**
* * Type in the name of your congress person to find their page, or a ZIP code to find your district.
* * Click on your state in order to see every congress person broken down by district.
* **Register/Login**
* * Use your email to signup for an account, and save your searches and ZIP code to make your future visits to the site more convenient.
* **Your District**
* * Your district page offers a summation of information on your congressperson in the House of Representatives, as well as your two in the Senate.
* * Has any of your representatives been in the news? Check out the NYTimes feed to the right.
* * For more info, click on the represenative.
* **Your Congressperson**
* * Displays the congress person's bio along with links to their websites.
* * Offers a look at their party loyalty and vote attendance.
* * Displays an in depth analysis fo their ten most recent votes.

## Development

### Requirements

**NPM**:
* bcrypt-nodejs: *0.0.3*
* body-parser: *1.14.2*
* bower: *1.7.2*
* cookie-parser: *1.4.0*
* express: *4.13.3*
* grunt: *0.4.5*
* kerberos: *0.0.17*
* mongoose: *4.3.4*
* morgan: *1.6.1*
* passport: *0.1.17*
* scraperjs: *1.2.0*

**Bower**:
* angular: *1.4.8*
* angular-ui-router: *0.2.15*
* Materialize: *0.97.5*
* angular-resource: *1.4.8*
* jquery: *2.2.0*
* angular-materialize: *0.1.2*
* progressbar.js: *0.9.0*



### Installing Dependencies

From within the root directory:

```
npm install
bower install
```
This will install all npm managed dependencies and then run bower install to manage bower dependencies.

###The APIs

To present the vote history to the user we used the New York Times Congress API. Because this API requires that member votes be requested with that member ID we seeded the database with the basic information from an all members call. To recreate this in your
own environment use the seedConstructors.seedHouse() and seedConstructores.seedSenate() calls once in the server.js file when first running in the new environment.

The flow of data for a regular member search goe as follows:
  -name is input in the search bar on the home page, it will be converted to lowercase on send to make for clean retrieval
  -the name is sent to the database to retrieve their member id.
  -the member id is sent to the client which then makes the call to the member votes portion of the Congress API.
  -Upon receipt of the vote data the client routes to the results page and after storing the data on searchCache on local store
  populates the page with the data from it's location on the rootScope
  -the results page will always check the localStorage cache for any stored data on render to allow for refreshes without losing 
  searched data

Additional steps with a user login or registration:
  -on register or login the users _id from the database is stored on localStorage at the 'loginKey'. The presence of this key is used to check for login in rendering buttons on the nav bar such as logout and previous searches
  -Also placed on localStorage under 'searchCache' is the users current searchCache from the database. This is used to render the searches in the side-nav which can be opened on any view by clicking the previous searches button in the top-nav

### Roadmap

View the project roadmap [here](https://waffle.io/Delorean11/Delorean11)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
