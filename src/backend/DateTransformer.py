import datetime

class DateTransformer:
    CREATE_TIME_FORMAT = '%A, %B %d, %Y at %I:%M%p'
    
    def __init__(self):
        pass

    def getMessageCountByDate(self, messages, dateFormat):
        data = {}
        for message in messages:
            msgDate = datetime.datetime.strptime(message['date_time'], DateTransformer.CREATE_TIME_FORMAT).strftime(dateFormat)
            if msgDate in data:
                data[msgDate] = data[msgDate]+1
            else:
                data[msgDate] = 1

        dataList = []
        for date in data:
            dataList.append({'date': date, 'count': data[date]})
        dataList.sort(key=lambda x: x['date'])
            
        return dataList

    def getAggregatedMessageCountByDate(self, messages, dateFormat):
        messageCount = self.getMessageCountByDate(messages, dateFormat)
        data = []
        count = 0
        for dateCount in sorted(messageCount, key=lambda d: d['date']):
            count = count + dateCount['count']
            data.append({'date':dateCount['date'], 'count':count})
            
        return data
