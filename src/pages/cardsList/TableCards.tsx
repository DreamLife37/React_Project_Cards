import * as React from 'react';
import {memo, useMemo} from 'react';
import {ExtendedCardEntity} from "../../DAL/API-Cards";
import {CommonTable} from "./CommonTable";
import {useSelectorApp} from "../../CustomHooks/CustomHooks";
import {getTime} from "../../utils/getTime";


export interface HeadCell {
    id: keyof ExtendedCardEntity;
    label: string;
    numeric: boolean;
}

const headCells: HeadCell[] = [
    {
        id: 'question',
        numeric: true,
        label: 'question',
    },
    {
        id: 'answer',
        numeric: true,
        label: 'answer',
    },
    {
        id: 'updated',
        numeric: true,
        label: 'Last Updated',
    },
    {
        id: 'created',
        numeric: true,
        label: 'Created by',
    },
];


type TableCardsType = {
    cards: ExtendedCardEntity[]
}

export const TableCards: React.FC<TableCardsType> = memo(({cards}) => {

        const packName = useSelectorApp(state => state.cards.packTitle)
        const rows = useMemo(() => cards?.map(card => [card.question, card.answer, getTime(card.updated), getTime(card.created)]), [cards])

        return (
            <CommonTable rows={rows} headCells={headCells} title={packName}/>
        );
    }
)


