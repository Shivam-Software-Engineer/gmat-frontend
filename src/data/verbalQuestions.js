const questions = [
    // Reading Comprehension (with shared passage)
    {
      id: 1,
      type: 'RC',
      passage: `This passage refers to Questions 1 to 3.
          The insistence upon the legal rather than the economic conception of property dates from the period when virtually all existing credit consisted of consumption credit rather than production credit and when indebtedness played a very small role in the social economy. In modern times, however, credit has become the very basis of business enterprise. Under these circumstances, the problem of indebtedness assumes a new significance. It was but natural, therefore, that the property tax, where it still existed, should take some account of this new condition and should endeavor to make allowance for debts. But experience soon showed that this attempt was fraught with great practical difficulties. As we have seen in the United States, the creation of fictitious debts became such a paying investment that most of the states that introduced the system were compelled again to abolish it. As a consequence, some states today deduct mortgage debts from real estate; others deduct general indebtedness from personal estate; a few permit deduction for indebtedness in general; while most of the states allow either for no deduction at all, or for deduction in only personal or real estate. Such a situation is bound to be unsatisfactory.`,
      text: " The primary purpose of the passage is to",
      options: [
        "illustrate how the rise of modern credit fundamentally altered legal notions of property.",
        "analyze the difficulties and unintended consequences that emerge when property-tax systems try to account for indebtedness.",
        "advocate the creation of uniform national rules permitting taxpayers to deduct bona fide debts from property assessments.",
        "compare economies based on consumption credit with those based on production credit to highlight broader social changes.",
        "trace the historical development of mortgage-deduction provisions in several U.S. states."
      ],
      answer: 1,
      explanation: `The correct answer is Option B. The passage is mainly explaining the historical evolution and practical difficulties of incorporating debt deductions into property tax systems, particularly in the United States, due to the changing nature of credit.`
    },
    {
      id: 2,
      type: 'RC',
      passage: `This passage refers to Questions 1 to 3.
          The insistence upon the legal rather than the economic conception of property dates from the period when virtually all existing credit consisted of consumption credit rather than production credit and when indebtedness played a very small role in the social economy. In modern times, however, credit has become the very basis of business enterprise. Under these circumstances, the problem of indebtedness assumes a new significance. It was but natural, therefore, that the property tax, where it still existed, should take some account of this new condition and should endeavor to make allowance for debts. But experience soon showed that this attempt was fraught with great practical difficulties. As we have seen in the United States, the creation of fictitious debts became such a paying investment that most of the states that introduced the system were compelled again to abolish it. As a consequence, some states today deduct mortgage debts from real estate; others deduct general indebtedness from personal estate; a few permit deduction for indebtedness in general; while most of the states allow either for no deduction at all, or for deduction in only personal or real estate. Such a situation is bound to be unsatisfactory.`,
      text: "Which of the following statements is not supported by the passage?",
      options: [
        "Modern businesses rely extensively on the availability of credit in order to engage in production.",
        "Many people in the United States invented fake debts and liabilities to take advantage of tax exemptions for indebtedness.",
        "Systems of tax exemption which were easy to exploit were revoked by many governments.",
        "Prior to modern finance, businesses did not use credit to engage in production.",
        "The extent of credit usage in the modern economy has changed its social significance."
      ],
      answer: 3,
      explanation: "The correct answer is Option D. The author explicitly mentions that pre-modern economies made greater use of consumption credit rather than production credit. This does not mean that no credit is involved in production but it can be inferred that overall production centers were fewer. A farmer buying seeds using loans or promising a share of the harvest in exchange for the money, the seeds or field labor are all ancient examples of production credit. What was more common was consumption credit: providing grain in exchange for a promise of services all year long from a butcher, a tailor, a miller, a cowherd, etc. Such examples of credit were more numerous on the consumption side rather than the production side."
    },
    {
      id: 3,
      type: 'RC',
      passage: `This passage refers to Questions 1 to 3.
          The insistence upon the legal rather than the economic conception of property dates from the period when virtually all existing credit consisted of consumption credit rather than production credit and when indebtedness played a very small role in the social economy. In modern times, however, credit has become the very basis of business enterprise. Under these circumstances, the problem of indebtedness assumes a new significance. It was but natural, therefore, that the property tax, where it still existed, should take some account of this new condition and should endeavor to make allowance for debts. But experience soon showed that this attempt was fraught with great practical difficulties. As we have seen in the United States, the creation of fictitious debts became such a paying investment that most of the states that introduced the system were compelled again to abolish it. As a consequence, some states today deduct mortgage debts from real estate; others deduct general indebtedness from personal estate; a few permit deduction for indebtedness in general; while most of the states allow either for no deduction at all, or for deduction in only personal or real estate. Such a situation is bound to be unsatisfactory.`,
      text: "What does the author say is an unsatisfactory situation?",
      options: [
        "That people invented fake debts to gain tax exemptions.",
        "That tax system loopholes can be easily exploited.",
        "The property tax exists.",
        "That credit availability is the basis of production in the modern economy.",
        "That different states in the U.S. have conflicting rules about tax deductions for indebtedness."
      ],
      answer: 4,
      explanation: "The correct answer is Option E. The sentence about “unsatisfactory situation” directly follows the description of diverse rules across different states about debt-related deductions in the U.S. after first having mentioned that such deductions were often exploited by invention of fake debts. Given the overall passage’s historical focus, only the complicated situation in the U.S. is what warrants the label of “unsatisfactory situation.”"
    },
    {
      id: 4,
      type: 'RC',
      passage: ` The first and most important subject lying at the very threshold of the investigation, is the freedom of the human will. On the establishing of this doctrine depends the whole question of human responsibility, and yet it is a doctrine which Aristotle could not assume at once, because views had been held respecting it which required refutation. Socrates had held that all the virtues were sciences; therefore, that vice was the result of ignorance; that no one sins contrary to knowledge; and therefore, that vice is involuntary. Plato held that virtue was voluntary, because the natural bias of the will was towards good, but that a vicious state was an unnatural one—a morbid action, as it were, and therefore involuntary. Aristotle agreed with Plato so far as to maintain that a bias towards virtue is the normal condition of the will.`,
      text: " In the given passage, the two sections in boldface play which of the following roles?",
      options: [
        "The first section opens the topic of free will and the second goes into details about Aristotle’s opinions.",
        "The first section introduces Aristotle’s favorite topic of exploration and the second section explains why he was attracted to it.",
        "The first section introduces the topic of freedom of will, and the second introduces Aristotle’s reason for not freely or directly assuming it as a given.",
        "The first section introduces the doctrine of human free will and the second section opens the explanation for why Aristotle did not feel it is an idea that should be respected.",
        "The first section is a preamble to the second section that introduces why Aristotle thought that the doctrine of free will should be respected."
      ],
      answer: 2,
      explanation: `The correct answer is Option C. The first section opens the passage by introducing the topic of free will and then the second section introduces the idea that Aristotle felt it was too complex a doctrine to accept directly at face value without considering and clarifying some perspectives which had been put forth by older philosophers. Neither section says anything about whether Aristotle likes the topic or if he respects the topic. The word “respecting” is used synonymously with “regarding” or “about” here. Option A is close because the second section does in fact deal with Aristotle’s opinions, but when comparing A and C, the one that is more precise and exact is Option C.`
    },
    {
      id: 5,
      type: 'RC',
      passage: `As layers of material build up and the pressure from upper levels turns the lower layers harder and harder, sedimentary rock begins to form inside the earth's crust.  A specific sedimentary rock stratum that has an unusually high concentration of the metal iridium supports the idea that a meteorite struck the earth approximately 60 million years ago. Geologists hypothesize that the meteorite's impact with the earth created a massive cloud of dust containing iridium since meteorites are richer in iridium than the earth's crust. They claim that the dust finally dropped on Earth, where it mixed with other materials to produce a layer of iridium-rich rock as other layers accumulated on top of it.`,
      text: "Which one of the following, if true, most seriously weakens the argument that the iridium-rich layer described in the passage is evidence of a meteorite collision?",
      options: [
        "The huge dust cloud described in the passage would have blocked the transmission of sunlight and lowered the earth’s temperature.",
        "A layer of sedimentary rock takes millions of years to harden.",
        "Layers of sedimentary rock are used to determine the dates of prehistoric events whether or not they contain iridium.",
        "Sixty million years ago there was a surge in volcanic activity in which the matter spewed from volcanoes formed huge iridium-rich dust clouds.",
        "The iridium deposit occurred at about the same time that many animal species became extinct and some scientists have theorized that mass dinosaur extinctions were caused by a meteorite collision."
      ],
      answer: 3,
      explanation: `Option D would counter the claim that a meteorite strike deposited the iridium found in that layer. By contrast, both options A and E are statements that support the meteorite theory, especially when viewed together. Options B and C are irrelevant.`
    },
    {
      id: 6,
      type: 'RC',
      passage: `A certain king of Wales who lived in the tenth century, named Hoel the Good, fixed the price of a blind that is, of a new-born, kitten at one penny. A penny was a good deal in those days, remember: but the kitten’s price soon rose, for as soon as it could see and had killed one mouse, it was to fetch twopence; and as soon as it was known to be a good mouser, then the price was fourpence: a sum which many young folks of those times must have thought a small fortune. To compare, full-grown sheep or untrained house-dogs were also valued at fourpence. So it was quite realistic for a miller in a popular fairy tale to leave his three sons his mill, his donkey and his cat as their inheritance. If the youngest son who felt he was stuck with the future Puss in Boots had sold his cat instead of giving it a pair of boots as suggested, he could have been left with a profit of three pence to build a business of his own, rather than married to a princess because of the clever cat’s machinations.`,
      text: "Which of the following is an assumption that the passage depends upon?",
      options: [
        "The miller’s son could have bought a sheep to start a wool business by selling the cat.",
        "The miller had considered the cat a valuable investment to prevent rat infestations.",
        "The miller had bought the cat as a kitten.",
        "The miller’s son would have been willing to sell a talking cat.",
        "Puss in Boots was a male cat that wouldn’t be able to have kittens that could also be sold for more money."
      ],
      answer: 2,
      explanation: `The correct answer is Option C. The passage explicitly mentions that there would have been a profit of threepence if the cat was sold. This would mean that the cat was bought for a penny as a blind kitten, which would be the original price to be subtracted from the selling price of fourpence. The rest of the options, about the miller’s son’s ability to start a wool business, his willingness to sell the cat, or his ability to breed the cat and sell kittens, are all inferences that have nothing to do with the given passage. If the cat was not bought as a kitten for a penny, the sentence in the passage about his profit would be rendered void. None of the other options being negated would have any impact on any of the information in the passage.`
    },
    {
      id: 7,
      type: 'RC',
      passage: `  Which of the following most logically completes the argument?
          The country of Ironlandia is rolling out a data ownership pilot that will allow its citizens to manage, own, and profit from their digital footprint – the first such nationwide initiative in the world. The city of Brassilita already successfully monetizes government data including transportation and education information. The president has said that the project promotes financial inclusion and redefines the digital economy from a fairer perspective. Last year, Ironlandia Congress drafted a bill that classifies data as personal property and the current data protection law classifies data as a personal, inalienable right. The new legislation gives people full rights over their personal data – especially data created through use and access of online platforms, apps, marketplaces, sites and devices of any kind connected to the web. It has garnered bipartisan support and is currently being evaluated in Congress. A computer science professor consulted for the draft says it is an opportunity to regulate access to his data: if you don’t accept bids, companies won’t be able to use your data. But not all users are as savvy. The same professor’s university had conducted a survey last year and found that __________________`,
      text: " The primary purpose of the passage is to",
      options: [
        "only 3 in 10 Ironlandians were aware of the opportunities enabled by the bill. Most people had not even heard of the effort as most local news outlets were slow to pick up the news.",
        "95% of the nation’s citizens were functionally illiterate and had low digital proficiency. Combine that with slow internet connectivity, and it means they generate less data online. Data monetization could also pressure such vulnerable people to forego privacy for a quick buck, subverting the basic logic behind the protection of personal data.",
        "the majority of citizens do not even have internet connections. The data ownership bill will effectively only benefit the top 20% of economy, further exacerbating the divide in income levels.",
        "dapproximately 76% of citizens were functionally illiterate and heavily relied on accessibility tools like screen-readers and voice-to-text applications for everyday tasks. This makes it all the more important to ensure that companies do not exploit the reams of data such users generate.",
        "80% of citizens were in favor of government surveillance for flagging malicious behavior, like someone googling how to build a bomb. Such monitoring would also become more difficult if the bill is enacted."
      ],
      answer: 1,
      explanation: `The correct answer is Option B. It appropriately continues from the given passage and goes into details about the University’s survey that are related to the average Ironlandian user not being “as savvy” as the computer science professor in a way that has a direct relation to the bill being discussed. Option A is irrelevant to the passage. Option C is somewhat related but it begs the question why a country where the majority of citizens don’t have internet would focus on a data ownership law. Option D is also seemingly related but it does not directly connect as properly to the point about the savviness of the average citizen. Option E is a relevant public security issue but it is unclear how it connects to the rights of a user over data: the existence of private property does not imply that the government has no information about it; rather, the government can only enforce a citizen’s rights to private property if it knows what belongs to the person, and it can also examine or survey that property as long as it has valid reasons for doing so. Internet companies also have their own safeguards about potentially dangerous user behavior.`
    },
];

