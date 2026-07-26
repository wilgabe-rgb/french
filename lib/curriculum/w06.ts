import { day, week } from "./build";

export const W06 = week(
  6,
  "Eating and drinking properly",
  "You can handle a full restaurant meal, say what you can't eat, and react to food like a local.",
  [
    day(
      36,
      "Arriving at a restaurant",
      "Get a table and start the meal.",
      "restaurant-dinner",
      [
        ["une table pour deux", "a table for two", "oon tabl poor DUH", "Bonsoir, une table pour deux, s'il vous plaît.", "Good evening, a table for two, please.", { tags: ["restaurant"] }],
        ["j'ai réservé au nom de", "I have a booking under the name", "zhay ray-zair-VAY o nom duh", "J'ai réservé au nom de Will.", "I have a booking under Will.", { tags: ["restaurant"] }],
        ["en terrasse ou à l'intérieur ?", "outside or inside?", "on tay-RASS oo a lan-tay-RYUHR", "— En terrasse ou à l'intérieur ? — En terrasse, s'il vous plaît.", "— Outside or inside? — Outside, please.", { tags: ["restaurant", "listening"] }],
        ["la carte, s'il vous plaît", "the menu, please", "la KART", "On peut avoir la carte, s'il vous plaît ?", "Could we have the menu, please?", { note: "La carte is the menu; le menu is a fixed-price set meal — asking for le menu gets you the deal of the day.", tags: ["restaurant"] }],
        ["qu'est-ce que vous conseillez ?", "what do you recommend?", "kess-kuh voo kon-say-YAY", "Qu'est-ce que vous conseillez ce soir ?", "What do you recommend tonight?", { tags: ["restaurant", "questions"] }],
        ["c'est quoi exactement ?", "what exactly is it?", "say kwa eg-zak-tuh-MON", "Le plat du jour, c'est quoi exactement ?", "The dish of the day, what exactly is it?", { tags: ["restaurant", "questions"] }],
        ["une carafe d'eau", "a jug of tap water", "oon ka-RAF DO", "Une carafe d'eau, s'il vous plaît.", "A jug of tap water, please.", { tip: "Always free in France — ask for it by name or you'll be sold a bottle.", tags: ["restaurant"] }],
        ["on va prendre le menu", "we'll have the set menu", "on va prondr luh muh-NOO", "On va prendre le menu à vingt-cinq euros.", "We'll have the twenty-five euro set menu.", { tags: ["restaurant"] }],
      ],
    ),

    day(
      37,
      "Ordering the meal",
      "Order courses and answer the questions the server asks.",
      "restaurant-dinner",
      [
        ["une entrée / un plat / un dessert", "a starter / main / dessert", "oon on-TRAY / uh(n) PLAH / uh(n) day-SAIR", "En entrée, la soupe, et en plat, le poulet.", "For starters the soup, and the chicken as a main.", { tags: ["restaurant", "food"] }],
        ["pour moi, …", "for me, …", "poor MWAH", "Pour moi, le steak, s'il vous plaît.", "For me, the steak, please.", { tags: ["restaurant"] }],
        ["saignant / à point / bien cuit", "rare / medium / well done", "sen-YON / a PWA(n) / byeh(n) KWEE", "Un steak à point, s'il vous plaît.", "A steak medium, please.", { tags: ["restaurant", "food"] }],
        ["et comme boisson ?", "and to drink? (they'll ask)", "ay kom bwa-SON", "— Et comme boisson ? — Un verre de rouge.", "— And to drink? — A glass of red.", { tags: ["restaurant", "listening"] }],
        ["un verre / une bouteille", "a glass / a bottle", "uh(n) VAIR / oon boo-TAY", "Un verre de blanc, s'il vous plaît.", "A glass of white, please.", { tags: ["restaurant"] }],
        ["sans …", "without …", "SON", "Sans oignons, s'il vous plaît.", "Without onions, please.", { tags: ["restaurant", "food"] }],
        ["je suis allergique à", "I'm allergic to", "zhuh swee-za-lair-ZHEEK a", "Je suis allergique aux fruits de mer.", "I'm allergic to seafood.", { tags: ["food", "health"] }],
        ["je ne mange pas de …", "I don't eat …", "zhuh nuh monzh pah duh", "Je ne mange pas de viande.", "I don't eat meat.", { note: "After a negative, du/de la/des all collapse to de: pas de viande.", tags: ["food"] }],
      ],
    ),

    day(
      38,
      "Reacting to food",
      "Say what you think of what you're eating, naturally.",
      "dinner-party",
      [
        ["c'est délicieux", "it's delicious", "say day-lee-SYUH", "C'est vraiment délicieux, merci.", "It's really delicious, thank you.", { tags: ["opinions", "food"] }],
        ["c'est excellent", "it's excellent", "say-tek-say-LON", "Le poisson est excellent.", "The fish is excellent.", { tags: ["opinions", "food"] }],
        ["j'adore", "I love it", "zha-DOR", "J'adore ce plat, c'est quoi ?", "I love this dish, what is it?", { tags: ["opinions"] }],
        ["c'est trop bon", "it's so good (casual)", "say tro BON", "Cette tarte, c'est trop bon !", "This tart is so good!", { tags: ["opinions", "food"] }],
        ["c'est un peu trop salé", "it's a bit too salty", "say-tuh(n) puh tro sa-LAY", "C'est un peu trop salé pour moi.", "It's a bit too salty for me.", { tags: ["opinions", "food"] }],
        ["je n'ai plus faim", "I'm full", "zhuh nay ploo FA(n)", "Merci, je n'ai plus faim.", "Thanks, I'm full.", { tags: ["food"] }],
        ["c'était très bon, merci", "that was very good, thank you", "say-tay treh BON", "C'était très bon, merci beaucoup.", "That was very good, thank you very much.", { tags: ["politeness", "food"] }],
        ["encore un peu ? — non merci, ça ira", "more? — no thanks, I'm fine", "on-KOR uh(n) puh / sa ee-RA", "— Encore un peu ? — Non merci, ça ira.", "— A bit more? — No thanks, I'm fine.", { tags: ["food", "politeness"] }],
      ],
    ),

    day(
      39,
      "Problems at the table",
      "Fix an order that arrived wrong, politely.",
      "restaurant-dinner",
      [
        ["ce n'est pas ce que j'ai commandé", "this isn't what I ordered", "suh nay pah suh kuh zhay ko-mon-DAY", "Excusez-moi, ce n'est pas ce que j'ai commandé.", "Excuse me, this isn't what I ordered.", { tags: ["problems", "restaurant"] }],
        ["c'est froid", "it's cold", "say FRWAH", "Désolé, mais c'est froid.", "Sorry, but it's cold.", { tags: ["problems", "restaurant"] }],
        ["il manque …", "… is missing", "eel MONK", "Il manque le pain, s'il vous plaît.", "The bread is missing, please.", { tags: ["problems"] }],
        ["vous pouvez le réchauffer ?", "can you reheat it?", "voo poo-vay luh ray-sho-FAY", "Vous pouvez le réchauffer, s'il vous plaît ?", "Can you reheat it, please?", { tags: ["problems", "restaurant"] }],
        ["il y a une erreur sur l'addition", "there's a mistake on the bill", "eel ya oon ay-RUHR soor la-dee-SYON", "Je crois qu'il y a une erreur sur l'addition.", "I think there's a mistake on the bill.", { tags: ["problems", "money"] }],
        ["on peut payer séparément ?", "can we pay separately?", "on puh pay-yay say-pa-ray-MON", "On peut payer séparément, s'il vous plaît ?", "Can we pay separately, please?", { tags: ["money", "restaurant"] }],
        ["les toilettes, s'il vous plaît ?", "where's the toilet, please?", "lay twa-LET", "Les toilettes, s'il vous plaît ?", "The toilets, please?", { tags: ["restaurant"] }],
        ["je crois que", "I think that", "zhuh krwa kuh", "Je crois que ce n'est pas le bon plat.", "I think this isn't the right dish.", { tip: "Softens any complaint — French people complain by hedging first.", tags: ["opinions"] }],
      ],
    ),

    day(
      40,
      "Drinks, cafés and the apéro",
      "Order drinks in every setting and join a round.",
      "cafe-order",
      [
        ["un café / un crème / un noisette", "espresso / with milk / with a drop of milk", "uh(n) ka-FAY / uh(n) KREM / uh(n) nwa-ZET", "Un crème et un croissant, s'il vous plaît.", "A coffee with milk and a croissant, please.", { note: "Un café means a small black espresso — ask for un crème if you want milk.", tags: ["food", "restaurant"] }],
        ["une pression", "a draught beer", "oon pres-SYON", "Une pression, s'il vous plaît.", "A draught beer, please.", { tags: ["restaurant"] }],
        ["un verre de rouge / de blanc", "a glass of red / white", "uh(n) vair duh ROOZH / duh BLON", "Deux verres de rouge, s'il vous plaît.", "Two glasses of red, please.", { tags: ["restaurant"] }],
        ["on prend l'apéro ?", "shall we have a drink before dinner?", "on pron la-pay-RO", "On prend l'apéro à sept heures ?", "Shall we have an apéro at seven?", { tags: ["social"] }],
        ["santé !", "cheers!", "son-TAY", "Santé ! À la vôtre !", "Cheers! Your health!", { tags: ["social"] }],
        ["c'est ma tournée", "it's my round", "say ma toor-NAY", "Laisse, c'est ma tournée.", "Leave it, it's my round.", { tags: ["social", "money"] }],
        ["la même chose", "the same again", "la mem SHOHZ", "La même chose, s'il vous plaît.", "The same again, please.", { tags: ["restaurant"] }],
        ["l'addition, s'il vous plaît", "the bill, please", "la-dee-SYON", "L'addition, s'il vous plaît !", "The bill, please!", { tags: ["restaurant", "money"] }],
      ],
    ),

    day(
      41,
      "Being a guest",
      "Behave correctly at a French person's home.",
      "dinner-party",
      [
        ["merci de m'avoir invité", "thanks for inviting me", "mair-see duh ma-vwar an-vee-TAY", "Merci de m'avoir invité, c'était super.", "Thanks for inviting me, it was great.", { tags: ["politeness", "social"] }],
        ["j'ai apporté …", "I brought …", "zhay a-por-TAY", "J'ai apporté une bouteille de vin.", "I brought a bottle of wine.", { tags: ["social"] }],
        ["je peux aider ?", "can I help?", "zhuh puh ay-DAY", "Je peux aider avec quelque chose ?", "Can I help with anything?", { tags: ["social", "politeness"] }],
        ["c'est chez vous ?", "is this your place?", "say shay VOO", "C'est très joli chez vous.", "Your place is lovely.", { note: "chez + person means 'at someone's home': chez moi, chez Marie.", tags: ["home"] }],
        ["je vous présente …", "let me introduce you to …", "zhuh voo pray-ZONT", "Je te présente Marie, une collègue.", "This is Marie, a colleague.", { tags: ["introductions", "social"] }],
        ["ravi de vous rencontrer", "delighted to meet you", "ra-VEE duh voo ron-kon-TRAY", "Ravi de vous rencontrer enfin !", "Delighted to finally meet you!", { tags: ["introductions"] }],
        ["il faut que j'y aille", "I should get going", "eel fo kuh zhee AH-yuh", "Il est tard, il faut que j'y aille.", "It's late, I should get going.", { tags: ["social"] }],
        ["à refaire !", "let's do it again!", "a ruh-FAIR", "C'était génial, à refaire !", "That was great, let's do it again!", { tags: ["social"] }],
      ],
    ),

    day(
      42,
      "Week 6 test",
      "Run an entire restaurant evening including one thing going wrong.",
      "restaurant-dinner",
      [
        ["vous avez quelque chose sans gluten ?", "do you have anything gluten-free?", "voo-za-vay kel-kuh shohz son gloo-TEN", "Vous avez quelque chose sans gluten ?", "Do you have anything gluten-free?", { tags: ["food", "health"] }],
        ["c'est servi avec quoi ?", "what does it come with?", "say sair-VEE a-vek KWAH", "Le poulet, c'est servi avec quoi ?", "The chicken, what does it come with?", { tags: ["restaurant", "questions"] }],
        ["je vais commencer par", "I'll start with", "zhuh vay ko-mon-SAY par", "Je vais commencer par la salade.", "I'll start with the salad.", { tags: ["restaurant"] }],
        ["c'est copieux ?", "is it a big portion?", "say ko-PYUH", "C'est copieux, ce plat ?", "Is that dish filling?", { tags: ["restaurant", "questions"] }],
        ["on partage", "we'll share", "on par-TAHZH", "On partage l'entrée, si tu veux.", "We'll share the starter, if you like.", { tags: ["restaurant", "social"] }],
        ["un café pour finir", "a coffee to finish", "uh(n) ka-fay poor fee-NEER", "Un café pour finir, s'il vous plaît.", "A coffee to finish, please.", { tags: ["restaurant"] }],
        ["c'était parfait", "it was perfect", "say-tay par-FEH", "Merci, c'était parfait.", "Thanks, it was perfect.", { tags: ["opinions"] }],
        ["bonne soirée à vous aussi", "have a good evening too", "bon swa-ray a voo-zo-SEE", "Merci, bonne soirée à vous aussi !", "Thanks, have a good evening too!", { tags: ["politeness"] }],
      ],
    ),
  ],
);
