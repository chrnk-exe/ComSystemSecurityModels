import os

from config import TRACKED_DIRECTORY_PATH
from utils import error_occurred, print_separator


def create_directory():
    dir_name = input('Enter new directory name: ')
    print_separator()

    try:
        path = os.path.join(TRACKED_DIRECTORY_PATH, dir_name)
        os.mkdir(path)
    except FileExistsError:
        return error_occurred('Directory with that name already exists')

    dir_list = os.listdir(TRACKED_DIRECTORY_PATH)

    print('=== Result Directory listing ===')
    for index, dir_name in enumerate(dir_list):
        print(f'{index + 1}. {dir_name}')
