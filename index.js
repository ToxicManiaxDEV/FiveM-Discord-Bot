const Discord = require("discord.js") //npm i discord.js
const client = new Discord.Client({partials: ["MESSAGE", "USER", "REACTION"]});
const config = require('./config.json');
client.login(config.BOT_TOKEN)
const fs = require ('fs');
client.commands = new Discord.Collection();
const axios = require('axios') 
const prefix = config.prefix // You can change the prefix
client.on("ready", () => {
    client.user.setActivity(config.Activity); 
    console.log("Status bot ON. \n Developed By Toxic")
})

require('events').EventEmitter.prototype.setmaxListeners = 300;


//support
var temporary = [];
client.on('voiceStateUpdate', async (oldMember, newMember) => {
    let category = client.channels.cache.get(config.category);
    let voiceCH = client.channels.cache.get(config.voice);
    if (newMember.channel == voiceCH) {
        await newMember.guild.channels.create(`${message.author}'s Channel`, {
            type: 'voice', parent: category, userLimit: 99
        }).then(async channel => {
            temporary.push({ newID: channel.id, guild: channel.guild });
            await newMember.setChannel(channel.id);
            
        });
    }
    if (temporary.length > 0) for (let i = 0; i < temporary.length; i++) {
        let ch = client.channels.cache.get(temporary[i].newID);
        if (ch.members.size === 0) {
            await ch.delete();
            return temporary.splice(i, 1);
        }
    }
});

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}
client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    const args= message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command == 'rr'){
        client.commands.get('rr').execute(message, args);
    }


});

  
client.on("message", async message =>{ 
    if (message.author.bot) return;
    if (message.channel.id === config.suggestchannel) {
    message.react(config.emojireact1)
    message.react(config.emojireact2)
    }
});

////anti ad
//client.on("message", (message) => {
////if you want to a specific channel    if (message.channel.id === '818800888470568960') {
//    if (message.content.includes("https://discord.gg/")) {
//        message.delete();
//        message.channel.send(`${message.author} You are not allow to send discord invites`)
//        console.log(`deleted an invite by ${message.author}`)
//        const antiad = new Discord.MessageEmbed()
//        .setTitle('Anti Advertise Logs')
//        .setDescription(`User ${message.author} tried to send an invite ! \n In Channel ${message.channel} \n User Id ${message.author.id} \n Message Id ${message.id} \n Invite Link And Content ${message.content} \n Is it a bot ? ${message.author.bot}`)
//        .setFooter('Anti Advertise Logs By Toxic')
//        .setTimestamp()
//        .setColor("RED")
//        client.channels.cache.get("818446799236628522").send(antiad);
//}
//}) //if specific revove ) 
////if specific channel remove the green });

//client.on("message", (message) => {
//  
//    if (message.content.includes("https://www.youtube.com/")) {
//        message.delete();
//        message.channel.send(`${message.author} You are not allowed to send youtube links`)
//        console.log(`deleted an invite by ${message.author}`)
//        const antiad = new Discord.MessageEmbed()
//        .setTitle('Anti Advertise Logs')
//        .setDescription(`User ${message.author} tried to send an invite ! \n In Channel ${message.channel} \n User Id ${message.author.id} \n Message Id ${message.id} \n Invite Link And Content ${message.content} \n Is it a bot ? ${message.author.bot}`)
//        .setFooter('Anti Advertise Logs By Toxic')
//        .setTimestamp()
//        .setColor("RED")
//        client.channels.cache.get("818446799236628522").send(antiad);
//}
//});

//client.on("message", (message) => {
//  if (message.content === '!testdon') {
//      message.delete();
//      const donates = new Discord.MessageEmbed()
//      .setDescription(`**<@&762319182707687434> 5$ \n\n > 1 Donate Car \n \n > 20 Repair Kits**`)
//      .setFooter(`${message.guild.name}`)
//      .setColor("Silver")
//      message.channel.send(donates)
//}
//});

