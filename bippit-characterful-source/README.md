# Characterful

A thrilling React Native app, built with Expo, for web, android, and ios. Create a basic character sheet for tabletop games

## Setup

### The basics

1. `cd {characterful directory}`
2. `npm install`
3. `npm start`

### Expo Go & Development Clients

The app will be tested on both mobile phone emulators and the web, so all additions should aim to work across all three platforms.

If you have not previously used React Native, you will be able to run the code on your device via [the Expo Go app](https://docs.expo.dev/get-started/expo-go/).

If you encounter compatibility issues with Expo Go, you can also follow the React Native environment setup guide and create
a development client build by running the "android" or "ios" scripts.

If you need to run a development client, regardless of your platform of choice, you will likely find the least friction with an
android emulator as there will be no additional setup required once you have the emulator running.

## Spec

_We hope that this task will take you no more than a couple of hours to complete. If you find yourself spending more than a
few hours on the task, please do reach out to us and let us know. We don't want you spending too much time thinking, and if
we have underestimated how long it might take then we'd rather know so that we can manage expectations and potentially adjust
the task._

Enhance the current features of the app by modifying the character builder screen to provide users with these options
while creating a character:

- Select one or more languages that the character can speak. They should always be able to speak at least "Common".
- Select one class for their character, from a list of classes. Consider the potential user's understanding and knowledge when 
deciding where/what to display
- Select one alignment from the available options.
- Select one background that describes the previous life of the character.

- *Bonus*: Modify the character sheet list screen to allow basic text searching across character sheets. Entering text into the search box 
should cause the list of character sheets to be filtered to show only those who partially match the name or description of the character

The options provided for each of these properties must not be hard coded into the app. The method of interaction and the
visual presentation of each option is up to you, as long as a user can specify the required data.

If you want to add extra features, you are more than welcome, but remember that you are not expected to spend too long
on this task. The character creator, and other app features, are representative of a real app - don't get too hung up
on making it true-to-life, as a real character sheet is much more detailed.

## FAQs

### Where can I find all this data?

All of the data is documented in the API docs found here: https://www.dnd5eapi.co/docs/

You can find React hooks to retrieve various pieces of related data in the `components/api` folder. You may still need to do some
data manipulation, or access endpoints not found in that folder, depending on your approach to the spec

### I found a bug that is stopping me from completing the task, and I don't think it's intentional

Get in touch with the details of the issue and we can talk about it

### The app does not have XYZ and I think it's really important, but it would take too long to add

Keep notes for any refactors, large bugs, additional capabilities, etc. We can talk about them when we review the task.

## Glossary

Some quick notes for those unfamiliar with Dungeons and Dragons

- "Character Sheet" - A list of information describing the character that a person plays during the game
- "Alignment" - Moral alignment (good / neutral / evil, etc), commonly visualised as a matrix or grid
- "Class" - The set of skills that a character has access to based on their training. Common classes include fighters, wizards, and monks