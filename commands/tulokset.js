const { SlashCommandBuilder } = require("discord.js");
const { readCSVtoObj } = require("../utils/csvHandler");
const { createCanvas } = require("canvas");
const { Chart, registerables } = require("chart.js");
Chart.register(...registerables);

module.exports = {
	data: new SlashCommandBuilder()
		.setName("tulokset")
		.setDescription("Palauttaa henkilökohtaiset tulokset")
		.addUserOption(option =>
			option.setName("nimi")
				.setRequired(true)
				.setDescription("Kenen tiedot"))
		.addBooleanOption(option => 
			option.setName("tausta")
			.setRequired(false)
			.setDescription("false niin ilman taustaa (läpinäkyvä) tai true niin mustavalkoinen")
		),
	async execute(interaction) {
		const nimi = interaction.options.getUser("nimi").username;
		const tausta = interaction.options.getBoolean("tausta");

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
			const plugin = { //background-color
				id: "bgcolor",
				beforeDraw: (chart, args, options) => {
				  if(tausta) {
					const { ctx } = chart;
					ctx.save();
					ctx.globalCompositeOperation = "destination-over";
					ctx.fillStyle = "#fffdfa";
					ctx.fillRect(0, 0, chart.width, chart.height);
					ctx.restore();
				  }
				},
			};
			new Chart(ctx, {
				type: "line",
				data: {
					labels: chartData.map(data => (data.aika)),
					datasets: [{
						label: "Inttimielentila",
						data: chartData.map(data => data.arvio),
						borderWidth: 1,
						borderColor: tausta ? "#474747" : "#00fbff",
						backgroundColor: tausta ? "#000000": "#2f9fa3",
					}]
				},
				options: {
					legend: { display: false },
					scales: {
						y: { min: 0, max: 10 },
					}
				},
				plugins: [plugin]
			});
			interaction.reply({ files: [{ attachment: canvas.toBuffer() }]});
		}
	}
};