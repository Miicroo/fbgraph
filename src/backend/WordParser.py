import operator

class WordParser:
    def __init__(self):
        pass

    def getWords(self, messages, maxWords=10):
        wordCount = {}
        for message in messages:
            if message['text'] is None:
                continue
                
            words = message['text'].split(' ')
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
