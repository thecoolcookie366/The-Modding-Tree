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
        if (hasUpgrade('multi', 21)) mult = mult.times(upgradeEffect('multi', 21))
        return mult

    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal (1)
        if (hasUpgrade('p', 41)) exp = exp.times(upgradeEffect('p', 41))
        if (hasUpgrade('exp', 11)) exp = exp.times(upgradeEffect('exp', 11))
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
    branches:['e'],
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
            unlocked() { return hasUpgrade(this.layer, 11); }
        },

        22: {
            title: "[#2 2/5] Up! (about 10km)",
            description: "x3 spacetime again.",
            cost: new Decimal(25),
            unlocked() { return hasUpgrade(this.layer, 21); }
        },

        23: {
            title: "[#2 3/5] Up! (about 1 light year)",
            description: "x3 spacetime again again.",
            cost: new Decimal(75),
            unlocked() { return hasUpgrade(this.layer, 22); }
        },

        24: {
            title: "[#2 4/5] Up! (5 hours or so)",
            description: "x3 spacetime again again again.",
            cost: new Decimal(225),
            unlocked() { return hasUpgrade(this.layer, 23); }
        },

        25: {
            title: "[#2 5/5] Up! (okay let's go onto something new)",
            description: "x3 spacetime again<sup>2</sup>.",
            cost: new Decimal(600),
            unlocked() { return hasUpgrade(this.layer, 24); }
        },

        31: {
            title: "[#3] Hmm...",
            description: "x5 spacetime but /3 spacetime.",
            cost: new Decimal(2000),
            unlocked() { return hasUpgrade(this.layer, 25); }
        },
        
        31: {
            title: "[#3] Hmm...",
            description: "x5 spacetime but /3 spacetime.",
            cost: new Decimal(2000),
            unlocked() { return hasUpgrade(this.layer, 25); }
        },

        41: {
            title: "[#4] Yellow",
            description: "Unlock energy. Energy boosts points.",
            cost: new Decimal(11111),
            unlocked() { return hasUpgrade(this.layer, 31); },
            effect() {
        return player.e.points.add(1).pow(0.03)
    },
    effectDisplay() { return "^"+format(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
        },

        51: {
            title: "[#5] Super Inflation",
            description: "Unlock Super. <i>Not required after doing your first super reset.</i>",
            cost: new Decimal(100e6),
            unlocked() { return hasUpgrade("e", 21); }
        },

        61: {
            title: "<i>Relic 2/7 - The Relic of Lockout</i>",
            description: "<i>Game not hard enough? Okay then, lock yourself out of energy (make sure you get at least 10 before buying this) but get x1e100 spacetime.</i> <h2>The new relic is here, somewhere.</h2>",
            cost: new Decimal(3e52),
            unlocked() { return hasUpgrade("plus", 31) && hasUpgrade("p", 51);},
        },

    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true}

    
})

addLayer("e", {
    name: "energy", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "E", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#eaff00",
    requires: new Decimal(1000), // Can be a function that takes requirement increases into account
    resource: "energy", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 2, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('s', 11)) mult = mult.times(10)
        if (hasUpgrade('s', 21)) mult = mult.times(1e18)
        if (hasUpgrade('p', 61)) mult = mult.times("(e^1000)3")
        return mult

    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    infoboxes:{
            coolInfo: {
                title: "Energy (Universe 1, Part 2/2)",
                titleStyle: {'color': '#7d8900'},
                body: "<b>Welcome to Energy!</b> <br> This layer does not reset anything, your only goal is to get as much energy as possible. <br> <i>Remember: more energy means more points!</i>",
                bodyStyle: {'background-color': "#596100"}
            }
        },
    branches:['p'],
    upgrades: {
        11: {
            title: "[E1] Energy!",
            description: "Little boost to get you going. <b>x1,000</b> spacetime.",
            cost: new Decimal(3),
        },

        21: {
            title: "[E2] This isn't auto energy...",
            description: "But you like numbers, right? <h2>x1,000,000</h2> spacetime. Also unlock upgrade 5.",
            cost: new Decimal(4),
            unlocked() { return hasUpgrade(this.layer, 11); },
        },

        31: {
            title: "<i>Relic 3/7 - The Relic of Numbers</i>",
            description: "<i>You still like numbers, right? Okay then.</i> <h1>x6.66e66</h1> <i>spacetime.</i> <h2>No more relics until Ultra.</h2>",
            cost: new Decimal(11),
            unlocked() { return hasUpgrade("p", 61);},
        },
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return (hasUpgrade('p', 41)) || player.e.unlocked}

})

