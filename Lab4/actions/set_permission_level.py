import os

from config import TRACKED_DIRECTORY_PATH, PERMISSIONS_LIST
from utils import chose_dir_path, error_occurred, print_separator, update_directory_permissions


def chose_permission():
    if len(PERMISSIONS_LIST) < 1:
        return error_occurred('Permissions were not found(set it at config.py file)')

    print('======== Permissions listing ========')

    for index, permission in enumerate(PERMISSIONS_LIST):
        print(f'{index+1}. {permission["title"]} [id: {permission["id"]}, value: {permission["value"]}]')
    print_separator()

    permission_index = input('Enter permission index: ')
    print_separator()

    try:
        permission_index = int(permission_index)
        if permission_index < 1 or permission_index > len(PERMISSIONS_LIST):
            raise ValueError
    except ValueError:
        return error_occurred('Invalid index')

    return PERMISSIONS_LIST[permission_index-1]


def set_permission_level():
    dir_list = os.listdir(TRACKED_DIRECTORY_PATH)

    if len(dir_list) < 1:
        return error_occurred('Directories were not found')

    path = chose_dir_path()

    if path == -1:
        return

    permission = chose_permission()
    update_directory_permissions(path, permission)
