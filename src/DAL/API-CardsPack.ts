import  {AxiosResponse} from "axios";
import {instance} from "./APIAuth";

export type getCardPacksPayload = {
    user_id?: string
    packName?: string
    min?: number
    max?: number
    sortPacks?: "0updated" | "1updated"
    page?: number
    pageCount?: number

}
export type CreateNewCardPackPayload = {
    name?: string //"no Name"  если не отправить будет таким
    deckCover?: string//"url or base64" // не обязателен
    private?: boolean//false // если не отправить будет такой
}
export type UpdateCardPackPayload = {
    "_id": string,
    "Private"?: boolean | null,
    "name"?: string | null,
    "path"?: string | null,
    "grade"?: number | null,
    "shots"?: number | null,
    "type"?: string | null,
    "deckCover"?: string | null
}

export type CardPacksEntity = {
    "_id": string,
    "user_id": string,
    "user_name": string,
    "private": boolean,
    "name": string,
    "path": string,
    "grade": number,
    "shots": number,
    "cardsCount": number,
    "type": string,
    "rating": number,
    "created": string,
    "updated": string,
    "more_id": string,
    "__v": number
}
export interface CardPacksEntityWithDeckCover extends CardPacksEntity{
    "deckCover": string| null
}

export interface CardPackResponse {
    token: string,
    tokenDeathTime: number
}

export interface GetCardsPackResponse extends CardPackResponse{
    "cardPacks": CardPacksEntityWithDeckCover[]
    "page": number,
    "pageCount": number,
    "cardPacksTotalCount": number,
    "minCardsCount": number,
    "maxCardsCount": number,
}


export interface CreateNewCardPackResponse extends CardPackResponse{
    newCardsPack:CardPacksEntity
}
export interface updateCardPackResponse extends CardPackResponse{
    updatedCardsPack:CardPacksEntityWithDeckCover
}
export interface deleteCardPackResponse extends CardPackResponse{
    deletedCardsPack:CardPacksEntity
}

export const APIPacks = {
    getCardPacks: ({packName='' , min=1, max=4, sortPacks='0updated', page=1, pageCount=20, user_id}: getCardPacksPayload) =>
        instance.get(`/cards/pack?user_id=${user_id}&packName=${packName&&packName}&min=${min}&max=${max}&sortPacks=${sortPacks}&page=${page}&pageCount=${pageCount}`)
            .then((response: AxiosResponse<GetCardsPackResponse>) => response.data),

    createNewCardPack: (createNewCardPackPayload: CreateNewCardPackPayload) =>
        instance.post(`/cards/pack`, {cardsPack: createNewCardPackPayload})
            .then((response: AxiosResponse<CreateNewCardPackResponse>) => response.data),

    updateCardPack: (updateCardPackPayload: UpdateCardPackPayload) =>
        instance.put(`/cards/pack`,
            {
                cardsPack: updateCardPackPayload
            }
        )
            .then((response:AxiosResponse<updateCardPackResponse>)=>response.data),

    deleteCardPack:(id:string)=>instance.delete(`/cards/pack?id=${id}`)
        .then((response:AxiosResponse<deleteCardPackResponse>)=>response.data)
}