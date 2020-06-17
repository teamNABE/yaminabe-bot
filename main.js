// Response for Uptime Robot
const http = require("http");
http
  .createServer(function(request, response) {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end("Discord bot is active now \n");
  })
  .listen(3000);

const fs = require('fs');
const json = JSON.parse(fs.readFileSync('./guild-info.json', 'utf8'));


// Discord bot implements
const discord = require("discord.js");
const client = new discord.Client();

var letter = [":zero:",":one:",":two:",":three:",":four:",":five:",":six:",":seven:",":eight:",":nine:",":keycap_ten:",":regional_indicator_a:",":regional_indicator_b:",":regional_indicator_c:",":regional_indicator_d:",":regional_indicator_e:",":regional_indicator_f:",":regional_indicator_g:",":regional_indicator_h:",":regional_indicator_i:",":regional_indicator_j:",":regional_indicator_k:",":regional_indicator_l:",":regional_indicator_m:",":regional_indicator_n:",":regional_indicator_o:",":regional_indicator_p:",":regional_indicator_q:",":regional_indicator_r:",":regional_indicator_s:",":regional_indicator_t:",":regional_indicator_u:",":regional_indicator_v:",":regional_indicator_w:",":regional_indicator_x:",":regional_indicator_y:",":regional_indicator_z:"]
var sign = ["0⃣","1⃣","2⃣","3⃣","4⃣","5⃣","6⃣","7⃣","8⃣","9⃣","🔟","🇦","🇧","🇨","🇩","🇪","🇫","🇬","🇭","🇮","🇯","🇰","🇱","🇲","🇳","🇴","🇵","🇶","🇷","🇸","🇹","🇺","🇻","🇼","🇽","🇾","🇿"]



client.on("ready", message => {
  console.log("bot is ready!");
    client.channels.cache.get(json[0].Yaminabe.OperationChannel.Gamerole).messages.fetch(json[0].Yaminabe.MessageId.GamerolePanel);
    client.channels.cache.get(json[0].Yaminabe.OperationChannel.Compass).messages.fetch(json[0].Yaminabe.MessageId.CompassPanel);
  });



