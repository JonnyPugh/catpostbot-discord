const Discord = require('discord.js');
const axios = require('axios');

const sendCats = async (message, numCats) => {
  const catImages = (await axios.get(`https://api.thecatapi.com/v1/images/search?limit=${numCats}`)).data;
  for (const catImage of catImages) {
    message.channel.send(new Discord.Attachment(catImage.url));
  }
}

const client = new Discord.Client();

client.on('message', message => {
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
