import os.path
import shutil

from config import TRACKED_DIRECTORY_PATH
from utils import chose_dir_path, chose_file_path, get_db_json, error_occurred


def copy_file():
    dir_list = os.listdir(TRACKED_DIRECTORY_PATH)

    if len(dir_list) < 2:
        return error_occurred(f'There is only {len(dir_list)} dir was found, at least 2 dirs required')

    print('Chose file location')
    path_from = chose_dir_path()
    if path_from == -1:
        return

    print('Chose file')
    file_path = chose_file_path(path_from)
    if file_path == -1:
        return

    print('Chose final location')
    path_to = chose_dir_path()
    if path_to == -1:
        return

    data = get_db_json()

    dir_from_permission = data.get(path_from, None)
    dir_from_permission_value = dir_from_permission.get('value', 0) if dir_from_permission is not None else 0

    dir_to_permission = data.get(path_to, None)
    dir_to_permission_value = dir_to_permission.get('value', 0) if dir_to_permission is not None else 0

    if dir_from_permission_value > dir_to_permission_value:
        return error_occurred('Destination directory has lower permission level')

    shutil.copy2(file_path, path_to)
    dir_list = os.listdir(path_to)

    print(f'=== Result Directory listing({path_to}) ===')
    for index, dir_name in enumerate(dir_list):
        print(f'{index + 1}. {dir_name}')
