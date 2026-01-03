import faqData from "./faqData";

const greetings = [
  "Sure 😊",
  "Got it 👍",
  "Absolutely!",
  "Here you go 👇",
  "No worries 🙂"
];

export function getBotReply(userMessage, lastTopic) {
  const msg = userMessage.toLowerCase();
  const greet = greetings[Math.floor(Math.random() * greetings.length)];

  /* 1️⃣ GREETINGS */
  if (
    msg === "hi" ||
    msg === "hello" ||
    msg === "hey" ||
    msg.includes("hii")
  ) {
    return {
      reply: "Hi 👋 I’m your AI assistant. Ask me anything about this website!",
      topic: "greeting"
    };
  }

  /* 2️⃣ WHAT CAN YOU DO */
  if (
    msg.includes("how can you help") ||
    msg.includes("what can you do") ||
    msg.includes("your work") ||
    msg.includes("features")
  ) {
    return {
      reply:
        "I can help you explore news categories 📰, read the e-paper 🗞️, search articles 🔍, explain features and guide you around the website.",
      topic: "capabilities"
    };
  }


  /* 🟢 POSITIVE / SMALL TALK */
if (
  msg.includes("great") ||
  msg.includes("nice") ||
  msg.includes("cool") ||
  msg.includes("awesome") ||
  msg.includes("thanks") ||
  msg.includes("thank you") ||
  msg.includes("ok") ||
  msg.includes("okay") ||
  msg.includes("got it")
) 
{const happyReplies = [
  "😊 Glad to hear that! Let me know if you need anything else.",
  "Awesome! 🚀 What would you like to explore next?",
  "Happy to help 😄 Ask me anything!",
  "Great 👍 I’m here if you need me."
];

return {
  reply: happyReplies[Math.floor(Math.random() * happyReplies.length)],
  topic: lastTopic
};
}



  /* 3️⃣ FAQ MATCHING */
  for (let item of faqData) {
    for (let key of item.keywords) {
      if (msg.includes(key)) {
        return {
          reply: `${greet} ${item.answer}`,
          topic: key
        };
      }
    }
  }

  /* 4️⃣ FOLLOW-UP QUESTIONS */
  if (lastTopic && msg.includes("more")) {
    return {
      reply: `${greet} Let me explain that in a bit more detail 😊`,
      topic: lastTopic
    };
  }

  /* 5️⃣ SMART FALLBACK */
  return {
    reply:
      "🤔 I didn’t fully understand that. You can ask about news, e-paper, search, categories, dark mode or website features.",
    topic: lastTopic
  };
}
