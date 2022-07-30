import {instance} from "./APIAuth";
import {AxiosResponse} from "axios";

type getCardsPayload = {
    cardAnswer?: string
    cardQuestion?: string
    cardsPack_id: string
    min?: number
    max?: number
    sortCards?: "0grade" | "1grade"
    page?: number
    pageCount?: number
}

export interface CardsResponse {
    "token": string,
    "tokenDeathTime": number
}

export interface ExtendedCardsResponse extends CardsResponse {
    "packUserId": string,
    "page": number,
    "pageCount": number,
    "cardsTotalCount": number,
    "minGrade": number,
    "maxGrade": number,
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
    grade?: string // 0..5, не обязателен
    shots?: string// не обязателен
    answerImg?: string// "url or base 64" // не обязателен
    questionImg?: string// "url or base 64" // не обязателен
    questionVideo?: string// "url or base 64" // не обязателен
    answerVideo?: string// "url or base 64" // не обязателен
}
export type UpdateCardPayload = {
    "_id": string,
    "answer"?: string | null,
    "question"?: string | null,
    "grade"?: number | null,
    "shots"?: number | null,
    "comments"?: string | null,
    "type"?: string | null,
    "answerImg"?: string | null,
    "answerVideo"?: string | null,
    "questionImg"?: string | null,
    "questionVideo"?: string | null
}


export const APICards = {
    getCards: ({
                   cardAnswer = "",
                   cardQuestion = "",
                   cardsPack_id,
                   min = 0,
                   max = 0,
                   sortCards = "0grade",
                   page = 1,
                   pageCount = 4
               }: getCardsPayload) => instance
        .get(`/cards/card?cardAnswer=${cardAnswer}&cardQuestion=${cardQuestion}&cardsPack_id=${cardsPack_id}&min=${min}&max=${max}&sortCards=${sortCards}&page=${page}&pageCount=${pageCount}`)
        .then((response: AxiosResponse<GetCardsResponse>) => response.data),

    createCard: (createCardPayload: CreateCardPayload) => instance.post(`/cards/card`, {card: createCardPayload})
        .then((response: AxiosResponse<CreateCardResponse>) => response.data),

    updateCard: (updateCardPayload: UpdateCardPayload) =>
        instance.put(`/cards/card`, {
            card: updateCardPayload
        })
            .then((response: AxiosResponse<UpdateCardResponse>) => response.data),

    deleteCard: (id: string) => instance.delete(`/cards/card?id=${id}`)
        .then((response: AxiosResponse<DeleteCardResponse>) => response.data)
}