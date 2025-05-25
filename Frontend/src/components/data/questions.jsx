// Questions for the quiz
export const questions = [
    {
      id: 'values',
      question: 'Which values resonate most with you? (Select up to 3)',
      type: 'multiSelect',
      options: [
        { value: 'equality', label: 'Equality and fairness' },
        { value: 'environment', label: 'Environmental protection' },
        { value: 'education', label: 'Education and knowledge' },
        { value: 'health', label: 'Health and wellbeing' },
        { value: 'community', label: 'Community building' },
        { value: 'innovation', label: 'Innovation and progress' },
        { value: 'justice', label: 'Justice and human rights' },
        { value: 'poverty', label: 'Poverty reduction' }
      ],
      maxSelections: 3
    },
    // ... rest of the questions
    {
        id: 'skills',
        question: 'What skills or resources could you contribute? (Select all that apply)',
        type: 'multiSelect',
        options: [
          { value: 'time', label: 'Volunteer time' },
          { value: 'money', label: 'Financial support' },
          { value: 'professional', label: 'Professional expertise' },
          { value: 'creative', label: 'Creative talents' },
          { value: 'technical', label: 'Technical skills' },
          { value: 'leadership', label: 'Leadership' },
          { value: 'networking', label: 'Networking' }
        ]
      },
      {
        id: 'scope',
        question: 'What geographical scope are you most interested in?',
        type: 'singleSelect',
        options: [
          { value: 'local', label: 'Local community' },
          { value: 'regional', label: 'Regional' },
          { value: 'national', label: 'National' },
          { value: 'international', label: 'International' }
        ]
      },
      {
        id: 'involvement',
        question: 'How would you prefer to be involved?',
        type: 'singleSelect',
        options: [
          { value: 'hands-on', label: 'Hands-on direct involvement' },
          { value: 'support', label: 'Supporting from behind the scenes' },
          { value: 'advocate', label: 'Advocacy and raising awareness' },
          { value: 'donate', label: 'Donating and fundraising' },
          { value: 'learn', label: 'Learning more before committing' }
        ]
      },
      {
        id: 'time',
        question: 'How much time can you dedicate?',
        type: 'singleSelect',
        options: [
          { value: 'minimal', label: 'Minimal (a few hours monthly)' },
          { value: 'moderate', label: 'Moderate (a few hours weekly)' },
          { value: 'significant', label: 'Significant (multiple times per week)' },
          { value: 'full', label: 'Full-time commitment' }
        ]
      }
  ];