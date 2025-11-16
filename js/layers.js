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
        if (hasUpgrade('cc', 22)) mult = mult.times(upgradeEffect('cc', 22))
        return mult

    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    branches:['r', 'dcc', 'vc'],
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
        return player[this.layer].points.add(1).pow(0.3)
    },
    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },

        14: {
            title: "[#4cc] Back and Forth",
            description: "Boost chocolate cookies based on cookies.",
            cost: new Decimal(125),
                effect() {
        return player.points.add(1).pow(0.125)
    },
    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },

        21: {
            title: "[#5cc] Chocolate++",
            description: "If [#3cc] wasn't enough...",
            cost: new Decimal(32e6),
                effect() {
        return player[this.layer].points.add(1).pow(0.07)
    },
    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },

        22: {
            title: "[#6cc] Cookie Go Up",
            description: "If [#4cc] wasn't enough...",
            cost: new Decimal(7e12),
                effect() {
        return player.points.add(1).pow(0.06)
    },
    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },

        23: {
            title: "[#7cc] Extremely Strong Cookie Duplication",
            description: "Let's bring it back! xe1e9 cookies.",
            cost: new Decimal("5.5555e55555555"),
        },
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
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
    requires: new Decimal(160e3), // Can be a function that takes requirement increases into account
    resource: "dark chocolate cookies", // Name of prestige currency
    baseResource: "cookies", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.3, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult

    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    branches: ['vc', 'o'],
    upgrades: {
        11: {
            title: "[#1dcc] Darker Than the Last",
            description: "x3.5 cookies.",
            cost: new Decimal(1),
        },

        12: {
            title: "[#2dcc] Big Multipliers",
            description: "A x3 cookie boost wouldn't hurt, right?",
            cost: new Decimal(40),
        },

        21: {
            title: "[#3dcc] Yet Another [#3cc] Upgrade",
            description: "Boost cookies based on DCC.",
            cost: new Decimal(300),
                effect() {
        return player.dcc.points.add(1).pow(0.2)
    },
    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
    },
    challenges: {
        11: {
            name: "[#1chal] Regrind",
            challengeDescription: "[WARNING: Challenges are optional and are not required.] Welcome to your first challenge! Performs a Row 1 reset.",
            goalDescription: "Reach 1e9 cookies.",
            rewardDescription: "x1.000 cookies",
            canComplete: function() {return player.points.gte(1e9)},
        },

        12: {
            name: "[#2chal] Explosive",
            challengeDescription: "[WARNING: Challenges are optional and are not required.] The second one! Performs a Row 1 reset.",
            goalDescription: "Reach e5e23 cookies.",
            rewardDescription: "x1.001 cookies",
            canComplete: function() {return player.points.gte("1e5e23")},
        },
    },

    milestones: {
    0: {
        requirementDescription: "[#1mil] 40 Dark Chocolate Cookies (#2dcc)",
        effectDescription: "Try to reset multiple times at a certain amount of DCC.",
        done() { return player.dcc.points.gte(40) }
        },

    1: {
        requirementDescription: "[#2mil] 300 Dark Chocolate Cookies (#3dcc)",
        effectDescription: "Might be powerful, who knows?",
        done() { return player.dcc.points.gte(300) }
        },    
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true}

    
})

addLayer("vc", {
    name: "vanillacookies", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "VC", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#a49e87ff",
    requires: new Decimal(6e6), // Can be a function that takes requirement increases into account
    resource: "vanilla cookies", // Name of prestige currency
    baseResource: "cookies", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.25, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult

    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    branches: ['y'],
    upgrades: {
        11: {
            title: "[#1vc] Not Good!",
            description: "x2.5 cookies. Did you know? Cookie go big very fast.",
            cost: new Decimal(1),
        },

        12: {
            title: "[#2vc] Heavily Nerfed Self Boosting",
            description: "Boost cookies based on... themselfs? What?",
            cost: new Decimal(500),
                effect() {
        return player.points.add(1).pow(0.009)
    },
    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
    },
    buyables: {
        11: {
            title: "Special Cookies",
            cost(x) { return new Decimal("0").mul(x) },
            display() { return "Get a Special Cookie (why do you need this anyway)" },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                },
        },
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
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
    requires: new Decimal(5e3), // Can be a function that takes requirement increases into account
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
    branches: ['o'],
    upgrades: {
        11: {
            title: "[#1r] WHY IS IT RED",
            description: "Uh... okay? x8 cookies.",
            cost: new Decimal(1),
        },
    },
    row: 3, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true}

    
})

