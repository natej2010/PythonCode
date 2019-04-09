from flask import Flask, request
from utilities.bgg_api import *
from datastore import *
from config import *


app = Flask(__name__)

BOARD_GAME_GEEK_API = 'https://www.boardgamegeek.com/xmlapi2/'

# Test route to verify service is up and running
@app.route('/')
def root():
    return 'Hello, World!!!!'

# Print out the contents of a game night entity
@app.route('/read')
def read():

    return read_game_night(request.args.get('id'))

# Delete the given game night
@app.route('/delete')
def delete():

    return delete_game_night(request.args.get('id'))

# Create a new game night
@app.route('/create')
def create():

    return create_game_night(request.args.get('host'))

# Return details of a specific game
@app.route('/game_details/<game_id>')
def game_details(game_id):

    return get_game_details(game_id)

# Return back how many plays a given user has against a specified game
@app.route('/plays/<username>/<game_id>')
def plays(username, game_id):

    return get_plays(username, game_id)

# Return back the given user's collection
@app.route('/collection/<username>')
def collection(username):

    return get_collection(username)


if __name__ == '__main__':
    # This is used when running locally only. When deploying to Google App
    # Engine, a webserver process such as Gunicorn will serve the app. This
    # can be configured by adding an `entrypoint` to app.yaml.
    # Flask's development server will automatically serve static files in
    # the "static" directory. See:
    # http://flask.pocoo.org/docs/1.0/quickstart/#static-files. Once deployed,
    # App Engine itself will serve those files as configured in app.yaml.
    app.run(host='0.0.0.0', port=8080, debug=True)
