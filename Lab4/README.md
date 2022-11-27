
## TASK

1. Write a program that implements the following functionality:
-  The ability to set access levels for selected folders (for example, Top Secret, Secret, NonSecret).
- To demonstrate the basic principle of the BL model - "Information flows from objects with a high level of confidentiality to objects with a lower level of confidentiality are impossible." A ban on copying files from folders with a higher level of privacy to folders with a lower level should be implemented.

## PoC

config.py contains privacy levels
main.py contains the main functionality of the program

Start the programm with ```sh python3 main.py```