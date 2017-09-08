from core.MessageThread import MessageThread
import json

class ChartGenerator(object):

    def __init__(self, chat_file):
        with open(chat_file) as open_file:
            json_data = json.load(open_file)
            self.message_thread = MessageThread(json_data['people'], json_data['messages'])


    def generate_chart_stats(self,filename='../gui/generated/data.js'):
        print self.message_thread
