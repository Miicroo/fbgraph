from Tkinter import *
import os

class ChatChooserUI(object):

    def __init__(self):
        pass

    def choose_chat(self, path='../data'): 
        allChatFiles = [chat for chat in os.listdir(path) if chat[-5:] == '.json']
        
        master = Tk()
        master.wm_title('Choose chat file')

        result = StringVar(master)
        result.set(allChatFiles[0])

        option = OptionMenu(master, result, *allChatFiles)
        option.pack()

        def ok():
            master.destroy()

        button = Button(master, text="OK", command=ok)
        button.pack()

        mainloop()

        return os.path.abspath(path + '/' + result.get())
