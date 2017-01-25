import json
import os
import os.path
import requests
import time

MAX_RETRIES = 4
current_milli_time = lambda: int(round(time.time() * 1000))

def getURLContent(url):
    headers = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36"}
    isDownloaded = False
    retryWait = 1
    retriesLeft = MAX_RETRIES

    while(not isDownloaded and retriesLeft > 0):
        try:
            response = requests.get(url, headers=headers)
            isDownloaded = True
        except:
            time.sleep(retryWait)
            retriesLeft -= 1
            
        if(response.status_code != 200):
            time.sleep(retryWait)
            retriesLeft -= 1

    if isDownloaded:
        return response.content
    else:
        raise Exception("Data could not be downloaded from "+url+". Check that you are online and authorized!")

def saveData(datadump, filename):
    with open(filename+".json", "w+") as f:
        f.write(datadump)

def makePath(directory):
    path = os.path.join(os.getcwd(), '../data', directory)
    if(not os.path.isdir(path)):
        os.mkdir(path)
        
    return path

def getExistingProjectFiles(path):
    return [os.path.join(path, f) for f in os.listdir(path) if os.path.isfile(os.path.join(path, f))]

def getNewestDownloadedMessageId(path):
    projectFiles = getExistingProjectFiles(path)
    if len(projectFiles) == 0:
        return None
    
    projectFiles.sort();

    latestFileName = projectFiles[-1]
    latestJson = json.load(open(latestFileName))

    if "comments" in latestJson:
        latestJson = latestJson["comments"]
        
    messages = latestJson["data"]

    if len(messages) == 0:
        return None
    else:
        return messages[-1]['id']

def containsNewestMessage(messages, target):
    for message in messages:
        if message["id"] == target:
            return True
    return False

def getMessagesNewerThan(messages, target):
    newMessages = []
    for message in reversed(messages):
        if message["id"] == target:
            break
        else:
            newMessages.append(message)
    return newMessages

def main():

    PROJECT_NAME = "<YOUR_PROJECT>"
    START_URL = "<YOUR_URL>"
    url = START_URL
    path = makePath(PROJECT_NAME)
    newestMessageId = getNewestDownloadedMessageId(path);

    if newestMessageId is not None:
        print "Downloading until last message: " + newestMessageId+"\n\n"
    
    print "Downloading from "+str(url)+"\n"
    
    while True:
        # 1) Download data
        try:
            jsonData = getURLContent(url)
            print "Finished downloading data from "+str(url)+"\n"
        except Exception as e:
            print e
            break

        # 2) Parse to JSON
        try:
            data = json.loads(jsonData)
            if "comments" in data:
                data = data["comments"] # Some files have a "comments" child containing the data node
        except:
            print "Could not parse json data:\n\n"+str(jsonData)+"\n"
            break
        
        # 3) Save to file
        messages = data["data"]
        isLastFile = len(messages) == 0
        shouldSaveData = True

        if isLastFile:
            filename = "00000000T000000-default"
        else:
            # 3.1) Check if we all or a subset of the messages are new
            if containsNewestMessage(messages, newestMessageId):
                isLastFile = True
                newMessages = getMessagesNewerThan(messages, newestMessageId)
                print "Found latest downloaded message, extracted "+str(len(newMessages))+" newer messages..."

                if len(newMessages) > 0:
                    data["data"] = newMessages # Override list of messages with only new ones
                    createTime = newMessages[-1]["created_time"]
                    filename = createTime.replace("-", "").replace(":", "").replace("+", "")
                else:
                    shouldSaveData = False
            else:
                createTime = messages[-1]["created_time"]
                filename = createTime.replace("-", "").replace(":", "").replace("+", "")

        if shouldSaveData:
            saveData(jsonData, os.path.join(path, filename))

        if isLastFile:
            break

        # 4) Get next URL to download
        if "paging" in data:
            url = data["paging"]["next"] # If "paging" does not exist, you have reached the end
        else:
            break
        print "Next url to use: "+str(url)+"\n"

        # 5) Sleep at least 1 second to avoid getting blocked
        time.sleep(1)

    print "Finished"

main()
