const discord = require('discord.js');
const settings = require('../general-settings.json')
const randomChars = require('random-chars')

module.exports =
{
    name: 'ticket',
    description: 'Creates a ticket',
    cooldown: 1,
    aliases: ['bal', 'money'],
    execute(message, args) {

        const exampleEmbed = new discord.MessageEmbed()
            .setColor(settings.color)
            .setTitle(`Options`)
            .setDescription(`💡 - Support\n⏱️ - Did not recieve my product\n🔑 - Forgot my credentials\n📃 - Apply`)
            .setFooter(settings.footer);

        message.channel.send(exampleEmbed)
            .then(async msg => {
                await msg.react('💡')
                await msg.react('⏱️')
                await msg.react('🔑')
                await msg.react('📃')
                let filter = (reaction, user) => {
                    return ['💡', '⏱️', '🔑', '📃'].includes(reaction.emoji.name) && user.id === message.author.id;
                }
                msg.awaitReactions(filter, { max: 1, time: 17000, errors: ['time'] })
                    .then(collected => {
                        let option = ''
                        const reaction = collected.first()
                        message.channel.send('Creating ticket....')
                        message.guild.channels.create('ticket-' + randomChars.get(6),
                            {
                                type: 'text',
                                permissionOverwrites: [
                                    {
                                        id: settings.staffrole,
                                        allow: ['VIEW_CHANNEL'],
                                    },
                                    {
                                        id: message.author.id,
                                        allow: ['VIEW_CHANNEL']
                                    },
                                    {
                                        id: message.guild.id,
                                        deny: ['VIEW_CHANNEL']
                                    }
                                ]
                            })
                            .then(channel => {
                                channel.setParent(settings.ticketcat)

                                if (reaction.emoji.name === '💡') {
                                    let embed = new discord.MessageEmbed()
                                        .setTitle(`Support ticket`)
                                        .setColor(settings.color)
                                        .setDescription(`Hello, please tell us more about your issue/question and our support team will respond as fast as possible.`)
                                        .setFooter(settings.footer)
                                    channel.send(embed)
                                }

                                if (reaction.emoji.name === '⏱️') {
                                    let embed2 = new discord.MessageEmbed()
                                        .setTitle(`Product not received`)
                                        .setColor(settings.color)
                                        .setDescription(`Hello, could you please send us the PayPal transaction ID and the Order ID so we can activate your order and the product should be created automatically.`)
                                        .setFooter(settings.footer)

                                    channel.send(embed2)
                                }

                                if (reaction.emoji.name === '🔑') {
                                    let embed3 = new discord.MessageEmbed()
                                        .setTitle(`Credentials lost`)
                                        .setColor(settings.color)
                                        .setDescription(`Hello, could you send us your email, first and last name so we can reset your password or/and username.`)
                                        .setFooter(settings.footer)

                                    channel.send(embed3)
                                }

                                if (reaction.emoji.name === '📃') {
                                    let embed4 = new discord.MessageEmbed()
                                        .setTitle(`Application`)
                                        .setColor(settings.color)
                                        .setDescription(`Hello, if you want to apply for marketing click [here](https://forms.gle/Xehxo8vkjTkdz64i6)\nIf you want to apply for General support or higher, click [here](https://forms.gle/fUyqHK7jULvMc3xo9)`)
                                        .setFooter(settings.footer)
                                    channel.send(embed4)
                                }


                            })

                    }).catch(e => console.log(e))
            })

    }

}