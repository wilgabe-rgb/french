import { day, week } from "./build";

export const W09 = week(
  9,
  "Problems, admin and holding your ground",
  "You can report a problem, push back when someone says no, and get an outcome.",
  [
    day(
      57,
      "Reporting a problem",
      "Explain clearly what's broken and since when.",
      "landlord-problem",
      [
        ["j'ai un problème avec", "I have a problem with", "zhay uh(n) prob-LEM a-vek", "J'ai un problème avec le chauffage.", "I have a problem with the heating.", { tags: ["problems"] }],
        ["ça ne marche pas", "it doesn't work", "sa nuh marsh PAH", "L'eau chaude ne marche pas.", "The hot water doesn't work.", { tags: ["problems"] }],
        ["c'est en panne", "it's broken down", "say-ton PAN", "L'ascenseur est en panne depuis lundi.", "The lift has been out since Monday.", { tags: ["problems", "home"] }],
        ["depuis trois jours", "for three days now", "duh-pwee trwa ZHOOR", "Ça dure depuis trois jours.", "It's been going on for three days.", { tags: ["problems", "time"] }],
        ["il y a une fuite", "there's a leak", "eel ya oon FWEET", "Il y a une fuite dans la salle de bain.", "There's a leak in the bathroom.", { tags: ["problems", "home"] }],
        ["ça a commencé quand ?", "when did it start?", "sa a ko-mon-say KON", "— Ça a commencé quand ? — Mardi soir.", "— When did it start? — Tuesday evening.", { tags: ["problems", "questions"] }],
        ["c'est urgent", "it's urgent", "say-toor-ZHON", "C'est assez urgent, en fait.", "It's fairly urgent, actually.", { tags: ["problems"] }],
        ["quelqu'un peut passer quand ?", "when can someone come?", "kel-KUH(n) puh pa-say KON", "Quelqu'un peut passer quand, à peu près ?", "When can someone come, roughly?", { tags: ["problems", "questions"] }],
      ],
    ),

    day(
      58,
      "Complaining and insisting",
      "Push back politely but firmly when the first answer is no.",
      "return-item",
      [
        ["je voudrais me plaindre", "I'd like to complain", "zhuh voo-dreh muh PLANDR", "Je voudrais me plaindre, poliment.", "I'd like to make a complaint, politely.", { tags: ["problems"] }],
        ["ce n'est pas normal", "this isn't acceptable", "suh nay pah nor-MAL", "Franchement, ce n'est pas normal.", "Honestly, this isn't acceptable.", { tip: "The standard French phrase for 'this is not on'. Powerful and polite.", tags: ["problems", "insisting"] }],
        ["je comprends, mais", "I understand, but", "zhuh kom-PRON meh", "Je comprends, mais j'ai payé pour ce service.", "I understand, but I paid for this service.", { tags: ["insisting"] }],
        ["j'insiste", "I insist", "zhan-SEEST", "Désolé, mais j'insiste.", "Sorry, but I insist.", { tags: ["insisting"] }],
        ["je peux parler au responsable ?", "can I speak to the manager?", "zhuh puh par-lay o res-pon-SAHBL", "Je peux parler au responsable, s'il vous plaît ?", "Can I speak to the manager, please?", { tags: ["insisting"] }],
        ["j'ai le ticket de caisse", "I have the receipt", "zhay luh tee-keh duh KESS", "J'ai le ticket de caisse, regardez.", "I have the receipt, look.", { tags: ["shopping", "problems"] }],
        ["je voudrais un remboursement", "I'd like a refund", "zhuh voo-dreh uh(n) rom-boor-suh-MON", "Je voudrais un remboursement, s'il vous plaît.", "I'd like a refund, please.", { tags: ["money", "problems"] }],
        ["qu'est-ce qu'on peut faire ?", "what can we do about it?", "kess-kon puh FAIR", "Alors, qu'est-ce qu'on peut faire ?", "So what can we do?", { tip: "Turns a standoff into a joint problem. Very effective.", tags: ["insisting", "questions"] }],
      ],
    ),

    day(
      59,
      "Admin French",
      "Handle paperwork vocabulary without panicking.",
      "bank-account",
      [
        ["un justificatif de domicile", "proof of address", "uh(n) zhoos-tee-fee-ka-TEEF duh do-mee-SEEL", "Il vous faut un justificatif de domicile.", "You need proof of address.", { tags: ["admin"] }],
        ["une pièce d'identité", "ID document", "oon pyess dee-don-tee-TAY", "Vous avez une pièce d'identité ?", "Do you have ID?", { tags: ["admin"] }],
        ["un relevé d'identité bancaire (RIB)", "bank details slip", "uh(n) ruh-luh-VAY dee-don-tee-tay bon-KAIR", "Envoyez-moi votre RIB par mail.", "Send me your bank details by email.", { tags: ["admin", "money"] }],
        ["un contrat", "a contract", "uh(n) kon-TRAH", "Je peux lire le contrat avant de signer ?", "Can I read the contract before signing?", { tags: ["admin", "work"] }],
        ["il vous faut …", "you need …", "eel voo FO", "Il vous faut aussi une attestation.", "You also need a certificate.", { tags: ["admin", "listening"] }],
        ["un dossier", "a file / application", "uh(n) do-SYAY", "Je dépose mon dossier cette semaine.", "I'm submitting my application this week.", { tags: ["admin"] }],
        ["remplir un formulaire", "fill in a form", "rom-PLEER uh(n) for-moo-LAIR", "Vous devez remplir ce formulaire.", "You need to fill in this form.", { tags: ["admin"] }],
        ["ça prend combien de temps ?", "how long does it take?", "sa pron kom-byeh(n) duh TOM", "Le dossier, ça prend combien de temps ?", "The application, how long does it take?", { tags: ["admin", "questions"] }],
      ],
    ),

    day(
      60,
      "Understanding rules and obligations",
      "Say what you must, can and are allowed to do.",
      "bank-account",
      [
        ["il faut", "you have to / one must", "eel FO", "Il faut réserver à l'avance.", "You have to book in advance.", { note: "il faut + verb is the simplest way to express any obligation, with no person attached.", tags: ["core"] }],
        ["je dois", "I must / I have to", "zhuh DWAH", "Je dois partir à six heures.", "I have to leave at six.", { tags: ["core", "verbs"] }],
        ["je peux", "I can / may", "zhuh PUH", "Je peux payer en plusieurs fois ?", "Can I pay in instalments?", { tags: ["core", "verbs"] }],
        ["je ne peux pas", "I can't", "zhuh nuh puh PAH", "Je ne peux pas venir avant lundi.", "I can't come before Monday.", { tags: ["core"] }],
        ["c'est possible de … ?", "is it possible to …?", "say po-SEEBL duh", "C'est possible de changer la date ?", "Is it possible to change the date?", { tags: ["questions"] }],
        ["c'est interdit", "it's not allowed", "say-tan-tair-DEE", "Ici c'est interdit de fumer.", "Smoking isn't allowed here.", { tags: ["rules"] }],
        ["j'ai besoin de", "I need", "zhay buh-ZWAN duh", "J'ai besoin d'un rendez-vous rapidement.", "I need an appointment quickly.", { tags: ["core"] }],
        ["ce n'est pas obligatoire", "it's not compulsory", "suh nay pah o-blee-ga-TWAR", "Ce n'est pas obligatoire, mais c'est mieux.", "It's not compulsory, but it's better.", { tags: ["rules"] }],
      ],
    ),

    day(
      61,
      "The phone, harder",
      "Get through a call centre and refuse the useless first answer.",
      "phone-internet",
      [
        ["mon numéro de client", "my customer number", "mon noo-may-ro duh klee-YON", "Mon numéro de client, c'est le 4-4-2-1.", "My customer number is 4421.", { tags: ["phone", "admin"] }],
        ["j'appelle au sujet de", "I'm calling regarding", "zha-pel o soo-ZHEH duh", "J'appelle au sujet de ma connexion internet.", "I'm calling about my internet connection.", { tags: ["phone"] }],
        ["j'ai déjà essayé ça", "I've already tried that", "zhay day-zha ay-say-YAY sa", "J'ai déjà essayé ça, ça n'a rien changé.", "I already tried that, it changed nothing.", { tags: ["phone", "insisting"] }],
        ["ça fait trois fois que j'appelle", "this is the third time I've called", "sa fay trwa fwa kuh zha-PEL", "Ça fait trois fois que j'appelle cette semaine.", "This is the third time I've called this week.", { tags: ["phone", "insisting"] }],
        ["je voudrais un technicien", "I'd like a technician", "zhuh voo-dreh uh(n) tek-nee-SYA(n)", "Je voudrais qu'un technicien passe.", "I'd like a technician to come.", { tags: ["phone", "problems"] }],
        ["vous pouvez noter ça ?", "can you make a note of that?", "voo poo-vay no-TAY sa", "Vous pouvez noter ça dans le dossier ?", "Can you note that on the file?", { tags: ["phone"] }],
        ["j'ai un numéro de dossier ?", "do I get a case number?", "zhay uh(n) noo-may-ro duh do-SYAY", "J'ai un numéro de dossier, s'il vous plaît ?", "Can I have a case number, please?", { tags: ["phone", "admin"] }],
        ["merci de votre patience", "thanks for your patience", "mair-see duh votr pa-SYONSS", "Merci de votre patience, monsieur.", "Thanks for your patience, sir.", { tags: ["phone", "listening"] }],
      ],
    ),

    day(
      62,
      "Health and the body",
      "Describe a symptom accurately enough to be treated.",
      "doctor-visit",
      [
        ["j'ai mal à", "I have a pain in / my … hurts", "zhay mal a", "J'ai mal à la tête depuis ce matin.", "I've had a headache since this morning.", { note: "Use j'ai mal à + the body part; à + le becomes au: j'ai mal au dos.", tags: ["health", "body"] }],
        ["la tête / le dos / le ventre", "head / back / stomach", "la TET / luh DO / luh VONTR", "J'ai mal au ventre depuis hier.", "My stomach has hurt since yesterday.", { tags: ["body"] }],
        ["la gorge / les dents", "throat / teeth", "la GORZH / lay DON", "J'ai mal à la gorge.", "I have a sore throat.", { tags: ["body"] }],
        ["je suis fatigué", "I'm tired", "zhuh swee fa-tee-GAY", "Je suis fatigué et j'ai de la fièvre.", "I'm tired and I have a fever.", { tags: ["health"] }],
        ["j'ai de la fièvre", "I have a fever", "zhay duh la FYEVR", "J'ai de la fièvre depuis deux jours.", "I've had a fever for two days.", { tags: ["health"] }],
        ["ça fait mal ici", "it hurts here", "sa fay mal ee-SEE", "Ça fait mal ici, quand j'appuie.", "It hurts here, when I press.", { tags: ["health", "body"] }],
        ["une ordonnance", "a prescription", "oon or-do-NONSS", "Vous me faites une ordonnance ?", "Will you write me a prescription?", { tags: ["health"] }],
        ["combien de fois par jour ?", "how many times a day?", "kom-byeh(n) duh fwa par ZHOOR", "Je le prends combien de fois par jour ?", "How many times a day do I take it?", { tags: ["health", "questions"] }],
      ],
    ),

    day(
      63,
      "Week 9 test",
      "Report a problem, get refused once, and still get what you need.",
      "return-item",
      [
        ["je l'ai acheté la semaine dernière", "I bought it last week", "zhuh lay ash-TAY la suh-men dair-NYAIR", "Je l'ai acheté la semaine dernière, ici.", "I bought it last week, here.", { tags: ["past", "shopping"] }],
        ["il est encore sous garantie", "it's still under warranty", "eel ay-ton-kor soo ga-ron-TEE", "Il est encore sous garantie, normalement.", "It should still be under warranty.", { tags: ["shopping", "problems"] }],
        ["ce n'est pas de ma faute", "it's not my fault", "suh nay pah duh ma FOAT", "Ce n'est pas de ma faute, franchement.", "It's honestly not my fault.", { tags: ["insisting"] }],
        ["vous pouvez faire un geste ?", "can you do something for me?", "voo poo-vay fair uh(n) ZHEST", "Vous pouvez faire un geste commercial ?", "Can you meet me halfway on this?", { tip: "The French way to ask for a goodwill discount or exchange.", tags: ["insisting", "money"] }],
        ["dans ce cas", "in that case", "don suh KAH", "Dans ce cas, je prends un avoir.", "In that case, I'll take a credit note.", { tags: ["connectors"] }],
        ["ça me convient", "that works for me", "sa muh kon-VYEH(n)", "Un échange, ça me convient.", "An exchange works for me.", { tags: ["agreement"] }],
        ["merci de votre compréhension", "thanks for understanding", "mair-see duh votr kom-pray-on-SYON", "Merci de votre compréhension, bonne journée.", "Thanks for understanding, good day.", { tags: ["politeness"] }],
        ["c'est réglé", "it's sorted", "say ray-GLAY", "Bon, c'est réglé, merci !", "Right, it's sorted, thanks!", { tags: ["core"] }],
      ],
    ),
  ],
);
