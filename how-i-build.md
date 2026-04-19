# How I Build

I build in two very distinct modes.

## Work

### What

- Enterprise workflow automation for a Fortune 100 FI
- Think: An internal Zapier PaaS with extreme reliability and auditability, built for people who are nervous about what they're doing

### How

- Staying close to users, taking copious notes, identifying trends among them, and solving problems beyond my domain
  - What is the Big Problem you're thinking about today? What strikes your intuition as the best solution?
  - Where are you running into friction?
  - You mentioned X. Pat has been having the same problem recently; would you like me to introduce you?
  - If you could wave a magic wand and create an outcome, what would it be?
    - I don't have a magic wand, but I can do Y for you. What impact would that have on your work? What about Z instead?
- Product-led growth is critically important for internal platforms too
  - Never rely on mandates. Strive for internal market fit. Relying on a mandate will inevitably lead to unhappy customers that are trying to find a way to work around you
  - And that's your primary competitor in the internal platform market: "Shadow IT" (not to be conflated with Hippelian [user-driven innovation](https://en.wikipedia.org/wiki/User_innovation))
  - How you beat this competitor: Work backward from the real problems your customers have, and present your product as the ultimate solution to what ails them (and deliver on it) (and be faster than everyone else)
- Force multiplication: I do not manage people (IC for life), but I keep an eye out for engineers and PMs with particular talent and particular underutilization
  - I spend time with them and ask them a ton of questions
  - I advocate for them and do my best to keep them challenged and excited
  - They invariably have really good ideas that no one has ever taken the time to ask them about
- Never neglect the architecture: DDD is your friend, and good fences make good neighbors
  - Especially in large corporate environments, people will always want to change your architecture ("we need a new endpoint", "we need to switch from framework A to B", "we need this to be synchronous")
  - But YOU and your team will be the ones that have to live with it. If it comes down to making a customer happy or establishing an architecture that can survive for the long haul, err on the side of the team
  - If "leadership" wants a change made, make them tell you why and make them prove it. Architecture changes are hard on everyone involved, and they can detract from your mission. Don't lightly accept anything
- Define and rank your THREE key metrics, and always be improving them
  - Currently, mine are:
    1. Time from concept to dev-start
    2. User engagement with new solutions
    3. Self-sufficent users / total users
  - Why? Because those are the big problems we have right now, and we have to fix them. They won't be different tomorrow, but they'll evolve with the product over time
  - Do not neglect HOW you gather and calculate the metrics. It's just as critical as the end result

## Play

### What

I focus my play building around a few key themes:

- I often build *at home* solutions to problems I'm frustrated about *at work*. It's 34% problem solving, 33% coping mechanism, and 33% pure enjoyment
- I often build things I'm trying to learn. I probably invested too much time in [NetworkX](https://networkx.org/), for example
- And I spend some time building solutions to personal problems. I'm that kind of person that spends a day automating something that takes a minute manually
- I almost always build with some market in mind. I'm usually looking for the user with that problem. I know this is backwards, but you have to get this out of your system away from work

### How

- Agent-driven everything
  - Yes, I've programmed all my life, but I'm too slow of a thinker and typist to compete with them
  - Where most agent-driven developers will treat the agents as junior engineering staff, I tend to assign them more senior roles. I use Gemini Thinking/Pro as a trusted architect and thinking partner and Cursor agents as senior implementation pros. I've also been working with Jules a bit, although it hasn't created much leverage to date
  - That said: Everything, everything, everything needs a human touch and human eyeballs reviewing it
- One way I build big back-end systems
  - Long exploratory conversation with Gemini that results in some form of markdown or Github issues/roadmap
  - Carve out bite-sized pieces for Cursor to build
  - Take Cursor's branch back to Gemini and have it review. If not aligned with our intent, have it create a prompt for Cursor to fix
  - Iterate until done
- One way I build UI
  - Write initial prompt for Cursor to build the page structure with throwaway placeholders (e.g. `<article>Some Table</article>`)
  - Have Cursor build multiple variants of each component for me to choose from
  - Have Cursor build in the ability to display different combinations via quick and dirty configuration
  - Select the most promising gestalts, and ultimately select the winner
