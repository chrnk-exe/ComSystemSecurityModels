import json
import os
from json import JSONDecodeError

from config import TRACKED_DIRECTORY_PATH, DB_PATH


def print_separator():
    print('------------------------\n')


def error_occurred(message):
    print(f'Error! {message}. Back to action chose...')
    return -1


def chose_dir_path():
    dir_list = os.listdir(TRACKED_DIRECTORY_PATH)

    if len(dir_list) < 1:
        return error_occurred('Directories were not found')

    print('=== Directory listing ===')
    for index, dir_name in enumerate(dir_list):
        print(f'{index + 1}. {dir_name}')
    print_separator()

    chosen_dir_index = input(f'Enter chosen directory index(1 - {len(dir_list)}): ')
    print_separator()

    try:
        chosen_dir_index = int(chosen_dir_index)
        if chosen_dir_index < 1 or chosen_dir_index > len(dir_list):
            raise ValueError
    except ValueError:
        return error_occurred('Invalid index')

    return os.path.join(TRACKED_DIRECTORY_PATH, dir_list[chosen_dir_index - 1])


def chose_file_path(path):
    files_list = os.listdir(path)

    if len(files_list) < 1:
        return error_occurred('Files were not found')

    print('=== Files listing ===')
    for index, filename in enumerate(files_list):
        print(f'{index + 1}. {filename}')
    print_separator()

    chosen_file_index = input(f'Enter chosen file index(1 - {len(files_list)}): ')
    print_separator()

    try:
        chosen_file_index = int(chosen_file_index)
        if chosen_file_index < 1 or chosen_file_index > len(files_list):
            raise ValueError
    except ValueError:
        return error_occurred('Invalid index')

    return os.path.join(path, files_list[chosen_file_index - 1])


def update_directory_permissions(folder_name, permission):
    if not os.path.isfile(DB_PATH):
        with open(DB_PATH, 'w'):
            pass

    with open(DB_PATH, 'r+') as db:
        try:
            data = json.loads(db.read())
        except JSONDecodeError:
            data = dict()

        data.update({folder_name: permission})
        db.seek(0)
        db.write(json.dumps(data))
        db.truncate()


def get_db_json():
    with open(DB_PATH, 'r') as db:
        try:
            data = json.loads(db.read())
        except JSONDecodeError:
            data = dict()

        return data
