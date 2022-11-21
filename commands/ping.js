const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('查看延遲'),
	async execute(interaction) {
		await interaction.reply(`延遲 :\n${Math.abs(Date.now() - interaction.createdTimestamp)}ms`);
	},
};

