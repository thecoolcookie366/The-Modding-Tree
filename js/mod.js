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
	num: "0.02",
	name: "They're Dark!",
}

let changelog = `<h1>Changelog:</h1><br>
	<br>
	<h3>v0.02</h3><br>
		- Dark Chocolate Cookies Layer - better than before. <br>
		<br>
	<h3>v0.01c</h3><br>
		- Red Layer - now with 1 upgrade. <br>
		<br>
	<h3>v0.01b</h3><br>
		- Chocolate Cookies Layer - includes 4 upgrades. <br>
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
	return player.points.gte(new Decimal("e33"))
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