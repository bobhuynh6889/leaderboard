import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  FlatList,
  Alert,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {useSelector} from 'react-redux';

import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';
import Header from '../components/Header';
import {colors} from '../constants/colors';
import {customTxt} from '../constants/fontStyle';
import Fonts from '../constants/Fonts';
import IconButton from '../components/IconButton';
import {UserModel, SearchTypeModel} from '../models';
import LoadingView from '../components/LoadingView';
import {
  fuzzySearch,
  onlySortByName,
  sortByNameAndRankASC,
  sortByNameAndRankDESC,
} from '../utils/handleData';

const width = Dimensions.get('screen').width;

const LeaderboardApp = () => {
  const leaderboardData = useSelector(
    (state: any) => state?.common?.convertedData,
  );
  const [search, setSearch] = useState<string>('');
  const [leaderboard, setLeaderboard] = useState<UserModel[]>([]);
  const flatListRef = useRef<FlatList>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [sortType, setSortType] = useState<SearchTypeModel>({
    type: 'rank',
    isDescending: false,
  });
  const [isFuzzySearch, setFuzzySearch] = useState<boolean>(false);

  const scrollToTop = () => {
    flatListRef.current?.scrollToOffset({animated: true, offset: 0});
  };

  useEffect(() => {
    setLeaderboard(leaderboardData);
  }, [leaderboardData]);

  useEffect(() => {
    if (isFuzzySearch) {
      const dataFuzzy = fuzzySearch(leaderboardData, search);
      setLeaderboard(dataFuzzy);
    }
  }, [leaderboardData, search, isFuzzySearch]);

  const onPressSearch = () => {
    let sortedList = sortByNameAndRankASC([...leaderboard]);
    if (!search.trim()) {
      return;
    }

    const user = sortedList.find(
      (itemUser: UserModel) =>
        itemUser?.name.toLowerCase() === search.toLowerCase(),
    );
    if (!user) {
      Alert.alert(
        'Error',
        'This user name does not exist! Please specify an existing user name!',
      );
      return;
    }

    const rankedUsers = sortedList.slice(0, 10);

    if (!rankedUsers.some(u => u?.name === user?.name)) {
      rankedUsers.pop();
      rankedUsers.push({...user, rank: user?.rank});
    }
    setLeaderboard(rankedUsers);
  };

  const handleSort = (type: string, isDescending = false) => {
    setLoading(true);
    setSortType({type, isDescending});
    scrollToTop();

    let sortedList;
    setTimeout(() => {
      if (type === 'name') {
        sortedList = onlySortByName([...leaderboard]);
        if (isDescending) {
          sortedList.reverse();
        }
      } else {
        if (isDescending) {
          sortedList = sortByNameAndRankDESC([...leaderboard]);
        } else {
          sortedList = sortByNameAndRankASC([...leaderboard]);
        }
      }
      setLeaderboard(sortedList);
      setLoading(false);
    }, 1000);
  };

  const renderSortButton = (iconName: string, type: string, isDescending: boolean) => (
    <IconButton
      iconName={iconName}
      onPress={() => handleSort(type, isDescending)}
      iconColor={
        sortType?.type === type && sortType?.isDescending === isDescending
          ? colors.green
          : colors.black
      }
    />
  );

  const buttonSortSection = () => {
    return (
      <View style={styles.buttonSortCtn}>
        {renderSortButton('sort-ascending', 'rank', false)}
        {renderSortButton('sort-descending', 'rank', true)}
        {renderSortButton('sort-alphabetical-ascending', 'name', false)}
        {renderSortButton('sort-alphabetical-descending', 'name', true)}
      </View>
    );
  };

  const itemUser = ({item, index}: any) => {
    const isLastItem = leaderboard?.length === index + 1;
    const isUserHighlight = search.toLowerCase() === item.name.toLowerCase();
    return (
      <View>
        {index === 0 && (
          <View style={styles.headerTable}>
            <View style={[styles.nameCellCtn, styles.borderRightWidth1]}>
              <Text style={customTxt(Fonts.Bold, 16, colors.white).txt}>
                Name
              </Text>
            </View>
            <View style={[styles.nameCellCtn, styles.borderRightWidth1]}>
              <Text style={customTxt(Fonts.Bold, 16, colors.white).txt}>
                Rank
              </Text>
            </View>
            <View style={styles.nameCellCtn}>
              <Text style={customTxt(Fonts.Bold, 16, colors.white).txt}>
                Number of bananas
              </Text>
            </View>
          </View>
        )}
        <View
          style={[
            checkIndexItemStyle(index, isLastItem).row,
            isUserHighlight &&
              checkIndexItemStyle(index, isLastItem).highlightUser,
          ]}>
          <View style={[styles.nameCellCtn, styles.borderRightWidth1]}>
            <Text
              style={
                customTxt(
                  Fonts.SemiBold,
                  14,
                  isUserHighlight ? colors.white : colors.black,
                ).txt
              }>
              {item?.name}
            </Text>
          </View>
          <View style={[styles.nameCellCtn, styles.borderRightWidth1]}>
            <Text
              style={
                customTxt(
                  Fonts.Medium,
                  14,
                  isUserHighlight ? colors.white : colors.black,
                ).txt
              }>
              {item?.rank}
            </Text>
          </View>
          <View style={styles.nameCellCtn}>
            <Text
              style={
                customTxt(
                  Fonts.Medium,
                  14,
                  isUserHighlight ? colors.white : colors.black,
                ).txt
              }>
              {item?.bananas}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderBody = () => {
    return (
      <View style={styles.bodyCtn}>
        <View style={styles.searchViewCtn}>
          <CustomTextInput
            value={search}
            onChangeText={setSearch}
            iconName={search ? 'close-circle-outline' : 'search-outline'}
            iconColor={search ? colors.red : colors.black}
            onPressIcon={() => {
              setSearch('');
              setLeaderboard(leaderboardData);
              setSortType({
                type: 'rank',
              });
            }}
            textRight={isFuzzySearch ? 'Fuzzy On' : 'Fuzzy Off'}
            onPressTextRight={() => {
              setFuzzySearch(!isFuzzySearch);
              setLeaderboard(leaderboardData);
            }}
            textRightColor={isFuzzySearch ? colors.green : colors.black}
          />
          <CustomButton
            text={'Search'}
            onPress={onPressSearch}
            style={styles.searchBtnCtn}
          />
        </View>
        {buttonSortSection()}
        <FlatList
          ref={flatListRef}
          data={leaderboard}
          keyExtractor={(item: UserModel) => item?.uid}
          renderItem={itemUser}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header title={'Leaderboard'} />
      {renderBody()}
      {isLoading && <LoadingView />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bodyCtn: {
    marginHorizontal: 20,
    flex: 1,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
  },
  highlighted: {
    backgroundColor: 'yellow',
  },
  searchViewCtn: {
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  searchBtnCtn: {
    marginLeft: 10,
  },
  nameCellCtn: {
    width: width / 3,
    flex: 1,
    padding: 10,
  },
  borderRightWidth1: {
    borderRightWidth: 1,
  },
  buttonSortCtn: {
    flexDirection: 'row',
  },
  headerTable: {
    flex: 1,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    backgroundColor: colors.green,
  },
  fuzzySerachBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const checkIndexItemStyle = (index: number, isLastItem: boolean) =>
  StyleSheet.create({
    row: {
      flex: 1,
      flexDirection: 'row',
      borderTopWidth: 1,
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderBottomWidth: isLastItem ? 1 : 0,
      borderBottomLeftRadius: isLastItem ? 16 : 0,
      borderBottomRightRadius: isLastItem ? 16 : 0,
      backgroundColor: index % 2 > 0 ? colors.grayConcrete : colors.gray80,
      marginBottom: isLastItem ? 40 : 0,
    },
    highlightUser: {
      backgroundColor: colors.red,
    },
  });

export default LeaderboardApp;
