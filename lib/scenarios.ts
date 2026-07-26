import type { Scenario } from "./types";

/**
 * Situations you actually hit living in France. Each one is a roleplay the
 * partner drives — they open, they push back, they ask follow-ups.
 */
export const SCENARIOS: Scenario[] = [
  /* ---- level 1: short, transactional, high frequency ---- */
  {
    id: "boulangerie",
    title: "Buying bread at the boulangerie",
    setup:
      "It's 8am. There's a queue behind you, so the baker is friendly but quick.",
    role: "a busy baker (boulangère) in a neighbourhood bakery",
    place: "a boulangerie in your street",
    objective:
      "Buy a baguette and one pastry, ask the price, pay, and leave politely.",
    opensWith: "partner",
    level: 1,
    tags: ["food", "shopping", "greetings"],
  },
  {
    id: "cafe-order",
    title: "Ordering at a café terrace",
    setup: "You sit down outside. The waiter comes over with a tray.",
    role: "a café waiter, brisk but not rude",
    place: "a corner café",
    objective: "Order a drink and something to eat, then ask for the bill.",
    opensWith: "partner",
    level: 1,
    tags: ["food", "restaurant"],
  },
  {
    id: "greeting-neighbour",
    title: "Running into your neighbour",
    setup: "You meet your neighbour in the hallway. They stop to chat.",
    role: "a chatty neighbour, around 60, lives on your floor",
    place: "the stairwell of your building",
    objective:
      "Greet them, answer how you are, say something about the weather, and leave politely.",
    opensWith: "partner",
    level: 1,
    tags: ["small talk", "greetings"],
  },
  {
    id: "supermarket",
    title: "Checkout at the supermarket",
    setup: "You're at the till. The cashier is scanning your items.",
    role: "a supermarket cashier",
    place: "a Carrefour near your flat",
    objective:
      "Answer the loyalty-card and bag questions, pay by card, take your receipt.",
    opensWith: "partner",
    level: 1,
    tags: ["shopping", "money"],
  },
  {
    id: "directions",
    title: "Asking for directions",
    setup: "You're lost. You stop someone on the pavement.",
    role: "a helpful passer-by in a hurry",
    place: "a street in the city centre",
    objective:
      "Ask where the metro station is, understand the directions, and confirm you understood.",
    opensWith: "you",
    level: 1,
    tags: ["directions", "public"],
  },
  {
    id: "pharmacy",
    title: "At the pharmacy",
    setup: "You're not feeling great and you need something for it.",
    role: "a pharmacist who asks careful questions",
    place: "a pharmacie with the green cross",
    objective:
      "Describe your symptom, understand the recommendation, ask how to take it.",
    opensWith: "partner",
    level: 1,
    tags: ["health", "body"],
  },
  {
    id: "market-stall",
    title: "Buying fruit at the market",
    setup:
      "Saturday morning market. The vendor is loud, friendly, and negotiating nothing.",
    role: "a market vendor selling fruit and veg",
    place: "an outdoor marché",
    objective:
      "Buy a quantity of two things, ask which is good today, pay in cash.",
    opensWith: "partner",
    level: 1,
    tags: ["food", "shopping", "numbers"],
  },
  {
    id: "metro-ticket",
    title: "Buying a metro ticket",
    setup: "The machine isn't taking your card, so you go to the window.",
    role: "a transport worker behind glass",
    place: "a metro station ticket window",
    objective: "Ask for the right ticket, understand the price, pay.",
    opensWith: "you",
    level: 1,
    tags: ["transport", "money"],
  },

  /* ---- level 2: longer, with a complication ---- */
  {
    id: "restaurant-dinner",
    title: "Dinner at a restaurant",
    setup:
      "You have a reservation. The server will run you through the whole meal.",
    role: "a restaurant server who recommends dishes and asks about drinks",
    place: "a neighbourhood bistro",
    objective:
      "Get a table, order a starter and a main, handle a question about how you want it cooked, and ask for the bill.",
    opensWith: "partner",
    level: 2,
    tags: ["food", "restaurant"],
  },
  {
    id: "phone-appointment",
    title: "Booking an appointment by phone",
    setup:
      "You call to book. Phone French is harder — no faces, and they speak fast.",
    role: "a receptionist at a doctor's office, speaking on the phone",
    place: "a phone call",
    objective:
      "Give your name, say why you're calling, agree a day and time, spell your name back.",
    opensWith: "partner",
    level: 2,
    tags: ["phone", "appointments", "numbers"],
  },
  {
    id: "invite-dinner",
    title: "Inviting someone to dinner",
    setup:
      "You've spoken to this person a few times and want to invite them over.",
    role: "a friendly colleague who is interested but has a busy week",
    place: "outside the office",
    objective:
      "Invite them, negotiate a day that works, agree a time, confirm.",
    opensWith: "you",
    level: 2,
    tags: ["social", "time", "invitations"],
  },
  {
    id: "clothes-shop",
    title: "Trying on clothes",
    setup: "You like a jacket but you're not sure about the size.",
    role: "a shop assistant in a clothes shop",
    place: "a clothing store",
    objective:
      "Ask for another size, ask to try it on, say what you think, decide whether to buy.",
    opensWith: "partner",
    level: 2,
    tags: ["shopping", "opinions"],
  },
  {
    id: "small-talk-work",
    title: "Small talk with a colleague",
    setup: "Monday morning at the coffee machine.",
    role: "a French colleague making conversation",
    place: "an office kitchen",
    objective:
      "Talk about your weekend, ask about theirs, react naturally, end the conversation.",
    opensWith: "partner",
    level: 2,
    tags: ["work", "small talk", "past"],
  },
  {
    id: "landlord-problem",
    title: "Reporting a problem to the landlord",
    setup: "The hot water has stopped working. You call your landlord.",
    role: "a landlord who is helpful but wants details",
    place: "a phone call",
    objective:
      "Explain the problem, say since when, ask when someone can come, agree a time.",
    opensWith: "partner",
    level: 2,
    tags: ["phone", "home", "problems"],
  },
  {
    id: "post-office",
    title: "Sending a parcel",
    setup: "You need to send something and you're not sure of the options.",
    role: "a post office clerk",
    place: "La Poste",
    objective:
      "Say what you want to send and where, compare two options, choose, pay.",
    opensWith: "partner",
    level: 2,
    tags: ["admin", "money", "comparisons"],
  },
  {
    id: "hairdresser",
    title: "At the hairdresser",
    setup: "You're in the chair. They ask what you want done.",
    role: "a hairdresser who asks a lot of clarifying questions",
    place: "a salon",
    objective:
      "Explain what you want, answer questions about length, react at the end.",
    opensWith: "partner",
    level: 2,
    tags: ["appointments", "descriptions"],
  },
  {
    id: "train-delay",
    title: "Your train is cancelled",
    setup: "The board says your train is cancelled. You go to the desk.",
    role: "an SNCF agent dealing with a queue of annoyed people",
    place: "a train station information desk",
    objective:
      "Explain your situation, ask about the next train, ask about a refund, confirm the platform.",
    opensWith: "you",
    level: 2,
    tags: ["transport", "problems", "time"],
  },
  {
    id: "dinner-party",
    title: "At a French friend's dinner",
    setup:
      "You've been invited to someone's home. You arrive and there are people you don't know.",
    role: "the host, introducing you to other guests",
    place: "a flat in the evening",
    objective:
      "Greet the host, introduce yourself to a guest, compliment the food, refuse a second helping politely.",
    opensWith: "partner",
    level: 2,
    tags: ["social", "food", "introductions"],
  },

  /* ---- level 3: pushback, opinions, unexpected turns ---- */
  {
    id: "return-item",
    title: "Returning something that doesn't work",
    setup:
      "You bought it last week and it's broken. They don't want to refund it.",
    role: "a shop manager who first refuses, then softens if you're firm and polite",
    place: "an electronics shop",
    objective:
      "Explain the problem, say when you bought it, insist politely, reach an outcome.",
    opensWith: "partner",
    level: 3,
    tags: ["problems", "past", "insisting"],
  },
  {
    id: "job-chat",
    title: "Explaining what you do for work",
    setup:
      "Someone at a party asks about your job and keeps asking follow-ups.",
    role: "a curious French person at a party who asks 'et ça consiste en quoi ?'",
    place: "a noisy flat party",
    objective:
      "Say what you do, explain it simply, say what you like about it, ask them back.",
    opensWith: "partner",
    level: 3,
    tags: ["work", "explaining", "opinions"],
  },
  {
    id: "bank-account",
    title: "Opening a bank account",
    setup:
      "Admin French. They will ask for documents you may not have thought about.",
    role: "a bank advisor going through a checklist",
    place: "a bank branch",
    objective:
      "Say what you want to open, answer questions about your situation, ask what documents you need, book a follow-up.",
    opensWith: "partner",
    level: 3,
    tags: ["admin", "work", "documents"],
  },
  {
    id: "flat-viewing",
    title: "Viewing a flat",
    setup:
      "You're one of several people viewing. You have five minutes to ask everything.",
    role: "an estate agent showing a flat, slightly impatient",
    place: "an empty flat",
    objective:
      "Ask about the rent, the charges, the neighbourhood and availability, then say you're interested.",
    opensWith: "partner",
    level: 3,
    tags: ["home", "numbers", "questions"],
  },
  {
    id: "disagree-politely",
    title: "Disagreeing over dinner",
    setup:
      "Someone states an opinion you don't share. In France, that's the start of a good evening.",
    role: "a French friend with strong opinions who enjoys the debate",
    place: "at a table after dinner",
    objective:
      "Say you don't agree, give a reason, concede one point, stay friendly.",
    opensWith: "partner",
    level: 3,
    tags: ["opinions", "social", "connectors"],
  },
  {
    id: "phone-internet",
    title: "Calling about your internet",
    setup:
      "Your internet has been down for three days. You call the operator. There's a menu, then a human.",
    role: "a telecom support agent following a script",
    place: "a phone call",
    objective:
      "Give your account details, describe the problem and how long it's lasted, refuse the first useless suggestion, get a technician booked.",
    opensWith: "partner",
    level: 3,
    tags: ["phone", "problems", "insisting", "numbers"],
  },
  {
    id: "doctor-visit",
    title: "At the doctor",
    setup: "You've had it for a few days and it's not getting better.",
    role: "a GP asking diagnostic questions",
    place: "a doctor's consulting room",
    objective:
      "Describe your symptoms and how long you've had them, answer questions, understand the prescription.",
    opensWith: "partner",
    level: 3,
    tags: ["health", "past", "body"],
  },
  {
    id: "make-plans",
    title: "Making weekend plans with friends",
    setup: "Three-way message turned phone call. Everyone has opinions.",
    role: "a friend suggesting plans and reacting to yours",
    place: "a phone call",
    objective:
      "Suggest something, react to their suggestion, propose an alternative, settle on a plan and a time.",
    opensWith: "partner",
    level: 3,
    tags: ["social", "future", "time"],
  },
  {
    id: "work-meeting",
    title: "Speaking up in a work meeting",
    setup: "Your turn to give an update. Then someone asks a question.",
    role: "a manager running a team meeting in French",
    place: "a meeting room",
    objective:
      "Give a short update, say what's blocking you, answer a question, propose a next step.",
    opensWith: "partner",
    level: 3,
    tags: ["work", "explaining", "future"],
  },
  {
    id: "lost-property",
    title: "You left your bag on the train",
    setup: "You realise on the platform. You go to the desk to report it.",
    role: "a lost-property clerk taking a report",
    place: "a station office",
    objective:
      "Explain what happened and when, describe the bag and its contents, give your contact details.",
    opensWith: "partner",
    level: 3,
    tags: ["problems", "past", "descriptions"],
  },
  {
    id: "catch-up-friend",
    title: "Catching up with a friend you haven't seen",
    setup: "You haven't seen them in months. They want the whole story.",
    role: "an old friend who asks about everything you've been doing",
    place: "a bar",
    objective:
      "Say what you've been up to, ask about them, react to their news, make a plan to meet again.",
    opensWith: "partner",
    level: 3,
    tags: ["past", "social", "reactions"],
  },
];

export const scenarioById = (id: string): Scenario =>
  SCENARIOS.find((s) => s.id === id) ?? SCENARIOS[0];
