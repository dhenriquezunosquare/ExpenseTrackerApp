import { createContext, useReducer, useState } from "react";



export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({ description, amount, date }) => { },
    setExpense: (expenses) => { },
    deleteExpense: (id) => { },
    updateExpense: (id, { description, amount, date }) => { },
})


const expenseReducer = (state, action) => {
    switch (action.type) {
        case 'Add':
            return [{ ...action.payload }, ...state]
        case 'Set':
            const inverted = action.payload.reverse();
            return inverted;
        case 'Update':
            const updatableExpenseIndex = state.findIndex((e) => e.id === action.payload.id);
            const updatableExpense = state[updatableExpenseIndex];
            const updatedItem = { ...updatableExpense, ...action.payload.expenseData };
            const updatedExpenses = [...state];
            updatedExpenses[updatableExpenseIndex] = updatedItem;
            return updatedExpenses
        case 'Delete':
            return state.filter((e) => e.id !== action.payload);
        default:
            return state;
    }
}

export const ExpensesContextProvider = ({ children }) => {
    const [expensesState, dispatch] = useReducer(expenseReducer, []);

    const addExpense = (expenseData) => {
        dispatch({ type: 'Add', payload: expenseData });
    }

    const setExpense = (expenses)=>{
        dispatch({ type: 'Set', payload: expenses });
    }

    const deleteExpense = (id) => {
        dispatch({ type: 'Delete', payload: id });
    }

    const updateExpense = (id, expenseData) => {
        dispatch({ type: 'Update', payload: { id: id, expenseData: expenseData } })
    }

    const value = {
        expenses: expensesState,
        setExpense:setExpense,
        addExpense,
        deleteExpense,
        updateExpense
    }

    return (
        <ExpensesContext.Provider value={value}  >{children}</ExpensesContext.Provider>
    )

}