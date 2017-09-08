# fbgraph
fbgraph is a messaging statistics app for facebook chats.

## How to use
### Extract data from facebook
* Download your [facebook data](https://www.facebook.com/settings) by following the link and clicking "Download a copy"
* Clone this repo
* Extract messages.htm from the downloaded data and put it in src/data
* From src/backend, run MessageParserMain.py
* All your chats will be parsed and put into separate .json-files in src/data
### Generating charts
* From src/backend, run ChartGeneratorMain.py
* You are prompted to choose which chat you would like to generate data for
* View the GUI [here](src/gui/index.html)

## Credit
Though modified, the data parser uses code from [CopOnTheRun's FB-Message-Parser](https://github.com/CopOnTheRun/FB-Message-Parser)

## Simiar projects  
If you liked this project you are probably gonna like [this project](https://defaultnamehere.tumblr.com/post/139351766005/graphing-when-your-facebook-friends-are-awake) about snffing locations from facebook by [defaultnamehere](https://github.com/defaultnamehere) even more.
