import os

from actions import create_directory, set_permission_level, delete_directory, add_new_file, copy_file, display_dir_state
from config import TRACKED_DIRECTORY_PATH, DB_PATH
from utils import print_separator


def chose_action():
    print('\n===== Actions list =====')
    print('0. Exit')
    print('1. Create new directory')
    print('2. Delete directory')
    print('3. Set directory permission level')
    print('4. Add new file')
    print('5. Copy file (from-to))')
    print('6. Display current directory state')

    print_separator()
    return int(input('Enter action number: '))


def main_loop():
    while (count := chose_action()) > 0:
        print_separator()
        if count == 1:
            create_directory()
        elif count == 2:
            delete_directory()
        elif count == 3:
            set_permission_level()
        elif count == 4:
            add_new_file()
        elif count == 5:
            copy_file()
        elif count == 6:
            display_dir_state()

    print('Exit program...')


def structure_integrity_check():
    if not os.path.isdir(TRACKED_DIRECTORY_PATH):
        os.mkdir(TRACKED_DIRECTORY_PATH)

    if not os.path.isfile(DB_PATH):
        with open(DB_PATH, "x"):
            pass


if __name__ == '__main__':
    structure_integrity_check()
    main_loop()
