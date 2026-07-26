import { day, week } from "./build";

export const W04 = week(
  4,
  "Time, days and appointments",
  "You can agree a day and a time with anyone, in person or on the phone.",
  [
    day(
      22,
      "Days and parts of the day",
      "Say which day you mean and when in the day.",
      "invite-dinner",
      [
        ["lundi, mardi, mercredi", "Monday, Tuesday, Wednesday", "lun-DEE, mar-DEE, mair-kruh-DEE", "On se voit mercredi ?", "Shall we meet Wednesday?", { note: "No capital letters and no word for 'on': mercredi alone means 'on Wednesday'.", tags: ["time"] }],
        ["jeudi, vendredi", "Thursday, Friday", "zhuh-DEE, von-druh-DEE", "Vendredi, ça m'arrange mieux.", "Friday suits me better.", { tags: ["time"] }],
        ["samedi, dimanche", "Saturday, Sunday", "sam-DEE, dee-MONSH", "Le dimanche, tout est fermé.", "On Sundays, everything is closed.", { tags: ["time"] }],
        ["le matin", "in the morning", "luh ma-TA(n)", "Je préfère le matin.", "I prefer mornings.", { tags: ["time"] }],
        ["l'après-midi", "in the afternoon", "la-preh-mee-DEE", "Vous êtes libre cet après-midi ?", "Are you free this afternoon?", { tags: ["time"] }],
        ["le soir", "in the evening", "luh SWAHR", "On dîne à quelle heure le soir ?", "What time do we eat in the evening?", { tags: ["time"] }],
        ["aujourd'hui / demain / hier", "today / tomorrow / yesterday", "o-zhoor-DWEE / duh-MA(n) / ee-YAIR", "Hier c'était fermé, demain ça rouvre.", "Yesterday it was closed, tomorrow it reopens.", { tags: ["time"] }],
        ["ce week-end", "this weekend", "suh week-END", "Tu fais quoi ce week-end ?", "What are you doing this weekend?", { tags: ["time"] }],
      ],
    ),

    day(
      23,
      "Telling the time",
      "Understand and give a time, including the 24-hour clock.",
      "phone-appointment",
      [
        ["il est quelle heure ?", "what time is it?", "eel ay kel UHR", "Excusez-moi, il est quelle heure ?", "Excuse me, what time is it?", { tags: ["time", "questions"] }],
        ["il est trois heures", "it's three o'clock", "eel ay trwa-ZUHR", "Il est trois heures pile.", "It's three on the dot.", { tip: "Always link the number into heures: 'trwa-ZUHR', 'ka-TRUHR'.", tags: ["time"] }],
        ["et demie", "half past", "ay duh-MEE", "Rendez-vous à huit heures et demie.", "Let's meet at half past eight.", { tags: ["time"] }],
        ["et quart / moins le quart", "quarter past / quarter to", "ay KAR / mwan luh KAR", "Il est six heures moins le quart.", "It's quarter to six.", { tags: ["time"] }],
        ["quatorze heures trente", "14:30 (official times)", "ka-torz uhr TRONT", "Le train part à quatorze heures trente.", "The train leaves at 14:30.", { note: "Timetables, appointments and shops all use the 24-hour clock, so expect numbers up to vingt-trois.", tags: ["time", "numbers"] }],
        ["à quelle heure ?", "at what time?", "a kel UHR", "On se retrouve à quelle heure ?", "What time shall we meet?", { tags: ["time", "questions"] }],
        ["vers", "around (approximately)", "VAIR", "Je passe vers midi.", "I'll come by around midday.", { tags: ["time"] }],
        ["midi / minuit", "midday / midnight", "mee-DEE / mee-NWEE", "On mange vers midi.", "We eat around midday.", { tags: ["time"] }],
      ],
    ),

    day(
      24,
      "Booking and confirming",
      "Make an appointment and read it back so there's no mistake.",
      "phone-appointment",
      [
        ["je voudrais prendre rendez-vous", "I'd like to make an appointment", "zhuh voo-dreh prondr ron-day-VOO", "Bonjour, je voudrais prendre rendez-vous.", "Hello, I'd like to make an appointment.", { tags: ["appointments"] }],
        ["vous êtes libre quand ?", "when are you free?", "voo-zet LEEBR kon", "Vous êtes libre quand cette semaine ?", "When are you free this week?", { tags: ["appointments", "questions"] }],
        ["ça vous convient ?", "does that work for you?", "sa voo kon-VYEH(n)", "Jeudi à dix heures, ça vous convient ?", "Thursday at ten, does that work?", { tags: ["appointments"] }],
        ["ça m'arrange", "that suits me", "sa ma-RONZH", "Le matin, ça m'arrange mieux.", "Mornings suit me better.", { tags: ["appointments"] }],
        ["je ne peux pas", "I can't", "zhuh nuh puh PAH", "Désolé, je ne peux pas lundi.", "Sorry, I can't on Monday.", { tags: ["appointments"] }],
        ["on dit …", "let's say …", "on DEE", "On dit mardi quatorze heures ?", "Shall we say Tuesday at two?", { tags: ["appointments"] }],
        ["c'est noté", "got it / it's booked", "say no-TAY", "Parfait, c'est noté.", "Perfect, it's noted.", { tags: ["appointments"] }],
        ["je confirme", "I'll confirm", "zhuh kon-FEERM", "Je confirme par mail ce soir.", "I'll confirm by email tonight.", { tags: ["appointments"] }],
      ],
    ),

    day(
      25,
      "On the phone",
      "Survive a call where you can't see the other person's face.",
      "phone-appointment",
      [
        ["allô ?", "hello? (phone only)", "a-LO", "Allô ? Oui, bonjour.", "Hello? Yes, hello.", { note: "Allô is only for answering the phone, never face to face.", tags: ["phone"] }],
        ["c'est … à l'appareil", "it's … speaking", "say … a la-pa-RAY", "Bonjour, c'est Will à l'appareil.", "Hello, it's Will speaking.", { tags: ["phone"] }],
        ["je vous appelle pour", "I'm calling about", "zhuh voo-za-PEL poor", "Je vous appelle pour un rendez-vous.", "I'm calling about an appointment.", { tags: ["phone"] }],
        ["ne quittez pas", "hold the line (they'll say it)", "nuh kee-tay PAH", "Ne quittez pas, je vous passe le service.", "Hold on, I'll put you through.", { tags: ["phone", "listening"] }],
        ["je vous entends mal", "I can't hear you well", "zhuh voo-zon-ton MAL", "Désolé, je vous entends mal.", "Sorry, I can't hear you well.", { tags: ["phone"] }],
        ["vous pouvez épeler ?", "can you spell that?", "voo poo-vay ay-puh-LAY", "Votre nom, vous pouvez épeler ?", "Your name, can you spell it?", { tags: ["phone"] }],
        ["mon numéro, c'est le …", "my number is …", "mon noo-may-RO say luh", "Mon numéro, c'est le zéro six…", "My number is zero six…", { note: "French phone numbers are read in pairs: 06 12 34 56 78 = zéro six, douze, trente-quatre…", tags: ["phone", "numbers"] }],
        ["je vous remercie, au revoir", "thank you, goodbye", "zhuh voo ruh-mair-SEE", "Très bien, je vous remercie, au revoir.", "Great, thank you, goodbye.", { tags: ["phone", "politeness"] }],
      ],
    ),

    day(
      26,
      "Dates and how often",
      "Give a date and say how often something happens.",
      "phone-appointment",
      [
        ["janvier, février, mars", "January, February, March", "zhon-VYAY, fay-vree-YAY, MARSS", "Je pars en mars.", "I'm leaving in March.", { tags: ["time"] }],
        ["le premier / le deux", "the 1st / the 2nd", "luh pruh-MYAY / luh DUH", "C'est le deux avril.", "It's the second of April.", { note: "Only the 1st uses premier; every other date uses the plain number.", tags: ["time", "numbers"] }],
        ["la semaine prochaine", "next week", "la suh-men pro-SHEN", "On se voit la semaine prochaine.", "We'll see each other next week.", { tags: ["time"] }],
        ["la semaine dernière", "last week", "la suh-men dair-NYAIR", "Je l'ai vu la semaine dernière.", "I saw him last week.", { tags: ["time"] }],
        ["tous les jours", "every day", "too lay ZHOOR", "Je prends le métro tous les jours.", "I take the metro every day.", { tags: ["time"] }],
        ["souvent / parfois / jamais", "often / sometimes / never", "soo-VON / par-FWAH / zha-MEH", "Je vais parfois au marché le samedi.", "I sometimes go to the market on Saturday.", { tags: ["time"] }],
        ["depuis", "since / for (still true now)", "duh-PWEE", "J'habite ici depuis deux ans.", "I've lived here for two years.", { note: "With depuis, French uses the present tense where English uses 'have been'.", tags: ["time"] }],
        ["dans deux jours", "in two days", "don duh ZHOOR", "Je reviens dans deux jours.", "I'm back in two days.", { tags: ["time"] }],
      ],
    ),

    day(
      27,
      "Changing and cancelling",
      "Move an appointment without causing a problem.",
      "phone-appointment",
      [
        ["je dois annuler", "I have to cancel", "zhuh dwa a-noo-LAY", "Désolé, je dois annuler pour demain.", "Sorry, I have to cancel for tomorrow.", { tags: ["appointments"] }],
        ["est-ce qu'on peut déplacer ?", "can we move it?", "ess-kon puh day-pla-SAY", "Est-ce qu'on peut déplacer le rendez-vous ?", "Can we move the appointment?", { tags: ["appointments"] }],
        ["un empêchement", "something's come up", "uh(n) om-pesh-MON", "J'ai un empêchement, je suis désolé.", "Something's come up, I'm sorry.", { tags: ["appointments"] }],
        ["je serai en retard", "I'll be late", "zhuh suh-RAY on ruh-TAR", "Je serai en retard de dix minutes.", "I'll be ten minutes late.", { tags: ["appointments"] }],
        ["ça ne pose pas de problème", "that's no problem", "sa nuh poz pah duh prob-LEM", "Pas de souci, ça ne pose pas de problème.", "No worries, that's no problem.", { tags: ["politeness"] }],
        ["plus tôt / plus tard", "earlier / later", "ploo TO / ploo TAR", "Un peu plus tard, si possible.", "A bit later, if possible.", { tags: ["time"] }],
        ["si possible", "if possible", "see po-SEEBL", "Jeudi si possible, sinon vendredi.", "Thursday if possible, otherwise Friday.", { tags: ["politeness"] }],
        ["merci de votre compréhension", "thanks for understanding", "mair-see duh votr kom-pray-on-SYON", "Merci de votre compréhension.", "Thank you for your understanding.", { tags: ["politeness"] }],
      ],
    ),

    day(
      28,
      "Week 4 test",
      "Book, move and confirm an appointment entirely by phone.",
      "phone-appointment",
      [
        ["j'aurais une question", "I have a question", "zho-reh oon kess-TYON", "J'aurais une question, si vous avez une minute.", "I have a question, if you have a minute.", { tags: ["politeness"] }],
        ["ça marche", "works for me / OK", "sa MARSH", "Mardi dix heures ? Ça marche.", "Tuesday at ten? Works for me.", { tags: ["core"] }],
        ["je récapitule", "let me repeat that back", "zhuh ray-ka-pee-TOOL", "Je récapitule : jeudi, quinze heures.", "So to recap: Thursday, three pm.", { tip: "Best trick on the phone — say it back and you'll never book the wrong slot.", tags: ["phone"] }],
        ["c'est bien ça ?", "is that right?", "say byeh(n) SAH", "Le douze mai, c'est bien ça ?", "The twelfth of May, is that right?", { tags: ["phone", "questions"] }],
        ["excusez-moi de vous déranger", "sorry to bother you", "ex-koo-zay mwa duh voo day-ron-ZHAY", "Excusez-moi de vous déranger.", "Sorry to bother you.", { tags: ["politeness"] }],
        ["je rappelle plus tard", "I'll call back later", "zhuh ra-PEL ploo TAR", "Je rappelle plus tard, merci.", "I'll call back later, thanks.", { tags: ["phone"] }],
        ["au cas où", "just in case", "o ka OO", "Je vous donne mon numéro, au cas où.", "I'll give you my number, just in case.", { tags: ["connectors"] }],
        ["à jeudi", "see you Thursday", "a zhuh-DEE", "Parfait, à jeudi !", "Perfect, see you Thursday!", { tags: ["greetings"] }],
      ],
    ),
  ],
);
