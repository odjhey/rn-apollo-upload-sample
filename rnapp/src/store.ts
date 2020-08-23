import React, {useContext} from 'react';
import {types, Instance} from 'mobx-state-tree';
const RootStore = types
  .model({
    count: 0,
    uri: types.optional(types.string, ''),
    signUri: types.optional(types.string, ''),
  })
  .actions((self) => ({
    inc() {
      self.count += 1;
    },
    setUri: (newUri) => {
      self.uri = newUri;
    },
    setSignUri: (newUri) => {
      self.signUri = newUri;
    },
  }))
  .views((self) => ({
    getUri: () => {
      return self.uri;
    },
  }));

const MSTContext = React.createContext<Instance<typeof RootStore>>(
  RootStore.create({
    count: 0,
    uri: '',
  }),
);

// eslint-disable-next-line prefer-destructuring
const Provider = MSTContext.Provider;

const useMst: () => Instance<typeof RootStore> = (mapStateToProps?) => {
  const store = useContext(MSTContext);

  if (typeof mapStateToProps !== 'undefined') {
    return mapStateToProps(store);
  }

  return store;
};

export {RootStore, Provider, useMst};
