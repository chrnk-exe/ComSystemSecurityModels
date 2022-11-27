import os

from config import TRACKED_DIRECTORY_PATH
from utils import get_db_json


def display_dir_state():
    dir_list = os.listdir(TRACKED_DIRECTORY_PATH)
    data = get_db_json()

    print(f'=== Current directories state ===')
    for index, dir_name in enumerate(dir_list):
        permission = data.get(os.path.join(TRACKED_DIRECTORY_PATH, dir_name), None)

        if permission is not None:
            title = permission.get('title', None)
            value = permission.get('value', None)
            print(f'{index + 1}. {dir_name} - {title} ({value})')
        else:
            print(f'{index + 1}. {dir_name} - not assigned')
