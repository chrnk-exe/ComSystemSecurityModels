import time
from working import Working   

while True:
    number = int(input("1. Save str to private file;\n2. Copy to public dir;\n3. Exit.\n"))
    if number == 1:
        Working(
            'Writing to private', 
            lambda x: open(x, 'w').write(input("Input your TEXT: ")), 
            ['./roshpit/text.txt']
        )
    elif number == 2:
        Working(
            'Copying to public',
            lambda: 
                open(f'./mid/{str(time.time())}.txt', 'w')
                    .write(open('./roshpit/text.txt', 'r')
                    .read()),
            []
            )
    elif number == 3:
        Working('Trying to exit', exit, [0])        