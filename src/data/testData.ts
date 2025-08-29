import { TestSection } from '../types/test';

export const testSections: TestSection[] = [
  {
    id: 'grammar-vocabulary',
    title: 'Core Grammar & Vocabulary',
    timeLimit: 20,
    instructions: 'Choose the best answer (A, B, C, or D) for each question.',
    questions: [
      {
        id: 1,
        question: 'If I _________ more time, I would learn to play the guitar.',
        options: ['have', 'had', 'would have', 'having'],
        type: 'multiple-choice',
        section: 'grammar-vocabulary'
      },
      {
        id: 2,
        question: 'By the time we arrived, the meeting _________.',
        options: ['had already started', 'already starts', 'has already started', 'is already starting'],
        type: 'multiple-choice',
        section: 'grammar-vocabulary'
      },
      {
        id: 3,
        question: "She's the colleague _________ project won the company award.",
        options: ['who', 'which', 'whose', 'whom'],
        type: 'multiple-choice',
        section: 'grammar-vocabulary'
      },
      {
        id: 4,
        question: 'We look forward to _________ from you soon.',
        options: ['hear', 'hearing', 'heard', 'be hearing'],
        type: 'multiple-choice',
        section: 'grammar-vocabulary'
      },
      {
        id: 5,
        question: 'He _________ in London for five years before he moved to Paris.',
        options: ['lived', 'has lived', 'had lived', 'was living'],
        type: 'multiple-choice',
        section: 'grammar-vocabulary'
      },
      {
        id: 6,
        question: "Could you please turn _________ the music? It's a bit loud.",
        options: ['on', 'off', 'down', 'up'],
        type: 'multiple-choice',
        section: 'grammar-vocabulary'
      },
      {
        id: 7,
        question: 'Neither the manager nor the employees _________ happy with the new policy.',
        options: ['is', 'are', 'be', 'been'],
        type: 'multiple-choice',
        section: 'grammar-vocabulary'
      },
      {
        id: 8,
        question: 'This report _________ by the finance team yesterday.',
        options: ['was written', 'written', 'is written', 'wrote'],
        type: 'multiple-choice',
        section: 'grammar-vocabulary'
      },
      {
        id: 9,
        question: "I'll send you the data _________ I get back to my desk.",
        options: ['while', 'until', 'as soon as', 'during'],
        type: 'multiple-choice',
        section: 'grammar-vocabulary'
      },
      {
        id: 10,
        question: "It's important _________ your goals clearly.",
        options: ['to define', 'defining', 'define', 'defined'],
        type: 'multiple-choice',
        section: 'grammar-vocabulary'
      },
      {
        id: 11,
        question: 'The manager **commended** the team on their hard work.',
        options: ['criticized', 'praised', 'joined', 'dismissed'],
        type: 'multiple-choice',
        section: 'grammar-vocabulary'
      },
      {
        id: 12,
        question: 'The **objective** of the meeting is to brainstorm new ideas.',
        options: ['location', 'purpose', 'length', 'problem'],
        type: 'multiple-choice',
        section: 'grammar-vocabulary'
      },
      {
        id: 13,
        question: "Her response was rather **vague** and didn't answer the question directly.",
        options: ['clear', 'quick', 'unclear', 'angry'],
        type: 'multiple-choice',
        section: 'grammar-vocabulary'
      },
      {
        id: 14,
        question: 'We need to **postpone** the event until next week.',
        options: ['cancel', 'attend', 'delay', 'plan'],
        type: 'multiple-choice',
        section: 'grammar-vocabulary'
      },
      {
        id: 15,
        question: 'The software has a built-in feature to **streamline** the process.',
        options: ['complicate', 'describe', 'make more efficient', 'slow down'],
        type: 'multiple-choice',
        section: 'grammar-vocabulary'
      },
      {
        id: 16,
        question: "The project's **feasibility** is still being studied.",
        options: ['cost', 'possibility', 'timeline', 'manager'],
        type: 'multiple-choice',
        section: 'grammar-vocabulary'
      },
      {
        id: 17,
        question: 'Please **review** the document before the meeting.',
        options: ['forget', 'examine', 'lose', 'write'],
        type: 'multiple-choice',
        section: 'grammar-vocabulary'
      },
      {
        id: 18,
        question: 'They had a **brief** conversation in the hallway.',
        options: ['long', 'short', 'loud', 'angry'],
        type: 'multiple-choice',
        section: 'grammar-vocabulary'
      },
      {
        id: 19,
        question: 'The company is looking to **expand** into new markets.',
        options: ['reduce', 'leave', 'grow', 'invest'],
        type: 'multiple-choice',
        section: 'grammar-vocabulary'
      },
      {
        id: 20,
        question: 'Her argument was very **persuasive**.',
        options: ['confusing', 'convincing', 'weak', 'long'],
        type: 'multiple-choice',
        section: 'grammar-vocabulary'
      }
    ]
  },
  {
    id: 'listening',
    title: 'Core Listening',
    timeLimit: 15,
    instructions: 'You will hear a short audio recording ONCE. Then, answer the questions.',
    questions: [
      {
        id: 21,
        question: 'What document are Anna and Mark discussing?',
        options: ['The monthly budget report', 'The quarterly sales report', 'The annual performance review', 'The marketing strategy document'],
        type: 'multiple-choice',
        section: 'listening'
      },
      {
        id: 22,
        question: 'Which market showed positive results?',
        options: ['The European market', 'The American market', 'The Asian market', 'The African market'],
        type: 'multiple-choice',
        section: 'listening'
      },
      {
        id: 23,
        question: 'What concern does Mark express?',
        options: ['Rising costs in Asia', 'Staff shortages in America', 'A dip in sales in Europe', 'Marketing budget overruns'],
        type: 'multiple-choice',
        section: 'listening'
      },
      {
        id: 24,
        question: 'What does Anna think might be the cause of the problem?',
        options: ['Poor customer service', 'The delayed marketing campaign', 'Economic downturn', 'Competitor actions'],
        type: 'multiple-choice',
        section: 'listening'
      },
      {
        id: 25,
        question: 'What do they ask the European team to prepare?',
        options: ['A new marketing plan', 'Initial thoughts and customer feedback data', 'Budget proposals', 'Staff performance reviews'],
        type: 'multiple-choice',
        section: 'listening'
      }
    ]
  },
  {
    id: 'reading-writing',
    title: 'Core Reading & Writing',
    timeLimit: 25,
    instructions: 'Read the text carefully and answer all questions. Write your answers in the spaces provided.',
    questions: [
      {
        id: 26,
        question: 'List two advantages of remote work mentioned in the text.',
        type: 'text',
        section: 'reading-writing'
      },
      {
        id: 27,
        question: 'List two challenges of remote work mentioned in the text.',
        type: 'text',
        section: 'reading-writing'
      },
      {
        id: 28,
        question: 'What is the main goal for companies according to the final sentence?',
        type: 'text',
        section: 'reading-writing'
      },
      {
        id: 29,
        question: 'Based on the text above, write a short paragraph (approx. 100-150 words) arguing for either the advantages or the disadvantages of remote work. Use your own ideas to support your argument.',
        type: 'essay',
        section: 'reading-writing'
      }
    ]
  }
];

export const readingText = `Remote work, once a rarity, has become increasingly common. This shift offers significant advantages such as greater flexibility for employees, reduced commute times, and access to a wider global talent pool for employers. However, it also presents challenges like potential feelings of isolation among staff, difficulties in maintaining company culture, and the need for robust digital security measures. Companies are now tasked with developing new strategies to maximize the benefits of remote work while effectively mitigating its drawbacks.`;

export const listeningScript = `Hi Mark, have you had a chance to look at the quarterly sales report yet?

Hi Anna, yes, I went through it this morning. The figures are generally positive, especially in the Asian market. However, I'm a bit concerned about the dip in sales last month in Europe.

I saw that too. I think it might be related to the delayed marketing campaign. Let's schedule a brief meeting with the European team to discuss it. How about tomorrow at 10 am?

That works for me. I'll send out the calendar invites. Should we ask them to prepare some initial thoughts on the decline?

That's a good idea. Let's ask them to bring any data they have on customer feedback from that period as well.`;