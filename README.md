# Connect 4 Slackbot

This is a NodeJS Server that controls a slackbot built to support head to head play of Connect 4 vs another user.

# Setup

Currently, the slackbot is built to run on a local nodejs server only. Here are the steps to setup the server locally:

1. Create a new bot on your Slack organization. Navigate to http://yourorganization.slack.com/services/new/bot, and follow the instructions there to get your API key for your bot.

2. Check out this repository: `git clone git@github.com:genericname92/slackbot-connect4.git`

3. Navigate to the new directory root, run `npm install`

4. Run the server by running `BOT_API_KEY=[YOUR BOT KEY] node bin/bot.js`

# Bot Commands

The bot responds to 2 commands: You can start a game by messaging the bot `play @user`, where @user is the user you wish to play against.

Once the game has started, you can message the bot number's 1-7 to select the columns. 1 is the left column, 7 is the right column.

Once the game has ended, the #general channel will be notified if the bot is added to the channel.

# TODOLIST Improvements

1. Upgrade npm version to support mocha.

2. Implement Unit testing on everything, especially the checking winner logic

3. Make bot more resilient to nonsense inputs around the play command

4. Implement better error messaging/reporting
