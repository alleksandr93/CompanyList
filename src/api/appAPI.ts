import {instance} from '@/common/instance/instance.ts'
import type {ContactMainType, Organization, UpdateContactType, UpdateType} from '@/type/type.ts'

export const appAPI = {
    auth: () => {
        return instance.get(`auth?user=USERNAME`).then((response) => {
            // Проверяем наличие заголовка Authorization в ответе
            const authHeader = response.headers['authorization'] || response.headers['Authorization']

            if (authHeader && authHeader.startsWith('Bearer ')) {
                const token = authHeader.split(' ')[1] // Извлекаем токен после 'Bearer '
                localStorage.setItem('authToken', token) // Сохраняем в localStorage
            } else {
                console.warn('Authorization header with Bearer token not found in response')
            }

            return response // Возвращаем оригинальный response для дальнейшей обработки
        })
    },
    getOrganizationById: (organizationId: string) => {
        return instance.get<Organization>(`/companies/${organizationId}`)
    },
    getContactById: (contactId: string) => {
        return instance.get<ContactMainType>(`/contacts/${contactId}`)
    },
    deleteProdutImage: (paylaod: { id: string, name: string }) => {
        return instance.delete(`/companies/${paylaod.id}/image/${paylaod.name}`)
    },
    deleteCompanyId: (companyId: string) => {
        return instance.delete(`/companies/${companyId}`)
    },
    updateOrganization: (organizationId: string, data: UpdateType) => {
        return instance.patch<Organization>(`/companies/${organizationId}`, data)
    },
    getCompanyList: () => {
        return new Promise((resolve) => setTimeout(() => resolve('12'), 1000))
    },
    changeContact: (contactId: string, contact: UpdateContactType) => {
        return instance.patch<ContactMainType>(`/contacts/${contactId}`, contact)
    },
    addImage: (companiId: string, file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        return instance.post(`/companies/${companiId}/image`, formData)
    }

}
