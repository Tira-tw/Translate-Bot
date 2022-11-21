const { SlashCommandBuilder } = require('discord.js');
const translate = require('@iamtraction/google-translate');
const { EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('detect')
		.setDescription('自動檢測語言')
    .addStringOption(option =>
      option
        .setName('text')
        .setDescription("輸入要翻譯的文子")
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
    const lang1 = interaction.options.get('final_lang').value;

    
    translate(input, { to: `${lang1}`}).then(res => {
        const msgEmbed = new EmbedBuilder()
        .setColor("Random")
        .setTitle('**Translator Bot**')
        .addFields(
            { name: '用戶輸入: ', value: `${input}` },
            { name: '翻譯語言: ', value: `${lang1}`},
            { name: '最終翻譯: ', value:`${res.text}` }
        )
        .setTimestamp()

    interaction.reply({ embeds: [msgEmbed]});
    
    }).catch(err => {
        console.error(err);
    })
	},
};

