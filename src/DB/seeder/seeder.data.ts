export const categoriesData = [
  {
    name: 'Arms',
    image_url: 'https://example.com/arms.jpg',
    subCategories: [
      {
        name: 'Biceps',
        image_url: 'https://example.com/biceps.jpg',
        exercises: [
          {
            name: 'Barbell Curl',
            description:
              'Classic bicep exercise using a barbell for maximum load.',
            level: 'intermediate',
            sets: 4,
            reps: 10,
            time: 20,
            image_url: 'https://example.com/barbell-curl.jpg',
            video_url: 'https://youtube.com/barbell-curl',
          },
          {
            name: 'Hammer Curl',
            description:
              'Targets the brachialis muscle for overall arm thickness.',
            level: 'beginner',
            sets: 3,
            reps: 12,
            time: 15,
            image_url: 'https://example.com/hammer-curl.jpg',
            video_url: 'https://youtube.com/hammer-curl',
          },
        ],
      },
      {
        name: 'Triceps',
        image_url: 'https://example.com/triceps.jpg',
        exercises: [
          {
            name: 'Tricep Dips',
            description: 'Bodyweight exercise targeting the triceps and chest.',
            level: 'beginner',
            sets: 3,
            reps: 15,
            time: 10,
            image_url: 'https://example.com/dips.jpg',
            video_url: 'https://youtube.com/dips',
          },
          {
            name: 'Overhead Tricep Extension',
            description: 'Isolation exercise for the long head of the triceps.',
            level: 'intermediate',
            sets: 4,
            reps: 12,
            time: 20,
            image_url: 'https://example.com/overhead.jpg',
            video_url: 'https://youtube.com/overhead',
          },
        ],
      },
    ],
  },
  {
    name: 'Chest',
    image_url: 'https://example.com/chest.jpg',
    subCategories: [
      {
        name: 'Upper Chest',
        image_url: 'https://example.com/upper-chest.jpg',
        exercises: [
          {
            name: 'Incline Bench Press',
            description:
              'Targets the upper chest using a barbell on an incline bench.',
            level: 'intermediate',
            sets: 4,
            reps: 10,
            time: 25,
            image_url: 'https://example.com/incline.jpg',
            video_url: 'https://youtube.com/incline',
          },
          {
            name: 'Incline Dumbbell Press',
            description:
              'Dumbbell variation for better range of motion and stability.',
            level: 'beginner',
            sets: 3,
            reps: 12,
            time: 15,
            image_url: 'https://example.com/incline-dumbbell.jpg',
            video_url: 'https://youtube.com/incline-dumbbell',
          },
        ],
      },
      {
        name: 'Middle Chest',
        image_url: 'https://example.com/middle-chest.jpg',
        exercises: [
          {
            name: 'Flat Bench Press',
            description:
              'Classic chest exercise focusing on overall chest development.',
            level: 'intermediate',
            sets: 4,
            reps: 8,
            time: 25,
            image_url: 'https://example.com/flat.jpg',
            video_url: 'https://youtube.com/flat',
          },
          {
            name: 'Push Ups',
            description:
              'Bodyweight exercise targeting chest, shoulders, and triceps.',
            level: 'beginner',
            sets: 3,
            reps: 15,
            time: 10,
            image_url: 'https://example.com/pushups.jpg',
            video_url: 'https://youtube.com/pushups',
          },
        ],
      },
    ],
  },

  {
    name: 'Shoulders',
    image_url: 'https://example.com/shoulders.jpg',
    subCategories: [
      {
        name: 'Front Shoulder',
        image_url: 'https://example.com/front-shoulder.jpg',
        exercises: [
          {
            name: 'Front Raise',
            description:
              'Targets the front deltoids using dumbbells or plates.',
            level: 'beginner',
            sets: 3,
            reps: 12,
            time: 20,
            image_url: 'https://example.com/front-raise.jpg',
            video_url: 'https://youtube.com/front-raise',
          },
        ],
      },
      {
        name: 'Side Shoulder',
        image_url: 'https://example.com/side-shoulder.jpg',
        exercises: [
          {
            name: 'Lateral Raise',
            description: 'Isolation exercise for the lateral deltoid.',
            level: 'beginner',
            sets: 3,
            reps: 15,
            time: 20,
            image_url: 'https://example.com/lateral.jpg',
            video_url: 'https://youtube.com/lateral',
          },
        ],
      },
      {
        name: 'Rear Shoulder',
        image_url: 'https://example.com/rear-shoulder.jpg',
        exercises: [
          {
            name: 'Face Pull',
            description: 'Improves posture and targets rear delts.',
            level: 'intermediate',
            sets: 3,
            reps: 12,
            time: 10,
            image_url: 'https://example.com/facepull.jpg',
            video_url: 'https://youtube.com/facepull',
          },
        ],
      },
    ],
  },

  {
    name: 'Back',
    image_url: 'https://example.com/back.jpg',
    subCategories: [
      {
        name: 'Upper Back',
        image_url: 'https://example.com/upper-back.jpg',
        exercises: [
          {
            name: 'Pull Ups',
            description: 'Bodyweight exercise targeting lats and upper back.',
            level: 'advanced',
            sets: 4,
            reps: 8,
            time: 25,
            image_url: 'https://example.com/pullups.jpg',
            video_url: 'https://youtube.com/pullups',
          },
        ],
      },
      {
        name: 'Lower Back',
        image_url: 'https://example.com/lower-back.jpg',
        exercises: [
          {
            name: 'Deadlift',
            description:
              'Compound movement targeting the entire posterior chain.',
            level: 'advanced',
            sets: 5,
            reps: 5,
            time: 15,
            image_url: 'https://example.com/deadlift.jpg',
            video_url: 'https://youtube.com/deadlift',
          },
        ],
      },
    ],
  },

  {
    name: 'Legs',
    image_url: 'https://example.com/legs.jpg',
    subCategories: [
      {
        name: 'Quads',
        image_url: 'https://example.com/quads.jpg',
        exercises: [
          {
            name: 'Squats',
            description:
              'Fundamental lower body exercise targeting quads and glutes.',
            level: 'intermediate',
            sets: 4,
            reps: 10,
            time: 20,
            image_url: 'https://example.com/squat.jpg',
            video_url: 'https://youtube.com/squat',
          },
        ],
      },
      {
        name: 'Hamstrings',
        image_url: 'https://example.com/hamstrings.jpg',
        exercises: [
          {
            name: 'Leg Curl',
            description: 'Isolation exercise for hamstrings.',
            level: 'beginner',
            sets: 3,
            reps: 12,
            time: 20,
            image_url: 'https://example.com/legcurl.jpg',
            video_url: 'https://youtube.com/legcurl',
          },
        ],
      },
    ],
  },
];
