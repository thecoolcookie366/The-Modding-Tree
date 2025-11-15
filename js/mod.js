let modInfo = {
	name: "The Cookie Tree",
	author: "thecoolcookie366",
	pointsName: "cookies",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 24,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.05",
	name: "Outside the Cookie Tree",
}

let changelog = `<h1>Changelog:</h1><br>
	<br>
	,h3>v0.05</h3><br>
		- Points- wait, these aren't the points i remember... <br>
		<br>
	<h3>v0.04</h3><br>
		- Loops - reset everything and get big boosts! <br>
		<br>
	<h3>v0.03</h3><br>
		- Challenges - found in DCC, get boosts and stuff. <br>
		<br>
	<h3>v0.02</h3><br>
		- Dark Chocolate Cookies Layer - better than before. <br>
		<br>
	<h3>v0.01c</h3><br>
		- Red Layer - boosts that are very powerful. <br>
		<br>
	<h3>v0.01b</h3><br>
		- Chocolate Cookies Layer - what makes cookies duplicate. <br>
		<br>
	<h3>v0.01a</h3><br>
		- Release - this is where everything starts.`

let winText = `Congrats! The universe is now filled with cookies.`

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
	if (hasUpgrade('cc', 11)) gain = gain.times(2)
	if (hasUpgrade('cc', 12)) gain = gain.times(3)
	if (hasUpgrade('cc', 13)) gain = gain.times(upgradeEffect('cc', 13))
	if (hasUpgrade('r', 11)) gain = gain.times(22.222)
	if (hasUpgrade('dcc', 11)) gain = gain.times(5)
	if (hasUpgrade('l', 11)) gain = gain.times(1e33)
	if (hasUpgrade('l', 12)) gain = gain.times(1e33)
	if (hasUpgrade('l', 13)) gain = gain.times(1e33)
	if (hasUpgrade('l', 14)) gain = gain.times(1e33)
	if (hasUpgrade('l', 21)) gain = gain.times(1e33)
	if (hasUpgrade('l', 22)) gain = gain.times(1e33)
	if (hasUpgrade('l', 23)) gain = gain.times(1e33)
	if (hasUpgrade('l', 31)) gain = gain.times(1e33)
	if (hasUpgrade('l', 32)) gain = gain.times(1e33)
	if (hasUpgrade('l', 41)) gain = gain.times(1e33)
	if (hasUpgrade('ml', 11)) gain = gain.times(1e63)
	if (hasUpgrade('ml', 12)) gain = gain.times(1e63)
	if (hasUpgrade('ml', 13)) gain = gain.times(1e63)
	if (hasUpgrade('ml', 14)) gain = gain.times(1e63)
	if (hasUpgrade('ml', 21)) gain = gain.times(1e63)
	if (hasUpgrade('ml', 22)) gain = gain.times(1e63)
	if (hasUpgrade('ml', 23)) gain = gain.times(1e63)
	if (hasUpgrade('ml', 31)) gain = gain.times(1e63)
	if (hasUpgrade('ml', 32)) gain = gain.times(1e63)
	if (hasUpgrade('ml', 41)) gain = gain.times(1e63)
	if (hasUpgrade('p', 11)) gain = gain.times(0.001)	
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("1e1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"))
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