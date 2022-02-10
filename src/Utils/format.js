export const networkFormat = (
  source,
  followers,
  following,
  avatar = "",
  ens = ""
) => {
  // console.log(source, followers, following);
  if (followers && following) {
    let { list } = followers;
    let len = followers.list.length + following.list.length;
    let tempLinks = [];
    let count = 0;
    tempLinks = list.map(link => {
      let dist = 1;

      let { avatar, domain } = link;
      return {
        target: 40,
        source: count++,
        avatar,
        domain,
        value: dist
      };
    });
    let follwingResult = following.list.map(link => {
      let dist = 1;
      let { avatar, domain } = link;
      return { source: len, avatar, domain, target: count++, value: dist };
    });
    // console.log(follwingResult);

    let links = [...tempLinks, ...follwingResult];
    let nodes = [
      ...followers.list.map(node => {
        const { address, domain, avatar } = node;
        return {
          id: address,
          domain,
          avatar
          // group: 1
        };
      }),
      ...following.list.map(node => {
        const { address, avatar, domain } = node;
        return {
          id: address,
          domain,
          avatar,
          group: 1
        };
      }),
      { id: source, domain: ens, avatar }
    ];
    // console.log(nodes, links);
    return { nodes, links };
  } else {
    return [];
  }
};
