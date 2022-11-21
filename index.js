// Require the necessary discord.js classes
const { Client, Collection, GatewayIntentBits, Events, ActivityType } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
require('dotenv').config();

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
client.commands = new Collection();

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[警告] 指令位於 ${filePath} 缺少必需的“數據”或“執行”屬性。`);
	}
}

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`已登入 ${c.user.tag}`);
	
});

client.on(Events.ClientReady, () => {
	console.log("已上線");

	const activities = [
		`已在${client.guilds.cache.size}個伺服器`,
		'簡單的翻譯Bot',
		'含有斜線指令~',
		'owo'
	]

	setInterval(() => {
		const status = activities[Math.floor(Math.random() * activities.length)];
		client.user.setPresence({ activities: [{ name: `${status}`, type: ActivityType.Watching	}], status: 'online', });
	}, 3000);
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`找不到指令 ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: '執行指令時出錯！', ephemeral: true });
	}
});

	
process.on('unhandledRejection', error => {
	console.error('未處理:', error);
});


// Log in to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);
