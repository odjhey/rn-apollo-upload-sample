import React from 'react';
import {RootStore, Provider} from '../store';
const rootStore = RootStore.create({
  count: 1,
});

const StoreComponent = (props) => {
  return <Provider value={rootStore}>{props.children}</Provider>;

  //// somewhere in the app
  //
  //function Counter() {
  //  const { count, inc } = useMst(store => ({
  //    count: store.count,
  //    inc: store.inc,
  //  }));
  //
  //  return (
  //    <div>
  //      value: {count}
  //      <button onClick={inc}>Inc</button>
  //    </div>
  //  );
  //}
};

// @ts-ignore
global.store = rootStore;

export default StoreComponent;
