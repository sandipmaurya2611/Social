import { causes } from '../data/causes';

export const getRecommendations = (userAnswers) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const scoredCauses = causes.map(cause => {
        let score = 0;

        if (userAnswers.values) {
          userAnswers.values.forEach(value => {
            if (cause.tags.includes(value)) score += 3;
          });
        }

        if (userAnswers.scope && cause.scope.includes(userAnswers.scope)) {
          score += 2;
        }

        if (userAnswers.involvement === 'hands-on' && cause.timeCommitment.includes(userAnswers.time)) {
          score += 2;
        }

        if (userAnswers.skills) {
          userAnswers.skills.forEach(skill => {
            if (cause.skills.includes(skill)) score += 1;
          });
        }

        return {
          ...cause,
          score,
          match: Math.min(Math.round((score / 10) * 100), 100)
        };
      });

      scoredCauses.sort((a, b) => b.match - a.match);
      resolve(scoredCauses);
    }, 1500);
  });
};
