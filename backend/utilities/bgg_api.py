import pandas
from flask import Flask, jsonify
import requests
import xmltodict

app = Flask(__name__)

BOARD_GAME_GEEK_API = 'https://www.boardgamegeek.com/xmlapi2/'


@app.route('/')
def root():
    return 'Hello, World!'


def get_game_details(game_id):

    url = f'{BOARD_GAME_GEEK_API}/thing'
    querystring = {"id": game_id}
    response = requests.request("POST", url, data="", params=querystring)

    game_details = xmltodict.parse(response.text)

    return jsonify(game_details['items']['item'])


def get_plays(username, game_id):

    url = f'{BOARD_GAME_GEEK_API}/plays'
    querystring = {'id': game_id, 'username': username}
    response = requests.request("POST", url, data="", params=querystring)

    plays = xmltodict.parse(response.text)

    return jsonify(plays)


def clean_collection(collection):

    column_names = {
        '@objectid': 'id',
        '#text': 'name',
    }
    collection_data_frame = pandas.DataFrame.from_dict(collection['items']['item'])
    name_date_frame = pandas.DataFrame.from_dict(list(collection_data_frame['name']))
    status_data_frame = pandas.DataFrame.from_dict(list(collection_data_frame['status']))

    combined_data_frame = pandas.concat([collection_data_frame, name_date_frame, status_data_frame], axis=1, sort=False)
    owned_games = combined_data_frame[combined_data_frame['@own'] == '1']
    cleaned_data_frame = owned_games[['@objectid', '#text', 'numplays', 'image', 'thumbnail']]
    cleaned_data_frame.rename(columns=column_names, inplace=True)
    return cleaned_data_frame.to_dict('records')


def get_collection(username):

    cleaned_collection = None

    url = f'{BOARD_GAME_GEEK_API}/collection'
    querystring = {'username': username}
    response = requests.request("POST", url, data='payload', params=querystring)
    collection = xmltodict.parse(response.text)

    if collection['items'].get('@totalitems') == '0':
        jsonify(f'No Collection found for username: {username}')
    else:
        cleaned_collection = clean_collection(collection)

    return jsonify(cleaned_collection)





