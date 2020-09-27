# League of Legends Tournament bot (Discord)
## Introduction
this project features a Discord bot, with the intend to reduce the administration overhead for tournament hosts. The bot takes care of verifying new server members and grouping players into teams. In the future it will take care of match results and matchmaking.

## Setting up the bot
- To run the code itself, first you need [Node.js](https://nodejs.org/en/). Install this JavaScript runtime. 
- You need to download the project and execute  
`npm install` inside the primary folder using Powershell (on Windows). This will install the neccesary dependencies.  
- Then you need to create a json file inside the directiory named: `config.json`. Inside you need to fill in the values needed to launch the bot: the discord developer API token, the riotapikey and the prefix used for every command:  
```
{
	"prefix": "..",
	"token": "TOKENGOESHERE",
	"riotapikey": "RIOTKEYGOESHERE"
}
```  
- To run the bot, a developer account at [Discord](https://discord.com/developers/) needs to be created. The key can be filled in the `config.json` under `token`.  
## Bot Settings
In order for the bot to communicate with channels, you need to edit the `general-settings.json` and paste in the IDs of the channels and roles. Those need to be created before launching the bot.
### Roles
staffrole: this is the tournament management role, which may edit the bot via commands.  
verified: after a playeer verified with his ingame account. Use this role as you please, maybe to show and hide some channels.  
EUW1 / ...: those roles will be assinged after verification as well. Use this to tag or group players.  
## Commands
- add
- addmember
- close
- coin
- deleteteam
- move
- registerteam
- remove
- removemember
- setteamcolor
- ticket
- verify
