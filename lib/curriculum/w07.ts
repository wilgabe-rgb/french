import { day, week } from "./build";

export const W07 = week(
  7,
  "Talking about the past",
  "You can tell someone what you did — yesterday, last weekend, last year — and ask them the same.",
  [
    day(
      43,
      "The past tense, in one pattern",
      "Say what you did using avoir + past participle.",
      "small-talk-work",
      [
        ["j'ai mangé", "I ate / I have eaten", "zhay mon-ZHAY", "J'ai mangé au restaurant hier.", "I ate at a restaurant yesterday.", { note: "Most past sentences are j'ai + the verb ending in -é, and that one pattern covers the majority of what you'll say.", tags: ["past", "verbs"] }],
        ["j'ai travaillé", "I worked", "zhay tra-va-YAY", "J'ai travaillé tard hier soir.", "I worked late last night.", { tags: ["past", "work"] }],
        ["j'ai parlé avec", "I spoke with", "zhay par-LAY a-vek", "J'ai parlé avec le propriétaire.", "I spoke with the landlord.", { tags: ["past"] }],
        ["j'ai vu", "I saw", "zhay VOO", "J'ai vu un très bon film.", "I saw a really good film.", { tags: ["past"] }],
        ["j'ai fait", "I did / I made", "zhay FEH", "J'ai fait les courses ce matin.", "I did the shopping this morning.", { tags: ["past"] }],
        ["j'ai pris", "I took / I had", "zhay PREE", "J'ai pris le train de huit heures.", "I took the eight o'clock train.", { tags: ["past"] }],
        ["j'ai eu", "I had", "zhay OO", "J'ai eu un problème avec ma carte.", "I had a problem with my card.", { tags: ["past"] }],
        ["j'ai dit", "I said", "zhay DEE", "Je lui ai dit que j'arrivais.", "I told him I was on my way.", { tags: ["past"] }],
      ],
    ),

    day(
      44,
      "The going/coming past",
      "Use être for the handful of verbs that need it.",
      "catch-up-friend",
      [
        ["je suis allé", "I went", "zhuh swee-za-LAY", "Je suis allé à Bordeaux le week-end dernier.", "I went to Bordeaux last weekend.", { note: "A small set of movement verbs use je suis instead of j'ai, and then the ending agrees: allée if you're a woman.", tags: ["past", "verbs"] }],
        ["je suis parti", "I left", "zhuh swee par-TEE", "Je suis parti tôt ce matin.", "I left early this morning.", { tags: ["past"] }],
        ["je suis arrivé", "I arrived", "zhuh swee-za-ree-VAY", "Je suis arrivé il y a deux mois.", "I arrived two months ago.", { tags: ["past"] }],
        ["je suis resté", "I stayed", "zhuh swee res-TAY", "Je suis resté à la maison.", "I stayed at home.", { tags: ["past"] }],
        ["je suis rentré", "I got home / went back", "zhuh swee ron-TRAY", "Je suis rentré vers minuit.", "I got home around midnight.", { tags: ["past"] }],
        ["je suis né", "I was born", "zhuh swee NAY", "Je suis né à Manchester.", "I was born in Manchester.", { tags: ["past", "introductions"] }],
        ["on est sorti", "we went out", "on ay sor-TEE", "On est sorti avec des amis.", "We went out with friends.", { tip: "In speech, French says on where English says 'we'. Nous is for writing.", tags: ["past", "social"] }],
        ["il y a deux jours", "two days ago", "eel ya duh ZHOOR", "Je l'ai vu il y a deux jours.", "I saw him two days ago.", { tags: ["past", "time"] }],
      ],
    ),

    day(
      45,
      "Saying what you didn't do",
      "Negate the past without scrambling the word order.",
      "small-talk-work",
      [
        ["je n'ai pas …", "I didn't …", "zhuh nay PAH", "Je n'ai pas eu le temps.", "I didn't have time.", { note: "In the past, the pas goes between the ai and the verb: je n'ai pas mangé.", tags: ["past"] }],
        ["je n'ai rien fait", "I didn't do anything", "zhuh nay ryeh(n) FEH", "Ce week-end, je n'ai rien fait.", "This weekend I did nothing.", { tags: ["past"] }],
        ["je n'ai pas pu", "I couldn't", "zhuh nay pah POO", "Je n'ai pas pu venir, désolé.", "I couldn't come, sorry.", { tags: ["past"] }],
        ["je ne suis pas allé", "I didn't go", "zhuh nuh swee pah-za-LAY", "Je ne suis pas allé au bureau hier.", "I didn't go to the office yesterday.", { tags: ["past"] }],
        ["je n'ai jamais …", "I've never …", "zhuh nay zha-MEH", "Je n'ai jamais visité Marseille.", "I've never visited Marseille.", { tags: ["past"] }],
        ["pas encore", "not yet", "pah-zon-KOR", "— Tu as mangé ? — Pas encore.", "— Have you eaten? — Not yet.", { tags: ["past", "time"] }],
        ["j'ai oublié", "I forgot", "zhay oo-blee-YAY", "Désolé, j'ai complètement oublié.", "Sorry, I completely forgot.", { tags: ["past"] }],
        ["ça m'est sorti de la tête", "it slipped my mind", "sa may sor-TEE duh la TET", "Ça m'est complètement sorti de la tête.", "It completely slipped my mind.", { tags: ["past"] }],
      ],
    ),

    day(
      46,
      "Asking about their past",
      "Ask what someone did and follow up.",
      "small-talk-work",
      [
        ["tu as fait quoi ?", "what did you do?", "too a fay KWAH", "Tu as fait quoi ce week-end ?", "What did you do this weekend?", { tags: ["past", "questions"] }],
        ["vous avez passé un bon week-end ?", "did you have a good weekend?", "voo-za-vay pas-say uh(n) bon week-END", "Vous avez passé un bon week-end ?", "Did you have a good weekend?", { tags: ["past", "questions"] }],
        ["c'était comment ?", "how was it?", "say-tay ko-MON", "Ton voyage, c'était comment ?", "Your trip, how was it?", { tags: ["past", "questions"] }],
        ["tu es allé où ?", "where did you go?", "too ay a-lay OO", "Tu es allé où exactement ?", "Where did you go exactly?", { tags: ["past", "questions"] }],
        ["avec qui ?", "with who?", "a-vek KEE", "Tu y es allé avec qui ?", "Who did you go with?", { tags: ["questions"] }],
        ["et après ?", "and then?", "ay a-PREH", "Et après, vous avez fait quoi ?", "And then, what did you do?", { tags: ["questions", "connectors"] }],
        ["ça s'est bien passé ?", "did it go well?", "sa say byeh(n) pa-SAY", "L'entretien, ça s'est bien passé ?", "The interview, did it go well?", { tags: ["past", "questions"] }],
        ["raconte !", "tell me!", "ra-KONT", "Alors, raconte !", "So, tell me!", { tags: ["social"] }],
      ],
    ),

    day(
      47,
      "Reacting to what people say",
      "Sound like you're listening — the thing that makes conversation work.",
      "catch-up-friend",
      [
        ["c'est génial !", "that's great!", "say zhay-NYAL", "Ah, c'est génial, félicitations !", "Oh that's great, congratulations!", { tags: ["reactions"] }],
        ["ah oui ?", "oh yeah?", "ah WEE", "Ah oui ? Je ne savais pas.", "Oh yeah? I didn't know.", { tags: ["reactions"] }],
        ["oh là là", "wow / oh dear (both)", "o la LA", "Oh là là, quelle histoire !", "Wow, what a story!", { tip: "Tone decides whether it means 'amazing' or 'disaster'.", tags: ["reactions"] }],
        ["quel dommage", "what a shame", "kel do-MAHZH", "Quel dommage, j'aurais bien voulu venir.", "What a shame, I'd have liked to come.", { tags: ["reactions"] }],
        ["je comprends", "I understand", "zhuh kom-PRON", "Je comprends, ce n'est pas facile.", "I understand, it's not easy.", { tags: ["reactions"] }],
        ["tant mieux", "so much the better / good", "ton MYUH", "Tant mieux, ça s'est bien terminé !", "Good, it ended well!", { tags: ["reactions"] }],
        ["c'est pas de chance", "that's bad luck", "say pah duh SHONSS", "Oh, c'est pas de chance !", "Oh, that's rotten luck!", { tags: ["reactions"] }],
        ["et toi, alors ?", "and you then?", "ay TWAH a-LOR", "Et toi alors, quoi de neuf ?", "And what about you, what's new?", { tags: ["questions", "social"] }],
      ],
    ),

    day(
      48,
      "Telling a short story",
      "Chain three past events into something worth listening to.",
      "catch-up-friend",
      [
        ["d'abord", "first", "da-BOR", "D'abord, on est allé au marché.", "First, we went to the market.", { tags: ["connectors", "past"] }],
        ["ensuite", "then", "on-SWEET", "Ensuite, on a mangé sur la place.", "Then we ate on the square.", { tags: ["connectors", "past"] }],
        ["et puis", "and then", "ay PWEE", "Et puis on est rentré à pied.", "And then we walked home.", { tags: ["connectors", "past"] }],
        ["finalement", "in the end", "fee-nal-MON", "Finalement, c'était une très bonne journée.", "In the end, it was a really good day.", { tags: ["connectors"] }],
        ["du coup", "so / as a result", "doo KOO", "Il pleuvait, du coup on est resté.", "It was raining, so we stayed.", { tip: "Wildly overused by real French speakers. Use it and you sound native.", tags: ["connectors", "fillers"] }],
        ["c'était …", "it was …", "say-TAY", "C'était vraiment sympa.", "It was really nice.", { note: "Use c'était for describing how something was, and j'ai fait for what happened.", tags: ["past"] }],
        ["il y avait", "there was / there were", "eel ya-VEH", "Il y avait beaucoup de monde.", "There were a lot of people.", { tags: ["past"] }],
        ["bref", "anyway / long story short", "BREF", "Bref, on a passé une bonne soirée.", "Anyway, we had a good evening.", { tags: ["connectors", "fillers"] }],
      ],
    ),

    day(
      49,
      "Week 7 test",
      "Tell a two-minute story about your weekend and ask for theirs.",
      "catch-up-friend",
      [
        ["ça faisait longtemps !", "it's been ages!", "sa fuh-zay lon-TON", "Salut ! Ça faisait longtemps !", "Hi! It's been ages!", { tags: ["social", "greetings"] }],
        ["qu'est-ce que tu deviens ?", "what have you been up to?", "kess-kuh too duh-VYEH(n)", "Alors, qu'est-ce que tu deviens ?", "So, what have you been up to?", { tags: ["social", "questions"] }],
        ["j'ai changé de travail", "I changed jobs", "zhay shon-ZHAY duh tra-VYE", "J'ai changé de travail en janvier.", "I changed jobs in January.", { tags: ["past", "work"] }],
        ["j'ai déménagé", "I moved house", "zhay day-may-na-ZHAY", "J'ai déménagé il y a trois mois.", "I moved three months ago.", { tags: ["past", "home"] }],
        ["ça s'est bien passé, finalement", "it worked out in the end", "sa say byeh(n) pa-SAY", "C'était dur, mais ça s'est bien passé finalement.", "It was hard, but it worked out in the end.", { tags: ["past"] }],
        ["j'étais content", "I was happy", "zhay-tay kon-TON", "J'étais vraiment content du résultat.", "I was really happy with the result.", { tags: ["past", "opinions"] }],
        ["on se refait ça bientôt", "let's do this again soon", "on suh ruh-fay sa byen-TO", "On se refait ça bientôt !", "Let's do this again soon!", { tags: ["social"] }],
        ["je t'appelle", "I'll call you", "zhuh ta-PEL", "Je t'appelle la semaine prochaine.", "I'll call you next week.", { tags: ["social", "phone"] }],
      ],
    ),
  ],
);
