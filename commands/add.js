const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    if (!message.member.roles.cache.has(bot.config.staffrole)) return message.reply(`:x: You do not have permission to execute this command.`)

    if (args[0] !== message.guild.members.cache.get(args[0])) return message.channel.send(`:x: Incorrect user ID.`)

    else {
        message.channel.updateOverwrite(args[0], { VIEW_CHANNEL: true });

        message.channel.send(`Added <@${args[0]}> to this ticket.`)

    }
    
}

module.exports.help = {
    name: "add",
    description: "Sluit een ticket.",
}