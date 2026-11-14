Object.assign(T.en, {
  acts: { feed: "Snack", play: "Play", talk: "Talk", nap: "Nap", wake: "Wake up", photo: "Photo" },
  joy: "Happiness",
  feedT: "What's on the menu?", feedLeft: (n) => n === 1 ? "1 snack left today" : `${n} snacks left today`, feedFull: "My tummy is full! Maybe later.",
  snacks: { apple: "Apple", berries: "Strawberries", cookie: "Cookie", honey: "Honey", fish: "Fish cracker", carrot: "Carrot" },
  yum: ["Nom nom!", "Yummy!", "Thanks, I needed that!", "Delicious!"], fav: "That's my favourite! Thank you!",
  gameT: "Catch the stars", gameP: "Tap the stars before they fall. Golden ones are worth 3 points!", gameStart: "Play", gameScore: (n) => `Points: ${n}`, gameEnd: (n) => `You scored ${n} points!`, gameSeeds: (s) => s ? `+${s} Tanì` : "You've collected all of today's game Tanì, but the fun is always free!", gameAgain: "Again!", gameBest: (n) => `Best: ${n}`,
  talkT: "How are you feeling right now?", talkBreath: "Shall we breathe together for a minute?", talkHelp: "If you need to talk to someone, you'll find who can help in More.", talkSaved: "I wrote it in your journal.", talkQ: "How are you feeling right now?",
  talkReply: [
    ["I'm sorry. I'm here with you, even if we just sit quietly together.", "Heavy days pass. Until then, one breath at a time."],
    ["That happens. Shall we do something small and kind for you?", "That's okay. You don't have to be at your best every day."],
    ["An ordinary day is still a good day.", "Thanks for telling me. Let's keep going gently."],
    ["How lovely! It makes me want to hop around.", "I'm so glad! Let's hold on to this moment."],
    ["Hooray! You're my favourite person today more than ever!", "What joy! Shall we have a tiny party?"]
  ],
  napSay: "Good night... zzz", wakeSay: "What a lovely nap! I'm back.",
  stroke: ["Mmm, that's nice...", "A little more!", "I feel all fluffy."],
  tickle: ["Haha, no tickling!", "Hehehe, stop, stop!"],
  photoT: "What a lovely photo!", photoMaking: "Developing the photo...",
  letterT: "A letter for you", letterL: "Read today's letter", letterSign: (n) => `With love, ${n}`,
  letters: [
    "Hi! I'm so happy we met. From today on we keep each other company, one step at a time.",
    "Last night I dreamt we were flying above the clouds. You were laughing so much. What a lovely dream!",
    "I found something out: when you drink a little water, I feel fresher too.",
    "You don't have to do everything today. Doing something is enough. The rest can wait.",
    "I counted the stars from the window. I lost count a bit, but it was fun anyway.",
    "Do you know my favourite part of the day? When you show up.",
    "One week together! I've got a huge hug ready for you. Imagine it really tight.",
    "If today is a wonky day, that's okay. Wonky days end too.",
    "I tried baking cookies. They came out a little burnt, but made with love.",
    "Remember to look at the sky at least once today. It's free and it's beautiful.",
    "I learned to whistle! Sort of. Let's say I'm working on it.",
    "Thank you for taking care of yourself. That way you take care of me too.",
    "Let's try something today: say one kind thing to yourself, like you would to a friend.",
    "Two weeks together! I've grown, and you've come a long way too. I can tell.",
    "I like rain: it makes plants grow and everything smells nicer.",
    "I tidied my room. Well, I moved one sock. It's a start!",
    "Every small step counts. Even the ones nobody sees.",
    "Last night the moon was so big it looked like it wanted to come in through the window.",
    "If you feel tired, rest. Resting is not wasting time.",
    "I love it when you tell me about your day in the journal. Even just one line.",
    "Three weeks together! You're a special person. Never forget that."
  ],
  giftBig: (s) => `Today's gift: +${s} Tanì!`,
  teaserT: "Come back tomorrow!", teaserP: (s) => `Tomorrow's gift will be worth +${s} Tanì. Every 7 days in a row there's a special surprise.`, visitL: (n) => n === 1 ? "1 day visiting" : `${n} days visiting in a row`,
  specialT: "Special gift!", specialP: (i) => `So many days in a row together: ${i} is yours!`, specialOnly: "Days-in-a-row prize",
  tut: [
    "This is {n}! Tap to give a cuddle, or stroke by dragging your finger.",
    "There's a gift every day, and it gets bigger if you come back tomorrow. Open it!",
    "Here you can give a snack, play together, talk, put them down for a nap or take a photo.",
    "These are your goals. When you've done one, tap it: {n} gets energy and you earn Tanì.",
    "With full energy, {n} goes on an adventure. Down here you'll find adventures, home, journal and settings."
  ],
  tutNext: "Next", tutSkip: "Skip", tutDone: "Got it!",
  privT: "Privacy", privP: "Your companion, goals and journal stay on this device. If you create an account, we also save your email and a backup of your progress, only so you can get it back. To improve the app we count some actions anonymously and in aggregate (for example how often it's opened). Tanetto is not a medical tool and is for all ages: under the age of digital consent in your country (13 to 16, depending on where you live), ads are never personalised and the online backup isn't available.",
  hapticL: "Vibration", trackL: "Now playing", tracks: ["Sunny morning", "Little walk", "Warm tea", "Lullaby"],
  feedbackT: "Tell me what you think", feedbackP: "A tip, a problem, an idea: every message helps make Tanetto better.", feedbackB: "Write a message",
  tomorrow: "Tomorrow I'll have a surprise for you. I'll be waiting!",
  idle: ["Did you know clouds are made of tiny droplets?", "A little song popped into my head... la la la!", "Do you think the stars know each other?", "I feel extra fluffy today.", "If I were a cookie, I'd be a chocolate one.", "Have I told you you're great at the small things? You are.", "I saw a butterfly! I think it waved at me.", "Sometimes I just like being here with you."]
});
T.en.items.teddy = "Teddy bear"; T.en.items.fishbowl = "Goldfish"; T.en.items.w_stars = "Starry sky";
T.en.talk.morning.push("I opened the window: the air smells like a fresh start.", "How about a gentle day?", "Let's have breakfast slowly, okay?");
T.en.talk.day.push("Hey, have you had some water?", "Everything you do for yourself is a win.", "I'm here, step by step.");
T.en.talk.evening.push("No rush tonight, promise.", "What did you enjoy today?", "Evening lights are my favourite.");
T.en.talk.night.push("Still up at this hour? Let's take it slow.", "The pillow is waiting for us.", "Tomorrow is another lovely chance.");
T.en.talk.pat.push("I love it when you're here!", "One more, please!", "I feel all warm and cosy.");
T.en.talk.cheer.push("Great! One more step.", "I knew you could do it.", "So proud!");