export default questions;

// {
//       id: 1,
//       type: 'RC',
//       passage: "The city's new bike-sharing program has seen a 30% increase in ridership since its launch last spring. Officials attribute this success to several factors: the addition of 50 new docking stations, a mobile app that makes bike rentals more convenient, and an advertising campaign highlighting the health benefits of cycling. The program now serves approximately 15,000 daily riders, with peak usage occurring during morning and evening commute times.",
//       text: "The primary purpose of the passage is to:",
//       options: [
//         "Criticize the shortcomings of the bike-sharing program",
//         "Explain the reasons behind the program's increased ridership",
//         "Compare bike-sharing programs in different cities",
//         "Argue for increased government funding of cycling infrastructure"
//       ],
//       answer: 1,
//       explanation: "The passage focuses on explaining the factors contributing to the program's success (new docking stations, mobile app, advertising campaign) rather than criticizing, comparing, or arguing for funding."
//     },
//     {
//       id: 2,
//       type: 'RC',
//       passage: "The city's new bike-sharing program has seen a 30% increase in ridership since its launch last spring. Officials attribute this success to several factors: the addition of 50 new docking stations, a mobile app that makes bike rentals more convenient, and an advertising campaign highlighting the health benefits of cycling. The program now serves approximately 15,000 daily riders, with peak usage occurring during morning and evening commute times.",
//       text: "Which of the following can be inferred about the bike-sharing program?",
//       options: [
//         "It was more successful than officials anticipated",
//         "Convenience appears to be an important factor for users",
//         "Most riders use the bikes for recreational purposes",
//         "The program has reduced traffic congestion in the city"
//       ],
//       answer: 1,
//       explanation: "The mention of a mobile app making rentals 'more convenient' and the program's success suggests convenience is important. The passage doesn't mention expectations, recreational use, or traffic reduction."
//     },
//     // Critical Reasoning
//     {
//       id: 3,
//       type: 'CR',
//       text: "A new tax on sugary drinks aims to reduce obesity. Which of the following would best support the effectiveness of this plan?",
//       options: [
//         "Many citizens dislike paying higher prices for soda",
//         "Sugary drinks have no nutritional value",
//         "Countries with similar taxes show decreased sugar consumption",
//         "People will likely switch to equally unhealthy energy drinks"
//       ],
//       answer: 2,
//       explanation: "Evidence from other countries showing decreased sugar consumption would directly support the tax's effectiveness. The other options either don't support effectiveness (A, D) or are irrelevant (B)."
//     },
//     // Sentence Correction
//     {
//       id: 4,
//       type: 'SC',
//       text: "The artist, along with her students, ___ preparing for the exhibition.",
//       options: ["are", "were", "is", "have been"],
//       answer: 2,
//       explanation: "The subject is 'the artist' (singular) with 'along with her students' as a modifying phrase, so the verb should be singular 'is' to agree with the singular subject."
//     },
//     // Another Reading Comprehension set
//     {
//       id: 5,
//       type: 'RC',
//       passage: "Recent studies on workplace productivity have challenged conventional wisdom about open office plans. While these layouts were designed to foster collaboration, research indicates they may actually reduce face-to-face interaction by up to 70% compared to traditional offices. Employees in open plans tend to use email and messaging more frequently, possibly because the lack of privacy makes them reluctant to have conversations that might disturb colleagues. Noise levels in open offices are typically 10-15 decibels higher than in partitioned spaces.",
//       text: "According to the passage, open office plans have led to:",
//       options: [
//         "Increased face-to-face collaboration",
//         "Greater employee satisfaction with workspace",
//         "More electronic communication among employees",
//         "Lower overall noise levels in the workplace"
//       ],
//       answer: 2,
//       explanation: "The passage states employees use email/messaging more frequently in open offices. It contradicts A and D, and doesn't mention satisfaction (B)."
//     },
//     {
//       id: 6,
//       type: 'RC',
//       passage: "Recent studies on workplace productivity have challenged conventional wisdom about open office plans. While these layouts were designed to foster collaboration, research indicates they may actually reduce face-to-face interaction by up to 70% compared to traditional offices. Employees in open plans tend to use email and messaging more frequently, possibly because the lack of privacy makes them reluctant to have conversations that might disturb colleagues. Noise levels in open offices are typically 10-15 decibels higher than in partitioned spaces.",
//       text: "The author's attitude toward open office plans can best be described as:",
//       options: [
//         "Strongly supportive",
//         "Cautiously optimistic",
//         "Neutral and objective",
//         "Skeptical or critical"
//       ],
//       answer: 3,
//       explanation: "The author presents research findings that challenge the benefits of open offices (reduced interaction, more messaging, higher noise) without overt negativity, suggesting a skeptical/critical stance."
//     }