class MessageThread(object):
    """Contains a list of people included, and messages """

    def __init__(self,people,messages):
        self.people = people
        self.messages = messages

    def __getitem__(self, key): return self.messages[key]

    def __repr__(self):
        return '<Thread people={}, len(messages)={}>'.\
            format(self.people, len(self.messages))

    def __str__(self): return '{}\n{}\n'.format(self.people, self.messages)

    def __len__(self): return len(self.messages)

    def by(self, name):
        return [msg for msg in self if msg.sent_by(name)]

    def sent_before(self, date):
        return [msg for msg in self if msg.sent_before(date)]

    def sent_after(self, date):
        return [msg for msg in self if msg.sent_after(date)]

    def sent_between(self, start, end):
        return [msg for msg in self if msg.sent_between(start, end)]
