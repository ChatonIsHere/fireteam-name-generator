let rand = require("random-seed").create(),
    descriptions = require("./mythicalDescriptions.json"),
    creatures = require("./mythicalCreatures.json");

module.exports.generateFireteamName = (userList) => {
    if (!Array.isArray(userList)) throw new Error("Input was not an array");
    if (!userList.every(function(i){ return typeof i === "string" })) throw new Error("One or more elements was not a string")

    // Orders userList alphabetically and numerically from lowest to highest
    userList.naturalSort();

    // Combines the userList into a (very long) seed
    let userString = userList.join("");

    // Override for fireteam made of Chat, End and Laugh
    if (userString === "117235513869598726120268969394438145415168236557041675") return "Fireteam Shining Dragon";

    // Pass userString to the rand module as a (hopefully) unique string
    rand.seed(userString);

    // Use userString to get a position in both of the lists and assign them to an object
    selector = {
        descriptions: rand.range(descriptions.length),
        creatures: rand.range(creatures.length)
    };

    // Use the above positions to get words from the lists and generate the fireteam name
    return `Fireteam ${descriptions[selector.descriptions]} ${creatures[selector.creatures]}`;
}

// JavaScript Natural Sort by mrhoo
Array.prototype.naturalSort = function(){
    var a, b, a1, b1, rx=/(\d+)|(\D+)/g, rd=/\d+/;
    return this.sort(function(as, bs){
        a= String(as).toLowerCase().match(rx);
        b= String(bs).toLowerCase().match(rx);
        while(a.length && b.length){
            a1= a.shift();
            b1= b.shift();
            if(rd.test(a1) || rd.test(b1)){
                if(!rd.test(a1)) return 1;
                if(!rd.test(b1)) return -1;
                if(a1!= b1) return a1-b1;
            }
            else if(a1!= b1) return a1> b1? 1: -1;
        }
        return a.length- b.length;
    });
}