addLayer("o", {
    name: "orange", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "O", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#ff8400ff",
    requires: new Decimal(1.25e6), // Can be a function that takes requirement increases into account
    resource: "orange", // Name of prestige currency
    baseResource: "cookies", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.001, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult

    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    branches: ['y'],
    upgrades: {
        11: {
            title: "[#1o] Colo(u)r",
            description: "It's time to get colo(u)rful. x6 cookies!",
            cost: new Decimal(1),
        },

        12: {
            title: "[#2o] No Inflation Yet",
            description: "Nuh uh, you thought there would be inflation. x2.14 cookies.",
            cost: new Decimal(3),
        },
    },

    row: 3, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true}

    
})

addLayer("y", {
    name: "yellow", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Y", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#eeff00ff",
    requires: new Decimal(5e9), // Can be a function that takes requirement increases into account
    resource: "yellow", // Name of prestige currency
    baseResource: "cookies", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.0001, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult

    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    branches: ['g'],
    upgrades: {
        11: {
            title: "[#1y] Yellow Like a Banana",
            description: "Nice fruit. Wait no wrong topic. Take x4 cookies.",
            cost: new Decimal(1),
        },

        12: {
            title: "[#2y] Seems familliar...",
            description: "Why does it feel like there are digits of pi? x1.314 cookies.",
            cost: new Decimal(2),
        },
    },

    row: 3, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true}

    
})

