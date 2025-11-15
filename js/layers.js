addLayer("cc", {
    name: "chocolatecookies", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "CC", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#745c0dff",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "chocolate cookies", // Name of prestige currency
    baseResource: "cookies", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('cc', 14)) mult = mult.times(upgradeEffect('cc', 14))
        return mult

    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    upgrades: {
        11: {
            title: "[#1cc] Cookie Duplication",
            description: "Your first upgrade. Get x2 cookies.",
            cost: new Decimal(1),
        },

        12: {
            title: "[#2cc] Strong Cookie Duplication",
            description: "Cookie gain go big. x3 cookies!",
            cost: new Decimal(5),
        },

        13: {
            title: "[#3cc] Chocolate!",
            description: "Boost cookies based on chocolate cookies.",
            cost: new Decimal(15),
                effect() {
        return player[this.layer].points.add(1).pow(0.5)
    },
    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },

        14: {
            title: "[#4cc] Back and Forth",
            description: "Boost chocolate cookies based on cookies.",
            cost: new Decimal(1e3),
                effect() {
        return player.points.add(1).pow(0.15)
    },
    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "c", description: "C: Reset for chocolate cookies", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}

    
})

addLayer("dcc", {
    name: "darkchocolatecookies", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "DCC", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#745c0dff",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "dark chocolate cookies", // Name of prestige currency
    baseResource: "chocolate cookies", // Name of resource prestige is based on
    baseAmount() {return player.cc.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult

    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    upgrades: {
        11: {
            title: "[#1dcc] Darker Than the Last",
            description: "does nothing yet",
            cost: new Decimal(1.79e308),
        },
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "c", description: "C: Reset for chocolate cookies", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}

    
})

addLayer("r", {
    name: "red", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "R", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#ff0000ff",
    requires: new Decimal(1e6), // Can be a function that takes requirement increases into account
    resource: "red", // Name of prestige currency
    baseResource: "cookies", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.01, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult

    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    upgrades: {
        11: {
            title: "[#1r] WHY IS IT RED",
            description: "Uh... okay? x5 cookies.",
            cost: new Decimal(1),
        },
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "r", description: "R: Reset for red", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}

    
})