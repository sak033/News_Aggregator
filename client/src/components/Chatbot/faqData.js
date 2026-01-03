const faqData = [
  {
    intent: "about",
    keywords: ["website", "about", "this site", "platform"],
    answer:
      "This is a News Aggregator website that shows latest headlines, categories, e-paper, search and full news articles in one place."
  },
  {
    intent: "epaper",
    keywords: ["epaper", "e-paper", "newspaper"],
    answer:
      "You can read the digital newspaper from the E-Paper section. It shows daily editions just like a real newspaper."
  },
  {
    intent: "search",
    keywords: ["search", "find", "look for"],
    answer:
      "Use the search icon at the top-right to find news by keyword, country or topic."
  },
  {
    intent: "categories",
    keywords: ["categories", "sections", "topics"],
    answer:
      "News is organized into categories like Politics, Business, Sports, Technology and more."
  },
  {
    intent: "contact",
    keywords: ["contact", "support", "help"],
    answer:
      "You can contact us using the Contact page available in the menu."
  },
  {
    intent: "theme",
    keywords: ["dark mode", "light mode", "theme"],
    answer:
      "You can switch between light and dark mode from Settings in the header."
  }
];

export default faqData;
