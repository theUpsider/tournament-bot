const discord = require("discord.js");
var randomChars = require('random-chars');
 
module.exports.run = async (bot, message, args) => {

        const exampleEmbed = new discord.MessageEmbed()
	.setColor(bot.config.color)
        .setTitle(`Options`)
        .setDescription(`💡 - Support\n⏱️ - Did not recieve my product\n🔑 - Forgot my credentials\n📃 - Apply`)
        .setFooter(bot.config.footer);

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
         id: bot.config.staffrole, 
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
        channel.setParent(bot.config.ticketcat)

if (reaction.emoji.name === '💡') {
    let embed = new discord.MessageEmbed()
    .setTitle(`Support ticket`)
    .setColor(bot.config.color)
    .setDescription(`Hello, please tell us more about your issue/question and our support team will respond as fast as possible.`)
    .setFooter(bot.config.footer)
    channel.send(embed)
}

if (reaction.emoji.name === '⏱️') {
    let embed2 = new discord.MessageEmbed()
    .setTitle(`Product not received`)
    .setColor(bot.config.color)
    .setDescription(`Hello, could you please send us the PayPal transaction ID and the Order ID so we can activate your order and the product should be created automatically.`)
    .setFooter(bot.config.footer)

    channel.send(embed2)
}

if (reaction.emoji.name === '🔑') {
    let embed3 = new discord.MessageEmbed()
    .setTitle(`Credentials lost`)
    .setColor(bot.config.color)
    .setDescription(`Hello, could you send us your email, first and last name so we can reset your password or/and username.`)
    .setFooter(bot.config.footer)

    channel.send(embed3)
}

if (reaction.emoji.name === '📃') {
    let embed4 = new discord.MessageEmbed()
    .setTitle(`Application`)
    .setColor(bot.config.color)
    .setDescription(`Hello, if you want to apply for marketing click [here](https://forms.gle/Xehxo8vkjTkdz64i6)\nIf you want to apply for General support or higher, click [here](https://forms.gle/fUyqHK7jULvMc3xo9)`)
    .setFooter(bot.config.footer)
    channel.send(embed4)
}


        })
         
            }).catch(e => console.log(e))
})
 
},
 
module.exports.help = {
    name: "new"
}