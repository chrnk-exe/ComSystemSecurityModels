import os.path
import pathlib


PERMISSIONS_LIST = [
    {'id': 'top_secret', 'title': 'Top Secret', 'value': 10},
    {'id': 'secret', 'title': 'Secret', 'value': 6},
    {'id': 'confidential', 'title': 'Confidential', 'value': 4},
    {'id': 'public', 'title': 'Public', 'value': 0},
]

TRACKED_DIRECTORY_PATH = 'directories'

base_dir = pathlib.Path().resolve()
DB_PATH = os.path.join(base_dir, 'db.json')
