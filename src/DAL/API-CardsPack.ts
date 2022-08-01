import {AxiosResponse} from "axios";
import {instance} from "./Global";

export type getCardPacksPayload = {
    user_id?: string //если не отправить вернет все существующие колоды
    packName?: string  //поиск по имени пакета
    min?: number //сортирровака по колличеству карт в колоде
    max?: number //сортирровака по колличеству карт в колоде
    sortPacks?: string //"0updated" | "1updated"  (сортировка по свойсвам 0 и 1 означает возрастание и убывание последующее значение по какому свойству произвести сортировку)
    page?: number // какую страницу отобразить (для пагинации)
    pageCount?: number //сколько колод отобразить в странице

}
export type CreateNewCardPackPayload = {
    name?: string //"no Name"  если не отправить будет таким
    deckCover?: string//"url or base64" // не обязателен (по сути обложка колоды)
    private?: boolean//false // если не отправить будет такой(если отпраить null то и вернет null будте бдительны))
}
export type UpdateCardPackPayload = {
    "_id": string, // id колоды
    "private"?: boolean //(если отпраить null то и вернет null будте бдительны))
    "name"?: string
    "path"?: string
    "grade"?: number //рейтинг колоды
    "shots"?: number //скорее всего  рейтинг который выставляет сам пользователь, завязана с grade,
    "type"?: string
    "deckCover"?: string
}

export type CardPacksEntity = {
    "_id": string,
    "user_id": string,
    "user_name": string,
    "private": boolean,
    "name": string,
    "path": string,
    "grade": number, // глобальный рейтинг колоды
    "shots": number, // скорее всего рейтинг который выставляет сам пользователь
    "cardsCount": number, //кол-во карт в колоде
    "type": string,
    "rating": number,
    "created": Date, //когда была создана
    "updated": Date, // когда была обновлена
    "more_id": string,
    "__v": number
}

export interface CardPacksEntityWithDeckCover extends CardPacksEntity {
    "deckCover": string | null
}

export interface CardPackResponse {
    token: string,
    tokenDeathTime: number
}

export interface GetCardsPackResponse extends CardPackResponse {
    "cardPacks": CardPacksEntityWithDeckCover[]
    "page": number, //какую страницу по счету отправил бек
    "pageCount": number, //сколько колод в странице
    "cardPacksTotalCount": number, //сколько всего колод по данному запросу найдено
    "minCardsCount": number,
    "maxCardsCount": number,
}


export interface CreateNewCardPackResponse extends CardPackResponse {
    newCardsPack: CardPacksEntity
}

export interface updateCardPackResponse extends CardPackResponse {
    updatedCardsPack: CardPacksEntityWithDeckCover
}

export interface deleteCardPackResponse extends CardPackResponse {
    deletedCardsPack: CardPacksEntity
}

export const APIPacks = {

    getCardPacks: ({packName, sortPacks, page, pageCount, user_id, min, max}: getCardPacksPayload) =>
        instance.get(`/cards/pack`, {params: {user_id, packName, sortPacks, page, pageCount, min, max}})

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
            .then((response: AxiosResponse<updateCardPackResponse>) => response.data),

    deleteCardPack: (id: string) => instance.delete(`/cards/pack`, {params: {id}})
        .then((response: AxiosResponse<deleteCardPackResponse>) => response.data)
}
