class Chat(object):
    """Contains a list of Threads"""

    def __init__(self, threads):
        self.threads = threads
        self.personDict = {person: self.__by(person) for person in
                           {ppl for thread in self for ppl in thread.people}}
        self.messages = sorted([y for x in self.threads for y in x])

    def __getitem__(self, key):
        if type(key) is int: return self.threads[key]
        elif type(key) is str: return self.personDict[key]

    def __repr__(self): return '<FbMsg len(threads)={}>'.format(len(self))

    def __len__(self): return len(self.threads)

    # returns a date-sorted list of messages sent by "name"
    def __by(self, name):
        return sorted([msg for thread in self
                       if name in thread.people
                       for msg in thread.by(name)])

    def sent_before(self, date):
        return [msg for thread in self for msg in thread.sent_before(date)]

    def sent_after(self, date):
        return [msg for thread in self for msg in thread.sent_after(date)]

    def sent_between(self,start,end):
        return [msg for thread in self for msg in thread.sent_between(start,end)]


