const Discord = require("discord.js") //npm i discord.js
module.exports = {
	name: 'rr',
	description: 'restart',
    aliases: ["RR"],
	cooldown: 5,
	args: true,
     execute(message, args) {
        const rr = new Discord.MessageEmbed()
        .setTitle('``Server Restarts`` : Hours ')
        .setColor('RED')
        .setFooter('Server Name')
        message.channel.send(rr)

        }
    }