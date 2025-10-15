// note do not use any

import { API_ROUTES } from "@/constants/ApiRoute"
import { TaskType } from "./task.interface";

export const getTask = async () => {
    try {
        const response = await fetch(API_ROUTES.TASK.GET_ALL);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.log("SERVER ERROR: ", error)
        return null;
    }
}

export const getTaskById = async (id:string)=>{
    try {
        const response = await fetch(API_ROUTES.TASK.GET_BY_ID(id));
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.log("SERVER ERROR: ", error)
        return null;
    }
}

export const getFilteredTask = async (params:string)=>{
    try{
        const response = await fetch(API_ROUTES.TASK.GET_BY_PARAMS(params));
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.log("SERVER ERROR: ", error)
        return null;
    }
}

export const addTask = async (data: TaskType) => {
    try {
        let response = await fetch(API_ROUTES.TASK.ADD,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            }
        );
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        response =await response.json();
        return data;
    }
    catch (error) {
        console.log("SERVER ERROR: ", error)
        return null;
    }
}

export const updateTask = async (id: string, data: TaskType) => {
    try {
        let response = await fetch(API_ROUTES.TASK.UPDATE(id),
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            }
        );
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        response =await response.json();
        return data;
    }
    catch (error) {
        console.log("SERVER ERROR: ", error)
        return null;
    }
}

export const deleteTask = async (id: string) => {
    try {
        const response = await fetch(API_ROUTES.TASK.DELETE(id),
            {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            }
        );
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data=await response.json();
        return data;

    }
    catch (error) {
        console.log("SERVER ERROR: ", error)
        return null;
    }
}