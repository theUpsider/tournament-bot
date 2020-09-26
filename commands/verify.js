const settings = require('../general-settings.json')
const discord = require("discord.js");
const { prefix, token, riotapikey } = require('../config.json');
var RiotRequest = require('riot-lol-api');

//Riot API 
var riotRequest = new RiotRequest(riotapikey);

module.exports =
{
    name: 'verify',
    description: 'get verified to participate',
    usage: '<euw1> <summonername>',
    async execute(message, args) {

        // if (!message.member.roles.cache.has(settings.staffrole)) return message.reply(`:x: You do not have permission to execute this command.`)

        // check if user exists
        //if (! message.guild.member(args[0])) return message.channel.send(`:x: Incorrect user ID (use the numbers not the username).`)
        console.log(riotapikey)
        //  /riot/account/v1/accounts/by-puuid/{puuid}

        {
            riotRequest.request(args[0], 'summoner', '/lol/summoner/v4/summoners/by-name/' + args[1], function (err, SummonerDTO) {
                // console.log(err)
                console.log(SummonerDTO.puuid)
                if(err==null){

                   // message.channel.send(SummonerDTO.summonerLevel)
                }
            })

        }

    }
}