client.on("message", async message => {
  
  //kick system
  if (message.content.startsWith("//kick")) {
    if (!(message.channel.id === json[0].Yaminabe.OperationChannel.BotPanel))  return message.delete();
      if (!message.member.roles.cache.get(json[0].Yaminabe.Roles.Nabe))
        return message.guild.channels.cache.get(json[0].Yaminabe.OperationChannel.BotPanel).send({
                  embed: {
                      title: "実行する権限がありません。",
                      color: json[0].Yaminabe.Color.failed,
                      timestamp: new Date()
                  }
               });
          if (message.mentions.members.size !== 1)
            return message.guild.channels.cache.get(json[0].Yaminabe.OperationChannel.BotPanel).send({
                      embed: {
                          title: "kickするメンバーを1人指定してください",
                          color: json[0].Yaminabe.Color.failed,
                          timestamp: new Date()
                      }
                   });

          var reason;
              if (message.content.endsWith("1"))
                reason = [
                  json[0].Yaminabe.KickReason.NoSelfIntoroduction.inside,
                  json[0].Yaminabe.KickReason.NoSelfIntoroduction.outside
                ];
              if (message.content.endsWith("2"))
                reason = [
                  json[0].Yaminabe.KickReason.order.inside,
                  json[0].Yaminabe.KickReason.order.outside
                ];
              if (message.content.endsWith("3")){
                reason = [
                  json[0].Yaminabe.KickReason.other.inside,
                  json[0].Yaminabe.KickReason.other.outside
                ];}else return message.guild.channels.cache.get(json[0].Yaminabe.OperationChannel.BotPanel).send({
                                 embed: {
                                     title: "正しい理由選択番号を入力してください。",
                                     color: json[0].Yaminabe.Color.failed,
                                     timestamp: new Date()
                                 }
                               });

          message.mentions.members.first().send({
            embed: {
              title: "kickされました。",
              description:
                "闇鍋サーバーにご参加いただきありがとうございます。\n\n" +
                reason[1] +
                "\n\n再度参加を希望される場合は、公式ホームページからお入りください。\nTeam鍋 Discordサーバー 「闇鍋」   運営一同 ",
              color: json[0].Yaminabe.Color.info,
              timestamp: new Date(),
              thumbnail: {
                url:
                  "https://cdn.discordapp.com/icons/485736439527505922/d5fb962d62a0db6bc78d95a19a69f67b.png"
              }
            }
          });

          const member = await message.mentions.members.first().kick(reason[0]);

          message.channel.send({
            embed: {
              author: {
                name: message.author.username,
                icon_url: message.author.defaultAvatarURL
              },
              title: "Kicked User",
              description:
                `${member.user.tag}をkickしました` + "\nreason : " + reason[0],
              color: json[0].Yaminabe.Color.kick,
              timestamp: new Date()
            }
          });
          message.guild.channels.cache.get(json[0].Yaminabe.OperationChannel.log).send({
              embed: {
                author: {
                  name: message.author.username,
                  icon_url: message.author.defaultAvatarURL
                },
                title: "Kicked User",
                description:
                  `${member.user.tag}をkickしました` + "\nreason : " + reason[0],
                color: json[0].Yaminabe.Color.kick,
                timestamp: new Date()
              }
            });
        };

  //ban system
  if (message.content.startsWith("//ban")) {
    if (!(message.channel.id === json[0].Yaminabe.OperationChannel.BotPanel))  return message.delete();
      if (!message.member.roles.cache.get(json[0].Yaminabe.Roles.Owner))
        return message.guild.channels.cache.get(json[0].Yaminabe.OperationChannel.BotPanel).send({
                  embed: {
                    title: "実行する権限がありません。",
                    color: json[0].Yaminabe.Color.failed,
                    timestamp: new Date()
                  }
                    });
          if (message.mentions.members.size !== 1)
            return message.guild.channels.cache.get(json[0].Yaminabe.OperationChannel.BotPanel).send({
                      embed: {
                        title: "banするメンバーを1人指定してください",
                        color: json[0].Yaminabe.Color.failed,
                        timestamp: new Date()
                      }
                   });

          var reason;
            if (message.content.endsWith("1")){
              reason = [
                json[0].Yaminabe.BanReason.order.inside,
                json[0].Yaminabe.BanReason.order.outside
              ];}else return message.guild.channels.cache.get(json[0].Yaminabe.OperationChannel.BotPanel).send({
                                 embed: {
                                     title: "正しい理由選択番号を入力してください。",
                                     color: json[0].Yaminabe.Color.failed,
                                     timestamp: new Date()
                                 }
                               });
          
          message.mentions.members.first().send({
            embed: {
              title: "Banされました。",
              description:
                "闇鍋サーバーにご参加いただきありがとうございます。\n\n" +
                reason[1] +
                "\n\nBanの解除等の申請はできません。運営が独自で判断します。\nTeam鍋 Discordサーバー 「闇鍋」   運営一同 ",
              color: json[0].Yaminabe.Color.info,
              timestamp: new Date(),
              thumbnail: {
                url:
                  "https://cdn.discordapp.com/icons/485736439527505922/d5fb962d62a0db6bc78d95a19a69f67b.png"
              }
            }
          });

          const member = await message.mentions.members.first().ban(reason[0]);

          message.channel.send({
            embed: {
              author: {
                name: message.author.username,
                icon_url: message.author.defaultAvatarURL
              },
              title: "Banned User",
              description:
                `${member.user.tag}をbanしました` + "\nreason : " + reason[0],
              color: json[0].Yaminabe.Color.ban,
              timestamp: new Date()
            }
          });
          message.guild.channels.cache.get(json[0].Yaminabe.OperationChannel.log).send({
              embed: {
                author: {
                  name: message.author.username,
                  icon_url: message.author.defaultAvatarURL
                },
                title: "Banned User",
                description:
                  `${member.user.tag}をbanしました` + "\nreason : " + reason[0],
                color: json[0].Yaminabe.Color.ban,
                timestamp: new Date()
              }
            });
        };

  //owner role give system
  if (message.content.startsWith("//owner")) {
    if (!(message.channel.id === json[0].Yaminabe.OperationChannel.Emergency)) return message.delete();
      if (!message.content.endsWith(process.env.password)) return message.delete();
      message.member.roles.add(json[0].Yaminabe.Roles.Owner);
      message.delete();
      message.guild.channels.cache.get(json[0].Yaminabe.OperationChannel.Emergency).send({
        embed: {
          title: "succeeded",
          color: json[0].Yaminabe.Color.succeeded,
          timestamp: new Date()
        }
      });
    };
  
  
  //make or reload the role panel
  if(message.content.startsWith("//reloadpanel")){
    if((message.channel.id === json[0].Yaminabe.OperationChannel.Gamerole)){
      if(!message.member.roles.cache.get(json[0].Yaminabe.Roles.Admin))
        return message.channel.send({
                  embed: {
                    title: "実行する権限がありません。",
                    color: json[0].Yaminabe.Color.failed,
                    timestamp: new Date()
                  }
                });
      var msg = await client.channels.cache.get(json[0].Yaminabe.OperationChannel.Gamerole).messages.fetch(json[0].Yaminabe.MessageId.GamerolePanel)
      var text =("**ゲームロール**\nリアクションを押すことで役職が付きます。\n");
      for(var i=0; i<json[0].Yaminabe.Gamerole.length; i++){
        text = (text + letter[i] +" : " +json[0].Yaminabe.Gamerole[i][0]+"\n");
        msg.react(sign[i]);
      };
       msg.edit(text);
      message.delete(); 
      
    };
    if((message.channel.id === json[0].Yaminabe.OperationChannel.Compass)){
      if(!message.member.roles.cache.get(json[0].Yaminabe.Roles.Admin))
        return message.channel.send({
                  embed: {
                    title: "実行する権限がありません。",
                    color: json[0].Yaminabe.Color.failed,
                    timestamp: new Date()
                  }
                });
      var msg = await client.channels.cache.get(json[0].Yaminabe.OperationChannel.Compass).messages.fetch(json[0].Yaminabe.MessageId.CompassPanel)
      var text =("**コンパスランク**\nリアクションを押すことで役職が付きます。\n");
      for(var i=0; i<json[0].Yaminabe.CompassRank.length; i++){
        text = (text + letter[i] +" : " +json[0].Yaminabe.CompassRank[i][0]+"\n");
        msg.react(sign[i]);
      };
       msg.edit(text);
       message.delete();  
 }
 };
  
  if(message.content.startsWith("//send")){
    message.channel.send("test");
    await message.react(sign[20])
  }
});

