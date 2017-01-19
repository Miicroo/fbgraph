# fbgraph
fbgraph is a messaging statistics app for facebook chats.

## How it works:  
A long time ago (in the pre-messenger era), Facebok released a Graph API node to access a user's inbox. All that was required was that the user granted access for *read_page_mailboxes* and *read_mailbox* to a Facebook app, and then that app could read the messages. 

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
