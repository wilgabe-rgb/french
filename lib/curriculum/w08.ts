import { day, week } from "./build";

export const W08 = week(
  8,
  "Describing and having opinions",
  "You can describe a thing, a place or a person, and say what you think about it.",
  [
    day(
      50,
      "The adjectives you'll use daily",
      "Describe anything with twelve words.",
      "clothes-shop",
      [
        ["grand / petit", "big / small", "GRON / puh-TEE", "C'est un petit appartement mais très clair.", "It's a small flat but very light.", { note: "Most adjectives go after the noun, but grand, petit, bon, beau, jeune and vieux go before it.", tags: ["descriptions"] }],
        ["bon / mauvais", "good / bad", "BON / mo-VEH", "C'est un bon restaurant.", "It's a good restaurant.", { tags: ["descriptions"] }],
        ["beau / joli", "beautiful / pretty", "BO / zho-LEE", "C'est un très beau quartier.", "It's a really beautiful area.", { tags: ["descriptions"] }],
        ["cher / pas cher", "expensive / cheap", "SHAIR", "C'est pas cher pour le quartier.", "It's cheap for the area.", { tags: ["descriptions", "money"] }],
        ["facile / difficile", "easy / difficult", "fa-SEEL / dee-fee-SEEL", "Le français, c'est difficile mais ça vient.", "French is hard but it's coming.", { tags: ["descriptions"] }],
        ["rapide / lent", "fast / slow", "ra-PEED / LON", "Le service est rapide ici.", "The service is fast here.", { tags: ["descriptions"] }],
        ["propre / sale", "clean / dirty", "PROPR / SAL", "L'appartement est propre.", "The flat is clean.", { tags: ["descriptions", "home"] }],
        ["nouveau / vieux", "new / old", "noo-VO / VYUH", "C'est un vieux bâtiment mais bien rénové.", "It's an old building but well renovated.", { tags: ["descriptions"] }],
      ],
    ),

    day(
      51,
      "Making adjectives agree",
      "Get the -e and -s right so people stop wincing.",
      "flat-viewing",
      [
        ["grand / grande", "big (m / f)", "GRON / GROND", "Une grande cuisine et un grand salon.", "A big kitchen and a big living room.", { note: "Adding -e for feminine usually makes a silent consonant audible: grand 'GRON' becomes grande 'GROND'.", tags: ["descriptions"] }],
        ["bon / bonne", "good (m / f)", "BON / BUN", "C'est une bonne idée.", "That's a good idea.", { tags: ["descriptions"] }],
        ["beau / belle", "beautiful (m / f)", "BO / BEL", "Une belle vue sur la ville.", "A beautiful view over the city.", { tags: ["descriptions"] }],
        ["vieux / vieille", "old (m / f)", "VYUH / VYAY", "Une vieille maison de famille.", "An old family house.", { tags: ["descriptions"] }],
        ["cher / chère", "expensive (m / f)", "SHAIR", "La vie est chère à Paris.", "Life is expensive in Paris.", { tags: ["descriptions"] }],
        ["blanc / blanche", "white (m / f)", "BLON / BLONSH", "Une chemise blanche, taille M.", "A white shirt, size M.", { tags: ["descriptions", "colours"] }],
        ["les … sont …", "the … are …", "lay … son", "Les chambres sont petites.", "The bedrooms are small.", { note: "Plural adds -s to the adjective too, but you almost never hear it.", tags: ["descriptions"] }],
        ["tout / toute / tous", "all / whole", "TOO / TOOT / TOOSS", "Toute la journée, tous les jours.", "All day, every day.", { tags: ["core"] }],
      ],
    ),

    day(
      52,
      "Describing places",
      "Talk about a flat, a neighbourhood or a town.",
      "flat-viewing",
      [
        ["c'est bien situé", "it's well located", "say byeh(n) see-too-AY", "C'est bien situé, près du métro.", "It's well located, near the metro.", { tags: ["home", "descriptions"] }],
        ["c'est calme / bruyant", "it's quiet / noisy", "say KALM / broo-YON", "La rue est calme le soir.", "The street is quiet in the evening.", { tags: ["home", "descriptions"] }],
        ["il y a beaucoup de commerces", "there are lots of shops", "eel ya bo-koo duh ko-MAIRSS", "Il y a beaucoup de commerces dans le quartier.", "There are lots of shops in the area.", { tags: ["home"] }],
        ["c'est lumineux", "it's light / bright", "say loo-mee-NUH", "Le salon est très lumineux.", "The living room is very bright.", { tags: ["home", "descriptions"] }],
        ["ça donne sur", "it looks out onto", "sa don SOOR", "La chambre donne sur la cour.", "The bedroom looks onto the courtyard.", { tags: ["home"] }],
        ["au premier étage", "on the first floor", "o pruh-myay ay-TAHZH", "C'est au troisième étage, avec ascenseur.", "It's on the third floor, with a lift.", { tags: ["home", "numbers"] }],
        ["les charges sont comprises ?", "are the bills included?", "lay SHARZH son kom-PREEZ", "Le loyer, les charges sont comprises ?", "The rent, are the bills included?", { tags: ["home", "money", "questions"] }],
        ["c'est libre à partir de quand ?", "when is it available from?", "say LEEBR a par-teer duh KON", "C'est libre à partir de quand ?", "From when is it available?", { tags: ["home", "questions"] }],
      ],
    ),

    day(
      53,
      "Describing people and things you've lost",
      "Give a description precise enough to be useful.",
      "lost-property",
      [
        ["il est grand, brun", "he's tall, dark-haired", "eel ay GRON, BRUH(n)", "Il est grand, brun, avec des lunettes.", "He's tall, dark-haired, with glasses.", { tags: ["descriptions", "people"] }],
        ["elle a les cheveux longs", "she has long hair", "el a lay shuh-VUH LON", "Elle a les cheveux longs et blonds.", "She has long blonde hair.", { tags: ["descriptions", "people"] }],
        ["un sac noir en cuir", "a black leather bag", "uh(n) sak NWAR on KWEER", "C'est un sac noir en cuir, assez grand.", "It's a black leather bag, fairly big.", { note: "Say the colour first, then the material with en: un sac noir en cuir.", tags: ["descriptions"] }],
        ["il y avait dedans", "inside there was", "eel ya-veh duh-DON", "Il y avait mon passeport dedans.", "My passport was inside.", { tags: ["descriptions", "past"] }],
        ["de taille moyenne", "medium-sized", "duh tye mwa-YEN", "C'est une valise de taille moyenne.", "It's a medium-sized suitcase.", { tags: ["descriptions"] }],
        ["à peu près", "roughly / about", "a puh PREH", "À peu près trente centimètres.", "About thirty centimetres.", { tags: ["descriptions"] }],
        ["ça ressemble à", "it looks like", "sa ruh-SOMBL a", "Ça ressemble à un sac de sport.", "It looks like a sports bag.", { tags: ["descriptions"] }],
        ["rouge, bleu, vert, noir", "red, blue, green, black", "ROOZH, BLUH, VAIR, NWAR", "La voiture est bleu foncé.", "The car is dark blue.", { tags: ["colours"] }],
      ],
    ),

    day(
      54,
      "Giving an opinion",
      "Say what you think and back it up in one sentence.",
      "disagree-politely",
      [
        ["je pense que", "I think that", "zhuh ponss kuh", "Je pense que c'est une bonne idée.", "I think it's a good idea.", { tags: ["opinions"] }],
        ["à mon avis", "in my opinion", "a mon-na-VEE", "À mon avis, c'est trop cher.", "In my opinion, it's too expensive.", { tags: ["opinions"] }],
        ["je trouve que", "I find that", "zhuh troov kuh", "Je trouve que c'est un peu petit.", "I find it a bit small.", { tip: "More natural than je pense for reactions to things.", tags: ["opinions"] }],
        ["ça vaut le coup", "it's worth it", "sa vo luh KOO", "Pour le prix, ça vaut le coup.", "For the price, it's worth it.", { tags: ["opinions"] }],
        ["ça m'étonne", "that surprises me", "sa may-TON", "Ça m'étonne, il est toujours à l'heure.", "That surprises me, he's always on time.", { tags: ["opinions", "reactions"] }],
        ["ça dépend de", "it depends on", "sa day-pon duh", "Ça dépend du prix, surtout.", "It depends on the price, mainly.", { tags: ["opinions"] }],
        ["surtout", "especially / above all", "soor-TOO", "Surtout le week-end, c'est plein.", "Especially at the weekend, it's packed.", { tags: ["connectors"] }],
        ["par contre", "on the other hand", "par KONTR", "C'est cher, par contre c'est très bien situé.", "It's expensive, on the other hand it's very well located.", { tags: ["connectors"] }],
      ],
    ),

    day(
      55,
      "Comparing",
      "Say better, worse, more and less.",
      "post-office",
      [
        ["plus … que", "more … than", "PLOO … kuh", "C'est plus rapide que le bus.", "It's faster than the bus.", { tags: ["comparisons"] }],
        ["moins … que", "less … than", "MWAN … kuh", "C'est moins cher que l'autre.", "It's cheaper than the other one.", { tags: ["comparisons"] }],
        ["aussi … que", "as … as", "o-SEE … kuh", "C'est aussi bon que chez toi.", "It's as good as at your place.", { tags: ["comparisons"] }],
        ["meilleur", "better (quality)", "may-YUHR", "Ce vin est meilleur que l'autre.", "This wine is better than the other.", { note: "For quality use meilleur; for how you do something use mieux.", tags: ["comparisons"] }],
        ["mieux", "better (how something is done)", "MYUH", "Ça marche mieux comme ça.", "It works better like that.", { tags: ["comparisons"] }],
        ["le plus / le moins", "the most / the least", "luh PLOO / luh MWAN", "C'est l'option la plus rapide.", "It's the fastest option.", { tags: ["comparisons"] }],
        ["ça revient au même", "it comes to the same thing", "sa ruh-vyeh(n) o MEM", "Les deux, ça revient au même.", "Either way, it's the same.", { tags: ["comparisons"] }],
        ["quelle est la différence ?", "what's the difference?", "kel ay la dee-fay-RONSS", "Quelle est la différence entre les deux ?", "What's the difference between the two?", { tags: ["questions", "comparisons"] }],
      ],
    ),

    day(
      56,
      "Week 8 test",
      "Describe a flat, compare two options, and say which you'd choose and why.",
      "flat-viewing",
      [
        ["ce qui me plaît, c'est", "what I like is", "suh kee muh PLEH say", "Ce qui me plaît, c'est la lumière.", "What I like is the light.", { tags: ["opinions"] }],
        ["ce qui m'embête, c'est", "what bothers me is", "suh kee mom-BET say", "Ce qui m'embête, c'est le bruit.", "What bothers me is the noise.", { tags: ["opinions"] }],
        ["à première vue", "at first sight", "a pruh-myair VOO", "À première vue, ça me convient.", "At first sight, it suits me.", { tags: ["opinions"] }],
        ["je suis intéressé", "I'm interested", "zhuh swee-zan-tay-res-SAY", "Je suis très intéressé, on peut en parler ?", "I'm very interested, can we discuss it?", { tags: ["opinions"] }],
        ["je vous tiens au courant", "I'll keep you posted", "zhuh voo tyeh(n) o koo-RON", "Je vous tiens au courant demain.", "I'll let you know tomorrow.", { tags: ["politeness"] }],
        ["ça correspond à ce que je cherche", "it matches what I'm looking for", "sa ko-res-PON a suh kuh zhuh SHAIRSH", "Ça correspond exactement à ce que je cherche.", "It matches exactly what I'm looking for.", { tags: ["opinions"] }],
        ["il faudrait que je réfléchisse", "I'd need to think about it", "eel fo-DREH kuh zhuh ray-flay-SHEESS", "Il faudrait que je réfléchisse un peu.", "I'd need to think about it a bit.", { tags: ["politeness"] }],
        ["c'est noté, merci", "noted, thanks", "say no-TAY", "C'est noté, merci pour la visite.", "Noted, thanks for the viewing.", { tags: ["politeness"] }],
      ],
    ),
  ],
);
