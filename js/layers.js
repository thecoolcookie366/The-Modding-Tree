addLayer("p", {
    name: "points", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
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
        if (hasUpgrade('s', 11)) mult = mult.times(upgradeEffect('s', 11))
        return mult

    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal (1)
        if (hasUpgrade('p', 41)) exp = exp.times(upgradeEffect('p', 41))
        if (hasUpgrade('exp', 11)) exp = exp.times(upgradeEffect('exp', 11))
        if (hasUpgrade('exp', 21)) exp = exp.pow(upgradeEffect('exp', 21))
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
            cost: new Decimal(180),
            unlocked() { return hasUpgrade(this.layer, 23); }
        },

        25: {
            title: "[#2 5/5] Up! (okay let's go onto something new)",
            description: "x3 spacetime again<sup>2</sup>.",
            cost: new Decimal(500),
            unlocked() { return hasUpgrade(this.layer, 24); }
        },

        31: {
            title: "[#3] Hmm...",
            description: "x6 spacetime but /3 spacetime.",
            cost: new Decimal(1500),
            unlocked() { return hasUpgrade(this.layer, 25); }
        },

        41: {
            title: "[#4] Yellow",
            description: "Unlock energy. Energy boosts points.",
            cost: new Decimal(4000),
            unlocked() { return hasUpgrade(this.layer, 31); },
            effect() {
        return player.e.points.add(5).pow(0.03)
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
            title: "<i>Relic 2/7 - The Relic of Simplicity</i>",
            description: "<i>x100 spacetime. Nothing much to say about this one.</i> <h2>The new relic is here, somewhere.</h2>",
            cost: new Decimal(1e15),
            unlocked() { return hasUpgrade("plus", 31) && hasUpgrade("p", 51);},
        },

        71: {
            title: "[#6] Welcome back!",
            description: "Point upgrades are classic. For this one you get x1.11e111 spacetime. (I am not calling it 'all ones')",
            cost: new Decimal("1e655800"),
            unlocked() { return hasMilestone("lv", 0);},
        },

        72: {
            title: "[#7] Continue with the big numbers",
            description: "'all twos' x2.22e222 spacetime.",
            cost: new Decimal("1e657370"),
            unlocked() { return hasMilestone("lv", 0);},
        },

        73: {
            title: "[#8] Fine this one is called all OF THE fours",
            description: "Because you get x4.44e444 xp!",
            cost: new Decimal("1e660500"),
            unlocked() { return hasMilestone("lv", 1);},
        },

    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true}


})