addLayer("s", {
    name: "super", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#ff0000",
    requires: new Decimal(25e6), // Can be a function that takes requirement increases into account
    resource: "super", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('plus', 11)) mult = mult.times(upgradeEffect('plus', 11))
        if (hasUpgrade('plus', 21)) mult = mult.times(upgradeEffect('plus', 21))
        if (hasUpgrade('plus', 31)) mult = mult.times(upgradeEffect('plus', 31))
        if (hasUpgrade('multi', 11)) mult = mult.times(upgradeEffect('multi', 11))
        if (hasUpgrade('multi', 21)) mult = mult.times(upgradeEffect('multi', 21))
        return mult

    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    infoboxes:{
            coolInfo: {
                title: "Super (Universe 2, Part 1/3)",
                titleStyle: {'color': '#890000'},
                body: "<b>This is your first reset layer.</b> <br> Reset spacetime, points (along with their upgrades), energy (and their upgrades too) to get Super starting from 25M points.<br> <i>Yes, these upgrades are serious.</i>",
                bodyStyle: {'background-color': "#610000"}
            }
        },
    branches:['p','e'],
    upgrades: {
        11: {
            title: "[S1] Woah.",
            description: "Energy is x10 more expensive but you get x5,000,000 spacetime. <i>psst... here's a free layer for you :)</i>",
            cost: new Decimal(1),
        },

        21: {
            title: "[S2] This one maybe?",
            description: "Energy is x1e18 more expensive but you get ^5 spacetime. <i>One more free layer appears. Enjoy... or not.</i>",
            cost: new Decimal(200),
            unlocked() { return hasUpgrade(this.layer, 11); },
        },

        31: {
            title: "[S3] Finally something new!",
            description: "Unlock Ultra. <i>Once again, not required after doing your first ultra reset.</i>",
            cost: new Decimal("1e228900"),
            unlocked() { return hasUpgrade(this.layer, 21); },
        },
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return (hasUpgrade('p', 51)) || player.s.unlocked }

    
})

addLayer("u", {
    name: "ultra", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "U", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#e600ff",
    requires: new Decimal("1e228900"), // Can be a function that takes requirement increases into account
    resource: "ultra", // Name of prestige currency
    baseResource: "super", // Name of resource prestige is based on
    baseAmount() {return player.s.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.00000625, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('inf', 11)) mult = mult.times(2)
        return mult

    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    infoboxes:{
            coolInfo: {
                title: "Ultra (Universe 3, Part 1/?)",
                titleStyle: {'color': '#a00293'},
                body: "<b>Are you ready? No you aren't.</b> <br> It's time to reset EVERYTHING! Reset everything super does, but also reset super, super upgrades, plus, plus upgs, multi, multi upgs and the first 3 relics for ultra, starting at 1e228,900 super.<br> <i>You're about to crash out.</i>",
                bodyStyle: {'background-color': "#61004c"}
            }
        },
    branches:['s','exp'],
    upgrades: {
        11: {
            title: "[U1] One more time",
            description: "Let's do this one more time. First of all, you get x1e12 spacetime. Second of all... <i>well, I think you know what you're gonna get now!</i>",
            cost: new Decimal(1),
        },

        21: {
            title: "<i>Relic 4/7 - The Relic of Infinity</i>",
            description: "<i>I'm sorry I reset your progress like that. To compensate, unlock a new layer for free that requires</i> <h2>1.79e308</h2> <i>spacetime. Good luck!</i>",
            cost: new Decimal(0),
            unlocked() { return hasUpgrade("u", 11);},
        },

        31: {
            title: "[U2] Exponents?",
            description: "I'm not even sure what this even unlocks...",
            cost: new Decimal("(e^1000)3"),
            unlocked() { return hasUpgrade("u", 21);},
        },
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return (hasUpgrade('s', 31)) || player.u.unlocked }

    
})

