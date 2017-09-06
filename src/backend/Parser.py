import json
import ast
from datetime import datetime as dt
from bs4 import BeautifulSoup as bs

from Message import Message
from MessageThread import MessageThread
from Chat import Chat

DATE_FORMAT = '%A, %B %d, %Y at %I:%M%p %Z'

def html_to_py(file):
    soup = bs(file, 'html.parser')
    chat_list = []
    for html_thread in soup.find_all(class_='thread'):
        messages = []
        for html_message in html_thread.find_all(class_='message'):
            message = parse_html_message(html_message)
            messages.append(message)

        participants_comma_separated_list = encode_string(html_thread.next_element)
        participants = set(participants_comma_separated_list.split(', '))
        thread = MessageThread(participants, messages)
        chat_list.append(thread)

    chats = aggregate_chats_with_same_participants(chat_list)
    return Chat(chats)

def parse_html_message(html_msg):
    user = encode_string(html_msg.find(class_='user').string)
    text = encode_string(html_msg.next_sibling.string)
    date_time = parse_date(html_msg.find(class_='meta').string)
    
    return Message(user, date_time, text)

def encode_string(possible_str):
    if possible_str is None:
        return None
    else:
        return possible_str.encode('utf-8')

def parse_date(date_str):
    date_time_str = remove_timezone(date_str)
    return dt.strptime(date_time_str, DATE_FORMAT)

def remove_timezone(date_str):
    plus_index = date_str.find('+')
    if plus_index > 0:
        return date_str[0:plus_index]
    else:
        return date_str

def aggregate_chats_with_same_participants(chat_list):
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
    

def json_encode(py_obj):
    if isinstance(py_obj, Chat):
        return {'threads': py_obj.threads}
    elif isinstance(py_obj, MessageThread):
        return {'messages': py_obj.messages,
                'people': py_obj.people}
    elif isinstance(py_obj, Message):
        return {'text': py_obj.text,
                'date_time': py_obj.date_time,
                'sender': py_obj.sender}
    elif isinstance(py_obj, dt):
        return py_obj.strftime(DATE_FORMAT)
    elif isinstance(py_obj, set):
        return list(py_obj)
    raise TypeError('{} is not JSON serializable'.format(repr(py_obj)))

def py_to_json(py_obj, name='../messages.json'):
    with open(name, 'w') as f:
        json.dump(py_obj, f, default=json_encode, indent=2)

if __name__ == "__main__":
    with open('../messages.htm', "rb") as f:
        chat = html_to_py(f.read().decode('utf-8'))
        py_to_json(chat)
