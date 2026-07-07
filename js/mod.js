let modInfo = {
	name: "The Cookie Tree",
	author: "thecoolcookie366",
	pointsName: "spacetime",
	modFiles: ["layers.js", "tree.js"],

	discordName: "Cookie's Creations Server",
	discordLink: "https://discord.gg/aUbDYX5Z3a",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 24,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "1.005",
	name: "Small Yet Big Update",
}

let changelog = `<h1>Changelog:</h1><br>
	<br>
	<h3>Changelog Guide: vA.BC </h3><br>
	A = big update <br>
	B = medium update <br>
	C = small update <br>
	<br>

	<h2>v1.005</h2><br>
		- Added Meta. Expect really big numbers from it!<br>
		- Added a Hardcaps layer. <br>
		- The new 1e1,000,000,000 super cap! Prevents points from going insane because of the new exp upgrade. <br>
		- Added something <i>even more meta than meta...?</i><br>
		- Universe 4! This new universe will let you touch grass (literally, the currency <i>is</i> grass). Automation included!<br>
		- <i>balancing</i><br>
		<br>
	<h3>v1.003</h3><br>
		- Added a new temp layer.<br>
		- Added Universe 0? <br>
		<br>
	<h1>v1.00</h1><br>
		- Revamped the game.<br>
		<br>`

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
	if (hasUpgrade('p', 31)) gain = gain.times(2)
	if (hasUpgrade('p', 71)) gain = gain.times(1.11e111)
	if (hasUpgrade('p', 72)) gain = gain.times(2.22e222)
	if (hasUpgrade('e', 11)) gain = gain.times(120)
	if (hasUpgrade('e', 21)) gain = gain.times(1000000)
	if (hasUpgrade('s', 11)) gain = gain.times(50000)
	if (hasUpgrade('s', 21)) gain = gain.times(500000)
	if (hasUpgrade('p', 61)) gain = gain.times(100)
	if (hasUpgrade('e', 31)) gain = gain.times(6.66e66)
	if (hasUpgrade('u', 11)) gain = gain.times(1e12)
	if (hasUpgrade('pie', 11)) gain = gain.times(2)
	if (hasUpgrade('pie', 21)) gain = gain.times(5)
	if (hasUpgrade('pie', 31)) gain = gain.times(20)
	if (hasUpgrade('meta', 11)) gain = gain.times(10)
	if (hasUpgrade('inf', 21)) gain = gain.times(upgradeEffect('inf', 21))
	
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	function() {if (player.points.gt(-1)) return "<h3>Reach 1e4,380 spacetime to win!</h3>"},
	function() {if (player.points.gt(-1)) return "<h3>True endgame: 1e4,400 spacetime</h3>"},
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("1e4380"))
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