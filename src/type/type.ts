// Тип для фотографии
export type Photo = {
    name: string;
    filepath: string;
    thumbpath: string;
    createdAt: string; // или Date, если вы преобразуете строку в Date объект
};

// Тип для контракта
type Contract = {
    no: string;
    issue_date: string; // или Date
};

// Возможные типы бизнеса
type BusinessType =
    | 'funeral_home'
    | 'logistics_services'
    | 'burial_care_contractor'

// Возможные статусы
type Status = 'active'

// Основной тип организации
export type Organization = {
    id: string;
    contactId: string;
    name: string;
    shortName: string;
    businessEntity: string[] | string;
    contract: Contract;
    type: BusinessType[];
    status: Status;
    createdAt: string; // или Date
    updatedAt: string; // или Date
    photos: Photo[];
};
export type ProductType = {
    [id: string]: Organization;
}
export type AppType = {
    error: null | string
    auth: boolean
    status: RequestStatus
}
export type ModalType = 'Remove' | 'Edit'
export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ContactType = {
    [key: string]: ContactMainType
}
export type ContactMainType = {
    createdAt: string
    email: string
    firstname: string
    id: string
    lastname: string
    phone: string
    updatedAt: string
}
export type UpdateType = {
    name?: string,
    shortName?: string,
    businessEntity?: string,
    contract?: {
        no?: string
        issue_date?: string
    }
    type?: string[]
}
export type UpdateContactType = {
    lastname: string
    firstname: string
    phone: string
    email: string

}
