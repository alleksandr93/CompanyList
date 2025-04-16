export const  formatOption=(option: string[]|string) =>{
    if(typeof option === 'object'){
        return option.map(el=>{
            return   el.replace(/_/g, ' ') // Заменяем подчеркивания на пробелы
                .replace(/\b\w/g, char => char.toUpperCase()); // Делаем первые буквы слов заглавными
        })
    }else{
        return option.replace(/_/g, ' ') // Заменяем подчеркивания на пробелы
            .replace(/\b\w/g, char => char.toUpperCase()); // Делаем первые буквы слов заглавными
    }

}