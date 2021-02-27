# Temperature-Monitor

This project was made for my IOT-course.<br/>

Temperature monitor is a IOT-project that consists of NodeMCU, Raspberry Pi & MongoDB database. NodeMCU collects temperature and humidity data, sends it to Raspberry Pi that runs Node.js server that is serving an API and a simple result website. The API stores the collected values to MongoDB. When user access the website JS script requests the values from the API and shows them in a table to the user.
![Monitor](/images/websiteView.png)

## Features

- Collects temperature and humidity data every 30 seconds.
- Simple Node.js api.
- MongoDB usage.
- Website gets new data every minute.

## Meta

Made by Teemu Koivumaa

Distributed under the MIT license. See ``LICENSE`` for more information.

[My GitHub page](https://github.com/Teemukoivumaa) <br />
[My LinkedIn page](https://www.linkedin.com/in/teemukoivumaa)
