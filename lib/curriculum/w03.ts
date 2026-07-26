import { day, week } from "./build";

export const W03 = week(
  3,
  "You, them, and asking questions",
  "You can introduce yourself, say where you're from and what you do, and ask a stranger about themselves.",
  [
    day(
      15,
      "Introducing yourself",
      "Give your name, where you're from, and why you're in France.",
      "dinner-party",
      [
        ["je m'appelle", "my name is", "zhuh ma-PEL", "Bonjour, je m'appelle Will.", "Hello, my name is Will.", { tags: ["introductions"] }],
        ["enchanté", "nice to meet you", "on-shon-TAY", "Enchanté, moi c'est Marie.", "Nice to meet you, I'm Marie.", { note: "Women write it enchantée; it sounds exactly the same.", tags: ["introductions"] }],
        ["je suis", "I am", "zhuh SWEE", "Je suis anglais.", "I'm English.", { tags: ["core"] }],
        ["je viens de", "I'm from", "zhuh vyeh(n) duh", "Je viens de Londres.", "I'm from London.", { tags: ["introductions"] }],
        ["j'habite à", "I live in", "zha-BEET a", "J'habite à Lyon depuis un an.", "I've lived in Lyon for a year.", { tags: ["introductions"] }],
        ["je travaille dans", "I work in", "zhuh tra-VYE don", "Je travaille dans l'informatique.", "I work in IT.", { tags: ["work"] }],
        ["et vous, vous faites quoi ?", "and you, what do you do?", "ay voo, voo fet KWAH", "Et vous, vous faites quoi dans la vie ?", "And you, what do you do for a living?", { tags: ["work", "questions"] }],
        ["moi, c'est …", "I'm … (casual)", "MWAH say", "Moi, c'est Julien.", "I'm Julien.", { tags: ["introductions"] }],
      ],
    ),

    day(
      16,
      "The six question words",
      "Ask anything with où, quand, comment, pourquoi, combien, qui.",
      "flat-viewing",
      [
        ["où", "where", "OO", "Où est la gare, s'il vous plaît ?", "Where is the station, please?", { tags: ["questions"] }],
        ["quand", "when", "KON", "Quand est-ce que ça ouvre ?", "When does it open?", { tags: ["questions"] }],
        ["comment", "how", "ko-MON", "Comment ça marche ?", "How does it work?", { tags: ["questions"] }],
        ["pourquoi", "why", "poor-KWAH", "Pourquoi c'est fermé ?", "Why is it closed?", { tags: ["questions"] }],
        ["combien", "how much / how many", "kom-BYEH(n)", "Combien de temps, à peu près ?", "How long, roughly?", { tags: ["questions"] }],
        ["qui", "who", "KEE", "C'est qui, la dame là-bas ?", "Who's that lady over there?", { tags: ["questions"] }],
        ["est-ce que …", "turns any statement into a question", "ess-kuh", "Est-ce que vous êtes ouvert le dimanche ?", "Are you open on Sunday?", { note: "Put est-ce que in front of a normal sentence and it becomes a question with no other changes.", tags: ["questions"] }],
        ["quoi ?", "what? (casual)", "KWAH", "Tu fais quoi ce soir ?", "What are you doing tonight?", { tip: "In speech, French usually puts quoi at the end, not the start.", tags: ["questions"] }],
      ],
    ),

    day(
      17,
      "Être and avoir — the two verbs you can't avoid",
      "Say what you are and what you have in every person.",
      "small-talk-work",
      [
        ["je suis / tu es / il est", "I am / you are / he is", "zhuh SWEE / too AY / eel AY", "Je suis fatigué, il est en retard.", "I'm tired, he's late.", { tags: ["verbs"] }],
        ["nous sommes / vous êtes / ils sont", "we are / you are / they are", "noo SOM / voo-ZET / eel SON", "Vous êtes d'ici ?", "Are you from around here?", { tags: ["verbs"] }],
        ["j'ai / tu as / il a", "I have / you have / he has", "ZHAY / too AH / eel AH", "J'ai deux enfants.", "I have two children.", { tags: ["verbs"] }],
        ["nous avons / vous avez / ils ont", "we have / you have / they have", "noo-za-VON / voo-za-VAY / eel-ZON", "Vous avez l'heure ?", "Do you have the time?", { tags: ["verbs"] }],
        ["j'ai … ans", "I'm … years old", "zhay … ON", "J'ai trente-cinq ans.", "I'm thirty-five.", { note: "French says you 'have' your age, so never use je suis for it.", tags: ["introductions"] }],
        ["j'ai faim / j'ai soif", "I'm hungry / thirsty", "zhay FA(n) / zhay SWAF", "J'ai faim, on mange ?", "I'm hungry, shall we eat?", { note: "Hunger, thirst, heat, cold and fear all use avoir, not être.", tags: ["body"] }],
        ["j'ai chaud / j'ai froid", "I'm hot / cold", "zhay SHO / zhay FRWAH", "J'ai froid, tu peux fermer la fenêtre ?", "I'm cold, can you close the window?", { tags: ["body"] }],
        ["je suis désolé", "I'm sorry", "zhuh swee day-zo-LAY", "Je suis vraiment désolé.", "I'm really sorry.", { tags: ["politeness"] }],
      ],
    ),

    day(
      18,
      "Talking about people",
      "Refer to your family, friends and colleagues.",
      "job-chat",
      [
        ["ma femme / mon mari", "my wife / my husband", "ma FAM / mon ma-REE", "Ma femme travaille à Paris.", "My wife works in Paris.", { tags: ["family"] }],
        ["mon copain / ma copine", "my boyfriend / girlfriend (or mate)", "mon ko-PA(n) / ma ko-PEEN", "Je viens avec ma copine.", "I'm coming with my girlfriend.", { tags: ["family"] }],
        ["mes enfants", "my children", "may-zon-FON", "Mes enfants sont à l'école ici.", "My children go to school here.", { tags: ["family"] }],
        ["mes parents", "my parents", "may pa-RON", "Mes parents viennent le mois prochain.", "My parents are coming next month.", { tags: ["family"] }],
        ["un collègue / une collègue", "a colleague", "uh(n) ko-LEG", "C'est un collègue de bureau.", "He's a colleague from the office.", { tags: ["work"] }],
        ["un ami / une amie", "a friend", "uh(n)-na-MEE", "Je dîne avec des amis ce soir.", "I'm having dinner with friends tonight.", { tags: ["social"] }],
        ["mon / ma / mes", "my (m / f / plural)", "MON / MA / MAY", "Mon frère, ma sœur, mes cousins.", "My brother, my sister, my cousins.", { note: "The word for 'my' matches the thing owned, not you — so a man still says ma sœur.", tags: ["core"] }],
        ["quelqu'un", "someone", "kel-KUH(n)", "Il y a quelqu'un à la porte.", "There's someone at the door.", { tags: ["core"] }],
      ],
    ),

    day(
      19,
      "Liking and wanting",
      "Say what you like, prefer and want, and ask the same back.",
      "invite-dinner",
      [
        ["j'aime", "I like / I love", "ZHEM", "J'aime beaucoup ce quartier.", "I really like this neighbourhood.", { tags: ["opinions"] }],
        ["j'aime bien", "I quite like", "zhem BYEH(n)", "J'aime bien le vin rouge.", "I quite like red wine.", { note: "Adding bien softens it — j'aime bien Marie is friendly, j'aime Marie is a declaration of love.", tags: ["opinions"] }],
        ["je n'aime pas", "I don't like", "zhuh nem PAH", "Je n'aime pas trop le poisson.", "I don't really like fish.", { tags: ["opinions"] }],
        ["je préfère", "I prefer", "zhuh pray-FAIR", "Je préfère y aller demain.", "I'd rather go tomorrow.", { tags: ["opinions"] }],
        ["je veux bien", "yes please / I'd be happy to", "zhuh vuh BYEH(n)", "— Un café ? — Je veux bien, merci.", "— A coffee? — Yes please, thanks.", { tags: ["politeness"] }],
        ["ça me plaît", "I like it (it pleases me)", "sa muh PLEH", "Ce quartier me plaît beaucoup.", "I like this neighbourhood a lot.", { tags: ["opinions"] }],
        ["ça te dit ?", "does that appeal to you?", "sa tuh DEE", "Un ciné ce soir, ça te dit ?", "A film tonight, fancy it?", { tags: ["social", "invitations"] }],
        ["j'ai envie de", "I feel like", "zhay on-VEE duh", "J'ai envie d'un chocolat chaud.", "I feel like a hot chocolate.", { tags: ["opinions"] }],
      ],
    ),

    day(
      20,
      "Small talk that goes somewhere",
      "Keep a conversation alive for two minutes with a stranger.",
      "small-talk-work",
      [
        ["il fait beau", "the weather's nice", "eel fay BO", "Il fait beau aujourd'hui, non ?", "Nice weather today, isn't it?", { note: "Weather uses il fait, never il est.", tags: ["small talk"] }],
        ["il fait froid / chaud", "it's cold / hot", "eel fay FRWAH / SHO", "Il fait froid ce matin.", "It's cold this morning.", { tags: ["small talk"] }],
        ["vous êtes d'ici ?", "are you from around here?", "voo-zet dee-SEE", "Vous êtes d'ici, vous ?", "Are you from around here?", { tags: ["small talk", "questions"] }],
        ["ça fait longtemps ?", "have you been here long?", "sa fay lon-TON", "Vous êtes à Paris depuis longtemps ?", "Have you been in Paris long?", { tags: ["small talk"] }],
        ["c'est sympa", "it's nice / friendly", "say sam-PAH", "C'est sympa comme quartier.", "It's a nice neighbourhood.", { tags: ["opinions"] }],
        ["ah bon ?", "oh really?", "ah BON", "— Je suis arrivé hier. — Ah bon ?", "— I arrived yesterday. — Oh really?", { tip: "The single most useful reaction in French. Use it constantly.", tags: ["reactions"] }],
        ["c'est vrai ?", "really? / is that right?", "say VREH", "C'est vrai ? Je ne savais pas.", "Really? I didn't know.", { tags: ["reactions"] }],
        ["bon, je vous laisse", "right, I'll let you go", "BON zhuh voo LESS", "Bon, je vous laisse, bonne journée !", "Right, I'll let you go, have a good day!", { tip: "The standard polite way to end a chat without being abrupt.", tags: ["small talk"] }],
      ],
    ),

    day(
      21,
      "Week 3 test",
      "Introduce yourself to a stranger and keep the conversation going both ways.",
      "job-chat",
      [
        ["ça consiste en quoi ?", "what does that involve?", "sa kon-SEEST on KWAH", "Vous êtes consultant ? Ça consiste en quoi ?", "You're a consultant? What does that involve?", { tags: ["work", "questions"] }],
        ["en gros", "basically / roughly", "on GRO", "En gros, j'aide les entreprises à vendre en ligne.", "Basically, I help companies sell online.", { tags: ["explaining"] }],
        ["c'est-à-dire", "that is to say", "say-ta-DEER", "C'est-à-dire que je voyage beaucoup.", "Which means I travel a lot.", { tags: ["explaining"] }],
        ["par exemple", "for example", "par eg-ZOMPL", "Par exemple, hier j'étais à Lille.", "For example, yesterday I was in Lille.", { tags: ["explaining"] }],
        ["ça dépend", "it depends", "sa day-PON", "Ça dépend des jours.", "It depends on the day.", { tags: ["core"] }],
        ["je dirais que", "I'd say that", "zhuh dee-REH kuh", "Je dirais que c'est plutôt calme.", "I'd say it's fairly quiet.", { tags: ["opinions"] }],
        ["et sinon", "and otherwise / anyway", "ay see-NON", "Et sinon, vous faites quoi ce week-end ?", "Anyway, what are you doing this weekend?", { tip: "Perfect for changing subject without an awkward pause.", tags: ["connectors"] }],
        ["ça me fait plaisir", "that makes me happy / it's a pleasure", "sa muh fay play-ZEER", "Ça me fait plaisir de vous rencontrer.", "It's a pleasure to meet you.", { tags: ["politeness"] }],
      ],
    ),
  ],
);
