addLayer("agut", {
    name: "agenericupgtree", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "AP", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#ffffff",
    requires: new Decimal(0.00001), // Can be a function that takes requirement increases into account
    resource: "alternate points", // Name of prestige currency
    baseResource: "cookies", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.25, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('agut', 41)) mult = mult.times(upgradeEffect('agut', 41))
        return mult

    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal (1)
        if (hasUpgrade('agut', 41)) exp = exp.times(upgradeEffect('agut', 41))
        return exp
    },
    infoboxes:{
            coolInfo: {
                title: "A generic upgrade tree (Alternate Points)",
                titleStyle: {'color': '#c6c6c6'},
                body: "Reset on all resets, only use for a boost.",
                bodyStyle: {'background-color': "#828282"}
            }
        },
    branches:['fr'],
    upgrades: {
        11: {
            title: "[#1] Start genera- wait what",
            description: "+1 cookie per second. Aren't we doing this already?",
            cost: new Decimal(1),
        },

        21: {
            title: "[#2-1] This is just 2cc but insanely op",
            description: "x3 cookies. The next feature is interesting...",
            cost: new Decimal(5),
        },

        22: {
            title: "[#2-2] This is just 2cc but insanely op 2",
            description: "x3 cookies again. The next feature is interesting...",
            cost: new Decimal(25),
        },

        23: {
            title: "[#2-3] This is just 2cc but insanely op 3",
            description: "x3 cookies again again. The next feature is interesting...",
            cost: new Decimal(125),
        },

        24: {
            title: "[#2-4] This is just 2cc but insanely op 4",
            description: "x3 cookies again again again. The next feature is interesting...",
            cost: new Decimal(625),
        },

        25: {
            title: "[#2-5] This is just 2cc but insanely op 5",
            description: "x3 cookies again<sup>2</sup>. The next feature is interesting...",
            cost: new Decimal(3125),
        },

        31: {
            title: "[#3] Interesting",
            description: "x5 cookies and /3 cookies. Now wait for upgrade 4!",
            cost: new Decimal(1600),
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
    branches:['agut'],
    upgrades: {
        11: {
            title: "[E1] Yes this layer is bad",
            description: "Boost cookies based on alternate points.",
            cost: new Decimal(5),
            effect() {
        return player.agut.points.add(1).pow(2.22)
    },
    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return (hasUpgrade('agut', 41))}

    
})

// A side layer with achievements, with no prestige
addLayer("oa", {
    symbol: "OA",
    position: 0,
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
    }},
    color: "#ffffffff",
    resource: "overall achievement power", 
    row: "side",
    tooltip() { // Optional, tooltip displays when the layer is locked
        return ("Overall Achievements")
    },
    achievementPopups: true,
    achievements: {
        11: {
            name: "Midgame's Timewall",
            done() {return player.points.gte("1e10")},
            goalTooltip: "Get ready for this part of the game...", // Shows when achievement is not completed
            doneTooltip: "Welcome to midgame. Good luck on this part! It won't be easy.", // Showed when the achievement is completed
        },

        12: {
            name: "The Cookie Tree: Endgame",
            done() {return player.points.gte("1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1")},
            goalTooltip: "Reach the endgame, showed at the top of the screen.", // Shows when achievement is not completed
            doneTooltip: "You did it! You completed The Cookie Tree! Well, you could continue with loops...", // Showed when the achievement is completed
        },
    },
})