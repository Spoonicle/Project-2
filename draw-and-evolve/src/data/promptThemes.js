export const PROMPT_THEMES = [
  {
    id: 'monster',
    name: 'Monster Creator Studio',
    botName: 'Blobby the Monster Architect',
    botAvatar: '👾',
    badgeColor: 'from-purple-500 to-pink-500',
    description: 'Design a wacky, lovable creature and evolve its weird magical powers!',
    initialPrompt: 'Draw a body for a brand new creature! It can be fluffy, slimy, round, or spiky. Give it eyes and a big funny smile!',
    colorPalette: [
      '#ec4899', '#a855f7', '#8b5cf6', '#6366f1', 
      '#3b82f6', '#06b6d4', '#10b981', '#f59e0b', 
      '#ef4444', '#1e293b', '#ffffff'
    ],
    fallbackSequence: [
      {
        commentary: "Ooh, I love the shape of this creature! It has so much personality already!",
        nextPrompt: "Now add a crazy hat on top of its head and some weird antennae or horns!",
        stageBadge: "Stage 2: Headgear & Horns"
      },
      {
        commentary: "Haha, amazing hat! That creature looks ready for an adventure!",
        nextPrompt: "Now draw a tiny pet sidekick sitting next to it or floating on its shoulder!",
        stageBadge: "Stage 3: Tiny Sidekick"
      },
      {
        commentary: "Look at those two best friends! They look unstoppable!",
        nextPrompt: "Add some magical glowing power effects around them (sparks, bubbles, or lightning)!",
        stageBadge: "Stage 4: Magic & Powers"
      },
      {
        commentary: "Woah! The power level is off the charts!",
        nextPrompt: "Finally, draw a cool background environment—like an alien planet, cozy lair, or rainbow sky!",
        stageBadge: "Stage 5: Environment Masterpiece"
      }
    ]
  },
  {
    id: 'cozy_house',
    name: 'Cozy Fantasy World',
    botName: 'Hazel the Forest Architect',
    botAvatar: '🏡',
    badgeColor: 'from-amber-500 to-emerald-500',
    description: 'Build a magical, cozy home in a giant mushroom, acorn, or tree stump!',
    initialPrompt: 'Draw the base shape of your cozy magical house (e.g. a giant mushroom top, a tea kettle, or a tree hollow) with a front door and a window!',
    colorPalette: [
      '#d97706', '#059669', '#10b981', '#3b82f6', 
      '#8b5cf6', '#f43f5e', '#78350f', '#0284c7', 
      '#64748b', '#1e293b', '#ffffff'
    ],
    fallbackSequence: [
      {
        commentary: "What a charming little home structure! I can already feel how cozy it's going to be.",
        nextPrompt: "Draw a smoking chimney, stepping stone path, and a cute little mailbox out front!",
        stageBadge: "Stage 2: Pathways & Chimney"
      },
      {
        commentary: "The smoke and path look fantastic! It really brings the house to life.",
        nextPrompt: "Add some overgrown vines, colorful flowers, and a glowing lantern hanging above the door!",
        stageBadge: "Stage 3: Flowers & Lights"
      },
      {
        commentary: "So lush and welcoming! The lighting is so atmospheric.",
        nextPrompt: "Draw a little woodland resident (like a rabbit, owl, or frog) sitting near the entrance!",
        stageBadge: "Stage 4: Cozy Resident"
      },
      {
        commentary: "Aww! What a peaceful little sanctuary you have created!",
        nextPrompt: "Add starry skies, a crescent moon, and floating fireflies all around!",
        stageBadge: "Stage 5: Twilight Magic"
      }
    ]
  },
  {
    id: 'cyberpunk_vehicle',
    name: 'Sci-Fi Vehicle Lab',
    botName: 'Vector the Tech Designer',
    botAvatar: '🚀',
    badgeColor: 'from-cyan-500 to-blue-600',
    description: 'Engineer a futuristic speeder, hovercraft, or interstellar spaceship!',
    initialPrompt: 'Draw the main body hull of your futuristic craft with a sleek cockpit windshield and front headlights!',
    colorPalette: [
      '#06b6d4', '#3b82f6', '#6366f1', '#f43f5e', 
      '#eab308', '#10b981', '#a855f7', '#475569', 
      '#0f172a', '#38bdf8', '#ffffff'
    ],
    fallbackSequence: [
      {
        commentary: "Sleek silhouette! That aerodynamic chassis looks ready for high speeds.",
        nextPrompt: "Add glowing hover thrusters or plasma jet engines on the back with exhaust flames!",
        stageBadge: "Stage 2: Jet Thrusters"
      },
      {
        commentary: "Boom! Those engines look insanely powerful!",
        nextPrompt: "Draw solar wing panels, energy shields, or laser cannons on the sides!",
        stageBadge: "Stage 3: Wings & Tech"
      },
      {
        commentary: "Great tech details! This craft is looking battle-ready.",
        nextPrompt: "Draw a heroic pilot visible inside the cockpit canopy wearing a futuristic helmet!",
        stageBadge: "Stage 4: Space Pilot"
      },
      {
        commentary: "The pilot completes it! A true masterpiece of sci-fi engineering.",
        nextPrompt: "Add a futuristic neon grid city background or a asteroid field deep in hyperspace!",
        stageBadge: "Stage 5: Hyperspace Background"
      }
    ]
  }
];