addLayer("e", {
    name: "energy", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "E", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
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
    exponent: 1.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('s', 11)) mult = mult.times(10)
        if (hasUpgrade('s', 21)) mult = mult.times(10000)
        return mult

    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal (1)
        if (hasUpgrade('exp', 21)) exp = exp.pow(upgradeEffect('exp', 21))
        return exp
    },
    update() {
        if (player.e.points.gt("1000")) player.e.points = new Decimal("1000")
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
            description: "Little boost to get you going. <b>x120</b> spacetime.",
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
            description: "<i>You still like numbers, right? Okay then. For each energy, add +5M to the super gain multiplier, capping out at x5B. (+ unexplained spacetime boost)</i> <h2>No more relics until Ultra.</h2>",
            cost: new Decimal(5),
            unlocked() { return hasUpgrade("p", 61);},
            effect() {
                return player.e.points.mul(5e6).clamp(1, 5e9)
            },
            effectDisplay() { return "x"+format(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
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
        if (hasUpgrade('e', 31)) mult = mult.times(upgradeEffect('e', 31))
        return mult

    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal (1)
        if (hasUpgrade('meta', 12)) exp = exp.add(1)
        if (hasMilestone('lv', 0)) exp = exp.add(3)
        return exp
    },
    update() {
        if (player.s.points.gt("1e225000") && !hasUpgrade("u", 11)) player.s.points = new Decimal("2e225000")
            else if (player.s.points.gt("1e1e9") && hasUpgrade("u", 11)) player.s.points = new Decimal("1e1e9")
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
            description: "Energy is x10 more expensive but you get x50,000 spacetime. Also, each super up to 5 super gives +5 multiplier to your points. <i>psst... here's a free layer for you :)</i>",
            cost: new Decimal(1),
            effect() {
                return player.s.points.mul(5).clamp(1, 25)
            },
            effectDisplay() { return "x"+format(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
        },

        21: {
            title: "[S2] This one maybe?",
            description: "Energy is x10,000 more expensive but you get x500,000 spacetime. <i>One more free layer appears. Enjoy, or not.</i> Finally, <h2>prepare for inflation...</h2>",
            cost: new Decimal(200),
            unlocked() { return hasUpgrade(this.layer, 11); },
        },

        31: {
            title: "[S3] Finally something new!",
            description: "Unlock Ultra. <i>Once again, not required after doing your first ultra reset.</i>",
            cost: new Decimal("1e225000"),
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
    requires: new Decimal("1e225000"), // Can be a function that takes requirement increases into account
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
        exp = new Decimal (1)
        if (hasUpgrade('meta', 13)) exp = exp.add(1)
        if (hasUpgrade('inf', 31)) exp = exp.add(3)
        return exp
    },
    infoboxes:{
            coolInfo: {
                title: "Ultra (Universe 3, Part 1/?)",
                titleStyle: {'color': '#a00293'},
                body: "<b>Are you ready? No you aren't.</b> <br> It's time to reset EVERYTHING! Reset everything super does, but also reset super, super upgrades, plus, plus upgs, multi, multi upgs and the first 3 relics for ultra, starting at 1e225,000 super.<br> <i>You're about to crash out.</i>",
                bodyStyle: {'background-color': "#61004c"}
            }
        },
    branches:['s','exp'],
    upgrades: {
        11: {
            title: "[U1] One more time",
            description: "Let's do this one more time. First of all, you get x1e12 spacetime. Second of all... <i>well, I think you know what you're gonna get now!</i> Finally, uncap your super amount. (it can now go above 1e225,000)",
            cost: new Decimal(1),
        },

        21: {
            title: "<i>Relic 4/7 - The Relic of Infinity</i>",
            description: "<i>I'm sorry I reset your progress like that. To compensate, unlock a new layer for free that requires</i> <h2>1e100</h2> <i>spacetime. Good luck!</i>",
            cost: new Decimal(0),
            unlocked() { return hasUpgrade("u", 11);},
        },

        31: {
            title: "[U2] Exponents",
            description: "Unlock Meta. <b>WARNING: If you lose U2, you can no longer access Meta.</b>",
            cost: new Decimal(5),
            unlocked() { return hasUpgrade("u", 21);},
        },

        41: {
            title: "[U3] e<h2>XP</h2>onents",
            description: "Unlock XP.",
            cost: new Decimal(10000),
            unlocked() { return hasUpgrade("u", 31);},
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
    requires: new Decimal("1e100"), // Can be a function that takes requirement increases into account
    resource: "infinities", // Name of prestige currency
    baseResource: "spacetime", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.001, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('meta', 14)) mult = mult.times(6)
        return mult

    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal (1)
        if (hasUpgrade('meta', 14)) exp = exp.add(5)
        return exp
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

        21: {
            title: "[∞2] Let's go Infinite!",
            description: "About time i made a spacetime boost that scales based on your spacetime!",
            cost: new Decimal("100000"),
            unlocked() { return hasUpgrade("inf", 11);},
            effect() {
            return player.points.add(1).pow(0.9)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },

        31: {
            title: "[∞3] The final push!",
            description: "You now get two things: Coolness points (does nothing) and ^3.33 ultra.",
            cost: new Decimal("1e30"),
            unlocked() { return hasUpgrade("inf", 21);},
            effect() {
            return player.points.add(1).pow(player.points.pow(player.points.pow(player.points)))
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+" coolness points" },
        },
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return (hasUpgrade('u', 21)) || player.inf.unlocked }

    
})

addLayer("meta", {
    name: "meta", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "μ", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(1.001),
    }},
    color: "#ffffffa1",
    requires: new Decimal("(e^1000)3"), // Can be a function that takes requirement increases into account
    resource: "meta", // Name of prestige currency
    baseResource: "meta", // Name of resource prestige is based on
    baseAmount() {return player.meta.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.001, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult

    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    update() {
        if (player.meta.points.gt("1e1.796e308")) player.meta.points = new Decimal("1e1.796e308")
    },
    infoboxes:{
            coolInfo: {
                title: "Meta (Universe 3, Part 3/?)",
                titleStyle: {'color': '#ffffffa1'},
                body: "<b>So meta... I wish it was no longer meta.</b> <br> This layer is by default always unlocked and you start with 1.001 meta. However, you cannot use your currencies to get more meta by resetting, you must use the clickable.<br> <i>Why is this so meta?!</i>",
                bodyStyle: {'background-color': "#414141a1"}
            }
        },
    branches:['inf', 'p', 's', 'u'],
    upgrades: {
        11: {
            title: "[μ1] Meta Spacetime",
            description: "Upgrades are categorised into 2 categories: μ[x] (which are regular upgrades) and +μ[x] which add new features to Meta. For this one, get a x10 boost to spacetime!",
            cost: new Decimal("1000"),
        },

        12: {
            title: "[μ2] Meta Super",
            description: "<i>This is super cool!</i> ^2 your super.",
            cost: new Decimal("1e10"),
            unlocked() { return hasUpgrade("meta", 11);},
        },

        13: {
            title: "[μ3] Meta Ultra",
            description: "This is just as ridiculous as the previous meta. ^2 your ultra.",
            cost: new Decimal("1e25"),
            unlocked() { return hasUpgrade("meta", 12);},
        },

        14: {
            title: "[μ4] Meta Infinity",
            description: "And now let's break infinity. x6 infinity, then ^6 infinity.",
            cost: new Decimal("1e1e6"),
            unlocked() { return hasUpgrade("meta", 13);},
        },

        21: {
            title: "[+μ1] Meta Meta",
            description: "Unlock the x1.01 Meta button!",
            cost: new Decimal("2000"),
        },

        31: {
            title: "[+μ2] Meta Meta Meta Meta Meta Meta Meta Meta Meta Meta Meta Meta...",
            description: "Unlock the ^1.01 Meta button!",
            cost: new Decimal("1e50"),
            unlocked() { return hasUpgrade("meta", 21);},
        },

        41: {
            title: "[+μ3] When the",
            description: "Unlock the ^10.1 Meta button! Wait what-",
            cost: new Decimal("1e1e10"),
            unlocked() { return hasUpgrade("meta", 31);},
        },
    },
    clickables: {
        11: {
           display() { return "Fix your Meta." },
           tooltip() { return "Set your Meta to 1.001 after doing a row 4+ reset to make Meta work."},
           canClick() { return true },
           color() { return "#ffffff93" },
            onClick() {
                player.meta.points = new Decimal(1.001)
            }
        },

        21: {
           display() { return "+1.01 your Meta." },
           tooltip() { return "Who made this abomination of a button?!"},
           canClick() { return true },
           color() { return "#ffffff93" },
            onClick() {
                player.meta.points = player.meta.points.add(1.01)
            }
        },

        22: {
           display() { return "x1.01 your Meta." },
           tooltip() { return "This isn't really <i>that</i> meta, but hey, it works!"},
           canClick() { return hasUpgrade("meta", 21); },
           color() { return "#ffffff93" },
            onClick() {
                player.meta.points = player.meta.points.mul(1.01)
            }
        },

        23: {
           display() { return "^1.01 your Meta." },
           tooltip() { return "Hey, all meta thingies must have inflation in them, right?"},
           canClick() { return hasUpgrade("meta", 31); },
           color() { return "#ffffff93" },
            onClick() {
                player.meta.points = player.meta.points.pow(1.01)
            }
        },

        24: {
           display() { return "^10.1 your Meta." },
           tooltip() { return "WOAH"},
           canClick() { return hasUpgrade("meta", 41); },
           color() { return "#ffffff93" },
            onClick() {
                player.meta.points = player.meta.points.pow(10.1)
            }
        },
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return (hasUpgrade('u', 31)) && player.meta.unlocked }

    
})

addLayer("xp", {
    name: "experience", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "XP", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 3, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#2c7941",
    requires: new Decimal("10000"), // Can be a function that takes requirement increases into account
    resource: "XP", // Name of prestige currency
    baseResource: "ultra", // Name of resource prestige is based on
    baseAmount() {return player.u.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 4, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('xp', 11)) mult = mult.times(500)
        return mult

    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal (1)
        if (hasUpgrade('lv', 11)) exp = exp.add(9)
        if (hasUpgrade('lv', 11)) exp = exp.add(9)
        if (hasUpgrade('xp', 21)) exp = exp.times(6)
        return exp
    },
    infoboxes:{
            coolInfo: {
                title: "Experience (Universe 3, Part 4/?)",
                titleStyle: {'color': '#4ca464'},
                body: "<b>Already?!</b> <br>Ultra can now turn into XP, which can be used for more XP! <br> <i>Did you know? This layer doesn't have ids on upgrades, so no [XP1] or anything.</i>",
                bodyStyle: {'background-color': "#184524"}
            }
        },
    branches:['u'],
    upgrades: {
        11: {
            title: "Get an XP Boost role on the discord server",
            description: "No, you don't actually get +500% xp on the real server, but you do get x500 xp here!",
            cost: new Decimal("1000"),
        },
        12: {
            title: "Add a leveling bot to your own server",
            description: "Unlock Levels.",
            cost: new Decimal("100000000"),
        },
        21: {
            title: "Remove the leveling bot because it broke after only 1e21 XP",
            description: "x6 the XP exponent.",
            cost: new Decimal("1e12500"),
        },
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return (hasUpgrade('u', 41)) || player.xp.unlocked}

    
})

addLayer("lv", {
    name: "level", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "LV", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 4, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(1),
    }},
    color: "#174523",
    requires: new Decimal("1e8"), // Can be a function that takes requirement increases into account
    resource: "Levels", // Name of prestige currency
    baseResource: "XP", // Name of resource prestige is based on
    baseAmount() {return player.xp.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 8.4, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult

    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    infoboxes:{
            coolInfo: {
                title: "Levels (Universe 3, Part 4.5/?)",
                titleStyle: {'color': '#2f7341'},
                body: "<b>Let's just go on with the... THAT'S A LOT OF XP</b> <br>XP can now turn into Levels which can give MILESTONES! <br> <i>No upgrades in this layer! Except for the relic...</i>",
                bodyStyle: {'background-color': "#0d2915"}
            }
        },
    branches:['xp'],
    milestones: {
        0: {
        requirementDescription: "Level 2",
        effectDescription: "Get the following: <br> - Add 3 to the exponent of super <br> - Unlock more point upgrades (#6-10) <br> - Unlock Relic 5",
        done() { return player.lv.points.gte(2) }
        },

        1: {
        requirementDescription: "Level 3",
        effectDescription: "Get the following: <br> - Add 0 to the exponent of super <br> - Unlock more energy upgrades (E3-E5) <br> - Unlock upgrade #11",
        done() { return player.lv.points.gte(3) }
        },

        2: {
        requirementDescription: "Level 4",
        effectDescription: "Get the following: <br> - Unlock Mega Levels",
        done() { return player.lv.points.gte(4) }
        },
    },
    upgrades: {
        11: {
            title: "Relic 5/7 - The Relic of Big Numbers",
            description: "^10 XP. Then, add 9 to the exponent of XP. <h2>Next relic in 5 (layers)</h2>",
            cost: new Decimal("0"),
            unlocked() { return hasMilestone("lv", 0);},
        },
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return (hasUpgrade('xp', 12)) || player.lv.unlocked}

    
})

