import json
import ast
from datetime import datetime as dt
from bs4 import BeautifulSoup as bs

from core.Message import Message
from core.MessageThread import MessageThread
from core.Chat import Chat

class HtmlParser(object):
    
    def __init__(self):
        self.DATE_FORMAT = '%A, %B %d, %Y at %I:%M%p %Z'
        self.INPUT_FILE = '../data/messages.htm'

    def parse_to_py(self):
        with open(self.INPUT_FILE, "rb") as f:
            return self.__html_to_py__(f.read().decode('utf-8'))

    def __html_to_py__(self, file):
        soup = bs(file, 'html.parser')
        chat_list = []
        for html_thread in soup.find_all(class_='thread'):
            messages = []
            for html_message in html_thread.find_all(class_='message'):
                message = self.__parse_html_message__(html_message)
                messages.append(message)

            participants_comma_separated_list = self.__encode_string__(html_thread.next_element)
            participants = set(participants_comma_separated_list.split(', '))
            thread = MessageThread(participants, messages)
            chat_list.append(thread)

        chats = self.__aggregate_chats_with_same_participants__(chat_list)
        return Chat(chats)

    def __parse_html_message__(self, html_msg):
        user = self.__encode_string__(html_msg.find(class_='user').string)
        text = self.__encode_string__(html_msg.next_sibling.string)
        date_time = self.__parse_date__(html_msg.find(class_='meta').string)
        
        return Message(user, date_time, text)

    def __encode_string__(self, possible_str):
        if possible_str is None:
            return None
        else:
            return possible_str

    def __parse_date__(self, date_str):
        date_time_str = self.__remove_timezone__(date_str)
        return dt.strptime(date_time_str, self.DATE_FORMAT)

    def __remove_timezone__(self, date_str):
        plus_index = date_str.find('+')
        if plus_index > 0:
            return date_str[0:plus_index]
        else:
            return date_str

    def __aggregate_chats_with_same_participants__(self, chat_list):
        unice_message_thread_dict = {}
        for message_thread in chat_list:
            people = str(sorted(message_thread.people))
            if people in unice_message_thread_dict:
                unice_message_thread_dict[people] += message_thread.messages
            else:
                unice_message_thread_dict[people] = message_thread.messages

        chats = []
        for people_str in unice_message_thread_dict.keys():
            people = ast.literal_eval(people_str)
            chats.append(MessageThread(people, unice_message_thread_dict[people_str]))
            
        return chats
