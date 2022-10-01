const { Client, GatewayIntentBits } = require('discord.js');
const { get } = require('axios');

const client = new Client({
  // https://discordjs.guide/popular-topics/intents.html
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const sendCats = async (message, numCats) => {
  const catImages = (await get(`https://api.thecatapi.com/v1/images/search?limit=${numCats}`)).data;
  for (const catImage of catImages) {
    message.channel.send({files: [catImage.url]});
  }
}

client.on('messageCreate', message => {
  if (message.content === '!cat') {
    sendCats(message, 1);
  } else if (/^!cat [0-9]*$/.test(message.content)) {
    let numberOfCats = message.content.split(' ')[1];
    if (numberOfCats > 10 || numberOfCats < 1) {
      numberOfCats = 1;
    }
    sendCats(message, numberOfCats);
  }
});

client.login(process.env.CATPOSTBOT_TOKEN);
