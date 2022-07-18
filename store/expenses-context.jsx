import { createContext, useReducer, useState } from "react";

const dummy_Expens = [
    { id: 'e1', description: 'A pair of shoes', amount: 59.00, date: new Date('2022-07-10') },
    { id: 'e2', description: 'A Jean', amount: 20.00, date: new Date('2022-07-08') },
    { id: 'e3', description: 'Some Apples', amount: 10.00, date: new Date('2022-07-01') },
    { id: 'e4', description: 'A Book', amount: 14.00, date: new Date('2022-06-01') },
    { id: 'e5', description: 'A Whiskey Bottle', amount: 30.00, date: new Date('2022-06-17') },
    { id: 'e6', description: 'Iphone 12 ', amount: 399.00, date: new Date('2022-06-12') },
    { id: 'e7', description: 'a PC', amount: 500.00, date: new Date('2022-01-12') },
    { id: 'e8', description: 'a Play4', amount: 200.00, date: new Date('2022-03-12') },
    { id: 'e9', description: 'an Hamburger', amount:5.00, date: new Date('2022-05-12') },
    { id: 'e10', description: 'a T-Shirt', amount:10.00, date: new Date('2022-07-12') },

]


export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({ description, amount, date }) => { },
    deleteExpense: (id) => { },
    updateExpense: (id, { description, amount, date }) => { },
})


const expenseReducer = (state, action) => {
    switch (action.type) {
        case 'Add':
            const id = new Date().toString() + Math.random().toString();
            return [{ ...action.payload, id: id }, ...state]
        case 'Update':
            const updatableExpenseIndex = state.findIndex((e)=>e.id=== action.payload.id);
            const updatableExpense = state[updatableExpenseIndex];
            const updatedItem = {...updatableExpense, ...action.payload.expenseData};
            const updatedExpenses= [...state];
            updatedExpenses[updatableExpenseIndex] = updatedItem;
            return updatedExpenses
        case 'Delete':
            return state.filter((e)=>e.id !== action.payload);
        default:
            return state;
    }
}

export const ExpensesContextProvider = ({ children }) => {
    const [expensesState, dispatch] = useReducer(expenseReducer,dummy_Expens);

    const addExpense = (expenseData) => {
        dispatch({ type: 'Add', payload: expenseData });
    }

    const deleteExpense = (id) => {
        dispatch({ type: 'Delete', payload: id });
    }

    const updateExpense = (id, expenseData) => {
        dispatch({ type: 'Update', payload: { id: id, expenseData: expenseData } })
    }

    const value ={
        expenses:expensesState,
        addExpense,
        deleteExpense,
        updateExpense
    }

    return (
        <ExpensesContext.Provider value={value}  >{children}</ExpensesContext.Provider>
    )

}