import json
import os
import requests
import time

PROJECT_NAME = 'temp'
MAX_RETRIES = 4
current_milli_time = lambda: int(round(time.time() * 1000))

def getURLContent(url):
    headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'}
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
        raise Exception('Data could not be downloaded from '+url+'. Check that you are online and authorized!')

def saveData(datadump, filename):
    with open(filename+".json", "w+") as f:
        f.write(datadump)

def makePath():
    path = os.path.join(os.getcwd(), PROJECT_NAME)
    if(not os.path.isdir(path)):
        os.mkdir(path)
        
    return path

def main():

    START_URL = "<YOUR_URL>"
    url = START_URL
    path = makePath()
    print "Downloading from "+str(url)

    while True:
        # 1) Download data
        try:
            jsonData = getURLContent(url)
            print "Finished downloading data from "+str(url)
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
        createTime = data[-1]["created_time"]
        filename = createTime.replace("-", "").replace(":", "").replace("+", "")

        saveData(jsonData, os.path.join(path, filename))

        # 4) Get next URL to download
        if "paging" in data:
            url = data["paging"]["next"] # If "paging" does not exist, you have reached the end
        else:
            break
        print "Next url to use: "+str(url)

        # 5) Sleep at least 1 second to avoid getting blocked
        time.sleep(1)

    print "Finished"

main()
