const { SlashCommandBuilder } = require('discord.js');
const translate = require('@iamtraction/google-translate');
const { EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('translate')
		.setDescription('翻譯您的文字！')
    .addStringOption(option =>
      option
        .setName('text')
        .setDescription("輸入要翻譯的文子")
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('og_lang')
        .setDescription("原始語言")
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('final_lang')
        .setDescription("要翻譯成的語言")
        .setRequired(true)
    ),
	async execute(interaction) {
    const input = interaction.options.get('text').value;
    const lang1 = interaction.options.get('og_lang').value;
    const lang2 = interaction.options.get('final_lang').value;

    
    translate(input, { from: `${lang1}`, to: `${lang2}` }).then(res => {
      const msgEmbed = new EmbedBuilder()
        .setColor("Random")
        .setTitle('**Translator Bot**')
        //.setURL('https://discord.js.org/')
        //.setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
        //.setDescription('Some description here')
        //.setThumbnail('https://i.imgur.com/AfFp7pu.png')
        .addFields(
          { name: '用戶輸入: ', value: `${input}` },
          { name: '原始語言: ', value: `${lang1}`, inline: true },
          { name: '最終語言: ', value: `${lang2}`, inline: true },
          { name: '翻譯文字: ', value: `${res.text}`, inline: false },
        )
        //.addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
        //.setImage('https://i.imgur.com/AfFp7pu.png')
        .setTimestamp()
        //.setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

      interaction.reply({ embeds: [msgEmbed] });
    }).catch(err => {
      console.error(err);
    });

    





      
	},
};