addLayer("mlv", {
    name: "megalevel", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "MLV", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 5, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(1),
    }},
    color: "#0c2913",
    requires: new Decimal("1e15382"), // Can be a function that takes requirement increases into account
    resource: "Mega Levels", // Name of prestige currency
    baseResource: "XP", // Name of resource prestige is based on
    baseAmount() {return player.xp.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 88.44, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult

    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    infoboxes:{
            coolInfo: {
                title: "Mega Levels (Universe 3, Part 5/?)",
                titleStyle: {'color': '#0a1b0e'},
                body: "<b>The finale.</b> <br>Levels can now turn into- okay nevermind. <br> <i>Milestones!</i>",
                bodyStyle: {'background-color': "#081a0d"}
            }
        },
    branches:['lv'],
    milestones: {
        0: {
        requirementDescription: "Mega Level 2",
        effectDescription: "And now you get THIS: <br> - ??? <br> - Unlock more infinity upgrades",
        done() { return player.mlv.points.gte(2) }
        },
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return (hasMilestone('lv', 2)) || player.mlv.unlocked}

    
})

addLayer("gr", {
    name: "grass", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "G", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#04ff00",
    requires: new Decimal("1e144"), // Can be a function that takes requirement increases into account
    resource: "grass", // Name of prestige currency
    baseResource: "ultra", // Name of resource prestige is based on
    baseAmount() {return player.u.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.0999, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult

    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal (1)
        return exp
    },
    infoboxes:{
            coolInfo: {
                title: "Grass (Universe 4, Part 1 / a while)",
                titleStyle: {'color': '#00a82d'},
                body: "<b>As you reset everything, you feel grass around you...</b> <br>Welcome to Universe 4! Next update is soon. <br> <i>great i touched grass.</i>",
                bodyStyle: {'background-color': "#007a21"}
            }
        },
    branches:['u','mlv'],
    upgrades: {
        11: {
            title: "[g1] update soon",
            description: "update soon (in a few days, probably)",
            cost: new Decimal("1e1e3"),
        },
    },
    row: 3, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return (hasMilestone('mlv', 0)) || player.gr.unlocked}

    
})

