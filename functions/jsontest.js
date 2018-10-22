const api = "https://jsonplaceholder.typicode.com/posts";
const snekfetch = require("snekfetch");

module.exports.run = async (bot, message, args) => {
	snekfetch.get(api).then(r => console.log(r));
}

module.exports.help = {
	name: "json"
}