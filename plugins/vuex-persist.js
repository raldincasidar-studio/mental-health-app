// ~/plugins/vuex-persist.js
import VuexPersistence from "vuex-persist";

export default ({ store }) => {
  new VuexPersistence({
    modules: ["permaData"],
  }).plugin(store);
};
