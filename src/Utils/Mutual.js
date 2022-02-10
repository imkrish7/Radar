export const mutualRelation = (followers, followings, source) => {
  let mergedAddress = [
    ...followers.list.map(follower => {
      let temp = {
        ...follower,
        follower: true
      };
      return temp;
    }),
    ...followings.list.map(following => {
      let temp = {
        ...following,
        follower: false
      };
      return temp;
    })
  ];
  return mergedAddress;
};
