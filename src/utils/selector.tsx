import { store } from "../store/store";


export const selectPermission = (feature: string, permission: string) => {
    const user = store.getState();

    const permitted:any = user?.user?.permissions?.find((item: any) => item.feature.toLowerCase() === feature.toLowerCase());
    if (!permitted) {
        return false;
    }
    return !!permitted?.[permission];
}