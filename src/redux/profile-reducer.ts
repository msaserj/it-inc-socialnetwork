import {v1} from "uuid";
import {ActionsType} from "./redux-store";
import {profileAPI} from "../api/api";

// typeof ActionCreators
export type ProfileActionsType =
    | ReturnType<typeof addPostOnClickAC>
    | ReturnType<typeof newPostTextOnChangeAC>
    | ReturnType<typeof setUserProfile>
    | ReturnType<typeof setStatus>
    | ReturnType<typeof deletePostAC>

// ActionCreators
export const addPostOnClickAC = () => ({type: "ADD-POST"} as const)
export const newPostTextOnChangeAC = (newPostText: string) => ({type: "UPDATE-NEW-POST-TEXT", newPostText} as const)
export const setUserProfile = (profile: UserProfileType) => ({type: "SET-USER-PROFILE", profile} as const)
export const setStatus = (status: string) => ({type: "SET-STATUS", status} as const)
export const deletePostAC = (postId: string) => ({type: "DELETE-POST", postId} as const)

// types for InitialState
export type ProfilePageType = {
    posts: Array<PostType>
    newTextState: string
    userProfile: UserProfileType | null
    status: string
}
export type PostType = {
    id: string
    message: string
    likesCount: number
}

export type UserProfileType = {
    userId: number
    aboutMe: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: UserContactsProfileType
    photos: UserPhotosProfileType

}
type UserContactsProfileType = {
    facebook: string
    website: string
    vk: string
    twitter: string
    instagram: string
    youtube: string
    github: string
    mainLink: string
}
type UserPhotosProfileType = {
    small: string
    large: string
}

const initialState: ProfilePageType = {
    posts: [
        {id: v1(), message: "Hi", likesCount: 5},
        {id: v1(), message: "How is your it-kamasutra", likesCount: 6},
        {id: v1(), message: "Yo", likesCount: 10},
    ],
    newTextState: "",
    userProfile: {} as UserProfileType,
    status: ""
}


// reducer
export const profileReducer = (state: ProfilePageType = initialState, action: ActionsType): ProfilePageType => {
    switch (action.type) {
        //onClick
        case "ADD-POST":
            return {
                ...state,
                newTextState: "",
                posts: [{id: v1(), message: state.newTextState, likesCount: 5}, ...state.posts]
            }
        //onChange
        case "UPDATE-NEW-POST-TEXT":
            return {...state, newTextState: action.newPostText}
        case "SET-STATUS":
            return {...state, status: action.status}
        case "SET-USER-PROFILE":
            return {...state, userProfile: action.profile}
        case "DELETE-POST":
            return {...state, posts: state.posts.filter(p => p.id !== action.postId)}
        default:
            return state
    }
}

// thunk
export const getUserProfileTC = (profileId: string) => async (dispatch: any) => {
    let res = await profileAPI.getProfile(profileId)
    dispatch(setUserProfile(res.data))
}

export const getStatusTC = (profileId: string) => async (dispatch: any) => {
    let res = await profileAPI.getStatus(profileId)
    console.log(res.data)
    dispatch(setStatus(res.data))
}

export const updateStatusTC = (status: string) => async (dispatch: any) => {
    let res = await profileAPI.updateStatus(status)
    if (res.data.resultCode === 0) {
        dispatch(setStatus(res.data))
    }
}