from core.MessageThread import MessageThread
from core.GeneralStatistics import GeneralStatistics
from core.UserStatistics import UserStatistics
from DateTransformer import DateTransformer
from WordParser import WordParser

import json

class ChartGenerator(object):

    def __init__(self, chat_file):
        with open(chat_file) as open_file:
            json_data = json.load(open_file)
            self.message_thread = MessageThread(json_data['people'], json_data['messages'])


    def generate_chart_stats(self,filename='../gui/generated/data.js'):
        dt = DateTransformer()
        wordParser = WordParser()
        generalStats = GeneralStatistics()
        
        people = self.message_thread.people
        messages = self.message_thread.messages

        generalStats.setTotalNumberOfMessages(len(messages))
        generalStats.setMessagesOverTime(dt.getAggregatedMessageCountByDate(messages, '%Y-%m-%d %H:%M'))
        generalStats.setMessagesPerMonth(dt.getMessageCountByDate(messages, '%Y-%m'))
        generalStats.setMessagesPerWeekday(dt.getMessageCountByDate(messages, '%A'))
        generalStats.setMessagesPerTime(dt.getMessageCountByDate(messages, '%H:%M'))
        generalStats.setMostCommonWords(wordParser.getWords(messages, 20))
        generalStats.setWordCloud(wordParser.getWords(messages, 20))

        userStatsList = []
        for user in people:
            userId = user.replace(' ', '_')
            userMessages = [msg for msg in messages if msg['sender'] == user]
            userStats = UserStatistics()
            userStats.setUser({'id':userId, 'name':user});
            userStats.setNumberOfMessages(len(userMessages))
            generalStats.setTotalNumberOfMessagesForUser(user, len(userMessages))
            userStats.setMessagesOverTime(dt.getAggregatedMessageCountByDate(userMessages, '%Y-%m-%d %H:%M'))
            userStats.setMessagesPerMonth(dt.getMessageCountByDate(userMessages, '%Y-%m'))
            userStats.setMessagesPerWeekday(dt.getMessageCountByDate(userMessages, '%A'))
            userStats.setMessagesPerTime(dt.getMessageCountByDate(userMessages, '%H:%M'))
            userStats.setMostCommonWords(wordParser.getWords(userMessages, 20))
            userStats.setWordCloud(wordParser.getWords(userMessages, 20))
            userStatsList.append(userStats)

        self.save(generalStats, userStatsList, filename)
        
    def save(self, generalStats, userStatsList, filename):
        content = repr(generalStats) + '\n'
        content += 'const userStatistics = [];\n'
        for userStats in userStatsList:
            content += repr(userStats) + '\n'
            content += 'userStatistics.push('+userStats.getUserId()+');\n'

        content += 'const backend = new Backend(generalStatistics, userStatistics);'

        with open(filename, 'w+') as f:
            f.write(content)

