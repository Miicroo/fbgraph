# fbgraph
fbgraph is a messaging statistics app for facebook chats.

## How it works  
A long time ago (in the pre-messenger era), Facebook released a Graph API node for apps to access a user's inbox. All an app needed to read messages was that the user granted it access to *read_page_mailboxes* and *read_mailbox*. Facebook also realeased their *Graph API Explorer*, where you can explore the different API nodes. By running the Graph API Explorer with API v2.3 a user can access links to it's own inbox, and thus be able to get a hold of all messages.

**DISCLAIMER**  
This tool was built as a simple, private project where I could handhack files to make sure that I got all messaging stats for my Facebook chats. I have come to realize that the app might be useful for someone, and therefore I am releasing it here, but note that it may be error prone and the ways of handling data are absolutely not supported by Facebook.

## How to use
* Clone this repo.  
* Use your favourite python editor to edit src/fbDownloader.py.
  * Set a PROJECT_NAME (I would suggest the name of your chat).
  * Set a START_URL. See [how to get START_URL](#how-to-get-start_url)
  
## How to get a START_URL  
Navigate to https://developers.facebook.com/tools/explorer/145634995501895/?method=GET&path=me%2Finbox&version=v2.3 (login if prompted).





Run with jsinspect (https://github.com/danielstjules/jsinspect)


**Tips**  
If you liked this project you are probably gonna like [this one](https://defaultnamehere.tumblr.com/post/139351766005/graphing-when-your-facebook-friends-are-awake) by [defaultnamehere](https://github.com/defaultnamehere) even more.
