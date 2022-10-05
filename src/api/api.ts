import axios from "axios";
// DAL


const apiInstance = axios.create({
    withCredentials: true,

    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "API-KEY": "43312b93-73fd-4342-90f4-f7fe2aad1adb"
    }
})

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return apiInstance.get(`users?page=${currentPage}&count=${pageSize}`).then(res => res.data)
    },
    unFollow(usrId: number) {
        return apiInstance.delete(`follow/${usrId}`).then(res => res.data)
    },
    follow(usrId: number) {
        return apiInstance.post(`follow/${usrId}`).then(res => res.data)
    }

}
export const profileAPI = {
    getProfile (profileId: string) {
        return apiInstance.get(`profile/` + profileId)
    },
    getStatus (profileId: string) {
        return apiInstance.get(`profile/status/` + profileId)
    },
    updateStatus (status: string) {
        return apiInstance.put(`profile/status`, {status}).then(response => response.data)
    },

}

export const authAPI = {
    me() {
        return apiInstance.get(`auth/me`).then(res => res.data)
    }
}



