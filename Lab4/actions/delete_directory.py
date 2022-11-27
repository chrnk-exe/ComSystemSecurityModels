import os
import shutil

from config import TRACKED_DIRECTORY_PATH
from utils import chose_dir_path


def delete_directory():
    path = chose_dir_path()
    if path == -1:
        return

    shutil.rmtree(path, ignore_errors=True)
    dir_list = os.listdir(TRACKED_DIRECTORY_PATH)

    print('=== Result Directory listing ===')
    for index, dir_name in enumerate(dir_list):
        print(f'{index + 1}. {dir_name}')