addLayer("inf", {
    name: "infinity", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "∞", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#a05f19",
    requires: new Decimal("1.79e308"), // Can be a function that takes requirement increases into account
    resource: "infinities", // Name of prestige currency
    baseResource: "spacetime", // Name of resource prestige is based on
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
    infoboxes:{
            coolInfo: {
                title: "Infinity (Universe ∞, Part ∞/∞)",
                titleStyle: {'color': '#784510'},
                body: "<b>Not actually Universe ∞, it's still U3...</b> <br> Same thing as the ultra reset, but now you get Infinities!<br> <i>This is not a reference.</i>",
                bodyStyle: {'background-color': "#402406"}
            }
        },
    branches:['u'],
    upgrades: {
        11: {
            title: "[∞1] Infinite",
            description: "You get 2 things. <br> The first thing you get is <h1>big text</h1>, but the second thing you get is more ultra! x2 of it!",
            cost: new Decimal(1),
        },
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return (hasUpgrade('u', 21)) || player.inf.unlocked }

    
})

addLayer("plus", {
    name: "addition", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "+", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#434343",
    requires: new Decimal(3), // Can be a function that takes requirement increases into account
    resource: "plus", // Name of prestige currency
    baseResource: "super", // Name of resource prestige is based on
    baseAmount() {return player.s.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 3, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult

    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    infoboxes:{
            coolInfo: {
                title: "Plus (Universe 2, Part 2/3)",
                titleStyle: {'color': '#616161'},
                body: "<b>Do you like addition?</b> <br> This isn't really a layer, but rather a feature. It's kinda like energy!<br> <i>There's also another feature, you know?</i>",
                bodyStyle: {'background-color': "#2c2b2b"}
            }
        },
    branches:['s'],
    upgrades: {
        11: {
            title: "[+1] Glorious",
            description: "Want more super? Yes, + now gives more super!",
            cost: new Decimal(1),
            effect() {
        return player.plus.points.add(1).pow(3.141592)
    },
    effectDisplay() { return "x"+format(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
        },

        21: {
            title: "[+2] Really?",
            description: "This is even more glorious. Enjoy MORE super from + because why not!",
            cost: new Decimal(3),
            unlocked() { return hasUpgrade(this.layer, 11); },
            effect() {
        return player.plus.points.add(1).pow(1.618033)
    },
    effectDisplay() { return "x"+format(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
        },

        31: {
            title: "<i>Relic 1/7 - The Relic of Duplication</i>",
            description: "<i>Welcome to one of the 7 relics you will find across your journey. This one will give a massive boost equal to the one of [x1], except this one calculates the boost using + instead of multi.</i> <h2>Unlock a new Relic.</h2>",
            cost: new Decimal(4),
            unlocked() { return hasUpgrade('multi', 11); },
            effect() {
        return player.plus.points.add(1).pow(19.565066)
    },
    effectDisplay() { return "x"+format(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
        },
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return (hasUpgrade('s', 11)) || player.plus.unlocked }

    
})

addLayer("multi", {
    name: "multiplication", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "x", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#a4b04f",
    requires: new Decimal(3), // Can be a function that takes requirement increases into account
    resource: "multi", // Name of prestige currency
    baseResource: "plus", // Name of resource prestige is based on
    baseAmount() {return player.plus.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
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
                title: "Multi (Universe 2, Part 3/3)",
                titleStyle: {'color': '#c9d75a'},
                body: "<b>Math is getting on my nerves.</b> <br> A feature yet again. I guess you can progress here too...<br> <i>Have you tried reaching the 4th plus?</i>",
                bodyStyle: {'background-color': "#848d41"}
            }
        },
    branches:['plus'],
    upgrades: {
        11: {
            title: "[x1] Another One!",
            description: "OP layer of the day! Let <h3>tau^phi</h3> multiply your super.",
            cost: new Decimal(1),
            effect() {
        return player.multi.points.add(1).pow(19.565066)
    },
    effectDisplay() { return "x"+format(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
        },

        21: {
            title: "[x2] Last one bro I swear...",
            description: "Let's get real, you probably saw this one coming. Create a <h2>tau^tau</h2> boost coming from plus, still to super. Let's do this. By the same boost, also increase points.",
            cost: new Decimal(2),
            unlocked() { return hasUpgrade(this.layer, 11); },
            effect() {
        return player.plus.points.add(1).pow(103540.92)
    },
    effectDisplay() { return "x"+format(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
        },
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return (hasUpgrade('s', 21)) || player.multi.unlocked}

    
})

addLayer("exp", {
    name: "exponentiation", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "^", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 3, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#256ba0",
    requires: new Decimal(4), // Can be a function that takes requirement increases into account
    resource: "exp", // Name of prestige currency
    baseResource: "multi", // Name of resource prestige is based on
    baseAmount() {return player.multi.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
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
                title: "Exp (Universe 3, Part 2/?)",
                titleStyle: {'color': '#103957'},
                body: "<b>Okay this is the last one for real this time.</b> <br> Last feature. Good luck trying to get 2 exp because it's way too hard.<br> <i>Perhaps the relics will help you?</i>",
                bodyStyle: {'background-color': "#0a2c45"}
            }
        },
    branches:['multi'],
    upgrades: {
        11: {
            title: "[^1] Isn't this out of the range?",
            description: "Who cares? Massively increase the power boost of points!",
            cost: new Decimal(1),
            effect() {
        return player.exp.points.add(1).pow(1.2)
    },
    effectDisplay() { return "x"+format(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
        },
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return (hasUpgrade('u', 11)) || player.exp.unlocked}

    
})
// A side layer with achievements, with no prestige
addLayer("a", {
    symbol: "A",
    position: 0,
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
    }},
    color: "#abcdef",
    resource: "unobtainium", 
    row: "side",
    tooltip() { // Optional, tooltip displays when the layer is locked
        return ("Achievements")
    },
    achievementPopups: true,
    achievements: {
        11: {
            name: "Where have I seen this before?",
            done() { return hasUpgrade("p", 41); },
            tooltip: "Unlock Energy. (upgrade #4)",
        },

        12: {
            name: "This isn't <h2>ultra</h2> at all...",
            done() { return hasUpgrade("p", 51); },
            tooltip: "Unlock Super. (upgrade #5)",
        },

        13: {
            name: "Math?!",
            done() { return hasUpgrade("s", 11); },
            tooltip: "Unlock Plus. (upgrade s1)",
        },

        14: {
            name: "WHAT IS THIS MATH DOING HERE BRO",
            done() { return hasUpgrade("s", 21); },
            tooltip: "Unlock Multi. (upgrade s2)",
        },

        15: {
            name: "I'm tired of this.",
            done() { return hasUpgrade("s", 31); },
            tooltip: "Unlock Ultra. (upgrade s3)",
        },

        21: {
            name: "Math: The Sequel",
            done() { return hasUpgrade("u", 11); },
            tooltip: "Unlock Exp. (upgrade u1)",
        },
    },
})