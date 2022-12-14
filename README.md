# HelloThere

<img alt="Hello there" width="480" height="208" src="https://media1.giphy.com/media/xTiIzJSKB4l7xTouE8/giphy.gif">

### Node Express TS + SQL server
External API's: swapi.dev, openweathermap.org

### Setup environment

This project requires local .env files in root directory to run correctly.<br>
Required env values:

```
.env
DB_PASS = <SQL_database_pass>
DB_NAME = <SQL_database_name>
JWT_SECRET= <Secret_to_generate_jwt_token>
WEATHER_KEY= <API_KEY_from_openweathermap.org>
```

```
.env.test
DB_PASS = <SQL_database_pass>
DB_NAME = <SQL_database_name>
JWT_SECRET= <Secret_to_generate_jwt_token>
```

### Endpoints
User:<br>
Register user: ```/api/v1/register```</br>
Login user: ```/api/v1/login```

Star wars characters:<br>
Get all characters: ```/api/v1/starwars/getall/```<br> Available page quering eg. ```/?page=2``` also if page is declared, you can use ```&format=wookiee``` to get data in wookie's language.

Get filtered characters (required Authorization: Bearer token):<br>
```/api/v1/starwars/getfiltered/```<br> Available quering by values from people object swapi.dev

Weather (required Authorization: Bearer token):<br>
```/api/v1/weather```<br>
Weather data updates every hour.


