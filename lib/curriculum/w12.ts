import { day, week } from "./build";

export const W12 = week(
  12,
  "Work and explaining yourself",
  "You can hold your own in a meeting, explain your job, and disagree with a colleague.",
  [
    day(
      78,
      "Talking about your job",
      "Explain what you do so a French person actually gets it.",
      "job-chat",
      [
        ["je travaille pour", "I work for", "zhuh tra-VYE poor", "Je travaille pour une boîte anglaise.", "I work for an English company.", { tags: ["work"] }],
        ["une boîte", "a company (casual)", "oon BWAT", "C'est une petite boîte, vingt personnes.", "It's a small company, twenty people.", { tags: ["work"] }],
        ["je m'occupe de", "I handle / I look after", "zhuh mo-KOOP duh", "Je m'occupe des clients britanniques.", "I look after the British clients.", { tags: ["work", "explaining"] }],
        ["je suis chargé de", "I'm responsible for", "zhuh swee shar-ZHAY duh", "Je suis chargé du développement.", "I'm responsible for development.", { tags: ["work"] }],
        ["à mon compte", "self-employed", "a mon KONT", "Je suis à mon compte depuis deux ans.", "I've been self-employed for two years.", { tags: ["work"] }],
        ["en télétravail", "working from home", "on tay-lay-tra-VYE", "Je suis en télétravail le mercredi.", "I work from home on Wednesdays.", { tags: ["work"] }],
        ["un collègue / un client", "a colleague / a client", "uh(n) ko-LEG / uh(n) klee-YON", "J'ai un rendez-vous client à quatorze heures.", "I have a client meeting at two.", { tags: ["work"] }],
        ["ça me plaît bien", "I quite enjoy it", "sa muh pleh BYEH(n)", "C'est varié, ça me plaît bien.", "It's varied, I quite enjoy it.", { tags: ["work", "opinions"] }],
      ],
    ),

    day(
      79,
      "In a meeting",
      "Give an update and take your turn without freezing.",
      "work-meeting",
      [
        ["je fais un point rapide", "I'll give a quick update", "zhuh fay uh(n) pwan ra-PEED", "Je fais un point rapide sur le projet.", "I'll give a quick update on the project.", { tags: ["work", "meetings"] }],
        ["où on en est", "where we're at", "oo on-non-NAY", "Voilà où on en est aujourd'hui.", "That's where we're at today.", { tags: ["work", "meetings"] }],
        ["on avance bien", "we're making good progress", "on-na-VONSS byeh(n)", "On avance bien sur la première partie.", "We're making good progress on the first part.", { tags: ["work"] }],
        ["on est bloqué sur", "we're stuck on", "on-nay blo-KAY soor", "On est bloqué sur la validation.", "We're stuck on the sign-off.", { tags: ["work", "problems"] }],
        ["il me faudrait", "I would need", "eel muh fo-DREH", "Il me faudrait une réponse avant vendredi.", "I'd need an answer before Friday.", { tags: ["work", "politeness"] }],
        ["je peux revenir là-dessus ?", "can I come back to that?", "zhuh puh ruh-vuh-NEER la-duh-SOO", "Je peux revenir là-dessus après ?", "Can I come back to that afterwards?", { tags: ["meetings"] }],
        ["je n'ai pas bien saisi", "I didn't quite catch that", "zhuh nay pah byeh(n) say-ZEE", "Désolé, je n'ai pas bien saisi la question.", "Sorry, I didn't quite catch the question.", { tip: "More professional than je ne comprends pas in a meeting.", tags: ["meetings", "survival"] }],
        ["on se cale ça pour la semaine prochaine ?", "shall we set that up for next week?", "on suh kal sa poor la suh-MEN", "On se cale ça pour la semaine prochaine ?", "Shall we schedule that for next week?", { tags: ["meetings", "plans"] }],
      ],
    ),

    day(
      80,
      "Explaining an idea",
      "Make yourself understood when your vocabulary runs out.",
      "job-chat",
      [
        ["c'est un truc qui …", "it's a thing that …", "say uh(n) trook kee", "C'est un truc qui sert à mesurer.", "It's a thing that's used for measuring.", { tip: "When you don't know a word, define it. Un truc qui… gets you out of anything.", tags: ["explaining", "survival"] }],
        ["ça sert à", "it's used for", "sa sair a", "Ça sert à ouvrir les bouteilles.", "It's used for opening bottles.", { tags: ["explaining"] }],
        ["comment dire …", "how can I put it …", "ko-mon DEER", "C'est, comment dire, un peu compliqué.", "It's, how can I put it, a bit complicated.", { tags: ["fillers", "explaining"] }],
        ["c'est comme … mais", "it's like … but", "say KOM … meh", "C'est comme un café, mais plus fort.", "It's like a coffee, but stronger.", { tags: ["explaining", "comparisons"] }],
        ["en d'autres termes", "in other words", "on dotr TAIRM", "En d'autres termes, ça ne marche pas.", "In other words, it doesn't work.", { tags: ["explaining"] }],
        ["si je comprends bien", "if I understand correctly", "see zhuh kom-pron BYEH(n)", "Si je comprends bien, on repousse ?", "If I understand correctly, we're postponing?", { tags: ["explaining", "meetings"] }],
        ["ce que je veux dire, c'est", "what I mean is", "suh kuh zhuh vuh deer say", "Ce que je veux dire, c'est qu'on manque de temps.", "What I mean is that we're short on time.", { tags: ["explaining"] }],
        ["vous voyez ce que je veux dire ?", "do you see what I mean?", "voo vwa-YAY suh kuh zhuh vuh DEER", "Vous voyez ce que je veux dire ?", "Do you see what I mean?", { tags: ["explaining", "questions"] }],
      ],
    ),

    day(
      81,
      "Agreeing and disagreeing",
      "Take a position without sounding aggressive.",
      "disagree-politely",
      [
        ["je suis d'accord", "I agree", "zhuh swee da-KOR", "Je suis complètement d'accord avec toi.", "I completely agree with you.", { tags: ["agreement"] }],
        ["je ne suis pas d'accord", "I don't agree", "zhuh nuh swee pah da-KOR", "Je ne suis pas d'accord, pour deux raisons.", "I don't agree, for two reasons.", { tags: ["agreement"] }],
        ["oui, mais quand même", "yes, but still", "wee meh kon MEM", "Oui, mais quand même, c'est cher.", "Yes, but still, it's expensive.", { tags: ["agreement", "insisting"] }],
        ["tu as raison, mais", "you're right, but", "too a ray-ZON meh", "Tu as raison, mais ce n'est pas si simple.", "You're right, but it's not that simple.", { note: "Concede first, then push back — that's how French disagreement stays friendly.", tags: ["agreement"] }],
        ["ça se discute", "that's debatable", "sa suh dees-KOOT", "Hmm, ça se discute.", "Hmm, that's debatable.", { tags: ["agreement"] }],
        ["pas forcément", "not necessarily", "pah for-say-MON", "Pas forcément, ça dépend du contexte.", "Not necessarily, it depends on the context.", { tags: ["agreement"] }],
        ["justement", "exactly / that's just it", "zhoost-MON", "Justement, c'est ce que je disais.", "Exactly, that's what I was saying.", { tags: ["agreement", "connectors"] }],
        ["on n'est pas obligé d'être d'accord", "we don't have to agree", "on nay pah o-blee-ZHAY", "On n'est pas obligé d'être d'accord !", "We don't have to agree!", { tags: ["agreement", "social"] }],
      ],
    ),

    day(
      82,
      "Email and written French",
      "Write a short professional message correctly.",
      "work-meeting",
      [
        ["bonjour Monsieur / Madame", "Dear Sir / Madam", "bon-ZHOOR muh-SYUH / ma-DAM", "Bonjour Madame, suite à notre échange…", "Dear Madam, following our conversation…", { tags: ["writing", "work"] }],
        ["suite à", "following / further to", "sweet a", "Suite à notre appel, voici le document.", "Following our call, here's the document.", { tags: ["writing"] }],
        ["je me permets de vous écrire", "I'm writing to you", "zhuh muh pair-MEH duh voo-zay-KREER", "Je me permets de vous écrire au sujet du contrat.", "I'm writing to you about the contract.", { tags: ["writing", "politeness"] }],
        ["ci-joint", "attached", "see-ZHWA(n)", "Vous trouverez ci-joint la facture.", "Please find the invoice attached.", { tags: ["writing"] }],
        ["je reste à votre disposition", "I'm at your disposal", "zhuh rest a votr dees-po-zee-SYON", "Je reste à votre disposition pour toute question.", "I'm available for any questions.", { tags: ["writing", "politeness"] }],
        ["cordialement", "kind regards", "kor-dyal-MON", "Cordialement, Will.", "Kind regards, Will.", { note: "Cordialement for work, Bien à vous if you know them, Bises only for friends.", tags: ["writing"] }],
        ["merci d'avance", "thanks in advance", "mair-see da-VONSS", "Merci d'avance pour votre retour.", "Thanks in advance for your reply.", { tags: ["writing", "politeness"] }],
        ["dans l'attente de votre réponse", "looking forward to your reply", "don la-TONT duh votr ray-PONSS", "Dans l'attente de votre réponse, cordialement.", "Looking forward to your reply, kind regards.", { tags: ["writing"] }],
      ],
    ),

    day(
      83,
      "Work small talk",
      "The five minutes before and after the actual meeting.",
      "small-talk-work",
      [
        ["ça bosse ?", "working hard? (casual)", "sa BOSS", "Alors, ça bosse ?", "So, working hard?", { tags: ["work", "small talk"] }],
        ["c'est chargé en ce moment", "it's busy at the moment", "say shar-ZHAY on suh mo-MON", "C'est chargé en ce moment, mais ça va.", "It's busy right now, but it's fine.", { tags: ["work", "small talk"] }],
        ["j'ai une grosse semaine", "I've got a heavy week", "zhay oon gross suh-MEN", "J'ai une grosse semaine, là.", "I've got a heavy week right now.", { tags: ["work"] }],
        ["vivement vendredi", "roll on Friday", "veev-MON von-druh-DEE", "Vivement vendredi !", "Roll on Friday!", { tags: ["work", "small talk"] }],
        ["tu prends des vacances ?", "are you taking holiday?", "too pron day va-KONSS", "Tu prends des vacances cet été ?", "Are you taking holiday this summer?", { tags: ["work", "questions"] }],
        ["bon courage", "good luck / hang in there", "bon koo-RAHZH", "Bon courage pour cet après-midi !", "Good luck with this afternoon!", { tip: "Said constantly at work — for anything mildly unpleasant ahead.", tags: ["work", "politeness"] }],
        ["bonne continuation", "all the best with it", "bon kon-tee-noo-a-SYON", "Bonne continuation, et à bientôt !", "All the best, and see you soon!", { tags: ["politeness"] }],
        ["bon week-end !", "have a good weekend!", "bon week-END", "Allez, bon week-end !", "Right, have a good weekend!", { tags: ["greetings", "work"] }],
      ],
    ),

    day(
      84,
      "Week 12 test",
      "Give a work update, get challenged, and defend your position.",
      "work-meeting",
      [
        ["je propose qu'on …", "I suggest we …", "zhuh pro-POZ kon", "Je propose qu'on en reparle jeudi.", "I suggest we discuss it again Thursday.", { tags: ["meetings", "work"] }],
        ["l'idée, c'est de", "the idea is to", "lee-DAY say duh", "L'idée, c'est de simplifier le process.", "The idea is to simplify the process.", { tags: ["explaining", "work"] }],
        ["à court terme / à long terme", "short term / long term", "a koor TAIRM / a lon TAIRM", "À court terme, ça coûte plus cher.", "Short term, it costs more.", { tags: ["work"] }],
        ["le problème, c'est que", "the problem is that", "luh prob-LEM say kuh", "Le problème, c'est qu'on manque de monde.", "The problem is we're short-staffed.", { tags: ["work", "explaining"] }],
        ["on peut trouver une solution", "we can find a solution", "on puh troo-VAY oon so-loo-SYON", "Je pense qu'on peut trouver une solution.", "I think we can find a solution.", { tags: ["work", "agreement"] }],
        ["je m'en occupe", "I'll take care of it", "zhuh mon-no-KOOP", "D'accord, je m'en occupe.", "OK, I'll handle it.", { tags: ["work"] }],
        ["je vous tiens informé", "I'll keep you informed", "zhuh voo tyeh(n) an-for-MAY", "Je vous tiens informé d'ici vendredi.", "I'll keep you informed by Friday.", { tags: ["work", "writing"] }],
        ["on fait comme ça", "let's do it that way", "on fay kom SAH", "Parfait, on fait comme ça.", "Perfect, let's do it that way.", { tags: ["agreement"] }],
      ],
    ),
  ],
);
