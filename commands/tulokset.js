const { SlashCommandBuilder } = require("discord.js");
const { readCSVtoObj } = require("../utils/csvHandler");
const { createCanvas } = require("canvas");
const { Chart, registerables } = require("chart.js");
Chart.register(...registerables);

module.exports = {
	data: new SlashCommandBuilder()
		.setName("tulokset")
		.setDescription("Palauttaa henkilökohtaiset tulokset kuukauden ajalta")
		.addUserOption(option =>
			option.setName("nimi")
				.setRequired(true)
				.setDescription("Kenen tiedot")),
	async execute(interaction) {
		const nimi = interaction.options._hoistedOptions[0].user.username;

		const chartData = [];

		for (let row of readCSVtoObj()) {
			if (row.Nimi == nimi) {
				chartData.push({ aika: row.Aika, arvio: row.Arvio });
			}
		}
		if (chartData.length === 0) {
			interaction.reply("Käyttäjällä ei ole kirjauksia 😜");
		}
		else {
			chartData.sort(function (a, b) {
				return a.aika.localeCompare(b.aika);
			});

			const canvas = createCanvas(1000, 400);
			const ctx = canvas.getContext("2d");

			new Chart(ctx, {
				type: "line",
				data: {
					labels: chartData.map(data => (data.aika)),
					datasets: [{
						label: "Inttimielentila",
						data: chartData.map(data => data.arvio),
						borderWidth: 1,
						borderColor: "#00fbff",
						backgroundColor: "#2f9fa3",
					}]
				},
				options: {
					legend: { display: false },
					scales: {
						y: { min: 0, max: 10 },
					}
				}
			});
			interaction.reply({ files: [{ attachment: canvas.toBuffer() }]});
		}
	}
};