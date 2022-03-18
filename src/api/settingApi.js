import axiosClient from "./axiosClient";
// get tat ca Customer
export const AllSetting = (params) => {
    const url = '/settings';
    return axiosClient.get(url, {params})
} 


export const getSettingById = (id) => {
    const url = `/settings/${id}`
    return axiosClient.get(url)
}