//dark chat 
client.on('message', async message => {
    if(message.author.bot) return;
  
  if(message.channel.id === config.DARKNET){ //dark chat channelid
    message.channel.send(message.content, message.attachments.first())
    message.delete({ timeout: 100 })
    }
    if(message.channel.id === config.DARKNET){ //dark chat channelid
      let darkchannel = message.guild.channels.cache.get(config.DARKNET_LOGS) //dark chat logs channelid
      if(!message.attachments.first()){ 
        let darkembed = new Discord.MessageEmbed()
        .setTitle("DARKNET LOGS")
        .addField("Author:", `${message.author.tag}`)
      .addField("Message:", `${message.content}`)
      .setTimestamp()
      .setFooter("Darknet Logs Made By Toxic_Maniax#4981")
      darkchannel.send(darkembed)
      }
      
      if(!message.content){
        let darkchannel2 = message.guild.channels.cache.get(config.DARKNET_LOGS) //dark chat logs channelid
        let darkembed2 = new Discord.MessageEmbed()
        .setTitle("DARKNET LOGS")
      .addField("Author:", `${message.author.tag}`)
      .addField("Message:", `NULL`)
      .setImage(message.attachments.first().proxyURL)
      .setTimestamp()
      .setFooter("Darknet Logs Made By Toxic_Maniax#4981")
      darkchannel2.send(darkembed2)
      }
      else if(message.content, message.attachments.first()){
        let darkchannel3 = message.guild.channels.cache.get(config.DARKNET_LOGS) //dark chat logs channelid
        let darkembed3 = new Discord.MessageEmbed()
        .setTitle("DARKNET LOGS")
      .addField("Author:", `${message.author.tag}`)
      .addField("Message:", `${message.content}`)
      .setImage(message.attachments.first().proxyURL)
      .setTimestamp()
      .setFooter("Darknet Logs Made By Toxic_Maniax#4981")
      darkchannel3.send(darkembed3)
      }
    } 
       
  });
  
  client.on("message", message =>{
    if (message.author.bot) return;
    if (message.channel.id === config.TWT){
    if(!message.attachments.first()){  
            message.delete();
            const exampleEmbed = new Discord.MessageEmbed()
            .setAuthor(message.author.username, message.author.avatarURL())
            .setColor('#277ecd')
            .setDescription("" + message.content + "")
            .setImage()
            .setFooter('Twitter', 'https://cdn.discordapp.com/attachments/800068913164714035/810141920747716628/twitter-logo-2-1.png')
            message.channel.send(exampleEmbed);
    
  
    }
  }
    if (message.author.bot) return;
    if (message.channel.id === config.TWT){
    if(!message.content){  
            message.delete();
            const exampleEmbed2 = new Discord.MessageEmbed()
            .setAuthor(message.author.username, message.author.avatarURL())
            .setColor('#277ecd')
            .setImage(message.attachments.first().proxyURL)
            .setFooter('Twitter', 'https://cdn.discordapp.com/attachments/800068913164714035/810141920747716628/twitter-logo-2-1.png')
            message.channel.send(exampleEmbed2);
    
  
    }
  }
    else if (message.author.bot) return;
    if (message.channel.id === config.TWT){
    if (message.content, message.attachments.first()){ 
            message.delete();
            const exampleEmbed3 = new Discord.MessageEmbed()
            .setAuthor(message.author.username, message.author.avatarURL())
            .setColor('#277ecd')
            .setDescription("" + message.content + "")
            .setImage(message.attachments.first().proxyURL)
            .setFooter('Twitter', 'https://cdn.discordapp.com/attachments/800068913164714035/810141920747716628/twitter-logo-2-1.png')
            message.channel.send(exampleEmbed3);
    
  
    }
  }
   if(message.channel.id === config.TWT){ //twt channelid
    let channel = message.guild.channels.cache.get(config.TWT_LOGS) //twt logs channelid
    if(!message.attachments.first()){ 
      let twtlogs = new Discord.MessageEmbed()
      .setTitle("TWT LOGS")
      .addField("Author:", `${message.author.tag}`)
      .addField("Message:", `${message.content}`)
      .setColor("#277ecd")
      .setTimestamp()
      .setFooter("Twitter Logs Made By Toxic_Maniax#4981")
      channel.send(twtlogs);
    }
  
    if(!message.content){
        let channel2 = message.guild.channels.cache.get(config.TWT_LOGS) //twt logs channelid
        let twtlogs2 = new Discord.MessageEmbed()
        .setTitle("TWT LOGS")
      .addField("Author:", `${message.author.tag}`)
      .addField("Message:", `NULL`)
      .setImage(message.attachments.first().proxyURL)
      .setTimestamp()
      .setColor("#277ecd")
      .setFooter("Twitter Logs Made By Toxic_Maniax#4981")
       channel2.send(twtlogs2)
      } 
      
      
      else if(message.content, message.attachments.first()){
        let channel3 = message.guild.channels.cache.get(config.TWT_LOGS) //twt logs channelid
        let twtlogs3 = new Discord.MessageEmbed()
        .setTitle("DARKNET LOGS")
      .addField("Author:", `${message.author.tag}`)
      .addField("Message:", `${message.content}`)
      .setImage(message.attachments.first().proxyURL)
      .setTimestamp()
      .setColor("#277ecd")
      .setFooter("Twitter Logs Made By Toxic_Maniax#4981")
      channel3.send(twtlogs3)
      }
  
  
    
    } 
  
  })

  

  client.on("message", message =>{
    if (message.author.bot) return;
    if (message.channel.id === config.INSTA){
    if(!message.attachments.first()){  
            message.delete();
            const InstagramexampleEmbed = new Discord.MessageEmbed()
            .setAuthor(message.author.username, message.author.avatarURL())
            .setColor('#fc0066')
            .setDescription("" + message.content + "")
            .setImage()
            .setFooter('Instagram', 'https://cdn.discordapp.com/attachments/790844941525319710/813125111367991296/283-2831746_insta-icon-instagram.png')
            message.channel.send(InstagramexampleEmbed);
    
  
    }
  }
    if (message.author.bot) return;
    if (message.channel.id === config.INSTA){
    if(!message.content){  
            message.delete();
            const InstagramexampleEmbed2 = new Discord.MessageEmbed()
            .setAuthor(message.author.username, message.author.avatarURL())
            .setColor('#fc0066')
            .setImage(message.attachments.first().proxyURL)
            .setFooter('Instagram', 'https://cdn.discordapp.com/attachments/790844941525319710/813125111367991296/283-2831746_insta-icon-instagram.png')
            message.channel.send(InstagramexampleEmbed2);
    
  
    }
  }
    else if (message.author.bot) return;
    if (message.channel.id === config.INSTA){
    if (message.content, message.attachments.first()){ 
            message.delete();
            const InstagramexampleEmbed3 = new Discord.MessageEmbed()
            .setAuthor(message.author.username, message.author.avatarURL())
            .setColor('#fc0066s')
            .setDescription("" + message.content + "")
            .setImage(message.attachments.first().proxyURL)
            .setFooter('Instagram', 'https://cdn.discordapp.com/attachments/790844941525319710/813125111367991296/283-2831746_insta-icon-instagram.png')
            message.channel.send(InstagramexampleEmbed3);
    
  
    }
  }
   if(message.channel.id === config.INSTA){ //Instagram channelid
    let Instagramchannel = message.guild.channels.cache.get(config.INSTA_LOGS) //Instagram logs channelid
    if(!message.attachments.first()){ 
      let Instagramlogs = new Discord.MessageEmbed()
      .setTitle("INSTAGRAM LOGS")
      .addField("Author:", `${message.author.tag}`)
      .addField("Message:", `${message.content}`)
      .setColor("#fc0066")
      .setTimestamp()
      .setFooter("Instagram Logs Made By Toxic_Maniax#4981")
      Instagramchannel.send(Instagramlogs);
    }
  
    if(!message.content){
        let Instagramchannel2 = message.guild.channels.cache.get(config.INSTA_LOGS) //Instagram logs channelid
        let Instagramlogs2 = new Discord.MessageEmbed()
        .setTitle("INSTAGRAM LOGS")
      .addField("Author:", `${message.author.tag}`)
      .addField("Message:", `NULL`)
      .setImage(message.attachments.first().proxyURL)
      .setTimestamp()
      .setColor("#fc0066")
      .setFooter("Instagram Logs Made By Toxic_Maniax#4981")
      Instagramchannel2.send(Instagramlogs2)
      } 
      
      
      else if(message.content, message.attachments.first()){
        let Instagramchannel3 = message.guild.channels.cache.get(config.INSTA_LOGS) //Instagram logs channelid
        let Instagramlogs3 = new Discord.MessageEmbed()
        .setTitle("INSTAGRAM LOGS")
      .addField("Author:", `${message.author.tag}`)
      .addField("Message:", `${message.content}`)
      .setImage(message.attachments.first().proxyURL)
      .setTimestamp()
      .setColor("#fc0066")
      .setFooter("Instagram Logs Made By Toxic_Maniax#4981")
      Instagramchannel3.send(Instagramlogs3)
      }
  
  
    
    } 
  
  })



  client.on('ready', () => {
      client.api.applications(client.user.id).guilds('727443690548887633').commands.post({
          data: {
              name: "developer",
              description: "See the developer of the bot"
              // possible options here e.g. options: [{...}]
          }
      });
  
  
      client.ws.on('INTERACTION_CREATE', async interaction => {
          const command = interaction.data.name.toLowerCase();
          const args = interaction.data.options;
  
          if (command === 'developer'){ 
              // here you could do anything. in this sample
              // i reply with an api interaction
              client.api.interactions(interaction.id, interaction.token).callback.post({
                  data: {
                      type: 4,
                      data: {
                          content: "My developer is <@472296414471389195>"
                      }
                  }
              })
          }
      });
  });

