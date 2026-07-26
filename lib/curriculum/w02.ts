import { day, week } from "./build";

export const W02 = week(
  2,
  "Shops, quantities and money",
  "You can buy anything, in any quantity, and understand the price and the questions they ask you.",
  [
    day(
      8,
      "Quantities",
      "Ask for a specific amount of anything at a market or counter.",
      "market-stall",
      [
        [
          "un kilo de",
          "a kilo of",
          "uh(n) kee-LO duh",
          "Un kilo de tomates, s'il vous plaît.",
          "A kilo of tomatoes, please.",
          { note: "After a quantity you always use de with no article: un kilo de pommes, never des pommes.", tags: ["quantity", "food"] },
        ],
        ["une bouteille de", "a bottle of", "oon boo-TAY duh", "Une bouteille de vin rouge.", "A bottle of red wine.", { tags: ["quantity"] }],
        ["une tranche de", "a slice of", "oon TRONSH duh", "Deux tranches de jambon.", "Two slices of ham.", { tags: ["quantity", "food"] }],
        ["un morceau de", "a piece of", "uh(n) mor-SO duh", "Un morceau de fromage, pas trop gros.", "A piece of cheese, not too big.", { tags: ["quantity", "food"] }],
        ["une douzaine", "a dozen", "oon doo-ZEN", "Une douzaine d'œufs, s'il vous plaît.", "A dozen eggs, please.", { tags: ["quantity"] }],
        ["encore un peu", "a bit more", "on-KOR uh(n) puh", "Encore un peu, s'il vous plaît.", "A bit more, please.", { tags: ["quantity"] }],
        ["ça suffit", "that's enough", "sa soo-FEE", "Voilà, ça suffit, merci.", "There, that's enough, thanks.", { tags: ["quantity"] }],
        ["c'est pour combien de personnes ?", "how many people is it for? (they'll ask)", "say poor kom-byeh(n) duh pair-SON", "— C'est pour combien de personnes ? — Pour quatre.", "— For how many people? — For four.", { tags: ["listening", "food"] }],
      ],
    ),

    day(
      9,
      "Numbers 20–100 and real prices",
      "Catch a price said fast, including the awkward French seventies and nineties.",
      "supermarket",
      [
        ["vingt, trente, quarante", "20, 30, 40", "VAN, TRONT, ka-RONT", "Trente euros, s'il vous plaît.", "Thirty euros, please.", { tags: ["numbers"] }],
        ["cinquante, soixante", "50, 60", "san-KONT, swa-SONT", "Soixante euros exactement.", "Sixty euros exactly.", { tags: ["numbers"] }],
        ["soixante-dix", "70 (literally 'sixty-ten')", "swa-sont-DEESS", "Ça fait soixante-dix euros.", "That comes to seventy euros.", { note: "French has no word for seventy, so it counts 60+10 up to 79.", tags: ["numbers"] }],
        ["quatre-vingts", "80 (literally 'four twenties')", "katr-VAN", "Quatre-vingts euros, par carte ?", "Eighty euros, by card?", { tags: ["numbers"] }],
        ["quatre-vingt-dix", "90 ('four twenties ten')", "katr-van-DEESS", "Quatre-vingt-dix-neuf centimes.", "Ninety-nine cents.", { tags: ["numbers"] }],
        ["cent", "100", "SON", "Cent euros, ça ira.", "A hundred euros, that'll do.", { tip: "The T is silent.", tags: ["numbers"] }],
        ["… euros … centimes", "… euros … cents", "uh-RO … son-TEEM", "Douze euros quarante.", "Twelve euros forty.", { note: "Prices are usually said with the word euro in the middle and the cents bare: douze euros quarante.", tags: ["money"] }],
        ["c'est un peu cher", "that's a bit expensive", "say-tuh(n) puh SHAIR", "C'est un peu cher pour moi.", "That's a bit expensive for me.", { tags: ["money", "opinions"] }],
      ],
    ),

    day(
      10,
      "This one, that one, choosing",
      "Point at things and choose without knowing the word for them.",
      "market-stall",
      [
        ["celui-là / celle-là", "that one (m / f)", "suh-lwee-LAH / sel-LAH", "Je prends celui-là, s'il vous plaît.", "I'll take that one, please.", { tags: ["pointing"] }],
        ["ce / cette", "this (m / f)", "SUH / SET", "Cette veste est très jolie.", "This jacket is very nice.", { tags: ["pointing"] }],
        ["comme ça", "like that", "kom SAH", "Oui, comme ça, parfait.", "Yes, like that, perfect.", { tags: ["pointing"] }],
        ["lequel ?", "which one?", "luh-KEL", "Lequel vous préférez ?", "Which one do you prefer?", { tags: ["questions"] }],
        ["autre chose", "something else", "OTR shohz", "Je voudrais autre chose.", "I'd like something else.", { tags: ["shopping"] }],
        ["le même", "the same one", "luh MEM", "Je prends le même, s'il vous plaît.", "I'll have the same, please.", { tags: ["shopping"] }],
        ["il m'en faut deux", "I need two of them", "eel mon fo DUH", "Il m'en faut deux, s'il vous plaît.", "I need two of them, please.", { tags: ["shopping"] }],
        ["vous en avez d'autres ?", "do you have others?", "voo-zon-a-vay DOTR", "Vous en avez d'autres, en bleu ?", "Do you have others, in blue?", { tags: ["shopping"] }],
      ],
    ),

    day(
      11,
      "The things you buy every week",
      "Name the twenty items that make up most of a French shopping basket.",
      "supermarket",
      [
        ["le pain", "bread", "luh PA(n)", "Je vais chercher du pain.", "I'm going to get some bread.", { tags: ["food"] }],
        ["le lait", "milk", "luh LEH", "Il n'y a plus de lait.", "There's no milk left.", { tags: ["food"] }],
        ["les œufs", "eggs", "lay-ZUH", "Il me faut des œufs.", "I need some eggs.", { tip: "Singular un œuf = 'uh(n) UHF', plural les œufs = 'lay-ZUH' — the F disappears.", tags: ["food"] }],
        ["le fromage", "cheese", "luh fro-MAHZH", "On prend du fromage pour ce soir ?", "Shall we get cheese for tonight?", { tags: ["food"] }],
        ["la viande / le poisson", "meat / fish", "la VYOND / luh pwa-SON", "Je ne mange pas de viande.", "I don't eat meat.", { tags: ["food"] }],
        ["les légumes / les fruits", "vegetables / fruit", "lay lay-GOOM / lay FRWEE", "Les fruits sont très bons ici.", "The fruit is very good here.", { tags: ["food"] }],
        ["du / de la / des", "some", "DOO / duh la / DAY", "Je voudrais du café et de la confiture.", "I'd like some coffee and some jam.", { note: "French can't drop 'some' the way English does, so you must say du, de la or des before the noun.", tags: ["core"] }],
        ["il me faut", "I need", "eel muh FO", "Il me faut du sucre et des œufs.", "I need sugar and eggs.", { tags: ["core"] }],
      ],
    ),

    day(
      12,
      "Saying no, politely",
      "Refuse, hesitate and change your mind without offending anyone.",
      "clothes-shop",
      [
        ["non merci", "no thank you", "non mair-SEE", "Non merci, c'est gentil.", "No thank you, that's kind.", { tags: ["politeness"] }],
        ["je regarde juste", "I'm just looking", "zhuh ruh-GARD zhoost", "Merci, je regarde juste.", "Thanks, I'm just looking.", { tags: ["shopping"] }],
        ["je vais réfléchir", "I'll think about it", "zhuh vay ray-flay-SHEER", "Merci, je vais réfléchir.", "Thanks, I'll think about it.", { tags: ["shopping"] }],
        ["peut-être plus tard", "maybe later", "puh-TETR ploo TAR", "Peut-être plus tard, merci.", "Maybe later, thanks.", { tags: ["politeness"] }],
        ["ce n'est pas grave", "it's no big deal", "suh nay pah GRAHV", "Ce n'est pas grave, ne vous inquiétez pas.", "It's no big deal, don't worry.", { tip: "Spoken: 'say pah grahv'.", tags: ["politeness"] }],
        ["finalement", "actually / in the end", "fee-nal-MON", "Finalement, je prends le rouge.", "Actually, I'll take the red one.", { tags: ["connectors"] }],
        ["je change d'avis", "I'm changing my mind", "zhuh shonzh da-VEE", "Désolé, je change d'avis.", "Sorry, I'm changing my mind.", { tags: ["shopping"] }],
        ["ça ne me va pas", "it doesn't suit me / doesn't fit", "sa nuh muh va PAH", "C'est joli mais ça ne me va pas.", "It's nice but it doesn't fit me.", { tags: ["shopping", "opinions"] }],
      ],
    ),

    day(
      13,
      "Understanding what they ask you",
      "Recognise the six questions French shop staff always ask.",
      "supermarket",
      [
        ["vous avez la carte de fidélité ?", "do you have the loyalty card?", "voo-za-vay la kart duh fee-day-lee-TAY", "— Vous avez la carte ? — Non, je n'en ai pas.", "— Do you have the card? — No, I don't.", { tags: ["listening", "shopping"] }],
        ["vous voulez un sac ?", "do you want a bag?", "voo voo-lay uh(n) SAK", "— Vous voulez un sac ? — Non merci, j'en ai un.", "— Want a bag? — No thanks, I have one.", { tags: ["listening", "shopping"] }],
        ["vous payez comment ?", "how are you paying?", "voo pay-yay ko-MON", "— Vous payez comment ? — Par carte.", "— How are you paying? — By card.", { tags: ["listening", "money"] }],
        ["vous avez la monnaie ?", "do you have change?", "voo-za-vay la mo-NEH", "Désolé, je n'ai pas la monnaie.", "Sorry, I don't have change.", { tags: ["listening", "money"] }],
        ["ce sera tout ?", "will that be all?", "suh suh-RA TOO", "— Ce sera tout ? — Oui, c'est tout.", "— Will that be all? — Yes, that's all.", { tags: ["listening"] }],
        ["vous désirez ?", "what would you like?", "voo day-zee-RAY", "— Vous désirez ? — Une baguette, s'il vous plaît.", "— What would you like? — A baguette, please.", { tags: ["listening"] }],
        ["je n'en ai pas", "I don't have any", "zhuh non-ay PAH", "Non, je n'en ai pas, désolé.", "No, I don't have any, sorry.", { tags: ["core"] }],
        ["attendez", "hold on / wait", "a-ton-DAY", "Attendez, je cherche ma carte.", "Hold on, I'm looking for my card.", { tags: ["core"] }],
      ],
    ),

    day(
      14,
      "Week 2 test",
      "Run a full market and supermarket trip, prices included, without English.",
      "market-stall",
      [
        ["ils sont bons aujourd'hui ?", "are they good today?", "eel son BON o-zhoor-DWEE", "Les melons, ils sont bons aujourd'hui ?", "The melons, are they good today?", { tags: ["food", "questions"] }],
        ["c'est de saison ?", "is it in season?", "say duh say-ZON", "Les fraises, c'est de saison ?", "Strawberries, are they in season?", { tags: ["food"] }],
        ["je vous dois combien ?", "how much do I owe you?", "zhuh voo dwa kom-BYEH(n)", "Je vous dois combien en tout ?", "How much do I owe you in total?", { tags: ["money"] }],
        ["gardez la monnaie", "keep the change", "gar-day la mo-NEH", "Gardez la monnaie, merci.", "Keep the change, thanks.", { tags: ["money"] }],
        ["un sachet", "a small bag", "uh(n) sa-SHEH", "Vous pouvez me donner un sachet ?", "Can you give me a small bag?", { tags: ["shopping"] }],
        ["c'est frais", "it's fresh", "say FREH", "C'est frais, ça vient d'arriver.", "It's fresh, it's just arrived.", { tags: ["food"] }],
        ["à point", "just right / medium", "a PWA(n)", "Un avocat à point pour ce soir.", "An avocado that's ripe for tonight.", { tags: ["food"] }],
        ["merci, à bientôt", "thanks, see you soon", "mair-see a byen-TO", "Merci, à bientôt !", "Thanks, see you soon!", { tags: ["greetings"] }],
      ],
    ),
  ],
);
