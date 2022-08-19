
//переводит state в сторку закидывает в localStorage со свойством key:
export function saveInStorage<T=any>(key: string, state: T) {
    try{
        const stateAsString = JSON.stringify(state)
        localStorage.setItem(key, stateAsString)
    }catch (e) {
        console.log(e)
    }

}

//парсит в объект из строки и если все гуд то ретернит объект
export function restoreFromStorage(key: string) {
try {
    const stateAsString = localStorage.getItem(key)
    if (stateAsString === null){return undefined}
    return  JSON.parse(stateAsString)
}catch (e) {
    console.log(e)
    return undefined
}
}