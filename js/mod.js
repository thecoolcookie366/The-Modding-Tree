let modInfo = {
	name: "The Cookie Tree",
	author: "thecoolcookie366",
	pointsName: "spacetime",
	modFiles: ["layers.js", "tree.js"],

	discordName: "The Cookie Tree Discord",
	discordLink: "https://discord.gg/DZZ4kwG7",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 24,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "1.00",
	name: "Drawed Revamp",
}

let changelog = `<h1>Changelog:</h1><br>
	<br>
	<h3>Changelog Guide: vA.BC </h3><br>
	A = insane update that adds so many features <br>
	B = big update that adds a new layer <br>
	C = small update that adds a new upgrade <br>
	<br>

	<h1>v1.00</h1><br>
		- Revamped the game.`

let winText = `<i>But this spacetime isn't real, right?</i>`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	if (hasUpgrade('p', 11)) gain = gain.add(1)
	if (hasUpgrade('p', 21)) gain = gain.times(3)
	if (hasUpgrade('p', 22)) gain = gain.times(3)
	if (hasUpgrade('p', 23)) gain = gain.times(3)
	if (hasUpgrade('p', 24)) gain = gain.times(3)
	if (hasUpgrade('p', 25)) gain = gain.times(3)
	if (hasUpgrade('p', 31)) gain = gain.times(1.666666666)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	function() {if (player.points.gt(-1)) return "<h3>Reach some amount of spacetime to win.</h3>"},
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}