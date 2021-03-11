const profileModel = require("../../models/profileSchema");

module.exports = {
    name: "balance",
    aliases: ["bal", "bl"],
    permissions: [],
    categories: 'economy',
    description: "Check the user balance",
    async execute(message, args, cmd, client, Discord, profileData) {
      const totalAmount = profileData.eddies + profileData.bank

      const target = message.mentions.members.first()
      if(target) {
          const targetData = await profileModel.findOne({ userID: target.id, serverID: message.guild.id })
          if(!targetData) return message.channel.send("This user does not exist on this database")
          let MoneyEmbed = new Discord.MessageEmbed()
          .setColor("#006400")
          .setTitle(`\`${message.author.username}\` BANK ACCOUNT`)
          .setAuthor(`${message.author.username}`, message.author.displayAvatarURL())
          .setDescription(
             `User Economy Information: \n\n**Available Wallet:** \`$${profileData.eddies}\`\n **Available Bank Balance:** \`$${profileData.bank}\`\n **Total Amount**: \`$${totalAmount}\``
          )
          .setTimestamp()
          .setFooter(`You, ${message.author.username} have, ${totalAmount} total eddies!`)

          message.channel.send(MoneyEmbed);
      } else if(!target){
         let moneyEmbed = new Discord.MessageEmbed()
          .setColor("#006400")
          .setTitle(`\`${message.author.username}\` BANK ACCOUNT`)
          .setAuthor(`${message.author.username}`, message.author.displayAvatarURL())
          .setDescription(
             `User Economy Information: \n\n**Available Wallet:** \`$${profileData.eddies}\`\n **Available Bank Balance:** \`$${profileData.bank}\`\n **Total Amount**: \`$${totalAmount}\``
          )
          .setTimestamp()
          .setFooter(`You, ${message.author.username} have, ${totalAmount} total eddies!`)

          message.channel.send(moneyEmbed);
      }
  }
}
