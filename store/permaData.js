export const state = () => ({
  userTypeSelected: "",
  userData: {},
  navbarConfig: {
    title: "",
    goBack: false,
    plain: false,
  },
  homePageSelector: "0",
});

export const mutations = {
  setuserTypeSelected(state, value) {
    state.userTypeSelected = value;
  },
  setNavbarConfig(state, value) {
    state.navbarConfig = value;
  },
  setUserData(state, value) {
    state.userData = value;
  },
  setHomePageSelector(state, value) {
    state.homePageSelector = value;
  },
};
