import json
import os
import sys

class StatsSaver:
    FILE_NAME = '../gui/generated/data.js'
    CHATNAME = 'chatName'
    USERS = 'users'
    TOTAL_NUM_MSGS = 'totalNumberOfMessages'
    MSGS_PER_USER = 'messagesPerUser'
    MSGS_OVER_TIME = 'messagesOverTime'
    MSGS_PER_MONTH = 'messagesPerMonth'
    MSGS_PER_WEEKDAY = 'messagesPerWeekday'
    MSGS_PER_TIME = 'messagesPerTime'
    MOST_COMMON_WORDS = 'mostCommonWords'
    WORD_CLOUD = 'wordCloud'

    def __init__(self):
        self.generalStats = {}
        self.userStats = {}

    def setChatName(self, name):
        self.generalStats[StatsSaver.CHATNAME] = name

    def setUsers(self, users):
        self.generalStats[StatsSaver.USERS] = []
        self.generalStats[StatsSaver.MSGS_PER_USER] = []
        for name in users:
            user_id = name.replace(' ', '_')
            self.generalStats[StatsSaver.USERS].append({'id':user_id, 'name':name})
            self.generalStats[StatsSaver.MSGS_PER_USER].append({'id':user_id, 'name':name, 'count': 0})
            self.userStats[user_id] = {}

    def setTotalNumberOfMessages(self, numMsgs):
        self.generalStats[StatsSaver.TOTAL_NUM_MSGS] = numMsgs
    
    def setMessagesOverTime(self, msgsOverTime):
        self.generalStats[StatsSaver.MSGS_OVER_TIME] = msgsOverTime
    
    def setMessagesPerMonth(self, numMsgs):
        self.generalStats[StatsSaver.MSGS_PER_MONTH] = numMsgs
        
    def setMessagesPerWeekday(self, numMsgs):
        self.generalStats[StatsSaver.MSGS_PER_WEEKDAY] = numMsgs

    def setMessagesPerTime(self, numMsgs):
        self.generalStats[StatsSaver.MSGS_PER_TIME] = numMsgs

    def setMostCommonWords(self, words):
        self.generalStats[StatsSaver.MOST_COMMON_WORDS] = words
        
    def setWordCloud(self, wordCloud):
        self.generalStats[StatsSaver.WORD_CLOUD] = wordCloud
        
    def setTotalNumberOfMessagesForUser(self, numMsgs, userId):
        self.userStats[userId][StatsSaver.TOTAL_NUM_MSGS] = numMsgs
        for i in range(0, len(self.generalStats[StatsSaver.MSGS_PER_USER])):
            if self.generalStats[StatsSaver.MSGS_PER_USER][i]['id'] == userId:
                self.generalStats[StatsSaver.MSGS_PER_USER][i]['count'] = numMsgs
                break
    
    def setMessagesOverTimeForUser(self, msgsOverTime, userId):
        self.userStats[userId][StatsSaver.MSGS_OVER_TIME] = msgsOverTime
    
    def setMessagesPerMonthForUser(self, numMsgs, userId):
        self.userStats[userId][StatsSaver.MSGS_PER_MONTH] = numMsgs
        
    def setMessagesPerWeekdayForUser(self, numMsgs, userId):
        self.userStats[userId][StatsSaver.MSGS_PER_WEEKDAY] = numMsgs

    def setMessagesPerTimeForUser(self, numMsgs, userId):
        self.userStats[userId][StatsSaver.MSGS_PER_TIME] = numMsgs

    def setMostCommonWordsForUser(self, words, userId):
        self.userStats[userId][StatsSaver.MOST_COMMON_WORDS] = words
        
    def setWordCloudForUser(self, wordCloud, userId):
        self.userStats[userId][StatsSaver.WORD_CLOUD] = wordCloud

    def save(self):
        with open(StatsSaver.FILE_NAME, 'w+') as f:
            f.write(self.__createJsContents__())

    
    def __createJsContents__(self):
        content = self.__generateGettersForGeneralStats__()+'\n'
        content += self.__generateGettersForUserStats__()+'\n'
        content += 'const backend = new Backend(generalStatistics, userStatsList);\n'

        return content
    
    def __generateGettersForGeneralStats__(self):
        content = 'const generalStatistics = new GeneralStatistics()\n'
        content += '\t.setMsgsPerUser(new LabelledData(' + json.dumps(self.generalStats[StatsSaver.MSGS_PER_USER]) + ', e => e.name, e => e.count))\n'
        content += '\t.setNumberOfMessages(' + json.dumps(self.generalStats[StatsSaver.TOTAL_NUM_MSGS]) + ')\n'
        content += '\t.setMsgsOverTime(new LabelledData(' + json.dumps(self.generalStats[StatsSaver.MSGS_OVER_TIME]) + ', e => e.date, e => e.count))\n'
        content += '\t.setMsgsPerMonth(new LabelledData(' + json.dumps(self.generalStats[StatsSaver.MSGS_PER_MONTH]) + ', e => e.date, e => e.count))\n'
        content += '\t.setMsgsPerWeekday(new LabelledData(' + json.dumps(self.generalStats[StatsSaver.MSGS_PER_WEEKDAY]) + ', e => e.date, e => e.count))\n'
        content += '\t.setMsgsPerTime(new LabelledData(' + json.dumps(self.generalStats[StatsSaver.MSGS_PER_TIME]) + ', e => e.date, e => e.count))\n'
        content += '\t.setMostCommonWords(new LabelledData(' + json.dumps(self.generalStats[StatsSaver.MOST_COMMON_WORDS]) + ', e => e.word, e => e.count))\n'
        content += '\t.setWordCloud(new LabelledData(' + json.dumps(self.generalStats[StatsSaver.WORD_CLOUD]) + ', e => e.word, e => e.count));\n'

        return content
    
    def __generateGettersForUserStats__(self):
        content = 'const userStatsList = [];\n'
        for (index, user) in enumerate(self.generalStats[StatsSaver.USERS]):
            user_id = user['id']
            content += 'const user'+str(index)+' = new UserStatistics()\n'
            content += '\t.setUser(' + json.dumps(user) + ')\n'
            content += '\t.setNumberOfMessages(' + json.dumps(self.userStats[user_id][StatsSaver.TOTAL_NUM_MSGS]) + ')\n'
            content += '\t.setMsgsOverTime(new LabelledData(' + json.dumps(self.userStats[user_id][StatsSaver.MSGS_OVER_TIME]) + ', e => e.date, e => e.count))\n'
            content += '\t.setMsgsPerMonth(new LabelledData(' + json.dumps(self.userStats[user_id][StatsSaver.MSGS_PER_MONTH]) + ', e => e.date, e => e.count))\n'
            content += '\t.setMsgsPerWeekday(new LabelledData(' + json.dumps(self.userStats[user_id][StatsSaver.MSGS_PER_WEEKDAY]) + ', e => e.date, e => e.count))\n'
            content += '\t.setMsgsPerTime(new LabelledData(' + json.dumps(self.userStats[user_id][StatsSaver.MSGS_PER_TIME]) + ', e => e.date, e => e.count))\n'
            content += '\t.setMostCommonWords(new LabelledData(' + json.dumps(self.userStats[user_id][StatsSaver.MOST_COMMON_WORDS]) + ', e => e.word, e => e.count))\n'
            content += '\t.setWordCloud(new LabelledData(' + json.dumps(self.userStats[user_id][StatsSaver.WORD_CLOUD]) + ', e => e.word, e => e.count));\n'
            content += 'userStatsList.push(user'+str(index)+');\n'
        return content