addLayer("pie", {
    name: "truepie", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "π", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#d1634d",
    requires: new Decimal("1e4380"), // Can be a function that takes requirement increases into account
    resource: "pies", // Name of prestige currency
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
                title: "Pie (Temporary Universe, v1.005)",
                titleStyle: {'color': '#9e4d3c'},
                body: "<b>What is a temp layer?</b> <br> A temp layer is a layer that gets reset on the next update. An update with a temp layer is sometimes called a pre-update, this layer is for v1.005 and will still exist in v1.01, but unobtainable!<br> <i>Enjoy x200 spacetime!</i>",
                bodyStyle: {'background-color': "#683126"}
            }
        },
    branches:[''],
    upgrades: {
        11: {
            title: "<i>[π1] Pie :/</i>",
            description: "<h3>small pie, x2 spacetime</h3>",
            cost: new Decimal(1),
        },

        21: {
            title: "<i>[π2] Pie :)</i>",
            description: "<h3>medium pie, x5 spacetime</h3>",
            cost: new Decimal(2),
        },

        31: {
            title: "<i>[π3] Pie :D</i>",
            description: "<h3>big pie, x20 spacetime</h3>",
            cost: new Decimal(3),
        },
    },
    row: 100, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true}

    
})

addLayer("tierone", {
    name: "firstier", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "T₁", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#ff2a008c",
    requires: new Decimal("1e100000"), // Can be a function that takes requirement increases into account
    resource: "tier 1 power", // Name of prestige currency
    baseResource: "grass", // Name of resource prestige is based on
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
    infoboxes:{
            coolInfo: {
                title: "Tier 1 (Universe α)",
                titleStyle: {'color': '#a91c00'},
                body: "I ran out of name ideas so enjoy this repetitive part of the game :D",
                bodyStyle: {'background-color': "#871600"}
            }
        },
    branches:[''],
    upgrades: {
        11: {
            title: "<i>[T1] who asked</i>",
            description: "<h3>unlocks more point upgrades</h3>",
            cost: new Decimal(1),
        },
    },
    row: 6, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true}

    
})