addLayer("g", {
    name: "green", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "G", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 3, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#15ff00ff",
    requires: new Decimal(6e11), // Can be a function that takes requirement increases into account
    resource: "green", // Name of prestige currency
    baseResource: "cookies", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.00001, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult

    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    branches:['p'],
    upgrades: {
        11: {
            title: "[#1g] What are Fruits?",
            description: "Do you like salad? x2 cookies. I think that's good enough.",
            cost: new Decimal(1),
        },

        12: {
            title: "[#2g] Middle of the Road",
            description: "Green is actually halfway through the color layers. (maybe not) - x1.5 things, wait no i meant <h3>cookies.</h3>",
            cost: new Decimal(1),
        },

        13: {
            title: "[#3g] What are Vegetables?",
            description: "Oh wait, there are green fruits too... Wait wrong topic again. x1.25 cookies.",
            cost: new Decimal(2),
        },
    },

    row: 3, // Row the layer is in on the tree (0 is the first row)
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
    color: "#00fbffff",
    requires: new Decimal(1e303), // Can be a function that takes requirement increases into account
    resource: "loops", // Name of prestige currency
    baseResource: "cookies", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult

    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    infoboxes:{
            coolInfo: {
                title: "Loops",
                titleStyle: {'color': '#13cec8ff'},
                body: "Loops are post-game content, you do not have to grind these!",
                bodyStyle: {'background-color': "#10707eff"}
            }
        },
    branches: ['ml'],
    upgrades: {
        11: {
            title: "[ Loop ]",
            description: "x1e33 cookies.",
            cost: new Decimal(1),
        },

        21: {
            title: "[ Loop ]",
            description: "x1e33 cookies.",
            cost: new Decimal(1),
        },

        31: {
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
    row: 4, // Row the layer is in on the tree (0 is the first row)
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
    color: "#00ffaaff",
    requires: new Decimal("1e1e303"), // Can be a function that takes requirement increases into account
    resource: "mega loops", // Name of prestige currency
    baseResource: "cookies", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult

    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    infoboxes:{
            coolInfo: {
                title: "Mega Loops",
                titleStyle: {'color': '#14e29dff'},
                body: "Mega Loops is post-game content (you should know this already from Loops), you do <h1>not</h1> have to grind these",
                bodyStyle: {'background-color': "#117e5aff"}
            }
        },
    upgrades: {
        11: {
            title: "[ Mega Loop ]",
            description: "x1e63 cookies.",
            cost: new Decimal(1),
        },

        21: {
            title: "[ Mega Loop ]",
            description: "x1e63 cookies.",
            cost: new Decimal(1),
        },

        31: {
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
    row: 4, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true}

    
})

addLayer("p", {
    name: "points", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P?", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#5f5f5fff",
    requires: new Decimal(4e10), // Can be a function that takes requirement increases into account
    resource: "points?", // Name of prestige currency
    baseResource: "cookies", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 2.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult

    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    branches: ['pr','ap','tp','rp','vc'],
    upgrades: {
        11: {
            title: "[#1p] What?",
            description: "You are outside of the cookie tree. Things are weird outside it. x1.99999 cookies.",
            cost: new Decimal(1.5e3),
        },
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true}

    
})

addLayer("pr", {
    name: "prestigepoints", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "PR?", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#4a7b91ff",
    requires: new Decimal(1e25), // Can be a function that takes requirement increases into account
    resource: "prestige points?", // Name of prestige currency
    baseResource: "cookies", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult

    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    upgrades: {
        11: {
            title: "[#1pr] This is weird.",
            description: "Stop going this path. x50 cookies.",
            cost: new Decimal(1),
        },
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true}

    
})

addLayer("ap", {
    name: "ascensionpoints", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "AP?", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#828f35ff",
    requires: new Decimal(1e50), // Can be a function that takes requirement increases into account
    resource: "ascension points?", // Name of prestige currency
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
            title: "[#1ap] Don't go further!",
            description: "You wouldn't want to see what's coming. x1e9 cookies.",
            cost: new Decimal(1),
        },
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true}

    
})

addLayer("tp", {
    name: "transcensionpoints", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "TP?", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 3, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#9b1c1cff",
    requires: new Decimal(1e100), // Can be a function that takes requirement increases into account
    resource: "transcension points?", // Name of prestige currency
    baseResource: "cookies", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.0005, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult

    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    upgrades: {
        11: {
            title: "[#1tp] Last warning...",
            description: "Don't. x1e16 cookies.",
            cost: new Decimal(1),
        },
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true}

    
})

addLayer("rp", {
    name: "reincarnationpoints", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "RP?", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 4, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#95599aff",
    requires: new Decimal(1e200), // Can be a function that takes requirement increases into account
    resource: "reincarnation points?", // Name of prestige currency
    baseResource: "cookies", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.000005, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult

    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    branches: ['sin'],
    upgrades: {
        11: {
            title: "[#1rp] Just stop.",
            description: "What do we have here? x1e69 cookies! Totally not powerful.",
            cost: new Decimal(1),
        },
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true}

    
})

addLayer("fr", {
    name: "fr", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "FR", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#ffffffff",
    requires: new Decimal(7.77e277), // Can be a function that takes requirement increases into account
    resource: "fr", // Name of prestige currency
    baseResource: "cookies", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1e-30, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult

    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    upgrades: {
        11: {
            title: "[#1fr] big boost fr",
            description: "x1e150 cookies fr",
            cost: new Decimal(1),
        },

        12: {
            title: "[#2fr] yay fr",
            description: "you win a fr",
            cost: new Decimal(10000),
        },
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true}

    
})

addLayer("sin", {
    name: "singularity", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "SIN", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#c1225aff",
    requires: new Decimal("1e1.796e308"), // Can be a function that takes requirement increases into account
    resource: "singularities", // Name of prestige currency
    baseResource: "cookies", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1e-300, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(0.05)
        return mult

    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(0.98)
    },
    upgrades: {
        11: {
            title: "[#1sin] Godspeed",
            description: "You're almost there. x3.871F5 cookies.",
            cost: new Decimal(1),
        },

        12: {
            title: "[#2sin] The End",
            description: "May you escape this indefinite paradox. GG.",
            cost: new Decimal("1e1e1e1e1e3"),
        },

    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true}

    
})