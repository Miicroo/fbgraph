var backend = (function() {
	var self = {};

	var generalStats = {"users": [{"id": "10152830988843864", "name": "Niclas Ogeryd Nordholm"}, {"id": "10203544045953477", "name": "Magnus Larsson"}, {"id": "10152609347948742", "name": "Magnus Hagmar"}, {"id": "821157197950084", "name": "Lisa Lipkin"}, {"id": "10152772998785267", "name": "Daniel Eineving"}], "messagesPerWeekday": {"Monday": 69, "Tuesday": 79, "Friday": 38, "Wednesday": 83, "Thursday": 9, "Sunday": 16, "Saturday": 8}, "messagesPerMonth": {"2015-06": 78, "2015-04": 12, "2015-05": 107, "2015-02": 36, "2015-03": 8, "2015-01": 23, "2014-10": 7, "2016-11": 24, "2014-09": 7}, "messagesPerTime": {"13:30": 4, "17:17": 1, "13:34": 4, "16:31": 2, "16:33": 4, "10:52": 1, "10:55": 3, "19:48": 4, "16:37": 1, "10:56": 2, "16:39": 2, "16:38": 3, "19:47": 1, "09:08": 3, "09:09": 1, "07:19": 1, "12:03": 1, "09:00": 1, "18:42": 2, "18:43": 5, "18:40": 1, "18:41": 3, "18:46": 1, "18:47": 1, "18:44": 2, "18:45": 1, "17:03": 1, "13:08": 1, "10:42": 2, "16:23": 3, "17:45": 1, "16:21": 2, "16:26": 1, "16:27": 4, "16:24": 4, "16:25": 2, "16:28": 3, "16:29": 1, "19:53": 2, "17:48": 1, "07:06": 1, "07:04": 1, "07:08": 1, "09:32": 1, "14:43": 1, "13:19": 1, "08:48": 1, "16:55": 2, "07:14": 1, "22:43": 1, "16:19": 2, "16:17": 3, "16:14": 2, "16:13": 1, "16:11": 2, "08:59": 1, "08:55": 3, "08:56": 2, "17:43": 1, "18:17": 2, "12:55": 2, "07:29": 1, "16:08": 2, "11:57": 1, "11:52": 1, "22:55": 1, "22:56": 2, "16:01": 3, "16:02": 2, "12:17": 1, "16:05": 2, "16:06": 2, "16:07": 2, "17:25": 1, "16:44": 5, "17:20": 1, "17:22": 1, "16:46": 1, "08:27": 1, "15:36": 2, "15:37": 2, "18:11": 1, "18:19": 2, "18:18": 2, "12:04": 1, "19:06": 3, "10:23": 2, "09:44": 1, "17:36": 1, "17:37": 1, "10:19": 1, "16:04": 2, "14:22": 1, "12:16": 1, "15:43": 3, "15:42": 4, "11:59": 3, "07:50": 1, "09:12": 1, "08:06": 1, "08:09": 1, "09:35": 1, "17:02": 3, "09:31": 2, "09:28": 1, "17:08": 2, "18:30": 1, "15:56": 3, "15:57": 4, "15:55": 3, "15:58": 4, "15:59": 1, "14:52": 2, "08:13": 1, "08:18": 1, "09:27": 3, "22:07": 1, "22:06": 1, "22:05": 2, "10:33": 1, "17:15": 1, "10:31": 1, "16:50": 3, "17:10": 3, "16:56": 3, "10:35": 1, "10:34": 1, "18:29": 1, "18:25": 4, "18:21": 2, "18:22": 4, "18:23": 2, "13:25": 1, "13:27": 3, "13:26": 1, "13:29": 3, "19:32": 2, "12:54": 1, "15:01": 1, "15:00": 3, "19:36": 1, "10:24": 1, "16:45": 1, "10:26": 1, "16:40": 1, "16:42": 2, "16:43": 1, "16:48": 2, "16:49": 4, "09:13": 3, "16:22": 1, "09:16": 1, "09:14": 2, "22:15": 1, "16:20": 8, "16:52": 1, "18:51": 2, "18:50": 1, "18:52": 3, "18:55": 1, "14:08": 1, "17:42": 3}, "wordCloud": [{"count": 41, "word": "jag"}, {"count": 36, "word": "\u00e4r"}, {"count": 35, "word": "det"}, {"count": 28, "word": "inte"}, {"count": 27, "word": "Jag"}, {"count": 26, "word": ":D"}, {"count": 26, "word": "och"}, {"count": 26, "word": "har"}, {"count": 24, "word": "s\u00e5"}, {"count": 23, "word": "med"}, {"count": 21, "word": "du"}, {"count": 20, "word": "en"}, {"count": 20, "word": "kan"}, {"count": 20, "word": "som"}, {"count": 19, "word": ":p"}, {"count": 19, "word": "att"}, {"count": 19, "word": "p\u00e5"}, {"count": 19, "word": "i"}, {"count": 16, "word": "till"}, {"count": 16, "word": "f\u00f6r"}], "totalNumberOfMessages": 302, "chatName": "taco", "messagesOverTime": [{"date": "2014-09-30 19:47", "count": 1}, {"date": "2014-09-30 19:48", "count": 5}, {"date": "2014-09-30 19:53", "count": 7}, {"date": "2014-10-27 13:29", "count": 10}, {"date": "2014-10-27 13:30", "count": 14}, {"date": "2015-01-27 18:40", "count": 15}, {"date": "2015-01-27 18:41", "count": 18}, {"date": "2015-01-27 18:42", "count": 20}, {"date": "2015-01-27 18:43", "count": 25}, {"date": "2015-01-27 18:44", "count": 27}, {"date": "2015-01-27 18:45", "count": 28}, {"date": "2015-01-27 18:46", "count": 29}, {"date": "2015-01-27 18:47", "count": 30}, {"date": "2015-01-27 18:50", "count": 31}, {"date": "2015-01-27 18:51", "count": 33}, {"date": "2015-01-27 18:52", "count": 36}, {"date": "2015-01-27 18:55", "count": 37}, {"date": "2015-02-09 14:22", "count": 38}, {"date": "2015-02-09 17:25", "count": 39}, {"date": "2015-02-11 18:17", "count": 41}, {"date": "2015-02-11 18:18", "count": 43}, {"date": "2015-02-11 18:19", "count": 45}, {"date": "2015-02-11 18:21", "count": 47}, {"date": "2015-02-11 18:22", "count": 51}, {"date": "2015-02-11 18:23", "count": 53}, {"date": "2015-02-11 18:25", "count": 57}, {"date": "2015-02-11 18:29", "count": 58}, {"date": "2015-02-11 18:30", "count": 59}, {"date": "2015-02-24 16:50", "count": 60}, {"date": "2015-02-24 16:52", "count": 61}, {"date": "2015-02-24 17:02", "count": 64}, {"date": "2015-02-24 17:03", "count": 65}, {"date": "2015-02-24 17:20", "count": 66}, {"date": "2015-02-24 17:45", "count": 67}, {"date": "2015-02-26 16:49", "count": 68}, {"date": "2015-02-26 17:42", "count": 71}, {"date": "2015-02-26 17:43", "count": 72}, {"date": "2015-02-26 17:48", "count": 73}, {"date": "2015-03-22 08:59", "count": 74}, {"date": "2015-03-22 09:08", "count": 76}, {"date": "2015-03-22 09:09", "count": 77}, {"date": "2015-03-22 09:35", "count": 78}, {"date": "2015-03-22 09:44", "count": 79}, {"date": "2015-03-22 10:26", "count": 80}, {"date": "2015-03-22 10:31", "count": 81}, {"date": "2015-04-27 08:55", "count": 84}, {"date": "2015-04-27 08:56", "count": 86}, {"date": "2015-04-27 09:08", "count": 87}, {"date": "2015-04-27 09:12", "count": 88}, {"date": "2015-04-27 09:13", "count": 91}, {"date": "2015-04-27 09:14", "count": 93}, {"date": "2015-05-13 15:42", "count": 94}, {"date": "2015-05-13 16:07", "count": 95}, {"date": "2015-05-13 16:08", "count": 96}, {"date": "2015-05-13 17:15", "count": 97}, {"date": "2015-05-13 18:11", "count": 98}, {"date": "2015-05-13 19:06", "count": 101}, {"date": "2015-05-13 19:32", "count": 103}, {"date": "2015-05-13 19:36", "count": 104}, {"date": "2015-05-14 08:09", "count": 105}, {"date": "2015-05-14 08:18", "count": 106}, {"date": "2015-05-14 09:00", "count": 107}, {"date": "2015-05-19 16:19", "count": 108}, {"date": "2015-05-19 16:20", "count": 115}, {"date": "2015-05-19 16:21", "count": 117}, {"date": "2015-05-19 16:22", "count": 118}, {"date": "2015-05-19 16:23", "count": 120}, {"date": "2015-05-19 16:24", "count": 124}, {"date": "2015-05-19 16:25", "count": 126}, {"date": "2015-05-19 16:39", "count": 127}, {"date": "2015-05-19 16:40", "count": 128}, {"date": "2015-05-19 16:42", "count": 130}, {"date": "2015-05-19 16:44", "count": 132}, {"date": "2015-05-19 16:45", "count": 133}, {"date": "2015-05-19 16:48", "count": 135}, {"date": "2015-05-19 16:49", "count": 138}, {"date": "2015-05-19 16:50", "count": 140}, {"date": "2015-05-19 17:08", "count": 142}, {"date": "2015-05-19 17:10", "count": 145}, {"date": "2015-05-19 17:22", "count": 146}, {"date": "2015-05-19 17:36", "count": 147}, {"date": "2015-05-19 17:37", "count": 148}, {"date": "2015-05-20 07:04", "count": 149}, {"date": "2015-05-20 07:06", "count": 150}, {"date": "2015-05-20 07:08", "count": 151}, {"date": "2015-05-20 07:14", "count": 152}, {"date": "2015-05-20 07:19", "count": 153}, {"date": "2015-05-20 08:06", "count": 154}, {"date": "2015-05-20 08:13", "count": 155}, {"date": "2015-05-20 14:52", "count": 157}, {"date": "2015-05-20 15:00", "count": 160}, {"date": "2015-05-20 15:01", "count": 161}, {"date": "2015-05-20 15:36", "count": 162}, {"date": "2015-05-20 15:37", "count": 164}, {"date": "2015-05-20 15:42", "count": 166}, {"date": "2015-05-20 15:43", "count": 169}, {"date": "2015-05-20 15:55", "count": 172}, {"date": "2015-05-20 15:56", "count": 175}, {"date": "2015-05-20 15:57", "count": 179}, {"date": "2015-05-20 15:58", "count": 183}, {"date": "2015-05-20 15:59", "count": 184}, {"date": "2015-05-20 16:11", "count": 186}, {"date": "2015-05-20 16:13", "count": 187}, {"date": "2015-05-20 16:19", "count": 188}, {"date": "2015-05-20 16:23", "count": 189}, {"date": "2015-05-20 16:26", "count": 190}, {"date": "2015-05-20 16:28", "count": 191}, {"date": "2015-05-20 16:29", "count": 192}, {"date": "2015-05-20 16:31", "count": 193}, {"date": "2015-05-20 16:33", "count": 195}, {"date": "2015-05-20 22:05", "count": 197}, {"date": "2015-05-20 22:06", "count": 198}, {"date": "2015-05-20 22:07", "count": 199}, {"date": "2015-05-20 22:15", "count": 200}, {"date": "2015-06-01 16:27", "count": 202}, {"date": "2015-06-01 16:46", "count": 203}, {"date": "2015-06-01 16:55", "count": 205}, {"date": "2015-06-01 16:56", "count": 208}, {"date": "2015-06-07 16:04", "count": 210}, {"date": "2015-06-07 16:05", "count": 212}, {"date": "2015-06-07 16:17", "count": 215}, {"date": "2015-06-07 16:20", "count": 216}, {"date": "2015-06-08 07:50", "count": 217}, {"date": "2015-06-08 08:27", "count": 218}, {"date": "2015-06-12 10:19", "count": 219}, {"date": "2015-06-12 10:23", "count": 221}, {"date": "2015-06-12 10:24", "count": 222}, {"date": "2015-06-12 10:33", "count": 223}, {"date": "2015-06-12 10:34", "count": 224}, {"date": "2015-06-12 10:35", "count": 225}, {"date": "2015-06-12 10:42", "count": 227}, {"date": "2015-06-12 10:52", "count": 228}, {"date": "2015-06-12 10:55", "count": 231}, {"date": "2015-06-12 10:56", "count": 233}, {"date": "2015-06-12 11:52", "count": 234}, {"date": "2015-06-12 11:57", "count": 235}, {"date": "2015-06-12 11:59", "count": 238}, {"date": "2015-06-12 12:03", "count": 239}, {"date": "2015-06-12 12:04", "count": 240}, {"date": "2015-06-12 12:16", "count": 241}, {"date": "2015-06-12 12:17", "count": 242}, {"date": "2015-06-12 14:08", "count": 243}, {"date": "2015-06-13 22:43", "count": 244}, {"date": "2015-06-13 22:55", "count": 245}, {"date": "2015-06-13 22:56", "count": 247}, {"date": "2015-06-20 13:25", "count": 248}, {"date": "2015-06-20 13:26", "count": 249}, {"date": "2015-06-20 13:27", "count": 251}, {"date": "2015-06-22 13:08", "count": 252}, {"date": "2015-06-22 13:19", "count": 253}, {"date": "2015-06-22 13:27", "count": 254}, {"date": "2015-06-22 13:34", "count": 258}, {"date": "2015-06-22 15:36", "count": 259}, {"date": "2015-06-22 15:42", "count": 260}, {"date": "2015-06-22 16:01", "count": 263}, {"date": "2015-06-22 16:02", "count": 265}, {"date": "2015-06-22 16:06", "count": 267}, {"date": "2015-06-22 16:07", "count": 268}, {"date": "2015-06-22 16:08", "count": 269}, {"date": "2015-06-22 16:27", "count": 270}, {"date": "2015-06-22 16:31", "count": 271}, {"date": "2015-06-22 16:33", "count": 273}, {"date": "2015-06-22 16:38", "count": 276}, {"date": "2015-06-22 16:39", "count": 277}, {"date": "2015-06-22 16:44", "count": 278}, {"date": "2016-11-11 12:54", "count": 279}, {"date": "2016-11-11 12:55", "count": 281}, {"date": "2016-11-11 16:14", "count": 283}, {"date": "2016-11-11 16:27", "count": 284}, {"date": "2016-11-11 16:28", "count": 286}, {"date": "2016-11-11 16:37", "count": 287}, {"date": "2016-11-11 16:43", "count": 288}, {"date": "2016-11-11 16:44", "count": 290}, {"date": "2016-11-11 17:17", "count": 291}, {"date": "2016-11-14 07:29", "count": 292}, {"date": "2016-11-14 08:48", "count": 293}, {"date": "2016-11-14 09:16", "count": 294}, {"date": "2016-11-14 09:27", "count": 297}, {"date": "2016-11-14 09:28", "count": 298}, {"date": "2016-11-14 09:31", "count": 300}, {"date": "2016-11-14 09:32", "count": 301}, {"date": "2016-11-14 14:43", "count": 302}], "mostCommonWords": [{"count": 41, "word": "jag"}, {"count": 36, "word": "\u00e4r"}, {"count": 35, "word": "det"}, {"count": 28, "word": "inte"}, {"count": 27, "word": "Jag"}, {"count": 26, "word": ":D"}, {"count": 26, "word": "och"}, {"count": 26, "word": "har"}, {"count": 24, "word": "s\u00e5"}, {"count": 23, "word": "med"}], "messagesPerUser": {"10152830988843864": 1, "10203544045953477": 2, "10152772998785267": 45, "821157197950084": 117, "10152609347948742": 137}};
	var userStats = {"10152830988843864": {"totalNumberOfMessages": 1, "messagesPerMonth": {"2016-11": 1}, "messagesPerTime": {"09:31": 1}, "wordCloud": [{"count": 41, "word": "jag"}, {"count": 36, "word": "\u00e4r"}, {"count": 35, "word": "det"}, {"count": 28, "word": "inte"}, {"count": 27, "word": "Jag"}, {"count": 26, "word": ":D"}, {"count": 26, "word": "och"}, {"count": 26, "word": "har"}, {"count": 24, "word": "s\u00e5"}, {"count": 23, "word": "med"}, {"count": 21, "word": "du"}, {"count": 20, "word": "en"}, {"count": 20, "word": "kan"}, {"count": 20, "word": "som"}, {"count": 19, "word": ":p"}, {"count": 19, "word": "att"}, {"count": 19, "word": "p\u00e5"}, {"count": 19, "word": "i"}, {"count": 16, "word": "till"}, {"count": 16, "word": "f\u00f6r"}], "messagesPerWeekday": {"Monday": 1}, "messagesOverTime": [{"date": "2016-11-14 09:31", "count": 1}], "mostCommonWords": [{"count": 41, "word": "jag"}, {"count": 36, "word": "\u00e4r"}, {"count": 35, "word": "det"}, {"count": 28, "word": "inte"}, {"count": 27, "word": "Jag"}, {"count": 26, "word": ":D"}, {"count": 26, "word": "och"}, {"count": 26, "word": "har"}, {"count": 24, "word": "s\u00e5"}, {"count": 23, "word": "med"}]}, "10203544045953477": {"totalNumberOfMessages": 2, "messagesPerMonth": {"2016-11": 2}, "messagesPerTime": {"09:27": 1, "14:43": 1}, "wordCloud": [{"count": 41, "word": "jag"}, {"count": 36, "word": "\u00e4r"}, {"count": 35, "word": "det"}, {"count": 28, "word": "inte"}, {"count": 27, "word": "Jag"}, {"count": 26, "word": ":D"}, {"count": 26, "word": "och"}, {"count": 26, "word": "har"}, {"count": 24, "word": "s\u00e5"}, {"count": 23, "word": "med"}, {"count": 21, "word": "du"}, {"count": 20, "word": "en"}, {"count": 20, "word": "kan"}, {"count": 20, "word": "som"}, {"count": 19, "word": ":p"}, {"count": 19, "word": "att"}, {"count": 19, "word": "p\u00e5"}, {"count": 19, "word": "i"}, {"count": 16, "word": "till"}, {"count": 16, "word": "f\u00f6r"}], "messagesPerWeekday": {"Monday": 2}, "messagesOverTime": [{"date": "2016-11-14 09:27", "count": 1}, {"date": "2016-11-14 14:43", "count": 2}], "mostCommonWords": [{"count": 41, "word": "jag"}, {"count": 36, "word": "\u00e4r"}, {"count": 35, "word": "det"}, {"count": 28, "word": "inte"}, {"count": 27, "word": "Jag"}, {"count": 26, "word": ":D"}, {"count": 26, "word": "och"}, {"count": 26, "word": "har"}, {"count": 24, "word": "s\u00e5"}, {"count": 23, "word": "med"}]}, "10152772998785267": {"totalNumberOfMessages": 45, "messagesPerMonth": {"2015-06": 13, "2015-04": 3, "2015-05": 11, "2014-09": 2, "2015-01": 4, "2014-10": 3, "2016-11": 3, "2015-02": 6}, "messagesPerTime": {"13:30": 2, "07:14": 1, "19:48": 1, "09:08": 1, "22:06": 1, "09:14": 1, "16:52": 1, "14:08": 1, "17:17": 1, "16:56": 1, "16:55": 1, "15:43": 1, "15:42": 1, "18:43": 2, "18:41": 1, "18:23": 1, "13:29": 1, "15:00": 1, "16:27": 1, "16:44": 1, "17:42": 2, "16:01": 3, "16:02": 2, "16:04": 1, "19:53": 1, "08:09": 1, "17:48": 1, "09:13": 1, "07:06": 1, "09:32": 1, "22:15": 1, "08:48": 1, "15:36": 1, "15:37": 1, "15:56": 1, "15:57": 1, "18:51": 1, "18:18": 1, "22:55": 1}, "wordCloud": [{"count": 41, "word": "jag"}, {"count": 36, "word": "\u00e4r"}, {"count": 35, "word": "det"}, {"count": 28, "word": "inte"}, {"count": 27, "word": "Jag"}, {"count": 26, "word": ":D"}, {"count": 26, "word": "och"}, {"count": 26, "word": "har"}, {"count": 24, "word": "s\u00e5"}, {"count": 23, "word": "med"}, {"count": 21, "word": "du"}, {"count": 20, "word": "en"}, {"count": 20, "word": "kan"}, {"count": 20, "word": "som"}, {"count": 19, "word": ":p"}, {"count": 19, "word": "att"}, {"count": 19, "word": "p\u00e5"}, {"count": 19, "word": "i"}, {"count": 16, "word": "till"}, {"count": 16, "word": "f\u00f6r"}], "messagesPerWeekday": {"Monday": 18, "Tuesday": 7, "Friday": 2, "Wednesday": 12, "Thursday": 4, "Sunday": 1, "Saturday": 1}, "messagesOverTime": [{"date": "2014-09-30 19:48", "count": 1}, {"date": "2014-09-30 19:53", "count": 2}, {"date": "2014-10-27 13:29", "count": 3}, {"date": "2014-10-27 13:30", "count": 5}, {"date": "2015-01-27 18:41", "count": 6}, {"date": "2015-01-27 18:43", "count": 8}, {"date": "2015-01-27 18:51", "count": 9}, {"date": "2015-02-11 18:18", "count": 10}, {"date": "2015-02-11 18:23", "count": 11}, {"date": "2015-02-24 16:52", "count": 12}, {"date": "2015-02-26 17:42", "count": 14}, {"date": "2015-02-26 17:48", "count": 15}, {"date": "2015-04-27 09:08", "count": 16}, {"date": "2015-04-27 09:13", "count": 17}, {"date": "2015-04-27 09:14", "count": 18}, {"date": "2015-05-14 08:09", "count": 19}, {"date": "2015-05-20 07:06", "count": 20}, {"date": "2015-05-20 07:14", "count": 21}, {"date": "2015-05-20 15:00", "count": 22}, {"date": "2015-05-20 15:37", "count": 23}, {"date": "2015-05-20 15:42", "count": 24}, {"date": "2015-05-20 15:43", "count": 25}, {"date": "2015-05-20 15:56", "count": 26}, {"date": "2015-05-20 15:57", "count": 27}, {"date": "2015-05-20 22:06", "count": 28}, {"date": "2015-05-20 22:15", "count": 29}, {"date": "2015-06-01 16:27", "count": 30}, {"date": "2015-06-01 16:55", "count": 31}, {"date": "2015-06-01 16:56", "count": 32}, {"date": "2015-06-07 16:04", "count": 33}, {"date": "2015-06-12 14:08", "count": 34}, {"date": "2015-06-13 22:55", "count": 35}, {"date": "2015-06-22 15:36", "count": 36}, {"date": "2015-06-22 16:01", "count": 39}, {"date": "2015-06-22 16:02", "count": 41}, {"date": "2015-06-22 16:44", "count": 42}, {"date": "2016-11-11 17:17", "count": 43}, {"date": "2016-11-14 08:48", "count": 44}, {"date": "2016-11-14 09:32", "count": 45}], "mostCommonWords": [{"count": 41, "word": "jag"}, {"count": 36, "word": "\u00e4r"}, {"count": 35, "word": "det"}, {"count": 28, "word": "inte"}, {"count": 27, "word": "Jag"}, {"count": 26, "word": ":D"}, {"count": 26, "word": "och"}, {"count": 26, "word": "har"}, {"count": 24, "word": "s\u00e5"}, {"count": 23, "word": "med"}]}, "821157197950084": {"totalNumberOfMessages": 117, "messagesPerMonth": {"2015-06": 32, "2015-04": 3, "2015-05": 49, "2014-09": 2, "2015-03": 4, "2015-01": 9, "2016-11": 3, "2015-02": 15}, "messagesPerTime": {"13:34": 2, "16:33": 3, "10:52": 1, "10:55": 1, "19:48": 2, "16:37": 1, "10:56": 1, "16:39": 2, "09:09": 1, "07:19": 1, "18:42": 1, "18:40": 1, "18:41": 1, "18:46": 1, "18:44": 2, "13:08": 1, "10:42": 1, "16:23": 1, "16:20": 4, "16:21": 2, "16:27": 2, "16:24": 1, "16:25": 1, "07:04": 1, "07:08": 1, "16:19": 2, "16:11": 2, "08:59": 1, "08:56": 2, "11:57": 1, "11:52": 1, "12:17": 1, "16:05": 2, "16:06": 2, "16:07": 1, "17:25": 1, "16:44": 1, "17:20": 1, "17:22": 1, "08:27": 1, "15:36": 1, "15:37": 1, "18:11": 1, "18:19": 2, "18:18": 1, "12:04": 1, "12:03": 1, "09:44": 1, "10:19": 1, "15:43": 2, "15:42": 2, "11:59": 1, "17:02": 1, "09:31": 1, "17:08": 2, "18:30": 1, "15:57": 2, "15:55": 1, "15:58": 1, "14:52": 2, "08:13": 1, "08:18": 1, "10:31": 1, "16:50": 3, "17:10": 2, "18:17": 2, "16:55": 1, "10:34": 1, "18:25": 3, "18:22": 1, "18:23": 1, "13:27": 2, "13:26": 1, "19:32": 2, "15:01": 1, "15:00": 1, "10:24": 1, "16:42": 2, "10:35": 1, "16:48": 1, "16:49": 1, "09:13": 1, "16:22": 1, "18:51": 1, "18:52": 1, "18:55": 1}, "wordCloud": [{"count": 41, "word": "jag"}, {"count": 36, "word": "\u00e4r"}, {"count": 35, "word": "det"}, {"count": 28, "word": "inte"}, {"count": 27, "word": "Jag"}, {"count": 26, "word": ":D"}, {"count": 26, "word": "och"}, {"count": 26, "word": "har"}, {"count": 24, "word": "s\u00e5"}, {"count": 23, "word": "med"}, {"count": 21, "word": "du"}, {"count": 20, "word": "en"}, {"count": 20, "word": "kan"}, {"count": 20, "word": "som"}, {"count": 19, "word": ":p"}, {"count": 19, "word": "att"}, {"count": 19, "word": "p\u00e5"}, {"count": 19, "word": "i"}, {"count": 16, "word": "till"}, {"count": 16, "word": "f\u00f6r"}], "messagesPerWeekday": {"Monday": 18, "Tuesday": 36, "Friday": 16, "Wednesday": 37, "Thursday": 1, "Sunday": 7, "Saturday": 2}, "messagesOverTime": [{"date": "2014-09-30 19:48", "count": 2}, {"date": "2015-01-27 18:40", "count": 3}, {"date": "2015-01-27 18:41", "count": 4}, {"date": "2015-01-27 18:42", "count": 5}, {"date": "2015-01-27 18:44", "count": 7}, {"date": "2015-01-27 18:46", "count": 8}, {"date": "2015-01-27 18:51", "count": 9}, {"date": "2015-01-27 18:52", "count": 10}, {"date": "2015-01-27 18:55", "count": 11}, {"date": "2015-02-09 17:25", "count": 12}, {"date": "2015-02-11 18:17", "count": 14}, {"date": "2015-02-11 18:18", "count": 15}, {"date": "2015-02-11 18:19", "count": 17}, {"date": "2015-02-11 18:22", "count": 18}, {"date": "2015-02-11 18:23", "count": 19}, {"date": "2015-02-11 18:25", "count": 22}, {"date": "2015-02-11 18:30", "count": 23}, {"date": "2015-02-24 16:50", "count": 24}, {"date": "2015-02-24 17:02", "count": 25}, {"date": "2015-02-24 17:20", "count": 26}, {"date": "2015-03-22 08:59", "count": 27}, {"date": "2015-03-22 09:09", "count": 28}, {"date": "2015-03-22 09:44", "count": 29}, {"date": "2015-03-22 10:31", "count": 30}, {"date": "2015-04-27 08:56", "count": 32}, {"date": "2015-04-27 09:13", "count": 33}, {"date": "2015-05-13 15:42", "count": 34}, {"date": "2015-05-13 18:11", "count": 35}, {"date": "2015-05-13 19:32", "count": 37}, {"date": "2015-05-14 08:18", "count": 38}, {"date": "2015-05-19 16:19", "count": 39}, {"date": "2015-05-19 16:20", "count": 42}, {"date": "2015-05-19 16:21", "count": 44}, {"date": "2015-05-19 16:22", "count": 45}, {"date": "2015-05-19 16:24", "count": 46}, {"date": "2015-05-19 16:25", "count": 47}, {"date": "2015-05-19 16:39", "count": 48}, {"date": "2015-05-19 16:42", "count": 50}, {"date": "2015-05-19 16:44", "count": 51}, {"date": "2015-05-19 16:48", "count": 52}, {"date": "2015-05-19 16:49", "count": 53}, {"date": "2015-05-19 16:50", "count": 55}, {"date": "2015-05-19 17:08", "count": 57}, {"date": "2015-05-19 17:10", "count": 59}, {"date": "2015-05-19 17:22", "count": 60}, {"date": "2015-05-20 07:04", "count": 61}, {"date": "2015-05-20 07:08", "count": 62}, {"date": "2015-05-20 07:19", "count": 63}, {"date": "2015-05-20 08:13", "count": 64}, {"date": "2015-05-20 14:52", "count": 66}, {"date": "2015-05-20 15:00", "count": 67}, {"date": "2015-05-20 15:01", "count": 68}, {"date": "2015-05-20 15:36", "count": 69}, {"date": "2015-05-20 15:37", "count": 70}, {"date": "2015-05-20 15:42", "count": 71}, {"date": "2015-05-20 15:43", "count": 73}, {"date": "2015-05-20 15:55", "count": 74}, {"date": "2015-05-20 15:57", "count": 76}, {"date": "2015-05-20 15:58", "count": 77}, {"date": "2015-05-20 16:11", "count": 79}, {"date": "2015-05-20 16:19", "count": 80}, {"date": "2015-05-20 16:23", "count": 81}, {"date": "2015-05-20 16:33", "count": 82}, {"date": "2015-06-01 16:27", "count": 83}, {"date": "2015-06-01 16:55", "count": 84}, {"date": "2015-06-07 16:05", "count": 86}, {"date": "2015-06-07 16:20", "count": 87}, {"date": "2015-06-08 08:27", "count": 88}, {"date": "2015-06-12 10:19", "count": 89}, {"date": "2015-06-12 10:24", "count": 90}, {"date": "2015-06-12 10:34", "count": 91}, {"date": "2015-06-12 10:35", "count": 92}, {"date": "2015-06-12 10:42", "count": 93}, {"date": "2015-06-12 10:52", "count": 94}, {"date": "2015-06-12 10:55", "count": 95}, {"date": "2015-06-12 10:56", "count": 96}, {"date": "2015-06-12 11:52", "count": 97}, {"date": "2015-06-12 11:57", "count": 98}, {"date": "2015-06-12 11:59", "count": 99}, {"date": "2015-06-12 12:03", "count": 100}, {"date": "2015-06-12 12:04", "count": 101}, {"date": "2015-06-12 12:17", "count": 102}, {"date": "2015-06-20 13:26", "count": 103}, {"date": "2015-06-20 13:27", "count": 104}, {"date": "2015-06-22 13:08", "count": 105}, {"date": "2015-06-22 13:27", "count": 106}, {"date": "2015-06-22 13:34", "count": 108}, {"date": "2015-06-22 16:06", "count": 110}, {"date": "2015-06-22 16:07", "count": 111}, {"date": "2015-06-22 16:33", "count": 113}, {"date": "2015-06-22 16:39", "count": 114}, {"date": "2016-11-11 16:27", "count": 115}, {"date": "2016-11-11 16:37", "count": 116}, {"date": "2016-11-14 09:31", "count": 117}], "mostCommonWords": [{"count": 41, "word": "jag"}, {"count": 36, "word": "\u00e4r"}, {"count": 35, "word": "det"}, {"count": 28, "word": "inte"}, {"count": 27, "word": "Jag"}, {"count": 26, "word": ":D"}, {"count": 26, "word": "och"}, {"count": 26, "word": "har"}, {"count": 24, "word": "s\u00e5"}, {"count": 23, "word": "med"}]}, "10152609347948742": {"totalNumberOfMessages": 137, "messagesPerMonth": {"2015-06": 33, "2015-04": 6, "2015-05": 47, "2014-09": 3, "2015-03": 4, "2015-01": 10, "2014-10": 4, "2016-11": 15, "2015-02": 15}, "messagesPerTime": {"13:30": 2, "13:34": 2, "16:31": 2, "16:33": 1, "10:55": 2, "19:48": 1, "10:56": 1, "16:38": 3, "19:47": 1, "09:08": 2, "09:00": 1, "18:42": 1, "18:43": 3, "18:41": 1, "18:47": 1, "18:45": 1, "17:03": 1, "10:42": 1, "16:23": 2, "16:20": 4, "16:26": 1, "17:42": 1, "16:24": 3, "16:25": 1, "16:28": 3, "16:29": 1, "19:53": 1, "13:19": 1, "22:43": 1, "16:17": 3, "16:14": 2, "16:13": 1, "08:55": 3, "16:08": 2, "22:56": 2, "16:04": 1, "12:16": 1, "11:59": 2, "07:29": 1, "16:46": 1, "19:06": 3, "16:43": 1, "17:36": 1, "17:37": 1, "14:22": 1, "15:42": 1, "16:07": 1, "07:50": 1, "08:06": 1, "09:35": 1, "17:02": 2, "15:56": 2, "15:57": 1, "15:55": 2, "15:58": 3, "15:59": 1, "09:27": 2, "22:07": 1, "22:05": 2, "10:33": 1, "17:15": 1, "17:10": 1, "16:56": 2, "09:28": 1, "18:29": 1, "18:25": 1, "18:21": 2, "18:22": 3, "13:25": 1, "13:27": 1, "13:29": 2, "12:55": 2, "12:54": 1, "15:00": 1, "19:36": 1, "16:44": 3, "16:45": 1, "10:26": 1, "18:50": 1, "16:40": 1, "10:23": 2, "16:48": 1, "16:49": 3, "09:13": 1, "09:12": 1, "09:16": 1, "09:14": 1, "17:45": 1, "17:43": 1, "18:52": 2, "16:27": 1}, "wordCloud": [{"count": 41, "word": "jag"}, {"count": 36, "word": "\u00e4r"}, {"count": 35, "word": "det"}, {"count": 28, "word": "inte"}, {"count": 27, "word": "Jag"}, {"count": 26, "word": ":D"}, {"count": 26, "word": "och"}, {"count": 26, "word": "har"}, {"count": 24, "word": "s\u00e5"}, {"count": 23, "word": "med"}, {"count": 21, "word": "du"}, {"count": 20, "word": "en"}, {"count": 20, "word": "kan"}, {"count": 20, "word": "som"}, {"count": 19, "word": ":p"}, {"count": 19, "word": "att"}, {"count": 19, "word": "p\u00e5"}, {"count": 19, "word": "i"}, {"count": 16, "word": "till"}, {"count": 16, "word": "f\u00f6r"}], "messagesPerWeekday": {"Monday": 30, "Tuesday": 36, "Friday": 20, "Wednesday": 34, "Thursday": 4, "Sunday": 8, "Saturday": 5}, "messagesOverTime": [{"date": "2014-09-30 19:47", "count": 1}, {"date": "2014-09-30 19:48", "count": 2}, {"date": "2014-09-30 19:53", "count": 3}, {"date": "2014-10-27 13:29", "count": 5}, {"date": "2014-10-27 13:30", "count": 7}, {"date": "2015-01-27 18:41", "count": 8}, {"date": "2015-01-27 18:42", "count": 9}, {"date": "2015-01-27 18:43", "count": 12}, {"date": "2015-01-27 18:45", "count": 13}, {"date": "2015-01-27 18:47", "count": 14}, {"date": "2015-01-27 18:50", "count": 15}, {"date": "2015-01-27 18:52", "count": 17}, {"date": "2015-02-09 14:22", "count": 18}, {"date": "2015-02-11 18:21", "count": 20}, {"date": "2015-02-11 18:22", "count": 23}, {"date": "2015-02-11 18:25", "count": 24}, {"date": "2015-02-11 18:29", "count": 25}, {"date": "2015-02-24 17:02", "count": 27}, {"date": "2015-02-24 17:03", "count": 28}, {"date": "2015-02-24 17:45", "count": 29}, {"date": "2015-02-26 16:49", "count": 30}, {"date": "2015-02-26 17:42", "count": 31}, {"date": "2015-02-26 17:43", "count": 32}, {"date": "2015-03-22 09:08", "count": 34}, {"date": "2015-03-22 09:35", "count": 35}, {"date": "2015-03-22 10:26", "count": 36}, {"date": "2015-04-27 08:55", "count": 39}, {"date": "2015-04-27 09:12", "count": 40}, {"date": "2015-04-27 09:13", "count": 41}, {"date": "2015-04-27 09:14", "count": 42}, {"date": "2015-05-13 16:07", "count": 43}, {"date": "2015-05-13 16:08", "count": 44}, {"date": "2015-05-13 17:15", "count": 45}, {"date": "2015-05-13 19:06", "count": 48}, {"date": "2015-05-13 19:36", "count": 49}, {"date": "2015-05-14 09:00", "count": 50}, {"date": "2015-05-19 16:20", "count": 54}, {"date": "2015-05-19 16:23", "count": 56}, {"date": "2015-05-19 16:24", "count": 59}, {"date": "2015-05-19 16:25", "count": 60}, {"date": "2015-05-19 16:40", "count": 61}, {"date": "2015-05-19 16:44", "count": 62}, {"date": "2015-05-19 16:45", "count": 63}, {"date": "2015-05-19 16:48", "count": 64}, {"date": "2015-05-19 16:49", "count": 66}, {"date": "2015-05-19 17:10", "count": 67}, {"date": "2015-05-19 17:36", "count": 68}, {"date": "2015-05-19 17:37", "count": 69}, {"date": "2015-05-20 08:06", "count": 70}, {"date": "2015-05-20 15:00", "count": 71}, {"date": "2015-05-20 15:55", "count": 73}, {"date": "2015-05-20 15:56", "count": 75}, {"date": "2015-05-20 15:57", "count": 76}, {"date": "2015-05-20 15:58", "count": 79}, {"date": "2015-05-20 15:59", "count": 80}, {"date": "2015-05-20 16:13", "count": 81}, {"date": "2015-05-20 16:26", "count": 82}, {"date": "2015-05-20 16:28", "count": 83}, {"date": "2015-05-20 16:29", "count": 84}, {"date": "2015-05-20 16:31", "count": 85}, {"date": "2015-05-20 16:33", "count": 86}, {"date": "2015-05-20 22:05", "count": 88}, {"date": "2015-05-20 22:07", "count": 89}, {"date": "2015-06-01 16:46", "count": 90}, {"date": "2015-06-01 16:56", "count": 92}, {"date": "2015-06-07 16:04", "count": 93}, {"date": "2015-06-07 16:17", "count": 96}, {"date": "2015-06-08 07:50", "count": 97}, {"date": "2015-06-12 10:23", "count": 99}, {"date": "2015-06-12 10:33", "count": 100}, {"date": "2015-06-12 10:42", "count": 101}, {"date": "2015-06-12 10:55", "count": 103}, {"date": "2015-06-12 10:56", "count": 104}, {"date": "2015-06-12 11:59", "count": 106}, {"date": "2015-06-12 12:16", "count": 107}, {"date": "2015-06-13 22:43", "count": 108}, {"date": "2015-06-13 22:56", "count": 110}, {"date": "2015-06-20 13:25", "count": 111}, {"date": "2015-06-20 13:27", "count": 112}, {"date": "2015-06-22 13:19", "count": 113}, {"date": "2015-06-22 13:34", "count": 115}, {"date": "2015-06-22 15:42", "count": 116}, {"date": "2015-06-22 16:08", "count": 117}, {"date": "2015-06-22 16:27", "count": 118}, {"date": "2015-06-22 16:31", "count": 119}, {"date": "2015-06-22 16:38", "count": 122}, {"date": "2016-11-11 12:54", "count": 123}, {"date": "2016-11-11 12:55", "count": 125}, {"date": "2016-11-11 16:14", "count": 127}, {"date": "2016-11-11 16:28", "count": 129}, {"date": "2016-11-11 16:43", "count": 130}, {"date": "2016-11-11 16:44", "count": 132}, {"date": "2016-11-14 07:29", "count": 133}, {"date": "2016-11-14 09:16", "count": 134}, {"date": "2016-11-14 09:27", "count": 136}, {"date": "2016-11-14 09:28", "count": 137}], "mostCommonWords": [{"count": 41, "word": "jag"}, {"count": 36, "word": "\u00e4r"}, {"count": 35, "word": "det"}, {"count": 28, "word": "inte"}, {"count": 27, "word": "Jag"}, {"count": 26, "word": ":D"}, {"count": 26, "word": "och"}, {"count": 26, "word": "har"}, {"count": 24, "word": "s\u00e5"}, {"count": 23, "word": "med"}]}};

	self.getChatName = function() {
		if(typeof(generalStats['chatName']) === 'undefined') {
			return '';
		} else {
			return generalStats['chatName'];
		}
	};

	self.getUsers = function() {
		if(typeof(generalStats['users']) === 'undefined') {
			return [];
		} else {
			return generalStats['users'];
		}
	};

	self.getTotalNumberOfMessages = function() {
		if(typeof(generalStats['totalNumberOfMessages']) === 'undefined') {
			return 0;
		} else {
			return generalStats['totalNumberOfMessages'];
		}
	};

	self.getMessagesPerUser = function() {
		if(typeof(generalStats['messagesPerUser']) === 'undefined') {
			return {};
		} else {
			return generalStats['messagesPerUser'];
		}
	};

	self.getMessagesOverTime = function() {
		if(typeof(generalStats['messagesOverTime']) === 'undefined') {
			return [];
		} else {
			return generalStats['messagesOverTime'];
		}
	};

	self.getMessagesPerMonth = function() {
		if(typeof(generalStats['messagesPerMonth']) === 'undefined') {
			return {};
		} else {
			return generalStats['messagesPerMonth'];
		}
	};

	self.getMessagesPerWeekday = function() {
		if(typeof(generalStats['messagesPerWeekday']) === 'undefined') {
			return {};
		} else {
			return generalStats['messagesPerWeekday'];
		}
	};

	self.getMessagesPerTime = function() {
		if(typeof(generalStats['messagesPerTime']) === 'undefined') {
			return {};
		} else {
			return generalStats['messagesPerTime'];
		}
	};

	self.getMostCommonWords = function() {
		if(typeof(generalStats['mostCommonWords']) === 'undefined') {
			return [];
		} else {
			return generalStats['mostCommonWords'];
		}
	};

	self.getWordCloud = function() {
		if(typeof(generalStats['wordCloud']) === 'undefined') {
			return [];
		} else {
			return generalStats['wordCloud'];
		}
	};


	self.getTotalNumberOfMessagesForUser = function(userId) {
		if(typeof(userStats[userId]['totalNumberOfMessages']) === 'undefined') {
			return 0;
		} else {
			return userStats[userId]['totalNumberOfMessages'];
		}
	};

	self.getMessagesPerUserForUser = function(userId) {
		if(typeof(userStats[userId]['messagesPerUser']) === 'undefined') {
			return {};
		} else {
			return userStats[userId]['messagesPerUser'];
		}
	};

	self.getMessagesOverTimeForUser = function(userId) {
		if(typeof(userStats[userId]['messagesOverTime']) === 'undefined') {
			return [];
		} else {
			return userStats[userId]['messagesOverTime'];
		}
	};

	self.getMessagesPerMonthForUser = function(userId) {
		if(typeof(userStats[userId]['messagesPerMonth']) === 'undefined') {
			return {};
		} else {
			return userStats[userId]['messagesPerMonth'];
		}
	};

	self.getMessagesPerWeekdayForUser = function(userId) {
		if(typeof(userStats[userId]['messagesPerWeekday']) === 'undefined') {
			return {};
		} else {
			return userStats[userId]['messagesPerWeekday'];
		}
	};

	self.getMessagesPerTimeForUser = function(userId) {
		if(typeof(userStats[userId]['messagesPerTime']) === 'undefined') {
			return {};
		} else {
			return userStats[userId]['messagesPerTime'];
		}
	};

	self.getMostCommonWordsForUser = function(userId) {
		if(typeof(userStats[userId]['mostCommonWords']) === 'undefined') {
			return [];
		} else {
			return userStats[userId]['mostCommonWords'];
		}
	};

	self.getWordCloudForUser = function(userId) {
		if(typeof(userStats[userId]['wordCloud']) === 'undefined') {
			return [];
		} else {
			return userStats[userId]['wordCloud'];
		}
	};


	return self;
}());
