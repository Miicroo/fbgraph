from core.MessageThread import MessageThread
from DateTransformer import DateTransformer
from StatsSaver import StatsSaver
from WordParser import WordParser

import json

class ChartGenerator(object):

    def __init__(self, chat_file):
        with open(chat_file) as open_file:
            json_data = json.load(open_file)
            self.message_thread = MessageThread(json_data['people'], json_data['messages'])


    def generate_chart_stats(self,filename='../gui/generated/data.js'):
        statsSaver = StatsSaver()
        dt = DateTransformer()
        wordParser = WordParser()

        people = self.message_thread.people
        messages = self.message_thread.messages

        statsSaver.setChatName('A chat')
        statsSaver.setUsers(people)
        statsSaver.setTotalNumberOfMessages(len(messages))
        statsSaver.setMessagesOverTime(dt.getAggregatedMessageCountByDate(messages, '%Y-%m-%d %H:%M'))
        statsSaver.setMessagesPerMonth(dt.getMessageCountByDate(messages, '%Y-%m'))
        statsSaver.setMessagesPerWeekday(dt.getMessageCountByDate(messages, '%A'))
        statsSaver.setMessagesPerTime(dt.getMessageCountByDate(messages, '%H:%M'))
        statsSaver.setMostCommonWords(wordParser.getWords(messages, 20))
        statsSaver.setWordCloud(wordParser.getWords(messages, 20))

        for user in people:
            userId = user.replace(' ', '_')
            userMessages = [msg for msg in messages if msg['sender'] == user]
            statsSaver.setTotalNumberOfMessagesForUser(len(userMessages), userId)
            statsSaver.setMessagesOverTimeForUser(dt.getAggregatedMessageCountByDate(userMessages, '%Y-%m-%d %H:%M'), userId)
            statsSaver.setMessagesPerMonthForUser(dt.getMessageCountByDate(userMessages, '%Y-%m'), userId)
            statsSaver.setMessagesPerWeekdayForUser(dt.getMessageCountByDate(userMessages, '%A'), userId)
            statsSaver.setMessagesPerTimeForUser(dt.getMessageCountByDate(userMessages, '%H:%M'), userId)
            statsSaver.setMostCommonWordsForUser(wordParser.getWords(userMessages, 20), userId)
            statsSaver.setWordCloudForUser(wordParser.getWords(userMessages, 20), userId)
            
        statsSaver.save()

