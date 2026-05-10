let modInfo = {
	name: "The Cookie Tree",
	author: "thecoolcookie366",
	pointsName: "spacetime",
	modFiles: ["layers.js", "tree.js"],

	discordName: "Also play Celestial Incremental NG+!",
	discordLink: "https://raw.githack.com/thecoolcookie366/celestial_incremental_ng/master/index.html",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 24,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "1.00",
	name: "Drawing's Revamp",
}

let changelog = `<h1>Changelog:</h1><br>
	<br>
	<h3>Changelog Guide: vA.BC </h3><br>
	A = insane update that adds so many features <br>
	B = big update that adds a new layer <br>
	C = small update that adds a new upgrade <br>
	<br>

	<h3>pre-v1.01</h3><br>
		- Added a new temp layer.<br>
		- This new layer will let you reach 1e1,000 spacetime! <br>
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
	if (hasUpgrade('e', 11)) gain = gain.times(1000)
	if (hasUpgrade('e', 21)) gain = gain.times(1000000)
	if (hasUpgrade('s', 11)) gain = gain.times(5e6)
	if (hasUpgrade('p', 61)) gain = gain.times(1e100)
	if (hasUpgrade('e', 31)) gain = gain.times(6.66e66)
	if (hasUpgrade('u', 11)) gain = gain.times(1e12)
	if (hasUpgrade('pie', 11)) gain = gain.times(2)
	if (hasUpgrade('pie', 21)) gain = gain.times(5)
	if (hasUpgrade('pie', 31)) gain = gain.times(20)
	if (hasUpgrade('meta', 11)) gain = gain.times(10)
	if (hasUpgrade('s', 21)) gain = gain.pow(5)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	function() {if (player.points.gt(-1)) return "<h3>Reach 1e990 spacetime to win!</h3>"},
	function() {if (player.points.gt(-1)) return "<h3>To get 1e1,000 spacetime, use the temp layer!</h3>"},
	function() {if (player.points.gt(-1)) return "<i>If you played in v0.13, you probably have old save data and should hard reset.</i>"},
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("1e990"))
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