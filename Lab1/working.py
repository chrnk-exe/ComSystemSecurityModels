import time

class Working:
    def __init__(self, str, callback, args) -> None:
        print(str + '.', end='', flush=True)
        time.sleep(1)
        print('.', end='', flush=True)
        time.sleep(1)
        print('.', end='', flush=True)
        time.sleep(1)
        if callback is exit:
            print(' ' + str + ' successful!', flush=True)
        callback(*args)
        print(' ' + str + ' successful!', flush=True)
