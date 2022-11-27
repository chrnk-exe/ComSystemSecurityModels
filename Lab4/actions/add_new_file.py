import os

from utils import error_occurred, chose_dir_path


def add_new_file():
    print('Chose new file location')
    path = chose_dir_path()
    if path == -1:
        return

    filename = input('Enter filename: ')
    dir_list = os.listdir(path)

    if filename in dir_list:
        return error_occurred('File with that name already exists')

    data = input('Enter file data: ')

    result_path = os.path.join(path, filename)

    with open(result_path, 'w') as file:
        file.write(data)
