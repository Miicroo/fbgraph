import json

from datetime import datetime as dt

from Message import Message
from MessageThread import MessageThread
from Chat import Chat

class Converter(object):
    
    def __init__(self):
        self.__OUTPUT_DIR__ = '../data/'

    def py_Chat_to_json(self, py_chat, name='../data/messages.json'):
        
        for thread in py_chat.threads:
            filename = self.__thread_people_as_string__(thread)
            valid_filename = filename[:245]
            full_path = self.__OUTPUT_DIR__ + valid_filename + '.json'
            with open(full_path, 'w') as f:
                json.dump(thread, f, default=self.__json_encode__, indent=2)

    def __thread_people_as_string__(self, thread):
        str_repr = ''
        for person in thread.people:
            name = person.decode('iso-8859-1').replace(' ', '_')
            str_repr +=  name + '_'
        return str_repr[:-1]

    def py_to_json(self, py_obj, name='messages.json'):
        with open(self.__OUTPUT_DIR__ + name, 'w') as f:
            json.dump(py_obj, f, default=self.__json_encode__, indent=2)

    
    def __json_encode__(self, py_obj):
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
            return py_obj.strftime('%A, %B %d, %Y at %I:%M%p %Z')
        elif isinstance(py_obj, set):
            return list(py_obj)
        raise TypeError('{} is not JSON serializable'.format(repr(py_obj)))