client.on("messageReactionAdd", async(messageReaction ,user) =>{
  if(user.bot) return;
    if((messageReaction.message.channel.id === json[0].Yaminabe.OperationChannel.Compass)){
      for(var i=0;i<36;i++){
        if(messageReaction.emoji.name === sign[i]){
          var member = user.id
          await client.guilds.cache.get(json[0].Yaminabe.Server).members.cache.get(member).roles.add(json[0].Yaminabe.CompassRank[i][1])
          i=36
          const reply = await messageReaction.message.channel.send({
                  embed: {
                    description: "コンパスランクの付与に成功しました。",
                    color: json[0].Yaminabe.Color.succeeded,
                  }
                });
            reply.delete({ timeout: 5000 });
        };
      };
    };

  if((messageReaction.message.channel.id === json[0].Yaminabe.OperationChannel.Gamerole)){
      for(var i=0;i<36;i++){
        if(messageReaction.emoji.name === sign[i]){
          var member = user.id
          await client.guilds.cache.get(json[0].Yaminabe.Server).members.cache.get(member).roles.add(json[0].Yaminabe.Gamerole[i][1])
          i=36
          const reply = await messageReaction.message.channel.send({
                  embed: {
                    description: "ゲームロールの付与に成功しました。",
                    color: json[0].Yaminabe.Color.succeeded,
                  }
                });
            reply.delete({ timeout: 5000 });
        };
      };
    };
});

client.on("messageReactionRemove", async(messageReaction ,user) =>{
  if(user.bot) return;
    if((messageReaction.message.channel.id === json[0].Yaminabe.OperationChannel.Compass)){
      for(var i=0;i<36;i++)
        if(messageReaction.emoji.name === sign[i]){
          var member = user.id
          await client.guilds.cache.get(json[0].Yaminabe.Server).members.cache.get(member).roles.remove(json[0].Yaminabe.CompassRank[i][1])
          i=36
          const reply = await messageReaction.message.channel.send({
                  embed: {
                    description: "コンパスランクの削除に成功しました。",
                    color: json[0].Yaminabe.Color.succeeded,
                  }
                });
            reply.delete({ timeout: 5000 });
        };
    };
  
    if((messageReaction.message.channel.id === json[0].Yaminabe.OperationChannel.Gamerole)){
      for(var i=0;i<36;i++)
        if(messageReaction.emoji.name === sign[i]){
          var member = user.id
          await client.guilds.cache.get(json[0].Yaminabe.Server).members.cache.get(member).roles.remove(json[0].Yaminabe.Gamerole[i][1])
          i=36
          const reply = await messageReaction.message.channel.send({
                  embed: {
                    description: "ゲームロールの削除に成功しました。",
                    color: json[0].Yaminabe.Color.succeeded,
                  }
                });
            reply.delete({ timeout: 5000 });
        };
    }; 
});

if (process.env.DISCORD_BOT_TOKEN == undefined) {
  console.log("please set ENV: DISCORD_BOT_TOKEN");
  process.exit(0);
}

client.login(process.env.DISCORD_BOT_TOKEN);

//console.log(Discord)