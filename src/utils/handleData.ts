import {UserModel} from '../models';

export const convertData = (leaderboardData: Object) => {
  const formattedData = Object.values(leaderboardData)
    .map(user => ({
      name: user?.name,
      bananas: user?.bananas,
      uid: user?.uid,
    }))
    .filter(user => user?.name)
    .sort((a, b) => b?.bananas - a?.bananas || a?.name.localeCompare(b?.name));

  let rank = 1;
  let previousBananas: null = null;
  let actualRank = 1;

  const rankedData = formattedData.map((user) => {
    if (user?.bananas !== previousBananas) {
      rank = actualRank;
    }
    previousBananas = user?.bananas;
    actualRank++;

    return {...user, rank};
  });

  return rankedData;
};

export const onlySortByName = (leaderboardData: UserModel[]) => {
  const sortedList = [...leaderboardData].sort((a, b) =>
    a.name.localeCompare(b.name),
  );
  return sortedList;
};

export const sortByNameAndRankASC = (leaderboardData: UserModel[]) => {
  const sortedList = onlySortByName([...leaderboardData])
    .sort((a, b) => b.bananas - a.bananas)
    .map(user => ({...user}));
  return sortedList;
};

export const sortByNameAndRankDESC = (leaderboardData: UserModel[]) => {
  const sortedList = onlySortByName([...leaderboardData])
    .sort((a, b) => a.bananas - b.bananas)
    .map(user => ({...user}));
  return sortedList;
};

function compareSearchWithName(A: string[], B: string[]) {
  for (let i = 0; i <= B?.length - A?.length; i++) {
    let match = true;
    for (let j = 0; j < A?.length; j++) {
      if (B[i + j] !== A[j]) {
        match = false;
        break;
      }
    }
    if (match) {return true;}
  }
  return false;
}

export const fuzzySearch = (leaderboardData: UserModel[], text: string) => {
  const fuzzyData = [];
  const splitText = text.toLowerCase().split('');
  for (let i = 0; i < leaderboardData?.length; i++) {
    const splitName = leaderboardData[i]?.name.toLowerCase().split('');
    if (compareSearchWithName(splitText, splitName)) {
      fuzzyData.push(leaderboardData[i]);
    }
  }
  const sortedList = sortByNameAndRankASC(fuzzyData);
  return sortedList;
};
