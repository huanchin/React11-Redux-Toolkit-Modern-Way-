import { createSlice } from "@reduxjs/toolkit";
// 1. createSlice automatically create action creators from reducers
// 2. createSlice makes writing reducers a lot easier
// 3. User can mutate the state inside reducer
// above uses a library called Immer which will actually convert our logic back to immutable logic

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

// 2) create slice
const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposite(state, action) {
      state.balance += action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    requestLoan: {
      prepare(amount, purpose) {
        return {
          payload: { amount, purpose },
        };
      },
      reducer(state, action) {
        if (state.loan > 0) return;

        // 2.2) In order to receive >1 arguments --> prepare the data
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance += action.payload.amount;
      },
    },
    payLoan(state, action) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
    convertingCurrency(state, action) {
      state.isLoading = true;
    },
  },
});

export function deposite(amount, currency) {
  if (currency === "USD") return { type: "account/deposite", payload: amount };

  // 3) need middleware(thunk) for API call (async function)
  return async function (dispatch, getState) {
    dispatch({ type: "account/convertingCurrency" });
    // API call
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    const converted = data.rates.USD;
    // return action
    // return { type: "account/deposite", payload: converted }; ------> not return action but dispatch directly
    dispatch({ type: "account/deposite", payload: converted });
  };
}
// console.log(accountSlice);

export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

export default accountSlice.reducer;
