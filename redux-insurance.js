console.clear();

// People dropping off a form (Action Creators)
const createPolicy = (name, amount) => {
  return { // Action (a form in our analogy)
    type: 'CREATE_POLICY',
    payload: {
      name: name,
      amount: amount
    }
  };
};

const deletePolicy = (name, amount) => {
  return {
    type: 'DELETE_POLICY',
    payload: {
      name: name,
      amount: amount
    }
  };
};

const createClaim = (name, amountOfMoneyToCollect) => {
  return {
    type: 'CREATE_CLAIM',
    payload: {
      name: name,
      amountOfMoneyToCollect: amountOfMoneyToCollect
    }
  };
};
  
// Reducers (Department)
// No array push inside Reducers
// if oldListOfClaims has no value which is undefined, it replaces to [](empty array)
const claimsHistory = (oldListOfClaims = [], action) => {
  if (action.type === 'CREATE_CLAIM') {
    // we care about this action (FORM)
    // oldListOfClaims.push(action.payload); // modifying existing array
    return [...oldListOfClaims, action.payload]; // adding new data in a new array
  } 
  
  // we don't care about the action (FORM)
  return oldListOfClaims;
};
  
const accounting = (bagOfMoney = 100, action) => {
  if (action.type === 'CREATE_CLAIM') {
    return bagOfMoney - action.payload.amountOfMoneyToCollect;
  }
  else if (action.type === 'CREATE_POLICY') {
    return bagOfMoney + action.payload.amount;
  }
  
  return bagOfMoney;
}

const policies = (listOfPolicies = [], action) => {
  if (action.type === 'CREATE_POLICY') {
    return [...listOfPolicies, action.payload.name];
  }
  else if (action.type === 'DELETE_POLICY') {
    return listOfPolicies.filter(name => name !== action.payload.name);
  }
  
  return listOfPolicies;
}

// const numbers = [1,2,3]
// numbers.filter(num => num !== 2) // [1,3] new array
// numbers // [1,2,3]

const { createStore, combineReducers } = Redux;

const ourDepartments = combineReducers({
  accounting: accounting,
  claimsHistory: claimsHistory,
  policies: policies
});

const store = createStore(ourDepartments);

store.dispatch(createPolicy('Alex', 20));
store.dispatch(createPolicy('Jim', 30));
store.dispatch(createPolicy('Bob', 40));

store.dispatch(createClaim('Alex', 120));
store.dispatch(createClaim('Jim', 50));

store.dispatch(deletePolicy('Bob'));

console.log(store.getState());