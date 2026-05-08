addLayer("p", {
    name: "points", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#ffffff",
    requires: new Decimal(5), // Can be a function that takes requirement increases into account
    resource: "points", // Name of prestige currency
    baseResource: "spacetime", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('p', 41)) mult = mult.times(upgradeEffect('p', 41))
        return mult

    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal (1)
        if (hasUpgrade('p', 41)) exp = exp.times(upgradeEffect('p', 41))
        return exp
    },
    infoboxes:{
            coolInfo: {
                title: "Points (Universe 1, Part 1/2)",
                titleStyle: {'color': '#8d8d8d'},
                body: "<b>Welcome to the first layer!</b> <br> Spacetime is your universal currency, which can be used for many things. <br> <i>Pro tip: Use the enter key to spam Points resets. (sorry mobile users)</i>",
                bodyStyle: {'background-color': "#313131"}
            }
        },
    branches:['en'],
    upgrades: {
        11: {
            title: "[#1] Start",
            description: "+1 spacetime per second.",
            cost: new Decimal(1),
        },

        21: {
            title: "[#2 1/5] Up! (about 100m)",
            description: "x3 spacetime.",
            cost: new Decimal(5),
        },

        22: {
            title: "[#2 2/5] Up! (about 10km)",
            description: "x3 spacetime again.",
            cost: new Decimal(25),
        },

        23: {
            title: "[#2 3/5] Up! (about 1 light year)",
            description: "x3 spacetime again again.",
            cost: new Decimal(75),
        },

        24: {
            title: "[#2 4/5] Up! (5 hours or so)",
            description: "x3 spacetime again again again.",
            cost: new Decimal(225),
        },

        25: {
            title: "[#2 5/5] Up! (okay let's go onto something new)",
            description: "x3 spacetime again<sup>2</sup>.",
            cost: new Decimal(600),
        },

        31: {
            title: "[#3] Hmm...",
            description: "x5 spacetime but /3 spacetime.",
            cost: new Decimal(2000),
        },

        41: {
            title: "[#4] Energized",
            description: "Unlock energy!!! Energy boosts alternate points.",
            cost: new Decimal(35000),
            effect() {
        return player.en.points.add(1).pow(1.42)
    },
    effectDisplay() { return "^"+format(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
        },

    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true}

    
})

addLayer("en", {
    name: "energy", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "EN", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#eaff00",
    requires: new Decimal(1e9), // Can be a function that takes requirement increases into account
    resource: "energy", // Name of prestige currency
    baseResource: "cookies", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult

    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    infoboxes:{
            coolInfo: {
                title: "A generic upgrade tree (Energy)",
                titleStyle: {'color': '#8f9c00'},
                body: "Reset on all resets, only use for a boost. The thing that powers other things.",
                bodyStyle: {'background-color': "#9ba900"}
            }
        },
    branches:['p'],
    upgrades: {
        11: {
            title: "[E1] Yes this layer is bad",
            description: "Boost cookies based on alternate points.",
            cost: new Decimal(5),
            effect() {
        return player.p.points.add(1).pow(2.22)
    },
    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return (hasUpgrade('p', 41))}

    
})

// A side layer with achievements, with no prestige
addLayer("a", {
    symbol: "A",
    position: 0,
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
    }},
    color: "rgb(253, 0, 0)",
    resource: "unobtainium", 
    row: "side",
    tooltip() { // Optional, tooltip displays when the layer is locked
        return ("Achievements")
    },
    achievementPopups: true,
    achievements: {
        11: {
            name: "Where have I seen this before?",
            done() {return player.points.gte("1e10")},
            tooltip: "Unlock Electricity. (upgrade #4)",
        },
    },
})