addLayer("tiertwo", {
    name: "secondtier", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "T₂", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#ff88008c",
    requires: new Decimal("5"), // Can be a function that takes requirement increases into account
    resource: "tier 2 power", // Name of prestige currency
    baseResource: "tier 1 power", // Name of resource prestige is based on
    baseAmount() {return player.tierone.points}, // Get the current amount of baseResource
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
                title: "Tier 2 (Universe α)",
                titleStyle: {'color': '#a95a00'},
                body: "Idealess. No ideas, no balancing!",
                bodyStyle: {'background-color': "#874800"}
            }
        },
    branches:['tierone'],
    upgrades: {
        11: {
            title: "<i>[T2] what why</i>",
            description: "<h3>unlock rng layer, unlock more point upgrades</h3>",
            cost: new Decimal(1),
        },
    },
    row: 6, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true}

    
})

addLayer("tierthree", {
    name: "thirdtier", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "T₃", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#fffb008c",
    requires: new Decimal("5"), // Can be a function that takes requirement increases into account
    resource: "tier 3 power", // Name of prestige currency
    baseResource: "tier 2 power", // Name of resource prestige is based on
    baseAmount() {return player.tiertwo.points}, // Get the current amount of baseResource
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
                title: "Tier 3 (Universe α)",
                titleStyle: {'color': '#a9a300'},
                body: "did you know it took over 1 month to balance the x2 upgrade?",
                bodyStyle: {'background-color': "#878200"}
            }
        },
    branches:['tiertwo'],
    upgrades: {
        11: {
            title: "<i>[T3] this is so repetitive</i>",
            description: "<h3>unlock universe -1, unlock rng expansion, unlock more point upgrades!!! who could've thought</h3>",
            cost: new Decimal(1),
        },
    },
    row: 6, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true}

    
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
    branches:['multi','e','meta'],
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

        21: {
            title: "[^2] Isn't this STUPID?!",
            description: "Wow, you sure hate exponents. Increase the power boost of points by your super! <i>This does get quite inflated...</i>",
            cost: new Decimal(2),
            unlocked() { return hasUpgrade(this.layer, 11); },
            effect() {
        return player.s.points.add(1).pow(0.00000001)
    },
    effectDisplay() { return "^"+format(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
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

        22: {
            name: "Infinity first, Eternity second, Reality third.",
            done() { return hasUpgrade("u", 21); },
            tooltip: "Unlock Infinity. (relic 4/7, for free!)",
        },

        23: {
            name: "Enough meta references!",
            done() { return hasUpgrade("u", 31); },
            tooltip: "Unlock Meta. (upgrade u2)",
        },

        24: {
            name: "<i>says xp</i> You leveled up to 1! GG!",
            done() { return hasUpgrade("u", 41); },
            tooltip: "Unlock XP. (upgrade u3)",
        },

        25: {
            name: "<i>says xp billions of times</i> You leveled up to 2! GG!",
            done() { return hasUpgrade("xp", 12); },
            tooltip: "Unlock Levels. (2nd xp upgrade)",
        },
        26: {
            name: "It's just level 1 all over again",
            done() { return (hasMilestone('lv', 2)); },
            tooltip: "Unlock Mega Levels. (Level 4)",
        },
        31: {
            name: "Okay what is going on??",
            done() { return false },
            tooltip: "Buy the first Grass upgrade. (upgrade g1)",
        },
    },
})

