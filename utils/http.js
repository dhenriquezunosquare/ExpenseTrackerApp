import axios from "axios";

const BACKEND_URL = "https://reactnativeapi-4ded3-default-rtdb.firebaseio.com"

export const storeExpense = async (expenseData) => {
    const response = await axios.post(BACKEND_URL + "/expenses.json", expenseData);
    const id = response.data.name;
    return id;
};


export const getExpenses = async () => {
    const response = await axios.get(BACKEND_URL + "/expenses.json");
    const expenses = [];

    for (let key in response.data) {
        const expenseObj = {
            id: key,
            amount: response.data[key].amount,
            date: response.data[key].date,
            description: response.data[key].description,
        };

        expenses.push(expenseObj);
    }

    return expenses;
}

export const updateExpenses = async (id, expenseData) => {
   return await axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData);
}

export const deleteExpenses = async (id) => {
    return await axios.delete(BACKEND_URL + `/expenses/${id}.json`);
};