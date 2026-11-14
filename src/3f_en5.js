Object.assign(T.en, {
  gamesT: "Games and activities", gamesP: "Little activities to feel good, together.", gameSeedsInfo: (n, m) => `Tanì from games today: ${n}/${m}`,
  games: { stars: ["Catch the stars", "A quick game to wake you up"], letgo: ["Let it go", "Put a thought in a bubble and watch it float away"], garden: ["Gratitude garden", "Every good thing becomes a flower"], wave: ["Breathe with the wave", "Hold while the wave rises"], sing: ["Sing with me", "Repeat your companion's notes"], stretch: ["Let's stretch", "One minute of stretching together"], memory: ["Pebble pairs", "Find the matching pairs"], tricks: ["Tricks", "What they've learned"] },
  start: "Start",
  letgoP: "Write down a thought that's weighing on you. It won't be saved anywhere.", letgoPh: "e.g. tomorrow's meeting", letgoB: "Let it go", letgoDone: "Floated away. Breathe: it's a little lighter now.", letgoAgain: "Another thought",
  gardenP: "Write one good thing from today: it will become a flower in your garden.", gardenPh: "e.g. coffee with a friend", gardenB: "Plant the flower", gardenN: (n) => n === 1 ? "1 flower" : `${n} flowers`, gardenEmpty: "The garden is waiting for its first flower.", gardenDone: "What a lovely flower! The garden grows with you.", gardenList: "Your flowers",
  waveP: "Hold and breathe in while the wave rises. Let go and breathe out as it falls. Nice and slow.", waveIn: "Hold and breathe in", waveOut: "Let go and breathe out", waveScore: (p) => `In rhythm: ${p}%`, waveDone: "So calm. Your breath is your superpower.",
  singP: "Listen to the notes and repeat them by tapping the flowers. One more note each round.", singListen: "Listen...", singYou: "Your turn!", singEnd: (n) => `You repeated ${n} notes in a row!`,
  stretchP: "Six slow moves, ten seconds each. Stop if anything hurts.", stretchDone: "Done! Your body says thank you.",
  poses: [["Arms to the sky", "Reach your arms up and breathe."], ["Lean right", "Gently bend your upper body to the right."], ["Lean left", "Now gently to the left."], ["Soft shoulders", "Make slow circles with your shoulders."], ["Relaxed neck", "Tilt your ear towards your shoulder, then switch sides."], ["Final breath", "Hands on your belly and one deep breath."]],
  memP: "Turn over two pebbles at a time and find the pairs.", memMoves: (n) => `Moves: ${n}`, memEnd: (n) => `All pairs in ${n} moves!`,
  tricksP: "They learn a new trick at every level. Tap one to see it.", tricks: ["Hop", "Spin", "Little dance", "Somersault", "Wave", "Juggling", "Rainbow"], trickNew: (x) => `New trick: ${x}!`,
  share: "Share", shareText: "My companion on Tanetto", shareFallback: "Press and hold the image to save it, then share it wherever you like.", shareLevel: (n, l) => `${n} reached level ${l}!`, shareRecord: (n) => `New record: ${n} points!`, shareMaking: "Making the image...",
  together: "What about you? Let's have a snack together!", togetherBtn: (g) => `I did it too: ${g}`,
  ritualT: "Bedtime ritual", ritualP: "Three small steps before sleep. Do the ones you like.", ritual: ["Soft lights", "Phone away from the bed", "One good thought from today"], ritualB: "Good night",
  visit: (f) => `${f} came to visit me today!`, visitHi: (f) => `${f} says hi!`,
  remind: { water: "Hey, it's a good moment for a glass of water.", pause: "How about a little break? Even five minutes.", sleep: "It's getting late. Bed is waiting for us.", move: "Shall we stretch our legs a little?" },
  summaryT: (n) => `${n}'s weekly recap`, summary: (g, best) => g ? `This week you completed ${g} goals. Your best day was ${best}. I'm so proud of you!` : "This week was a quiet one. That's okay: let's start again together, one step at a time.",
  legalT: "Guide and info", guideB: "How it works", privB: "Privacy policy", termsB: "Terms of use", healthB: "Health notice", creditsB: "Credits and licences", tutAgain: "Replay the welcome tour", ownerMissing: "[to be completed before publication]",
  guide: [
    ["How does Tanetto work?", "You choose small goals to take care of yourself. Every time you complete one, your companion gets energy and you earn Tanì."],
    ["What are Tanì for?", "With Tanì you decorate the home and choose what your companion wears. You earn them with goals, gifts, adventures and games."],
    ["What's energy?", "When you complete all of today's goals, energy is full and your companion can go on an adventure. They come back with a postcard."],
    ["And happiness?", "It goes up when you take care of yourself and do things together. It never drops on its own: nobody here will make you feel guilty."],
    ["What if I skip a day?", "No big deal. You can mark a rest day and your streak stays safe. The daily gift simply starts again from the beginning."],
    ["What are seasonal festivals?", "Each season, completing 20 goals wins a special hat for your companion."],
    ["How do I share my progress?", "Tap “Share” on the weekly postcard, photos, the garden, travel postcards or when you level up."],
    ["Where is my data?", "Only on this device. If you change phone or clear your browser data, your progress starts from zero."]
  ],
  terms: [
    "Tanetto is a free preview version, provided as is, with no guarantee of continuous operation. It may change or stop at any time.",
    "The app helps you build small daily habits with a virtual companion and does not replace medical or psychological advice.",
    "What you write is yours and stays on your device. Use the app calmly, without pushing yourself.",
    "Tanetto's illustrations, texts, music and code are protected by copyright and may not be copied or reused without permission.",
    "For any question you can write to the contact listed in the privacy policy."
  ],
  health: [
    "Tanetto is not a medical device and does not provide diagnosis, treatment or therapy.",
    "The breathing and stretching exercises are gentle. Stop right away if you feel pain, dizziness or discomfort, and ask a doctor if in doubt.",
    "If you're going through a hard time, talk to someone you trust or to a professional. If you're in danger, call the numbers below right away."
  ],
  credits: [
    "Illustrations, characters, texts and music were created specifically for Tanetto.",
    "Fonts: Fredoka and Figtree, licensed under the SIL Open Font License 1.1.",
    "Animations: the GSAP library, distributed free of charge by Webflow under its licence.",
    "The real places on the postcards are original, simplified illustrations."
  ],
  tracks: ["Sunny morning", "Little walk", "Warm tea", "Lullaby", "Flower meadow", "Drizzle", "Slow clouds", "Lanterns", "Lake waves", "Quiet woods", "Lazy Sunday", "Shooting stars"]
});
