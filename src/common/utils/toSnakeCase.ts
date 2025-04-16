export const  toSnakeCase=(array: string[]|null)=> {
    if(Array.isArray(array)){
        return array.map(el=>{
            return el
                .toLowerCase()       // Приводим к нижнему регистру
                .replace(/\s+/g, '_'); // Заменяем пробелы на подчеркивания
        })
    }
   return array;

}