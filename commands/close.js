const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    if (!message.member.roles.cache.has(bot.config.staffrole)) return message.reply(`:x: You do not have permission to execute this command.`)

    const categoryID = bot.config.ordercat || bot.config.ticketcat;

    
        message.channel.messages.fetch()
                        .then( msgs => {
                            let txt = '';

                            msgs = msgs.sort( ( a, b ) => a.createdTimestamp - b.createdTimestamp );

                            txt += `${message.guild.name}\n`;
                            txt += `#${message.channel.name}\n`;
                            txt += `${msgs.size} messages\n\n\n`;

                            msgs.forEach( msg => {
                                if ( msg.content ) {
                                    txt += `----- ${msg.author.tag} at ${msg.createdAt}\n`;
                                    txt += `${msg.content}\n`;
                                    txt += `-----\n\n`;
                                }
                            } );

                            message.author.send( `A transcript has been generated for the ticket you closed.` );
                            message.author.send( new discord.MessageAttachment( Buffer.from( txt ), `${message.channel.name}.txt` ) );

                            let logChannel = message.guild.channels.cache.get(bot.config.logs)

                            const logEmbed = new discord.MessageEmbed()
                        .setTitle(`**Ticket Closed**`)
                        .setColor(bot.config.color)
                        .setFooter(bot.config.footer)
                        .addField( "Closed by:", message.author.tag )
                        .addField(`Ticket from`, message.channel.name)
                            logChannel.send(logEmbed);
                            logChannel.send( new discord.MessageAttachment( Buffer.from( txt ), `${message.channel.name}.txt` ) );

                        } );
message.channel.send(`Ticket will be closed in 10 seconds`)
                        setTimeout(() => {
                            message.channel.delete();
                          }, 10000);
    
}

module.exports.help = {
    name: "close",
    description: "Sluit een ticket.",
}