addLayer("ta", {
    symbol: "TA",
    position: 1,
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
    }},
    color: "#fedcba",
    resource: "temp unobtainium", 
    row: "side",
    tooltip() { // Optional, tooltip displays when the layer is locked
        return ("Temp Achievements")
    },
    achievementPopups: true,
    achievements: {
        11: {
            name: "Thanks for the pie!",
            done() { return hasUpgrade("pie", 11); },
            tooltip: "Get the small pie. (pie temp layer, v1.01)",
        },

        12: {
            name: "Yay, pies!",
            done() { return hasUpgrade("pie", 21); },
            tooltip: "Get the medium pie. (pie temp layer, v1.01)",
        },

        13: {
            name: "Pie for me, pie for you",
            done() { return hasUpgrade("pie", 31); },
            tooltip: "Get the big pie! (pie temp layer, v1.01)",
        },
    },
})

addLayer("hard", {
    symbol: "HC",
    position: 2,
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
    }},
    color: "#86872b",
    resource: "hardcapped unobtainium", 
    row: "side",
    tooltip() { // Optional, tooltip displays when the layer is locked
        return ("Hardcaps")
    },
    achievementPopups: true,
    achievements: {
        11: {
            name: "Energized Hardcap",
            done() { return player.e.points.gt("999")},
            tooltip: "Reach the energy hardcap of 1,000.",
        },
        12: {
            name: "Super Hardcap 1",
            done() { return player.s.points.gt("1e225000")},
            tooltip: "Reach the pre-ultra super hardcap of 1e225,000.",
        },
        13: {
            name: "Super Hardcap 2",
            done() { return player.s.points.gt("1e999999999")},
            tooltip: "Reach the post-ultra super hardcap of <i>1e1,000,000,000, which cannot be increased any further!</i>",
        },
    },
})