const EventEmitter = require('events');
const { registerCustomQueryHandler } = require("puppeteer");
const emitter = new EventEmitter()
EventEmitter.setMaxListeners = 99999

emitter.on('userJoin', (user) => {
    console.log('Success')
    console.log(user)
})


  client.on("message", async message =>{
    if(message.author.bot) return;
      if (message.content === '!status'){
        try {
            const serverip = `${config.toxic.ip}:${config.toxic.port}`
            const { data } = await axios.get(`http://${serverip}/dynamic.json`);
            const regex = /\[([0-9]+)\]/;
            const queue = data.hostname.match(regex);
            if (queue) {
              return message.channel.send(new Discord.MessageEmbed()
              .setColor(config.color)
              .addFields(
                  {name: "**Players**", value: `${data.clients}/${data.sv_maxclients}`, inline: true},
                  {name: "**Queue**", value: `${queue[1]}`, inline: true}
              )
              .setThumbnail(config.thumbnailphoto));
            } else {
              return message.channel.send(new Discord.MessageEmbed()
              .setColor(config.color)
              .addFields(
                  {name: "**Players**", value: `${data.clients}/${data.sv_maxclients}`, inline: true},
                  {name: "**Queue**", value: `0`, inline: true}
              )
              .setThumbnail(config.thumbnailphoto)
              );
            }
          } catch (e) {
            console.log(e.message);
            message.channel.send(new Discord.MessageEmbed()
            .setColor(config.coloroffline)
            .addFields(
                {name: "**Fetching info From Server**", value: `**Fetching info From Server**`, inline:true}
            )
            .setThumbnail(config.thumbnailphoto));
          }
        


}})  

client.on("message", async message =>{ 
    if (message.author.bot) return;
    if (message.content.startsWith(`${prefix}ip`)) {
    const ipEmbed = new Discord.MessageEmbed()
    .setDescription(config.toxic.ip)
    .setFooter(`${message.guild.name}`)
    .setTimestamp()
    message.channel.send(ipEmbed)
    }
});