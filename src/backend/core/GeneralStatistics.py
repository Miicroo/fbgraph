import json

class GeneralStatistics(object):

    def __init__(self):
        self.msgsPerUser = []

    def setTotalNumberOfMessages(self, numMsgs):
        self.totalNumberOfMessages = numMsgs
    
    def setMessagesOverTime(self, msgsOverTime):
        self.messagesOverTime = msgsOverTime
    
    def setMessagesPerMonth(self, numMsgs):
        self.messagesPerMonth = numMsgs
        
    def setMessagesPerWeekday(self, numMsgs):
        self.messagesPerWeekday = numMsgs

    def setMessagesPerTime(self, numMsgs):
        self.messagesPerTime = numMsgs

    def setMostCommonWords(self, words):
        self.mostCommonWords = words
        
    def setWordCloud(self, wordCloud):
        self.wordCloud = wordCloud
        
    def setTotalNumberOfMessagesForUser(self, userId, numMsgs):
        self.msgsPerUser.append({'id':userId, 'count':numMsgs})
    
    def __repr__(self):
        content = 'const generalStatistics = new GeneralStatistics()\n'
        content += '\t.setMsgsPerUser(new LabelledData(' + json.dumps(self.msgsPerUser) + ', e => e.name, e => e.count))\n'
        content += '\t.setNumberOfMessages(' + json.dumps(self.totalNumberOfMessages) + ')\n'
        content += '\t.setMsgsOverTime(new LabelledData(' + json.dumps(self.messagesOverTime) + ', e => e.date, e => e.count))\n'
        content += '\t.setMsgsPerMonth(new LabelledData(' + json.dumps(self.messagesPerMonth) + ', e => e.date, e => e.count))\n'
        content += '\t.setMsgsPerWeekday(new LabelledData(' + json.dumps(self.messagesPerWeekday) + ', e => e.date, e => e.count))\n'
        content += '\t.setMsgsPerTime(new LabelledData(' + json.dumps(self.messagesPerTime) + ', e => e.date, e => e.count))\n'
        content += '\t.setMostCommonWords(new LabelledData(' + json.dumps(self.mostCommonWords) + ', e => e.word, e => e.count))\n'
        content += '\t.setWordCloud(new LabelledData(' + json.dumps(self.wordCloud) + ', e => e.word, e => e.count));\n'

        return content
