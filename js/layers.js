addLayer("cc", {
    name: "chocolatecookies", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "CC", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
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
    color: "#43360aff",
    requires: new Decimal(250000000), // Can be a function that takes requirement increases into account
    resource: "dark chocolate cookies", // Name of prestige currency
    baseResource: "cookies", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.05, // Prestige currency exponent
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
            description: "x5 cookies.",
            cost: new Decimal(1),
        },
    },
    challenges: {
        11: {
            name: "[#1a] Regrind",
            challengeDescription: "Welcome to your first challenge! Performs a Row 0 reset.",
            goalDescription: "Reach 1e9 cookies.",
            rewardDescription: "x1 cookies",
            canComplete: function() {return player.points.gte(1e9)},
        },
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "d", description: "D: Reset for dark chocolate cookies", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
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
            description: "Uh... okay? x22.222 cookies.",
            cost: new Decimal(1),
        },
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "r", description: "R: Reset for red", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}

    
})

addLayer("l", {
    name: "loops", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "L", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#1258c9ff",
    requires: new Decimal(1.79e308), // Can be a function that takes requirement increases into account
    resource: "loops", // Name of prestige currency
    baseResource: "cookies", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.000001, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult

    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    upgrades: {
        11: {
            title: "[ Loop ]",
            description: "x1e33 cookies.",
            cost: new Decimal(1),
        },

        12: {
            title: "[ Loop ]",
            description: "x1e33 cookies.",
            cost: new Decimal(1),
        },

        13: {
            title: "[ Loop ]",
            description: "x1e33 cookies.",
            cost: new Decimal(1),
        },

        14: {
            title: "[ Loop ]",
            description: "x1e33 cookies.",
            cost: new Decimal(1),
        },

        21: {
            title: "[ Loop ]",
            description: "x1e33 cookies.",
            cost: new Decimal(1),
        },

        22: {
            title: "[ Loop ]",
            description: "x1e33 cookies.",
            cost: new Decimal(1),
        },

        23: {
            title: "[ Loop ]",
            description: "x1e33 cookies.",
            cost: new Decimal(1),
        },

        31: {
            title: "[ Loop ]",
            description: "x1e33 cookies.",
            cost: new Decimal(1),
        },

        32: {
            title: "[ Loop ]",
            description: "x1e33 cookies.",
            cost: new Decimal(1),
        },

        41: {
            title: "[ Loop ]",
            description: "x1e33 cookies.",
            cost: new Decimal(1),
        },
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true}

    
})

addLayer("ml", {
    name: "megaloops", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "ML", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#3dc912ff",
    requires: new Decimal(1.79e308), // Can be a function that takes requirement increases into account
    resource: "mega loops", // Name of prestige currency
    baseResource: "loops", // Name of resource prestige is based on
    baseAmount() {return player.l.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.000000001, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult

    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    upgrades: {
        11: {
            title: "[ Mega Loop ]",
            description: "x1e63 cookies.",
            cost: new Decimal(1),
        },

        12: {
            title: "[ Mega Loop ]",
            description: "x1e63 cookies.",
            cost: new Decimal(1),
        },

        13: {
            title: "[ Mega Loop ]",
            description: "x1e63 cookies.",
            cost: new Decimal(1),
        },

        14: {
            title: "[ Mega Loop ]",
            description: "x1e63 cookies.",
            cost: new Decimal(1),
        },

        21: {
            title: "[ Mega Loop ]",
            description: "x1e63 cookies.",
            cost: new Decimal(1),
        },

        22: {
            title: "[ Mega Loop ]",
            description: "x1e63 cookies.",
            cost: new Decimal(1),
        },

        23: {
            title: "[ Mega Loop ]",
            description: "x1e63 cookies.",
            cost: new Decimal(1),
        },

        31: {
            title: "[ Mega Loop ]",
            description: "x1e63 cookies.",
            cost: new Decimal(1),
        },

        32: {
            title: "[ Mega Loop ]",
            description: "x1e63 cookies.",
            cost: new Decimal(1),
        },

        41: {
            title: "[ Mega Loop ]",
            description: "x1e63 cookies.",
            cost: new Decimal(1),
        },
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true}

    
})