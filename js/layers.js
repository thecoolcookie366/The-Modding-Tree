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
        return mult

    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    upgrades: {
        11: {
            title: "Cookie Duplication",
            description: "Your first upgrade. Get x2 cookies.",
            cost: new Decimal(1),
        },

        12: {
            title: "Strong Cookie Duplication",
            description: "Cookie gain go big. x3 cookies!",
            cost: new Decimal(5),
        },

        13: {
            title: "placeholder",
            description: "will update later",
            cost: new Decimal(1e303),
        },
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "c", description: "C: Reset for chocolate cookies", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}
})