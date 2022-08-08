import * as React from "react";
import {useDispatchApp, useSelectorApp} from "../../CustomHooks/CustomHooks";
import {useEffect} from "react";
import {thunksPack} from "./PackReducer";
import {TablePacks1} from "./TablePacks1";


export const PacksPage = () => {

    const packs = useSelectorApp(state => state.packs.packsData.cardPacks)
    const headCells = useSelectorApp(state => state.packs.initHeadCells)

    const dispatch = useDispatchApp()

    useEffect(() => {
        dispatch(thunksPack.getPack())
    }, [])

    const createNewCard = () => {
        dispatch(thunksPack.createPack({name: 'програмист! иди спать, ты пьян!'}))
    }
    return (
        <TablePacks1 packs={!!packs ? packs : []} headCells={headCells}/>
    )
}



