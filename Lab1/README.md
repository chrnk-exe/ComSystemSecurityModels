
## TASK

1. Write a program that implements the following functionality:
- Entering and saving a line of text to a file in a private folder (Creating a valuable object)
- Copying data from a private folder file to a public folder file at the user's request.
2. Write an intruder program that implements the following functionality:
- Determining the fact that a new file with information appears in a public folder
- Reading data from a file to the clipboard
- Saving the read data to its own folder (an object accessible to the hacker)

## PoC

Before starting the program initialize the directory with the command:
```sh
python3 __init__.py
```

There are 3 folders in the working directory:
- forest (an object accessible to the violator)
- mid (public object)
- roshpit (private folder with a valuable object)

There are 2 programms:
- ursa.py (user program)
- pudge.py (hacker program)