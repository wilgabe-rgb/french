import { day, week } from "./build";

export const W05 = week(
  5,
  "Getting around",
  "You can find anything, follow spoken directions, and use every kind of transport.",
  [
    day(
      29,
      "Where things are",
      "Ask where something is and understand the answer.",
      "directions",
      [
        ["où est … ?", "where is …?", "oo ay", "Où est la gare, s'il vous plaît ?", "Where's the station, please?", { tags: ["directions"] }],
        ["il y a … près d'ici ?", "is there a … near here?", "eel ya … preh dee-SEE", "Il y a une pharmacie près d'ici ?", "Is there a pharmacy near here?", { tip: "Il y a is said 'ee-ya' at normal speed.", tags: ["directions"] }],
        ["à côté de", "next to", "a ko-tay duh", "C'est à côté de la boulangerie.", "It's next to the bakery.", { tags: ["directions"] }],
        ["en face de", "opposite", "on fass duh", "La banque est en face de l'église.", "The bank is opposite the church.", { tags: ["directions"] }],
        ["au coin de", "on the corner of", "o kwan duh", "C'est au coin de la rue.", "It's on the corner of the street.", { tags: ["directions"] }],
        ["derrière / devant", "behind / in front of", "dair-YAIR / duh-VON", "Le parking est derrière l'immeuble.", "The car park is behind the building.", { tags: ["directions"] }],
        ["loin / près", "far / near", "LWA(n) / PREH", "Ce n'est pas loin, cinq minutes à pied.", "It's not far, five minutes on foot.", { tags: ["directions"] }],
        ["là-bas", "over there", "la-BAH", "C'est là-bas, au bout de la rue.", "It's over there, at the end of the street.", { tags: ["directions"] }],
      ],
    ),

    day(
      30,
      "Following directions",
      "Understand a fast set of directions the first time.",
      "directions",
      [
        ["tout droit", "straight ahead", "too DRWAH", "Continuez tout droit sur cent mètres.", "Keep going straight for a hundred metres.", { tip: "tout droit = straight on; à droite = to the right. Different words.", tags: ["directions"] }],
        ["à droite / à gauche", "to the right / to the left", "a DRWAT / a GOSH", "Tournez à gauche après le feu.", "Turn left after the lights.", { tags: ["directions"] }],
        ["tournez", "turn", "toor-NAY", "Tournez à droite au carrefour.", "Turn right at the crossroads.", { tags: ["directions"] }],
        ["continuez", "keep going", "kon-tee-noo-AY", "Continuez jusqu'à la place.", "Keep going until the square.", { tags: ["directions"] }],
        ["traversez", "cross", "tra-vair-SAY", "Traversez la rue, c'est en face.", "Cross the street, it's opposite.", { tags: ["directions"] }],
        ["jusqu'à", "as far as / until", "zhoos-KA", "Allez jusqu'au bout de la rue.", "Go to the end of the street.", { tags: ["directions"] }],
        ["la première / la deuxième rue", "the first / second street", "la pruh-MYAIR / la duh-ZYEM roo", "Prenez la deuxième rue à droite.", "Take the second street on the right.", { tags: ["directions"] }],
        ["c'est à cinq minutes", "it's five minutes away", "say-ta sank mee-NOOT", "C'est à cinq minutes à pied.", "It's five minutes on foot.", { tags: ["directions", "time"] }],
      ],
    ),

    day(
      31,
      "Metro, bus and train",
      "Buy the right ticket and get on the right line.",
      "metro-ticket",
      [
        ["un ticket / un carnet", "a ticket / a book of tickets", "uh(n) tee-KEH / uh(n) kar-NEH", "Un carnet de dix, s'il vous plaît.", "A book of ten, please.", { tags: ["transport"] }],
        ["un aller simple / un aller-retour", "a single / a return", "uh(n) a-lay SAMPL / a-lay ruh-TOOR", "Un aller-retour pour Lyon.", "A return to Lyon.", { tags: ["transport"] }],
        ["quelle ligne ?", "which line?", "kel LEEN-yuh", "Pour Bastille, c'est quelle ligne ?", "For Bastille, which line is it?", { tags: ["transport", "questions"] }],
        ["il faut changer ?", "do I have to change?", "eel fo shon-ZHAY", "Il faut changer où ?", "Where do I have to change?", { tags: ["transport", "questions"] }],
        ["la correspondance", "the connection / interchange", "la ko-res-pon-DONSS", "La correspondance est à Châtelet.", "The connection is at Châtelet.", { tags: ["transport"] }],
        ["le quai / la voie", "the platform (metro / train)", "luh KAY / la VWAH", "Le train part voie douze.", "The train leaves from platform twelve.", { tags: ["transport"] }],
        ["ça va jusqu'où ?", "how far does it go?", "sa va zhoos-KOO", "Ce bus va jusqu'où ?", "How far does this bus go?", { tags: ["transport", "questions"] }],
        ["je descends où ?", "where do I get off?", "zhuh day-son OO", "Pour le musée, je descends où ?", "For the museum, where do I get off?", { tags: ["transport", "questions"] }],
      ],
    ),

    day(
      32,
      "Verbs of movement",
      "Say where you're going, coming from and how.",
      "directions",
      [
        ["je vais à", "I'm going to", "zhuh vay a", "Je vais à la gare.", "I'm going to the station.", { note: "à + le becomes au and à + les becomes aux: je vais au marché.", tags: ["verbs", "directions"] }],
        ["j'arrive", "I'm coming / almost there", "zha-REEV", "J'arrive dans deux minutes !", "I'll be there in two minutes!", { tags: ["verbs"] }],
        ["je pars", "I'm leaving", "zhuh PAR", "Je pars à sept heures.", "I'm leaving at seven.", { tags: ["verbs"] }],
        ["je rentre", "I'm heading home", "zhuh RONTR", "Je rentre après le travail.", "I'm heading home after work.", { tags: ["verbs"] }],
        ["je cherche", "I'm looking for", "zhuh SHAIRSH", "Je cherche la rue Victor Hugo.", "I'm looking for Victor Hugo street.", { tags: ["verbs", "directions"] }],
        ["à pied / en voiture / en bus", "on foot / by car / by bus", "a PYAY / on vwa-TOOR / on BOOSS", "J'y vais à pied, c'est plus rapide.", "I'll walk, it's faster.", { tags: ["transport"] }],
        ["on y va ?", "shall we go?", "on-nee VA", "Il est tard, on y va ?", "It's late, shall we go?", { tags: ["social"] }],
        ["je suis perdu", "I'm lost", "zhuh swee pair-DOO", "Excusez-moi, je suis perdu.", "Excuse me, I'm lost.", { tags: ["directions", "problems"] }],
      ],
    ),

    day(
      33,
      "Taxis, drivers and arrivals",
      "Get into a car and out at the right place.",
      "directions",
      [
        ["vous pouvez m'emmener à … ?", "can you take me to …?", "voo poo-vay mom-nay a", "Vous pouvez m'emmener à cette adresse ?", "Can you take me to this address?", { tags: ["transport"] }],
        ["c'est à quelle adresse ?", "what address is it?", "say-ta kel a-DRESS", "C'est à quelle adresse exactement ?", "What address exactly?", { tags: ["transport", "questions"] }],
        ["arrêtez-vous ici", "stop here", "a-ray-tay voo ee-SEE", "Vous pouvez vous arrêter ici, merci.", "You can stop here, thanks.", { tags: ["transport"] }],
        ["combien ça coûte ?", "how much does it cost?", "kom-byeh(n) sa KOOT", "Ça coûte combien jusqu'à l'aéroport ?", "How much is it to the airport?", { tags: ["money", "questions"] }],
        ["je suis pressé", "I'm in a hurry", "zhuh swee pres-SAY", "Je suis un peu pressé, désolé.", "I'm in a bit of a hurry, sorry.", { tags: ["time"] }],
        ["ça prend combien de temps ?", "how long does it take?", "sa pron kom-byeh(n) duh TOM", "Ça prend combien de temps, à peu près ?", "How long does it take, roughly?", { tags: ["time", "questions"] }],
        ["le coffre", "the boot / trunk", "luh KOFR", "Je peux mettre ma valise dans le coffre ?", "Can I put my case in the boot?", { tags: ["transport"] }],
        ["merci, bonne route", "thanks, safe drive", "mair-see bon ROOT", "Merci beaucoup, bonne route !", "Thanks a lot, safe drive!", { tags: ["politeness"] }],
      ],
    ),

    day(
      34,
      "When transport goes wrong",
      "Handle a delay, a cancellation or a wrong stop.",
      "train-delay",
      [
        ["le train est annulé", "the train is cancelled", "luh tran ay-ta-noo-LAY", "Mon train est annulé, qu'est-ce que je fais ?", "My train is cancelled, what do I do?", { tags: ["transport", "problems"] }],
        ["il y a du retard", "there's a delay", "eel ya doo ruh-TAR", "Il y a combien de retard ?", "How long is the delay?", { tags: ["transport", "problems"] }],
        ["le prochain est à quelle heure ?", "what time is the next one?", "luh pro-SHAN ay-ta kel UHR", "Le prochain train est à quelle heure ?", "What time is the next train?", { tags: ["transport", "questions"] }],
        ["je peux me faire rembourser ?", "can I get a refund?", "zhuh puh muh fair rom-boor-SAY", "Je peux me faire rembourser mon billet ?", "Can I get my ticket refunded?", { tags: ["money", "problems"] }],
        ["j'ai raté mon train", "I missed my train", "zhay ra-tay mon TRA(n)", "J'ai raté mon train, il y en a un autre ?", "I missed my train, is there another?", { tags: ["transport", "problems"] }],
        ["qu'est-ce qui se passe ?", "what's going on?", "kess-kee suh PASS", "Excusez-moi, qu'est-ce qui se passe ?", "Excuse me, what's happening?", { tags: ["questions", "problems"] }],
        ["c'est de quel côté ?", "which way is it?", "say duh kel ko-TAY", "La sortie, c'est de quel côté ?", "The exit, which way is it?", { tags: ["directions", "questions"] }],
        ["tant pis", "never mind / oh well", "ton PEE", "Tant pis, je prendrai le suivant.", "Never mind, I'll take the next one.", { tags: ["reactions"] }],
      ],
    ),

    day(
      35,
      "Week 5 test",
      "Get from A to B in an unfamiliar city, including one thing going wrong.",
      "train-delay",
      [
        ["vous pouvez me montrer sur la carte ?", "can you show me on the map?", "voo poo-vay muh mon-TRAY soor la KART", "Vous pouvez me montrer sur la carte ?", "Can you show me on the map?", { tags: ["directions"] }],
        ["je répète pour être sûr", "let me repeat to be sure", "zhuh ray-PET poor etr SOOR", "Je répète pour être sûr : deuxième à droite.", "Let me repeat to be sure: second on the right.", { tags: ["survival"] }],
        ["c'est bien par ici ?", "is it this way?", "say byeh(n) par ee-SEE", "La poste, c'est bien par ici ?", "The post office, is it this way?", { tags: ["directions", "questions"] }],
        ["je me suis trompé", "I made a mistake", "zhuh muh swee trom-PAY", "Je me suis trompé de bus.", "I got on the wrong bus.", { tags: ["problems"] }],
        ["c'est indiqué", "it's signposted", "say-tan-dee-KAY", "C'est indiqué à partir de la gare.", "It's signposted from the station.", { tags: ["directions"] }],
        ["ça vaut le coup", "it's worth it", "sa vo luh KOO", "Le détour vaut le coup.", "The detour is worth it.", { tags: ["opinions"] }],
        ["heureusement", "luckily", "uh-ruhz-MON", "Heureusement, il y avait un autre train.", "Luckily, there was another train.", { tags: ["connectors"] }],
        ["merci pour votre aide", "thanks for your help", "mair-see poor votr ED", "Merci beaucoup pour votre aide !", "Thanks a lot for your help!", { tags: ["politeness"] }],
      ],
    ),
  ],
);
