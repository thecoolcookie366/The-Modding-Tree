let modInfo = {
	name: "The Cookie Tree",
	author: "thecoolcookie366",
	pointsName: "cookies",
	modFiles: ["layers.js", "tree.js"],

	discordName: "The Cookie Tree Discord",
	discordLink: "https://discord.gg/DZZ4kwG7",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 24,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.13",
	name: "Specialties",
}

let changelog = `<h1>Changelog:</h1><br>
	<br>
	<h3>Changelog Guide: vA.BC </h3><br>
	A = insane update that adds so many features <br>
	B = big update that adds a new layer <br>
	C = small update that adds a new upgrade <br>
	<br>

	<h1>v1.00</h1><br>
		<h3>WARNING: THIS LIST WILL BE UPDATED OVER TIME AS 1.00 IS NOT DONE YET.</h3> <br>
		- Balancing - fixed a bunch of things and prevented inflation (maybe) <br>
		- Layers - added so many layers you'll never get bored! <br>
		- Infoboxes - only necessarily for Loops but sure? <br>
		- Achievements - do things for absolutely nothing! <br>
		<br>
	<h3>v0.13</h3><br>
		- Buyables - found in VC, repeatedly buy to get boosts. <br>
		<br>
	<h3>v0.12</h3><br>
		- Singularity - the end is here. <br>
		<br>
	<h3>v0.11</h3><br>
		- Vanilla Cookies - nobody likes these! unless it's The Cookie Tree. <br>
		<br>
	<h2>v0.10</h2><br>
		- Orange - is it an entire rainbow? <br>
		<br>
	<h3>v0.06</h3><br>
		- fr - the layer of all time <br>
		<br>
	<h3>v0.05</h3><br>
		- Points? - wait, these aren't the points i remember... <br>
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
	<h3>v0.01</h3><br>
		- Red Layer - boosts that are very powerful. <br>
		<br>
	<h1>v0.00</h1><br>
		- Chocolate Cookies Layer - what makes cookies duplicate. <br>
		<br>
	-v0.01<br>
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
	if (hasUpgrade('cc', 23)) gain = gain.times("1e1000000000")
	if (hasUpgrade('cc', 13)) gain = gain.times(upgradeEffect('cc', 13))
	if (hasUpgrade('cc', 21)) gain = gain.times(upgradeEffect('cc', 21))
	if (hasUpgrade('dcc', 21)) gain = gain.times(upgradeEffect('dcc', 21))
	if (hasUpgrade('vc', 12)) gain = gain.times(upgradeEffect('vc', 12))
	if (hasUpgrade('r', 11)) gain = gain.times(8)
	if (hasUpgrade('o', 11)) gain = gain.times(6)
	if (hasUpgrade('o', 12)) gain = gain.times(2.14)
	if (hasUpgrade('y', 11)) gain = gain.times(4)
	if (hasUpgrade('y', 12)) gain = gain.times(1.314)
	if (hasUpgrade('g', 11)) gain = gain.times(3)
	if (hasUpgrade('g', 12)) gain = gain.times(1.5)
	if (hasUpgrade('g', 13)) gain = gain.times(1.25)
	if (hasUpgrade('b', 11)) gain = gain.times(2)
	if (hasUpgrade('b', 12)) gain = gain.times(1.25)
	if (hasUpgrade('b', 13)) gain = gain.times(1.1)
	if (hasUpgrade('dcc', 11)) gain = gain.times(3.5)
	if (hasUpgrade('vc', 11)) gain = gain.times(2.5)
	if (hasUpgrade('dcc', 12)) gain = gain.times(3)
	if (hasUpgrade('l', 11)) gain = gain.times(1e33)
	if (hasUpgrade('l', 21)) gain = gain.times(1e33)
	if (hasUpgrade('l', 31)) gain = gain.times(1e33)
	if (hasUpgrade('l', 41)) gain = gain.times(1e33)
	if (hasUpgrade('ml', 11)) gain = gain.times(1e63)
	if (hasUpgrade('ml', 21)) gain = gain.times(1e63)
	if (hasUpgrade('ml', 31)) gain = gain.times(1e63)
	if (hasUpgrade('ml', 41)) gain = gain.times(1e63)
	if (hasUpgrade('p', 11)) gain = gain.times(1.99999)
	if (hasUpgrade('pr', 11)) gain = gain.times(2.454545454545)
	if (hasUpgrade('ap', 11)) gain = gain.times(1e9)	
	if (hasUpgrade('tp', 11)) gain = gain.times(1e16)
	if (hasUpgrade('rp', 11)) gain = gain.times(1e69)	
	if (hasUpgrade('fr', 11)) gain = gain.times(1e150)	
	if (hasUpgrade('fr', 12)) gain = gain.times("1e1.79601e308")	
	if (hasUpgrade('sin', 11)) gain = gain.times("1e1e1e1e1e3")
	if (hasUpgrade('sin', 12)) gain = gain.times("1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1")
	if (player.points.gte("1e1.796e308")) gain = new Decimal(0)
	gain = softcap(gain, times(0.0000000001))
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	function() {if (player.points.gt(-1)) return "<h3>Endgame: ??? cookies as of v0.13.</h3>"},
	function() {if (player.points.gte("1.796e308")) return "<h2>[INFINITY] You have reached infinity. Cookies will be reduced by ^0.5 [hardcap for now], but you can reset for Infinity Cookies to push further. </h2>"},
	function() {if (player.points.gte("1e1.796e308")) return "<h1>[ETERNITY] You have reached eternity. Cookies are now hardcapped, but you can reset for Eternity Cookies to break the limits. </h1>"},
	function() {if (inChallenge("dcc", 11)) return "You are trying to get to <h3>1e9 cookies</h3> for <h2>absolutely nothing.</h2>"},
	function() {if (inChallenge("dcc", 12)) return "Don't bother getting <h3>e5e23 cookies,</h3> you will get <h2>absolutely nothing.</h2>"},
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