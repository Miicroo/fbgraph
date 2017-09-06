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
        for userId in users:
            self.generalStats[StatsSaver.USERS].append({'id':userId, 'name':users[userId]})
            self.generalStats[StatsSaver.MSGS_PER_USER].append({'id':userId, 'name':users[userId], 'count': 0})
            self.userStats[userId] = {}

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
        content = 'var backend = (function() {\n'
        content += '\tvar self = {};\n\n'
        content += '\tvar generalStats = '+json.dumps(self.generalStats)+';\n'
        content += '\tvar userStats = '+json.dumps(self.userStats)+';\n\n'

        content += self.__generateGettersForGeneralStats__()+'\n'
        content += self.__generateGettersForUserStats__()+'\n'
        
        content += '\treturn self;\n'
        content += '}());\n'

        return content

    def __generateGettersForGeneralStats__(self):
        getters = ''

        getters += self.__generateGetter__(StatsSaver.CHATNAME, '', 'generalStats', StatsSaver.CHATNAME, '\'\'')
        getters += self.__generateGetter__(StatsSaver.USERS, '', 'generalStats', StatsSaver.USERS, '[]')
        getters += self.__generateGetter__(StatsSaver.TOTAL_NUM_MSGS, '', 'generalStats', StatsSaver.TOTAL_NUM_MSGS, '0')
        getters += self.__generateGetter__(StatsSaver.MSGS_PER_USER, '', 'generalStats', StatsSaver.MSGS_PER_USER, '[]')
        getters += self.__generateGetter__(StatsSaver.MSGS_OVER_TIME, '', 'generalStats', StatsSaver.MSGS_OVER_TIME, '[]')
        getters += self.__generateGetter__(StatsSaver.MSGS_PER_MONTH, '', 'generalStats', StatsSaver.MSGS_PER_MONTH, '[]')
        getters += self.__generateGetter__(StatsSaver.MSGS_PER_WEEKDAY, '', 'generalStats', StatsSaver.MSGS_PER_WEEKDAY, '[]')
        getters += self.__generateGetter__(StatsSaver.MSGS_PER_TIME, '', 'generalStats', StatsSaver.MSGS_PER_TIME, '[]')
        getters += self.__generateGetter__(StatsSaver.MOST_COMMON_WORDS, '', 'generalStats', StatsSaver.MOST_COMMON_WORDS, '[]')
        getters += self.__generateGetter__(StatsSaver.WORD_CLOUD, '', 'generalStats', StatsSaver.WORD_CLOUD, '[]')

        return getters
    
    def __generateGetter__(self, name, params, container, variable, defaultValue=[]):
        methodName = 'get' + name[0].upper() + name[1:]
        containerVariable = container+'[\''+variable+'\']'
        
        method = '\tself.' + methodName + ' = function('+params+') {\n'
        method += '\t\tif(typeof('+containerVariable+') === \'undefined\') {\n'
        method += '\t\t\treturn '+str(defaultValue)+';\n'
        method += '\t\t} else {\n'
        method += '\t\t\treturn '+containerVariable+';\n'
        method += '\t\t}\n'
        method += '\t};\n\n'

        return method

    def __generateGettersForUserStats__(self):
        getters = ''
        
        getters += self.__generateGetter__(StatsSaver.TOTAL_NUM_MSGS+'ForUser', 'userId', 'userStats[userId]', StatsSaver.TOTAL_NUM_MSGS, '0')
        getters += self.__generateGetter__(StatsSaver.MSGS_OVER_TIME+'ForUser', 'userId', 'userStats[userId]', StatsSaver.MSGS_OVER_TIME, '[]')
        getters += self.__generateGetter__(StatsSaver.MSGS_PER_MONTH+'ForUser', 'userId', 'userStats[userId]', StatsSaver.MSGS_PER_MONTH, '[]')
        getters += self.__generateGetter__(StatsSaver.MSGS_PER_WEEKDAY+'ForUser', 'userId', 'userStats[userId]', StatsSaver.MSGS_PER_WEEKDAY, '[]')
        getters += self.__generateGetter__(StatsSaver.MSGS_PER_TIME+'ForUser', 'userId', 'userStats[userId]', StatsSaver.MSGS_PER_TIME, '[]')
        getters += self.__generateGetter__(StatsSaver.MOST_COMMON_WORDS+'ForUser', 'userId', 'userStats[userId]', StatsSaver.MOST_COMMON_WORDS, '[]')
        getters += self.__generateGetter__(StatsSaver.WORD_CLOUD+'ForUser', 'userId', 'userStats[userId]', StatsSaver.WORD_CLOUD, '[]')

        return getters