addLayer("what", {
    name: "whatthe",
    tooltip: "Universe 0.",
    symbol: "???",
    position: 3,
    row: "side",
    color: "#711212",
    resource: "eternal voids", 
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
    }},
    update() {
        if (player.what.points.gt("1")) player.what.points = new Decimal("1")
    },
    infoboxes: {
        info: {
            title: "Universe 0 - The Eternal Void",
            body() { return "<i>Do you know what you are doing?</i><br> This place contains some of the most dangerous things you will see in the game. Do not touch." },
        }
    },

    clickables: {
        11: {
           display() { return "Set your points to the placeholder, marking your save as cheated, but in return get the unobtainable." },
           tooltip() { return "There's no going back after this."},
           canClick() { return true },
           color() { return "#000000" },
            onClick() {
                player.a.points = new Decimal(1)
                player.what.points = player.what.points.add(0.0001)
                player.points = new Decimal("(e^1000)3")
            }
        },
    },

    achievements: {
        11: {
            name: "Are you REALLY in the void?",
            done() { return player.what.points.gte(new Decimal("0.9999")) },
            tooltip: "Get your first eternal void...",
        },
    },

    upgrades: {
        11: {
            title: "The Void's Entrance",
            description: "Double your G̴L̶I̸T̸C̷H",
            cost: new Decimal(0.9999),
        },

        12: {
            title: "The Void's G̴L̶I̸T̸C̷H",
            description: "G̴L̶I̸T̸C̷H your G̴L̶I̸T̸C̷H",
            cost: new Decimal(Infinity),
            unlocked() { return hasUpgrade(this.layer, 11); },
        },
    },
    
})

addLayer("qna", {
    name: "questionsanswers",
    tooltip: "Questions and Answers",
    symbol: "QnA",
    position: 4,
    row: "side",
    color: "#559e68",
    resource: "questions, yet 0 answers", 
    startData() { return {
        unlocked: true,
        points: new Decimal(347215),
    }},
    infoboxes: {
        info: {
            title: "Questions and Answers",
            body() { return "Here you will find all the answers to your questions. <br><br> Q1: Why is this called The Cookie Tree? <br> A1: For two reasons: Because my name is cookie (obviously) and because the original version of the game was about cookies. <br><br> Q2: These <i>super</i> and <i>ultra</i> layers seem generic, where did you get them from? <br> A2: Because i didn't have original name ideas???" },
        },
    },
    
})