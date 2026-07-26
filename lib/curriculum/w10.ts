import { day, week } from "./build";

export const W10 = week(
  10,
  "Home and daily routine",
  "You can talk about your day, your flat and the small logistics of living somewhere.",
  [
    day(
      64,
      "Your daily routine",
      "Describe an ordinary day from waking to sleeping.",
      "small-talk-work",
      [
        ["je me lève", "I get up", "zhuh muh LEV", "Je me lève à sept heures.", "I get up at seven.", { note: "Verbs about doing something to yourself take an extra me: je me lève, je me couche.", tags: ["routine", "verbs"] }],
        ["je me douche", "I shower", "zhuh muh DOOSH", "Je me douche avant de partir.", "I shower before leaving.", { tags: ["routine"] }],
        ["je prends le petit-déjeuner", "I have breakfast", "zhuh pron luh puh-tee day-zhuh-NAY", "Je prends le petit-déjeuner vers huit heures.", "I have breakfast around eight.", { tags: ["routine", "food"] }],
        ["je vais au travail", "I go to work", "zhuh vay o tra-VYE", "Je vais au travail à vélo.", "I cycle to work.", { tags: ["routine", "work"] }],
        ["je déjeune", "I have lunch", "zhuh day-ZHUN", "Je déjeune souvent au bureau.", "I often have lunch at the office.", { tags: ["routine", "food"] }],
        ["je rentre chez moi", "I go home", "zhuh rontr shay MWAH", "Je rentre chez moi vers dix-huit heures.", "I go home around six.", { tags: ["routine"] }],
        ["je me couche", "I go to bed", "zhuh muh KOOSH", "Je me couche assez tôt en semaine.", "I go to bed fairly early on weekdays.", { tags: ["routine"] }],
        ["d'habitude", "usually", "da-bee-TOOD", "D'habitude, je marche.", "Usually, I walk.", { tags: ["routine", "time"] }],
      ],
    ),

    day(
      65,
      "Around the flat",
      "Name the rooms and the things that go wrong in them.",
      "landlord-problem",
      [
        ["la cuisine", "the kitchen", "la kwee-ZEEN", "La cuisine est petite mais pratique.", "The kitchen is small but practical.", { tags: ["home"] }],
        ["la salle de bain", "the bathroom", "la sal duh BA(n)", "Il y a un problème dans la salle de bain.", "There's a problem in the bathroom.", { tags: ["home"] }],
        ["la chambre", "the bedroom", "la SHOMBR", "La chambre donne sur la rue.", "The bedroom faces the street.", { tags: ["home"] }],
        ["le salon", "the living room", "luh sa-LON", "On mange dans le salon ce soir.", "We're eating in the living room tonight.", { tags: ["home"] }],
        ["le chauffage", "the heating", "luh sho-FAHZH", "Le chauffage ne marche plus.", "The heating has stopped working.", { tags: ["home", "problems"] }],
        ["la clé / le code", "the key / the entry code", "la KLAY / luh KOD", "J'ai oublié le code de l'immeuble.", "I've forgotten the building code.", { tags: ["home"] }],
        ["le gardien", "the building caretaker", "luh gar-DYA(n)", "Le gardien a un double des clés.", "The caretaker has a spare key.", { tags: ["home"] }],
        ["les poubelles", "the bins", "lay poo-BEL", "On sort les poubelles le mardi.", "We put the bins out on Tuesday.", { tags: ["home"] }],
      ],
    ),

    day(
      66,
      "Housework and errands",
      "Say what needs doing and who's doing it.",
      "small-talk-work",
      [
        ["faire les courses", "do the food shopping", "fair lay KOORSS", "Je fais les courses le samedi matin.", "I do the shopping on Saturday morning.", { tags: ["routine", "shopping"] }],
        ["faire la cuisine", "cook", "fair la kwee-ZEEN", "C'est moi qui fais la cuisine ce soir.", "I'm the one cooking tonight.", { tags: ["routine", "food"] }],
        ["faire le ménage", "clean the house", "fair luh may-NAHZH", "Il faut faire le ménage avant qu'ils arrivent.", "We need to clean before they arrive.", { tags: ["routine", "home"] }],
        ["faire la vaisselle", "do the washing-up", "fair la vay-SEL", "Je fais la vaisselle, tu ranges ?", "I'll wash up, you tidy?", { note: "A huge number of everyday chores use faire, so learn them as fixed phrases.", tags: ["routine", "home"] }],
        ["faire une lessive", "do a load of washing", "fair oon lay-SEEV", "Je vais faire une lessive ce soir.", "I'll do a wash tonight.", { tags: ["routine", "home"] }],
        ["ranger", "tidy up / put away", "ron-ZHAY", "Tu peux ranger la cuisine ?", "Can you tidy the kitchen?", { tags: ["routine", "home"] }],
        ["j'ai des trucs à faire", "I've got stuff to do", "zhay day TROOK a fair", "J'ai des trucs à faire ce matin.", "I've got stuff to do this morning.", { tip: "un truc = 'a thing' — the single most useful word when you forget a noun.", tags: ["routine"] }],
        ["c'est mon tour", "it's my turn", "say mon TOOR", "C'est mon tour de cuisiner.", "It's my turn to cook.", { tags: ["home", "social"] }],
      ],
    ),

    day(
      67,
      "Money and bills at home",
      "Talk about rent, bills and splitting costs.",
      "flat-viewing",
      [
        ["le loyer", "the rent", "luh lwa-YAY", "Le loyer, c'est neuf cents euros.", "The rent is nine hundred euros.", { tags: ["home", "money"] }],
        ["les charges", "the building/utility charges", "lay SHARZH", "Les charges sont en plus.", "The charges are on top.", { tags: ["home", "money"] }],
        ["une facture", "a bill / invoice", "oon fak-TOOR", "J'ai reçu une facture d'électricité énorme.", "I got a huge electricity bill.", { tags: ["home", "money"] }],
        ["un prélèvement", "a direct debit", "uh(n) pray-lev-MON", "C'est prélevé le cinq de chaque mois.", "It's taken on the fifth of each month.", { tags: ["money", "admin"] }],
        ["une caution", "a deposit", "oon ko-SYON", "La caution, c'est un mois de loyer.", "The deposit is one month's rent.", { tags: ["home", "money"] }],
        ["on partage", "we split it", "on par-TAHZH", "On partage les charges à deux.", "We split the bills between us.", { tags: ["money", "social"] }],
        ["tu me dois", "you owe me", "too muh DWAH", "Tu me dois vingt euros pour hier.", "You owe me twenty euros from yesterday.", { tags: ["money", "social"] }],
        ["je te rembourse", "I'll pay you back", "zhuh tuh rom-BOORSS", "Je te rembourse ce soir, promis.", "I'll pay you back tonight, promise.", { tags: ["money", "social"] }],
      ],
    ),

    day(
      68,
      "The internet, phone and deliveries",
      "Handle the modern logistics of living somewhere.",
      "phone-internet",
      [
        ["la wifi ne marche pas", "the wifi isn't working", "la wee-FEE nuh marsh PAH", "La wifi ne marche pas depuis hier.", "The wifi hasn't worked since yesterday.", { tags: ["home", "problems"] }],
        ["le mot de passe", "the password", "luh mo duh PASS", "C'est quoi, le mot de passe wifi ?", "What's the wifi password?", { tags: ["home", "questions"] }],
        ["une livraison", "a delivery", "oon lee-vray-ZON", "La livraison est prévue demain matin.", "The delivery is due tomorrow morning.", { tags: ["home", "admin"] }],
        ["un colis", "a parcel", "uh(n) ko-LEE", "Mon colis n'est jamais arrivé.", "My parcel never arrived.", { tags: ["admin", "problems"] }],
        ["le facteur est passé ?", "has the postman been?", "luh fak-TUHR ay pa-SAY", "Le facteur est passé ce matin ?", "Has the postman been this morning?", { tags: ["home", "questions"] }],
        ["je serai absent", "I'll be out", "zhuh suh-RAY ab-SON", "Je serai absent entre midi et deux.", "I'll be out between twelve and two.", { tags: ["time"] }],
        ["vous pouvez laisser chez le voisin", "you can leave it with the neighbour", "voo poo-vay lay-SAY shay luh vwa-ZA(n)", "Vous pouvez le laisser chez le voisin.", "You can leave it with the neighbour.", { tags: ["home"] }],
        ["j'attends un colis", "I'm expecting a parcel", "zha-TON uh(n) ko-LEE", "J'attends un colis aujourd'hui.", "I'm expecting a parcel today.", { tags: ["home"] }],
      ],
    ),

    day(
      69,
      "Neighbours and building life",
      "Deal with the people you live above and below.",
      "greeting-neighbour",
      [
        ["mon voisin / ma voisine", "my neighbour (m / f)", "mon vwa-ZA(n) / ma vwa-ZEEN", "Mon voisin est très sympa.", "My neighbour is very nice.", { tags: ["home", "people"] }],
        ["ça vous dérange si … ?", "does it bother you if …?", "sa voo day-RONZH see", "Ça vous dérange si je mets de la musique ?", "Does it bother you if I put music on?", { tags: ["politeness", "questions"] }],
        ["c'est un peu bruyant", "it's a bit noisy", "say-tuh(n) puh broo-YON", "C'est un peu bruyant le soir, non ?", "It's a bit noisy in the evenings, isn't it?", { tags: ["home", "problems"] }],
        ["je vais faire des travaux", "I'm having work done", "zhuh vay fair day tra-VO", "Je vais faire des travaux la semaine prochaine.", "I'm having work done next week.", { tags: ["home"] }],
        ["désolé pour le bruit", "sorry about the noise", "day-zo-LAY poor luh BRWEE", "Désolé pour le bruit hier soir.", "Sorry about the noise last night.", { tags: ["politeness", "home"] }],
        ["ce n'est pas gênant", "it's not a bother", "suh nay pah zhay-NON", "Non, ce n'est pas gênant du tout.", "No, it's not a bother at all.", { tags: ["politeness"] }],
        ["on se croise souvent", "we run into each other often", "on suh krwaz soo-VON", "On se croise souvent le matin.", "We often run into each other in the morning.", { tags: ["social"] }],
        ["n'hésitez pas", "don't hesitate / feel free", "nay-zee-tay PAH", "N'hésitez pas si vous avez besoin.", "Don't hesitate if you need anything.", { tags: ["politeness"] }],
      ],
    ),

    day(
      70,
      "Week 10 test",
      "Explain your daily routine and sort out a domestic problem by phone.",
      "landlord-problem",
      [
        ["je vous explique", "let me explain", "zhuh voo-zeks-PLEEK", "Je vous explique la situation.", "Let me explain the situation.", { tags: ["explaining"] }],
        ["en fait", "actually / in fact", "on FET", "En fait, ça a commencé mardi.", "Actually, it started on Tuesday.", { tip: "French speakers say en fait constantly — it buys thinking time.", tags: ["fillers", "connectors"] }],
        ["comme je vous disais", "as I was saying", "kom zhuh voo dee-ZEH", "Comme je vous disais, c'est urgent.", "As I was saying, it's urgent.", { tags: ["connectors"] }],
        ["est-ce que ce serait possible … ?", "would it be possible …?", "ess-kuh suh suh-reh po-SEEBL", "Est-ce que ce serait possible aujourd'hui ?", "Would it be possible today?", { tags: ["politeness", "questions"] }],
        ["ça m'arrangerait", "that would really help me", "sa ma-ron-zhuh-REH", "Le matin, ça m'arrangerait.", "Mornings would really suit me.", { tags: ["politeness"] }],
        ["je compte sur vous", "I'm counting on you", "zhuh kont soor VOO", "Merci, je compte sur vous.", "Thanks, I'm counting on you.", { tags: ["insisting"] }],
        ["je vous rappelle demain", "I'll call you back tomorrow", "zhuh voo ra-PEL duh-MA(n)", "Je vous rappelle demain matin.", "I'll call you back tomorrow morning.", { tags: ["phone"] }],
        ["parfait, merci beaucoup", "perfect, thanks a lot", "par-FEH", "Parfait, merci beaucoup, au revoir.", "Perfect, thanks a lot, goodbye.", { tags: ["politeness"] }],
      ],
    ),
  ],
);
