from os import getcwd, listdir
from os.path import isfile, join

import datetime
import json
import operator

class MessageParser:
    def __init__(self, projectPath):
        self.projectPath = projectPath 
        self.users = {}
        self.messages = {}
        self.messagesByUser = {}

    def __addUsers__(self, userList):
        for user in userList:
            mId = user['id']
            mName = user['name']
            self.users[mId] = mName

            if not (mId in self.messagesByUser):
                self.messagesByUser[mId] = []

    def __addMessages__(self, messageList):
        for message in messageList:
            mId = message['id']
            self.messages[mId] = message

            fromId = message['from']['id']
            if not (message in self.messagesByUser[fromId]):
                self.messagesByUser[fromId].append(message)

    def parse(self):
        filepath = join(getcwd(), self.projectPath)
        files = [join(filepath, f) for f in listdir(filepath) if isfile(join(filepath, f))]
        
        for jsonFile in files:
            with open(jsonFile) as openJsonFile:
                jsonData = json.load(openJsonFile)

            if 'to' in jsonData:
                self.__addUsers__(jsonData['to']['data'])

            if 'comments' in jsonData:
                jsonData = jsonData['comments']

            if 'data' in jsonData:
                self.__addMessages__(jsonData['data'])

    def getMessages(self):
        return self.messages.values()

    def getMessagesByUser(self, userId):
        return self.messagesByUser[userId]

    def getUsers(self):
        return self.users

    def getUser(self, userId):
        return self.users[userId]

class DateTransformer:
    CREATE_TIME_FORMAT = '%Y-%m-%dT%H:%M:%S'
    
    def __init__(self):
        pass

    def getMessageCountByDate(self, messages, dateFormat):
        data = {}
        for message in messages:
            msgDate = datetime.datetime.strptime(message['created_time'][0:-5], DateTransformer.CREATE_TIME_FORMAT).strftime(dateFormat)
            if msgDate in data:
                data[msgDate] = data[msgDate]+1
            else:
                data[msgDate] = 1

        dataList = []
        for date in data:
            dataList.append({'date': date, 'count': data[date]})
            
        return dataList

    def getAggregatedMessageCountByDate(self, messages, dateFormat):
        messageCount = self.getMessageCountByDate(messages, dateFormat)
        data = []
        count = 0
        for dateCount in sorted(messageCount, key=lambda d: d['date']):
            count = count + dateCount['count']
            data.append({'date':dateCount['date'], 'count':count})
            
        return data

class WordParser:
    def __init__(self):
        pass

    def getWords(self, messages, maxWords=10):
        wordCount = {}
        for message in messages:
            if not 'message' in message:
                continue
                
            words = message['message'].split(' ')
            for word in words:
                if len(word) == 0:
                    continue
                
                if word in wordCount:
                    wordCount[word] = wordCount[word]+1
                else:
                    wordCount[word] = 1
        sortedWords = sorted(wordCount.items(), key=operator.itemgetter(1), reverse=True)
        dataList = []
        for i, key in enumerate(sortedWords):
            if i >= maxWords:
                break
            dataList.append({'word': key[0], 'count': key[1]})
        return dataList

    def getWordsAsWordCloud(self, messages, maxWords=10):
        words = self.getWords(messages, maxWords)
        newList = []
        for word in words:
            newList.append([word['word'], word['count']])
            
        return newList
