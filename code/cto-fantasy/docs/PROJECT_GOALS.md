# Project Goals

To accurately model the software development process and teach best practices in software development in the following 3 areas:

- Agile practices
- Quality Assurance practices
- Software engineering practices

The specific properties representing all the attributes of these 3 areas will be represented by values ranging from 0 to 1. The number of possible attributes is huge and to keep the project under control they will be added iteratively.

# Project Requirements

## 1. Minimum Viable Product

The MVP should include the following:

1. Company selection
2. Team randomisation
   - skill
   - quality mindset
   - collaboration
3. Customer & customer priorities
   - Customer priorities should change each sprint.
   - The player should be able to view the priorities at any time.
   - The priorities should impact customer satisfaction at the end of the sprint.
4. Sprints (2+)
5. Sprint events
   - ~~Refinement~~
   - Sprint Planning
   - ~~Daily Scrum~~
   - Sprint Review
   - ~~Sprint Retrospective~~
6. Feedback about customer satisfaction at the end of a sprint
7. Stories and bugs completed
   - How to represent whether the team completed work in priority order?
   - Use collaboration and flow to determine if the team focussed on getting tickets to done together, rather than working seperately.
8. Bugs raised, based on team's
   - skill
   - quality mindset
   - collaboration

## 2. Introduce a knowledge/attribute matrix

As the number of attributes representing skills and knowledge is potentially large, change the existing fixed attributes into a knowledge matrix. Perhaps a map of properties, that could grow arbitrarily.

For simplicity, assign these attributes to one of the 3 areas:

- skill [eng]
- quality mindset [QA]
- collaboration [agile]

This will also alow the following requirements to be comleted with a more limited set of attributes if required.

## 3. Introducing best practices via retrospectives

Based on the team members' own attributes, best practices can be introduced after every retrospective, representing their own desire to improve.

Practices could be "discussed" in retrospectives, when the team's knowlege hits a certain threshold.

Retrospectives should have more valuable outcomes, if the team's collaboration, communication and diversity is high.

- Code review (project level attribute 0 or 1, plus employee attribute 0-1)
- Unit testing (project level attribute 0 or 1, plus employee attribute 0-1)
- Pair programming
- Test design
- Automated testing
- CI/CD (project level attribute 0-1?)
- Tech talks (increase skill/experience of whole team)
- Product/Sprint goals
- WIP limits
- Better Daily Scrum practices

## 4. Company practices dashboard & in-sprint feedback

Provide a dashboard showing many/all of the attributes, displaying some text to indicate the quality of the attribute based on thresholds. This will allow the player to get a better understanding of how they are achieving.

For example:

"Unit testing: The project has 50% unit test coverage".

"Estimation: The team's estimates aren't very accurate".

Provide a real-time sprint burndown chart visible during the sprint (showing stories and bugs).

## 5. Introducing best practices via training or conference attendance

This may be the easiest way to introduce Agile practices. Employees could learn directly about:

- Estimation & refinement (increase estimation attribute, Agile knowledge)
- Retrospectives
- 3 Amigos (increase collaboration, quality mindset, Agile knowledge)
- Continous improvement
- WIP limits
- Flow
- Product/Sprint goals

And non-Agile topics

- CI/CD
- Cloud services

## 6. Introducing best practices via mini-games

To capture the player's own knowledge, introduce mini-games. The results of these mini-games can be captured and represented as attributes of the CTO, and provide influence in the game.

- Match words to concepts
- Multiple choice questions

## 7. Introducing best practices by hiring staff

Hiring good staff, with good attributes, will increase the likelihood of improvements being introduced during retrospectives and tech talks.

## 8. Load preset teams

In order to tune the gameplay, or later to teach specific scenarions, it should be possible to
load preset teams with controlled skill values into the game.

3 presets have been created:

REACT_APP_TEAM=poor npm start
REACT_APP_TEAM=average npm start
REACT_APP_TEAM=good npm start

## 9. Debug mode

Enable a debug mode to show more information when developing than will be seen by the player.

REACT_APP_DEBUG=on npm start

## 10. Burndown Feedback

Provide feedback to the player about their burndown chart and what it says about the team.
Check QA slides for examples (Lecture 7. Planning).

## 11. Hire Agile Coach

Whereas retrospective actions rely on a check against the team member's `agileMindset`
to successfully increase an attribute, an Agile coach could bypass this and have a
higher chance of increasing team members' `agileMindset` directly.

This should be made explicit to the player somehow.

## 12. Adjust team commitment

Adjust team commitment based on other commitments??

Allow user to adjust commitment manually.

## 13. Priorities

TODO:

- ~~Firefighting - introduce distractions (with a dialog popup) based on poor quality. For example: An issue with user data has been found in the production environment. Dave and Alison need to spend the day resolving it.~~
- ~~Workshops - From the Project Attributes scene, ask if you want to take some time out of next sprint to do a workshop with the team on a topic.~~
- Training - have team members ask to go on training courses next sprint.
- ~~The backlog seems to have a bug where items are being duplicated.~~

# Work remaining to finish game

1. Complete "game end" screen.
2. ~~Introduce workshops to directly teach the team topics.~~
3. Provide more feedback to the user about what's going on behind the scenes (probably at the end of a sprint)
4. Fix the backlog screen to allow scrolling.
5. Allow preset or weighted teams to be used to lessen the impact of randomness.
