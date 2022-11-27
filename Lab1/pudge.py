import os
import time
from tkinter import Tk 
from working import Working

def copying_to_clipboard(str):
    os.system('echo ' + str.strip() + '| xclip -sel clip')
    
def copy_from_cp_to_file():
    root = Tk()
    root.withdraw()
    clipboard = root.clipboard_get()
    with open('./forest/info.txt', 'w') as f:
        f.write(clipboard)

def track_directory_changes():
    dir_len = 0
    prev_state = set()

    while True:
        dir_list = os.listdir('mid')

        if len(dir_list) != dir_len:
            new_state = set(dir_list)
            message = 'New files detected: ' if len(dir_list) > dir_len else 'Files deletion detected: '

            print(message + str(new_state.symmetric_difference(prev_state)))
            dir_len = len(dir_list)
            prev_state = new_state

def full_hack_mode():
    print('\n\n!!!WARNING!!!\n\n!FULL HACK MODE STARTED!\n\n!!!WARNING!!!\n')
    dir_len = 0
    prev_state = set()

    while True:
        dir_list = os.listdir('mid')

        if len(dir_list) != dir_len:
            new_state = set(dir_list)

            if len(dir_list) > dir_len:
                for filename in new_state.symmetric_difference(prev_state):
                    with open(f'./mid/{filename}', 'r') as file:
                        time.sleep(1)
                        data = file.read()
                        print('DATA: ', data, '\nFILENAME: ', filename)
                        copying_to_clipboard(data)
                        copy_from_cp_to_file()
            dir_len = len(dir_list)
            prev_state = new_state
            
def get_random_file():
    dir_list = os.listdir('mid')
    with open(f"./mid/{dir_list[0]}") as file:
        return file.read()
    

if __name__ == '__main__':

    while True:
        number = 0
        try:
            number = int(input("1. Start tracking;\n"
                        "2. Copy file content to clipboard;\n"
                        "3. Copy from clipboard to file;\n"
                        "4. Exit;\n"
                        "7. FullHackingAnalyzingModeState.\n"
                        "Your choice: "))
        except:
            print('Input NUMBER!')
        if number == 1:
            track_directory_changes()
        elif number == 2:
            Working(
                'Copying to clipboard', 
                copying_to_clipboard, 
                [get_random_file()]
                )
        elif number == 3:
            Working(
                'Copying from cp to file',
                copy_from_cp_to_file,
                []
            )
        elif number == 4:    
            Working('Exiting', exit, [0])
        elif number == 7:
            Working('Starting full mode', full_hack_mode, [])
            