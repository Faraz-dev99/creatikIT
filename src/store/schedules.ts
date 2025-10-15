// note do not use any

import { API_ROUTES } from "@/constants/ApiRoute"
import { contactAllDataInterface } from "./contact.interface";
import { ScheduleType } from "./schedules.interface";

export const getSchedules = async () => {
    try {
        const response = await fetch(API_ROUTES.SHEDULES.GET_ALL);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.log("SERVER ERROR: ", error)
        return null;
    }
}

export const getSchedulesById = async (id:string)=>{
    try {
        const response = await fetch(API_ROUTES.SHEDULES.GET_BY_ID(id));
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.log("SERVER ERROR: ", error)
        return null;
    }
}

export const getFilteredSchedules = async (params:string)=>{
    try{
        const response = await fetch(API_ROUTES.SHEDULES.GET_BY_PARAMS(params));
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.log("SERVER ERROR: ", error)
        return null;
    }
}

export const addSchedules = async (data: ScheduleType) => {
    try {
        let response = await fetch(API_ROUTES.SHEDULES.ADD,
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

export const updateSchedules = async (id: string, data: ScheduleType) => {
    try {
        let response = await fetch(API_ROUTES.SHEDULES.UPDATE(id),
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

export const deleteSchedules = async (id: string) => {
    try {
        const response = await fetch(API_ROUTES.SHEDULES.DELETE(id),
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