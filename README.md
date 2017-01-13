# fbgraph
fbgraph is a messaging statistics app for facebook chats.

**DISCLAIMER:**  
I really do not recommend anyone to use this tool. It was built as a simple, private project where I could handhack files to make sure that I got all messaging stats for (some of) my facebook chats. I have come to realize that the app might be useful for someone, and therefore I am releasing it here, but note that it is error prone and the ways of handling data are absolutely not supported by facebook.


## How to use:
* Clone this repo.  
* Use your favourite python editor to edit src/fbDownloader.py.
  * Set a PROJECT_NAME (I would suggest the name of your chat).
  * Set a START_URL. See [how to get START_URL](#how-to-get-start_url)
  
## How to get a START_URL  
Navigate to https://developers.facebook.com/tools/explorer/145634995501895/?method=GET&path=me%2Finbox&version=v2.3 (login if prompted).





Run with jsinspect (https://github.com/danielstjules/jsinspect)
