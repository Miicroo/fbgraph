class Message(object):
    """Contains the message text, sender, and date/time"""

    def __init__(self, sender, date_time, text):
        self.sender = sender
        self.date_time = date_time
        self.text = text

    def __repr__(self):
        return '<Message date_time={} sender={} text={}'.format(
            self.date_time, self.sender, self.text)

    def __str__(self):
        return '{}\n{}\n{}\n'.format(self.sender, self.date_time, self.text)

    def __lt__(self, message):
        return self.sent_before(message.date_time)

    def __gt__(self, message):
        return self.sent_after(message.date_time)

    def __eq__(self, message):
        return self.date_time == message.date_time

    def sent_by(self, name):
        return self.sender == name

    def sent_before(self,date):
        try:
            return self.date_time < date
        except TypeError:
            return self.date_time.date() < date

    def sent_after(self,date):
        try:
            return self.date_time > date
        except TypeError:
            return self.date_time.date() > date

    def sent_between(self, start, end):
        return self.sent_after(start) and self.sent_before(end)
