# Indego API

- Built with Node.js version 15.11.0
- Built upon the [Express](https://expressjs.com/) framework
- Uses The Indego GeoJSON station status API
- Uses the Open Weather Map API
- Uses a static JWT token for authentication
- Deployed to heroku

## APIs
1. The API is deployed on heroku.

1. There are three main endpoints which can be viewed on swagger [here](https://indego-api.herokuapp.com/api/v1/swagger).
   
1. Each endpoint is protected by a Bearer auth token which acts as an authentication layer
    * Set request header (or in the `Authorize` tab in swagger): `Authorization: Beaer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXNzYWdlIjoiZHVtbXkgc3RhdGljIHRva2VuIiwiaWF0IjoxNjIwNTQ1NjY0LCJleHAiOjE2MjMxMzc2NjR9.nxbpAbZ4kb5exQrK_ZhRl_qZlu600GJkDlZJvXftF14`
    * **Note** - This token is valid for 30 days
    
### Cron job
To enable the job to fetch data from the indego API after every hour,
set the `ENABLE_CRON_JOB` to true in the environment variables.

## Starting the API locally
**Note**: Replace `yarn` with `npm` if you are not a `yarn` user.
* Make sure to create a `.env` file at the root of the project and place the required environment variables (a `.env.example` file is provided for reference)
* At the root of the project directory, run:
    * `yarn install`
    * `yarn start:dev`

## Testing
* At the root of the project, run
    * `yarn test`
    
### Front end UI
Go [here](https://github.com/usmanzaheer1995/indego-ui) and follow the instructions to
start up the app in the browser.
