
//утилита переводит время с бекенда в читабельный вид при условии что с бекенда
// приходящая дата не изменится, можно было бы заюзать библиотеку но мне лень:
export const getTime = (date: string) => {

    const year=date.match(/^[0-9]{4}((?=-))/g)
    const month=date.match(/(?<=-)\d{1,2}(?=-)/g)
    const day=date.match(/(?<=-)\d{2}(?=\w)/g)
    const time=date.match(/(?<=\w)\d{1,2}:\d{1,2}(?=:)/g)

    if (month&&year&&day&&time) {
     return `${day[0]}.${month[0]}.${year[0]} ${time[0]}`
    }else{
      return   "some problem with date time"
    }
}