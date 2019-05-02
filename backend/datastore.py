# Copyright 2015 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

from flask import current_app, jsonify
from google.cloud import datastore

def init_app(app):
    pass

# Fetch the Datastore Client
def get_client():
   return datastore.Client('cachememorymillionaires')

# Return back a JSON object representing a Game Night
def read_game_night(id):
    ds = get_client()
    key = ds.key('Game Night', int(id))
    results = dict(ds.get(key))
    results['Game_Night_Id'] = id

    return jsonify(results)

# Create a Game Night
def create_game_night(host_name):
    ds = get_client()
    kind = 'Game Night'
    key = ds.key(kind)
    entity = datastore.Entity(key=key)
    entity['Host'] = host_name
    ds.put(entity)
    return 'Item has been Created'

# Delete a Game Night
def delete_game_night(id):
    ds = get_client()
    key = ds.key('Game Night', int(id))
    ds.delete(key)
    return 'Item has been successfully deleted'