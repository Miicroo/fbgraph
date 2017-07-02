from FbParser import MessageParser, DateTransformer, WordParser
from StatsSaver import StatsSaver
  

projectPath = '../data/Nika'
chatName = projectPath[projectPath.rfind('/')+1:]

statsSaver = StatsSaver()
messageParser = MessageParser(projectPath)
dt = DateTransformer()
wordParser = WordParser()

messageParser.parse()

statsSaver.setChatName(chatName)
statsSaver.setUsers(messageParser.getUsers())
statsSaver.setTotalNumberOfMessages(len(messageParser.getMessages()))
statsSaver.setMessagesOverTime(dt.getAggregatedMessageCountByDate(messageParser.getMessages(), '%Y-%m-%d %H:%M'))
statsSaver.setMessagesPerMonth(dt.getMessageCountByDate(messageParser.getMessages(), '%Y-%m'))
statsSaver.setMessagesPerWeekday(dt.getMessageCountByDate(messageParser.getMessages(), '%A'))
statsSaver.setMessagesPerTime(dt.getMessageCountByDate(messageParser.getMessages(), '%H:%M'))
statsSaver.setMostCommonWords(wordParser.getWords(messageParser.getMessages(), 20))
statsSaver.setWordCloud(wordParser.getWords(messageParser.getMessages(), 20))

for userId in messageParser.getUsers():
    userMessages = messageParser.getMessagesByUser(userId)
    statsSaver.setTotalNumberOfMessagesForUser(len(userMessages), userId)
    statsSaver.setMessagesOverTimeForUser(dt.getAggregatedMessageCountByDate(userMessages, '%Y-%m-%d %H:%M'), userId)
    statsSaver.setMessagesPerMonthForUser(dt.getMessageCountByDate(userMessages, '%Y-%m'), userId)
    statsSaver.setMessagesPerWeekdayForUser(dt.getMessageCountByDate(userMessages, '%A'), userId)
    statsSaver.setMessagesPerTimeForUser(dt.getMessageCountByDate(userMessages, '%H:%M'), userId)
    statsSaver.setMostCommonWordsForUser(wordParser.getWords(userMessages, 20), userId)
    statsSaver.setWordCloudForUser(wordParser.getWords(userMessages, 20), userId)
    
statsSaver.save()

