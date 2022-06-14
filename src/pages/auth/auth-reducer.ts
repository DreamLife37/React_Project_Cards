export const authReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'SET-LOGIN-DATA':
            return {...state}
        case 'SET-NEW-PASSWORD':
            return {...state}
        case 'RECOVERY-PASSWORD':
            return {...state}
        case 'SET-REGISTERED-USER':
            return {...state}
        default: {
            return {...state};
        }
    }
}
