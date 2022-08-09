import {AxiosResponse} from "axios";
import {instance} from "./Global";

export type getCardsPayload = {
    cardAnswer?: string //поиск по вопросу
    cardQuestion?: string //поиск по ответу
    cardsPack_id: string
    min?: number // скорее всего поиск по рейтингу
    max?: number // скорее всего поиск по рейтингу
    sortCards?: string // "0grade" | "1grade" (поиск по свойствам карты 0 возрастание 1 убывание, значение после цифры: по какому свойству произвести сортировку
    page?: number // какую страницу показать
    pageCount?: number // сколько элементов на странице показать
}

export interface CardsResponse {
    "token": string,
    "tokenDeathTime": number
}

export interface ExtendedCardsResponse extends CardsResponse {
    "packUserId": string,
    "page": number, //номер страницы
    "pageCount": number, //сколько элементов на странице
    "cardsTotalCount": number, // сколько всего карт
    "minGrade": number, // минимальный рейтинг
    "maxGrade": number, // максимальный рейтинг
}

export interface CardEntity {
    "_id": string,
    "cardsPack_id": string,
    "user_id": string,
    "answer": string,
    "question": string,
    "grade": number,
    "shots": number,
    "comments": string,
    "type": string,
    "rating": number,
    "more_id": string,
    "created": string,
    "updated": string,
    "__v": number
}

export interface ExtendedCardEntity extends CardEntity {
    "answerImg": string,
    "answerVideo": string,
    "questionImg": string,
    "questionVideo": string
}

export type UpdateGradeCardResponseT = {
    "updatedGrade": {
        "_id": string,
        "cardsPack_id": string,
        "card_id": string,
        "user_id": string,
        "grade": number,
        "shots": number,
        "more_id": string,
        "created": string,
        "updated": string,
        "__v": number
    }
}

export interface CreateCardResponse extends CardsResponse {
    newCard: CardEntity
}

export interface DeleteCardResponse extends CardsResponse {
    deletedCard: CardEntity
}

export interface UpdateCardResponse extends CardsResponse {
    updatedCard: ExtendedCardEntity
}

export interface GetCardsResponse extends ExtendedCardsResponse {
    cards: ExtendedCardEntity[]
}



export type CreateCardPayload = {
    cardsPack_id: string
    question?: string//"no question" // если не отправить будет таким
    answer?: string//"no answer" // если не отправить будет таким
    // grade?: string // 0..5, не обязателен //на сколько я понял глобальный рейтинг нельзя выставлять
    shots?: string// не обязателен// рейтинг который выставляет сам пользователь
    answerImg?: string// "url or base 64" // не обязателен
    questionImg?: string// "url or base 64" // не обязателен
    questionVideo?: string// "url or base 64" // не обязателен
    answerVideo?: string// "url or base 64" // не обязателен
}
export type UpdateCardPayload = {
    "_id": string,
    "answer"?: string | null,
    "question"?: string | null,
    "grade"?: number | null, //на сколько я понял глобальный рейтинг нельзя выставлять
    "shots"?: number | null,//и попытки тоже
    "comments"?: string | null,
    "type"?: string | null,
    "answerImg"?: string | null,
    "answerVideo"?: string | null,
    "questionImg"?: string | null,
    "questionVideo"?: string | null
}
export type GradeCardPayLoad={
    grade:number,
    card_id:string
}


export const APICards = {
    getCards: ({
                   cardAnswer,
                   cardQuestion,
                   cardsPack_id,
                   sortCards,
                   page,
                   pageCount,
                   min,
                   max
               }: getCardsPayload) => instance
        .get(`/cards/card`, {
            params: {
                cardAnswer,
                cardQuestion,
                cardsPack_id,
                sortCards,
                page,
                pageCount,
                min,
                max
            }
        })
        .then((response: AxiosResponse<GetCardsResponse>) => response.data),

    createCard: (createCardPayload: CreateCardPayload) => instance.post(`/cards/card`, {card: createCardPayload})
        .then((response: AxiosResponse<CreateCardResponse>) => response.data),

    updateCard: (updateCardPayload: UpdateCardPayload) =>
        instance.put(`/cards/card`, {
            card: updateCardPayload
        })
            .then((response: AxiosResponse<UpdateCardResponse>) => response.data),

    deleteCard: (id: string) => instance.delete(`/cards/card`, {params: {id}})
        .then((response: AxiosResponse<DeleteCardResponse>) => response.data),

    updateGradeCard:(updateGradeCard:GradeCardPayLoad)=> instance.put(`/cards/grade`,updateGradeCard)
        .then((response:AxiosResponse<UpdateGradeCardResponseT>)=> response.data)
}